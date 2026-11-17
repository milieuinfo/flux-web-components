import { BaseLitElement, webComponent } from '@domg-wc/common';
import { CSSResult, html, PropertyDeclarations } from 'lit';
import { choose } from 'lit/directives/choose.js';
import { classMap } from 'lit/directives/class-map.js';
import { vlTitleStyles } from './vl-title.css';
import { titleDefaults } from './vl-title.defaults';

const titleText = html`<span class="vl-title__text"><slot></slot></span>`;

@webComponent('vl-title')
export class VlTitleComponent extends BaseLitElement {
    private type = titleDefaults.type;
    private underline = titleDefaults.underline;
    private noSpaceBottom = titleDefaults.noSpaceBottom;
    private alt = titleDefaults.alt;
    private appearance = titleDefaults.appearance;

    static get styles(): (CSSResult | CSSResult[])[] {
        return [vlTitleStyles];
    }

    static get properties(): PropertyDeclarations {
        return {
            type: { type: String },
            underline: { type: Boolean },
            noSpaceBottom: { type: Boolean, attribute: 'no-space-bottom' },
            alt: { type: Boolean },
            appearance: { type: String },
        };
    }

    render() {
        const classes = {
            underline: this.underline,
            'no-space-bottom': this.noSpaceBottom,
            alt: this.alt,
            [this.appearance || this.type || 'h1']: true,
        };
        return html`
            ${choose(
                this.type,
                [
                    ['h1', () => html` <h1 class=${classMap(classes)} part="h1">${titleText}</h1>`],
                    ['h2', () => html` <h2 class=${classMap(classes)} part="h2">${titleText}</h2>`],
                    ['h3', () => html` <h3 class=${classMap(classes)} part="h3">${titleText}</h3>`],
                    ['h4', () => html` <h4 class=${classMap(classes)} part="h4">${titleText}</h4>`],
                    ['h5', () => html` <h5 class=${classMap(classes)} part="h5">${titleText}</h5>`],
                    ['h6', () => html` <h6 class=${classMap(classes)} part="h6">${titleText}</h6>`],
                ],
                () => html` <h1 class=${classMap(classes)} part="h1">${titleText}</h1>`,
            )}
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-title': VlTitleComponent;
    }
}
