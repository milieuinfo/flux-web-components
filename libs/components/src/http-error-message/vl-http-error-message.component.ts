import { BaseElementOfType, GlobalStyles, registerWebComponents, webComponent } from '@domg-wc/common';
import { vlGridStyles, vlGroupStyles, vlResetStyles, vlStackedStyles } from '@domg-wc/styles';
import { render } from 'lit';
import { VlLinkComponent } from '../link';
import { vlTitleStyles } from '../title/vl-title.css';
import { VlTypography } from '../typography';
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
          <div class="vl-error-message-container vl-grid vl-stacked-small">
            <div class="vl-column vl-column--justify-self-center vl-column--6  vl-column--m-6  vl-column--s-8 vl-column--xs-12">
              <div class="vl-grid vl-stacked-small">
                <div class="vl-column vl-column--12">
                  <h2 id="title"></h2>
                  <vl-typography id="text"><slot slot="text" name="text"></slot></vl-typography>
                  <vl-typography id="error-text"></vl-typography>
                </div>
                <div id="info" class="vl-column vl-column--12">
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
                <div id="actions" class="vl-column vl-column--12"><div id="error-actions"><slot name="actions"></slot></div></div>
              </div>
            </div>
            <div class="vl-column vl-column--justify-self-center vl-column--6  vl-column--m-6  vl-column--s-8 vl-column--xs-12">
                <img id="image-normal"/>
            </div>
          </div>
        `);

        GlobalStyles.getInstance().register();
    }

    connectedCallback() {
        super.connectedCallback();

        this.__processAttributes();
        this.__setDebugInfo();
    }

    get _title() {
        return this.getAttribute('title') || this._defaults?.title;
    }

    get _image() {
        return this.getAttribute('image') || this._defaults?.image;
    }

    get _imageAlt() {
        return this.getAttribute('image-alt') || this._defaults?.imageAlt;
    }

    get _errorCode() {
        return this.getAttribute('error-code') || this._defaults?.errorCode;
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
        this.__titleElement.textContent = this._title || errorCodes[this._errorCode]?.title;
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
