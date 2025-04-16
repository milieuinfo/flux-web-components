import { registerWebComponents } from '@domg-wc/common';
import { html } from 'lit';
import { VlMap } from '../../../vl-map';
import { VlMapBaseLayerGRBOrtho } from './vl-map-base-layer-grb-ortho';

registerWebComponents([VlMap, VlMapBaseLayerGRBOrtho]);

const baselayerGrbOrthoFixture = html`
    <vl-map>
        <vl-map-baselayer-grb-ortho></vl-map-baselayer-grb-ortho>
    </vl-map>
`;

describe('vl-map-baselayer-grb-ortho', () => {
    it('de grb basiskaartlaag wordt goed geconfigureerd', () => {
        cy.mount(baselayerGrbOrthoFixture);
        cy.runTestFor<VlMapBaseLayerGRBOrtho>('vl-map-baselayer-grb-ortho', (vlMapBaseLayerGRBOrtho) => {
            expect(vlMapBaseLayerGRBOrtho.url).to.be.equal('https://geo.api.vlaanderen.be/OMWRGBMRVL/wmts');
            expect(vlMapBaseLayerGRBOrtho.type).to.be.equal('wmts');
            expect(vlMapBaseLayerGRBOrtho.layer).to.be.equal('omwrgbmrvl');
            expect(vlMapBaseLayerGRBOrtho.title).to.be.equal('GRB ortho laag');
        });
    });
});
