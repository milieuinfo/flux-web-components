import { BaseLitElement, registerWebComponents } from '@domg-wc/common';
import { vlLayoutStyles } from '@domg-wc/styles';
import { html, PropertyDeclarations, TemplateResult } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { customElement } from 'lit/decorators.js';
import { when } from 'lit/directives/when.js';
import { vlTextStyles } from '../../atom/text/vl-text.css';
import { uploadProgressDefaults } from './vl-upload-progress.defaults';
import { vlUploadProgressStyles } from './vl-upload-progress.flux-css';

import { VlButtonComponent, VlIconComponent, VlTextComponent } from '@domg-wc/components/atom';
import { VlProgressBarComponent } from '@domg-wc/components/block';

registerWebComponents([VlIconComponent, VlButtonComponent, VlProgressBarComponent, VlTextComponent]);

@customElement('vl-upload-progress')
export class VlUploadProgressComponent extends BaseLitElement {
    private progress = uploadProgressDefaults.progress;
    private label = uploadProgressDefaults.label;
    private fileName = uploadProgressDefaults.filename;
    private fileSize = uploadProgressDefaults.filesize;
    private indeterminate = uploadProgressDefaults.indeterminate;
    private retryable = uploadProgressDefaults.retryable;
    private cancellable = uploadProgressDefaults.cancellable;
    private error = uploadProgressDefaults.error;
    private success = uploadProgressDefaults.success;
    private message = uploadProgressDefaults.message;
    private hideProgress = uploadProgressDefaults.hideProgress;

    static get styles() {
        return [vlLayoutStyles, vlUploadProgressStyles, vlTextStyles];
    }

    static get properties(): PropertyDeclarations {
        return {
            label: {
                type: String,
                attribute: 'label',
            },
            progress: {
                type: Number,
                attribute: 'progress',
                reflect: true,
            },
            fileName: {
                type: String,
                attribute: 'filename',
            },
            fileSize: {
                type: String,
                attribute: 'filesize',
            },
            indeterminate: {
                type: Boolean,
                attribute: 'indeterminate',
                reflect: true,
            },
            retryable: {
                type: Boolean,
                attribute: 'retryable',
                reflect: true,
            },
            cancellable: {
                type: Boolean,
                attribute: 'cancellable',
                reflect: true,
            },
            error: {
                type: Boolean,
                attribute: 'error',
                reflect: true,
            },
            success: {
                type: Boolean,
                attribute: 'success',
                reflect: true,
            },
            message: {
                type: String,
                attribute: 'message',
            },
            hideProgress: {
                type: Boolean,
                attribute: 'hide-progress',
                reflect: true,
            },
        };
    }

    private handleRetry(): void {
        this.dispatchEvent(
            new CustomEvent('vl-upload-progress-retry', {
                bubbles: true,
                detail: {
                    filename: this.fileName,
                    target: this,
                },
                composed: true,
            })
        );
    }

    private handleCancel(): void {
        this.dispatchEvent(
            new CustomEvent('vl-upload-progress-cancel', {
                bubbles: true,
                detail: {
                    filename: this.fileName,
                    target: this,
                },
                composed: true,
            })
        );
    }

    render(): TemplateResult {
        const classes = {
            'vl-upload-progress': true,
            'vl-upload-progress--error': this.error,
            'vl-upload-progress--success': this.success,
        };
        return html`
            <div class=${classMap(classes)}>
                <div class="vl-group vl-group--space-between">
                    <div class="vl-group">
                        <span id="label" class="vl-text vl-text--bold ${!this.label ? 'vl-visually-hidden' : ''}">
                            ${this.label || `Bestand`}
                        </span>
                        <vl-icon
                            icon=${this.error ? 'alert-triangle' : this.success ? 'check-circle' : 'file'}
                            light
                        ></vl-icon>
                        <span class="vl-upload-progress__filename">${this.fileName}</span>
                        ${when(
                            !!this.fileSize,
                            () => html`<span class="vl-upload-progress__filesize">(${this.fileSize})</span>`
                        )}
                    </div>
                    <div class="vl-upload-progress__actions vl-group">
                        ${when(
                            this.retryable === true,
                            () =>
                                html`<vl-button
                                    id="retry-button"
                                    ghost
                                    icon="text-redo"
                                    label="Opnieuw proberen"
                                    @click=${this.handleRetry}
                                ></vl-button>`
                        )}
                        ${when(
                            this.cancellable === true,
                            () =>
                                html`<vl-button
                                    id="cancel-button"
                                    ghost
                                    icon="close"
                                    label="Annuleren"
                                    @click=${this.handleCancel}
                                ></vl-button>`
                        )}
                    </div>
                </div>
                ${when(
                    !!this.message,
                    () =>
                        html` <vl-text id="message" ?error=${this.error} ?success=${this.success} bold small
                            >${this.message}</vl-text
                        >`
                )}
                ${when(
                    !this.hideProgress,
                    () => html`<vl-progress-bar
                        class="vl-padding vl-padding--small"
                        value=${this.progress}
                        ?indeterminate=${this.indeterminate}
                        ?error=${this.error}
                        ?success=${this.success}
                        label="Upload voortgang"
                    ></vl-progress-bar>`
                )}
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-upload-progress': VlUploadProgressComponent;
    }
}
