import { findNodesForSlot, webComponent } from '@domg-wc/common';
import { accessibilityStyle, baseStyle, resetStyle } from '@domg/govflanders-style/common';
import { iconStyle, linkStyle, uploadStyle } from '@domg/govflanders-style/component';
import { Validator } from '@open-wc/form-control';
import { FormValue } from '@open-wc/form-control/src/types';
import DropzoneImport from 'dropzone';
import { CSSResult, html, PropertyDeclarations, TemplateResult } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { Dropzone as DropzoneInstance, DropzoneFile } from '../dropzone-types';
import { FormControl } from '../form-control/form-control';
import { uploadDefaults } from './vl-upload.defaults';
import { vlUploadFluxStyles } from './vl-upload.flux-css';

// Definieer een union type dat rekening houdt met beide manieren waarop Dropzone kan worden geëxporteerd
type DropzoneType =
    | (new (container: string | HTMLElement, options?: any) => DropzoneInstance)
    | { default: new (container: string | HTMLElement, options?: any) => DropzoneInstance };

// Converteer de geïmporteerde module naar onze union type
const Dropzone = DropzoneImport as DropzoneType;

/**
 * valideert of dropzone bij 1 van de bestanden een error heeft
 */
const dropzoneValidator: Validator = {
    key: 'customError',
    message: 'Something went wrong when adding a file',
    isValid(_instance: VlUploadComponent): boolean {
        let hasDropzoneError = false;
        _instance.getFiles().forEach((file) => {
            if (file.status === 'error') {
                hasDropzoneError = true;
            }
        });
        return !hasDropzoneError;
    },
};

@webComponent('vl-upload')
export class VlUploadComponent extends FormControl {
    static formControlValidators = [...FormControl.formControlValidators, dropzoneValidator];
    // Properties
    uploadProgressFn: ((file: DropzoneFile, progress: number, bytesSent: number) => void) | undefined;
    // Attributes
    private readonly = uploadDefaults.readonly;
    private acceptedFiles = uploadDefaults.acceptedFiles;
    private autoProcess = uploadDefaults.autoProcess;
    private disallowDuplicates = uploadDefaults.disallowDuplicates;
    private errorMessageAcceptedFiles = uploadDefaults.errorMessageAcceptedFiles;
    private errorMessageFilesize = uploadDefaults.errorMessageFilesize;
    private errorMessageMaxFiles = uploadDefaults.errorMessageMaxFiles;
    private maxFiles = uploadDefaults.maxFiles;
    private maxSize = uploadDefaults.maxSize;
    private subTitle = uploadDefaults.subTitle;
    private mainTitle = uploadDefaults.mainTitle;
    private url = uploadDefaults.url;
    private parallelUploads = uploadDefaults.parallelUploads;
    // State
    private value: FormValue = null;
    private multiple = false; // Wordt gebruikt in form.util om aan te duiden dat dit een multiple form control is.
    // Variables
    private dropzoneInstance: DropzoneInstance | undefined | null;
    private isDropzoneInitialised = false;
    private dispatchInput = false;

    static get styles(): CSSResult[] {
        return [resetStyle, baseStyle, linkStyle, uploadStyle, vlUploadFluxStyles, iconStyle, accessibilityStyle];
    }

    static get properties(): PropertyDeclarations {
        return {
            type: { type: String },
            acceptedFiles: { type: String, attribute: 'accepted-files' },
            autoProcess: { type: Boolean, attribute: 'auto-process' },
            disallowDuplicates: { type: Boolean, attribute: 'disallow-duplicates' },
            errorMessageAcceptedFiles: { type: String, attribute: 'error-message-accepted-files' },
            errorMessageFilesize: { type: String, attribute: 'error-message-filesize' },
            errorMessageMaxFiles: { type: String, attribute: 'error-message-max-files' },
            maxFiles: { type: Number, attribute: 'max-files' },
            maxSize: { type: Number, attribute: 'max-size' },
            parallelUploads: { type: Number, attribute: 'parallel-uploads' },
            subTitle: { type: String, attribute: 'sub-title' },
            mainTitle: { type: String, attribute: 'main-title' },
            url: { type: String },
            readonly: { type: Boolean },
            value: { type: Object, state: true },
            multiple: { type: Boolean, reflect: true },
            dropzoneInstance: { type: Object, state: true },
            uploadProgressFn: { type: Function },
        };
    }

