import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";

const mapDispatchToProps = (dispatch, { windowId }) => ({
  closeDialog: () => {
    dispatch({ type: "CLOSE_WINDOW_DIALOG", windowId });
  },
});

const mapStateToProps = (state, { windowId }) => ({
  open:
    state.windowDialogs[windowId] &&
    state.windowDialogs[windowId].openDialog === "PDIIIF_RESTRICTED",
  containerId: state.config.id,
  manifest: state.manifests[state.windows[windowId].manifestId],
  nrsLookupHost: state.config.miradorPdiiifPlugin?.nrsLookupDomain,
});

/**
 * PDIIIFRestrictedDialog - Dialog shown when object is not public
 */
export class PDIIIFRestrictedDialog extends Component {
  constructor(props) {
    super(props);
    const { nrsLookupHost } = this.props;
    this.state = {
      nrsLookupHost: nrsLookupHost,
    };
  }

  handleDialogClose = () => {
    this.props.closeDialog();
  };

  getOldViewerUrl = () => {
    const { manifest, nrsLookupHost } = this.props;

    if (manifest && manifest.json) {
      const manifestId = manifest && manifest.json ? manifest.json.id || manifest.json['@id'] : null;
      if (!manifestId) return '#'; // Fallback if no manifest ID
      
      // Extract host from manifest URL
      let host = nrsLookupHost || 'https://nrs.harvard.edu'; // Default fallback
      
      // Check if manifest URL starts with "https://nrs" and ends with "harvard.edu"
      const hostMatch = manifestId.match(/^(https:\/\/nrs[^\/]*harvard\.edu)/);
      if (hostMatch) {
        host = hostMatch[1];
      }
      
      // Extract URN from URL like https://nrs.harvard.edu/URN-3:FHCL.HOUGH:105813588:MANIFEST:3
      const urnMatch = manifestId.match(/https?:\/\/[^\/]+\/([^:]+:[^:]+:[^:]+):/);
      if (urnMatch) {
        const urn = urnMatch[1]; // This would be URN-3:FHCL.HOUGH:105813588
        return `${host}/${urn}:MIRADOR:2`;
      }
    }
    
    return '#'; // Fallback if URN cannot be extracted
  };

  /**
   * Returns the rendered component
   */
  render() {
    const {
      classes,
      closeDialog,
      containerId,
      open,
    } = this.props;

    if (!open) return null;

    return (
      <Dialog
        container={document.querySelector(`#${containerId} .mirador-viewer`)}
        disableEnforceFocus
        onClose={this.handleDialogClose}
        open={open}
        scroll="paper"
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle disableTypography className={classes.h2}>
          <Typography variant="h2">PDF Download</Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" style={{ marginBottom: '16px' }}>
            Services for restricted items such as PDF generation are currently unavailable in the latest version of the Viewer.
          </Typography>
          <Typography variant="body1">
            <a href={this.getOldViewerUrl()} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: '#1976d2' }}>
              View this item in the old Viewer
            </a> to download the PDF.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleDialogClose} color="primary" variant="contained">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

PDIIIFRestrictedDialog.propTypes = {
  classes: PropTypes.shape({
    h2: PropTypes.string,
  }).isRequired,
  closeDialog: PropTypes.func.isRequired,
  containerId: PropTypes.string.isRequired,
  manifest: PropTypes.object,
  open: PropTypes.bool,
  windowId: PropTypes.string.isRequired,
  nrsLookupHost: PropTypes.string,
};

PDIIIFRestrictedDialog.defaultProps = {
  open: false,
  nrsLookupHost: null,
};

const styles = () => ({
  h2: {
    paddingBottom: 0,
  },
});

export default {
  target: "Window",
  mode: "add",
  name: "PDIIIFRestrictedDialog",
  component: withStyles(styles)(PDIIIFRestrictedDialog),
  mapDispatchToProps,
  mapStateToProps,
};