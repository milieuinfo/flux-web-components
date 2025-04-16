import { BaseLitElement, webComponent } from '@domg-wc/common';
import { CSSResult, html, PropertyDeclarations, TemplateResult } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { vlTextStyles } from './vl-text.css';
import { textDefaults } from './vl-text.defaults';

@webComponent('vl-text')
export class VlTextComponent extends BaseLitElement {
    private bold = textDefaults.bold;
    private italic = textDefaults.italic;
    private underline = textDefaults.underline;
    private success = textDefaults.success;
    private warning = textDefaults.warning;
    private error = textDefaults.error;
    private annotation = textDefaults.annotation;
    private small = textDefaults.small;

    static get styles(): CSSResult[] {
        return [vlTextStyles];
    }

    static get properties(): PropertyDeclarations {
        return {
            bold: { type: Boolean },
            italic: { type: Boolean },
            underline: { type: Boolean },
            success: { type: Boolean },
            warning: { type: Boolean },
            error: { type: Boolean },
            annotation: { type: Boolean },
            small: { type: Boolean },
        };
    }

    render(): TemplateResult {
        const classes = {
            'vl-text--bold': this.bold,
            'vl-text--italic': this.italic,
            'vl-text--underline': this.underline,
            'vl-text--success': this.success,
            'vl-text--warning': this.warning,
            'vl-text--error': this.error,
            'vl-text--annotation': this.annotation,
            'vl-text--small': this.small,
        };

        return html`
            <span class="vl-text ${classMap(classes)}">
                <slot></slot>
            </span>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-text': VlTextComponent;
    }
}
