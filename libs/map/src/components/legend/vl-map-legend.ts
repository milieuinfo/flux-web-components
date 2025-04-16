import { css, html, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import { VlMap } from '../../vl-map';
import { VlMapWmsLayer } from '../layer/wms-layer/vl-map-wms-layer';
import { VlMapVectorLayer } from '../layer/vector-layer/vl-map-vector-layer';
import { VlMapWfsLayer } from '../layer/vector-layer/vl-map-wfs-layer/vl-map-wfs-layer';
import { VlMapLayerCircleStyle } from '../layer-style/vl-map-layer-circle-style/vl-map-layer-circle-style';
import { LEGEND_PLACEMENT } from './vl-map-legend.defaults';
import styles from './vl-map-legend.uig-css';
import { BaseLitElement } from '@domg-wc/common';
import { VlMapLayer } from '../layer/vl-map-layer';
import { VlMapLayerStyle } from '../layer-style/vl-map-layer-style';
import { VlMapFeaturesLayer } from '../layer/vector-layer/vl-map-features-layer/vl-map-features-layer';
import { VlMapLegendItem } from '../legend-item/vl-map-legend-item';

export interface Position {
    top: string;
    left: string;
    right: string;
    bottom: string;
}

export interface StyledItem {
    type: 'styled';
    name: string;
    style: VlMapLayerStyle;
    url?: never;
    iconText?: string;
}

export interface UrlItem {
    type: 'url';
    name: string;
    style?: never;
    url: URL;
}

export interface CustomItem {
    type: 'custom';
    name: string;
    iconText?: string;
    styleElement: HTMLElement;
}

export type Item = StyledItem | UrlItem | CustomItem;

export type GeometryLayer = VlMapWfsLayer | VlMapFeaturesLayer;

@customElement('vl-map-legend')
export class VlMapLegend extends BaseLitElement {
    top: string;
    left: string;
    right: string;
    bottom: string;
    layoutVertical: boolean;
    hideTitle: boolean;
    version: string;
    private placement: string;
    private mapElement: VlMap;
    private items: Item[] = [];
    private styledItems: StyledItem[] = [];
    private urlItems: UrlItem[] = [];
    private customItems: CustomItem[] = [];
    private observer: MutationObserver;

    static get styles() {
        return [
            css`
                ${unsafeCSS(styles)}
            `,
        ];
    }

    constructor() {
        super();
        this.placement = LEGEND_PLACEMENT.BOTTOM_RIGHT;
    }

    static get properties() {
        // TODO: Aligneer deze attributen (missen data-vl- prefix)
        return {
            left: { type: String, reflect: true },
            top: { type: String, reflect: true },
            right: { type: String, reflect: true },
            bottom: { type: String, reflect: true },
            layoutVertical: {
                type: Boolean,
                attribute: 'data-vl-layout-vertical',
                reflect: true,
            },
            placement: {
                type: String,
                attribute: 'data-vl-placement',
            },
            hideTitle: {
                type: Boolean,
                attribute: 'data-vl-hide-title',
            },
            version: {
                type: String,
                attribute: 'data-vl-version',
            },
        };
    }

    private getPosition(): Position {
        const position: Position = <Position>{};

        switch (this.placement) {
            case LEGEND_PLACEMENT.TOP_LEFT:
                position.top = '10px';
                position.left = '10px';
                position.right = undefined;
                position.bottom = undefined;
                break;
            case LEGEND_PLACEMENT.TOP_RIGHT:
                position.top = '10px';
                position.left = undefined;
                position.right = '10px';
                position.bottom = undefined;
                break;
            case LEGEND_PLACEMENT.BOTTOM_LEFT:
                position.top = undefined;
                position.left = '8px';
                position.right = undefined;
                position.bottom = '40px';
                break;
            case LEGEND_PLACEMENT.BOTTOM_RIGHT:
                position.top = undefined;
                position.left = undefined;
                position.right = '58px';
                position.bottom = '10px';
                break;
            default:
                break;
        }

        return {
            top: this.top ?? position.top,
            left: this.left ?? position.left,
            right: this.right ?? position.right,
            bottom: this.bottom ?? position.bottom,
        };
    }

    connectedCallback() {
        super.connectedCallback();
        this.mapElement = this.closest('vl-map') as VlMap;

        const imageLayers: VlMapWmsLayer[] = [].concat(this.mapElement.wmsLayers);
        const geometryLayers: GeometryLayer[] = [].concat(this.mapElement.featuresLayers, this.mapElement.wfsLayers);

        imageLayers.forEach((wmsLayer) => {
            wmsLayer &&
                this.urlItems.push({
                    type: 'url',
                    url: this.legendUrl(wmsLayer),
                    name: wmsLayer.dataset.vlName,
                });
        });

        this.customItems = this.customLegendItems();
        this.updateItems();

        geometryLayers.forEach((layer) => {
            layer.addEventListener(VlMapVectorLayer.EVENTS.styleChanged, () => {
                this.updateLegendGeometryItems(geometryLayers);
            });
        });

        this.initializeCustomLegendObserver();
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.observer.disconnect();
    }

    private initializeCustomLegendObserver() {
        this.observer = new MutationObserver(() => {
            this.customItems = this.customLegendItems();
            this.updateItems();
        });

        const config = {
            childList: true,
            subtree: true,
            attributes: true,
        };

        this.observer.observe(this, config);
    }

    private legendUrl(wmsLayer: VlMapWmsLayer) {
        const layerUrl = new URL(wmsLayer.dataset.vlUrl);
        const layout = this.layoutVertical ? 'layout:vertical' : 'layout:horizontal';
        const legendSearchParams = new URLSearchParams({
            service: 'WMS',
            request: 'GetLegendGraphic',
            format: 'image/png',
            layer: wmsLayer.dataset.vlLayers,
            legend_options: layout,
        });
        if (this.version) legendSearchParams.set('version', this.version);

        return new URL(`?${legendSearchParams}`, layerUrl);
    }

    private customLegendItems(): CustomItem[] {
        const childNodeList = Array.from(this.childNodes);
        const legendItemsList = childNodeList.filter((child) => child instanceof VlMapLegendItem);
        const legendItems: CustomItem[] = legendItemsList.map((item: VlMapLegendItem) => {
            return {
                type: 'custom',
                name: item.layer,
                iconText: item.iconText,
                styleElement: item.cloneNode(true) as VlMapLegendItem,
            };
        });
        return legendItems;
    }

    private updateLegendGeometryItems(layers: VlMapLayer[]) {
        let items: StyledItem[] = [];
        layers.forEach((layer) => {
            if (layer._styles.length === 1) {
                const style = layer._styles[0];

                if (style.name || (layer.name !== undefined && layer.name != null)) {
                    items.push({ type: 'styled', style: style, name: layer.name });
                }
            } else {
                items = items.concat(
                    ...(layer._styles
                        ?.filter((style) => style.name)
                        ?.map((style) => ({ type: 'styled', style: style, name: style.name })) || [])
                );
            }
        });

        this.styledItems = items;
        this.updateItems();
    }

    private updateItems() {
        const defaultItems: Item[] = [...this.styledItems, ...this.urlItems];
        const hasCustomLegendItems = this.customItems.length > 0;

        if (hasCustomLegendItems) {
            // build a custom map legend from the vl-map-legend-item elements in the vl-map-legend
            this.items = [];
            this.customItems.forEach((customItem) => {
                if (customItem.styleElement.children.length > 0) {
                    this.items.push(customItem);
                } else {
                    const layer = customItem.name;
                    const defaultItemForLayer = defaultItems.find((item) => item.name === layer);

                    if (defaultItemForLayer && defaultItemForLayer.type === 'styled') {
                        defaultItemForLayer.iconText = customItem.iconText;
                    }

                    this.items.push(defaultItemForLayer);
                }
            });
        } else {
            // use the default generated legend items
            this.items = defaultItems;
        }
        this.requestUpdate();
    }

    render() {
        const hasIconText = !!this.customItems?.find((item) => item.iconText);

        if (!this.items) {
            return null;
        }

        return html` <div
            class=${`uig-map-legend ${this.layoutVertical ? 'uig-map-legend--vertical' : ''}`}
            style="${this.generateItemStyle()}"
        >
            ${this.hideTitle
                ? ''
                : html` <div>
                      <span class="uig-map-legend-text uig-map-legend-title">Legende: </span>
                  </div>`}
            ${this.items.map((item) => {
                if (!item) return '';

                switch (item.type) {
                    case 'custom':
                        return html` ${item.styleElement} `;
                    case 'styled':
                        return html` <div class="uig-map-legend-item">
                            <div class="uig-map-legend-icon-container">
                                <div
                                    class="uig-map-legend-icon ${hasIconText ? 'uig-map-legend-icon-large' : ''}"
                                    style="${this.generateIconStyle(item.style)}"
                                >
                                    <div class="uig-map-legend-icon-text">${item.iconText}</div>
                                </div>
                            </div>
                            <span class="uig-map-legend-text">${item.name}</span>
                        </div>`;
                    case 'url':
                        return html` <div class="uig-map-legend-item uig-map-legend-image">
                            <img alt="map legend image" class="uig-map-legend-icon" src="${item.url}" />
                        </div>`;
                    default:
                        return '';
                }
            })}
        </div>`;
    }

    private generateItemStyle() {
        const position = this.getPosition();
        return (
            (position.left ? `;left:${position.left}` : '') +
            (position.top ? `;top:${position.top}` : '') +
            (position.right ? `;right:${position.right}` : '') +
            (position.bottom ? `;bottom:${position.bottom}` : '')
        );
    }

    private generateIconStyle(item) {
        let borderRadius = ``;
        if (item instanceof VlMapLayerCircleStyle) {
            borderRadius = 'border-radius: 50%;';
        }

        return `border: ${item.borderSize}px solid ${item.borderColor}; color:${item.textColor}; background-color:${item.color}; ${borderRadius}`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-map-legend': VlMapLegend;
    }
}
