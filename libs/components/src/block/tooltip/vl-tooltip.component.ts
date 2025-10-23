import { CSSResult, PropertyDeclarations } from 'lit';
import { html, TemplateResult } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map.js';
import { customElement } from 'lit/decorators.js';
import { FloatingControllerOptions } from '../popover/vl-floating-ui.controller';
import { VlPopoverComponent } from '../popover/vl-popover.component';
import { vlTooltipFluxStyles } from './vl-tooltip.flux-css';

@customElement('vl-tooltip')
export class VlTooltipComponent extends VlPopoverComponent {
    static get properties(): PropertyDeclarations {
        return {
            for: { type: String, attribute: 'for' },
            open: { type: Boolean, attribute: 'open', reflect: true },
            placement: { type: String, attribute: 'placement', reflect: true },
            distance: { type: Number, attribute: 'distance' },
            hideArrow: { type: Boolean, attribute: 'hide-arrow' },
            strategy: { type: String, attribute: 'strategy' },
        };
    }

    static get styles(): (CSSResult | CSSResult[])[] {
        return [...super.styles, vlTooltipFluxStyles];
    }

    constructor() {
        super();
        this.trigger = 'hover focus';
    }

    render(): TemplateResult {
        const classes = {
            'popover-content': true,
        };
        return html`
            <div class=${classMap(classes)} role="tooltip" aria-hidden="${!this.open}">
                <slot></slot>
                ${!this.hideArrow ? html`<i id="popover-arrow" part="arrow" role="presentation"></i>` : null}
            </div>
        `;
    }

    get popupOptions(): FloatingControllerOptions {
        const options = super.popupOptions;
        return {
            ...options,
            trigger: 'hover focus',
            tooltip: true,
            hideOnClick: false,
        };
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-tooltip': VlTooltipComponent;
    }
}
