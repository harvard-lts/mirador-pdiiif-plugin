import React, { Component } from "react";
import PropTypes from "prop-types";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";

// select an icon from material icons to import and use: https://v4.mui.com/components/material-icons/
import PDFIcon from "@material-ui/icons/PictureAsPdf";

const PDIIIFDialogReducer = (state = {}, action) => {
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

const mapDispatchToProps = (dispatch, { windowId }) => ({
  openDialog: () =>
    dispatch({ type: "OPEN_WINDOW_DIALOG", windowId, dialogType: "PDIIIF" }),
});

class PDIIIF extends Component {
  openDialogAndCloseMenu() {
    const { handleClose, openDialog } = this.props;

    openDialog();
    handleClose();
  }

  render() {
    return (
      <div>
        <MenuItem onClick={() => this.openDialogAndCloseMenu()}>
          <ListItemIcon>
            <PDFIcon />
          </ListItemIcon>
          <ListItemText primaryTypographyProps={{ variant: "body1" }}>
            Download PDF
          </ListItemText>
        </MenuItem>
      </div>
    );
  }
}

PDIIIF.propTypes = {
  handleClose: PropTypes.func,
  openPDIIIFDialog: PropTypes.func,
};

PDIIIF.defaultProps = {
  handleClose: () => {},
  openPDIIIFDialog: () => {},
};

export default {
  target: "WindowTopBarPluginMenu",
  mode: "add",
  name: "PDIIIFPlugin",
  component: PDIIIF,
  mapDispatchToProps,
  reducers: {
    windowDialogs: PDIIIFDialogReducer,
  },
};
