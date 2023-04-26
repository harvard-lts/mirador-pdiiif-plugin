import React, { Component } from "react";
import PropTypes from "prop-types";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withStyles } from "@material-ui/core/styles";
import { getCanvasGroupings } from "mirador/dist/es/src/state/selectors";
import { estimatePdfSize } from "pdiiif";

// select an icon from material icons to import and use: https://v4.mui.com/components/material-icons/
import PDFIcon from "@material-ui/icons/PictureAsPdf";

const dialogReducer = (state = {}, action) => {
  if (action.type === "OPEN_WINDOW_DIALOG") {
    return {
      ...state,
      [action.windowId]: {
        openDialog: action.dialogType,
      },
    };
  }

  if (action.type === "CLOSE_WINDOW_DIALOG") {
    return {
      ...state,
      [action.windowId]: {
        openDialog: null,
      },
    };
  }
  return state;
};

const PDIIIFReducer = (state = {}, action) => {
  if (action.type === "PDIIIF/ALLOW_PDF_DOWNLOAD") {
    return {
      ...state,
      [action.windowId]: {
        ...state[action.windowId],
        PDFDownloadEnabled: true,
      },
    };
  }
  if (action.type === "PDIIIF/SET_ESTIMATED_SIZE") {
    return {
      ...state,
      [action.windowId]: {
        ...state[action.windowId],
        estimatedSizeInBytes: action.size,
      },
    };
  }
  return state;
};

const mapStateToProps = (state, { windowId }) => ({
  manifest: state.manifests[state.windows[windowId].manifestId],
  canvasGroupings: getCanvasGroupings(state, { windowId }),
  allowPdfDownload: state.PDIIIF[windowId]?.PDFDownloadEnabled ?? false,
});

const mapDispatchToProps = (dispatch, { windowId }) => ({
  setAllowPdfDownload: () =>
    dispatch({ type: "PDIIIF/ALLOW_PDF_DOWNLOAD", windowId }),
  setEstimatedSize: (size) =>
    dispatch({ type: "PDIIIF/SET_ESTIMATED_SIZE", windowId, size }),
  openDialog: () =>
    dispatch({ type: "OPEN_WINDOW_DIALOG", windowId, dialogType: "PDIIIF" }),
});

class PDIIIFMenuItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasChecked: false,
      supportsFilesystemAPI: typeof showSaveFilePicker === "function",
    };
  }

  openDialogAndCloseMenu() {
    const { handleClose, openDialog } = this.props;

    openDialog();
    handleClose();
  }

  async componentDidMount() {
    const {
      manifest,
      canvasGroupings,
      setAllowPdfDownload,
      allowPdfDownload,
      setEstimatedSize,
    } = this.props;

    if (allowPdfDownload || !this.state.supportsFilesystemAPI) {
      this.setState({ hasChecked: true });
      return;
    }

    if (!manifest?.error && manifest?.json) {
      // Only show PDF's for PTO's
      if (canvasGroupings.length > 1) {
        // Check size can be estimated
        const estimatedSizeInBytes = await estimatePdfSize({
          manifest: manifest.json,
          maxWidth: 1500,
        });

        // estimated size, or 0... or maybe NaN?
        if (estimatedSizeInBytes) {
          setAllowPdfDownload();
          setEstimatedSize(estimatedSizeInBytes);
        }
      }
    }

    this.setState({ hasChecked: true });
  }

  renderMenuItemText = () => {
    const { hasChecked } = this.state;
    const { allowPdfDownload } = this.props;

    if (!hasChecked) {
      return "Checking document";
    }
    if (allowPdfDownload) {
      return "Download PDF";
    }
    return "PDF Unvailable";
  };

  render() {
    const { classes, allowPdfDownload } = this.props;
    const { hasChecked } = this.state;
    return (
      <div>
        <MenuItem
          disabled={!hasChecked || !allowPdfDownload}
          onClick={() => this.openDialogAndCloseMenu()}
        >
          <ListItemIcon>
            <PDFIcon />
          </ListItemIcon>
          <ListItemText primaryTypographyProps={{ variant: "body1" }}>
            {this.renderMenuItemText()}
          </ListItemText>
          {!hasChecked && (
            <CircularProgress size={15} className={classes.progress} />
          )}
        </MenuItem>
      </div>
    );
  }
}

PDIIIFMenuItem.propTypes = {
  allowPdfDownload: PropTypes.bool,
  canvasGroupings: PropTypes.object.isRequired,
  handleClose: PropTypes.func,
  openPDIIIFDialog: PropTypes.func,
  manifest: PropTypes.object.isRequired,
  setAllowPdfDownload: PropTypes.func.isRequired,
  setEstimatedSize: PropTypes.func.isRequired,
};

PDIIIFMenuItem.defaultProps = {
  handleClose: () => {},
  openPDIIIFDialog: () => {},
};

const styles = () => ({
  progress: {
    marginLeft: "2px",
  },
});

export default {
  target: "WindowTopBarPluginMenu",
  mode: "add",
  name: "PDIIIFMenuItem",
  component: withStyles(styles)(PDIIIFMenuItem),
  mapDispatchToProps,
  mapStateToProps,
  reducers: {
    windowDialogs: dialogReducer,
    PDIIIF: PDIIIFReducer,
  },
};
