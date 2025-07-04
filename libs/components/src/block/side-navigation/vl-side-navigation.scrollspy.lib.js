// source code copied from node_modules/@govflanders/vl-ui-side-navigation/src/js/modules/scrollspy.js "version": "14.0.2"
// de veranderingen zijn gemarkeerd met referentie naar specifiek ticket

/**
 * Scrollspy navigation
 * We assume that in a sticky element items with an anchor link should have a scrollspy functionality
 */

import { findDeepestElementThroughShadowRoot } from '@domg-wc/common';

// UIG-2278: vl lijkt niet in alle gevallen defined te zijn, terwijl deze lib daar precies wel op steunt
window.vl = window.vl || {};

// Private variables
const ssClass = `js-vl-scrollspy`,
    ssAtt = `scrollspy`,
    ssActiveClass = `js-vl-scrollspy-active`,
    ssActiveMobileClass = `js-vl-scrollspy-mobile--active`,
    ssPlaceholderClass = `js-vl-scrollspy-placeholder`,
    ssCloseClass = `js-vl-scrollspy__close`,
    ssToggleClass = `js-vl-scrollspy__toggle`,
    ssToggleFixedClass = `js-vl-scrollspy__toggle--fixed`,
    ssContentClass = `js-vl-scrollspy__content`,
    ssContentAtt = `scrollspy-content`,
    regionClass = `vl-region`,
    sectionClass = `vl-section`,
    snItemClass = `vl-side-navigation__item`,
    globalHvisibleClass = 'js-iwgh3-bc--visible',
    body = document.body,
    ssIDAtt = `scrollspy-id`,
    ssDressedAtt = `scrollspy-dressed`,
    ssChildAtt = `child`,
    ssParentAtt = `parent`,
    ssMobileAtt = `scrollspy-mobile`,
    stickyOffsetTopAtt = `sticky-offset-top`,
    sideNavigation = `vl-side-navigation`;

// Private functions
const _closePopup = (placeholder, button) => {
    vl.util.removeClass(placeholder, ssActiveMobileClass);
    vl.util.removeClass(body, vl.ns + 'u-no-overflow');

    if (vl.util.exists(button, true, false)) {
        button.setAttribute('aria-expanded', false);
    }
};

// Gets an element height
const _getHeight = (element) => {
    // UIG-2490 - null checks toegevoegd op element (element > element?)
    return Math.max(element?.scrollHeight, element?.offsetHeight, element?.clientHeight);
};


const _scrollSpyMobile = (elements, wrapper, contentWrapper) => {
    let placeholder = document.createElement('div'),
        closeButton = document.createElement('button'),
        openButton = document.createElement('button'),
        wrapperHeight,
        scrollSpyBtnLabel = wrapper.getAttribute(ssMobileAtt);

    // Generate close button
    vl.util.addClass(placeholder, ssPlaceholderClass);
    vl.util.wrap(wrapper, placeholder);

    if (vl.util.exists(placeholder)) {
        closeButton.setAttribute('type', 'button');
        closeButton.setAttribute('tabindex', '0');
        closeButton.innerHTML = 'Navigatie sluiten';

        vl.util.addClass(closeButton, ssCloseClass);
        placeholder.insertBefore(closeButton, placeholder.firstChild);

        // Generate toggle button
        wrapperHeight = _getHeight(contentWrapper);

        closeButton.addEventListener('click', (event) => {
            event.stopPropagation();
            _closePopup(placeholder, openButton);
        });

        if (vl.util.exists(contentWrapper)) {
            let openButtonOffsetHeight = 0,
                bt,
                otherParents;

            openButton.setAttribute('type', 'button');
            openButton.setAttribute('tabindex', '0');
            openButton.setAttribute('aria-expanded', 'false');
            openButton.innerHTML = scrollSpyBtnLabel || 'Navigatie';

            vl.util.addClass(openButton, ssToggleClass);
            vl.util.addClass(openButton, `vl-button`);
            vl.util.addClass(openButton, `vl-button--block`);
            contentWrapper.appendChild(openButton);

            openButton.addEventListener('click', (event) => {
                event.stopPropagation();
                event.target.setAttribute('aria-expanded', true);
                placeholder.setAttribute('tabindex', '1');

                vl.util.addClass(placeholder, ssActiveMobileClass);
                vl.util.addClass(body, `vl-u-no-overflow`);
                closeButton.focus();
            });

            // FLUX-92: vervang "Shady way" hieronder met `getBoundingClientRect().top`
            const openButtonTop = openButton.getBoundingClientRect().top;
            
            // Shady way to get offset
            // bt = openButton;

            // while (bt) {
            //     openButtonOffsetHeight = 0;
            //     bt = bt.offsetParent;
            // }

            // Add height to offset
            // openButtonOffsetHeight = openButtonOffsetHeight + 30;

            // Toggle fixed class to toggle
            window.addEventListener(
                'scroll',
                // FLUX-92: throttle ipv debounce om tijdens het scrollen al te kunnen switchen van classes
                vl.util.throttle(() => {
                    if (
                        window.pageYOffset > openButtonTop &&
                        window.pageYOffset <
                            openButtonTop + wrapperHeight - document.documentElement.clientHeight
                    ) {
                        vl.util.addClass(openButton, ssToggleFixedClass);
                    } else {
                        vl.util.removeClass(openButton, ssToggleFixedClass);
                    }
                }, 200),
                false
            );

            vl.util.each(elements, (element) => {
                element.addEventListener('click', (event) => {
                    if (element.hasAttribute(ssChildAtt)) {
                        // Close all others
                        otherParents = wrapper.querySelectorAll(`[${ssChildAtt}]`);

                        vl.util.each(otherParents, (parent) => {
                            parent.setAttribute('aria-expanded', 'false');
                        });

                        element.setAttribute('aria-expanded', 'true');
                    }

                    event.stopPropagation();
                });
            });

            document.addEventListener('click', _closePopup(placeholder, openButton));
        }
    }
};

