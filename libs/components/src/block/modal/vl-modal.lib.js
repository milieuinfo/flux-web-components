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
    // Interne markers worden enkel door deze lib gezet/gelezen → enkel data-vorm.
    const mDressedAtt = 'data-'.concat(mAttr, '-dressed');
    const mClosable = 'data-'.concat(mAttr, '-closable');
    // Publieke attributen: matchen zowel de oude vorm (geldig op een vl-element)
    // als de data-vorm (geldig op een native element).
    const mOpen = ''.concat(mAttr, '-open');
    const mClose = ''.concat(mAttr, '-close');
    const mCloseSelector = '['.concat(mClose, '],[data-').concat(mClose, ']');
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

    // Close-triggers wisselen runtime (sluitkruis, Annuleer), daarom bij de klik opzoeken i.p.v. bij dress().
    // element.contains() beperkt tot de eigen boom: light-DOM elementen met modal-close in een slot sluiten niet.
    function isCloseTriggerClick(element, event) {
        return event
            .composedPath()
            .some((node) => node instanceof Element && element.contains(node) && node.matches(mCloseSelector));
    }

    function isEscapeKey(event) {
        return event.key === 'Escape' || event.keyCode === 27;
    }

    // Een klik op de ::backdrop komt binnen op de dialog zelf, buiten zijn kader.
    function isBackdropClick(element, event) {
        const dialogBounds = element.getBoundingClientRect();
        const isInDialog =
            event.clientY > dialogBounds.top &&
            event.clientY < dialogBounds.top + dialogBounds.height &&
            event.clientX > dialogBounds.left &&
            event.clientX < dialogBounds.left + dialogBounds.width;

        return event.target === element && !isInDialog;
    }

    const Modal =
        /* #__PURE__ */
        (function () {
            function Modal() {
                _classCallCheck(this, Modal);

                this.lastClickedToggle = null;
                // In openingsvolgorde, de bovenste modal laatst. Een modal blijft erin tot de opruiming na zijn sluiting.
                this.openModals = [];
                // Ligt de focus buiten elke open dialog (bv. op body nadat de gefocuste knop disabled werd), dan bereikt
                // Escape de keydown-listener van de dialog niet. Een open dialog in het pad beslist zelf, anders de
                // bovenste modal. Eén listener voor alle modals, zodat er per modal geen op document achterblijft.
                document.addEventListener(
                    'keydown',
                    (event) => {
                        if (!isEscapeKey(event)) {
                            return;
                        }
                        // isConnected: een dialog die open uit de DOM verdwijnt, houdt zijn open-attribuut.
                        const openModals = this.openModals.filter(
                            (openModal) => openModal.isConnected && openModal.hasAttribute('open'),
                        );
                        const topModal = openModals[openModals.length - 1];
                        if (
                            topModal &&
                            !topModal.hasAttribute(mClosable) &&
                            !event.composedPath().some((node) => node instanceof HTMLDialogElement && node.open)
                        ) {
                            event.preventDefault();
                        }
                    },
                    true,
                );
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
                            }

                            this.openModals = this.openModals.filter((openModal) => openModal !== element);
                            element.setAttribute('aria-hidden', true);
                            this.lastClickedToggle?.focus();
                            vl.util.removeClass(document.body, noOverflowClass);
                        } else {
                            element.showModal();
                            this.openModals.push(element);
                            if (element.dataset.focusOnModal === 'true') element.focus();
                            element.setAttribute('aria-hidden', false);
                            vl.util.addClass(document.body, noOverflowClass);
                        }
                    },
                },
                {
                    key: 'finishClose',
                    // Ruimt op na een sluiting buiten toggle() om, zoals via Escape. Na toggle() staat de modal niet meer
                    // in openModals: dan is er al opgeruimd en mag de focus niet nog eens verspringen.
                    value: function finishClose(element) {
                        if (!element.hasAttribute('open') && this.openModals.includes(element)) {
                            this.toggle(element, true);
                        }
                    },
                },
                {
                    key: 'dress',
                    value: function dress(element) {
                        let linkedOpenTrigger;
                        const self = this;

                        element.setAttribute(mDressedAtt, true); // Handle open/close

                        linkedOpenTrigger = findOpenTrigger(
                            element,
                            '['
                                .concat(mOpen, '="')
                                .concat(element.id, '"],[data-')
                                .concat(mOpen, '="')
                                .concat(element.id, '"]')
                        );
                        vl.util.each(linkedOpenTrigger, (openTrigger) => {
                            openTrigger.addEventListener('click', function (event) {
                                self.lastClickedToggle = this;

                                if (!element.hasAttribute('open')) {
                                    self.toggle(element);
                                }

                                event.preventDefault();
                            });
                        });
                        element.addEventListener('click', (event) => {
                            if (
                                element.hasAttribute('open') &&
                                (isCloseTriggerClick(element, event) ||
                                    (element.hasAttribute(mClosable) && isBackdropClick(element, event)))
                            ) {
                                self.toggle(element);
                            }
                        });
                        element.addEventListener('close', () => self.finishClose(element));
                        element.addEventListener('keydown', (event) => {
                            if (isEscapeKey(event) && !element.hasAttribute(mClosable)) {
                                event.preventDefault();
                                event.stopPropagation();
                            }
                        });
                    },
                },
                {
                    key: 'dressAll',
                    value: function dressAll() {
                        const _this = this;

                        const elements = document.querySelectorAll(
                            '['
                                .concat(mAttr, ']:not([')
                                .concat(mDressedAtt, ']):not([js-dress="false"]),[data-')
                                .concat(mAttr, ']:not([')
                                .concat(mDressedAtt, ']):not([js-dress="false"])')
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
