import { registerWebComponents } from '@domg-wc/common';
import { html } from 'lit';
import { VlMap } from '../../../../vl-map';
import { VlMapXYZWmsLayer } from './vl-map-xyz-wms-layer';

registerWebComponents([VlMap, VlMapXYZWmsLayer]);

const xyzWmsLayerFixture = html`
    <vl-map>
        <vl-map-xyz-wms-layer url="http://dummy/{z}/{x}/{y}" name="dummy"></vl-map-xyz-wms-layer>
    </vl-map>
`;

describe('component vl-map-xyz-wms', () => {
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
