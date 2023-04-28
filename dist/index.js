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
var $gXNCa$reactjsxruntime = require("react/jsx-runtime");
var $gXNCa$materialuicoreButton = require("@material-ui/core/Button");
var $gXNCa$materialuicoreDialog = require("@material-ui/core/Dialog");
var $gXNCa$materialuicoreDialogActions = require("@material-ui/core/DialogActions");
var $gXNCa$materialuicoreDialogTitle = require("@material-ui/core/DialogTitle");
var $gXNCa$materialuicoreDialogContent = require("@material-ui/core/DialogContent");
var $gXNCa$materialuicoreDialogContentText = require("@material-ui/core/DialogContentText");
var $gXNCa$materialuicoreTypography = require("@material-ui/core/Typography");

var $parcel$global =
typeof globalThis !== 'undefined'
  ? globalThis
  : typeof self !== 'undefined'
  ? self
  : typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
  ? global
  : {};
var $parcel$modules = {};
var $parcel$inits = {};

var parcelRequire = $parcel$global["parcelRequiredb48"];
if (parcelRequire == null) {
  parcelRequire = function(id) {
    if (id in $parcel$modules) {
      return $parcel$modules[id].exports;
    }
    if (id in $parcel$inits) {
      var init = $parcel$inits[id];
      delete $parcel$inits[id];
      var module = {id: id, exports: {}};
      $parcel$modules[id] = module;
      init.call(module.exports, module, module.exports);
      return module.exports;
    }
    var err = new Error("Cannot find module '" + id + "'");
    err.code = 'MODULE_NOT_FOUND';
    throw err;
  };

  parcelRequire.register = function register(id, init) {
    $parcel$inits[id] = init;
  };

  $parcel$global["parcelRequiredb48"] = parcelRequire;
}
parcelRequire.register("73RJE", function(module, exports) {
"use strict";
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports["default"] = void 0;

var $52427eebf9628752$var$_react = $52427eebf9628752$var$_interopRequireWildcard($gXNCa$react);

var $52427eebf9628752$var$_propTypes = $52427eebf9628752$var$_interopRequireDefault($gXNCa$proptypes);

var $52427eebf9628752$var$_ListItemIcon = $52427eebf9628752$var$_interopRequireDefault($gXNCa$materialuicoreListItemIcon);

var $52427eebf9628752$var$_ListItemText = $52427eebf9628752$var$_interopRequireDefault($gXNCa$materialuicoreListItemText);

var $52427eebf9628752$var$_MenuItem = $52427eebf9628752$var$_interopRequireDefault($gXNCa$materialuicoreMenuItem);

var $52427eebf9628752$var$_CircularProgress = $52427eebf9628752$var$_interopRequireDefault($gXNCa$materialuicoreCircularProgress);




var $52427eebf9628752$var$_PictureAsPdf = $52427eebf9628752$var$_interopRequireDefault($gXNCa$materialuiiconsPictureAsPdf);

function $52427eebf9628752$var$_interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    };
}
function $52427eebf9628752$var$_getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return ($52427eebf9628752$var$_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function $52427eebf9628752$var$_interopRequireWildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) return obj;
    if (obj === null || $52427eebf9628752$var$_typeof(obj) !== "object" && typeof obj !== "function") return {
        "default": obj
    };
    var cache = $52427eebf9628752$var$_getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) return cache.get(obj);
    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj)if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
        var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
        if (desc && (desc.get || desc.set)) Object.defineProperty(newObj, key, desc);
        else newObj[key] = obj[key];
    }
    newObj["default"] = obj;
    if (cache) cache.set(obj, newObj);
    return newObj;
}
function $52427eebf9628752$var$_typeof(obj) {
    "@babel/helpers - typeof";
    return $52427eebf9628752$var$_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
        return typeof obj;
    } : function(obj) {
        return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, $52427eebf9628752$var$_typeof(obj);
}
function $52427eebf9628752$var$_regeneratorRuntime() {
    "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ 
    $52427eebf9628752$var$_regeneratorRuntime = function _regeneratorRuntime() {
        return exports1;
    };
    var exports1 = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function(obj, key, desc) {
        obj[key] = desc.value;
    }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
    function define(obj, key, value) {
        return Object.defineProperty(obj, key, {
            value: value,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }), obj[key];
    }
    try {
        define({}, "");
    } catch (err) {
        define = function define(obj, key, value) {
            return obj[key] = value;
        };
    }
    function wrap(innerFn, outerFn, self, tryLocsList) {
        var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []);
        return defineProperty(generator, "_invoke", {
            value: makeInvokeMethod(innerFn, self, context)
        }), generator;
    }
    function tryCatch(fn, obj, arg) {
        try {
            return {
                type: "normal",
                arg: fn.call(obj, arg)
            };
        } catch (err) {
            return {
                type: "throw",
                arg: err
            };
        }
    }
    exports1.wrap = wrap;
    var ContinueSentinel = {};
    function Generator() {}
    function GeneratorFunction() {}
    function GeneratorFunctionPrototype() {}
    var IteratorPrototype = {};
    define(IteratorPrototype, iteratorSymbol, function() {
        return this;
    });
    var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([])));
    NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
    var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
    function defineIteratorMethods(prototype) {
        [
            "next",
            "throw",
            "return"
        ].forEach(function(method) {
            define(prototype, method, function(arg) {
                return this._invoke(method, arg);
            });
        });
    }
    function AsyncIterator(generator, PromiseImpl) {
        function invoke(method, arg, resolve, reject) {
            var record = tryCatch(generator[method], generator, arg);
            if ("throw" !== record.type) {
                var result = record.arg, value = result.value;
                return value && "object" == $52427eebf9628752$var$_typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function(value) {
                    invoke("next", value, resolve, reject);
                }, function(err) {
                    invoke("throw", err, resolve, reject);
                }) : PromiseImpl.resolve(value).then(function(unwrapped) {
                    result.value = unwrapped, resolve(result);
                }, function(error) {
                    return invoke("throw", error, resolve, reject);
                });
            }
            reject(record.arg);
        }
        var previousPromise;
        defineProperty(this, "_invoke", {
            value: function value(method, arg) {
                function callInvokeWithMethodAndArg() {
                    return new PromiseImpl(function(resolve, reject) {
                        invoke(method, arg, resolve, reject);
                    });
                }
                return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
            }
        });
    }
    function makeInvokeMethod(innerFn, self, context) {
        var state = "suspendedStart";
        return function(method, arg) {
            if ("executing" === state) throw new Error("Generator is already running");
            if ("completed" === state) {
                if ("throw" === method) throw arg;
                return doneResult();
            }
            for(context.method = method, context.arg = arg;;){
                var delegate = context.delegate;
                if (delegate) {
                    var delegateResult = maybeInvokeDelegate(delegate, context);
                    if (delegateResult) {
                        if (delegateResult === ContinueSentinel) continue;
                        return delegateResult;
                    }
                }
                if ("next" === context.method) context.sent = context._sent = context.arg;
                else if ("throw" === context.method) {
                    if ("suspendedStart" === state) throw state = "completed", context.arg;
                    context.dispatchException(context.arg);
                } else "return" === context.method && context.abrupt("return", context.arg);
                state = "executing";
                var record = tryCatch(innerFn, self, context);
                if ("normal" === record.type) {
                    if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
                    return {
                        value: record.arg,
                        done: context.done
                    };
                }
                "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
            }
        };
    }
    function maybeInvokeDelegate(delegate, context) {
        var methodName = context.method, method = delegate.iterator[methodName];
        if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel;
        var record = tryCatch(method, delegate.iterator, context.arg);
        if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
        var info = record.arg;
        return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
    }
    function pushTryEntry(locs) {
        var entry = {
            tryLoc: locs[0]
        };
        1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
    }
    function resetTryEntry(entry) {
        var record = entry.completion || {};
        record.type = "normal", delete record.arg, entry.completion = record;
    }
    function Context(tryLocsList) {
        this.tryEntries = [
            {
                tryLoc: "root"
            }
        ], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
    }
    function values(iterable) {
        if (iterable) {
            var iteratorMethod = iterable[iteratorSymbol];
            if (iteratorMethod) return iteratorMethod.call(iterable);
            if ("function" == typeof iterable.next) return iterable;
            if (!isNaN(iterable.length)) {
                var i = -1, next = function next() {
                    for(; ++i < iterable.length;)if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;
                    return next.value = undefined, next.done = !0, next;
                };
                return next.next = next;
            }
        }
        return {
            next: doneResult
        };
    }
    function doneResult() {
        return {
            value: undefined,
            done: !0
        };
    }
    return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", {
        value: GeneratorFunctionPrototype,
        configurable: !0
    }), defineProperty(GeneratorFunctionPrototype, "constructor", {
        value: GeneratorFunction,
        configurable: !0
    }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports1.isGeneratorFunction = function(genFun) {
        var ctor = "function" == typeof genFun && genFun.constructor;
        return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
    }, exports1.mark = function(genFun) {
        return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
    }, exports1.awrap = function(arg) {
        return {
            __await: arg
        };
    }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function() {
        return this;
    }), exports1.AsyncIterator = AsyncIterator, exports1.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
        void 0 === PromiseImpl && (PromiseImpl = Promise);
        var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
        return exports1.isGeneratorFunction(outerFn) ? iter : iter.next().then(function(result) {
            return result.done ? result.value : iter.next();
        });
    }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function() {
        return this;
    }), define(Gp, "toString", function() {
        return "[object Generator]";
    }), exports1.keys = function(val) {
        var object = Object(val), keys = [];
        for(var key in object)keys.push(key);
        return keys.reverse(), function next() {
            for(; keys.length;){
                var key = keys.pop();
                if (key in object) return next.value = key, next.done = !1, next;
            }
            return next.done = !0, next;
        };
    }, exports1.values = values, Context.prototype = {
        constructor: Context,
        reset: function reset(skipTempReset) {
            if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for(var name in this)"t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
        },
        stop: function stop() {
            this.done = !0;
            var rootRecord = this.tryEntries[0].completion;
            if ("throw" === rootRecord.type) throw rootRecord.arg;
            return this.rval;
        },
        dispatchException: function dispatchException(exception) {
            if (this.done) throw exception;
            var context = this;
            function handle(loc, caught) {
                return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
            }
            for(var i = this.tryEntries.length - 1; i >= 0; --i){
                var entry = this.tryEntries[i], record = entry.completion;
                if ("root" === entry.tryLoc) return handle("end");
                if (entry.tryLoc <= this.prev) {
                    var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc");
                    if (hasCatch && hasFinally) {
                        if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
                        if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
                    } else if (hasCatch) {
                        if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
                    } else {
                        if (!hasFinally) throw new Error("try statement without catch or finally");
                        if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
                    }
                }
            }
        },
        abrupt: function abrupt(type, arg) {
            for(var i = this.tryEntries.length - 1; i >= 0; --i){
                var entry = this.tryEntries[i];
                if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
                    var finallyEntry = entry;
                    break;
                }
            }
            finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
            var record = finallyEntry ? finallyEntry.completion : {};
            return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
        },
        complete: function complete(record, afterLoc) {
            if ("throw" === record.type) throw record.arg;
            return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
        },
        finish: function finish(finallyLoc) {
            for(var i = this.tryEntries.length - 1; i >= 0; --i){
                var entry = this.tryEntries[i];
                if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
            }
        },
        "catch": function _catch(tryLoc) {
            for(var i = this.tryEntries.length - 1; i >= 0; --i){
                var entry = this.tryEntries[i];
                if (entry.tryLoc === tryLoc) {
                    var record = entry.completion;
                    if ("throw" === record.type) {
                        var thrown = record.arg;
                        resetTryEntry(entry);
                    }
                    return thrown;
                }
            }
            throw new Error("illegal catch attempt");
        },
        delegateYield: function delegateYield(iterable, resultName, nextLoc) {
            return this.delegate = {
                iterator: values(iterable),
                resultName: resultName,
                nextLoc: nextLoc
            }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
        }
    }, exports1;
}
function $52427eebf9628752$var$asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) resolve(value);
    else Promise.resolve(value).then(_next, _throw);
}
function $52427eebf9628752$var$_asyncToGenerator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                $52427eebf9628752$var$asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                $52427eebf9628752$var$asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
function $52427eebf9628752$var$_classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
}
function $52427eebf9628752$var$_defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, $52427eebf9628752$var$_toPropertyKey(descriptor.key), descriptor);
    }
}
function $52427eebf9628752$var$_createClass(Constructor, protoProps, staticProps) {
    if (protoProps) $52427eebf9628752$var$_defineProperties(Constructor.prototype, protoProps);
    if (staticProps) $52427eebf9628752$var$_defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
        writable: false
    });
    return Constructor;
}
function $52427eebf9628752$var$_inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            writable: true,
            configurable: true
        }
    });
    Object.defineProperty(subClass, "prototype", {
        writable: false
    });
    if (superClass) $52427eebf9628752$var$_setPrototypeOf(subClass, superClass);
}
function $52427eebf9628752$var$_setPrototypeOf(o, p) {
    $52427eebf9628752$var$_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    };
    return $52427eebf9628752$var$_setPrototypeOf(o, p);
}
function $52427eebf9628752$var$_createSuper(Derived) {
    var hasNativeReflectConstruct = $52427eebf9628752$var$_isNativeReflectConstruct();
    return function _createSuperInternal() {
        var Super = $52427eebf9628752$var$_getPrototypeOf(Derived), result;
        if (hasNativeReflectConstruct) {
            var NewTarget = $52427eebf9628752$var$_getPrototypeOf(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
        } else result = Super.apply(this, arguments);
        return $52427eebf9628752$var$_possibleConstructorReturn(this, result);
    };
}
function $52427eebf9628752$var$_possibleConstructorReturn(self, call) {
    if (call && ($52427eebf9628752$var$_typeof(call) === "object" || typeof call === "function")) return call;
    else if (call !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
    return $52427eebf9628752$var$_assertThisInitialized(self);
}
function $52427eebf9628752$var$_assertThisInitialized(self) {
    if (self === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return self;
}
function $52427eebf9628752$var$_isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
        return true;
    } catch (e) {
        return false;
    }
}
function $52427eebf9628752$var$_getPrototypeOf(o) {
    $52427eebf9628752$var$_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
    };
    return $52427eebf9628752$var$_getPrototypeOf(o);
}
function $52427eebf9628752$var$ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        enumerableOnly && (symbols = symbols.filter(function(sym) {
            return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        })), keys.push.apply(keys, symbols);
    }
    return keys;
}
function $52427eebf9628752$var$_objectSpread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = null != arguments[i] ? arguments[i] : {};
        i % 2 ? $52427eebf9628752$var$ownKeys(Object(source), !0).forEach(function(key) {
            $52427eebf9628752$var$_defineProperty(target, key, source[key]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : $52427eebf9628752$var$ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
function $52427eebf9628752$var$_defineProperty(obj, key, value) {
    key = $52427eebf9628752$var$_toPropertyKey(key);
    if (key in obj) Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
    });
    else obj[key] = value;
    return obj;
}
function $52427eebf9628752$var$_toPropertyKey(arg) {
    var key = $52427eebf9628752$var$_toPrimitive(arg, "string");
    return $52427eebf9628752$var$_typeof(key) === "symbol" ? key : String(key);
}
function $52427eebf9628752$var$_toPrimitive(input, hint) {
    if ($52427eebf9628752$var$_typeof(input) !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
        var res = prim.call(input, hint || "default");
        if ($52427eebf9628752$var$_typeof(res) !== "object") return res;
        throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
} // select an icon from material icons to import and use: https://v4.mui.com/components/material-icons/
var $52427eebf9628752$var$dialogReducer = function dialogReducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments.length > 1 ? arguments[1] : undefined;
    if (action.type === "OPEN_WINDOW_DIALOG") return $52427eebf9628752$var$_objectSpread($52427eebf9628752$var$_objectSpread({}, state), {}, $52427eebf9628752$var$_defineProperty({}, action.windowId, {
        openDialog: action.dialogType
    }));
    if (action.type === "CLOSE_WINDOW_DIALOG") return $52427eebf9628752$var$_objectSpread($52427eebf9628752$var$_objectSpread({}, state), {}, $52427eebf9628752$var$_defineProperty({}, action.windowId, {
        openDialog: null
    }));
    return state;
};
var $52427eebf9628752$var$PDIIIFReducer = function PDIIIFReducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments.length > 1 ? arguments[1] : undefined;
    if (action.type === "PDIIIF/ALLOW_PDF_DOWNLOAD") return $52427eebf9628752$var$_objectSpread($52427eebf9628752$var$_objectSpread({}, state), {}, $52427eebf9628752$var$_defineProperty({}, action.windowId, $52427eebf9628752$var$_objectSpread($52427eebf9628752$var$_objectSpread({}, state[action.windowId]), {}, {
        PDFDownloadEnabled: true
    })));
    if (action.type === "PDIIIF/SET_ESTIMATED_SIZE") return $52427eebf9628752$var$_objectSpread($52427eebf9628752$var$_objectSpread({}, state), {}, $52427eebf9628752$var$_defineProperty({}, action.windowId, $52427eebf9628752$var$_objectSpread($52427eebf9628752$var$_objectSpread({}, state[action.windowId]), {}, {
        estimatedSizeInBytes: action.size
    })));
    return state;
};
var $52427eebf9628752$var$mapStateToProps = function mapStateToProps(state, _ref) {
    var _state$PDIIIF$windowI, _state$PDIIIF$windowI2;
    var windowId = _ref.windowId;
    return {
        manifest: state.manifests[state.windows[windowId].manifestId],
        canvasGroupings: (0, $gXNCa$miradordistessrcstateselectors.getCanvasGroupings)(state, {
            windowId: windowId
        }),
        allowPdfDownload: (_state$PDIIIF$windowI = (_state$PDIIIF$windowI2 = state.PDIIIF[windowId]) === null || _state$PDIIIF$windowI2 === void 0 ? void 0 : _state$PDIIIF$windowI2.PDFDownloadEnabled) !== null && _state$PDIIIF$windowI !== void 0 ? _state$PDIIIF$windowI : false
    };
};
var $52427eebf9628752$var$mapDispatchToProps = function mapDispatchToProps(dispatch, _ref2) {
    var windowId = _ref2.windowId;
    return {
        setAllowPdfDownload: function setAllowPdfDownload() {
            return dispatch({
                type: "PDIIIF/ALLOW_PDF_DOWNLOAD",
                windowId: windowId
            });
        },
        setEstimatedSize: function setEstimatedSize(size) {
            return dispatch({
                type: "PDIIIF/SET_ESTIMATED_SIZE",
                windowId: windowId,
                size: size
            });
        },
        openDialog: function openDialog() {
            return dispatch({
                type: "OPEN_WINDOW_DIALOG",
                windowId: windowId,
                dialogType: "PDIIIF"
            });
        }
    };
};
var $52427eebf9628752$var$PDIIIFMenuItem = /*#__PURE__*/ function(_Component) {
    $52427eebf9628752$var$_inherits(PDIIIFMenuItem, _Component);
    var _super = $52427eebf9628752$var$_createSuper(PDIIIFMenuItem);
    function PDIIIFMenuItem(props) {
        var _this;
        $52427eebf9628752$var$_classCallCheck(this, PDIIIFMenuItem);
        _this = _super.call(this, props);
        $52427eebf9628752$var$_defineProperty($52427eebf9628752$var$_assertThisInitialized(_this), "renderMenuItemText", function() {
            var hasChecked = _this.state.hasChecked;
            var allowPdfDownload = _this.props.allowPdfDownload;
            if (!hasChecked) return "Checking document";
            if (allowPdfDownload) return "Download PDF";
            return "PDF Unavailable";
        });
        _this.state = {
            hasChecked: false,
            supportsFilesystemAPI: typeof showSaveFilePicker === "function"
        };
        return _this;
    }
    $52427eebf9628752$var$_createClass(PDIIIFMenuItem, [
        {
            key: "openDialogAndCloseMenu",
            value: function openDialogAndCloseMenu() {
                var _this$props = this.props, handleClose = _this$props.handleClose, openDialog = _this$props.openDialog;
                openDialog();
                handleClose();
            }
        },
        {
            key: "componentDidMount",
            value: function() {
                var _componentDidMount = $52427eebf9628752$var$_asyncToGenerator(/*#__PURE__*/ $52427eebf9628752$var$_regeneratorRuntime().mark(function _callee() {
                    var _this$props2, manifest, canvasGroupings, setAllowPdfDownload, allowPdfDownload, setEstimatedSize, estimatedSizeInBytes;
                    return $52427eebf9628752$var$_regeneratorRuntime().wrap(function _callee$(_context) {
                        while(true)switch(_context.prev = _context.next){
                            case 0:
                                _this$props2 = this.props, manifest = _this$props2.manifest, canvasGroupings = _this$props2.canvasGroupings, setAllowPdfDownload = _this$props2.setAllowPdfDownload, allowPdfDownload = _this$props2.allowPdfDownload, setEstimatedSize = _this$props2.setEstimatedSize;
                                if (!(allowPdfDownload || !this.state.supportsFilesystemAPI)) {
                                    _context.next = 4;
                                    break;
                                }
                                this.setState({
                                    hasChecked: true
                                });
                                return _context.abrupt("return");
                            case 4:
                                if (!(!(manifest !== null && manifest !== void 0 && manifest.error) && manifest !== null && manifest !== void 0 && manifest.json)) {
                                    _context.next = 10;
                                    break;
                                }
                                if (!(canvasGroupings.length > 1)) {
                                    _context.next = 10;
                                    break;
                                }
                                _context.next = 8;
                                return (0, $gXNCa$pdiiif.estimatePdfSize)({
                                    manifest: manifest.json,
                                    maxWidth: 1500
                                });
                            case 8:
                                estimatedSizeInBytes = _context.sent;
                                // Estimated size, or 0
                                // N.B. Sometimes this is NaN, but not sure what triggers this
                                // it seems to be be caused bug in PDIIIIF trying to divide 0 by 0
                                if (estimatedSizeInBytes !== 0) {
                                    setAllowPdfDownload();
                                    setEstimatedSize(estimatedSizeInBytes);
                                }
                            case 10:
                                this.setState({
                                    hasChecked: true
                                });
                            case 11:
                            case "end":
                                return _context.stop();
                        }
                    }, _callee, this);
                }));
                function componentDidMount() {
                    return _componentDidMount.apply(this, arguments);
                }
                return componentDidMount;
            }()
        },
        {
            key: "render",
            value: function render() {
                var _this2 = this;
                var _this$props3 = this.props, classes = _this$props3.classes, allowPdfDownload = _this$props3.allowPdfDownload;
                var hasChecked = this.state.hasChecked;
                return /*#__PURE__*/ (0, $gXNCa$reactjsxruntime.jsx)("div", {
                    children: /*#__PURE__*/ (0, $gXNCa$reactjsxruntime.jsxs)($52427eebf9628752$var$_MenuItem["default"], {
                        disabled: !hasChecked || !allowPdfDownload,
                        onClick: function onClick() {
                            return _this2.openDialogAndCloseMenu();
                        },
                        children: [
                            /*#__PURE__*/ (0, $gXNCa$reactjsxruntime.jsx)($52427eebf9628752$var$_ListItemIcon["default"], {
                                children: /*#__PURE__*/ (0, $gXNCa$reactjsxruntime.jsx)($52427eebf9628752$var$_PictureAsPdf["default"], {})
                            }),
                            /*#__PURE__*/ (0, $gXNCa$reactjsxruntime.jsx)($52427eebf9628752$var$_ListItemText["default"], {
                                primaryTypographyProps: {
                                    variant: "body1"
                                },
                                children: this.renderMenuItemText()
                            }),
                            !hasChecked && /*#__PURE__*/ (0, $gXNCa$reactjsxruntime.jsx)($52427eebf9628752$var$_CircularProgress["default"], {
                                size: 15,
                                className: classes.progress
                            })
                        ]
                    })
                });
            }
        }
    ]);
    return PDIIIFMenuItem;
}($52427eebf9628752$var$_react.Component);
$52427eebf9628752$var$PDIIIFMenuItem.propTypes = {
    allowPdfDownload: $52427eebf9628752$var$_propTypes["default"].bool,
    canvasGroupings: $52427eebf9628752$var$_propTypes["default"].array.isRequired,
    handleClose: $52427eebf9628752$var$_propTypes["default"].func,
    openPDIIIFDialog: $52427eebf9628752$var$_propTypes["default"].func,
    manifest: $52427eebf9628752$var$_propTypes["default"].object.isRequired,
    setAllowPdfDownload: $52427eebf9628752$var$_propTypes["default"].func.isRequired,
    setEstimatedSize: $52427eebf9628752$var$_propTypes["default"].func.isRequired
};
$52427eebf9628752$var$PDIIIFMenuItem.defaultProps = {
    handleClose: function handleClose() {},
    openPDIIIFDialog: function openPDIIIFDialog() {}
};
var $52427eebf9628752$var$styles = function styles() {
    return {
        progress: {
            marginLeft: "2px"
        }
    };
};
var $52427eebf9628752$var$_default = {
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
module.exports["default"] = $52427eebf9628752$var$_default;

});

