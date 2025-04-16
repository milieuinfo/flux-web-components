import { BaseElementOfType, webComponent } from '@domg-wc/common';

@webComponent('vl-map-overview-map')
export class VlMapOverviewMap extends BaseElementOfType(HTMLElement) {
    connectedCallback() {
        super.connectedCallback();

        this._configureMap();
    }

    get _map() {
        if (this.parentNode) {
            return this.parentNode.map;
        }
    }

    _configureMap() {
        (async () => {
            while (!(this._map && this._map.overviewMapControl)) {
                await new Promise((resolve) => setTimeout(resolve, 100));
            }
            this._map.addControl(this._map.overviewMapControl);
        })();
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-map-overview-map': VlMapOverviewMap;
    }
}
