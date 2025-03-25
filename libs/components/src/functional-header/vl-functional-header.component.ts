import { BaseElementOfType, MARGINS, registerWebComponents, webComponent } from '@domg-wc/common-utilities';
import {
    vlContentBlockStyles,
    vlGridStyles,
    vlIconStyles,
    vlLinkIconStyles,
    vlLinkStyles,
    vlResetStyles,
    vlSectionStyles,
} from '@domg-wc/common-utilities/css';
import { VlIconComponent } from '@domg-wc/components/next/icon';
import { vlTitleStyles } from '@domg-wc/components/next/title/vl-title.css';
import { functionalHeaderStyle } from '@domg/govflanders-style/component';
import { functionalHeaderUigStyle } from './vl-functional-header.uig-css';

@webComponent('vl-functional-header')
export class VlFunctionalHeaderComponent extends BaseElementOfType(HTMLElement) {
    static {
        registerWebComponents([VlIconComponent]);
    }

    static get _observedAttributes() {
        return [
            'back',
            'back-link',
            'disable-back-link',
            'hide-back-link',
            'hide-sub-header',
            'link',
            'margin-bottom',
            'sub-title',
            'title',
        ];
    }

    static get _observedClassAttributes() {
        return ['full-width'];
    }

    get _classPrefix() {
        return 'vl-functional-header--';
    }

    constructor() {
        super(`
          <header class="vl-functional-header">
            <div class="vl-content-block-next">
              <div class="vl-functional-header__row uig-functional-header__row">
                <div class="uig-functional-header__content">
                    <div class="vl-functional-header__content">
                        <slot name="top-left"></slot>
                    </div>
                    <div class="vl-functional-header__content">
                        <h1 class="vl-functional-header__title no-space-bottom">
                            <a id="title" class="vl-link-next neutral" tabindex="0">
                                <slot name="title"></slot>
                            </a>
                        </h1>
                    </div>
                </div>
                <div class="uig-functional-header__top-right">
                    <slot name="top-right"></slot>
                </div>
                <div id="actions" class="vl-functional-header__actions">
                    <ul></ul>
                </div>
              </div>
              <div class="vl-functional-header__sub" id="sub-header">
                <slot name="sub-header">
                  <ul class="vl-functional-header__sub-row vl-functional-header__sub-actions">
                      <li id="back-link-container" class="vl-functional-header__sub__action">
                          <slot name="back-link">
                              <a id="back-link" class="vl-link-next" tabindex="0" href="${document.referrer}">
                                  <span class="vl-icon vl-icon--arrow-left-fat vl-link-next__icon vl-link-next__icon--before"></span><slot id="back-link-text" name="back"><span>Terug</span></slot>
                              </a>
                          </slot>
                      </li>
                      <li id="sub-title" class="vl-functional-header__sub__action">
                          <slot name="sub-title"></slot>
                      </li>
                  </ul>
                </slot>
              </div>
            </div>
          </header>
        `);
    }

    connectedCallback() {
        super.connectedCallback();

        this._observer = this.__observeSlotElements(() => this.__processSlotElements());
        this.__processSlotElements();

        if (this._backLinkElement) {
            this._backLinkElement.onclick = (event: Event) => this._handleClickBackLink(event);
        }

        if (this.shadowRoot) {
            this.shadowRoot.adoptedStyleSheets = [
                ...this.shadowRoot.adoptedStyleSheets,
                vlResetStyles.styleSheet,
                vlGridStyles.styleSheet,
                vlSectionStyles.styleSheet,
                vlContentBlockStyles.styleSheet,
                ...vlTitleStyles.map((style) => style.styleSheet),
                functionalHeaderStyle.styleSheet,
                functionalHeaderUigStyle.styleSheet,
                vlLinkStyles('.vl-link-next').styleSheet,
                vlLinkIconStyles.styleSheet,
                vlIconStyles.styleSheet,
            ];
        }
    }

    disconnectedCallback() {
        this._observer.disconnect();
    }

    get _titleElement() {
        return this._shadow.querySelector('#title');
    }

    get _subTitleElement() {
        return this._shadow.querySelector('#sub-title');
    }

    get _backLinkContainer() {
        return this._shadow.querySelector('#back-link-container');
    }

    get _backLinkElement() {
        return this._shadow.querySelector('#back-link');
    }

    get _backLinkTextElement() {
        return this._backLinkElement.querySelector('#back-link-text');
    }

