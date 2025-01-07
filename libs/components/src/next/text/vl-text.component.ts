import { BaseLitElement, webComponent } from '@domg-wc/common-utilities';
import { CSSResult, html, PropertyDeclarations, TemplateResult } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { vlTextStyles } from './vl-text.css';
import { textDefaults } from './vl-text.defaults';

@webComponent('vl-text-next')
export class VlTextComponent extends BaseLitElement {
    private bold = textDefaults.bold;
    private italic = textDefaults.italic;
    private underline = textDefaults.underline;
    private success = textDefaults.success;
    private warning = textDefaults.warning;
    private error = textDefaults.error;

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
        };
    }

    render(): TemplateResult {
        const classes = {
            'vl-text-next--bold': this.bold,
            'vl-text-next--italic': this.italic,
            'vl-text-next--underline': this.underline,
            'vl-text-next--success': this.success,
            'vl-text-next--warning': this.warning,
            'vl-text-next--error': this.error,
        };

        return html`
            <span class="vl-text-next ${classMap(classes)}">
                <slot></slot>
            </span>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-text-next': VlTextComponent;
    }
}
