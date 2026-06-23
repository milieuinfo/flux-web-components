import { findNodesForSlot, registerWebComponents, webComponent } from '@domg-wc/common';
import { VlIconComponent, vlLinkStyles } from '@domg-wc/components/atom';
import { vlLayoutStyles, vlResetStyles } from '@domg-wc/styles';
import { Validator } from '@open-wc/form-control';
import { FormValue } from '@open-wc/form-control/src/types';
import DropzoneImport from 'dropzone';
import { CSSResult, html, PropertyDeclarations, TemplateResult } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { vlTextStyles } from '../../atom/text/vl-text.css';
import { VlUploadProgressComponent } from '../../block/upload-progress';
import { DropzoneFile, Dropzone as DropzoneInstance } from '../dropzone-types';
import { FormControl } from '../form-control/form-control';
import { uploadDefaults } from './vl-upload.defaults';
import { vlUploadComponentStyles } from './vl-upload.component.css';

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

registerWebComponents([VlUploadProgressComponent, VlIconComponent]);

@webComponent('vl-upload')
export class VlUploadComponent extends FormControl {
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
    private chunking = uploadDefaults.chunking;

    // State
    private value: FormValue = null;
    private multiple = false; // Wordt gebruikt in form.util om aan te duiden dat dit een multiple form control is.

    // Variables
    private dropzoneInstance: DropzoneInstance | undefined | null;
    private isDropzoneInitialised = false;
    private dispatchInput = false;
    private isManualUploadInProgress = false;
    private isReprocessingRejectedFiles = false;

    // Properties
    uploadProgressFn: ((file: DropzoneFile, progress: number, bytesSent: number) => void) | undefined;

    static formControlValidators = [...FormControl.formControlValidators, dropzoneValidator];

