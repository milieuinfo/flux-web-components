import { html, PropertyDeclarations, TemplateResult, CSSResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BaseLitElement } from '@domg-wc/common';
import legendStyles from '../legend/vl-map-legend.uig-css';
import legendItemStyles from './vl-map-legend-item.uig-css';

@customElement('vl-map-legend-item')
export class VlMapLegendItem extends BaseLitElement {
    icon = null;
    label = '';
    layer = '';
    iconText = '';
    iconTextColor = '';

    static get styles(): (CSSResult | CSSResult[])[] {
        return [legendStyles, legendItemStyles];
    }

    static get properties(): PropertyDeclarations {
        return {
            layer: { type: String, attribute: 'data-vl-layer' },
            iconText: { type: String, attribute: 'data-vl-icon-text' },
            iconTextColor: { type: String, attribute: 'data-vl-icon-text-color', reflect: true },
        };
    }

    protected render(): TemplateResult {
        return html`
            <div id="legend-item" class="uig-map-legend-item">
                <div class="uig-map-legend-icon-container">
                    ${this.icon}
                    <slot name="icon"></slot>
                </div>
                <span id="label" class="uig-map-legend-text">
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
