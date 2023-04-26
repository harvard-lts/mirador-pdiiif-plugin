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
import { getContainerId } from "mirador/dist/es/src/state/selectors/config";

const mapDispatchToProps = (dispatch, { windowId }) => ({
  closeDialog: () => dispatch({ type: "CLOSE_WINDOW_DIALOG", windowId }),
});

const mapStateToProps = (state, { windowId }) => ({
  open:
    state.windowDialogs[windowId] &&
    state.windowDialogs[windowId].openDialog === "PDIIIF",
});

/**
 * PDIIIFDialog ~
 */
export class PDIIIFDialog extends Component {
  /**
   * Returns the rendered component
   */
  render() {
    const { classes, closeDialog, containerId, open, windowId } = this.props;

    if (!open) return "";

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
