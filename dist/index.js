var $gXNCa$reactjsxruntime = require("react/jsx-runtime");
var $gXNCa$react = require("react");
var $gXNCa$proptypes = require("prop-types");
var $gXNCa$materialuicoreListItemIcon = require("@material-ui/core/ListItemIcon");
var $gXNCa$materialuicoreListItemText = require("@material-ui/core/ListItemText");
var $gXNCa$materialuicoreMenuItem = require("@material-ui/core/MenuItem");
var $gXNCa$materialuicoreCircularProgress = require("@material-ui/core/CircularProgress");
var $gXNCa$materialuicorestyles = require("@material-ui/core/styles");
var $gXNCa$miradordistessrcstateselectors = require("mirador/dist/es/src/state/selectors");
var $gXNCa$pdiiif = require("pdiiif");
var $gXNCa$materialuiiconsPictureAsPdf = require("@material-ui/icons/PictureAsPdf");
var $gXNCa$materialuicoreButton = require("@material-ui/core/Button");
var $gXNCa$materialuicoreDialog = require("@material-ui/core/Dialog");
var $gXNCa$materialuicoreDialogActions = require("@material-ui/core/DialogActions");
var $gXNCa$materialuicoreDialogTitle = require("@material-ui/core/DialogTitle");
var $gXNCa$materialuicoreDialogContent = require("@material-ui/core/DialogContent");
var $gXNCa$materialuicoreDialogContentText = require("@material-ui/core/DialogContentText");
var $gXNCa$materialuicoreTypography = require("@material-ui/core/Typography");

function $parcel$defineInteropFlag(a) {
  Object.defineProperty(a, '__esModule', {value: true, configurable: true});
}
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}
function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}

$parcel$defineInteropFlag(module.exports);

$parcel$export(module.exports, "default", () => $4fa36e821943b400$export$2e2bcd8739ae039);
$parcel$export(module.exports, "MiradorPDIIIFMenuItemPlugin", () => $52427eebf9628752$export$2e2bcd8739ae039);
$parcel$export(module.exports, "MiradorPDIIIFDialogPlugin", () => $e8776a1570c913d2$export$2e2bcd8739ae039);











const $52427eebf9628752$var$dialogReducer = (state = {}, action)=>{
    if (action.type === "OPEN_WINDOW_DIALOG") return {
        ...state,
        [action.windowId]: {
            openDialog: action.dialogType
        }
    };
    if (action.type === "CLOSE_WINDOW_DIALOG") return {
        ...state,
        [action.windowId]: {
            openDialog: null
        }
    };
    return state;
};
const $52427eebf9628752$var$PDIIIFReducer = (state = {}, action)=>{
    if (action.type === "PDIIIF/ALLOW_PDF_DOWNLOAD") return {
        ...state,
        [action.windowId]: {
            ...state[action.windowId],
            PDFDownloadEnabled: true
        }
    };
    if (action.type === "PDIIIF/SET_ESTIMATED_SIZE") return {
        ...state,
        [action.windowId]: {
            ...state[action.windowId],
            estimatedSizeInBytes: action.size
        }
    };
    return state;
};
const $52427eebf9628752$var$mapStateToProps = (state, { windowId: windowId  })=>({
        manifest: state.manifests[state.windows[windowId].manifestId],
        canvasGroupings: (0, $gXNCa$miradordistessrcstateselectors.getCanvasGroupings)(state, {
            windowId: windowId
        }),
        allowPdfDownload: state.PDIIIF[windowId]?.PDFDownloadEnabled ?? false
    });
const $52427eebf9628752$var$mapDispatchToProps = (dispatch, { windowId: windowId  })=>({
        setAllowPdfDownload: ()=>dispatch({
                type: "PDIIIF/ALLOW_PDF_DOWNLOAD",
                windowId: windowId
            }),
        setEstimatedSize: (size)=>dispatch({
                type: "PDIIIF/SET_ESTIMATED_SIZE",
                windowId: windowId,
                size: size
            }),
        openDialog: ()=>dispatch({
                type: "OPEN_WINDOW_DIALOG",
                windowId: windowId,
                dialogType: "PDIIIF"
            })
    });