    get _actionsElement() {
        return this._shadow.querySelector('#actions');
    }

    get _subHeaderElement() {
        return this._shadow.querySelector('#sub-header');
    }

    get _defaultSubHeaderElement() {
        return this._shadow.querySelector('#default-sub-header');
    }

    get _actionsListElement() {
        return this._actionsElement.querySelector('ul');
    }

    get _subHeaderListElement() {
        return this._subHeaderElement.querySelector('ul');
    }

    get _subTitleListElements() {
        return this._subTitleListElement.querySelectorAll('li');
    }

    _getActionTemplate(element: Element) {
        return this._template(`
      <li class="vl-functional-header__action">
        <p>${element.outerHTML}</p>
      </li>
    `);
    }

    _getSubHeaderTemplate(element: Element) {
        return this._getSubHeaderTemplateWithValue(element.outerHTML);
    }

    _getSubHeaderTemplateWithValue(text: string) {
        return this._template(`<li class="vl-functional-header__sub__action">${text}</li>`);
    }

    _titleChangedCallback(oldValue: string, newValue: string) {
        this._titleElement.innerText = newValue;
    }

    _subTitleChangedCallback(oldValue: string, newValue: string) {
        this._subTitleElement.innerText = newValue;
    }

    _linkChangedCallback(oldValue: string, newValue: string) {
        this._titleElement.href = newValue;
    }

    _backChangedCallback(oldValue: string, newValue: string) {
        this._backLinkTextElement.innerText = newValue;
    }

    _backLinkChangedCallback(oldValue: string, newValue: string) {
        this._backLinkElement.href = newValue || document.referrer;
    }

    _marginBottomChangedCallback(oldValue: string, newValue: string) {
        const margin = MARGINS[newValue];
        const header = this._shadow.querySelector('.vl-functional-header');

        if (margin) {
            header.style.marginBottom = margin;
        } else {
            header.style.removeProperty('margin-bottom');
        }
    }

    _hideBackLinkChangedCallback(oldValue: string, newValue: string) {
        if (newValue != undefined) {
            this._backLinkContainer?.remove();
        }
    }

    _hideSubHeaderChangedCallback(oldValue: string, newValue: string) {
        if (newValue != undefined) {
            this._subHeaderElement?.classList.add('sub-header-hidden');
        } else {
            this._subHeaderElement?.classList.remove('sub-header-hidden');
        }
    }

    _handleClickBackLink(event: Event) {
        if (this.hasAttribute('disable-back-link')) {
            event.preventDefault();
        }

        this.dispatchEvent(
            new CustomEvent('vl-click-back', {
                bubbles: true,
                composed: true,
            })
        );
    }

    /**
     * Zet de click event listener voor de 'Terug' knop. Default: ```document.referrer```
     *
     * @param {Function} eventListener - Functie met de uit te voeren handeling als op de terug knop wordt geklikt.
     */
    set backLinkEventListener(eventListener: EventListener) {
        if (this._backLinkEventListener) {
            this._backLinkElement.removeEventListener('click', this._backLinkEventListener);
        }
        this._backLinkEventListener = eventListener;
        this._backLinkElement.addEventListener('click', this._backLinkEventListener);
    }

    __processSlotElements() {
        this.__processSlotActions();
    }

    __processSlotSubHeader() {
        this._subHeaderListElement.innerHTML = '';
        const subHeader = this.querySelector('[slot="sub-header"]');
        if (subHeader) {
            [...subHeader.children]
                .map((action) => this._getSubHeaderTemplate(action))
                .forEach((action) => this._subHeaderListElement.append(action));
            this._defaultSubHeaderElement.hidden = true;
        } else {
            this._subHeaderElement.hidden = true;
        }
    }

    __processSlotActions() {
        this._actionsListElement.innerHTML = '';
        const actions = this.querySelector('[slot="actions"]');
        if (actions) {
            [...actions.children]
                .map((action) => this._getActionTemplate(action))
                .forEach((action) => this._actionsListElement.append(action));
        } else {
            this._actionsElement.hidden = true;
        }
    }

    __observeSlotElements(callback: MutationCallback) {
        const node = this as unknown as Node;
        const observer = new MutationObserver(callback);
        observer.observe(node, {
            attributes: true,
            childList: true,
            characterData: true,
            subtree: true,
        });
        return observer;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-functional-header': VlFunctionalHeaderComponent;
    }
}