    get validationTarget(): HTMLInputElement | undefined | null {
        return this.shadowRoot?.querySelector('input');
    }

    firstUpdated(changedProperties: Map<string, unknown>) {
        super.firstUpdated(changedProperties);

        this.setupDropzone();
    }

    updated(changedProperties: Map<string, unknown>) {
        super.updated(changedProperties);

        if (changedProperties.has('value')) {
            this.setValue(this.value);
        }

        if (changedProperties.has('dropzoneInstance')) {
            if (this.dropzoneInstance && !this.isDropzoneInitialised) {
                this.initializeComponent();
                this.dispatchEvent(new CustomEvent('vl-initialised', { composed: true, bubbles: true }));
                this.isDropzoneInitialised = true;
            }
        }

        if (changedProperties.has('disabled')) {
            const input = this.getInput();

            if (this.disabled) {
                this.dropzoneInstance?.hiddenFileInput?.setAttribute('disabled', 'true');
                this.getUploadButton()?.setAttribute('disabled', 'true');
                this.dropzoneInstance?.disable();
            } else {
                this.dropzoneInstance?.hiddenFileInput?.removeAttribute('disabled');
                this.getUploadButton()?.removeAttribute('disabled');
                this.dropzoneInstance?.enable();
            }
            if (input) input.disabled = this.disabled;
        }

        if (changedProperties.has('required')) {
            this.updateInputForAttribute('required');
        }

        if (changedProperties.has('readonly')) {
            const input = this.getInput();

            this.updateInputForAttribute('readonly');
            if (!this.disabled) {
                const dropzoneInstance = this.dropzoneInstance as DropzoneInstance & {
                    setupEventListeners: () => void;
                    removeEventListeners: () => void;
                };
                if (this.readonly) {
                    dropzoneInstance?.disable();
                    dropzoneInstance.removeEventListeners();
                    input?.setAttribute('disabled', '');
                } else {
                    dropzoneInstance?.enable();
                    dropzoneInstance.setupEventListeners();
                    input?.removeAttribute('disabled');
                }
            }
        }

        if (changedProperties.has('name')) {
            this.updateInputForAttribute('name');
        }

        if (changedProperties.has('id')) {
            this.updateInputForAttribute('id');
            if (!this.name) {
                this.getInput()?.setAttribute('name', this.id);
            }
        }

        if (changedProperties.has('error')) {
            this.updateInputForAttribute('error');
        }

        if (changedProperties.has('isInvalid')) {
            this.updateInputForAttribute('isInvalid');
            if (this.isInvalid) {
                if (this.errorMessageText) {
                    this.getUploadButton()?.setAttribute('aria-description', this.errorMessageText);
                }
            } else {
                this.getUploadButton()?.removeAttribute('aria-description');
            }
        }

        if (changedProperties.has('success')) {
            this.updateInputForAttribute('success');
        }

        if (changedProperties.has('label')) {
            const input = this.getInput();

            // eslint-disable-line @typescript-eslint/no-unused-expressions
            this.label ? input?.setAttribute('aria-label', this.label) : input?.removeAttribute('aria-label');

            this.getUploadButton()?.setAttribute(
                'aria-label',
                (this.label ? this.label + ', ' : '') + (this.mainTitle ?? '')
            );
        }

        if (changedProperties.has('autoProcess')) {
            if (this.dropzoneInstance) this.dropzoneInstance.options.autoProcessQueue = this.autoProcess;
        }

        if (changedProperties.has('url')) {
            if (this.dropzoneInstance) this.dropzoneInstance.options.url = this.url;
        }

        if (changedProperties.has('maxSize')) {
            if (this.dropzoneInstance) this.dropzoneInstance.options.maxFilesize = this.maxSize;
        }

        if (changedProperties.has('maxFiles')) {
            if (this.dropzoneInstance) this.dropzoneInstance.options.maxFiles = this.maxFiles;
            this.multiple = this.maxFiles > 1;
        }
    }