    static get styles(): CSSResult[] {
        return [
            vlResetStyles,
            ...vlLayoutStyles,
            vlTextStyles,
            vlLinkStyles('.vl-upload__button'),
            vlLinkStyles('.vl-upload-files__remove-all'),
            vlUploadComponentStyles,
        ];
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
            chunking: { type: Boolean },
        };
    }

    firstUpdated(changedProperties: Map<string, unknown>) {
        super.firstUpdated(changedProperties);

        this.setupDropzone();
    }

    updated(changedProperties: Map<string, unknown>) {
        super.updated(changedProperties);

        if (changedProperties.has('value')) {
            this.setValue(this.value);
            this.dispatchEventIfValid({ value: this.value });
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
            this.shadowRoot?.querySelectorAll('vl-upload-progress').forEach((uploadProgressElement) => {
                if (this.autoProcess) uploadProgressElement?.removeAttribute('hide-progress');
                else uploadProgressElement?.setAttribute('hide-progress', '');
            });
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

        if (changedProperties.has('chunking')) {
            if (this.dropzoneInstance) this.dropzoneInstance.options.chunking = this.chunking;
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
            'vl-upload--readonly': this.readonly,
        };

        const dropzoneContainerClasses = {
            'dz-clickable': this.readonly,
            dropzone: true,
            'vl-upload__dropzone': true,
        };

        return html`
            ${this.getUploadElementTemplate()} ${this.getPreviewTemplate()}
            <div class=${classMap(uploadClasses)}>
                <div class="vl-upload__element">
                    <div class="vl-upload__overlay">
                        <div class="vl-upload__overlay-content">
                            <vl-icon icon="paperclip" aria-hidden="true"></vl-icon>
                        </div>
                    </div>
                    <div id="dropzone-container" class=${classMap(dropzoneContainerClasses)}></div>
                </div>
            </div>
            <div class="vl-upload-files" hidden>
                <ul class="vl-upload-files__list"></ul>
                <div id="input-container"></div>
                <button class="vl-upload-files__remove-all" type="button">
                    <vl-icon icon="trash" right-margin aria-hidden="true"></vl-icon>Verwijder alle bestanden
                </button>
            </div>
        `;
    }

    get validationTarget(): HTMLInputElement | undefined | null {
        return this.shadowRoot?.querySelector('input');
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

    getRejectedFiles(): DropzoneFile[] {
        return this.dropzoneInstance?.getRejectedFiles() || [];
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
            this.isManualUploadInProgress = true;
            this.dropzoneInstance.processQueue();
        }
    }

    private getUploadElement(): HTMLDivElement | undefined | null {
        return this.shadowRoot?.querySelector<HTMLDivElement>('.vl-upload');
    }

    private getInput(): HTMLInputElement | undefined | null {
        return this.shadowRoot?.querySelector<HTMLInputElement>('input');
    }

    private getUploadButton(): HTMLButtonElement | undefined | null {
        return this.shadowRoot?.querySelector<HTMLButtonElement>('.vl-upload__button');
    }

    private getFilesCloseButton(): HTMLButtonElement | undefined | null {
        return this.shadowRoot?.querySelector<HTMLButtonElement>('.vl-upload-files__remove-all');
    }

    private getFilesList(): HTMLUListElement | undefined | null {
        return this.shadowRoot?.querySelector<HTMLUListElement>('.vl-upload-files__list');
    }

    private getUploadElementTemplate(): TemplateResult {
        return html`
            <template id="uploadTemplate">
                <button type="button" class="vl-upload__button" aria-label="Upload knop">
                    <vl-icon icon="paperclip" small right-margin aria-hidden="true"></vl-icon>
                    <span id="title"></span>
                    <span id="slotted-title"> <slot name="title"></slot></span>
                </button>
                <div class="vl-text vl-text--annotation vl-text--small" id="sub-title"></div>
                <div class="vl-text vl-text--annotation vl-text--small" id="slotted-sub-title">
                    <slot name="sub-title"></slot>
                </div>
            </template>
        `;
    }

    private getPreviewTemplate(): TemplateResult {
        return html`
            <template id="previewTemplate">
                <li>
                    <vl-upload-progress cancellable hide-progress class="vl-padding vl-padding--small">
                        <span data-dz-size hidden></span>
                    </vl-upload-progress>
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
        const fileList = this.shadowRoot?.querySelector(`.vl-upload-files`);

        if (dropzone.files.length) {
            fileList?.removeAttribute('hidden');

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
            fileList?.setAttribute('hidden', '');
        }
    }

    private initializeComponent() {
        this.setupTitles();
        this.setupEventListeners();
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
            previewsContainer: this.shadowRoot?.querySelector<HTMLElement>('.vl-upload-files__list') || undefined,
            hiddenInputContainer: this.shadowRoot?.querySelector<HTMLElement>('#input-container') || undefined,
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
            chunking: this.chunking,
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
        this.dropzoneInstance.on('drop', this.handleDrop);
        this.dropzoneInstance.on('uploadprogress', this.handleUploadProgress);
        this.dropzoneInstance.on('processing', this.handleProcessing);

        this.getInput()?.addEventListener('input', () => {
            this.dispatchInput = true;
        });
    }

    handleUploadProgress = (file: DropzoneFile) => {
        const uploadProgressElement = file.previewElement?.querySelector('vl-upload-progress');
        if (uploadProgressElement) {
            uploadProgressElement.removeAttribute('error');
            uploadProgressElement.removeAttribute('message');
            if (file.upload?.progress !== undefined) {
                uploadProgressElement.removeAttribute('indeterminate');
                uploadProgressElement.setAttribute('progress', String(file.upload?.progress));
            } else {
                uploadProgressElement.removeAttribute('progress');
                uploadProgressElement.setAttribute('indeterminate', '');
            }
        }
        this.dispatchEvent(
            new CustomEvent('vl-upload-progress', {
                composed: true,
                bubbles: true,
                detail: { file, bytesSent: file.upload?.bytesSent, progress: file.upload?.progress },
            })
        );
    };

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
        this.dropzoneInstance.off('drop', this.handleDrop);
        this.dropzoneInstance.off('uploadprogress', this.handleUploadProgress);
        this.dropzoneInstance.off('processing', this.handleProcessing);
    }

    private updateValue(detail: { type: string; file?: DropzoneFile; value: FormValue }) {
        // Het zetten van this.value triggert updated(), waar setValue en (na hideFormMessages) de
        // vl-valid dispatch gebeuren. Zo blijft een gekoppelde state="valid" success-boodschap zichtbaar.
        this.value = this.collectFormData();
        this.dispatchEvent(new CustomEvent('vl-change', { composed: true, bubbles: true, detail }));
        if (this.dispatchInput) {
            this.dispatchEvent(new CustomEvent('vl-input', { composed: true, bubbles: true, detail }));
            this.dispatchInput = false;
        }
    }

    /**
     * functie om FormData object te verzamelen op basis van de lijst met huidige bestanden
     * @private
     */
    private collectFormData(): FormData | FormValue {
        const name = this.name || this.id;
        return this.getFiles()?.length
            ? this.getFiles().reduce((formData: FormData, file, currentIndex) => {
                  if (currentIndex) {
                      formData.append(name, file, file.name);
                  } else {
                      formData.set(name, file, file.name);
                  }
                  return formData;
              }, new FormData())
            : null;
    }

    private handleAddedFile = async (file: DropzoneFile): Promise<void> => {
        const uploadProgressElement = file.previewElement?.querySelector('vl-upload-progress');
        if (uploadProgressElement) {
            uploadProgressElement.setAttribute('filename', file.name);
            const sizeElement = file.previewElement?.querySelector('[data-dz-size]');
            if (sizeElement) {
                uploadProgressElement.setAttribute('filesize', sizeElement.textContent || '');
            }

            uploadProgressElement.addEventListener('vl-upload-progress-cancel', () => {
                this.dropzoneInstance?.removeFile(file);
            });

            uploadProgressElement.addEventListener('vl-upload-progress-retry', () => {
                this.dropzoneInstance?.uploadFile(file);
            });

            if (this.autoProcess) {
                uploadProgressElement.removeAttribute('hide-progress');
            }
        }

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
        if (this.isReprocessingRejectedFiles) {
            return;
        }

        if (file.status !== 'error') {
            const rejectedFiles = this.dropzoneInstance?.getRejectedFiles() ?? [];
            if (rejectedFiles.length > 0) {
                this.isReprocessingRejectedFiles = true;
                for (const rejectedFile of rejectedFiles) {
                    this.dropzoneInstance?.removeFile(rejectedFile);
                }
                for (const rejectedFile of rejectedFiles) {
                    this.dropzoneInstance?.addFile(rejectedFile);
                }
                this.isReprocessingRejectedFiles = false;
            }
        }

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
        const uploadProgressElement = file.previewElement?.querySelector('vl-upload-progress');
        if (uploadProgressElement) {
            uploadProgressElement.setAttribute('error', '');
            const isRetryableError = file.accepted;
            if (isRetryableError) {
                uploadProgressElement.setAttribute('retryable', '');
            }

            if (errorMessage) uploadProgressElement.setAttribute('message', errorMessage);
        }

        this.dispatchEvent(
            new CustomEvent('vl-error', {
                composed: true,
                bubbles: true,
                detail: { type: 'vl-error', file, value: this.value, errorMessage },
            })
        );
    };

    private handleSuccess = (file: DropzoneFile, response: object | string) => {
        const uploadProgressElement = file.previewElement?.querySelector('vl-upload-progress');
        if (uploadProgressElement) {
            uploadProgressElement.removeAttribute('error');
            uploadProgressElement.removeAttribute('message');
        }

        this.dispatchEvent(
            new CustomEvent('vl-success', {
                composed: true,
                bubbles: true,
                detail: { type: 'vl-success', file, value: this.value, response },
            })
        );
    };

    private handleComplete = (file: DropzoneFile) => {
        const uploadProgressElement = file.previewElement?.querySelector('vl-upload-progress');
        if (uploadProgressElement) {
            uploadProgressElement.removeAttribute('indeterminate');
            uploadProgressElement.setAttribute('progress', '100');
        }

        if (this.isManualUploadInProgress && this.dropzoneInstance?.getQueuedFiles().length) {
            this.dropzoneInstance.processQueue();
        }

        this.dispatchEvent(
            new CustomEvent('vl-complete', {
                composed: true,
                bubbles: true,
                detail: { type: 'vl-complete', file, value: this.value },
            })
        );
    };

    private handleProcessing = (file: DropzoneFile) => {
        const uploadProgressElement = file.previewElement?.querySelector('vl-upload-progress');
        if (uploadProgressElement) {
            uploadProgressElement.removeAttribute('error');
            uploadProgressElement.removeAttribute('message');
            uploadProgressElement.removeAttribute('progress');
            uploadProgressElement.setAttribute('indeterminate', '');
        }
    };

    private handleQueueComplete = () => {
        this.isManualUploadInProgress = false;
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
        this.dispatchInput = true;
    };

    private handleDragLeave = () => {
        this.getUploadElement()?.classList.remove('vl-upload--dragging');
        this.dispatchInput = false;
    };

    private handleDrop = () => {
        this.getUploadElement()?.classList.remove('vl-upload--dragging');
        this.dispatchInput = true;
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
