import { VlMap } from '../../../vl-map';
import { MapBrowserEvent } from 'ol';
import Overlay from 'ol/Overlay';
import { customElement } from 'lit/decorators.js';
import { VlMapClickActionPindrop } from './vl-map-click-action-pindrop';
import { VlMapClickedEvent } from './VlMapClickedEvent';
import { BaseLitElement } from '@domg-wc/common';

@customElement('vl-map-click-action')
export class VlMapClickAction extends BaseLitElement {
    private overlay: Overlay;
    private mapRef: VlMap | null;

    constructor() {
        super();
        this.overlay = new Overlay({
            element: new VlMapClickActionPindrop(),
            positioning: 'bottom-center',
            autoPan: { animation: { duration: 250 } },
        });

        this.mapRef = null;
    }

    connectedCallback() {
        super.connectedCallback();
        this.mapRef = this.closest('vl-map'); // Sla de map referentie op
        if (this.mapRef?.map) {
            this.mapRef.map.on('singleclick', this.handleClick);
        }
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        if (this.mapRef?.map) {
            this.mapRef.map.removeOverlay(this.overlay);
            this.mapRef.map.un('singleclick', this.handleClick);
        }
        this.mapRef = null; // Wis de map referentie
    }

    private handleClick = (evt: MapBrowserEvent<PointerEvent>): void => {
        if (!this.mapRef?.map) return;

        const doesOverlayAlreadyExist = this.mapRef.map.getOverlays().getArray().includes(this.overlay);

        this.overlay.setPosition(evt.coordinate);

        if (!doesOverlayAlreadyExist) {
            this.mapRef.map.addOverlay(this.overlay);
        }

        this.dispatchEvent(
            new VlMapClickedEvent(
                evt.coordinate,
                this.mapRef.map.getView().getResolution(),
                this.mapRef.map.getView().getProjection()
            )
        );
    };
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-map-click-action': VlMapClickAction;
    }
}