class ScrollSpy {
    constructor() {
        this.latestKnownScrollY = 0;
        this.ticking = false;
        this.parameters = {
            offset: 100,
        };

        // FLUX-92: vang aanpassingen aan vl.breakpoint op
        window.addEventListener('vl-breakpoint-changed', (e) => {
            this.dressAll()
        })
    }

    _requestTick() {
        if (!this.ticking) {
            let self = this;

            window.requestAnimationFrame(() => {
                self._update();
            });
        }

        this.ticking = true;
    }

    _scrollSpy() {
        this.latestKnownScrollY = window.pageYOffset;
        this._requestTick();
    }

    _update() {
        this.ticking = false;

        // FLUX-89: reverse() toegevoegd, van onder naar boven checken geeft een beter resultaat
        // wanneer er verschillende targets in beeld zijn.
        vl.util.each([...this.elements].reverse(), (element) => {
            this._checkScrollSpy(element);
        });
    }

    _checkScrollSpy(element) {
        // UIG-2490 - omdat we geen toegang kunnen krijgen tot het element wanneer de schaduwdom er omheen is gewikkeld, moeten we het op deze manier ophalen
        // let hasBreadcrumb = document.querySelector(`.${globalHvisibleClass}`),
        let hasBreadcrumb = element.getRootNode().querySelector(`.${globalHvisibleClass}`),
            initialOffset = this.scrollSpyWrapper.getAttribute(stickyOffsetTopAtt) || 75,
            target,
            dataParent,
            parent;

        const href = element.getAttribute('href');

        // If the link is an empty # end here
        if (href === '#' && vl.util.exists(href)) {
            return;
        }

        // Check if global header breadcrumb is shown
        if (!vl.util.hasClass(this.scrollSpyWrapper, sideNavigation)) {
            if (vl.util.exists(hasBreadcrumb)) {
                this.scrollSpyWrapper.style.top = `${parseInt(initialOffset, 10) + 41}px`;
            }
        }

        // Check if global header breadcrumb is shown
        // UIG-2490 - omdat we geen toegang kunnen krijgen tot het element wanneer de schaduwdom er omheen is gewikkeld, moeten we het op deze manier ophalen
        // target = document.querySelector(href);
        target = findDeepestElementThroughShadowRoot(element.getRootNode(), href);
        // FLUX-89: stop hier indien target niet gevonden werd
        if (!target) {
            return;
        }

        // FLUX-89: nieuwe isInViewport check
        // - we checken of de bovenkant bovenaan in beeld is (>= -1: om rekening te houden met waardes als -0.2px)
        // - we checken of de onderkant onderaan in beeld is
        // - indien target groter is dan de viewport (indien men de ID bv op een div ipv een titel geplaatst heeft)
        //   returnen we ook true als de bovenkant al uit beeld is en de onderkant nog niet in beeld
        const targetTop = target.getBoundingClientRect().top;
        const targetHeight = target.offsetHeight;
        const viewport = window.innerHeight;
        const targetBottom = targetTop + targetHeight;
        const isInsideViewport = targetTop >= -1 && targetBottom < viewport; 
        const isCoveringViewport = targetHeight >= viewport && targetTop < 0 && targetBottom > viewport;
        const isInViewport = isInsideViewport || isCoveringViewport; 
        if (isInViewport) {
            let otherItems = this.scrollSpyWrapper.querySelectorAll(`.${snItemClass} a`);
            vl.util.each(otherItems, (el) => {
                if (element !== el) {
                    vl.util.removeClass(el, ssActiveClass);
                }
            });

            let ariaExpandedItems = this.scrollSpyWrapper.querySelectorAll('[aria-expanded=true]');
            vl.util.each(ariaExpandedItems, (el) => {
                // FLUX-89: enkel dichtklappen wanneer het element geen deel uitmaakt van de opengeklapte lijst
                if (!el.contains(element)) {
                    el.setAttribute('aria-expanded', false);
                }
            });

            vl.util.addClass(element, ssActiveClass);

            // Parent detection
            dataParent = element.getAttribute(ssParentAtt);
            parent = this.scrollSpyWrapper.querySelector(`[${ssChildAtt}="${dataParent}"]`);

            if (vl.util.exists(parent)) {
                parent.setAttribute('aria-expanded', true);
            }
        }

        // FLUX-89: als het element zelf een toggle is en in beeld is mag deze opengeklapt worden
        const isToggleElement = element.parentElement?.classList.contains('vl-side-navigation__toggle');
        if (isInViewport && isToggleElement) {
            element.parentElement.setAttribute('aria-expanded', 'true');
        }
    }

