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
import { formatBytes } from "../utils";

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
});

/**
 * PDIIIFDialog ~
 */
export class PDIIIFDialog extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      savingError: null,
      supportsFilesystemAPI: typeof showSaveFilePicker === "function",
    };
  }

  /**
   * Downoloads the PDF using the appropriate method
   * @returns {Promise}
   */
  downloadPDF = async () => {
    const { manifest } = this.props;
    const { supportsFilesystemAPI } = this.state;

    if (supportsFilesystemAPI) {
      return await this.downloadWithFilesystemAPI(manifest.json.label);
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

        closeDialog();

        // Start the PDF generation
        return await this.manifestConverter(webWritable);
      }
    } catch (e) {
      // Display permission / conversion error
      this.setState({ savingError: e.message });
      console.error(e);
      return Promise.reject(e);
    }
  }

  /**
   * Call to PDIIIF convertManifest shared between download methods
   * @param {WritableStream} webWritable Stream required by PDIIIF
   * @returns {Promise}
   */
  async manifestConverter(webWritable) {
    const { manifest } = this.props;
    const abortController = new AbortController();

    return await convertManifest(manifest.json, webWritable, {
      concurrency: 4,
      maxWidth: 1500,
      abortController,
      coverPageEndpoint: "https://pdiiif.jbaiter.de/api/coverpage",
    });
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
            The file will appear in the directory you choose. <br />
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
