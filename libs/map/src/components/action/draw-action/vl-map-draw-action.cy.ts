import { registerWebComponents } from '@domg-wc/common';
import { html } from 'lit';
import { VlMap } from '../../../vl-map';
import { VlMapFeaturesLayer } from '../../layer/vector-layer/vl-map-features-layer/vl-map-features-layer';
import { VlMapDrawLineAction } from './draw-line-action/vl-map-draw-line-action';
import { VlMapDrawPointAction } from './draw-point-action/vl-map-draw-point-action';
import { VlMapDrawPolygonAction } from './draw-polygon-action/vl-map-draw-polygon-action';
import { VlMapDrawAction } from './vl-map-draw-action';

registerWebComponents([VlMap, VlMapFeaturesLayer, VlMapDrawPointAction, VlMapDrawLineAction, VlMapDrawPolygonAction]);

const mapDrawActionsFixture = html`
    <vl-map>
        <vl-map-features-layer id="line-layer">
            <vl-map-draw-point-action id="draw-point-action"></vl-map-draw-point-action>
            <vl-map-draw-line-action id="draw-line-action"></vl-map-draw-line-action>
            <vl-map-draw-polygon-action id="draw-polygon-action"></vl-map-draw-polygon-action>
        </vl-map-features-layer>
    </vl-map>
`;

describe('vl-map', () => {
    it('after the draw action is completed, the callback will be called with the feature as the first argument and a reject callback as the second argument', () => {
        cy.mount(mapDrawActionsFixture);
        for (let type of ['point', 'line', 'polygon']) {
            cy.get(`vl-map-draw-${type}-action`);
            cy.runTestFor2<VlMap, VlMapDrawAction>('vl-map', `vl-map-draw-${type}-action`, (vlMap, vlMapDrawAction) => {
                cy.wrap(vlMap.ready).then(() => {
                    let featureDrawn = false;
                    vlMapDrawAction.onDraw((feature, rejectCallback) => {
                        assert.equal(feature, 'getekendeFeature');
                        assert.isFunction(rejectCallback);
                        featureDrawn = true;
                    });
                    (vlMapDrawAction.action as any).drawInteraction.dispatchEvent({
                        type: 'drawend',
                        feature: 'getekendeFeature',
                    });
                    expect(featureDrawn).to.equal(true);
                });
            });
        }
    });
});