class $52427eebf9628752$var$PDIIIFMenuItem extends (0, $gXNCa$react.Component) {
    constructor(props){
        super(props);
        this.state = {
            hasChecked: false,
            supportsFilesystemAPI: typeof showSaveFilePicker === "function"
        };
    }
    openDialogAndCloseMenu() {
        const { handleClose: handleClose , openDialog: openDialog  } = this.props;
        openDialog();
        handleClose();
    }
    async componentDidMount() {
        const { manifest: manifest , canvasGroupings: canvasGroupings , setAllowPdfDownload: setAllowPdfDownload , allowPdfDownload: allowPdfDownload , setEstimatedSize: setEstimatedSize  } = this.props;
        if (allowPdfDownload || !this.state.supportsFilesystemAPI) {
            this.setState({
                hasChecked: true
            });
            return;
        }
        if (!manifest?.error && manifest?.json) // Only show PDF's for PTO's
        {
            if (canvasGroupings.length > 1) {
                // Check size can be estimated
                const estimatedSizeInBytes = await (0, $gXNCa$pdiiif.estimatePdfSize)({
                    manifest: manifest.json,
                    maxWidth: 1500
                });
                // Estimated size, or 0
                // N.B. Sometimes this is NaN, but not sure what triggers this
                // it seems to be be caused bug in PDIIIIF trying to divide 0 by 0
                if (estimatedSizeInBytes !== 0) {
                    setAllowPdfDownload();
                    setEstimatedSize(estimatedSizeInBytes);
                }
            }
        }
        this.setState({
            hasChecked: true
        });
    }
    renderMenuItemText = ()=>{
        const { hasChecked: hasChecked  } = this.state;
        const { allowPdfDownload: allowPdfDownload  } = this.props;
        if (!hasChecked) return "Checking document";
        if (allowPdfDownload) return "Download PDF";
        return "PDF Unavailable";
    };
    render() {
        const { classes: classes , allowPdfDownload: allowPdfDownload  } = this.props;
        const { hasChecked: hasChecked  } = this.state;
        return /*#__PURE__*/ (0, $gXNCa$reactjsxruntime.jsx)("div", {
            children: /*#__PURE__*/ (0, $gXNCa$reactjsxruntime.jsxs)((0, ($parcel$interopDefault($gXNCa$materialuicoreMenuItem))), {
                disabled: !hasChecked || !allowPdfDownload,
                onClick: ()=>this.openDialogAndCloseMenu(),
                children: [
                    /*#__PURE__*/ (0, $gXNCa$reactjsxruntime.jsx)((0, ($parcel$interopDefault($gXNCa$materialuicoreListItemIcon))), {
                        children: /*#__PURE__*/ (0, $gXNCa$reactjsxruntime.jsx)((0, ($parcel$interopDefault($gXNCa$materialuiiconsPictureAsPdf))), {})
                    }),
                    /*#__PURE__*/ (0, $gXNCa$reactjsxruntime.jsx)((0, ($parcel$interopDefault($gXNCa$materialuicoreListItemText))), {
                        primaryTypographyProps: {
                            variant: "body1"
                        },
                        children: this.renderMenuItemText()
                    }),
                    !hasChecked && /*#__PURE__*/ (0, $gXNCa$reactjsxruntime.jsx)((0, ($parcel$interopDefault($gXNCa$materialuicoreCircularProgress))), {
                        size: 15,
                        className: classes.progress
                    })
                ]
            })
        });
    }
}
$52427eebf9628752$var$PDIIIFMenuItem.propTypes = {
    allowPdfDownload: (0, ($parcel$interopDefault($gXNCa$proptypes))).bool,
    canvasGroupings: (0, ($parcel$interopDefault($gXNCa$proptypes))).array.isRequired,
    handleClose: (0, ($parcel$interopDefault($gXNCa$proptypes))).func,
    openPDIIIFDialog: (0, ($parcel$interopDefault($gXNCa$proptypes))).func,
    manifest: (0, ($parcel$interopDefault($gXNCa$proptypes))).object.isRequired,
    setAllowPdfDownload: (0, ($parcel$interopDefault($gXNCa$proptypes))).func.isRequired,
    setEstimatedSize: (0, ($parcel$interopDefault($gXNCa$proptypes))).func.isRequired
};
$52427eebf9628752$var$PDIIIFMenuItem.defaultProps = {
    handleClose: ()=>{},
    openPDIIIFDialog: ()=>{}
};
const $52427eebf9628752$var$styles = ()=>({
        progress: {
            marginLeft: "2px"
        }
    });
