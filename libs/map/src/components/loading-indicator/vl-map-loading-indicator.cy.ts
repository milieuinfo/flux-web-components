import { registerWebComponents } from '@domg-wc/common';
import { html } from 'lit';
import { MapEvent } from 'ol';
import { VlMap } from '../../vl-map';
import { VlMapBaseLayerGRBGray } from '../baselayer/vl-map-base-layer-grb-gray/vl-map-base-layer-grb-gray';
import { VlMapLoadingIndicator } from './vl-map-loading-indicator';

registerWebComponents([VlMap, VlMapLoadingIndicator, VlMapBaseLayerGRBGray]);

const loadingIndicatorFixture = html`
    <vl-map>
        <vl-map-baselayer-grb-gray></vl-map-baselayer-grb-gray>
        <vl-map-loading-indicator></vl-map-loading-indicator>
    </vl-map>
`;

describe('vl-map-loading-indicator', () => {
    it('when the map is loading, the loading animation is shown', () => {
        cy.mount(loadingIndicatorFixture);
        cy.runTestFor2<VlMap, VlMapLoadingIndicator>(
            'vl-map',
            'vl-map-loading-indicator',
            (vlMap, vlMapLoadingIndicator) => {
                vlMap.map.dispatchEvent(new MapEvent('loadstart', vlMap.map));
                expect(vlMapLoadingIndicator).to.have.class('loading');
                vlMap.map.dispatchEvent(new MapEvent('loadend', vlMap.map));
                expect(vlMapLoadingIndicator).to.not.have.class('loading');
            }
        );
    });
});
