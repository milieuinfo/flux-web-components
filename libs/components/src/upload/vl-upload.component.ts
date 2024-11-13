import { BaseHTMLElement, VL, webComponentPromised } from '@domg-wc/common-utilities';
import { vlFormValidation, vlFormValidationElement } from '@domg-wc/elements';
import { iconStyle, linkStyle, uploadStyle } from '@domg/govflanders-style/component';
import { resetStyle } from '@domg/govflanders-style/common';
import uploadUigStyle from './vl-upload.uig-css';
import './vl-upload.lib.js';

declare const vl: VL;

@webComponentPromised([vlFormValidation.ready()], 'vl-upload')
export class VlUploadComponent extends vlFormValidationElement(BaseHTMLElement) {
    static get _observedAttributes() {
        return vlFormValidation
            ._observedAttributes()
            .concat([
                'accepted-files',
                'autoprocess',
                'disabled',
                'disallow-duplicates',
                'error-message-accepted-files',
                'error-message-filesize',
                'error-message-maxfiles',
                'input-name',
                'max-files',
                'max-size',
                'sub-title',
                'title',
                'url',
                'reset-form-on-clear',
            ]);
    }

    static get _observedChildClassAttributes() {
        return ['error', 'success'];
    }

    get _classPrefix() {
        return 'vl-upload--';
    }

    constructor() {
        super(`
          <style>
            ${resetStyle}
            ${linkStyle}
            ${uploadStyle}
            ${uploadUigStyle}
            ${iconStyle}
          </style>
          <div class="vl-upload" data-vl-upload data-vl-upload-url="http://www.example.com"></div>
        `);
    }

    connectedCallback(): void {
        super.connectedCallback();

        this._appendTemplates();
        this.dress();
        this._processSlots();
    }

    /**
     * Geeft de bestanden die toegevoegd zijn.
     * @return {File[]}
     */
    get value(): File[] | null {
        if (this.acceptedFiles && this.acceptedFiles.length > 0) {
            return this.acceptedFiles;
        }
        return null;
    }

    /**
     * Geeft het upload element.
     * @return {HTMLElement}
     */
    get uploadElement(): HTMLElement {
        return this.shadowRoot.querySelector('.vl-upload__element');
    }

    /**
     * Haal de geaccepteerde bestanden (zonder error) op, die toegevoegd zijn.
     * @return {File[]}
     */
    get acceptedFiles(): File[] {
        return this._dropzone.getAcceptedFiles();
    }

    /**
     * Haal de niet-geaccepteerde bestanden (met error) op, die toegevoegd zijn.
     * @return {File[]}
     */
    get rejectedFiles(): File[] {
        return this._dropzone.getRejectedFiles();
    }

    /**
     * Haal alle bestanden op die toegevoegd zijn.
     * @return {File[]}
     */
    get files(): File[] {
        return this._dropzone.files;
    }

    get _upload(): HTMLElement | undefined {
        return this._element;
    }

    get _dressed(): boolean {
        return !!this.getAttribute('data-vl-upload-dressed');
    }

    get _dropzone() {
        if (vl && vl.upload && vl.upload.dropzoneInstances) {
            return vl.upload.dropzoneInstances.filter((dropzone: any) => dropzone.element === this._element)[0];
        }
    }

    get _button(): HTMLButtonElement {
        return this._shadow.querySelector('.vl-upload__element__button');
    }

    get _hasUploadTemplate() {
        return document.body.querySelector('#uploadTemplate');
    }

    get _hasPreviewFilesWrapperTemplate() {
        return document.body.querySelector('#previewFilesWrapper');
    }

    get _hasPreviewTemplate() {
        return document.body.querySelector('#previewTemplate');
    }

    get _hasUploadOverlayTemplate() {
        return document.body.querySelector('#uploadOverlay');
    }

    get _titleSlotElement(): HTMLSlotElement | null {
        return this.querySelector('[slot="title"]');
    }

    get _subTitleSlotElement(): HTMLSlotElement | null {
        return this.querySelector('[slot="sub-title"]');
    }

    get _titleElement(): HTMLElement | null {
        return this.uploadElement.querySelector('#title');
    }

    get _slottedTitleElement(): HTMLElement | null {
        return this.uploadElement.querySelector('#slotted-title');
    }

    get _subTitleElement(): HTMLElement | null {
        return this.uploadElement.querySelector('#sub-title');
    }

    get _slottedSubTitleElement(): HTMLElement | null {
        return this.uploadElement.querySelector('#slotted-sub-title');
    }

