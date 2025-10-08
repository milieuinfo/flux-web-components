import { registerWebComponents } from '@domg-wc/common';
import { html } from 'lit';
import { VlMap } from '../../../../vl-map';
import { VlMapXYZWmsLayer } from './vl-map-xyz-wms-layer';

registerWebComponents([VlMap, VlMapXYZWmsLayer]);

const xyzWmsLayerFixture = html`
    <vl-map lambert2008>
        <vl-map-xyz-wms-layer url="http://dummy/{z}/{x}/{y}" name="dummy"></vl-map-xyz-wms-layer>
    </vl-map>
`;

describe('cypress-component - map - vl-map-xyz-wms-layer', () => {
    it('should mount', () => {
        cy.mount(xyzWmsLayerFixture);
        cy.get('vl-map').shadow();
        cy.get('vl-map-xyz-wms-layer');
    });

    it('should be accessible', () => {
        cy.mount(xyzWmsLayerFixture);
        cy.injectAxe();
        cy.checkA11y('vl-map-xyz-wms-layer');
    });
});
