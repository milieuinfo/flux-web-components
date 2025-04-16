import { registerWebComponents } from '@domg-wc/common';
import { html } from 'lit';
import { VlMap } from '../../vl-map';
import { VlMapBaseLayer } from '../baselayer/vl-map-base-layer';
import { VlMapOverviewMap } from './vl-map-overview-map';

registerWebComponents([VlMap, VlMapBaseLayer, VlMapOverviewMap]);

const mapOverviewMapFixture = html`
    <vl-map>
        <vl-map-overview-map></vl-map-overview-map>
        <vl-map-baselayer
            data-vl-url="https://localhost"
            data-vl-layer="layername_1"
            data-vl-title="layer title 1"
        ></vl-map-baselayer>
    </vl-map>
`;

describe('vl-map-overview-map', () => {
    it('de overview map wordt goed geconfigureerd', () => {
        cy.mount(mapOverviewMapFixture);
        cy.runTestFor<VlMapOverviewMap>('vl-map-overview-map', (vlMapOverviewMap) => {
            const bevatOverviewMap = (map) => map.getControls().getArray().includes(map.overviewMapControl);
            expect(bevatOverviewMap(vlMapOverviewMap._map)).to.be.false;
            cy.waitUntil(() => !!bevatOverviewMap(vlMapOverviewMap._map)).then(
                () => expect(bevatOverviewMap(vlMapOverviewMap._map)).to.be.true
            );
        });
    });
});
