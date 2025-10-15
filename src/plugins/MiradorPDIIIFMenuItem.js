import React, { Component } from "react";
import PropTypes from "prop-types";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withStyles } from "@material-ui/core/styles";
import { estimatePdfSize } from "pdiiif";
import { checkImageApiHasCors, checkStreamsaverSupport, checkObjectPublic } from "../utils";

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
  if (action.type === "PDIIIF/RESET_PDF_DOWNLOAD") {
    return {
      ...state,
      [action.windowId]: {
        ...state[action.windowId],
        PDFDownloadEnabled: false,
      },
    };
  }
  if (action.type === "PDIIIF/SET_ESTIMATED_SIZE") {
    var estimatedSizeInBytes = action.size;
    if (
      typeof action.size === 'object' &&
      !Array.isArray(action.size) &&
      action.size !== null
    ) {
        if ('size' in action.size) {
          estimatedSizeInBytes = action.size.size;
        }
    }
    return {
      ...state,
      [action.windowId]: {
        ...state[action.windowId],
        estimatedSizeInBytes: estimatedSizeInBytes,
      },
    };
  }
  return state;
};

const mapStateToProps = (state, { windowId }) => ({
  manifest: state.manifests[state.windows[windowId].manifestId],
  allowPdfDownload: state.PDIIIF[windowId]?.PDFDownloadEnabled ?? false,
});

const mapDispatchToProps = (dispatch, { windowId }) => ({
  setAllowPdfDownload: () =>
    dispatch({ type: "PDIIIF/ALLOW_PDF_DOWNLOAD", windowId }),
  resetPdfDownload: () =>
    dispatch({ type: "PDIIIF/RESET_PDF_DOWNLOAD", windowId }),
  setEstimatedSize: (size) =>
    dispatch({ type: "PDIIIF/SET_ESTIMATED_SIZE", windowId, size }),
  openDialog: () =>
    dispatch({ type: "OPEN_WINDOW_DIALOG", windowId, dialogType: "PDIIIF" }),
  openRestrictedDialog: () =>
    dispatch({ type: "OPEN_WINDOW_DIALOG", windowId, dialogType: "PDIIIF_RESTRICTED" }),
});

class PDIIIFMenuItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasChecked: false,
      supportsFilesystemAPI: typeof showSaveFilePicker === "function",
      supportsStreamsaver: checkStreamsaverSupport(),
      imageApiHasCors: checkImageApiHasCors(),
      objectPublic: false, // Will be set in componentDidMount
      showMenuItem: false, // Will be set to true if we should show the menu item for restricted objects
    };
  }

  openDialogAndCloseMenu() {
    const { handleClose, openDialog, openRestrictedDialog } = this.props;
    const { objectPublic } = this.state;

    if (objectPublic) {
      openDialog();
    } else {
      openRestrictedDialog();
    }
    handleClose();
  }

  async componentDidMount() {
    await this.checkManifestStatus();
  }

  async componentDidUpdate(prevProps) {
    // Re-check manifest status if the manifest has changed (e.g., when switching pages)
    if (prevProps.manifest !== this.props.manifest) {
      // Reset PDF download state in Redux when manifest changes
      this.props.resetPdfDownload();
      await this.checkManifestStatus();
    }
  }

  async checkManifestStatus() {
    const {
      manifest,
      setAllowPdfDownload,
      allowPdfDownload,
      setEstimatedSize,
    } = this.props;
    const { supportsFilesystemAPI, supportsStreamsaver, imageApiHasCors } =
      this.state;

    // Reset state when checking new manifest
    this.setState({ 
      hasChecked: false,
      objectPublic: false,
      showMenuItem: false
    });

    // Don't allow PDF download if neither Filesystem API or Streamsaver are supported
    // Or if image API doesn't have CORS headers
    if (
      (!supportsFilesystemAPI && !supportsStreamsaver) ||
      !imageApiHasCors
    ) {
      this.setState({ hasChecked: true });
      return;
    }

    if (!manifest?.error && manifest?.json) {
      // Check if object is public
      const objectPublic = await checkObjectPublic(manifest.json);
      this.setState({ objectPublic });
      
      let isPTO = false;
      if (manifest.json.structures && manifest.json.structures.length > 0) {
        if (manifest.json.structures[0]['@type'] == 'sc:Range' || manifest.json.structures[0].type == 'Range') {
          isPTO = true;
        }
      }
      // Only show PDF's for PTO's, and only allow download if object is public
      if (isPTO) {
        if (objectPublic) {
          // Check size can be estimated
          const estimatedSizeInBytes = await estimatePdfSize({
            manifest: manifest.json,
            maxWidth: 1500,
          });

          // Estimated size, or 0
          // N.B. Sometimes this is NaN, but not sure what triggers this
          // it seems to be be caused bug in PDIIIIF trying to divide 0 by 0
          if (estimatedSizeInBytes !== 0) {
            setAllowPdfDownload();
            setEstimatedSize(estimatedSizeInBytes);
          }
        } else {
          // Object is restricted, but we still want to show the menu item
          // It will open the restricted dialog instead of allowing download
          this.setState({ showMenuItem: true });
        }
      }
    }

    this.setState({ hasChecked: true });
  }

  renderMenuItemText = () => {
    const { hasChecked, objectPublic, showMenuItem } = this.state;
    const { allowPdfDownload } = this.props;

    if (!hasChecked) {
      return "Checking document";
    }

    if (allowPdfDownload) {
      return "Download PDF";
    }

    if (showMenuItem && !objectPublic) {
      return "PDF Restricted";
    }

    return "PDF Unavailable";
  };

  render() {
    const { classes, allowPdfDownload } = this.props;
    const { hasChecked, showMenuItem } = this.state;
    
    // Show the menu item if PDF download is allowed OR if it's a restricted object that should show the restricted dialog
    const shouldShowMenuItem = allowPdfDownload || showMenuItem;
    
    return (
      <div>
        <MenuItem
          disabled={!hasChecked || !shouldShowMenuItem}
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
  handleClose: PropTypes.func,
  openDialog: PropTypes.func,
  openRestrictedDialog: PropTypes.func,
  manifest: PropTypes.object.isRequired,
  setAllowPdfDownload: PropTypes.func.isRequired,
  resetPdfDownload: PropTypes.func.isRequired,
  setEstimatedSize: PropTypes.func.isRequired,
};

PDIIIFMenuItem.defaultProps = {
  handleClose: () => {},
  openDialog: () => {},
  openRestrictedDialog: () => {},
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
