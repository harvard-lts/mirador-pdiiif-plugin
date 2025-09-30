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
import FormControl from "@material-ui/core/FormControl";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";

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
  printServiceHost: state.config.miradorPdiiifPlugin?.printServiceDomain,
  nrsLookupHost: state.config.miradorPdiiifPlugin?.nrsLookupDomain,
});

/**
 * PDIIIFRestrictedDialog - Dialog shown when object is not public
 */
export class PDIIIFRestrictedDialog extends Component {
  constructor(props) {
    super(props);
    const { printServiceHost, nrsLookupHost } = this.props;
    this.state = {
      conversionType: 'current',
      rangeFrom: '',
      rangeTo: '',
      rangeFromError: false,
      rangeToError: false,
      email: '',
      emailError: false,
      confirmationMessage: '',
      printServiceHost: printServiceHost,
      nrsLookupHost: nrsLookupHost,
    };
  }

  handleDialogClose = () => {
    this.setState({
      confirmationMessage: '',
      rangeFrom: '',
      rangeTo: '',
      email: '',
      rangeFromError: false,
      rangeToError: false,
      emailError: false,
      conversionType: 'current'
    });
    this.props.closeDialog();
  };

  handleConversionTypeChange = (event) => {
    const { email } = this.state;
    const newType = event.target.value;
    
    this.setState({ 
      conversionType: newType,
      confirmationMessage: '', // Clear confirmation when changing type
      // Update email error based on new conversion type
      emailError: !this.validateEmail(email) || (this.isEmailRequiredForType(newType) && email === '')
    });
  };

  isEmailRequiredForType = (conversionType) => {
    if (conversionType === 'entire') {
      const maxCanvas = this.getMaxCanvasNumber();
      return maxCanvas > 10;
    } else if (conversionType === 'range') {
      const { rangeFrom, rangeTo } = this.state;
      const fromNum = parseInt(rangeFrom, 10);
      const toNum = parseInt(rangeTo, 10);
      
      if (isNaN(fromNum) || isNaN(toNum)) return false;
      
      const rangeSize = toNum - fromNum + 1;
      return rangeSize > 10;
    }
    
    return false;
  };

  getMaxCanvasNumber = () => {
    const { manifest } = this.props;
    if (!manifest || !manifest.json || !manifest.json.items) {
      return 999; // Default fallback if manifest not available
    }
    return manifest.json.items.length;
  };

  validateRange = (value) => {
    const num = parseInt(value, 10);
    const maxCanvas = this.getMaxCanvasNumber();
    return value !== '' && (!isNaN(num) && num >= 1 && num <= maxCanvas);
  };

  validateRangeOrder = (fromValue, toValue) => {
    if (fromValue === '' || toValue === '') return true; // Don't validate order if either is empty
    const fromNum = parseInt(fromValue, 10);
    const toNum = parseInt(toValue, 10);
    return fromNum < toNum;
  };