    disconnectedCallback() {
        super.disconnectedCallback();

        this.removeDropzoneEvents();
        if (this.dropzoneInstance) {
            this.updateFileList(this.dropzoneInstance);
            this.dropzoneInstance.destroy();
        }
    }

    render(): TemplateResult {
        const uploadClasses = {
            'vl-upload': true,
            'vl-upload--disabled': this.disabled,
            'vl-upload--error': this.isInvalid || this.error,
            'vl-upload--success': this.success,
        };

        const dropzoneContainerClasses = {
            'dz-clickable': this.readonly,
            dropzone: true,
            'vl-upload__element__label': true,
        };

        // Als er meer dan 1 bestand getoond wordt, is het beter een lijst te tonen.
        // Dit verbetert toegankelijkheid voor gebruikers die een screenreader gebruiken
        // Echter, als er maar 1 bestand kan upgeload worden, dan is het beter geen lijst te gebruiken
        // omdat een lijst 4 extra onnodige stappen geeft in de screenreader
        const shouldShowPreviewList = this.maxFiles <= 1;

        return html`
            ${this.getUploadElementTemplate()}
            ${shouldShowPreviewList ? this.getPreviewTemplate() : this.getPreviewTemplateListItem()}
            <div class=${classMap(uploadClasses)}>
                <div class="vl-upload__element">
                    <div class="vl-upload__overlay">
                        <p class="vl-upload__overlay__text">
                            <span class="vl-link__icon vl-vi vl-vi-paperclip" aria-hidden="true"></span>
                        </p>
                    </div>
                    <div id="dropzone-container" class=${classMap(dropzoneContainerClasses)}></div>
                </div>
            </div>
            <div class="vl-upload__files">
                ${shouldShowPreviewList
                    ? html` <div class="vl-upload__files__container"></div>`
                    : html` <ul class="vl-upload__files__container"></ul>`}
                <div class="vl-upload__files__input__container"></div>
                <button class="vl-upload__files__close vl-link vl-link--icon" type="button">
                    <span class="vl-link__icon vl-vi vl-vi-trash" aria-hidden="true"></span>
                    Verwijder alle bestanden
                </button>
            </div>
        `;
    }

    resetFormControl() {
        super.resetFormControl();

        this.dropzoneInstance?.removeAllFiles();
    }

    focus() {
        this.getUploadButton()?.focus();
    }

    on(event: string, callback: (...args: unknown[]) => void) {
        if (this.dropzoneInstance) {
            this.dropzoneInstance.on(event, callback);
        } else {
            console.warn('[VlUploadComponent] Dropzone instance is nog niet geïnitialiseerd. ');
        }
    }

    off(event: string, callback: (...args: unknown[]) => void) {
        if (this.dropzoneInstance) {
            this.dropzoneInstance.off(event, callback);
        } else {
            console.warn('[VlUploadComponent] Dropzone instance is nog niet geïnitialiseerd. ');
        }
    }

    getFiles(): DropzoneFile[] {
        return this.dropzoneInstance?.getAcceptedFiles() || [];
    }

    /**
     * Handmatig bestand toevoegen aan de lijst van opgeladen bestanden zonder achterliggende upload
     */
    addFile(file: File) {
        if (this.dropzoneInstance) {
            if (this.autoProcess) {
                this.dropzoneInstance.options.autoProcessQueue = false;
            }
            this.dropzoneInstance.addFile(<DropzoneFile>file);
            this.dropzoneInstance.emit('complete', file);
            if (this.autoProcess) {
                this.dropzoneInstance.options.autoProcessQueue = true;
            }
        }
    }