parcelRequire.register("jXpDA", function(module, exports) {
"use strict";
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports["default"] = module.exports.PDIIIFDialog = void 0;

var $e8776a1570c913d2$var$_react = $e8776a1570c913d2$var$_interopRequireWildcard($gXNCa$react);

var $e8776a1570c913d2$var$_propTypes = $e8776a1570c913d2$var$_interopRequireDefault($gXNCa$proptypes);


var $e8776a1570c913d2$var$_Button = $e8776a1570c913d2$var$_interopRequireDefault($gXNCa$materialuicoreButton);

var $e8776a1570c913d2$var$_Dialog = $e8776a1570c913d2$var$_interopRequireDefault($gXNCa$materialuicoreDialog);

var $e8776a1570c913d2$var$_DialogActions = $e8776a1570c913d2$var$_interopRequireDefault($gXNCa$materialuicoreDialogActions);

var $e8776a1570c913d2$var$_DialogTitle = $e8776a1570c913d2$var$_interopRequireDefault($gXNCa$materialuicoreDialogTitle);

var $e8776a1570c913d2$var$_DialogContent = $e8776a1570c913d2$var$_interopRequireDefault($gXNCa$materialuicoreDialogContent);

var $e8776a1570c913d2$var$_DialogContentText = $e8776a1570c913d2$var$_interopRequireDefault($gXNCa$materialuicoreDialogContentText);

var $e8776a1570c913d2$var$_Typography = $e8776a1570c913d2$var$_interopRequireDefault($gXNCa$materialuicoreTypography);


function $e8776a1570c913d2$var$_interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    };
}
function $e8776a1570c913d2$var$_getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return ($e8776a1570c913d2$var$_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function $e8776a1570c913d2$var$_interopRequireWildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) return obj;
    if (obj === null || $e8776a1570c913d2$var$_typeof(obj) !== "object" && typeof obj !== "function") return {
        "default": obj
    };
    var cache = $e8776a1570c913d2$var$_getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) return cache.get(obj);
    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj)if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
        var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
        if (desc && (desc.get || desc.set)) Object.defineProperty(newObj, key, desc);
        else newObj[key] = obj[key];
    }
    newObj["default"] = obj;
    if (cache) cache.set(obj, newObj);
    return newObj;
}
function $e8776a1570c913d2$var$_typeof(obj) {
    "@babel/helpers - typeof";
    return $e8776a1570c913d2$var$_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
        return typeof obj;
    } : function(obj) {
        return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, $e8776a1570c913d2$var$_typeof(obj);
}
function $e8776a1570c913d2$var$_regeneratorRuntime() {
    "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ 
    $e8776a1570c913d2$var$_regeneratorRuntime = function _regeneratorRuntime() {
        return exports1;
    };
    var exports1 = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function(obj, key, desc) {
        obj[key] = desc.value;
    }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
    function define(obj, key, value) {
        return Object.defineProperty(obj, key, {
            value: value,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }), obj[key];
    }
    try {
        define({}, "");
    } catch (err) {
        define = function define(obj, key, value) {
            return obj[key] = value;
        };
    }
    function wrap(innerFn, outerFn, self, tryLocsList) {
        var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []);
        return defineProperty(generator, "_invoke", {
            value: makeInvokeMethod(innerFn, self, context)
        }), generator;
    }
    function tryCatch(fn, obj, arg) {
        try {
            return {
                type: "normal",
                arg: fn.call(obj, arg)
            };
        } catch (err) {
            return {
                type: "throw",
                arg: err
            };
        }
    }
    exports1.wrap = wrap;
    var ContinueSentinel = {};
    function Generator() {}
    function GeneratorFunction() {}
    function GeneratorFunctionPrototype() {}
    var IteratorPrototype = {};
    define(IteratorPrototype, iteratorSymbol, function() {
        return this;
    });
    var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([])));
    NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
    var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
    function defineIteratorMethods(prototype) {
        [
            "next",
            "throw",
            "return"
        ].forEach(function(method) {
            define(prototype, method, function(arg) {
                return this._invoke(method, arg);
            });
        });
    }
    function AsyncIterator(generator, PromiseImpl) {
        function invoke(method, arg, resolve, reject) {
            var record = tryCatch(generator[method], generator, arg);
            if ("throw" !== record.type) {
                var result = record.arg, value = result.value;
                return value && "object" == $e8776a1570c913d2$var$_typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function(value) {
                    invoke("next", value, resolve, reject);
                }, function(err) {
                    invoke("throw", err, resolve, reject);
                }) : PromiseImpl.resolve(value).then(function(unwrapped) {
                    result.value = unwrapped, resolve(result);
                }, function(error) {
                    return invoke("throw", error, resolve, reject);
                });
            }
            reject(record.arg);
        }
        var previousPromise;
        defineProperty(this, "_invoke", {
            value: function value(method, arg) {
                function callInvokeWithMethodAndArg() {
                    return new PromiseImpl(function(resolve, reject) {
                        invoke(method, arg, resolve, reject);
                    });
                }
                return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
            }
        });
    }
    function makeInvokeMethod(innerFn, self, context) {
        var state = "suspendedStart";
        return function(method, arg) {
            if ("executing" === state) throw new Error("Generator is already running");
            if ("completed" === state) {
                if ("throw" === method) throw arg;
                return doneResult();
            }
            for(context.method = method, context.arg = arg;;){
                var delegate = context.delegate;
                if (delegate) {
                    var delegateResult = maybeInvokeDelegate(delegate, context);
                    if (delegateResult) {
                        if (delegateResult === ContinueSentinel) continue;
                        return delegateResult;
                    }
                }
                if ("next" === context.method) context.sent = context._sent = context.arg;
                else if ("throw" === context.method) {
                    if ("suspendedStart" === state) throw state = "completed", context.arg;
                    context.dispatchException(context.arg);
                } else "return" === context.method && context.abrupt("return", context.arg);
                state = "executing";
                var record = tryCatch(innerFn, self, context);
                if ("normal" === record.type) {
                    if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
                    return {
                        value: record.arg,
                        done: context.done
                    };
                }
                "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
            }
        };
    }
    function maybeInvokeDelegate(delegate, context) {
        var methodName = context.method, method = delegate.iterator[methodName];
        if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel;
        var record = tryCatch(method, delegate.iterator, context.arg);
        if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
        var info = record.arg;
        return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
    }
    function pushTryEntry(locs) {
        var entry = {
            tryLoc: locs[0]
        };
        1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
    }
    function resetTryEntry(entry) {
        var record = entry.completion || {};
        record.type = "normal", delete record.arg, entry.completion = record;
    }
    function Context(tryLocsList) {
        this.tryEntries = [
            {
                tryLoc: "root"
            }
        ], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
    }
    function values(iterable) {
        if (iterable) {
            var iteratorMethod = iterable[iteratorSymbol];
            if (iteratorMethod) return iteratorMethod.call(iterable);
            if ("function" == typeof iterable.next) return iterable;
            if (!isNaN(iterable.length)) {
                var i = -1, next = function next() {
                    for(; ++i < iterable.length;)if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;
                    return next.value = undefined, next.done = !0, next;
                };
                return next.next = next;
            }
        }
        return {
            next: doneResult
        };
    }
    function doneResult() {
        return {
            value: undefined,
            done: !0
        };
    }
    return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", {
        value: GeneratorFunctionPrototype,
        configurable: !0
    }), defineProperty(GeneratorFunctionPrototype, "constructor", {
        value: GeneratorFunction,
        configurable: !0
    }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports1.isGeneratorFunction = function(genFun) {
        var ctor = "function" == typeof genFun && genFun.constructor;
        return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
    }, exports1.mark = function(genFun) {
        return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
    }, exports1.awrap = function(arg) {
        return {
            __await: arg
        };
    }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function() {
        return this;
    }), exports1.AsyncIterator = AsyncIterator, exports1.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
        void 0 === PromiseImpl && (PromiseImpl = Promise);
        var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
        return exports1.isGeneratorFunction(outerFn) ? iter : iter.next().then(function(result) {
            return result.done ? result.value : iter.next();
        });
    }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function() {
        return this;
    }), define(Gp, "toString", function() {
        return "[object Generator]";
    }), exports1.keys = function(val) {
        var object = Object(val), keys = [];
        for(var key in object)keys.push(key);
        return keys.reverse(), function next() {
            for(; keys.length;){
                var key = keys.pop();
                if (key in object) return next.value = key, next.done = !1, next;
            }
            return next.done = !0, next;
        };
    }, exports1.values = values, Context.prototype = {
        constructor: Context,
        reset: function reset(skipTempReset) {
            if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for(var name in this)"t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
        },
        stop: function stop() {
            this.done = !0;
            var rootRecord = this.tryEntries[0].completion;
            if ("throw" === rootRecord.type) throw rootRecord.arg;
            return this.rval;
        },
        dispatchException: function dispatchException(exception) {
            if (this.done) throw exception;
            var context = this;
            function handle(loc, caught) {
                return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
            }
            for(var i = this.tryEntries.length - 1; i >= 0; --i){
                var entry = this.tryEntries[i], record = entry.completion;
                if ("root" === entry.tryLoc) return handle("end");
                if (entry.tryLoc <= this.prev) {
                    var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc");
                    if (hasCatch && hasFinally) {
                        if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
                        if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
                    } else if (hasCatch) {
                        if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
                    } else {
                        if (!hasFinally) throw new Error("try statement without catch or finally");
                        if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
                    }
                }
            }
        },
        abrupt: function abrupt(type, arg) {
            for(var i = this.tryEntries.length - 1; i >= 0; --i){
                var entry = this.tryEntries[i];
                if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
                    var finallyEntry = entry;
                    break;
                }
            }
            finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
            var record = finallyEntry ? finallyEntry.completion : {};
            return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
        },
        complete: function complete(record, afterLoc) {
            if ("throw" === record.type) throw record.arg;
            return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
        },
        finish: function finish(finallyLoc) {
            for(var i = this.tryEntries.length - 1; i >= 0; --i){
                var entry = this.tryEntries[i];
                if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
            }
        },
        "catch": function _catch(tryLoc) {
            for(var i = this.tryEntries.length - 1; i >= 0; --i){
                var entry = this.tryEntries[i];
                if (entry.tryLoc === tryLoc) {
                    var record = entry.completion;
                    if ("throw" === record.type) {
                        var thrown = record.arg;
                        resetTryEntry(entry);
                    }
                    return thrown;
                }
            }
            throw new Error("illegal catch attempt");
        },
        delegateYield: function delegateYield(iterable, resultName, nextLoc) {
            return this.delegate = {
                iterator: values(iterable),
                resultName: resultName,
                nextLoc: nextLoc
            }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
        }
    }, exports1;
}
function $e8776a1570c913d2$var$asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) resolve(value);
    else Promise.resolve(value).then(_next, _throw);
}
function $e8776a1570c913d2$var$_asyncToGenerator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                $e8776a1570c913d2$var$asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                $e8776a1570c913d2$var$asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
function $e8776a1570c913d2$var$_classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
}
function $e8776a1570c913d2$var$_defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, $e8776a1570c913d2$var$_toPropertyKey(descriptor.key), descriptor);
    }
}
function $e8776a1570c913d2$var$_createClass(Constructor, protoProps, staticProps) {
    if (protoProps) $e8776a1570c913d2$var$_defineProperties(Constructor.prototype, protoProps);
    if (staticProps) $e8776a1570c913d2$var$_defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
        writable: false
    });
    return Constructor;
}
function $e8776a1570c913d2$var$_inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            writable: true,
            configurable: true
        }
    });
    Object.defineProperty(subClass, "prototype", {
        writable: false
    });
    if (superClass) $e8776a1570c913d2$var$_setPrototypeOf(subClass, superClass);
}
function $e8776a1570c913d2$var$_setPrototypeOf(o, p) {
    $e8776a1570c913d2$var$_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    };
    return $e8776a1570c913d2$var$_setPrototypeOf(o, p);
}
function $e8776a1570c913d2$var$_createSuper(Derived) {
    var hasNativeReflectConstruct = $e8776a1570c913d2$var$_isNativeReflectConstruct();
    return function _createSuperInternal() {
        var Super = $e8776a1570c913d2$var$_getPrototypeOf(Derived), result;
        if (hasNativeReflectConstruct) {
            var NewTarget = $e8776a1570c913d2$var$_getPrototypeOf(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
        } else result = Super.apply(this, arguments);
        return $e8776a1570c913d2$var$_possibleConstructorReturn(this, result);
    };
}
function $e8776a1570c913d2$var$_possibleConstructorReturn(self, call) {
    if (call && ($e8776a1570c913d2$var$_typeof(call) === "object" || typeof call === "function")) return call;
    else if (call !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
    return $e8776a1570c913d2$var$_assertThisInitialized(self);
}
function $e8776a1570c913d2$var$_assertThisInitialized(self) {
    if (self === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return self;
}
function $e8776a1570c913d2$var$_isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
        return true;
    } catch (e) {
        return false;
    }
}
function $e8776a1570c913d2$var$_getPrototypeOf(o) {
    $e8776a1570c913d2$var$_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
    };
    return $e8776a1570c913d2$var$_getPrototypeOf(o);
}
function $e8776a1570c913d2$var$_defineProperty(obj, key, value) {
    key = $e8776a1570c913d2$var$_toPropertyKey(key);
    if (key in obj) Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
    });
    else obj[key] = value;
    return obj;
}
function $e8776a1570c913d2$var$_toPropertyKey(arg) {
    var key = $e8776a1570c913d2$var$_toPrimitive(arg, "string");
    return $e8776a1570c913d2$var$_typeof(key) === "symbol" ? key : String(key);
}
function $e8776a1570c913d2$var$_toPrimitive(input, hint) {
    if ($e8776a1570c913d2$var$_typeof(input) !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
        var res = prim.call(input, hint || "default");
        if ($e8776a1570c913d2$var$_typeof(res) !== "object") return res;
        throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
}
var $e8776a1570c913d2$var$mapDispatchToProps = function mapDispatchToProps(dispatch, _ref) {
    var windowId = _ref.windowId;
    return {
        closeDialog: function closeDialog() {
            return dispatch({
                type: "CLOSE_WINDOW_DIALOG",
                windowId: windowId
            });
        }
    };
};
var $e8776a1570c913d2$var$mapStateToProps = function mapStateToProps(state, _ref2) {
    var _state$PDIIIF$windowI, _state$PDIIIF$windowI2;
    var windowId = _ref2.windowId, containerId = _ref2.containerId;
    return {
        open: state.windowDialogs[windowId] && state.windowDialogs[windowId].openDialog === "PDIIIF",
        manifestId: state.windows[windowId].manifestId,
        manifest: state.manifests[state.windows[windowId].manifestId],
        containerId: state.config.id,
        estimatedSize: (_state$PDIIIF$windowI = state.PDIIIF[windowId]) === null || _state$PDIIIF$windowI === void 0 ? void 0 : _state$PDIIIF$windowI.estimatedSizeInBytes,
        allowPdfDownload: (_state$PDIIIF$windowI2 = state.PDIIIF[windowId]) === null || _state$PDIIIF$windowI2 === void 0 ? void 0 : _state$PDIIIF$windowI2.allowPdfDownload
    };
};
/**
 * PDIIIFDialog ~
 */ var $e8776a1570c913d2$var$PDIIIFDialog = /*#__PURE__*/ function(_Component) {
    $e8776a1570c913d2$var$_inherits(PDIIIFDialog, _Component);
    var _super = $e8776a1570c913d2$var$_createSuper(PDIIIFDialog);
    function PDIIIFDialog(props) {
        var _this;
        $e8776a1570c913d2$var$_classCallCheck(this, PDIIIFDialog);
        _this = _super.call(this, props);
        /**
     * Downoloads the PDF
     */ $e8776a1570c913d2$var$_defineProperty($e8776a1570c913d2$var$_assertThisInitialized(_this), "downloadPDF", /*#__PURE__*/ $e8776a1570c913d2$var$_asyncToGenerator(/*#__PURE__*/ $e8776a1570c913d2$var$_regeneratorRuntime().mark(function _callee() {
            var manifest, supportsFilesystemAPI, handle, pdfPath, webWritable;
            return $e8776a1570c913d2$var$_regeneratorRuntime().wrap(function _callee$(_context) {
                while(true)switch(_context.prev = _context.next){
                    case 0:
                        manifest = _this.props.manifest;
                        supportsFilesystemAPI = _this.state.supportsFilesystemAPI; // Get a writable handle to a file on the user's machine
                        if (!supportsFilesystemAPI) {
                            _context.next = 37;
                            break;
                        }
                        _context.prev = 3;
                        _context.next = 6;
                        return showSaveFilePicker({
                            suggestedName: "".concat(manifest.json.label, ".pdf"),
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
                    case 6:
                        handle = _context.sent;
                        _context.next = 13;
                        break;
                    case 9:
                        _context.prev = 9;
                        _context.t0 = _context["catch"](3);
                        _this.setState({
                            savingError: _context.t0.message
                        });
                        return _context.abrupt("return", console.error(_context.t0));
                    case 13:
                        _context.prev = 13;
                        _context.next = 16;
                        return handle.queryPermission({
                            mode: "readwrite"
                        });
                    case 16:
                        _context.t1 = _context.sent;
                        if (!(_context.t1 !== "granted")) {
                            _context.next = 21;
                            break;
                        }
                        throw new Error("Permission to write to file was not granted");
                    case 21:
                        // Reset the error state
                        _this.setState({
                            savingError: null
                        });
                        _context.next = 24;
                        return handle.getFile();
                    case 24:
                        pdfPath = _context.sent.name;
                        _context.next = 27;
                        return handle.createWritable();
                    case 27:
                        webWritable = _context.sent;
                        _context.next = 30;
                        return (0, $gXNCa$pdiiif.convertManifest)(manifest, webWritable, {
                            maxWidth: 1500,
                            coverPageEndpoint: "https://pdiiif.jbaiter.de/api/coverpage"
                        });
                    case 30:
                        return _context.abrupt("return", _context.sent);
                    case 31:
                        _context.next = 37;
                        break;
                    case 33:
                        _context.prev = 33;
                        _context.t2 = _context["catch"](13);
                        // Display permission / conversion error
                        _this.setState({
                            savingError: _context.t2.message
                        });
                        return _context.abrupt("return", console.error(_context.t2));
                    case 37:
                    case "end":
                        return _context.stop();
                }
            }, _callee, null, [
                [
                    3,
                    9
                ],
                [
                    13,
                    33
                ]
            ]);
        })));
        _this.props = props;
        _this.state = {
            savingError: null,
            supportsFilesystemAPI: typeof showSaveFilePicker === "function"
        };
        return _this;
    }
    /**
   * Format bytes to human readable string
   */ $e8776a1570c913d2$var$_createClass(PDIIIFDialog, [
        {
            key: "formatBytes",
            value: function formatBytes(bytes) {
                var decimals = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
                if (!+bytes) return "0 Bytes";
                var k = 1024;
                var dm = decimals < 0 ? 0 : decimals;
                var sizes = [
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
                var i = Math.floor(Math.log(bytes) / Math.log(k));
                return "".concat(parseFloat((bytes / Math.pow(k, i)).toFixed(dm)), " ").concat(sizes[i]);
            }
        },
        {
            key: "render",
            value: /**
     * Returns the rendered component
     */ function render() {
                var savingError = this.state.savingError;
                var _this$props = this.props, classes = _this$props.classes, closeDialog = _this$props.closeDialog, containerId = _this$props.containerId, open = _this$props.open, allowPdfDownload = _this$props.allowPdfDownload, estimatedSize = _this$props.estimatedSize;
                !open || allowPdfDownload;
                return /*#__PURE__*/ (0, $gXNCa$reactjsxruntime.jsxs)($e8776a1570c913d2$var$_Dialog["default"], {
                    container: document.querySelector("#".concat(containerId, " .mirador-viewer")),
                    disableEnforceFocus: true,
                    onClose: closeDialog,
                    open: open,
                    scroll: "paper",
                    fullWidth: true,
                    maxWidth: "xs",
                    children: [
                        /*#__PURE__*/ (0, $gXNCa$reactjsxruntime.jsx)($e8776a1570c913d2$var$_DialogTitle["default"], {
                            disableTypography: true,
                            className: classes.h2,
                            children: /*#__PURE__*/ (0, $gXNCa$reactjsxruntime.jsx)($e8776a1570c913d2$var$_Typography["default"], {
                                variant: "h2",
                                children: "PDF Download"
                            })
                        }),
                        /*#__PURE__*/ (0, $gXNCa$reactjsxruntime.jsxs)($e8776a1570c913d2$var$_DialogContent["default"], {
                            children: [
                                savingError && /*#__PURE__*/ (0, $gXNCa$reactjsxruntime.jsx)($e8776a1570c913d2$var$_DialogContentText["default"], {
                                    children: savingError.message
                                }),
                                /*#__PURE__*/ (0, $gXNCa$reactjsxruntime.jsxs)($e8776a1570c913d2$var$_DialogContentText["default"], {
                                    children: [
                                        "Download a PDF of the current document?",
                                        estimatedSize ? " (Estimated file size: ".concat(this.formatBytes(estimatedSize), ")") : ""
                                    ]
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0, $gXNCa$reactjsxruntime.jsxs)($e8776a1570c913d2$var$_DialogActions["default"], {
                            children: [
                                /*#__PURE__*/ (0, $gXNCa$reactjsxruntime.jsx)($e8776a1570c913d2$var$_Button["default"], {
                                    onClick: this.downloadPDF,
                                    color: "primary",
                                    children: "Download"
                                }),
                                /*#__PURE__*/ (0, $gXNCa$reactjsxruntime.jsx)($e8776a1570c913d2$var$_Button["default"], {
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
    ]);
    return PDIIIFDialog;
}($e8776a1570c913d2$var$_react.Component);
module.exports.PDIIIFDialog = $e8776a1570c913d2$var$PDIIIFDialog;
$e8776a1570c913d2$var$PDIIIFDialog.propTypes = {
    classes: $e8776a1570c913d2$var$_propTypes["default"].shape({
        h2: $e8776a1570c913d2$var$_propTypes["default"].string,
        h3: $e8776a1570c913d2$var$_propTypes["default"].string
    }).isRequired,
    closeDialog: $e8776a1570c913d2$var$_propTypes["default"].func.isRequired,
    containerId: $e8776a1570c913d2$var$_propTypes["default"].string.isRequired,
    estimatedSize: $e8776a1570c913d2$var$_propTypes["default"].number,
    manifest: $e8776a1570c913d2$var$_propTypes["default"].object,
    manifestId: $e8776a1570c913d2$var$_propTypes["default"].string,
    allowPdfDownload: $e8776a1570c913d2$var$_propTypes["default"].bool,
    open: $e8776a1570c913d2$var$_propTypes["default"].bool,
    windowId: $e8776a1570c913d2$var$_propTypes["default"].string.isRequired
};
$e8776a1570c913d2$var$PDIIIFDialog.defaultProps = {
    canvases: [],
    open: false
};
var $e8776a1570c913d2$var$styles = function styles() {
    return {
        h2: {
            paddingBottom: 0
        },
        h3: {
            marginTop: "20px"
        }
    };
};
var $e8776a1570c913d2$var$_default = {
    target: "Window",
    mode: "add",
    name: "PDIIIFDialog",
    component: (0, $gXNCa$materialuicorestyles.withStyles)($e8776a1570c913d2$var$styles)($e8776a1570c913d2$var$PDIIIFDialog),
    mapDispatchToProps: $e8776a1570c913d2$var$mapDispatchToProps,
    mapStateToProps: $e8776a1570c913d2$var$mapStateToProps
};
module.exports["default"] = $e8776a1570c913d2$var$_default;

});

"use strict";
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
Object.defineProperty(module.exports, "MiradorPDIIIFDialogPlugin", {
    enumerable: true,
    get: function get() {
        return $4fa36e821943b400$var$_MiradorPDIIIFDialog["default"];
    }
});
Object.defineProperty(module.exports, "MiradorPDIIIFMenuItemPlugin", {
    enumerable: true,
    get: function get() {
        return $4fa36e821943b400$var$_MiradorPDIIIFMenuItem["default"];
    }
});
module.exports["default"] = void 0;

var $4fa36e821943b400$var$_MiradorPDIIIFMenuItem = $4fa36e821943b400$var$_interopRequireDefault((parcelRequire("73RJE")));

var $4fa36e821943b400$var$_MiradorPDIIIFDialog = $4fa36e821943b400$var$_interopRequireDefault((parcelRequire("jXpDA")));
function $4fa36e821943b400$var$_interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    };
}
var $4fa36e821943b400$var$_default = [
    $4fa36e821943b400$var$_MiradorPDIIIFMenuItem["default"],
    $4fa36e821943b400$var$_MiradorPDIIIFDialog["default"]
];
module.exports["default"] = $4fa36e821943b400$var$_default;


//# sourceMappingURL=index.js.map