var $52427eebf9628752$export$2e2bcd8739ae039 = {
    target: "WindowTopBarPluginMenu",
    mode: "add",
    name: "PDIIIFMenuItem",
    component: (0, $gXNCa$materialuicorestyles.withStyles)($52427eebf9628752$var$styles)($52427eebf9628752$var$PDIIIFMenuItem),
    mapDispatchToProps: $52427eebf9628752$var$mapDispatchToProps,
    mapStateToProps: $52427eebf9628752$var$mapStateToProps,
    reducers: {
        windowDialogs: $52427eebf9628752$var$dialogReducer,
        PDIIIF: $52427eebf9628752$var$PDIIIFReducer
    }
};














const $e8776a1570c913d2$var$mapDispatchToProps = (dispatch, { windowId: windowId  })=>({
        closeDialog: ()=>dispatch({
                type: "CLOSE_WINDOW_DIALOG",
                windowId: windowId
            })
    });
const $e8776a1570c913d2$var$mapStateToProps = (state, { windowId: windowId , containerId: containerId  })=>({
        open: state.windowDialogs[windowId] && state.windowDialogs[windowId].openDialog === "PDIIIF",
        manifestId: state.windows[windowId].manifestId,
        manifest: state.manifests[state.windows[windowId].manifestId],
        containerId: state.config.id,
        estimatedSize: state.PDIIIF[windowId]?.estimatedSizeInBytes,
        allowPdfDownload: state.PDIIIF[windowId]?.allowPdfDownload
    });