    get _uploadTemplate() {
        return this._template(`
      <template id="uploadTemplate">
        <div class="vl-upload__element">
          <div class="vl-upload__element__label">
            <button type="button" class="vl-upload__element__button vl-link">
              <i class="vl-vi vl-vi-paperclip" aria-hidden="true"></i>
              <span class="vl-upload__element__button__container" id="title"></span>
              <span class="vl-upload__element__button__container" id="slotted-title"><slot name="title"></slot></span>
            </button>
            <small id="sub-title"></small>
            <small id="slotted-sub-title"><slot name="sub-title"></slot></small>
          </div>
        </div>
      </template>
    `);
    }

    get _previewFilesWrapperTemplate() {
        return this._template(`
      <template id="previewFilesWrapper">
        <div class="vl-upload__files">
          <div class="vl-upload__files__container"></div>
          <div class="vl-upload__files__input__container"></div>
          <button class="vl-upload__files__close vl-link vl-link--icon">
            <span class="vl-link__icon vl-vi vl-vi-trash" aria-hidden="true"></span>
            Verwijder alle bestanden
          </button>
        </div>
      </template>
    `);
    }

    get _previewTemplate() {
        return this._template(`
      <template id="previewTemplate">
        <div class="vl-upload__file">
          <p class="vl-upload__file__name">
            <span class="vl-upload__file__name__icon vl-vi vl-vi-document" aria-hidden="true"></span>
            <span data-dz-name></span>
            <span class="vl-upload__file__size">
              (<span data-dz-size></span>)
            </span>
          </p>
          <div class="dz-error-message">
            <span data-dz-errormessage></span>
          </div>
          <button type="button" class="vl-upload__file__close vl-link vl-link--icon" data-dz-remove>
            <span class="vl-vi vl-vi-cross" aria-hidden="true"></span>
          </button>
        </div>
      </template>
    `);
    }

    get _uploadOverlayTemplate() {
        return this._template(`
      <template id="uploadOverlay">
        <div class="vl-upload__overlay">
          <p class="vl-upload__overlay__text">
            <span class="vl-link__icon vl-vi vl-vi-paperclip" aria-hidden="true"></span>
          </p>
        </div>
      </template>
    `);
    }

    get _prefix(): string {
        return 'data-vl-upload-';
    }

    /**
     * Initialiseer de modal config.
     * @return {void}
     */
    dress(): void {
        if (!this._dressed) {
            vl.upload.dress(this._upload);
            this._dressFormValidation();
            this._dropzone.on('addedfile', (file: File) => this.__triggerChange(file));
            this._dropzone.on('removedfile', (file: File) => {
                const customAction = () => {
                    if (this.hasAttribute('reset-form-on-clear')) {
                        this.form?.reset();
                    }
                };
                this.__triggerChange(file, customAction);
            });
            this._dropzone.on('success', (file: any, response: any) => {
                file.responseBody = response;
                this.__triggerChange(file);
            });
            this._dropzone.on('duplicateRemoved', (file: File) => this.__duplicateRemoved(file));
            this._dropzone.options.timeout = 0; // 0 value will disable the connection timeout
        }
    }

    // TODO meer specifieke events te definiëren, eenmaal we breaking changes kunnen introduceren
    __triggerChange(data: unknown, customAction?: () => void): void {
        setTimeout(() => {
            this.dispatchEvent(new CustomEvent('change', { detail: { data } }));
            if (customAction) customAction();
        });
    }

    __duplicateRemoved(file: File): void {
        setTimeout(() => {
            this.dispatchEvent(new CustomEvent('duplicateRemoved', { detail: { data: file } }));
        });
    }

    /**
     * Handmatig de upload aanroepen. Indien een url gegeven is, laad op naar die url.
     * @param {String} url
     * @return {void}
     */
    upload(url: string): void {
        if (url) {
            this._dropzone.options.url = url;
        }
        this._dropzone.processQueue();
    }

    /**
     * Verwijder alle files in de dropzone.
     * @return {void}
     */
    clear(): void {
        this._dropzone.removeAllFiles();
        if (this.form) this.resetValidity();
    }

    /**
     * Wrapper om alle events te kunnen catchen van de upload (zoals vl.upload.hook.fileChange alsook de events van
     * [DropZoneJs]{@link https://www.dropzonejs.com/#event-list})
     * @param {String} event
     * @param {Function} callback
     * @return {void}
     */
    on(event: string, callback: () => void): void {
        this._element?.addEventListener(event, callback);
        this._dropzone.on(event, callback);
    }