    removeFile(file: File) {
        this.dropzoneInstance?.removeFile(<DropzoneFile>file);
    }

    removeAllFiles() {
        this.dropzoneInstance?.removeAllFiles();
    }

    /**
     * Handmatig de upload aanroepen. Indien een url gegeven is, laad op naar die url.
     */
    upload(url?: string) {
        if (this.dropzoneInstance) {
            if (url) {
                this.dropzoneInstance.options.url = url;
            }
            this.dropzoneInstance.processQueue();
        }
    }

    handleUploadProgress = (file: DropzoneFile) => {
        this.dispatchEvent(
            new CustomEvent('vl-upload-progress', {
                composed: true,
                bubbles: true,
                detail: { file, bytesSent: file.upload?.bytesSent, progress: file.upload?.progress },
            })
        );
    };

    private getUploadElement(): HTMLDivElement | undefined | null {
        return this.shadowRoot?.querySelector<HTMLDivElement>('.vl-upload');
    }

    private getInput(): HTMLInputElement | undefined | null {
        return this.shadowRoot?.querySelector<HTMLInputElement>('input');
    }

    private getUploadButton(): HTMLButtonElement | undefined | null {
        return this.shadowRoot?.querySelector<HTMLButtonElement>('.vl-upload__element__button');
    }

    private getFilesCloseButton(): HTMLButtonElement | undefined | null {
        return this.shadowRoot?.querySelector<HTMLButtonElement>('.vl-upload__files__close');
    }

    private getUploadElementTemplate(): TemplateResult {
        return html`
            <template id="uploadTemplate">
                <button type="button" class="vl-upload__element__button vl-link" aria-label="upload-button">
                    <i class="vl-vi vl-vi-paperclip" aria-hidden="true"></i>
                    <span class="vl-upload__element__button__container" id="title"></span>
                    <span class="vl-upload__element__button__container" id="slotted-title">
                        <slot name="title"></slot
                    ></span>
                </button>
                <small id="sub-title"></small>
                <small id="slotted-sub-title">
                    <slot name="sub-title"></slot>
                </small>
            </template>
        `;
    }

    private getPreviewTemplate(): TemplateResult {
        return html`
            <template id="previewTemplate">
                <div class="vl-upload__file">
                    <p class="vl-upload__file__name">
                        <span class="vl-upload__file__name__icon vl-vi vl-vi-document" aria-hidden="true"></span>
                        <span data-dz-name></span>
                        <span class="vl-upload__file__size"> (<span data-dz-size></span>) </span>
                    </p>
                    <div class="dz-error-message">
                        <span data-dz-errormessage></span>
                    </div>
                    <button type="button" class="vl-upload__file__close vl-link vl-link--icon" data-dz-remove>
                        <span class="vl-vi vl-vi-cross" aria-hidden="true"></span>
                    </button>
                </div>
            </template>
        `;
    }

    private getPreviewTemplateListItem(): TemplateResult {
        return html`
            <template id="previewTemplate">
                <li class="vl-upload__file">
                    <p class="vl-upload__file__name">
                        <span class="vl-upload__file__name__icon vl-vi vl-vi-document" aria-hidden="true"></span>
                        <span data-dz-name></span>
                        <span class="vl-upload__file__size"> (<span data-dz-size></span>) </span>
                    </p>
                    <div class="dz-error-message">
                        <span data-dz-errormessage></span>
                    </div>
                    <button type="button" class="vl-upload__file__close vl-link vl-link--icon" data-dz-remove>
                        <span class="vl-vi vl-vi-cross" aria-hidden="true"></span>
                    </button>
                </li>
            </template>
        `;
    }

    private updateInputForAttribute(attribute: string) {
        const attributeKey = attribute as unknown as keyof VlUploadComponent;
        // eslint-disable-line @typescript-eslint/no-unused-expressions
        this[attributeKey]
            ? this.getInput()?.setAttribute(
                  attribute,
                  typeof this[attributeKey] === 'boolean' ? '' : this[attributeKey]
              )
            : this.getInput()?.removeAttribute(attribute);
    }

