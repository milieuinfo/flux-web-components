import { BaseLitElement, webComponent } from '@domg-wc/common-utilities';
import { globalStylesNext, vlIconStyles } from '@domg-wc/common-utilities/css';
import { CSSResult, html, nothing, PropertyDeclarations, TemplateResult } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { iconDefaults } from './vl-icon.defaults';

@globalStylesNext()
@webComponent('vl-icon-next')
export class VlIconComponent extends BaseLitElement {
    private icon = iconDefaults.icon;
    private small = iconDefaults.small;
    private large = iconDefaults.large;
    private light = iconDefaults.light;
    private rightMargin = iconDefaults.rightMargin;
    private leftMargin = iconDefaults.leftMargin;
    private clickable = iconDefaults.clickable;

    static get styles(): CSSResult[] {
        return [vlIconStyles];
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
        };
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

        return html`<span class=${classMap(classes)} tabindex=${this.clickable ? 0 : nothing}></span>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-icon-next': VlIconComponent;
    }
}
