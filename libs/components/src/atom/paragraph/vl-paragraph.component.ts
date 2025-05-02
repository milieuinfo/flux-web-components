import { BaseLitElement, webComponent } from '@domg-wc/common';
import { CSSResult, html, PropertyDeclarations, TemplateResult } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { vlParagraphStyles } from '../paragraph-style/vl-paragraph.css';
import { paragraphDefaults } from './vl-paragraph.defaults';

@webComponent('vl-paragraph')
export class VlParagraphComponent extends BaseLitElement {
    private bold = paragraphDefaults.bold;
    private introduction = paragraphDefaults.introduction;

    static get styles(): CSSResult[] {
        return [vlParagraphStyles];
    }

    static get properties(): PropertyDeclarations {
        return {
            bold: { type: Boolean },
            introduction: { type: Boolean },
        };
    }

    render(): TemplateResult {
        const classes = {
            bold: this.bold,
            introduction: this.introduction,
        };
        return html`
            <p class=${classMap(classes)}>
                <slot></slot>
            </p>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-paragraph': VlParagraphComponent;
    }
}
