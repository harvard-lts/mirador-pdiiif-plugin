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
  }

  /**
   * Downoloads the PDF
   */
  downloadPDF = async () => {
    const { manifest } = this.props;

    // Estimate how large a PDF will probably be given the parameters
    const estimatedSizeInBytes = await estimatePdfSize({
      manifest: manifest.json,
      maxWidth: 1500,
    });

    console.log(`Estimated filsize ${estimatedSizeInBytes}`);

    // Get a writable handle to a file on the user's machine
    const handle = await showSaveFilePicker({
      suggestedName: "manifest.pdf",
      types: [
        {
          description: "PDF file",
          accept: { "application/pdf": [".pdf"] },
        },
      ],
    });

    if ((await handle.queryPermission({ mode: "readwrite" })) !== "granted") {
      console.error(`no permission to write to '${handle.name}'`);
    } else {
      const pdfPath = (await handle.getFile()).name;
      const webWritable = await handle.createWritable();

      // Start the PDF generation
      await convertManifest(manifest, webWritable, {
        onProgress: onProgress,
        maxWidth: 1500,
        coverPageEndpoint: "https://pdiiif.jbaiter.de/api/coverpage",
      });
    }
    console.log("download should happen here");
  };

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
          <Typography variant="h2">Plugin PDIIIF</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            This is a PDIIIF for using dialog boxes from the top nav bar.
            <Button onClick={this.downloadPDF} color="primary">
              Download PDF
            </Button>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
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
