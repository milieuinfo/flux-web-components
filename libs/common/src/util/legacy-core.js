(function (factory) {
    typeof define === 'function' && define.amd ? define(factory) : factory();
})(function () {
    'use strict';

    function _typeof(obj) {
        '@babel/helpers - typeof';

        return (
            (_typeof =
                'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                    ? function (obj) {
                          return typeof obj;
                      }
                    : function (obj) {
                          return obj &&
                              'function' == typeof Symbol &&
                              obj.constructor === Symbol &&
                              obj !== Symbol.prototype
                              ? 'symbol'
                              : typeof obj;
                      }),
            _typeof(obj)
        );
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError('Cannot call a class as a function');
        }
    }

    function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ('value' in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }

    function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps) _defineProperties(Constructor.prototype, protoProps);
        if (staticProps) _defineProperties(Constructor, staticProps);
        Object.defineProperty(Constructor, 'prototype', {
            writable: false,
        });
        return Constructor;
    }

    window.vl = window.vl || {
        ns: 'vl-',
    }; // Returns a function, that, as long as it continues to be invoked, will not
    // be triggered. The function will be called after it stops being called for
    // N milliseconds. If `immediate` is passed, trigger the function on the
    // leading edge, instead of the trailing.

    var debounce = function debounce(func, wait) {
        var immediate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        var timeout;
        return function () {
            var context = this,
                args = arguments,
                later,
                callNow;

            later = function later() {
                timeout = null;

                if (!immediate) {
                    func.apply(context, args);
                }
            };

            callNow = immediate && !timeout;
            window.clearTimeout(timeout);
            timeout = window.setTimeout(later, wait);

            if (callNow) {
                func.apply(context, args);
            }
        };
    };

    var throttle = function throttle(func) {
        var threshhold = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 250;
        var scope = arguments.length > 2 ? arguments[2] : undefined;
        var last, deferTimer;
        return function () {
            var context = scope || this,
                now = Number(new Date()),
                args = arguments;

            if (last && now < last + threshhold) {
                // hold on to it
                window.clearTimeout(deferTimer);
                deferTimer = window.setTimeout(function () {
                    last = now;
                    func.apply(context, args);
                }, threshhold);
            } else {
                last = now;
                func.apply(context, args);
            }
        };
    };

    var addClass = function addClass(el, classes) {
        el.classList.add(classes);
    };

    var removeClass = function removeClass(el, classes) {
        el.classList.remove(classes);
    };

    var hasClass = function hasClass(el, classes) {
        return el.classList.contains(classes);
    };

    var toggleClass = function toggleClass(el, classes) {
        el.classList.toggle(classes);
    };

    var addClassFor = function addClassFor(el, classes, duration) {
        addClass(el, classes);
        window.setTimeout(function () {
            removeClass(el, classes);
        }, duration);
    }; // Helper function that takes an HTML string & an object to use for
    // "binding" its properties to the HTML template above.

    var parseTemplate = function parseTemplate(str, data) {
        return str.replace(/\$\{(\w+)\}/gi, function (match, parensMatch) {
            if (typeof data[parensMatch] !== 'undefined') {
                return data[parensMatch];
            }

            return match;
        });
    }; // trigger a custom event on an object

    var triggerEvent = function triggerEvent(obj, evt) {
        var fireOnThis = obj,
            evtObj;

        if (document.createEvent) {
            evtObj = document.createEvent('MouseEvents');
            evtObj.initEvent(evt, true, false);
            fireOnThis.dispatchEvent(evtObj);
        } else if (document.createEventObject) {
            evtObj = document.createEventObject();
            fireOnThis.fireEvent('on'.concat(evt), evtObj);
        }
    };

    var unique = function unique(array) {
        return array.filter(function (elem, pos, arr) {
            return arr.indexOf(elem) === pos;
        });
    };

    var closest = function closest(value, to) {
        return Math.round(value / to) * to;
    }; // Current position of an element relative to the document.

    var offset = function offset(el) {
        var rect = el.getBoundingClientRect(),
            doc = el.ownerDocument,
            win = doc.defaultView || doc.parentWindow,
            docElem = doc.documentElement,
            xOff = win.pageXOffset; // getBoundingClientRect contains left scroll in Chrome on Android.
        // I haven't found a feature detection that proves this. Worst case
        // scenario on mis-match: the 'tap' feature on horizontal sliders breaks.

        if (/webkit.*Chrome.*Mobile/i.test(navigator.userAgent)) {
            xOff = 0;
        }

        return {
            top: rect.top + win.pageYOffset - docElem.clientTop,
            left: rect.left + xOff - docElem.clientLeft,
        };
    }; // Insert after

    var insertAfter = function insertAfter(newElement, targetElement) {
        var parent = targetElement.parentNode; // If targetElement is the parents last-child

        if (parent.lastchild === targetElement) {
            // Add the newElement after the target element
            parent.appendChild(newElement);
        } else {
            // Target has siblings, insert the new element between the target and its next sibling
            parent.insertBefore(newElement, targetElement.nextSibling);
        }
    };

    var removeElement = function removeElement(targetElement) {
        var parent = targetElement.parentNode;
        parent.removeChild(targetElement);
    };

    var isNumeric = function isNumeric(number) {
        return !isNaN(parseFloat(number)) && isFinite(number);
    };

    var wrap = function wrap(el, wrapper) {
        // Cache the current parent and sibling
        var parent = el.parentNode,
            sibling = el.nextSibling;
        wrapper.appendChild(el);
        /**
         * If the element had a sibling, insert the wrapper before
         * the sibling to maintain the HTML structure; otherwise, just
         * append it to the parent.
         */

        if (sibling) {
            parent.insertBefore(wrapper, sibling);
        } else {
            parent.appendChild(wrapper);
        }
    }; // Strip tags from element

    var stripTags = function stripTags(html) {
        var tmp = document.createElement('div');
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText;
    }; // Create a unique ID

    var uniqueId = function uniqueId() {
        // Desired length of Id
        // Always start with a letter -- base 36 makes for a nice shortcut
        var idStrLen = 32,
            idStr = ''.concat((Math.floor(Math.random() * 25) + 10).toString(36), '_'); // Add a timestamp in milliseconds (base 36 again) as the base

        idStr += ''.concat(new Date().getTime().toString(36), '_'); // Similar to above, complete the Id using random, alphanumeric characters

        do {
            idStr += Math.floor(Math.random() * 35).toString(36);
        } while (idStr.length < idStrLen);

        return idStr;
    }; // Create a unique name

    var uniqueName = function uniqueName() {
        return Math.random().toString(36).substring(2, 5);
    }; // Rounds a number to 7 supported decimals

    var accurateNumber = function accurateNumber(number) {
        var p = Math.pow(10, 7);
        return Number((Math.round(number * p) / p).toFixed(7));
    }; // Limits a value to 0 - 100

    var limit = function limit(a) {
        return Math.max(Math.min(a, 100), 0);
    }; // Wraps a variable as an array, if it isn't one yet.

    var asArray = function asArray(a) {
        return Array.isArray(a) ? a : [a];
    }; // Count decimals

    var countDecimals = function countDecimals(numStr) {
        var pieces = numStr.split('.');
        return pieces.length > 0 ? pieces[1].length : 0;
    }; // Scroll element to specific position
    // TODO: use element.scrollIntoView instead, maybe with fallback if you want old browser to have a smooth scroll

    var scrollTo = function scrollTo(el, to, duration) {
        var callback = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function () {};
        var scrollTop = el.scrollTop,
            difference = to - scrollTop,
            perTick;

        if (duration < 0) {
            return;
        }

        perTick = (difference / duration) * 10;
        window.setTimeout(function () {
            if (scrollTop === to || duration <= 0) {
                callback();
            } else {
                el.scrollTop = scrollTop + perTick;
                scrollTo(el, to, duration - 10, callback);
            }
        }, 10);
    }; // Gets a random number between min and max

    var randomIntFromInterval = function randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }; // Much faster each loop than a forEach loop

    var each = function each(arr, fn) {
        var l = arr.length,
            i = 0;

        for (; i < l; i++) {
            fn(arr[i], i);
        }
    };
    /**
     * Determines if a certain value exists, is not null, and not empty
     * @method exists
     * @param  {type}  value value to check
     * @param  {Boolean} [nullAllowed = false] optional parameter to allow null
     * @param  {Boolean} [emptyAllowed = false] optional paramet to allow empty values
     * @return {Boolean}
     */

    var exists = function exists(value) {
        var nullAllowed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var emptyAllowed = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        if (typeof value !== 'undefined') {
            if (nullAllowed || value !== null) {
                if (emptyAllowed || value !== '') {
                    return true;
                }
            }
        }

        return false;
    };

    var bytesToSize = function bytesToSize(bytes) {
        var addUnits = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        var base = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1024;
        var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'],
            value = null,
            i;

        if (bytes === 0) {
            value = addUnits ? '0 bytes' : 0;
        } else {
            i = parseInt(Math.floor(Math.log(bytes) / Math.log(base)), 10);

            if (!addUnits) {
                value = Math.round(bytes / Math.pow(base, i), 2);
            }

            value = addUnits
                ? Math.round(bytes / Math.pow(base, i), 2) + ' ' + sizes[i]
                : Math.round(bytes / Math.pow(base, i), 2);
        }

        return value;
    };

    var getJson = function getJson(url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open('get', url, true);
        xhr.responseType = 'json';

        xhr.onload = function () {
            var status = xhr.status;

            if (status === 200) {
                callback(null, xhr.response);
            } else {
                callback(status);
            }
        };

        xhr.send();
    };
    /**
     * Get all DOM element up the tree that contain a class, ID, or data attribute
     * @param  {Node} elem The base element
     * @param  {String} selector The class, id, data attribute, or tag to look for
     * @return {Array} Null if no match
     */

    var getParents = function getParents(elem, selector) {
        var parents = [],
            firstChar;

        if (selector) {
            firstChar = selector.charAt(0);
        } // Get matches

        for (; elem && elem !== document; elem = elem.parentNode) {
            if (selector) {
                // If selector is a class
                if (firstChar === '.') {
                    if (elem.classList.contains(selector.substr(1))) {
                        parents.push(elem);
                    }
                } // If selector is an ID

                if (firstChar === '#') {
                    if (elem.id === selector.substr(1)) {
                        parents.push(elem);
                    }
                } // If selector is a data attribute

                if (firstChar === '[') {
                    if (elem.hasAttribute(selector.substr(1, selector.length - 1))) {
                        parents.push(elem);
                    }
                } // If selector is a tag

                if (elem.tagName.toLowerCase() === selector) {
                    parents.push(elem);
                }
            } else {
                parents.push(elem);
            }
        } // Return parents if any exist

        if (parents.length === 0) {
            return null;
        }

        return parents;
    };

    var getParentsUntil = function getParentsUntil(elem, parent, selector) {
        var parents = [],
            parentType,
            selectorType;

        if (parent) {
            parentType = parent.charAt(0);
        }

        if (selector) {
            selectorType = selector.charAt(0);
        } // Get matches

        for (; elem && elem !== document; elem = elem.parentNode) {
            // Check if parent has been reached
            if (parent) {
                // If parent is a class
                if (parentType === '.') {
                    if (elem.classList.contains(parent.substr(1))) {
                        break;
                    }
                } // If parent is an ID

                if (parentType === '#') {
                    if (elem.id === parent.substr(1)) {
                        break;
                    }
                } // If parent is a data attribute

                if (parentType === '[') {
                    if (elem.hasAttribute(parent.substr(1, parent.length - 1))) {
                        break;
                    }
                } // If parent is a tag

                if (elem.tagName.toLowerCase() === parent) {
                    break;
                }
            }

            if (selector) {
                // If selector is a class
                if (selectorType === '.') {
                    if (elem.classList.contains(selector.substr(1))) {
                        parents.push(elem);
                    }
                } // If selector is an ID

                if (selectorType === '#') {
                    if (elem.id === selector.substr(1)) {
                        parents.push(elem);
                    }
                } // If selector is a data attribute

                if (selectorType === '[') {
                    if (elem.hasAttribute(selector.substr(1, selector.length - 1))) {
                        parents.push(elem);
                    }
                } // If selector is a tag

                if (elem.tagName.toLowerCase() === selector) {
                    parents.push(elem);
                }
            } else {
                parents.push(elem);
            }
        } // Return parents if any exist

        if (parents.length === 0) {
            return null;
        }

        return parents;
    };

    var Util = /*#__PURE__*/ _createClass(function Util() {
        _classCallCheck(this, Util);

        this.addClass = addClass;
        this.removeClass = removeClass;
        this.hasClass = hasClass;
        this.toggleClass = toggleClass;
        this.addClassFor = addClassFor;
        this.parseTemplate = parseTemplate;
        this.triggerEvent = triggerEvent;
        this.unique = unique;
        this.closest = closest;
        this.offset = offset;
        this.insertAfter = insertAfter;
        this.removeElement = removeElement;
        this.isNumeric = isNumeric;
        this.wrap = wrap;
        this.stripTags = stripTags;
        this.uniqueId = uniqueId;
        this.uniqueName = uniqueName;
        this.accurateNumber = accurateNumber;
        this.limit = limit;
        this.asArray = asArray;
        this.countDecimals = countDecimals;
        this.scrollTo = scrollTo;
        this.randomIntFromInterval = randomIntFromInterval;
        this.debounce = debounce;
        this.throttle = throttle;
        this.each = each;
        this.exists = exists;
        this.bytesToSize = bytesToSize;
        this.getJson = getJson;
        this.getParents = getParents;
        this.getParentsUntil = getParentsUntil;
    });

    vl.util = new Util(); // Export single utils

    var noJsClass = 'no-js',
        jSclass = 'js'; // Remove no-js class, add js class

    var _jsDetection = function _jsDetection() {
        if (vl.util.hasClass(document.documentElement, noJsClass)) {
            vl.util.removeClass(document.documentElement, noJsClass);
        }

        vl.util.addClass(document.documentElement, jSclass);
    };

    _jsDetection();

    // Store setTimeout reference so promise-polyfill will be unaffected by
    // other code modifying setTimeout (like sinon.useFakeTimers())
    var setTimeoutFunc = setTimeout;

    function noop() {} // Polyfill for Function.prototype.bind

    function bind(fn, thisArg) {
        return function () {
            fn.apply(thisArg, arguments);
        };
    }

    function handle(self, deferred) {
        while (self._state === 3) {
            self = self._value;
        }

        if (self._state === 0) {
            self._deferreds.push(deferred);

            return;
        }

        self._handled = true;

        Promise$1._immediateFn(function () {
            var cb = self._state === 1 ? deferred.onFulfilled : deferred.onRejected;

            if (cb === null) {
                (self._state === 1 ? resolve : reject)(deferred.promise, self._value);
                return;
            }

            var ret;

            try {
                ret = cb(self._value);
            } catch (e) {
                reject(deferred.promise, e);
                return;
            }

            resolve(deferred.promise, ret);
        });
    }

    function resolve(self, newValue) {
        try {
            // Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
            if (newValue === self) throw new TypeError('A promise cannot be resolved with itself.');

            if (newValue && (_typeof(newValue) === 'object' || typeof newValue === 'function')) {
                var then = newValue.then;

                if (newValue instanceof Promise$1) {
                    self._state = 3;
                    self._value = newValue;
                    finale(self);
                    return;
                } else if (typeof then === 'function') {
                    doResolve(bind(then, newValue), self);
                    return;
                }
            }

            self._state = 1;
            self._value = newValue;
            finale(self);
        } catch (e) {
            reject(self, e);
        }
    }

    function reject(self, newValue) {
        self._state = 2;
        self._value = newValue;
        finale(self);
    }

    function finale(self) {
        if (self._state === 2 && self._deferreds.length === 0) {
            Promise$1._immediateFn(function () {
                if (!self._handled) {
                    Promise$1._unhandledRejectionFn(self._value);
                }
            });
        }

        for (var i = 0, len = self._deferreds.length; i < len; i++) {
            handle(self, self._deferreds[i]);
        }

        self._deferreds = null;
    }

    function Handler(onFulfilled, onRejected, promise) {
        this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
        this.onRejected = typeof onRejected === 'function' ? onRejected : null;
        this.promise = promise;
    }

    /**
     * Take a potentially misbehaving resolver function and make sure
     * onFulfilled and onRejected are only called once.
     *
     * Makes no guarantees about asynchrony.
     */

    function doResolve(fn, self) {
        var done = false;

        try {
            fn(
                function (value) {
                    if (done) return;
                    done = true;
                    resolve(self, value);
                },
                function (reason) {
                    if (done) return;
                    done = true;
                    reject(self, reason);
                }
            );
        } catch (ex) {
            if (done) return;
            done = true;
            reject(self, ex);
        }
    }

    function Promise$1(fn) {
        if (!(this instanceof Promise$1)) throw new TypeError('Promises must be constructed via new');
        if (typeof fn !== 'function') throw new TypeError('not a function');
        this._state = 0;
        this._handled = false;
        this._value = undefined;
        this._deferreds = [];
        doResolve(fn, this);
    }

    var _proto = Promise$1.prototype;

    _proto.catch = function (onRejected) {
        return this.then(null, onRejected);
    };

    _proto.then = function (onFulfilled, onRejected) {
        var prom = new this.constructor(noop);
        handle(this, new Handler(onFulfilled, onRejected, prom));
        return prom;
    };

    Promise$1.all = function (arr) {
        return new Promise$1(function (resolve, reject) {
            if (!arr || typeof arr.length === 'undefined') throw new TypeError('Promise.all accepts an array');
            var args = Array.prototype.slice.call(arr);
            if (args.length === 0) return resolve([]);
            var remaining = args.length;

            function res(i, val) {
                try {
                    if (val && (_typeof(val) === 'object' || typeof val === 'function')) {
                        var then = val.then;

                        if (typeof then === 'function') {
                            then.call(
                                val,
                                function (val) {
                                    res(i, val);
                                },
                                reject
                            );
                            return;
                        }
                    }

                    args[i] = val;

                    if (--remaining === 0) {
                        resolve(args);
                    }
                } catch (ex) {
                    reject(ex);
                }
            }

            for (var i = 0; i < args.length; i++) {
                res(i, args[i]);
            }
        });
    };

    Promise$1.resolve = function (value) {
        if (value && _typeof(value) === 'object' && value.constructor === Promise$1) {
            return value;
        }

        return new Promise$1(function (resolve) {
            resolve(value);
        });
    };

    Promise$1.reject = function (value) {
        return new Promise$1(function (resolve, reject) {
            reject(value);
        });
    };

    Promise$1.race = function (values) {
        return new Promise$1(function (resolve, reject) {
            for (var i = 0, len = values.length; i < len; i++) {
                values[i].then(resolve, reject);
            }
        });
    }; // Use polyfill for setImmediate for performance gains

    Promise$1._immediateFn =
        (typeof setImmediate === 'function' &&
            function (fn) {
                setImmediate(fn);
            }) ||
        function (fn) {
            setTimeoutFunc(fn, 0);
        };

    Promise$1._unhandledRejectionFn = function _unhandledRejectionFn(err) {
        if (typeof console !== 'undefined' && console) {
            console.warn('Possible Unhandled Promise Rejection:', err); // eslint-disable-line no-console
        }
    };

    /**
     * Copyright 2016 Google Inc. All Rights Reserved.
     *
     * Licensed under the W3C SOFTWARE AND DOCUMENT NOTICE AND LICENSE.
     *
     *  https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
     *
     */
    (function (window, document) {
        // features are natively supported.

        if (
            'IntersectionObserver' in window &&
            'IntersectionObserverEntry' in window &&
            'intersectionRatio' in window.IntersectionObserverEntry.prototype
        ) {
            // Minimal polyfill for Edge 15's lack of `isIntersecting`
            // See: https://github.com/w3c/IntersectionObserver/issues/211
            if (!('isIntersecting' in window.IntersectionObserverEntry.prototype)) {
                Object.defineProperty(window.IntersectionObserverEntry.prototype, 'isIntersecting', {
                    get: function get() {
                        return this.intersectionRatio > 0;
                    },
                });
            }

            return;
        }

        /**
         * Creates the global IntersectionObserverEntry constructor.
         * https://w3c.github.io/IntersectionObserver/#intersection-observer-entry
         * @param {Object} entry A dictionary of instance properties.
         * @constructor
         */

        function IntersectionObserverEntry(entry) {
            this.time = entry.time;
            this.target = entry.target;
            this.rootBounds = entry.rootBounds;
            this.boundingClientRect = entry.boundingClientRect;
            this.intersectionRect = entry.intersectionRect || getEmptyRect();
            this.isIntersecting = !!entry.intersectionRect; // Calculates the intersection ratio.

            var targetRect = this.boundingClientRect;
            var targetArea = targetRect.width * targetRect.height;
            var intersectionRect = this.intersectionRect;
            var intersectionArea = intersectionRect.width * intersectionRect.height; // Sets intersection ratio.

            if (targetArea) {
                // Round the intersection ratio to avoid floating point math issues:
                // https://github.com/w3c/IntersectionObserver/issues/324
                this.intersectionRatio = Number((intersectionArea / targetArea).toFixed(4));
            } else {
                // If area is zero and is intersecting, sets to 1, otherwise to 0
                this.intersectionRatio = this.isIntersecting ? 1 : 0;
            }
        }

        /**
         * Creates the global IntersectionObserver constructor.
         * https://w3c.github.io/IntersectionObserver/#intersection-observer-interface
         * @param {Function} callback The function to be invoked after intersection
         *     changes have queued. The function is not invoked if the queue has
         *     been emptied by calling the `takeRecords` method.
         * @param {Object=} opt_options Optional configuration options.
         * @constructor
         */

        function IntersectionObserver(callback, opt_options) {
            var options = opt_options || {};

            if (typeof callback != 'function') {
                throw new Error('callback must be a function');
            }

            if (options.root && options.root.nodeType != 1) {
                throw new Error('root must be an Element');
            } // Binds and throttles `this._checkForIntersections`.

            this._checkForIntersections = throttle(this._checkForIntersections.bind(this), this.THROTTLE_TIMEOUT); // Private properties.

            this._callback = callback;
            this._observationTargets = [];
            this._queuedEntries = [];
            this._rootMarginValues = this._parseRootMargin(options.rootMargin); // Public properties.

            this.thresholds = this._initThresholds(options.threshold);
            this.root = options.root || null;
            this.rootMargin = this._rootMarginValues
                .map(function (margin) {
                    return margin.value + margin.unit;
                })
                .join(' ');
        }

        /**
         * The minimum interval within which the document will be checked for
         * intersection changes.
         */

        IntersectionObserver.prototype.THROTTLE_TIMEOUT = 100;
        /**
         * The frequency in which the polyfill polls for intersection changes.
         * this can be updated on a per instance basis and must be set prior to
         * calling `observe` on the first target.
         */

        IntersectionObserver.prototype.POLL_INTERVAL = null;
        /**
         * Use a mutation observer on the root element
         * to detect intersection changes.
         */

        IntersectionObserver.prototype.USE_MUTATION_OBSERVER = true;
        /**
         * Starts observing a target element for intersection changes based on
         * the thresholds values.
         * @param {Element} target The DOM element to observe.
         */

        IntersectionObserver.prototype.observe = function (target) {
            var isTargetAlreadyObserved = this._observationTargets.some(function (item) {
                return item.element == target;
            });

            if (isTargetAlreadyObserved) {
                return;
            }

            if (!(target && target.nodeType == 1)) {
                throw new Error('target must be an Element');
            }

            this._registerInstance();

            this._observationTargets.push({
                element: target,
                entry: null,
            });

            this._monitorIntersections();

            this._checkForIntersections();
        };
        /**
         * Stops observing a target element for intersection changes.
         * @param {Element} target The DOM element to observe.
         */

        IntersectionObserver.prototype.unobserve = function (target) {
            this._observationTargets = this._observationTargets.filter(function (item) {
                return item.element != target;
            });

            if (!this._observationTargets.length) {
                this._unmonitorIntersections();

                this._unregisterInstance();
            }
        };
        /**
         * Stops observing all target elements for intersection changes.
         */

        IntersectionObserver.prototype.disconnect = function () {
            this._observationTargets = [];

            this._unmonitorIntersections();

            this._unregisterInstance();
        };
        /**
         * Returns any queue entries that have not yet been reported to the
         * callback and clears the queue. This can be used in conjunction with the
         * callback to obtain the absolute most up-to-date intersection information.
         * @return {Array} The currently queued entries.
         */

        IntersectionObserver.prototype.takeRecords = function () {
            var records = this._queuedEntries.slice();

            this._queuedEntries = [];
            return records;
        };
        /**
         * Accepts the threshold value from the user configuration object and
         * returns a sorted array of unique threshold values. If a value is not
         * between 0 and 1 and error is thrown.
         * @private
         * @param {Array|number=} opt_threshold An optional threshold value or
         *     a list of threshold values, defaulting to [0].
         * @return {Array} A sorted list of unique and valid threshold values.
         */

        IntersectionObserver.prototype._initThresholds = function (opt_threshold) {
            var threshold = opt_threshold || [0];
            if (!Array.isArray(threshold)) threshold = [threshold];
            return threshold.sort().filter(function (t, i, a) {
                if (typeof t != 'number' || isNaN(t) || t < 0 || t > 1) {
                    throw new Error('threshold must be a number between 0 and 1 inclusively');
                }

                return t !== a[i - 1];
            });
        };
        /**
         * Accepts the rootMargin value from the user configuration object
         * and returns an array of the four margin values as an object containing
         * the value and unit properties. If any of the values are not properly
         * formatted or use a unit other than px or %, and error is thrown.
         * @private
         * @param {string=} opt_rootMargin An optional rootMargin value,
         *     defaulting to '0px'.
         * @return {Array<Object>} An array of margin objects with the keys
         *     value and unit.
         */

        IntersectionObserver.prototype._parseRootMargin = function (opt_rootMargin) {
            var marginString = opt_rootMargin || '0px';
            var margins = marginString.split(/\s+/).map(function (margin) {
                var parts = /^(-?\d*\.?\d+)(px|%)$/.exec(margin);

                if (!parts) {
                    throw new Error('rootMargin must be specified in pixels or percent');
                }

                return {
                    value: parseFloat(parts[1]),
                    unit: parts[2],
                };
            }); // Handles shorthand.

            margins[1] = margins[1] || margins[0];
            margins[2] = margins[2] || margins[0];
            margins[3] = margins[3] || margins[1];
            return margins;
        };
        /**
         * Starts polling for intersection changes if the polling is not already
         * happening, and if the page's visibility state is visible.
         * @private
         */

        IntersectionObserver.prototype._monitorIntersections = function () {
            if (!this._monitoringIntersections) {
                this._monitoringIntersections = true; // If a poll interval is set, use polling instead of listening to
                // resize and scroll events or DOM mutations.

                if (this.POLL_INTERVAL) {
                    this._monitoringInterval = setInterval(this._checkForIntersections, this.POLL_INTERVAL);
                } else {
                    addEvent(window, 'resize', this._checkForIntersections, true);
                    addEvent(document, 'scroll', this._checkForIntersections, true);

                    if (this.USE_MUTATION_OBSERVER && 'MutationObserver' in window) {
                        this._domObserver = new MutationObserver(this._checkForIntersections);

                        this._domObserver.observe(document, {
                            attributes: true,
                            childList: true,
                            characterData: true,
                            subtree: true,
                        });
                    }
                }
            }
        };
        /**
         * Stops polling for intersection changes.
         * @private
         */

        IntersectionObserver.prototype._unmonitorIntersections = function () {
            if (this._monitoringIntersections) {
                this._monitoringIntersections = false;
                clearInterval(this._monitoringInterval);
                this._monitoringInterval = null;
                removeEvent(window, 'resize', this._checkForIntersections, true);
                removeEvent(document, 'scroll', this._checkForIntersections, true);

                if (this._domObserver) {
                    this._domObserver.disconnect();

                    this._domObserver = null;
                }
            }
        };
        /**
         * Scans each observation target for intersection changes and adds them
         * to the internal entries queue. If new entries are found, it
         * schedules the callback to be invoked.
         * @private
         */

        IntersectionObserver.prototype._checkForIntersections = function () {
            var rootIsInDom = this._rootIsInDom();

            var rootRect = rootIsInDom ? this._getRootRect() : getEmptyRect();

            this._observationTargets.forEach(function (item) {
                var target = item.element;
                var targetRect = getBoundingClientRect(target);

                var rootContainsTarget = this._rootContainsTarget(target);

                var oldEntry = item.entry;

                var intersectionRect =
                    rootIsInDom && rootContainsTarget && this._computeTargetAndRootIntersection(target, rootRect);

                var newEntry = (item.entry = new IntersectionObserverEntry({
                    time: now(),
                    target: target,
                    boundingClientRect: targetRect,
                    rootBounds: rootRect,
                    intersectionRect: intersectionRect,
                }));

                if (!oldEntry) {
                    this._queuedEntries.push(newEntry);
                } else if (rootIsInDom && rootContainsTarget) {
                    // If the new entry intersection ratio has crossed any of the
                    // thresholds, add a new entry.
                    if (this._hasCrossedThreshold(oldEntry, newEntry)) {
                        this._queuedEntries.push(newEntry);
                    }
                } else {
                    // If the root is not in the DOM or target is not contained within
                    // root but the previous entry for this target had an intersection,
                    // add a new record indicating removal.
                    if (oldEntry && oldEntry.isIntersecting) {
                        this._queuedEntries.push(newEntry);
                    }
                }
            }, this);

            if (this._queuedEntries.length) {
                this._callback(this.takeRecords(), this);
            }
        };
        /**
         * Accepts a target and root rect computes the intersection between then
         * following the algorithm in the spec.
         * TODO(philipwalton): at this time clip-path is not considered.
         * https://w3c.github.io/IntersectionObserver/#calculate-intersection-rect-algo
         * @param {Element} target The target DOM element
         * @param {Object} rootRect The bounding rect of the root after being
         *     expanded by the rootMargin value.
         * @return {?Object} The final intersection rect object or undefined if no
         *     intersection is found.
         * @private
         */

        IntersectionObserver.prototype._computeTargetAndRootIntersection = function (target, rootRect) {
            // If the element isn't displayed, an intersection can't happen.
            if (window.getComputedStyle(target).display == 'none') return;
            var targetRect = getBoundingClientRect(target);
            var intersectionRect = targetRect;
            var parent = getParentNode(target);
            var atRoot = false;

            while (!atRoot) {
                var parentRect = null;
                var parentComputedStyle = parent.nodeType == 1 ? window.getComputedStyle(parent) : {}; // If the parent isn't displayed, an intersection can't happen.

                if (parentComputedStyle.display == 'none') return;

                if (parent == this.root || parent == document) {
                    atRoot = true;
                    parentRect = rootRect;
                } else {
                    // If the element has a non-visible overflow, and it's not the <body>
                    // or <html> element, update the intersection rect.
                    // Note: <body> and <html> cannot be clipped to a rect that's not also
                    // the document rect, so no need to compute a new intersection.
                    if (
                        parent != document.body &&
                        parent != document.documentElement &&
                        parentComputedStyle.overflow != 'visible'
                    ) {
                        parentRect = getBoundingClientRect(parent);
                    }
                } // If either of the above conditionals set a new parentRect,
                // calculate new intersection data.

                if (parentRect) {
                    intersectionRect = computeRectIntersection(parentRect, intersectionRect);
                    if (!intersectionRect) break;
                }

                parent = getParentNode(parent);
            }

            return intersectionRect;
        };
        /**
         * Returns the root rect after being expanded by the rootMargin value.
         * @return {Object} The expanded root rect.
         * @private
         */

        IntersectionObserver.prototype._getRootRect = function () {
            var rootRect;

            if (this.root) {
                rootRect = getBoundingClientRect(this.root);
            } else {
                // Use <html>/<body> instead of window since scroll bars affect size.
                var html = document.documentElement;
                var body = document.body;
                rootRect = {
                    top: 0,
                    left: 0,
                    right: html.clientWidth || body.clientWidth,
                    width: html.clientWidth || body.clientWidth,
                    bottom: html.clientHeight || body.clientHeight,
                    height: html.clientHeight || body.clientHeight,
                };
            }

            return this._expandRectByRootMargin(rootRect);
        };
        /**
         * Accepts a rect and expands it by the rootMargin value.
         * @param {Object} rect The rect object to expand.
         * @return {Object} The expanded rect.
         * @private
         */

        IntersectionObserver.prototype._expandRectByRootMargin = function (rect) {
            var margins = this._rootMarginValues.map(function (margin, i) {
                return margin.unit == 'px' ? margin.value : (margin.value * (i % 2 ? rect.width : rect.height)) / 100;
            });

            var newRect = {
                top: rect.top - margins[0],
                right: rect.right + margins[1],
                bottom: rect.bottom + margins[2],
                left: rect.left - margins[3],
            };
            newRect.width = newRect.right - newRect.left;
            newRect.height = newRect.bottom - newRect.top;
            return newRect;
        };
        /**
         * Accepts an old and new entry and returns true if at least one of the
         * threshold values has been crossed.
         * @param {?IntersectionObserverEntry} oldEntry The previous entry for a
         *    particular target element or null if no previous entry exists.
         * @param {IntersectionObserverEntry} newEntry The current entry for a
         *    particular target element.
         * @return {boolean} Returns true if a any threshold has been crossed.
         * @private
         */

        IntersectionObserver.prototype._hasCrossedThreshold = function (oldEntry, newEntry) {
            // To make comparing easier, an entry that has a ratio of 0
            // but does not actually intersect is given a value of -1
            var oldRatio = oldEntry && oldEntry.isIntersecting ? oldEntry.intersectionRatio || 0 : -1;
            var newRatio = newEntry.isIntersecting ? newEntry.intersectionRatio || 0 : -1; // Ignore unchanged ratios

            if (oldRatio === newRatio) return;

            for (var i = 0; i < this.thresholds.length; i++) {
                var threshold = this.thresholds[i]; // Return true if an entry matches a threshold or if the new ratio
                // and the old ratio are on the opposite sides of a threshold.

                if (threshold == oldRatio || threshold == newRatio || threshold < oldRatio !== threshold < newRatio) {
                    return true;
                }
            }
        };
        /**
         * Returns whether or not the root element is an element and is in the DOM.
         * @return {boolean} True if the root element is an element and is in the DOM.
         * @private
         */

        IntersectionObserver.prototype._rootIsInDom = function () {
            return !this.root || containsDeep(document, this.root);
        };
        /**
         * Returns whether or not the target element is a child of root.
         * @param {Element} target The target element to check.
         * @return {boolean} True if the target element is a child of root.
         * @private
         */

        IntersectionObserver.prototype._rootContainsTarget = function (target) {
            return containsDeep(this.root || document, target);
        };
        /**
         * Adds the instance to the global IntersectionObserver registry if it isn't
         * already present.
         * @private
         */

        IntersectionObserver.prototype._registerInstance = function () {};
        /**
         * Removes the instance from the global IntersectionObserver registry.
         * @private
         */

        IntersectionObserver.prototype._unregisterInstance = function () {};

        /**
         * Returns the result of the performance.now() method or null in browsers
         * that don't support the API.
         * @return {number} The elapsed time since the page was requested.
         */

        function now() {
            return window.performance && performance.now && performance.now();
        }

        /**
         * Throttles a function and delays its execution, so it's only called at most
         * once within a given time period.
         * @param {Function} fn The function to throttle.
         * @param {number} timeout The amount of time that must pass before the
         *     function can be called again.
         * @return {Function} The throttled function.
         */

        function throttle(fn, timeout) {
            var timer = null;
            return function () {
                if (!timer) {
                    timer = setTimeout(function () {
                        fn();
                        timer = null;
                    }, timeout);
                }
            };
        }

        /**
         * Adds an event handler to a DOM node ensuring cross-browser compatibility.
         * @param {Node} node The DOM node to add the event handler to.
         * @param {string} event The event name.
         * @param {Function} fn The event handler to add.
         * @param {boolean} opt_useCapture Optionally adds the even to the capture
         *     phase. Note: this only works in modern browsers.
         */

        function addEvent(node, event, fn, opt_useCapture) {
            if (typeof node.addEventListener == 'function') {
                node.addEventListener(event, fn, opt_useCapture || false);
            } else if (typeof node.attachEvent == 'function') {
                node.attachEvent('on' + event, fn);
            }
        }

        /**
         * Removes a previously added event handler from a DOM node.
         * @param {Node} node The DOM node to remove the event handler from.
         * @param {string} event The event name.
         * @param {Function} fn The event handler to remove.
         * @param {boolean} opt_useCapture If the event handler was added with this
         *     flag set to true, it should be set to true here in order to remove it.
         */

        function removeEvent(node, event, fn, opt_useCapture) {
            if (typeof node.removeEventListener == 'function') {
                node.removeEventListener(event, fn, opt_useCapture || false);
            } else if (typeof node.detatchEvent == 'function') {
                node.detatchEvent('on' + event, fn);
            }
        }

        /**
         * Returns the intersection between two rect objects.
         * @param {Object} rect1 The first rect.
         * @param {Object} rect2 The second rect.
         * @return {?Object} The intersection rect or undefined if no intersection
         *     is found.
         */

        function computeRectIntersection(rect1, rect2) {
            var top = Math.max(rect1.top, rect2.top);
            var bottom = Math.min(rect1.bottom, rect2.bottom);
            var left = Math.max(rect1.left, rect2.left);
            var right = Math.min(rect1.right, rect2.right);
            var width = right - left;
            var height = bottom - top;
            return (
                width >= 0 &&
                height >= 0 && {
                    top: top,
                    bottom: bottom,
                    left: left,
                    right: right,
                    width: width,
                    height: height,
                }
            );
        }

        /**
         * Shims the native getBoundingClientRect for compatibility with older IE.
         * @param {Element} el The element whose bounding rect to get.
         * @return {Object} The (possibly shimmed) rect of the element.
         */

        function getBoundingClientRect(el) {
            var rect;

            try {
                rect = el.getBoundingClientRect();
            } catch (err) {
                // Ignore Windows 7 IE11 "Unspecified error"
                // https://github.com/w3c/IntersectionObserver/pull/205
            }

            if (!rect) return getEmptyRect(); // Older IE

            if (!(rect.width && rect.height)) {
                rect = {
                    top: rect.top,
                    right: rect.right,
                    bottom: rect.bottom,
                    left: rect.left,
                    width: rect.right - rect.left,
                    height: rect.bottom - rect.top,
                };
            }

            return rect;
        }

        /**
         * Returns an empty rect object. An empty rect is returned when an element
         * is not in the DOM.
         * @return {Object} The empty rect.
         */

        function getEmptyRect() {
            return {
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                width: 0,
                height: 0,
            };
        }

        /**
         * Checks to see if a parent element contains a child element (including inside
         * shadow DOM).
         * @param {Node} parent The parent element.
         * @param {Node} child The child element.
         * @return {boolean} True if the parent node contains the child node.
         */

        function containsDeep(parent, child) {
            var node = child;

            while (node) {
                if (node == parent) return true;
                node = getParentNode(node);
            }

            return false;
        }

        /**
         * Gets the parent node of an element or its host element if the parent node
         * is a shadow root.
         * @param {Node} node The node whose parent to get.
         * @return {Node|null} The parent node or null if no parent exists.
         */

        function getParentNode(node) {
            var parent = node.parentNode;

            if (parent && parent.nodeType == 11 && parent.host) {
                // If the parent is a shadow root, return the host element.
                return parent.host;
            }

            return parent;
        } // Exposes the constructors globally.

        window.IntersectionObserver = IntersectionObserver;
        window.IntersectionObserverEntry = IntersectionObserverEntry;
    })(window, document);

    /*
     * classList.js: Cross-browser full element.classList implementation.
     * 1.1.20170427
     *
     * By Eli Grey, http://eligrey.com
     * License: Dedicated to the public domain.
     *   See https://github.com/eligrey/classList.js/blob/master/LICENSE.md
     */

    /*global self, document, DOMException */

    /*! @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js */
    if ('document' in window.self) {
        // Full polyfill for browsers with no classList support
        // Including IE < Edge missing SVGElement.classList
        if (
            !('classList' in document.createElement('_')) ||
            (document.createElementNS && !('classList' in document.createElementNS('http://www.w3.org/2000/svg', 'g')))
        ) {
            (function (view) {
                if (!('Element' in view)) return;

                var classListProp = 'classList',
                    protoProp = 'prototype',
                    elemCtrProto = view.Element[protoProp],
                    objCtr = Object,
                    strTrim =
                        String[protoProp].trim ||
                        function () {
                            return this.replace(/^\s+|\s+$/g, '');
                        },
                    arrIndexOf =
                        Array[protoProp].indexOf ||
                        function (item) {
                            var i = 0,
                                len = this.length;

                            for (; i < len; i++) {
                                if (i in this && this[i] === item) {
                                    return i;
                                }
                            }

                            return -1;
                        }, // Vendors: please allow content code to instantiate DOMExceptions
                    DOMEx = function DOMEx(type, message) {
                        this.name = type;
                        this.code = DOMException[type];
                        this.message = message;
                    },
                    checkTokenAndGetIndex = function checkTokenAndGetIndex(classList, token) {
                        if (token === '') {
                            throw new DOMEx('SYNTAX_ERR', 'An invalid or illegal string was specified');
                        }

                        if (/\s/.test(token)) {
                            throw new DOMEx('INVALID_CHARACTER_ERR', 'String contains an invalid character');
                        }

                        return arrIndexOf.call(classList, token);
                    },
                    ClassList = function ClassList(elem) {
                        var trimmedClasses = strTrim.call(elem.getAttribute('class') || ''),
                            classes = trimmedClasses ? trimmedClasses.split(/\s+/) : [],
                            i = 0,
                            len = classes.length;

                        for (; i < len; i++) {
                            this.push(classes[i]);
                        }

                        this._updateClassName = function () {
                            elem.setAttribute('class', this.toString());
                        };
                    },
                    classListProto = (ClassList[protoProp] = []),
                    classListGetter = function classListGetter() {
                        return new ClassList(this);
                    }; // Most DOMException implementations don't allow calling DOMException's toString()
                // on non-DOMExceptions. Error's toString() is sufficient here.

                DOMEx[protoProp] = Error[protoProp];

                classListProto.item = function (i) {
                    return this[i] || null;
                };

                classListProto.contains = function (token) {
                    token += '';
                    return checkTokenAndGetIndex(this, token) !== -1;
                };

                classListProto.add = function () {
                    var tokens = arguments,
                        i = 0,
                        l = tokens.length,
                        token,
                        updated = false;

                    do {
                        token = tokens[i] + '';

                        if (checkTokenAndGetIndex(this, token) === -1) {
                            this.push(token);
                            updated = true;
                        }
                    } while (++i < l);

                    if (updated) {
                        this._updateClassName();
                    }
                };

                classListProto.remove = function () {
                    var tokens = arguments,
                        i = 0,
                        l = tokens.length,
                        token,
                        updated = false,
                        index;

                    do {
                        token = tokens[i] + '';
                        index = checkTokenAndGetIndex(this, token);

                        while (index !== -1) {
                            this.splice(index, 1);
                            updated = true;
                            index = checkTokenAndGetIndex(this, token);
                        }
                    } while (++i < l);

                    if (updated) {
                        this._updateClassName();
                    }
                };

                classListProto.toggle = function (token, force) {
                    token += '';
                    var result = this.contains(token),
                        method = result ? force !== true && 'remove' : force !== false && 'add';

                    if (method) {
                        this[method](token);
                    }

                    if (force === true || force === false) {
                        return force;
                    } else {
                        return !result;
                    }
                };

                classListProto.toString = function () {
                    return this.join(' ');
                };

                if (objCtr.defineProperty) {
                    var classListPropDesc = {
                        get: classListGetter,
                        enumerable: true,
                        configurable: true,
                    };

                    try {
                        objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
                    } catch (ex) {
                        // IE 8 doesn't support enumerable:true
                        // adding undefined to fight this issue https://github.com/eligrey/classList.js/issues/36
                        // modernie IE8-MSW7 machine has IE8 8.0.6001.18702 and is affected
                        if (ex.number === undefined || ex.number === -0x7ff5ec54) {
                            classListPropDesc.enumerable = false;
                            objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
                        }
                    }
                } else if (objCtr[protoProp].__defineGetter__) {
                    elemCtrProto.__defineGetter__(classListProp, classListGetter);
                }
            })(window.self);
        } // There is full or partial native classList support, so just check if we need
        // to normalize the add/remove and toggle APIs.

        (function () {
            var testElement = document.createElement('_');
            testElement.classList.add('c1', 'c2'); // Polyfill for IE 10/11 and Firefox <26, where classList.add and
            // classList.remove exist but support only one argument at a time.

            if (!testElement.classList.contains('c2')) {
                var createMethod = function createMethod(method) {
                    var original = DOMTokenList.prototype[method];

                    DOMTokenList.prototype[method] = function (token) {
                        var i,
                            len = arguments.length;

                        for (i = 0; i < len; i++) {
                            token = arguments[i];
                            original.call(this, token);
                        }
                    };
                };

                createMethod('add');
                createMethod('remove');
            }

            testElement.classList.toggle('c3', false); // Polyfill for IE 10 and Firefox <24, where classList.toggle does not
            // support the second argument.

            if (testElement.classList.contains('c3')) {
                var _toggle = DOMTokenList.prototype.toggle;

                DOMTokenList.prototype.toggle = function (token, force) {
                    if (1 in arguments && !this.contains(token) === !force) {
                        return force;
                    } else {
                        return _toggle.call(this, token);
                    }
                };
            }

            testElement = null;
        })();
    }

    /* eslint-disable */
    // Production steps of ECMA-262, Edition 6, 22.1.2.1
    if (!Array.from) {
        Array.from = (function () {
            var toStr = Object.prototype.toString;

            var isCallable = function isCallable(fn) {
                return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
            };

            var toInteger = function toInteger(value) {
                var number = Number(value);

                if (isNaN(number)) {
                    return 0;
                }

                if (number === 0 || !isFinite(number)) {
                    return number;
                }

                return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
            };

            var maxSafeInteger = Math.pow(2, 53) - 1;

            var toLength = function toLength(value) {
                var len = toInteger(value);
                return Math.min(Math.max(len, 0), maxSafeInteger);
            }; // The length property of the from method is 1.

            return function from(
                arrayLike
                /*, mapFn, thisArg */
            ) {
                // 1. Let C be the this value.
                var C = this; // 2. Let items be ToObject(arrayLike).

                var items = Object(arrayLike); // 3. ReturnIfAbrupt(items).

                if (arrayLike == null) {
                    throw new TypeError('Array.from requires an array-like object - not null or undefined');
                } // 4. If mapfn is undefined, then let mapping be false.

                var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
                var T;

                if (typeof mapFn !== 'undefined') {
                    // 5. else
                    // 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
                    if (!isCallable(mapFn)) {
                        throw new TypeError('Array.from: when provided, the second argument must be a function');
                    } // 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.

                    if (arguments.length > 2) {
                        T = arguments[2];
                    }
                } // 10. Let lenValue be Get(items, "length").
                // 11. Let len be ToLength(lenValue).

                var len = toLength(items.length); // 13. If IsConstructor(C) is true, then
                // 13. a. Let A be the result of calling the [[Construct]] internal method
                // of C with an argument list containing the single item len.
                // 14. a. Else, Let A be ArrayCreate(len).

                var A = isCallable(C) ? Object(new C(len)) : new Array(len); // 16. Let k be 0.

                var k = 0; // 17. Repeat, while k < len… (also steps a - h)

                var kValue;

                while (k < len) {
                    kValue = items[k];

                    if (mapFn) {
                        A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
                    } else {
                        A[k] = kValue;
                    }

                    k += 1;
                } // 18. Let putStatus be Put(A, "length", len, true).

                A.length = len; // 20. Return A.

                return A;
            };
        })();
    }

    /* eslint-disable */
    // closest polyfill
    (function (ElementProto) {
        if (typeof ElementProto.matches !== 'function') {
            ElementProto.matches =
                ElementProto.msMatchesSelector ||
                ElementProto.mozMatchesSelector ||
                ElementProto.webkitMatchesSelector ||
                function matches(selector) {
                    var element = this;
                    var elements = (element.document || element.ownerDocument).querySelectorAll(selector);
                    var index = 0;

                    while (elements[index] && elements[index] !== element) {
                        ++index;
                    }

                    return Boolean(elements[index]);
                };
        }

        if (typeof ElementProto.closest !== 'function') {
            ElementProto.closest = function closest(selector) {
                var element = this;

                while (element && element.nodeType === 1) {
                    if (element.matches(selector)) {
                        return element;
                    }

                    element = element.parentNode;
                }

                return null;
            };
        }
    })(window.Element.prototype);

    /* eslint-disable no-extend-native */
    // falback for foreach
    if (!Array.prototype.forEach) {
        Array.prototype.forEach = function (callback, thisArg) {
            var T, k;

            if (this === null) {
                throw new TypeError(' this is null or not defined');
            } // 1. Let O be the result of calling ToObject passing the |this| value as the argument.

            var O = Object(this); // 2. Let lenValue be the result of calling the Get internal method of O with the argument "length".
            // 3. Let len be ToUint32(lenValue).

            var len = O.length >>> 0; // 4. If IsCallable(callback) is false, throw a TypeError exception.
            // See: http://es5.github.com/#x9.11

            if (typeof callback !== 'function') {
                throw new TypeError(''.concat(callback, ' is not a function'));
            } // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.

            if (arguments.length > 1) {
                T = thisArg;
            } // 6. Let k be 0

            k = 0; // 7. Repeat, while k < len

            while (k < len) {
                var kValue = void 0; // a. Let Pk be ToString(k).
                //   This is implicit for LHS operands of the in operator
                // b. Let kPresent be the result of calling the HasProperty internal method of O with argument Pk.
                //   This step can be combined with c
                // c. If kPresent is true, then

                if (k in O) {
                    // i. Let kValue be the result of calling the Get internal method of O with argument Pk.
                    kValue = O[k]; // ii. Call the Call internal method of callback with T as the this value and
                    // argument list containing kValue, k, and O.

                    callback.call(T, kValue, k, O);
                } // d. Increase k by 1.

                k++;
            } // 8. return undefined
        };
    }

    /* eslint-disable */
    // Array.prototype.map polyfill
    // code from https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/map
    if (!Array.prototype.map) {
        Array.prototype.map = function (
            fun
            /* , thisArg */
        ) {
            if (this === void 0 || this === null) {
                throw new TypeError();
            }

            var t = Object(this);
            var len = t.length >>> 0;

            if (typeof fun !== 'function') {
                throw new TypeError();
            }

            var res = new Array(len);
            var thisArg = arguments.length >= 2 ? arguments[1] : void 0;

            for (var i = 0; i < len; i++) {
                // NOTE: Absolute correctness would demand Object.defineProperty
                //       be used.  But this method is fairly new, and failure is
                //       possible only if Object.prototype or Array.prototype
                //       has a property |i| (very unlikely), so use a less-correct
                //       but more portable alternative.
                if (i in t) {
                    res[i] = fun.call(thisArg, t[i], i, t);
                }
            }

            return res;
        };
    }

    /* eslint-disable */
    if (typeof Object.assign !== 'function') {
        // Must be writable: true, enumerable: false, configurable: true
        Object.defineProperty(Object, 'assign', {
            value: function assign(target, varArgs) {
                // .length of function is 2
                if (target == null) {
                    // TypeError if undefined or null
                    throw new TypeError('Cannot convert undefined or null to object');
                }

                var to = Object(target);

                for (var index = 1; index < arguments.length; index++) {
                    var nextSource = arguments[index];

                    if (nextSource != null) {
                        // Skip over if undefined or null
                        for (var nextKey in nextSource) {
                            // Avoid bugs when hasOwnProperty is shadowed
                            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                                to[nextKey] = nextSource[nextKey];
                            }
                        }
                    }
                }

                return to;
            },
            writable: true,
            configurable: true,
        });
    }

    /* eslint-disable */
    (function () {
        if ('content' in document.createElement('template')) {
            return false;
        }

        var templates = document.getElementsByTagName('template');
        var plateLen = templates.length;

        for (var x = 0; x < plateLen; ++x) {
            var template = templates[x];
            var content = template.childNodes;
            var fragment = document.createDocumentFragment();

            while (content[0]) {
                fragment.appendChild(content[0]);
            }

            template.content = fragment;
        }
    })();

    // trunc polyfill
    Math.trunc =
        Math.trunc ||
        function (x) {
            return x < 0 ? Math.ceil(x) : Math.floor(x);
        };

    // source: https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent
    (function () {
        if (typeof window.CustomEvent === 'function') {
            return false;
        }

        function CustomEvent(event, params) {
            params = params || {
                bubbles: false,
                cancelable: false,
                detail: undefined,
            };
            var evt = document.createEvent('CustomEvent');
            evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
            return evt;
        }

        CustomEvent.prototype = window.Event.prototype;
        window.CustomEvent = CustomEvent;
    })();

    if (!Array.prototype.includes) {
        Array.prototype.includes = function (el) {
            var returnValue = false;

            if (this.indexOf(el) !== -1) {
                returnValue = true;
            }

            return returnValue;
        };
    }

    // https://tc39.github.io/ecma262/#sec-array.prototype.find
    if (!Array.prototype.find) {
        Object.defineProperty(Array.prototype, 'find', {
            value: function value(predicate) {
                // 1. Let O be ? ToObject(this value).
                if (this == null) {
                    throw TypeError('"this" is null or not defined');
                }

                var o = Object(this); // 2. Let len be ? ToLength(? Get(O, "length")).

                var len = o.length >>> 0; // 3. If IsCallable(predicate) is false, throw a TypeError exception.

                if (typeof predicate !== 'function') {
                    throw TypeError('predicate must be a function');
                } // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.

                var thisArg = arguments[1]; // 5. Let k be 0.

                var k = 0; // 6. Repeat, while k < len

                while (k < len) {
                    // a. Let Pk be ! ToString(k).
                    // b. Let kValue be ? Get(O, Pk).
                    // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
                    // d. If testResult is true, return kValue.
                    var kValue = o[k];

                    if (predicate.call(thisArg, kValue, k, o)) {
                        return kValue;
                    } // e. Increase k by 1.

                    k++;
                } // 7. Return undefined.

                return undefined;
            },
            configurable: true,
            writable: true,
        });
    }

    var nl = {
        'generic.are': 'zijn',
        'generic.is': 'is',
        'drilldown.close_menu': 'Sluit menu',
        'drilldown.search': 'Zoek',
        'drilldown.back_to_level': 'Terug naar niveau $1',
        'drilldown.no_results': 'Geen resultaten gevonden',
        'slider.next_slide': 'volgende slide',
        'slider.prev_slide': 'vorige slide',
        'lightbox.next_slide': 'Volgende (Pijltje naar rechts)',
        'lightbox.prev_slide': 'Vorige (Pijltje naar links)',
        'lightbox.zoom_in_out': 'Zoom in/uit',
        'lightbox.close': 'Esc/sluiten',
        'codepreview.copy': 'Copy',
        'codepreview.copied': 'Copied',
        'codepreview.copy_to_clipboard': 'Copy to clipboard',
        'autocomplete.my_location': 'Mijn Locatie',
        'autocomplete.loading_location': 'Locatie ophalen...',
        'autocomplete.no_results': 'Geen resultaten',
        'autocomplete.no_results_found': 'Er zijn geen resultaten beschikbaar',
        'autocomplete.results_found': 'Er $2 $1 beschikbaar',
        'autocomplete.results': 'resultaten',
        'autocomplete.result': 'resultaat',
        'select.search_placeholder_value': 'Zoek item',
        'select.placeholder_value': 'Selecteer item',
        'select.no_results': 'Geen resultaten gevonden',
        'select.no_more_options': 'Geen resterende opties gevonden',
        'upload.add_files': 'Bijlage toevoegen',
        'upload.add_files_subtitle': 'Sleep de bijlage naar hier om toe te voegen',
        'upload.file_to_big': 'Het bestand mag maximaal $1 zijn.',
        'upload.file-type_not_allowed': 'Dit bestandstype is niet toegestaan.',
        'upload.to_many_files': 'Je kan maximaal $1 bestand(en) uploaden.',
        'upload.response_error': 'Er liep iets fout bij het uploaden.',
    };

    var Translation = /*#__PURE__*/ (function () {
        function Translation() {
            _classCallCheck(this, Translation);

            this.i18n = nl;
        }

        _createClass(Translation, [
            {
                key: 't',
                value: function t(key) {
                    var trans = this.i18n[key];

                    if (trans) {
                        var i = 0;

                        for (
                            var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1;
                            _key < _len;
                            _key++
                        ) {
                            args[_key - 1] = arguments[_key];
                        }

                        for (var _i = 0, _args = args; _i < _args.length; _i++) {
                            var arg = _args[_i];
                            i++;
                            trans = trans.replace('$' + i, arg.toString());
                        }
                    } else {
                        return key;
                    }

                    return trans;
                },
            },
        ]);

        return Translation;
    })();

    window.vl = window.vl || {};
    vl.ns = vl.ns || 'vl-'; // To add to window

    if (!window.Promise) {
        window.Promise = Promise$1;
    }

    vl.i18n = new Translation();
});
