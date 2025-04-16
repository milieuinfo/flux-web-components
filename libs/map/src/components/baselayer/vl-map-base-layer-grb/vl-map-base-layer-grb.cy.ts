import { registerWebComponents } from '@domg-wc/common';
import { html } from 'lit';
import { VlMap } from '../../../vl-map';
import { VlMapBaseLayerGRB } from './vl-map-base-layer-grb';

registerWebComponents([VlMap, VlMapBaseLayerGRB]);

const baselayerGrbFixture = html`
    <vl-map>
        <vl-map-baselayer-grb></vl-map-baselayer-grb>
    </vl-map>
`;

describe('vl-map-baselayer-grb', () => {
    it('de grb basiskaartlaag wordt goed geconfigureerd', () => {
        cy.mount(baselayerGrbFixture);
        cy.runTestFor<VlMapBaseLayerGRB>('vl-map-baselayer-grb', (vlMapBaseLayerGRB) => {
            expect(vlMapBaseLayerGRB.url).to.be.equal('https://geo.api.vlaanderen.be/GRB/wmts');
            expect(vlMapBaseLayerGRB.type).to.be.equal('wmts');
            expect(vlMapBaseLayerGRB.layer).to.be.equal('grb_bsk');
            expect(vlMapBaseLayerGRB.title).to.be.equal('GRB basis laag');
        });
    });
});