    private async updateFileList(dropzone: DropzoneInstance, file?: DropzoneFile) {
        const fileList = this.shadowRoot?.querySelector(`.vl-upload__files`);

        if (dropzone.files.length) {
            fileList?.classList.add('vl-upload__files--has-files');

            if (this.disallowDuplicates) {
                if (file && this.dropzoneInstance) {
                    if (await this.detectDuplicate(this.dropzoneInstance.files, file)) {
                        this.dropzoneInstance.removeFile(file);
                        this.dispatchEvent(
                            new CustomEvent('vl-input', {
                                composed: true,
                                bubbles: true,
                                detail: { type: 'removedduplicatefile', file: file, value: this.value },
                            })
                        );
                    }
                }
            }
        } else {
            fileList?.classList.remove('vl-upload__files--has-files');
        }
    }

    private initializeComponent() {
        this.setupTitles();
        this.setupEventListeners();
        this.dropzoneInstance?.hiddenFileInput?.classList.add('vl-upload__element__input');
    }

    private setupDropzone() {
        const dropzoneContainer = this.shadowRoot?.querySelector<HTMLDivElement>('div#dropzone-container');
        const uploadTemplate = this.shadowRoot?.querySelector(`#uploadTemplate`) as HTMLTemplateElement;
        const previewTemplate = this.shadowRoot?.querySelector(`#previewTemplate`) as HTMLTemplateElement;

        const dropzoneOptions = {
            paramName: this.name,
            autoProcessQueue: this.autoProcess,
            maxFiles: this.maxFiles,
            maxFilesize: this.maxSize,
            parallelUploads: this.parallelUploads,
            acceptedFiles: this.acceptedFiles,
            createImageThumbnails: false,
            previewsContainer: this.shadowRoot?.querySelector<HTMLElement>('.vl-upload__files__container') || undefined,
            hiddenInputContainer:
                this.shadowRoot?.querySelector<HTMLElement>('.vl-upload__files__input__container') || undefined,
            dictDefaultMessage: uploadTemplate?.innerHTML,
            previewTemplate: previewTemplate?.innerHTML,
            url: this.url,
            dictFileTooBig: this.errorMessageFilesize,
            dictInvalidFileType: this.errorMessageAcceptedFiles,
            dictMaxFilesExceeded: this.errorMessageMaxFiles,
            dictResponseError: 'Er liep iets fout bij het uploaden.',
            dictRemoveFile: 'Verwijder bestand',
            dictCancelUpload: 'Annuleer upload',
            dictCancelUploadConfirmation: 'Ben je zeker dat je de upload wil annuleren?',
            chunking: true,
            ...(this.uploadProgressFn && { uploadprogress: this.uploadProgressFn }),
        };

        if (dropzoneContainer) {
            // afhankelijk van de configuratie van build tools, kan Dropzone geïnitialiseerd worden als named of als default export
            try {
                // Probeer eerst directe initialisatie
                if (typeof Dropzone === 'function') {
                    this.dropzoneInstance = new Dropzone(dropzoneContainer, dropzoneOptions);
                } else {
                    // Dropzone initialisatie met default export
                    this.dropzoneInstance = new Dropzone.default(dropzoneContainer, dropzoneOptions);
                }
                // eslint-disable-line @typescript-eslint/no-unused-vars
            } catch (error) {
                console.error('Dropzone initialisatie mislukt:', error);
            }
        }
    }

    private setupTitles() {
        // indien geen titel slots zijn toegevoegd; voeg manueel titel elementen toe aan relevante slots
        // op die manier kunnen we event listeners toevoegen op éénduidige manier
        if (!findNodesForSlot(this, 'sub-title').length) {
            const span = document.createElement('span');
            span.textContent = this.subTitle;
            span.slot = 'sub-title';
            this.appendChild(span);
        }
        if (!findNodesForSlot(this, 'main-title').length) {
            const span = document.createElement('span');
            span.textContent = this.mainTitle;
            span.slot = 'title';
            this.appendChild(span);
        }
    }

