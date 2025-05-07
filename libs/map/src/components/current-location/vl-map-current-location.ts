import { BaseLitElement } from '@domg-wc/common';
import { vlIconStyles } from '@domg-wc/components/atom';
import { css, html, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import proj4 from 'proj4';
import { DEFAULT_TOOLTIP, DEFAULT_ZOOM } from './vl-map-current-location.defaults';
import { vlMapCurrentLocationStyles } from './vl-map-current-location.flux-css';

@customElement('vl-map-current-location')
export class VlMapCurrentLocation extends BaseLitElement {
    private zoom: number;
    private tooltip: string;
    private _mapElement: any;

    constructor() {
        super();
        this.zoom = DEFAULT_ZOOM;
        this.tooltip = DEFAULT_TOOLTIP;
    }

    static get styles() {
        return [
            css`
                ${unsafeCSS(vlMapCurrentLocationStyles)}
            `,
            vlIconStyles,
        ];
    }

    static get properties() {
        return {
            zoom: {
                type: Number,
                attribute: 'zoom',
                reflect: true,
            },
            tooltip: {
                type: String,
                attribute: 'tooltip',
                reflect: true,
            },
        };
    }

    connectedCallback() {
        super.connectedCallback();
        this._mapElement = this.closest('vl-map');
    }

    _currentLocation() {
        navigator.geolocation.getCurrentPosition((position) => {
            const source = new proj4.Proj('EPSG:4326');
            const dest = new proj4.Proj(this._mapElement.map.projection.getCode());

            const point = new proj4.Point(position.coords.longitude, position.coords.latitude);
            const transformedPoint = proj4.transform(source, dest, point);

            this._mapElement.map.getView().setCenter([transformedPoint.x, transformedPoint.y]);
            this._mapElement.map.getView().setZoom(this.zoom);
        });
    }

    render() {
        return html` <div class="flux-map-current-location">
            <button @click=${() => this._currentLocation()} type="button" title="${this.tooltip}">
                <span class="vl-icon vl-icon--location-gps"></span>
            </button>
        </div>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-map-current-location': VlMapCurrentLocation;
    }
}
