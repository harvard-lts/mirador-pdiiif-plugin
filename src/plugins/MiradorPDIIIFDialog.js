import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Typography from "@material-ui/core/Typography";
import { convertManifest } from "pdiiif";
import { formatBytes, checkStreamsaverSupport } from "../utils";
import streamSaver from "streamsaver";

const mapDispatchToProps = (dispatch, { windowId }) => ({
  closeDialog: () => dispatch({ type: "CLOSE_WINDOW_DIALOG", windowId }),
});

const mapStateToProps = (state, { windowId, containerId }) => ({
  open:
    state.windowDialogs[windowId] &&
    state.windowDialogs[windowId].openDialog === "PDIIIF",
  manifestId: state.windows[windowId].manifestId,
  manifest: state.manifests[state.windows[windowId].manifestId],
  containerId: state.config.id,
  estimatedSize: state.PDIIIF[windowId]?.estimatedSizeInBytes,
  allowPdfDownload: state.PDIIIF[windowId]?.allowPdfDownload,
  mitmPath: state.config.miradorPDIIIFPlugin.mitmPath,
});

/**
 * PDIIIFDialog ~
 */
export class PDIIIFDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      savingError: null,
      isDownloading: false,
      supportsFilesystemAPI: typeof showSaveFilePicker === "function",
      supportsStreamsaver: checkStreamsaverSupport(),
      webWritable: null,
      abortController: new AbortController(), // Needs to be reset if aborted
    };
  }

  componentDidMount() {
    const { mitmPath } = this.props;

    // Set the streamsaver mitm path or allow default
    streamSaver.mitm = mitmPath ?? streamSaver.mitm;
  }

  componentDidUpdate(prevProps, prevState) {
    const { isDownloading, webWritable } = this.state;

    if (
      prevState.isDownloading !== isDownloading ||
      prevState.webWritable !== webWritable
    ) {
      if (isDownloading) {
        window.addEventListener("beforeunload", this.handleBeforeUnload);
        window.addEventListener("unload", this.handleUnload, { once: true });
      } else {
        window.removeEventListener("beforeunload", this.handleBeforeUnload);
        window.removeEventListener("unload", this.handleUnload, { once: true });
      }
    }
  }

  /**
   * Handle beforeunload event
   * @param {Event} e
   */
  handleBeforeUnload = (e) => {
    const { isDownloading, supportsFilesystemAPI } = this.state;
    // Unlike a regular download, if the user *closes* the window / tab
    // the download will fail, which is unexpected - this is just a warning
    // Most modern browsers also cannot show a custom message:
    // https://stackoverflow.com/questions/38879742/is-it-possible-to-display-a-custom-message-in-the-beforeunload-popup
    if (isDownloading && !supportsFilesystemAPI) {
      const msg = "Are you sure? Leaving now will interrupt the download.";
      e.preventDefault();
      e.returnValue = msg;
      return msg;
    }
  };

  /**
   * Handle unload event
   */
  handleUnload = () => {
    // N.B. Despite this, browsers aren't guaranteed to fire the unload event (and often don't)
    // The side effect of this will usually be a download that looks like it's still in progress
    const { abortController, webWritable } = this.state;

    abortController.abort();
    webWritable?.abort();
  };

  /**
   * Resets the download state
   * @returns {void}
   */
  resetDownloadState = () => {
    // Cancelling or aborting will always need clear up the state
    // In particular a new AbortController needs to be created
    this.setState({ webWritable: null });
    this.setState({ isDownloading: false });
    this.setState({ abortController: new AbortController() });
  };

  /**
   * Attaches an abort listener to the AbortController
   */
  attachAbortListener = () => {
    const { abortController } = this.state;

    abortController.signal.addEventListener(
      "abort",
      async () => {
        try {
          await webWritable.abort();
        } catch {
          // NOP
        } finally {
          this.resetDownloadState();
        }
      },
      { once: true }
    );
  };

  /**
   * Downoloads the PDF using the appropriate method
   * @returns {Promise}
   */
  downloadPDF = async () => {
    const { manifest } = this.props;
    const { supportsFilesystemAPI, supportsStreamsaver } = this.state;

    // Ensure fresh state on each download attempt
    this.resetDownloadState();

    if (supportsFilesystemAPI) {
      return await this.downloadWithFilesystemAPI(manifest.json.label);
    }

    if (supportsStreamsaver) {
      return await this.downloadWithStreamsaver(manifest.json.label);
    }
  };

  /**
   * Downoloads the PDF using the Filesystem API
   * @returns {Promise}
   */
  async downloadWithFilesystemAPI(label) {
    const { closeDialog } = this.props;

    // Get a writable handle to a file on the user's machine
    let handle;

    // The error here will typically be a user hitting esc / cancel
    try {
      handle = await showSaveFilePicker({
        suggestedName: `${label}.pdf`,
        types: [
          {
            description: "PDF file",
            accept: { "application/pdf": [".pdf"] },
          },
        ],
      });
    } catch (e) {
      this.setState({ savingError: e.message });
      console.error(e);
      return Promise.reject(e);
    }

    try {
      if ((await handle.queryPermission({ mode: "readwrite" })) !== "granted") {
        // Throw error if permission is not granted
        // N.B. I wasn't able to trigger this error (e.g. by choosing folder with strict permission)
        // but it's here for completeness
        throw new Error("Permission to write to file was not granted");
      } else {
        // Reset the error state
        this.setState({ savingError: null });

        const pdfPath = (await handle.getFile()).name;
        const webWritable = await handle.createWritable();

        this.setState({ webWritable: webWritable });

        closeDialog();

        // Start the PDF generation
        return await this.manifestConverter(webWritable);
      }
    } catch (e) {
      // Display permission / conversion error
      this.setState({ savingError: e.message });
      this.resetDownloadState();
      console.error(e);
      return Promise.reject(e);
    }
  }

  /**
   * Downoloads the PDF using the Streamsaver API
   * @param {string} label
   * @returns {Promise}
   */
  async downloadWithStreamsaver(label) {
    const { closeDialog } = this.props;

    const webWritable = streamSaver.createWriteStream(`${label}.pdf`);
    this.setState({ webWritable: webWritable });

    closeDialog();

    // Start the PDF generation
    return await this.manifestConverter(webWritable);
  }

  /**
   * Call to PDIIIF convertManifest shared between download methods
   * @param {WritableStream} webWritable Stream required by PDIIIF
   * @returns {Promise} (implicit)
   */
  async manifestConverter(webWritable) {
    const { manifest } = this.props;
    const { abortController } = this.state;

    this.attachAbortListener();

    this.setState({ isDownloading: true });

    await convertManifest(manifest.json, webWritable, {
      concurrency: 4,
      maxWidth: 1500,
      abortController,
      coverPageEndpoint: "https://pdiiif.jbaiter.de/api/coverpage",
    });

    this.setState({ isDownloading: false });
  }

  /**
   * Returns the rendered component
   */
  render() {
    const { savingError } = this.state;
    const {
      classes,
      closeDialog,
      containerId,
      open,
      allowPdfDownload,
      estimatedSize,
    } = this.props;
    const { supportsFilesystemAPI } = this.state;

    if (!open || !allowPdfDownload) null;

    return (
      <Dialog
        container={document.querySelector(`#${containerId} .mirador-viewer`)}
        disableEnforceFocus
        onClose={closeDialog}
        open={open}
        scroll="paper"
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle disableTypography className={classes.h2}>
          <Typography variant="h2">PDF Download</Typography>
        </DialogTitle>
        <DialogContent>
          {savingError && (
            <DialogContentText>{savingError.message}</DialogContentText>
          )}
          <DialogContentText>
            Download a PDF of the current document?
            <br />
            {supportsFilesystemAPI && (
              <>
                The file will appear in the directory you choose. <br />
              </>
            )}
            <br />
            {estimatedSize
              ? ` (Estimated file size: ${formatBytes(estimatedSize)})`
              : ""}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.downloadPDF} color="primary">
            Download
          </Button>
          <Button onClick={closeDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

PDIIIFDialog.propTypes = {
  classes: PropTypes.shape({
    h2: PropTypes.string,
    h3: PropTypes.string,
  }).isRequired,
  closeDialog: PropTypes.func.isRequired,
  containerId: PropTypes.string.isRequired,
  estimatedSize: PropTypes.number,
  manifest: PropTypes.object,
  manifestId: PropTypes.string,
  allowPdfDownload: PropTypes.bool,
  open: PropTypes.bool,
  windowId: PropTypes.string.isRequired,
  mitmPath: PropTypes.string,
};

PDIIIFDialog.defaultProps = {
  canvases: [],
  open: false,
};

const styles = () => ({
  h2: {
    paddingBottom: 0,
  },
  h3: {
    marginTop: "20px",
  },
});

export default {
  target: "Window",
  mode: "add",
  name: "PDIIIFDialog",
  component: withStyles(styles)(PDIIIFDialog),
  mapDispatchToProps,
  mapStateToProps,
};
