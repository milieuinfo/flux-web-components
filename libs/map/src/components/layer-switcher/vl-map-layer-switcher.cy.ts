import { registerWebComponents } from '@domg-wc/common';
import { html } from 'lit';
import { VlMap } from '../../vl-map';
import { VlMapTiledWmsLayer } from '../layer/wms-layer/vl-map-tiled-wms-layer/vl-map-tiled-wms-layer';
import { VlMapWmsStyle } from '../layer/wms-layer/vl-map-wms-style/vl-map-wms-style';
import { VlMapWmtsLayer } from '../layer/wmts-layer/vl-map-wmts-layer';
import { VlMapLayerSwitcher } from './vl-map-layer-switcher';

registerWebComponents([VlMap, VlMapLayerSwitcher, VlMapWmsStyle, VlMapTiledWmsLayer, VlMapWmtsLayer]);

const mapWithLayerSwitcherFixture = html`
    <vl-map lambert2008>
        <vl-map-layer-switcher></vl-map-layer-switcher>
    </vl-map>
`;

describe('cypress-component - map - vl-map-layer-switcher', () => {
    it('het is-layer attribuut wordt synchroon gezet bij het toevoegen van wms en wmts lagen via code', () => {
        cy.mount(mapWithLayerSwitcherFixture);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            cy.wrap(vlMap.ready).then(() => {
                const wmtsLayer = document.createElement('vl-map-wmts-layer') as VlMapWmtsLayer;
                wmtsLayer.setAttribute('url', 'http://dummy/wmts');
                wmtsLayer.setAttribute('layer', 'grb_sel');
                wmtsLayer.setAttribute('name', 'WMTS Laag');
                vlMap.appendChild(wmtsLayer);
                expect(wmtsLayer.hasAttribute('is-layer')).to.be.true;

                const wmsLayer = document.createElement('vl-map-tiled-wms-layer') as VlMapTiledWmsLayer;
                wmsLayer.setAttribute('url', 'http://dummy/wms');
                wmsLayer.setAttribute('layers', 'layer1');
                wmsLayer.setAttribute('name', 'WMS Laag');
                vlMap.appendChild(wmsLayer);
                expect(wmsLayer.hasAttribute('is-layer')).to.be.true;
            });
        });
    });

    it('wms en wmts lagen die via code worden toegevoegd worden allebei opgenomen in de layerswitcher', () => {
        cy.mount(mapWithLayerSwitcherFixture);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            cy.wrap(vlMap.ready).then(() => {
                const switcher = vlMap.querySelector('vl-map-layer-switcher') as VlMapLayerSwitcher;

                const wmtsLayer = document.createElement('vl-map-wmts-layer') as VlMapWmtsLayer;
                wmtsLayer.setAttribute('url', 'http://dummy/wmts');
                wmtsLayer.setAttribute('layer', 'grb_sel');
                wmtsLayer.setAttribute('name', 'WMTS Laag');
                vlMap.appendChild(wmtsLayer);

                const wmsLayer = document.createElement('vl-map-tiled-wms-layer') as VlMapTiledWmsLayer;
                wmsLayer.setAttribute('url', 'http://dummy/wms');
                wmsLayer.setAttribute('layers', 'layer1');
                wmsLayer.setAttribute('name', 'WMS Laag');
                vlMap.appendChild(wmsLayer);

                cy.wait(0).then(() => {
                    expect((switcher as any).vlMapLayers).to.have.lengthOf(2);
                });
            });
        });
    });
});
