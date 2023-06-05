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
import { getCanvases } from "mirador/dist/es/src/state/selectors";

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
 * Format bytes to human readable string
 */
function formatBytes(bytes, decimals = 2) {
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
 * PDIIIFDialog ~
 */
export class PDIIIFDialog extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      savingError: null,
      supportsFilesystemAPI: typeof showSaveFilePicker === "function",
      indexSpec: "",
      pageError: false,
      filteredCanvasIds: [],
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
              console.log("invalid range");
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

  /**
   * Downloads the PDF
   */
  downloadPDF = async () => {
    const { manifest, closeDialog, canvasIds } = this.props;
    const { supportsFilesystemAPI, indexSpec } = this.state;
    // Get a writable handle to a file on the user's machine

    let handle;

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
        this.setState({ savingError: e.message });
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

          closeDialog();

          // Start the PDF generation
          return await convertManifest(manifest, webWritable, {
            maxWidth: 1500,
            coverPageEndpoint: "https://pdiiif.jbaiter.de/api/coverpage",
            filterCanvases: parseCanvasRanges(indexSpec, canvasIds),
          });
        }
      } catch (e) {
        // Display permission / conversion error
        this.setState({ savingError: e.message });
        return console.error(e);
      }
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
            <br />
            <br />
            The source document contains {canvasIds.length} pages. All pages
            will be included by default. Optionally you may provide a comma
            separated list of pages and/or ranges.
          </DialogContentText>
          <TextField
            id="pages"
            label="Pages"
            margin="normal"
            variant="outlined"
            placeholder="1, 4, 8-12, ..."
            error={pageError}
            onChange={this.handlePageChange}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={this.downloadPDF}
            className={pageError && classes.disabledButton}
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
