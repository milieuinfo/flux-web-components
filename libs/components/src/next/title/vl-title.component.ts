import { BaseLitElement, webComponent } from '@domg-wc/common-utilities';
import { globalStylesNext } from '@domg-wc/common-utilities/css';
import { CSSResult, PropertyDeclarations } from 'lit';
import { html } from 'lit-element';
import { choose } from 'lit/directives/choose.js';
import { classMap } from 'lit/directives/class-map.js';
import titleStyle from './vl-title.css';
import { titleDefaults } from './vl-title.defaults';

@globalStylesNext()
@webComponent('vl-title-next')
export class VlTitleComponent extends BaseLitElement {
    private type = titleDefaults.type;
    private underline = titleDefaults.underline;
    private noSpaceBottom = titleDefaults.noSpaceBottom;
    private alt = titleDefaults.alt;

    static get styles(): (CSSResult | CSSResult[])[] {
        return [titleStyle];
    }

    static get properties(): PropertyDeclarations {
        return {
            type: { type: String },
            underline: { type: Boolean },
            noSpaceBottom: { type: Boolean, attribute: 'no-space-bottom' },
            alt: { type: Boolean },
        };
    }

    render() {
        const classes = {
            underline: this.underline,
            'no-space-bottom': this.noSpaceBottom,
            alt: this.alt,
        };
        return html`
            ${choose(
                this.type,
                [
                    [
                        'h1',
                        () => html` <h1 class=${classMap(classes)}>
                            <slot></slot>
                        </h1>`,
                    ],
                    [
                        'h2',
                        () => html` <h2 class=${classMap(classes)}>
                            <slot></slot>
                        </h2>`,
                    ],
                    [
                        'h3',
                        () => html` <h3 class=${classMap(classes)}>
                            <slot></slot>
                        </h3>`,
                    ],
                    [
                        'h4',
                        () => html` <h4 class=${classMap(classes)}>
                            <slot></slot>
                        </h4>`,
                    ],
                    [
                        'h5',
                        () => html` <h5 class=${classMap(classes)}>
                            <slot></slot>
                        </h5>`,
                    ],
                    [
                        'h6',
                        () => html` <h6 class=${classMap(classes)}>
                            <slot></slot>
                        </h6>`,
                    ],
                ],
                () => html` <h1 class=${classMap(classes)}>
                    <slot></slot>
                </h1>`
            )}
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-title-next': VlTitleComponent;
    }
}
