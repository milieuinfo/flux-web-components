(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined'
        ? (module.exports = factory())
        : typeof define === 'function' && define.amd
        ? define(factory)
        : (global.util = factory());
})(typeof self !== 'undefined' ? self : this, function () {
    'use strict';

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

    var util = {
        addClass: addClass,
        removeClass: removeClass,
        hasClass: hasClass,
        toggleClass: toggleClass,
        addClassFor: addClassFor,
        parseTemplate: parseTemplate,
        triggerEvent: triggerEvent,
        unique: unique,
        closest: closest,
        offset: offset,
        insertAfter: insertAfter,
        removeElement: removeElement,
        isNumeric: isNumeric,
        wrap: wrap,
        stripTags: stripTags,
        uniqueId: uniqueId,
        uniqueName: uniqueName,
        accurateNumber: accurateNumber,
        limit: limit,
        asArray: asArray,
        countDecimals: countDecimals,
        scrollTo: scrollTo,
        randomIntFromInterval: randomIntFromInterval,
        debounce: debounce,
        throttle: throttle,
        each: each,
        exists: exists,
        bytesToSize: bytesToSize,
        getJson: getJson,
        getParents: getParents,
        getParentsUntil: getParentsUntil,
    };

    return util;
});