  validateEmail = (email) => {
    if (email === '') return true; // Email is optional by default
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  isEmailRequired = () => {
    const { conversionType, rangeFrom, rangeTo } = this.state;
    
    if (conversionType === 'range') {
      const fromNum = parseInt(rangeFrom, 10);
      const toNum = parseInt(rangeTo, 10);
      
      if (isNaN(fromNum) || isNaN(toNum)) return false;
      
      const rangeSize = toNum - fromNum + 1;
      return rangeSize > 10;
    } else if (conversionType === 'entire') {
      const maxCanvas = this.getMaxCanvasNumber();
      return maxCanvas > 10;
    }
    
    return false;
  };

  validateEmailRequired = () => {
    const { email } = this.state;
    if (!this.isEmailRequired()) return true; // Email not required
    return email !== '' && this.validateEmail(email);
  };

  handleEmailChange = (event) => {
    const value = event.target.value;
    this.setState({
      email: value,
      emailError: !this.validateEmail(value) || (this.isEmailRequired() && value === '')
    });
  };

  handleRangeFromChange = (event) => {
    const value = event.target.value;
    const { rangeTo, email } = this.state;
    const isValidRange = this.validateRange(value);
    const isValidOrder = this.validateRangeOrder(value, rangeTo);
    
    this.setState({ 
      rangeFrom: value,
      rangeFromError: value !== '' && (!isValidRange || !isValidOrder),
      // Also update rangeTo error if order validation changes
      rangeToError: rangeTo !== '' && (!this.validateRange(rangeTo) || !isValidOrder),
      // Update email error if requirement changes
      emailError: !this.validateEmail(email) || (this.isEmailRequired() && email === '')
    });
  };

  handleRangeToChange = (event) => {
    const value = event.target.value;
    const { rangeFrom, email } = this.state;
    const isValidRange = this.validateRange(value);
    const isValidOrder = this.validateRangeOrder(rangeFrom, value);
    
    this.setState({ 
      rangeTo: value,
      rangeToError: value !== '' && (!isValidRange || !isValidOrder),
      // Also update rangeFrom error if order validation changes
      rangeFromError: rangeFrom !== '' && (!this.validateRange(rangeFrom) || !isValidOrder),
      // Update email error if requirement changes
      emailError: !this.validateEmail(email) || (this.isEmailRequired() && email === '')
    });
  };

  getHelperText = (field) => {
    const { rangeFrom, rangeTo, rangeFromError, rangeToError } = this.state;
    const maxCanvas = this.getMaxCanvasNumber();
    
    if (field === 'from' && rangeFromError) {
      if (!this.validateRange(rangeFrom)) {
        return `Enter 1-${maxCanvas}`;
      }
      if (!this.validateRangeOrder(rangeFrom, rangeTo)) {
        return "Must be < end";
      }
    }
    
    if (field === 'to' && rangeToError) {
      if (!this.validateRange(rangeTo)) {
        return `Enter 1-${maxCanvas}`;
      }
      if (!this.validateRangeOrder(rangeFrom, rangeTo)) {
        return "Must be > start";
      }
    }
    
    return "";
  };

  handleConvertToPDF = async () => {
    const { conversionType, rangeFrom, rangeTo, rangeFromError, rangeToError, email, emailError, printServiceHost, nrsLookupHost } = this.state;

    // Extract URN from manifest ID
    let urn = '';
    const { manifest } = this.props;
    if (manifest && manifest.json && manifest.json.id) {
      const manifestId = manifest.json.id;
      // Extract URN from URL like https://nrs.harvard.edu/URN-3:FHCL.HOUGH:105813588:MANIFEST:3
      const match = manifestId.match(/https?:\/\/[^\/]+\/([^:]+:[^:]+:[^:]+):/);
      if (match) {
        urn = match[1]; // This would be URN-3:FHCL.HOUGH:105813588
      }
    }
    
    // Get app_id from lookup API
    let appId = '';
    if (urn) {
      try {
        const lookupResponse = await fetch(`${nrsLookupHost}/api/resolve/${urn}`);
        if (lookupResponse.ok) {
          const lookupData = await lookupResponse.json();
          appId = lookupData.app_id || '';
        }
      } catch (error) {
        console.error('Error fetching app_id from lookup API:', error);
      }
    }
    
    if (conversionType === 'current') {
      // Open new tab for current page conversion
      window.open(`${printServiceHost}/proxy/printpdf/${appId}?n=1&printOpt=single`, '_blank');
    } else if (conversionType === 'range') {
      // Validate range inputs and email requirement before proceeding
      const emailRequired = this.isEmailRequired();
      const isEmailValid = this.validateEmailRequired();
      
      if (rangeFrom === '' || rangeTo === '' || rangeFromError || rangeToError || !isEmailValid) {
        // Set errors if fields are empty or invalid
        this.setState({
          rangeFromError: rangeFrom === '' || !this.validateRange(rangeFrom) || !this.validateRangeOrder(rangeFrom, rangeTo),
          rangeToError: rangeTo === '' || !this.validateRange(rangeTo) || !this.validateRangeOrder(rangeFrom, rangeTo),
          emailError: !this.validateEmail(email) || (emailRequired && email === '')
        });
        return; // Don't proceed if validation fails
      }
      
      const fromNum = parseInt(rangeFrom, 10);
      const toNum = parseInt(rangeTo, 10);
      const rangeSize = toNum - fromNum + 1;
      
      // Build the URL
      const url = `${printServiceHost}/proxy/printpdf/${appId}?printOpt=range&start=${rangeFrom}&end=${rangeTo}&email=${encodeURIComponent(email)}`;
      
      if (rangeSize > 10) {
        // For large requests, send background GET request and show confirmation
        try {
          await fetch(url, { method: 'GET' });
          this.setState({
            confirmationMessage: `PDF sent to ${email}`
          });
          // Don't close dialog immediately for large requests
          return;
        } catch (error) {
          console.error('Error sending PDF request:', error);
          // Fall back to opening in new tab if fetch fails
          window.open(url, '_blank');
        }
      } else {
        // For small requests, open in new tab as before
        window.open(url, '_blank');
      }
    } else if (conversionType === 'entire') {
      // Convert entire document: start=1, end=total canvases
      const maxCanvas = this.getMaxCanvasNumber();
      const rangeSize = maxCanvas; // 1 to maxCanvas = maxCanvas pages
      
      // Check if email is required (when total pages > 10)
      const emailRequired = rangeSize > 10;
      const isEmailValid = !emailRequired || (email !== '' && this.validateEmail(email));
      
      if (emailRequired && !isEmailValid) {
        // Set email error if required but not provided or invalid
        this.setState({
          emailError: email === '' || !this.validateEmail(email)
        });
        return; // Don't proceed if validation fails
      }
      
      // Build the URL for entire document
      const url = `${printServiceHost}/proxy/printpdf/${appId}?printOpt=range&start=1&end=${maxCanvas}&email=${encodeURIComponent(email)}`;
      
      if (rangeSize > 10) {
        // For large documents, send background GET request and show confirmation
        try {
          await fetch(url, { method: 'GET' });
          this.setState({
            confirmationMessage: `PDF sent to ${email}`
          });
          // Don't close dialog immediately for large requests
          return;
        } catch (error) {
          console.error('Error sending PDF request:', error);
          // Fall back to opening in new tab if fetch fails
          window.open(url, '_blank');
        }
      } else {
        // For small documents, open in new tab
        window.open(url, '_blank');
      }
    } else {
      // Fallback for any other conversion types
      console.log('Convert to PDF:', { conversionType, rangeFrom, rangeTo });
    }
    
    // Close dialog after conversion request (except for large range requests)
    this.props.closeDialog();
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
          <Typography variant="h2">PDF Request</Typography>
        </DialogTitle>
        <DialogContent>
          {this.state.confirmationMessage && (
            <Box mb={2} p={2} bgcolor="success.main" color="white" borderRadius={1}>
              <Typography variant="body1">
                {this.state.confirmationMessage}
              </Typography>
            </Box>
          )}
          <DialogContentText>
            Use this form to request one or more pages in PDF format for printing or saving. Requests for 10 pages or less will be delivered directly to your browser. For larger requests, enter your email below and we will send a link to the PDF when the conversion is complete. The link will be valid for 7 days.
          </DialogContentText>
          <DialogContentText>
            <strong>Tips on requesting a PDF:</strong>
            <br />
            • The PDF conversion rate is approx. 10 pages per minute. Large requests can take an hour or more to process.
            <br />
            • To request a range of pages, use page sequence numbers rather than printed page numbers. Sequence numbers appear in parentheses – e.g., (seq. 1); look for them in the left-hand table of contents or mouse over the page thumbnail at the bottom of the viewer.
          </DialogContentText>
          
          <Box mt={3}>
            <FormControl component="fieldset">
              <RadioGroup
                value={this.state.conversionType}
                onChange={this.handleConversionTypeChange}
              >
                <FormControlLabel
                  value="current"
                  control={<Radio />}
                  label="Convert the current page"
                />
                <FormControlLabel
                  value="range"
                  control={<Radio />}
                  label={
                    <Box display="flex" alignItems="center" flexWrap="wrap">
                      <span>Convert a range: from seq.&nbsp;</span>
                      <TextField
                        size="small"
                        variant="outlined"
                        value={this.state.rangeFrom}
                        onChange={this.handleRangeFromChange}
                        disabled={this.state.conversionType !== 'range'}
                        error={this.state.rangeFromError}
                        helperText={this.getHelperText('from')}
                        inputProps={{ min: 1, max: this.getMaxCanvasNumber(), pattern: "[0-9]*" }}
                        style={{ width: '80px', margin: '0 8px' }}
                      />
                      <span>&nbsp;to seq.&nbsp;</span>
                      <TextField
                        size="small"
                        variant="outlined"
                        value={this.state.rangeTo}
                        onChange={this.handleRangeToChange}
                        disabled={this.state.conversionType !== 'range'}
                        error={this.state.rangeToError}
                        helperText={this.getHelperText('to')}
                        inputProps={{ min: 1, max: this.getMaxCanvasNumber(), pattern: "[0-9]*" }}
                        style={{ width: '80px', margin: '0 8px' }}
                      />
                    </Box>
                  }
                />
                <FormControlLabel
                  value="entire"
                  control={<Radio />}
                  label="Convert entire document"
                />
              </RadioGroup>
            </FormControl>
          </Box>
          
          <Box mt={3}>
            <Typography variant="body2" style={{ marginBottom: '8px' }}>
              For requests of more than 10 pages, enter your email address so that we can send a link to the PDF when the conversion is complete:
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              label={this.isEmailRequired() ? "Email address (required)" : "Email address"}
              value={this.state.email}
              onChange={this.handleEmailChange}
              error={this.state.emailError}
              helperText={
                this.state.emailError 
                  ? (this.isEmailRequired() && this.state.email === '') 
                    ? "Email is required for requests of more than 10 pages"
                    : "Please enter a valid email address"
                  : ""
              }
              placeholder="example@email.com"
              required={this.isEmailRequired()}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleConvertToPDF} color="primary" variant="contained">
            Convert to PDF
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
  printServiceHost: PropTypes.string,
  nrsLookupHost: PropTypes.string,
};

PDIIIFRestrictedDialog.defaultProps = {
  open: false,
  printServiceHost: null,
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