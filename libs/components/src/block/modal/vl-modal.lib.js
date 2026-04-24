(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined'
        ? (module.exports = factory())
        : typeof define === 'function' && define.amd
        ? define(factory)
        : (global.modal = factory());
})(typeof self !== 'undefined' ? self : this, () => {
    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError('Cannot call a class as a function');
        }
    }

    function _defineProperties(target, props) {
        for (let i = 0; i < props.length; i++) {
            const descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ('value' in descriptor) {
                descriptor.writable = true;
            }
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }

    function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps) {
            _defineProperties(Constructor.prototype, protoProps);
        }
        if (staticProps) {
            _defineProperties(Constructor, staticProps);
        }
        return Constructor;
    }

    const mAttr = 'modal';
    const mDressedAtt = ''.concat(mAttr, '-dressed');
    const mClosable = ''.concat(mAttr, '-closable');
    const mOpen = ''.concat(mAttr, '-open');
    const mClose = ''.concat(mAttr, '-close');
    const mFallbackBackdropClass = '.backdrop';
    const noOverflowClass = ''.concat(vl.ns, 'u-no-overflow');

    /**
     * Zoekt elementen in zowel document als parent shadow DOMs.
     * Dit lost het probleem op waarbij modals niet werken als de parent een shadow DOM heeft.
     * @param {Element} element - Het modal dialog element
     * @param {string} selector - De CSS selector om naar te zoeken
     * @return {NodeList|Array} Array van gevonden elementen
     */
    function findOpenTrigger(element, selector) {
        const triggers = [];

        // Zoek in document root
        triggers.push(...Array.from(document.querySelectorAll(selector)));

        // Zoek in parent shadow DOMs
        let currentElement = element.parentNode;
        while (currentElement) {
            if (currentElement instanceof ShadowRoot) {
                triggers.push(...Array.from(currentElement.querySelectorAll(selector)));
            }

            // Ga naar de volgende parent
            if (currentElement instanceof ShadowRoot) {
                currentElement = currentElement.host.parentNode;
            } else if (currentElement instanceof Element) {
                currentElement = currentElement.parentNode;
            } else {
                break;
            }
        }

        return triggers;
    }

    const Modal =
        /* #__PURE__ */
        (function () {
            function Modal() {
                _classCallCheck(this, Modal);

                this.lastClickedToggle = null;
            }

            _createClass(Modal, [
                {
                    key: 'toggle',
                    value: function toggle(element) {
                        const forceClose = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
                        const visible = element.hasAttribute('open');

                        if (visible || forceClose) {
                            if (visible) {
                                element.close();
                                element.setAttribute('aria-hidden', true);
                            }

                            this.lastClickedToggle.focus();
                            vl.util.removeClass(document.body, noOverflowClass);
                        } else {
                            element.showModal();
                            if (element.dataset.focusOnModal === 'true') element.focus();
                            element.setAttribute('aria-hidden', false);
                            vl.util.addClass(document.body, noOverflowClass);
                        }
                    },
                },
                {
                    key: 'dress',
                    value: function dress(element) {
                        let linkedOpenTrigger;
                        let linkedClosedTrigger;
                        let closable = false;
                        const self = this;

                        element.setAttribute(mDressedAtt, true); // Handle open/close

                        linkedOpenTrigger = findOpenTrigger(element, '['.concat(mOpen, '="').concat(element.id, '"]'));
                        linkedClosedTrigger = element.querySelectorAll('['.concat(mClose, ']')); // See if closable (by esc or backdrop)

                        closable = element.hasAttribute(mClosable);
                        vl.util.each(linkedOpenTrigger, (openTrigger) => {
                            openTrigger.addEventListener('click', function (event) {
                                self.lastClickedToggle = this;

                                if (!element.hasAttribute('open')) {
                                    self.toggle(element);
                                }

                                event.preventDefault();
                            });
                        });
                        vl.util.each(linkedClosedTrigger, (closeTrigger) => {
                            closeTrigger.addEventListener('click', () => {
                                if (element.hasAttribute('open')) {
                                    self.toggle(element);
                                }
                            });
                        }); // If attribute closable is available

                        if (closable) {
                            // Make sure click outside of element closes modal
                            document.addEventListener('click', (event) => {
                                if (element.hasAttribute('open')) {
                                    const dialogBounds = element.getBoundingClientRect();
                                    const isInDialog =
                                        event.clientY > dialogBounds.top &&
                                        event.clientY < dialogBounds.top + dialogBounds.height &&
                                        event.clientX > dialogBounds.left &&
                                        event.clientX < dialogBounds.left + dialogBounds.width;

                                    if (
                                        !isInDialog &&
                                        (event.target.tagName === 'VL-MODAL' ||
                                            vl.util.hasClass(event.target, mFallbackBackdropClass))
                                    ) {
                                        self.toggle(element);
                                    }
                                }
                            });
                            element.addEventListener('close', () => {
                                self.toggle(element, true);
                            });
                        } else {
                            element.addEventListener('keydown', (event) => {
                                if (event.keyCode === 27) {
                                    event.preventDefault();
                                    event.stopPropagation();
                                }
                            });
                        }
                    },
                },
                {
                    key: 'dressAll',
                    value: function dressAll() {
                        const _this = this;

                        const elements = document.querySelectorAll(
                            '['.concat(mAttr, ']:not([').concat(mDressedAtt, ']):not([js-dress="false"])')
                        );
                        vl.util.each(elements, (element) => {
                            _this.dress(element);
                        });
                    },
                },
            ]);

            return Modal;
        })();

    if (!('modal' in vl)) {
        vl.modal = new Modal();
        vl.modal.dressAll();
    }

    return Modal;
});