    private setupEventListeners() {
        this.getFilesCloseButton()?.addEventListener('click', this.handleFilesCloseButtonClick);
        // gezien slot content buiten de shadow dom valt, moeten event listeners hier toevoegen
        [...findNodesForSlot(this, 'sub-title'), ...findNodesForSlot(this, 'title')].forEach((node) => {
            node.addEventListener('click', this.handleTitleClick);
        });
        if (!this.dropzoneInstance) {
            return;
        }
        this.dropzoneInstance.on('addedfile', this.handleAddedFile);
        this.dropzoneInstance.on('removedfile', this.handleRemovedFile);
        this.dropzoneInstance.on('error', this.handleError);
        this.dropzoneInstance.on('success', this.handleSuccess);
        this.dropzoneInstance.on('complete', this.handleComplete);
        this.dropzoneInstance.on('queuecomplete', this.handleQueueComplete);
        this.dropzoneInstance.on('dragover', this.handleDragOver);
        this.dropzoneInstance.on('dragleave', this.handleDragLeave);
        this.dropzoneInstance.on('drop', this.handleDragLeave);
        this.dropzoneInstance.on('uploadprogress', this.handleUploadProgress);

        this.getInput()?.addEventListener('input', () => {
            this.dispatchInput = true;
        });
    }

    private removeDropzoneEvents() {
        this.getFilesCloseButton()?.removeEventListener('click', this.handleFilesCloseButtonClick);
        [...findNodesForSlot(this, 'sub-title'), ...findNodesForSlot(this, 'title')].forEach((node) => {
            node.removeEventListener('click', this.handleTitleClick);
        });
        if (!this.dropzoneInstance) {
            return;
        }
        this.dropzoneInstance.off('addedfile', this.handleAddedFile);
        this.dropzoneInstance.off('removedfile', this.handleRemovedFile);
        this.dropzoneInstance.off('error', this.handleError);
        this.dropzoneInstance.off('success', this.handleSuccess);
        this.dropzoneInstance.off('complete', this.handleComplete);
        this.dropzoneInstance.off('queuecomplete', this.handleQueueComplete);
        this.dropzoneInstance.off('dragover', this.handleDragOver);
        this.dropzoneInstance.off('dragleave', this.handleDragLeave);
        this.dropzoneInstance.off('drop', this.handleDragLeave);
        this.dropzoneInstance.off('uploadprogress', this.handleUploadProgress);
    }

    private updateValue(detail: { type: string; file?: DropzoneFile; value: FormValue }) {
        this.value = this.collectFormData();
        this.dispatchEvent(new CustomEvent('vl-change', { composed: true, bubbles: true, detail }));
        if (this.dispatchInput) {
            this.dispatchEvent(new CustomEvent('vl-input', { composed: true, bubbles: true, detail }));
            this.dispatchInput = false;
        }
        this.dispatchEventIfValid(detail);
    }

    /**
     * functie om FormData object te verzamelen op basis van de lijst met huidige bestanden
     * @private
     */
    private collectFormData(): FormData | FormValue {
        const name = this.name || this.id;
        return this.getFiles()?.length
            ? this.getFiles().reduce((formData: FormData, file, currentIndex) => {
                  // eslint-disable-line @typescript-eslint/no-unused-expressions
                  currentIndex ? formData.append(name, file, file.name) : formData.set(name, file, file.name);
                  return formData;
              }, new FormData())
            : null;
    }

    private handleAddedFile = async (file: DropzoneFile): Promise<void> => {
        await this.updateFileList(this.dropzoneInstance!, file);
        this.updateValue({ type: 'addedfile', file: file, value: this.value });
        this.dispatchEvent(
            new CustomEvent('vl-addedfile', {
                composed: true,
                bubbles: true,
                detail: { type: 'vl-addedfile', file, value: this.value },
            })
        );
    };

