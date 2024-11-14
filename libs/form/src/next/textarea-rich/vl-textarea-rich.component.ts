import { webComponent } from '@domg-wc/common-utilities';
import { CSSResult, PropertyDeclarations } from 'lit';
import tinymce, { Editor } from 'tinymce-next';
import { VlTextareaComponent } from '../textarea/vl-textarea.component';
import textareaRichUigStyle from './vl-textarea-rich.component.uig-css';
import { textareaRichDefaults } from './vl-textarea-rich.defaults';

@webComponent('vl-textarea-rich-next')
export class VlTextareaRichComponent extends VlTextareaComponent {
    // Attributes
    private toolbar = textareaRichDefaults.toolbar;
    private plugins = textareaRichDefaults.plugins;
    private preview = textareaRichDefaults.preview;

    // Properties
    private customConfig = textareaRichDefaults.customConfig;

    // Variables
    private editor: Editor | null = null;

    static get styles(): CSSResult[] {
        return [...VlTextareaComponent.styles, textareaRichUigStyle];
    }

    static get properties(): PropertyDeclarations {
        return {
            toolbar: { type: String },
            plugins: { type: String },
            preview: { type: Boolean },
            customConfig: { type: Object },
        };
    }

    constructor() {
        super();

        if (!this.id) {
            // Zet id als deze nog niet bestaat zodat TinyMCE een uniek id heeft
            this.id = tinymce.DOM.uniqueId();
        }
    }

    firstUpdated(changedProperties: Map<string, unknown>) {
        super.firstUpdated(changedProperties);

        this.initTinyMCE().then(() => {
            // TinyMCE stelt aria-hidden in op true, maar dit is problematisch voor screenreaders
            this.removeAttribute('aria-hidden');
        });
    }

    updated(changedProperties: Map<string, unknown>) {
        super.updated(changedProperties);

        if (changedProperties.has('success')) {
            this.setEditorSuccess();
        }

        if (changedProperties.has('error')) {
            this.setEditorError();
        }

        if (changedProperties.has('readonly')) {
            this.setEditorReadonly();
        }

        if (changedProperties.has('disabled')) {
            this.setEditorDisabled();
        }

        if (changedProperties.has('preview')) {
            this.setEditorPreview();
        }

        if (changedProperties.has('value')) {
            if (this.editor?.getContent() !== this.value) {
                this.editor?.setContent(this.value);
            }
        }

        if (changedProperties.has('isInvalid')) {
            this.editor?.getBody()?.classList?.toggle('error', this.isInvalid || this.error);
        }
    }

    disconnectedCallback() {
        super.disconnectedCallback();

        this.editor?.mode?.set('readonly');
        this.editor?.destroy();
    }

    resetFormControl() {
        super.resetFormControl();

        this.editor?.setContent(this.initialValue);
    }

    focus() {
        this.editor?.focus();
    }

    private async initTinyMCE() {
        await tinymce.init({
            target: this.validationTarget as HTMLElement,
            suffix: '.min',
            language: 'nl_BE',
            base_url: 'https://cdn.omgeving.vlaanderen.be/domg/tinymce/6.8.3',
            toolbar: this.toolbar,
            menubar: false,
            elementpath: false,
            branding: false,
            content_css: 'https://cdn.omgeving.vlaanderen.be/domg/govflanders-style/14.1.0/custom/tinymce.css',
            // Niet zeker of dit nodig is, behouden voor de zekerheid.
            verify_html: false,
            body_class: 'vl-typography',
            plugins: this.plugins,
            formats: {
                bold: { inline: 'b' },
                italic: { inline: 'i' },
                underline: { inline: 'u' },
                strikethrough: { inline: 's' },
            },
            // Link plugin configuratie
            link_title: false,
            link_target_list: false,
            link_default_target: '_blank',
            // Custom TinyMCE configuratie
            ...this.customConfig,
        });

        this.editor = tinymce.get(this.id) as Editor | null;

        this.editor?.on('input change redo undo', () => {
            this.value = this.editor?.getContent() || '';
        });

        // Fix voor Link plugin die niet het eerste input veld focus geeft
        this.editor?.on('ExecCommand', (e) => {
            if (e.command === 'mceLink') {
                setTimeout(() => {
                    const firstInputField = this.shadowRoot?.querySelector(
                        '.tox-dialog input.tox-textfield'
                    ) as HTMLInputElement | null;
                    firstInputField?.focus();
                }, 0);
            }
        });

        this.setEditorSuccess();
        this.setEditorError();
        this.setEditorReadonly();
        this.setEditorDisabled();
        this.setEditorPreview();
    }

    private setEditorSuccess() {
        this.editor?.getBody()?.classList?.toggle('success', this.success);
    }

    private setEditorError() {
        this.editor?.getBody()?.classList?.toggle('error', this.error);
    }

    private setEditorReadonly() {
        const shouldDisableEditor = this.shouldDisableEditor();

        this.editor?.mode?.set(shouldDisableEditor ? 'readonly' : 'design');
    }

    private setEditorDisabled() {
        const shouldDisableEditor = this.shouldDisableEditor();

        this.editor?.mode?.set(shouldDisableEditor ? 'readonly' : 'design');
        this.editor?.getBody()?.classList?.toggle('vl-textarea--disabled', this.disabled);
    }

    private setEditorPreview() {
        const shouldDisableEditor = this.shouldDisableEditor();

        this.editor?.mode.set(shouldDisableEditor ? 'readonly' : 'design');
        this.editor?.getContainer()?.querySelector('.tox-editor-header')?.classList.toggle('hidden', this.preview);
    }

    private shouldDisableEditor() {
        return this.readonly || this.disabled || this.preview;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-textarea-rich-next': VlTextareaRichComponent;
    }
}
