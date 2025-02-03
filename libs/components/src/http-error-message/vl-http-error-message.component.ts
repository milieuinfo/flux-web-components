import { BaseElementOfType, registerWebComponents, webComponent } from '@domg-wc/common-utilities';
import { vlGridStyles, vlGroupStyles, vlResetStyles, vlStackedStyles } from '@domg-wc/common-utilities/css';
import { VlLinkComponent } from '@domg-wc/components/next/link';
import { vlTitleStyles } from '@domg-wc/components/next/title/vl-title.css';
import { render } from 'lit';
import { VlTypography } from '../typography/vl-typography.component';
import errorCodes from './error-codes';
import httpErrorMessageUigStyle from './vl-http-error-message.uig-css';

@webComponent('vl-http-error-message')
export class VlHttpErrorMessage extends BaseElementOfType(HTMLElement) {
    static {
        registerWebComponents([VlLinkComponent, VlTypography]);
    }

    static get _observedAttributes() {
        return ['title', 'image', 'image-alt', 'error-code'];
    }

    constructor() {
        super(`
          <style>
            ${vlResetStyles}
            ${vlTitleStyles}
            ${httpErrorMessageUigStyle}
            ${vlGroupStyles}
            ${vlGridStyles}
            ${vlStackedStyles}
          </style>
          <div class="vl-grid-next vl-stacked-next-small" data-vl-align-center data-vl-v-center>

            <div class="vl-hidden-next vl-visible-next--s vl-column-next vl-column-next--justify-self-center vl-column-next--12  vl-column-next--m-12  vl-column-next--s-12 vl-column-next--xs-12">
                                                                          <img id="image-small" alt="fiets met platte band" />
            </div>
            <div class="vl-column-next vl-column-next--6  vl-column-next--m-6  vl-column-next--s-8 vl-column-next--xs-12">
              <div class="vl-grid-next vl-stacked-next-small">
                <div class="vl-column-next vl-column-next--12">
                  <h2 id="title"></h2>
                  <vl-typography id="text"><slot slot="text" name="text"></slot></vl-typography>
                  <vl-typography id="error-text"></vl-typography>
                </div>
                <div id="info" class="vl-column-next vl-column-next--12">
                  <table>
                    <tr>
                      <td>URL:</td>
                      <td id="url"></td>
                    </tr>
                    <tr>
                      <td>Tijd:</td>
                      <td id="time"></td>
                    </tr>
                    <tr>
                      <td>User-agent:</td>
                      <td id="user-agent"></td>
                    </tr>
                  </table>
                </div>
                <div id="actions" class="vl-column-next vl-column-next--12"><div id="error-actions"><slot name="actions"></slot></div></div>
              </div>
            </div>
            <div class="vl-column-next vl-column-next--6  vl-column-next--m-6  vl-column-next--s-8 vl-column-next--xs-12 vl-hidden-next--s">
              <div class="vl-u-display-flex vl-u-flex-align-center vl-u-flex-v-center">
                <img id="image-normal"/>
              </div>
            </div>
          </div>
        `);
    }

    connectedCallback() {
        super.connectedCallback();

        this.__processAttributes();
        this.__setDebugInfo();
    }

    get _title() {
        return this.dataset.vlTitle || this._defaults?.title;
    }

    get _image() {
        return this.dataset.vlImage || this._defaults?.image;
    }

    get _imageAlt() {
        return this.dataset.vlImageAlt || this._defaults?.imageAlt;
    }

    get _errorCode() {
        return this.dataset.vlErrorCode || this._defaults?.errorCode;
    }

    _titleChangedCallback() {
        this.__processTitle();
    }

    _imageChangedCallback() {
        this.__processImage();
    }

    _imageAltChangedCallback() {
        this.__processImageAlt();
    }

    _errorCodeChangedCallback() {
        this.__processErrorCode();
    }

    __setImageAttribute(attribute: string, value: string) {
        this.__imageForSmallScreensElement.setAttribute(attribute, value);
        this.__imageForNormalScreensElement.setAttribute(attribute, value);
    }

    __setDebugInfo() {
        const userAgent = navigator.userAgent;
        const url = window.parent.location.href;
        const time = new Date().toISOString();

        this.__urlElement.textContent = url;
        this.__timeElement.textContent = time;
        this.__userAgentElement.textContent = userAgent;
    }

    get __titleElement() {
        return this._element.querySelector('#title');
    }

    get __textElement() {
        return this._element.querySelector('#text');
    }

    get __actionsElement() {
        return this._element.querySelector('#actions');
    }

    get __actionElement() {
        return this._element.querySelector('#actions > *');
    }

    get __imageForSmallScreensElement() {
        return this._element.querySelector('#image-small');
    }

    get __imageForNormalScreensElement() {
        return this._element.querySelector('#image-normal');
    }

    get __urlElement() {
        return this._element.querySelector('#url');
    }

    get __timeElement() {
        return this._element.querySelector('#time');
    }

    get __userAgentElement() {
        return this._element.querySelector('#user-agent');
    }

    get __errorTextElement() {
        return this._element.querySelector('#error-text');
    }

    get __errorActionsElement() {
        return this._element.querySelector('#error-actions');
    }

    __processTitle() {
        const title = this._title || errorCodes[this._errorCode]?.title;
        this.__titleElement.textContent = title;
    }

    __processImage() {
        const image = this._image || errorCodes[this._errorCode]?.image;
        this.__setImageAttribute('src', image);
    }

    __processImageAlt() {
        const imageAlt = this._imageAlt || errorCodes[this._errorCode]?.imageAlt;
        this.__setImageAttribute('alt', imageAlt);
    }

    __processErrorText() {
        const hasTextSlot = this.__hasSlot(this.__textElement, 'text');

        if (!hasTextSlot) {
            const errorText = errorCodes[this._errorCode]?.errorText;
            render(errorText, this.__errorTextElement);
        } else {
            render('', this.__errorTextElement);
        }
    }

    __processErrorActions() {
        const hasActionsSlot = this.__hasSlot(this.__actionElement, 'actions');

        if (!hasActionsSlot) {
            const errorActions = errorCodes[this._errorCode]?.errorActions;
            render(errorActions, this.__errorActionsElement);
        } else {
            render('', this.__errorActionsElement);
        }
    }

    __processAttributes() {
        this.__processTitle();
        this.__processImage();
        this.__processImageAlt();
        this.__processErrorText();
        this.__processErrorActions();
    }

    __processErrorCode() {
        this.__processAttributes();
    }

    __hasSlot(element: HTMLElement | ShadowRoot, slotName: string): boolean {
        const slotElement = element.querySelector(`slot[name=${slotName}]`) as HTMLSlotElement;
        const assignedNodes = slotElement?.assignedNodes() || [];
        return assignedNodes.length > 0;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-http-error-message': VlHttpErrorMessage;
    }
}
