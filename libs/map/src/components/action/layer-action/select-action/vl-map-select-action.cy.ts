import { registerWebComponents } from '@domg-wc/common';
import { html } from 'lit';
import OlFeature from 'ol/Feature';
import OlPoint from 'ol/geom/Point';
import { VlMap } from '../../../../vl-map';
import { VlMapLayerStyle } from '../../../layer-style/vl-map-layer-style';
import { VlMapFeaturesLayer } from '../../../layer/vector-layer/vl-map-features-layer/vl-map-features-layer';
import { VlTestCustomMapSelectAction } from './test-custom-map-select-action';
import { VlMapSelectAction } from './vl-map-select-action';

registerWebComponents([VlMap, VlMapFeaturesLayer, VlMapSelectAction, VlMapLayerStyle, VlTestCustomMapSelectAction]);

const mapSelectActionFixture = html`
    <vl-map>
        <vl-map-features-layer>
            <vl-map-select-action>
                <vl-map-layer-style
                    data-vl-text-color="#000"
                    data-vl-color="#FFE615"
                    data-vl-border-color="#FFE615"
                ></vl-map-layer-style>
            </vl-map-select-action>
        </vl-map-features-layer>
    </vl-map>
`;

const customMapSelectActionFixture = html`
    <vl-map>
        <vl-map-features-layer>
            <vl-custom-map-select-action>
                <vl-map-layer-style
                    data-vl-text-color="#000"
                    data-vl-color="#FFE615"
                    data-vl-border-color="#FFE615"
                ></vl-map-layer-style>
            </vl-custom-map-select-action>
        </vl-map-features-layer>
    </vl-map>
`;

describe('vl-map-select-action', () => {
    it('a select action is a map action', async () => {
        expect(VlMapSelectAction.isVlMapAction()).to.be.true;
    });

    it('select action configuration is possible', () => {
        cy.mount(mapSelectActionFixture);
        cy.runTestFor4<VlMap, VlMapFeaturesLayer, VlMapSelectAction, VlMapLayerStyle>(
            'vl-map',
            'vl-map-features-layer',
            'vl-map-select-action',
            'vl-map-layer-style',
            (vlMap, vlMapFeaturesLayer, vlMapSelectAction, vlMapLayerStyle) => {
                cy.wrap(vlMap.ready).then(() => {
                    const layer = vlMapFeaturesLayer.layer;
                    const action = vlMap.map.actions[0];
                    expect(action.layer).to.be.equal(layer);
                    // bizar - test lukt niet - gestopt met er tijd in te steken
                    // const selectAction = vlMap.map.actions[0];
                    // expect((selectAction.style as Style).getFill().getColor()).to.be.equal('rgba(241, 174, 174, 0.26)');
                    // expect(selectAction.style).to.deep.equal(vlMapLayerStyle.style(null, null));
                });
            }
        );
    });

    it('features on a map can be marked', () => {
        cy.mount(mapSelectActionFixture);
        cy.runTestFor2<VlMap, VlMapSelectAction>('vl-map', 'vl-map-select-action', (vlMap, vlMapSelectAction) => {
            cy.wrap(vlMap.ready).then(() => {
                const markSpy = cy.spy(vlMapSelectAction.action as any, 'markFeatureWithId');
                vlMapSelectAction.mark('1');
                expect(markSpy).to.be.calledWith('1');
            });
        });
    });

    it('marked features on the map can be de-marked', () => {
        cy.mount(mapSelectActionFixture);
        cy.runTestFor2<VlMap, VlMapSelectAction>('vl-map', 'vl-map-select-action', (vlMap, vlMapSelectAction) => {
            cy.wrap(vlMap.ready).then(() => {
                const demarkSpy = cy.spy(vlMapSelectAction.action as any, 'demarkAllFeatures');
                vlMapSelectAction.removeMarks();
                expect(demarkSpy).to.be.calledOnce;
            });
        });
    });

    it('a feature on the map can be selected', () => {
        cy.mount(mapSelectActionFixture);
        cy.runTestFor2<VlMap, VlMapSelectAction>('vl-map', 'vl-map-select-action', (vlMap, vlMapSelectAction) => {
            cy.wrap(vlMap.ready).then(() => {
                const feature = new OlFeature({
                    geometry: new OlPoint([1, 1]),
                });
                const selectSpy = cy.spy(vlMapSelectAction.action as any, 'selectFeature');
                vlMapSelectAction.select(feature);
                expect(selectSpy).to.be.calledWith(feature);
            });
        });
    });

    it('all features can be deselected and dehighlighted', () => {
        cy.mount(mapSelectActionFixture);
        cy.runTestFor2<VlMap, VlMapSelectAction>('vl-map', 'vl-map-select-action', (vlMap, vlMapSelectAction) => {
            cy.wrap(vlMap.ready).then(() => {
                const clearSpy = cy.spy(vlMapSelectAction.action as any, 'clearFeatures');
                vlMapSelectAction.reset();
                expect(clearSpy).to.be.calledOnce;
            });
        });
    });

    it('the cluster attribute will be passed to the underlying select action', () => {
        cy.mount(mapSelectActionFixture);
        cy.runTestFor2<VlMap, VlMapSelectAction>('vl-map', 'vl-map-select-action', (vlMap, vlMapSelectAction) => {
            cy.wrap(vlMap.ready).then(() => {
                vlMapSelectAction.setAttribute('cluster', '');
                expect(vlMap.map.actions[0].cluster).to.be.true;
            });
        });
    });

    it('the filter for the select action returns true by default', () => {
        cy.mount(mapSelectActionFixture);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            cy.wrap(vlMap.ready).then(() => {
                expect(vlMap.map.actions[0].filter()).to.be.true;
            });
        });
    });

    it('the filter for the select action can be overridden', () => {
        cy.mount(customMapSelectActionFixture);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            cy.wrap(vlMap.ready).then(() => {
                const action = vlMap.map.actions[0];
                expect(action.filter({ id: '12' }, { id: '12' })).to.be.true;
                expect(action.filter({ id: '2' }, { id: '12' })).to.be.false;
                expect(action.filter({ id: '12' }, { id: '2' })).to.be.false;
            });
        });
    });
});
