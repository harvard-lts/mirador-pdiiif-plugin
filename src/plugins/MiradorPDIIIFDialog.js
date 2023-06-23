import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { convertManifest } from "pdiiif";
import {
  getCanvases,
  getManifestTitle,
} from "mirador/dist/es/src/state/selectors";
import { formatBytes, checkStreamsaverSupport } from "../utils";
import streamSaver from "streamsaver";

const mapDispatchToProps = (dispatch, { windowId }) => ({
  closeDialog: () => dispatch({ type: "CLOSE_WINDOW_DIALOG", windowId }),
});

const mapStateToProps = (state, { windowId }) => ({
  open:
    state.windowDialogs[windowId] &&
    state.windowDialogs[windowId].openDialog === "PDIIIF",
  manifestId: state.windows[windowId].manifestId,
  manifest: state.manifests[state.windows[windowId].manifestId],
  containerId: state.config.id,
  estimatedSize: state.PDIIIF[windowId]?.estimatedSizeInBytes,
  allowPdfDownload: state.PDIIIF[windowId]?.allowPdfDownload,
  canvasIds: getCanvases(state, { windowId }).map((canvas) => canvas.id),
  mitmPath: state.config.miradorPDIIIFPlugin.mitmPath,
  manifestLabel: getManifestTitle(state, { windowId }),
  coverPageEndpoint: state.config.miradorPDIIIFPlugin.coverPageEndpoint,
});

/**
 * createRange
 * Adapted from PDIIIF's range function
 * @param {Number} start - start of range
 * @param {Number} end  - end of range
 * @returns {Array} Array of numbers
 */