class $e8776a1570c913d2$export$7d64c24843cca09f extends (0, $gXNCa$react.Component) {
    constructor(props){
        super(props);
        this.props = props;
        this.state = {
            savingError: null,
            supportsFilesystemAPI: typeof showSaveFilePicker === "function"
        };
    }
    /**
   * Format bytes to human readable string
   */ formatBytes(bytes, decimals = 2) {
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
            "YiB"
        ];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
    }
    /**
   * Downoloads the PDF
   */ downloadPDF = async ()=>{
        const { manifest: manifest  } = this.props;
        const { supportsFilesystemAPI: supportsFilesystemAPI  } = this.state;
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
                            accept: {
                                "application/pdf": [
                                    ".pdf"
                                ]
                            }
                        }
                    ]
                });
            } catch (e) {
                this.setState({
                    savingError: e.message
                });
                return console.error(e);
            }
            try {
                if (await handle.queryPermission({
                    mode: "readwrite"
                }) !== "granted") // Throw error if permission is not granted
                // N.B. I wasn't able to trigger this error (e.g. by choosing folder with strict permission)
                // but it's here for completeness
                throw new Error("Permission to write to file was not granted");
                else {
                    // Reset the error state
                    this.setState({
                        savingError: null
                    });
                    const pdfPath = (await handle.getFile()).name;
                    const webWritable = await handle.createWritable();
                    // Start the PDF generation
                    return await (0, $gXNCa$pdiiif.convertManifest)(manifest, webWritable, {
                        maxWidth: 1500,
                        coverPageEndpoint: "https://pdiiif.jbaiter.de/api/coverpage"
                    });
                }
            } catch (e) {
                // Display permission / conversion error
                this.setState({
                    savingError: e.message
                });
                return console.error(e);
            }
        }
    };
    /**
   * Returns the rendered component
   */ render() {
        const { savingError: savingError  } = this.state;
        const { classes: classes , closeDialog: closeDialog , containerId: containerId , open: open , allowPdfDownload: allowPdfDownload , estimatedSize: estimatedSize  } = this.props;
        !open || allowPdfDownload;
        return /*#__PURE__*/ (0, $gXNCa$reactjsxruntime.jsxs)((0, ($parcel$interopDefault($gXNCa$materialuicoreDialog))), {
            container: document.querySelector(`#${containerId} .mirador-viewer`),
            disableEnforceFocus: true,
            onClose: closeDialog,
            open: open,
            scroll: "paper",
            fullWidth: true,
            maxWidth: "xs",
            children: [
                /*#__PURE__*/ (0, $gXNCa$reactjsxruntime.jsx)((0, ($parcel$interopDefault($gXNCa$materialuicoreDialogTitle))), {
                    disableTypography: true,
                    className: classes.h2,
                    children: /*#__PURE__*/ (0, $gXNCa$reactjsxruntime.jsx)((0, ($parcel$interopDefault($gXNCa$materialuicoreTypography))), {
                        variant: "h2",
                        children: "PDF Download"
                    })
                }),
                /*#__PURE__*/ (0, $gXNCa$reactjsxruntime.jsxs)((0, ($parcel$interopDefault($gXNCa$materialuicoreDialogContent))), {
                    children: [
                        savingError && /*#__PURE__*/ (0, $gXNCa$reactjsxruntime.jsx)((0, ($parcel$interopDefault($gXNCa$materialuicoreDialogContentText))), {
                            children: savingError.message
                        }),
                        /*#__PURE__*/ (0, $gXNCa$reactjsxruntime.jsxs)((0, ($parcel$interopDefault($gXNCa$materialuicoreDialogContentText))), {
                            children: [
                                "Download a PDF of the current document?",
                                estimatedSize ? ` (Estimated file size: ${this.formatBytes(estimatedSize)})` : ""
                            ]
                        })
                    ]
                }),
                /*#__PURE__*/ (0, $gXNCa$reactjsxruntime.jsxs)((0, ($parcel$interopDefault($gXNCa$materialuicoreDialogActions))), {
                    children: [
                        /*#__PURE__*/ (0, $gXNCa$reactjsxruntime.jsx)((0, ($parcel$interopDefault($gXNCa$materialuicoreButton))), {
                            onClick: this.downloadPDF,
                            color: "primary",
                            children: "Download"
                        }),
                        /*#__PURE__*/ (0, $gXNCa$reactjsxruntime.jsx)((0, ($parcel$interopDefault($gXNCa$materialuicoreButton))), {
                            onClick: closeDialog,
                            color: "primary",
                            children: "Close"
                        })
                    ]
                })
            ]
        });
    }
}
$e8776a1570c913d2$export$7d64c24843cca09f.propTypes = {
    classes: (0, ($parcel$interopDefault($gXNCa$proptypes))).shape({
        h2: (0, ($parcel$interopDefault($gXNCa$proptypes))).string,
        h3: (0, ($parcel$interopDefault($gXNCa$proptypes))).string
    }).isRequired,
    closeDialog: (0, ($parcel$interopDefault($gXNCa$proptypes))).func.isRequired,
    containerId: (0, ($parcel$interopDefault($gXNCa$proptypes))).string.isRequired,
    estimatedSize: (0, ($parcel$interopDefault($gXNCa$proptypes))).number,
    manifest: (0, ($parcel$interopDefault($gXNCa$proptypes))).object,
    manifestId: (0, ($parcel$interopDefault($gXNCa$proptypes))).string,
    allowPdfDownload: (0, ($parcel$interopDefault($gXNCa$proptypes))).bool,
    open: (0, ($parcel$interopDefault($gXNCa$proptypes))).bool,
    windowId: (0, ($parcel$interopDefault($gXNCa$proptypes))).string.isRequired
};
$e8776a1570c913d2$export$7d64c24843cca09f.defaultProps = {
    canvases: [],
    open: false
};
const $e8776a1570c913d2$var$styles = ()=>({
        h2: {
            paddingBottom: 0
        },
        h3: {
            marginTop: "20px"
        }
    });
var $e8776a1570c913d2$export$2e2bcd8739ae039 = {
    target: "Window",
    mode: "add",
    name: "PDIIIFDialog",
    component: (0, $gXNCa$materialuicorestyles.withStyles)($e8776a1570c913d2$var$styles)($e8776a1570c913d2$export$7d64c24843cca09f),
    mapDispatchToProps: $e8776a1570c913d2$var$mapDispatchToProps,
    mapStateToProps: $e8776a1570c913d2$var$mapStateToProps
};


var $4fa36e821943b400$export$2e2bcd8739ae039 = [
    (0, $52427eebf9628752$export$2e2bcd8739ae039),
    (0, $e8776a1570c913d2$export$2e2bcd8739ae039)
];


//# sourceMappingURL=index.js.map
