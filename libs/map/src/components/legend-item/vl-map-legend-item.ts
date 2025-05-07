import { BaseLitElement } from '@domg-wc/common';
import { CSSResult, html, PropertyDeclarations, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { vlMapLegendFluxStyles } from '../legend/vl-map-legend.flux-css';
import { vlMapLegendItemFluxStyles } from './vl-map-legend-item.flux-css';

@customElement('vl-map-legend-item')
export class VlMapLegendItem extends BaseLitElement {
    icon = null;
    label = '';
    layer = '';
    iconText = '';
    iconTextColor = '';

    static get styles(): (CSSResult | CSSResult[])[] {
        return [vlMapLegendFluxStyles, vlMapLegendItemFluxStyles];
    }

    static get properties(): PropertyDeclarations {
        return {
            layer: { type: String, attribute: 'layer' },
            iconText: { type: String, attribute: 'icon-text' },
            iconTextColor: { type: String, attribute: 'icon-text-color', reflect: true },
        };
    }

    protected render(): TemplateResult {
        return html`
            <div id="legend-item" class="flux-map-legend-item">
                <div class="flux-map-legend-icon-container">
                    ${this.icon}
                    <slot name="icon"></slot>
                </div>
                <span id="label" class="flux-map-legend-text">
                    ${this.label}
                    <slot name="label"></slot>
                </span>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-map-legend-item': VlMapLegendItem;
    }
}