    /**
     * Handmatig bestand toevoegen aan de lijst van opgeladen bestanden zonder achterliggende upload
     * @param {String} name
     * @param {Number} size
     * @param {Number} id
     * @param {String} type
     * @param {Object} responseBody - body van de response bij het opladen van het bestand
     * @return {void}
     */
    addFile({ name, size, id, type, responseBody }: any): void {
        const autoprocessActive = this.dataset.vlAutoprocess != undefined;
        if (autoprocessActive) {
            this._disableAutoProcessQueue();
        }
        const file = { name, size, id, type, responseBody, status };
        this._dropzone.addFile(file);
        this._dropzone.emit('complete', file);
        file.status = 'success';
        if (autoprocessActive) {
            this._enableAutoProcessQueue();
        }
    }

    /**
     * Geeft focus aan het link element.
     */
    focus(): void {
        this._button.focus();
    }

    /**
     * Enable input element.
     */
    enable(): void {
        if (this._element) vl.upload.enable(this._element);
    }

    /**
     * Disable input element.
     */
    disable(): void {
        if (this._element) vl.upload.disable(this._element);
    }

    _acceptedFilesChangedCallback(oldValue: string, newValue: string): void {
        this._element?.setAttribute(`${this._prefix}accepted-files`, newValue);
        this._element?.setAttribute('accept', newValue);
    }

    _autoprocessChangedCallback(oldValue: string, newValue: string): void {
        this._element?.setAttribute(`${this._prefix}autoprocess`, newValue);
    }

    _disabledChangedCallback(oldValue: string, newValue: string): void {
        if (newValue !== null) {
            this.disable();
        } else {
            this.enable();
        }
    }

    _disallowDuplicatesChangedCallback(oldValue: string, newValue: string): void {
        this._element?.setAttribute(`${this._prefix}disallow-duplicates`, newValue);
    }

    _errorMessageAcceptedFilesChangedCallback(oldValue: string, newValue: string): void {
        this._element?.setAttribute(`${this._prefix}error-message-accepted-files`, newValue);
    }

    _errorMessageFilesizeChangedCallback(oldValue: string, newValue: string): void {
        this._element?.setAttribute(`${this._prefix}error-message-filesize`, newValue);
    }

    _errorMessageMaxfilesChangedCallback(oldValue: string, newValue: string): void {
        this._element?.setAttribute(`${this._prefix}error-message-maxfiles`, newValue);
    }

    _inputNameChangedCallback(oldValue: string, newValue: string): void {
        this._element?.setAttribute(`${this._prefix}input-name`, newValue);
    }

    _maxFilesChangedCallback(oldValue: string, newValue: string): void {
        this._element?.setAttribute(`${this._prefix}max-files`, newValue);
    }

    _maxSizeChangedCallback(oldValue: string, newValue: string): void {
        this._element?.setAttribute(`${this._prefix}max-size`, newValue);
    }

    _titleChangedCallback(oldValue: string, newValue: string): void {
        this._changeTranslation('upload.add_files', newValue);
    }

    _subTitleChangedCallback(oldValue: string, newValue: string): void {
        this._changeTranslation('upload.add_files_subtitle', newValue);
    }

    _urlChangedCallback(oldValue: string, newValue: string) {
        this._element?.setAttribute(`${this._prefix}url`, newValue);
        if (this._dropzone && this._dropzone.options) {
            this._dropzone.options.url = newValue;
        }
    }

    _appendTemplates() {
        if (!this._hasUploadTemplate) {
            document.body.appendChild(this._uploadTemplate);
        }

        if (!this._hasPreviewFilesWrapperTemplate) {
            document.body.appendChild(this._previewFilesWrapperTemplate);
        }

        if (!this._hasPreviewTemplate) {
            document.body.appendChild(this._previewTemplate);
        }

        if (!this._hasUploadOverlayTemplate) {
            document.body.appendChild(this._uploadOverlayTemplate);
        }
    }

    _disableAutoProcessQueue(): void {
        this._dropzone.options.autoProcessQueue = false;
    }

    _enableAutoProcessQueue(): void {
        this._dropzone.options.autoProcessQueue = true;
    }

    _processSlots(): void {
        if (this._titleSlotElement) {
            this._titleElement?.remove();
        } else {
            this._slottedTitleElement?.remove();
        }

        if (this._subTitleSlotElement) {
            this._subTitleElement?.remove();
        } else {
            this._slottedSubTitleElement?.remove();
        }
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-upload': VlUploadComponent;
    }
}