    /**
     * Get an element's distance from the top of the Document.
     * @param  {Node} elem The element
     * @return {Number}    Distance from the top in pixels
     */
    // FLUX-89: wordt niet meer gebruikt
    // _getOffsetTop(element) {
    //     let location = 0;

    //     // UIG-2490 - null checks toegevoegd op element (element > element?)
    //     if (element?.offsetParent) {
    //         do {
    //             location += element?.offsetTop;
    //             element = element?.offsetParent;
    //         } while (element);
    //     } else {
    //         location = element?.offsetTop;
    //     }

    //     location = location - this.parameters.offset;

    //     return location >= 0 ? location : 0;
    // }

    dress(wrapper) {
        let id = vl.util.uniqueId(),
            correspondingRegion = wrapper.closest(`.${regionClass}, .${sectionClass}`),
            scrollSpyContentWrapper = correspondingRegion && correspondingRegion.querySelector(`[${ssContentAtt}]`);

        if (!vl.util.exists(scrollSpyContentWrapper)) {
            scrollSpyContentWrapper = correspondingRegion && correspondingRegion.querySelector(`.${ssContentClass}`);
        }

        this.scrollSpyWrapper = wrapper;
        this.elements = wrapper.querySelectorAll('a[href^="#"]');

        wrapper.setAttribute(ssIDAtt, id);

        vl.util.addClass(wrapper, ssClass);

        // Only add scrollspy if all content is loaded
        vl.util.each(this.elements, (element) => {
            if (element.hasAttribute(ssChildAtt)) {
                element.setAttribute('aria-expanded', 'false');
            }
        });

        // Initiate on small/xsmall breakpoints
        if (vl.util.exists(vl.breakpoint)) {
            if (vl.breakpoint.value === 'small' || vl.breakpoint.value === 'xsmall') {
                _scrollSpyMobile(this.elements, wrapper, scrollSpyContentWrapper);
            }
        }

        window.addEventListener(
            'scroll',
            () => {
                this._scrollSpy();
            },
            false
        );

        this._scrollSpy();
    }

    dressAll() {
        const scrollSpies = document.querySelectorAll(`[${ssAtt}]:not([${ssDressedAtt}])`);

        vl.util.each(scrollSpies, (scrollSpy) => {
            vl.util.addClass(scrollSpy, ssClass);
            this.dress(scrollSpy);
        });
    }
}

export default ScrollSpy;
