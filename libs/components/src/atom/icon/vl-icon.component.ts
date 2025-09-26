import { BaseLitElement, webComponent } from '@domg-wc/common';
import { CSSResult, html, PropertyDeclarations, TemplateResult } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { vlIconStyles } from '../icon-style/vl-icon-style.css';
import { vlIconWebComponentStyles } from './vl-icon.css';
import { iconDefaults } from './vl-icon.defaults';

@webComponent('vl-icon')
export class VlIconComponent extends BaseLitElement {
    private icon = iconDefaults.icon;
    private small = iconDefaults.small;
    private large = iconDefaults.large;
    private light = iconDefaults.light;
    private rightMargin = iconDefaults.rightMargin;
    private leftMargin = iconDefaults.leftMargin;
    private clickable = iconDefaults.clickable;
    private label = iconDefaults.label;

    static get styles(): CSSResult[] {
        return [vlIconStyles, vlIconWebComponentStyles];
    }

    static get properties(): PropertyDeclarations {
        return {
            icon: { type: String },
            small: { type: Boolean },
            large: { type: Boolean },
            light: { type: Boolean },
            rightMargin: { type: Boolean, attribute: 'right-margin' },
            leftMargin: { type: Boolean, attribute: 'left-margin' },
            clickable: { type: Boolean },
            label: { type: String },
        };
    }

    connectedCallback(): void {
        super.connectedCallback();
        if (this.clickable) {
            console.warn(
                'Deprecated: `<vl-icon clickable>`: De `clickable` property is deprecated wegens niet WCAG-compliant. Gebruik in de plaats een `vl-button` of `vl-link` met een icon.'
            );
        }
    }

    render(): TemplateResult {
        const classes = {
            'vl-icon': true,
            [`vl-icon--${this.icon}`]: true,
            'vl-icon--small': this.small,
            'vl-icon--large': this.large,
            'vl-icon--light': this.light,
            'vl-icon--right-margin': this.rightMargin,
            'vl-icon--left-margin': this.leftMargin,
            'vl-icon--clickable': this.clickable,
        };

        return html`
            <span
                class=${classMap(classes)}
                tabindex=${ifDefined(this.clickable ? '0' : undefined)}
                aria-label=${ifDefined(this.label ? this.label : undefined)}
                aria-hidden=${ifDefined(this.label ? undefined : 'true')}
                part="icon"
            ></span>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-icon': VlIconComponent;
    }
}