    private handleRemovedFile = async (file: DropzoneFile): Promise<void> => {
        await this.updateFileList(this.dropzoneInstance!);
        this.updateValue({ type: 'removedfile', file: file, value: this.value });
        this.dispatchEvent(
            new CustomEvent('vl-removedfile', {
                composed: true,
                bubbles: true,
                detail: { type: 'vl-removedfile', file, value: this.value },
            })
        );
    };

    private handleError = (file: DropzoneFile, errorMessage: string) => {
        this.dispatchEvent(
            new CustomEvent('vl-error', {
                composed: true,
                bubbles: true,
                detail: { type: 'vl-error', file, value: this.value, errorMessage },
            })
        );
    };

    private handleSuccess = (file: DropzoneFile, response: object | string) => {
        this.dispatchEvent(
            new CustomEvent('vl-success', {
                composed: true,
                bubbles: true,
                detail: { type: 'vl-success', file, value: this.value, response },
            })
        );
    };

    private handleComplete = (file: DropzoneFile) => {
        this.dispatchEvent(
            new CustomEvent('vl-complete', {
                composed: true,
                bubbles: true,
                detail: { type: 'vl-complete', file, value: this.value },
            })
        );
    };

    private handleQueueComplete = () => {
        this.dispatchEvent(
            new CustomEvent('vl-queuecomplete', {
                composed: true,
                bubbles: true,
                detail: { type: 'vl-queuecomplete', value: this.value },
            })
        );
    };

    private handleFilesCloseButtonClick = (event: Event) => {
        this.dropzoneInstance?.removeAllFiles();
        if (this.dropzoneInstance) this.updateFileList(this.dropzoneInstance);
        this.dispatchInput = true;
        event.preventDefault();
    };

    private handleTitleClick = () => {
        this.getInput()?.click();
    };

    private handleDragOver = () => {
        this.getUploadElement()?.classList.add('vl-upload--dragging');
    };

    private handleDragLeave = () => {
        this.getUploadElement()?.classList.remove('vl-upload--dragging');
    };

    /**
     * functie om te zien of hash al bestaat in lijst van fileHashes,
     * indien niet, wordt die in lijst van fileHashes toegevoegd
     * @private
     */
    private async areFileHashesEqual(fileA: File, fileB: File): Promise<boolean> {
        /**
         * deze functie zal de digest-methode gebruiken van de native Crypto API om een unieke hex-string te berekenen
         * het zal dezelfde hex-string retourneren ongeacht de file meta-data, maar op basis van de blob-gegevens zelf
         * @returns {Promise<string>}
         */
        async function getDigestHexString(arrayBuffer: ArrayBuffer): Promise<string> {
            const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer); // hash the message
            const hashArray = Array.from(new Uint8Array(hashBuffer)); // convert buffer to byte array
            return hashArray.map((b) => b.toString(16).padStart(2, '0')).join(''); // convert bytes to hex string
        }

        async function getFileHash(file: File) {
            const arrayBuffer = await file.arrayBuffer();
            return await getDigestHexString(arrayBuffer);
        }

        const fileHashA = await getFileHash(fileA);
        const fileHashB = await getFileHash(fileB);

        return fileHashA === fileHashB;
    }

    private async detectDuplicate(files: File[], fileToCheck: File): Promise<boolean> {
        if (files) {
            const filesLength = files.length;
            const ref = files.slice();

            for (let i = 0; i < filesLength - 1; i++) {
                if (ref[i] && fileToCheck) {
                    // bestandsinhoud vergelijken van het nieuw bestand en 1 van de reeds gekozen bestanden
                    const hasSameFileContent = await this.areFileHashesEqual(ref[i], fileToCheck);
                    if ((ref[i].name === fileToCheck.name && ref[i].size === fileToCheck.size) || hasSameFileContent) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-upload': VlUploadComponent;
    }
}
