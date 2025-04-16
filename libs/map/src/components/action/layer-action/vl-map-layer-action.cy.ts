import { registerWebComponents } from '@domg-wc/common';
import { html } from 'lit';
import { VlMap } from '../../../vl-map';
import { VlMapFeaturesLayer } from '../../layer/vector-layer/vl-map-features-layer/vl-map-features-layer';
import { VlMapLayerAction } from './vl-map-layer-action';

registerWebComponents([VlMap, VlMapFeaturesLayer, VlMapLayerAction]);

describe('vl-map-layer-action', () => {
    let action;

    beforeEach(() => {
        action = {
            interactions: [],
            deactivate: cy.spy(),
            activate: cy.spy(),
        };
    });

    it('de actie wordt standaard gekoppeld aan de kaartlaag waarin gedeclareerd', () => {
        const createActionStub = cy.stub(VlMapLayerAction.prototype, '_createAction').returns(<any>action);
        cy.mount(html`
            <vl-map>
                <vl-map-features-layer>
                    <vl-map-layer-action></vl-map-layer-action>
                </vl-map-features-layer>
            </vl-map>
        `);
        cy.runTestFor2<VlMap, VlMapFeaturesLayer>('vl-map', 'vl-map-features-layer', (vlMap, vlMapFeaturesLayer) => {
            cy.wrap(vlMap.ready).then(() => {
                expect(vlMap._map.actions).to.have.lengthOf(1);
                expect(vlMap._map.actions[0]).to.deep.equal(action);
                expect(createActionStub).to.have.been.calledWith(vlMapFeaturesLayer.layer);
                expect(action.activate).to.not.have.been.called;
            });
        });
    });

    it('de actie kaartlaag koppeling kan gebeuren via een attribuut', () => {
        const createActionStub = cy.stub(VlMapLayerAction.prototype, '_createAction').returns(<any>action);
        cy.mount(html`
            <vl-map>
                <vl-map-features-layer data-vl-name="layer"></vl-map-features-layer>
                <vl-map-layer-action data-vl-layer="layer"></vl-map-layer-action>
            </vl-map>
        `);
        cy.runTestFor2<VlMap, VlMapFeaturesLayer>('vl-map', 'vl-map-features-layer', (vlMap, vlMapFeaturesLayer) => {
            cy.wrap(vlMap.ready).then(() => {
                expect(vlMap._map.actions).to.have.lengthOf(1);
                expect(vlMap._map.actions[0]).to.deep.equal(action);
                expect(createActionStub).to.have.been.calledWith(vlMapFeaturesLayer.layer);
            });
        });
    });

    it('de actie kaartlaag kan gezet worden zodat één actie voor meerdere kaartlagen gebruikt kan worden', () => {
        cy.stub(VlMapLayerAction.prototype, '_createAction').returns(<any>action);
        cy.mount(html`
            <vl-map>
                <vl-map-features-layer></vl-map-features-layer>
                <vl-map-layer-action></vl-map-layer-action>
            </vl-map>
        `);
        cy.runTestFor3<VlMap, VlMapFeaturesLayer, VlMapLayerAction>(
            'vl-map',
            'vl-map-features-layer',
            'vl-map-layer-action',
            (vlMap, vlMapFeaturesLayer, vlMapLayerAction) => {
                cy.wrap(vlMap.ready).then(() => {
                    expect(vlMap._map.actions).to.be.empty;
                    vlMapLayerAction.layer = vlMapFeaturesLayer.layer;
                    // wachten tot er een event loop cyclus gepasseerd is, de layer is dan aanwezig
                    cy.wait(0).then(() => {
                        expect(vlMap._map.actions).to.have.lengthOf(1);
                        expect(vlMap._map.actions[0]).to.deep.equal(action);
                    });
                });
            }
        );
    });
});