function createRange(start, end) {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

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
      indexSpec: "",
      pageError: false,
      filteredCanvasIds: undefined, // Undefined will trigger all pages
    };
  }

  /**
   * Parse string from input to generate array of corresponding canvasId's
   * Adapted from PDIIIF's parseCanvasRanges function
   * @param {String} indexSpec String of comma separated pages and/or ranges
   * @param {Array} canvasIds Array of all canvasId's
   * @returns {Array|undefined} Array of corresponding canvasId's
   */
  parseCanvasRanges(indexSpec, canvasIds) {
    const canvasCount = canvasIds.length;

    // First find the indexes of the canvases to be included (set will remove dupes)
    const canvasIdxs = new Set(
      indexSpec
        .split(",")
        .filter((g) => g.length > 0)
        .reduce((idxs, group) => {
          let newIdxs;
          if (group.startsWith("-")) {
            const end = Number.parseInt(group.slice(1));
            if (end < 1 || end > canvasCount) {
              this.setState({ pageError: true });
            }
            newIdxs = createRange(1, end);
          } else if (group.endsWith("-")) {
            const start = Number.parseInt(group.slice(0, -1));
            if (start < 1 || start > canvasCount) {
              this.setState({ pageError: true });
            }
            newIdxs = createRange(start, canvasCount);
          } else if (group.indexOf("-") > 0) {
            const parts = group.split("-");
            const [start, end] = parts.map((p) => Number.parseInt(p, 10));
            if (
              start < 1 ||
              end < 1 ||
              start > end ||
              start > canvasCount ||
              end > canvasCount
            ) {
              this.setState({ pageError: true });
            }
            newIdxs = createRange(
              Number.parseInt(parts[0]),
              Number.parseInt(parts[1])
            );
          } else {
            const num = Number.parseInt(group);
            if (num < 1 || num > canvasCount) {
              this.setState({ pageError: true });
            }
            newIdxs = [num];
          }
          if (newIdxs.find(Number.isNaN)) {
            this.setState({ pageError: true });
          }
          return idxs.concat(newIdxs);
        }, [])
    );

    // Next filter the canvasIds to only include those from canvasIdxs
    const out = canvasIds.filter((_, i) => canvasIdxs.has(i + 1));
    if (out.length === 0) {
      return undefined;
    }
    return out;
  }

  componentDidMount() {
    const { mitmPath } = this.props;

    // Set the streamsaver mitm path or allow default
    streamSaver.mitm = mitmPath ?? streamSaver.mitm;
  }

  componentDidUpdate(prevProps, prevState) {
    const { isDownloading, webWritable } = this.state;
    const { open } = this.props;

    // If the dialog was closed and re-opened, reset the input state
    if (!prevProps.open && open) {
      this.setState({ indexSpec: "" });
      this.setState({
        filteredCanvasIds: undefined,
      });
    }

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

  handlePageChange = (event) => {
    const { canvasIds } = this.props;
    this.setState({ pageError: false });
    this.setState({ indexSpec: event.target.value });
    this.setState({
      filteredCanvasIds: this.parseCanvasRanges(event.target.value, canvasIds),
    });
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
    const { manifestLabel } = this.props;
    const { supportsFilesystemAPI, supportsStreamsaver } = this.state;

    // This is more of a insurance against what _might_ come out of manifesto
    // For our purposes we'd always expect a string for v2 and v3 manifests
    let suggestedName;
    if (typeof manifestLabel === "string") {
      suggestedName = manifestLabel;
    } else if (Array.isArray(manifestLabel)) {
      suggestedName = manifestLabel;
    } else {
      const date = new Date();
      suggestedName = `PDF Download ${date.getYear()}-${date.getMonth()}-${date.getDate()}`;
    }

    // Enforce character limit (arbitrary)
    suggestedName = `${suggestedName.slice(0, 256)}.pdf`;

    // Ensure fresh state on each download attempt
    this.resetDownloadState();

    if (supportsFilesystemAPI) {
      return await this.downloadWithFilesystemAPI(suggestedName);
    }

    if (supportsStreamsaver) {
      return await this.downloadWithStreamsaver(suggestedName);
    }
  };

  /**
   * Downoloads the PDF using the Filesystem API
   * @returns {Promise}
   */
  async downloadWithFilesystemAPI(suggestedName) {
    const { closeDialog } = this.props;

    // Get a writable handle to a file on the user's machine
    let handle;

    // The error here will typically be a user hitting esc / cancel
    try {
      handle = await showSaveFilePicker({
        suggestedName,
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
  async downloadWithStreamsaver(suggestedName) {
    const { closeDialog } = this.props;

    const webWritable = streamSaver.createWriteStream(suggestedName);
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
    const { manifest, coverPageEndpoint } = this.props;
    const { abortController, filteredCanvasIds } = this.state;

    this.attachAbortListener();

    this.setState({ isDownloading: true });

    await convertManifest(manifest.json, webWritable, {
      concurrency: 4,
      maxWidth: 1500,
      abortController,
      filterCanvases: filteredCanvasIds,
      coverPageEndpoint:
        coverPageEndpoint ?? "https://pdiiif.jbaiter.de/api/coverpage",
    });

    this.setState({ isDownloading: false });
  }

  /**
   * Returns the rendered component
   */
  render() {
    const { savingError, pageError } = this.state;
    const {
      classes,
      closeDialog,
      containerId,
      open,
      allowPdfDownload,
      estimatedSize,
      canvasIds,
    } = this.props;

    if (!open || !allowPdfDownload) null;

    const fileSizeText = estimatedSize
      ? ` and has an estimated file size of ${formatBytes(estimatedSize)}`
      : "";

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
            <br />
            The document contains {canvasIds.length} pages{fileSizeText}. All
            pages will be included by default. If you wish to download certain
            portions of it, you may provide a comma separated list of pages
            and/or ranges.
          </DialogContentText>
          <TextField
            id="pages"
            label="Pages"
            margin="normal"
            variant="outlined"
            placeholder="1, 4, 8-12, ..."
            error={pageError}
            onChange={this.handlePageChange}
            value={this.state.indexSpec}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={this.downloadPDF}
            className={pageError ? classes.disabledButton : ""}
            color="primary"
            disabled={pageError}
          >
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
  canvasIds: PropTypes.arrayOf(PropTypes.string),
  classes: PropTypes.shape({
    h2: PropTypes.string,
    h3: PropTypes.string,
    disabledButton: PropTypes.string,
  }).isRequired,
  closeDialog: PropTypes.func.isRequired,
  containerId: PropTypes.string.isRequired,
  coverPageEndpoint: PropTypes.string,
  estimatedSize: PropTypes.number,
  manifest: PropTypes.object,
  manifestId: PropTypes.string,
  manifestLabel: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  allowPdfDownload: PropTypes.bool,
  open: PropTypes.bool,
  windowId: PropTypes.string.isRequired,
  mitmPath: PropTypes.string,
};

PDIIIFDialog.defaultProps = {
  open: false,
};

const styles = () => ({
  h2: {
    paddingBottom: 0,
  },
  h3: {
    marginTop: "20px",
  },
  disabledButton: {
    opacity: 0.6,
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
