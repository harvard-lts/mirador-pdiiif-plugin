import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import { convertManifest, estimatePdfSize } from "pdiiif";

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
});

/**
 * PDIIIFDialog ~
 */
export class PDIIIFDialog extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      supportsFilesystemAPI: typeof showSaveFilePicker === "function",
      estimatingSize: false,
      downloadSupported: false,
      savingError: null,
      estimatedSize: 0,
    };
  }

  async componentDidUpdate(prevProps) {
    const { manifest } = this.props;

    // Use estimation of PDF size to determine if the PDF will generate correctly
    if (manifest !== prevProps.manifest) {
      if (!manifest?.error && manifest?.json) {
        this.setState({ estimatingSize: true });
        // (just an estimate, not the actual size)
        const estimatedSizeInBytes = await estimatePdfSize({
          manifest: manifest.json,
          maxWidth: 1500,
        });
        this.setState({ estimatingSize: false });

        // estimated size, or 0... or maybe NaN?
        if (estimatedSizeInBytes) {
          this.setState({ downloadSupported: true });
          this.setState({ estimatedSize: estimatedSizeInBytes });
        }
      }
    }
  }

  /**
   * Format bytes to human readable string
   */
  formatBytes(bytes, decimals = 2) {
    if (!+bytes) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = [
      "Bytes",
      "KiB",
      "MiB",
      "GiB",
      "TiB",
      "PiB",
      "EiB",
      "ZiB",
      "YiB",
    ];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  }

  /**
   * Downoloads the PDF
   */
  downloadPDF = async () => {
    const { manifest } = this.props;
    const { supportsFilesystemAPI } = this.state;
    // Get a writable handle to a file on the user's machine

    let handle;

    // TODO: fully handle Firefox / server side generation with streams
    if (supportsFilesystemAPI) {
      // The error here will typically be a user hitting esc / cancel
      try {
        handle = await showSaveFilePicker({
          suggestedName: `${manifest.json.label}.pdf`,
          types: [
            {
              description: "PDF file",
              accept: { "application/pdf": [".pdf"] },
            },
          ],
        });
      } catch (e) {
        return console.error(e);
      }

      try {
        if (
          (await handle.queryPermission({ mode: "readwrite" })) !== "granted"
        ) {
          // Throw error if permission is not granted
          // N.B. I wasn't able to trigger this error (e.g. by choosing folder with strict permission)
          // but it's here for completeness
          throw new Error("Permission to write to file was not granted");
        } else {
          // Reset the error state
          this.setState({ savingError: null });

          const pdfPath = (await handle.getFile()).name;
          const webWritable = await handle.createWritable();

          // Start the PDF generation
          return await convertManifest(manifest, webWritable, {
            maxWidth: 1500,
            coverPageEndpoint: "https://pdiiif.jbaiter.de/api/coverpage",
          });
        }
      } catch (e) {
        // Display permission / conversion error
        this.setState({ savingError: e.message });
        return console.error(e);
      }
    }
  };

  /**
   * Returns content for the dialog
   */
  renderDialogContent() {
    const { estimatingSize, downloadSupported } = this.state;

    if (estimatingSize) {
      return (
        <>
          <DialogContentText>
            Checking document compatibility...
          </DialogContentText>
          <CircularProgress color="primary" />
        </>
      );
    }

    if (!downloadSupported) {
      return (
        <DialogContentText>
          Sorry, this document is not supported by PDIIIF
        </DialogContentText>
      );
    }

    // TODO: fully handle Firefox / server side generation with streams
    if (!this.state.supportsFilesystemAPI) {
      return (
        <DialogContentText>
          Sorry, PDF generation isn't supported in your browser
        </DialogContentText>
      );
    }

    return (
      <>
        {this.state.savingError && (
          <DialogContentText>
            {this.state.savingError.message}
          </DialogContentText>
        )}
        <DialogContentText>
          Download a PDF of the current document? (Estimated file size:{" "}
          {this.formatBytes(this.state.estimatedSize)})
        </DialogContentText>
      </>
    );
  }

  /**
   * Returns the rendered component
   */
  render() {
    const { classes, closeDialog, containerId, open } = this.props;

    if (!open) null;

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
        <DialogContent>{this.renderDialogContent()}</DialogContent>
        <DialogActions>
          {this.state.downloadSupported && (
            <Button onClick={this.downloadPDF} color="primary">
              Download
            </Button>
          )}
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
  manifest: PropTypes.object,
  manifestId: PropTypes.string,
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
