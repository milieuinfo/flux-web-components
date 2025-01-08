import { BaseLitElement, webComponent } from '@domg-wc/common-utilities';
import { globalStylesNext } from '@domg-wc/common-utilities/css';
import { CSSResult, html, PropertyDeclarations, TemplateResult } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { vlTextStyles } from './vl-text.css';
import { textDefaults } from './vl-text.defaults';

@globalStylesNext()
@webComponent('vl-text-next')
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
            'vl-text-next--bold': this.bold,
            'vl-text-next--italic': this.italic,
            'vl-text-next--underline': this.underline,
            'vl-text-next--success': this.success,
            'vl-text-next--warning': this.warning,
            'vl-text-next--error': this.error,
            'vl-text-next--annotation': this.annotation,
            'vl-text-next--small': this.small,
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
