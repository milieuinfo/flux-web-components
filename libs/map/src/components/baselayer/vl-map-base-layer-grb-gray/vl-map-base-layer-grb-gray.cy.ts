import { registerWebComponents } from '@domg-wc/common';
import { html } from 'lit';
import { VlMap } from '../../../vl-map';
import { VlMapBaseLayerGRBGray } from './vl-map-base-layer-grb-gray';

registerWebComponents([VlMap, VlMapBaseLayerGRBGray]);

const baselayerGrbGrayFixture = html`
    <vl-map>
        <vl-map-baselayer-grb-gray></vl-map-baselayer-grb-gray>
    </vl-map>
`;

describe('vl-map-baselayer-grb-gray', () => {
    it('de grb basiskaartlaag wordt goed geconfigureerd', () => {
        cy.mount(baselayerGrbGrayFixture);
        cy.runTestFor<VlMapBaseLayerGRBGray>('vl-map-baselayer-grb-gray', (vlMapBaseLayerGRBGray) => {
            expect(vlMapBaseLayerGRBGray.url).to.be.equal('https://geo.api.vlaanderen.be/GRB/wmts');
            expect(vlMapBaseLayerGRBGray.type).to.be.equal('wmts');
            expect(vlMapBaseLayerGRBGray.layer).to.be.equal('grb_bsk_grijs');
            expect(vlMapBaseLayerGRBGray.title).to.be.equal('GRB basis laag grijs');
        });
    });
});
