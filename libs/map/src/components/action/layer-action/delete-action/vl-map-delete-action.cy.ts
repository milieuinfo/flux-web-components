import { registerWebComponents } from '@domg-wc/common';
import { html } from 'lit';
import OlFeature from 'ol/Feature';
import { VlMap } from '../../../../vl-map';
import { VlMapLayerStyle } from '../../../layer-style/vl-map-layer-style';
import { VlMapFeaturesLayer } from '../../../layer/vector-layer/vl-map-features-layer/vl-map-features-layer';
import { VlTestCustomMapDeleteAction } from './test-custom-map-delete-action';
import { VlMapDeleteAction } from './vl-map-delete-action';

registerWebComponents([VlMap, VlMapFeaturesLayer, VlMapLayerStyle, VlMapDeleteAction, VlTestCustomMapDeleteAction]);

const mapDeleteActionFixture = html`
    <vl-map>
        <vl-map-features-layer>
            <vl-map-delete-action></vl-map-delete-action>
        </vl-map-features-layer>
    </vl-map>
`;

const mapDeleteActionFixtureCustomStijl = html`
    <vl-map>
        <vl-map-features-layer>
            <vl-map-delete-action>
                <vl-map-layer-style
                    data-vl-text-color="#000"
                    data-vl-color="#FFE615"
                    data-vl-border-color="#FFE615"
                ></vl-map-layer-style>
            </vl-map-delete-action>
        </vl-map-features-layer>
    </vl-map>
`;

const customMapDeleteActionFixture = html`
    <vl-map>
        <vl-map-features-layer>
            <vl-custom-map-delete-action></vl-custom-map-delete-action>
        </vl-map-features-layer>
    </vl-map>
`;

describe('vl-map-delete-action', () => {
    it('a delete action is a map action', () => {
        expect(VlMapDeleteAction.isVlMapAction()).to.be.true;
    });

    it('the filter for the delete action returns true by default', () => {
        cy.mount(mapDeleteActionFixture);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            cy.wrap(vlMap.ready).then(() => {
                expect(vlMap.map.actions[0].filter()).to.be.true;
            });
        });
    });

    it('delete action configuration is possible', () => {
        cy.mount(mapDeleteActionFixture);
        cy.runTestFor2<VlMap, VlMapFeaturesLayer>('vl-map', 'vl-map-features-layer', (vlMap, vlMapFeaturesLayer) => {
            cy.wrap(vlMap.ready).then(() => {
                const action = vlMap.map.actions[0];
                expect(action.layer).to.deep.equal(vlMapFeaturesLayer.layer);
                expect(action.style.getFill().getColor()).to.equal('rgba(241, 174, 174, 0.26)');
            });
        });
    });

    it('a custom style can be set', () => {
        cy.mount(mapDeleteActionFixtureCustomStijl);
        cy.runTestFor3<VlMap, VlMapLayerStyle, VlMapFeaturesLayer>(
            'vl-map',
            'vl-map-layer-style',
            'vl-map-features-layer',
            (vlMap, vlMapLayerStyle, vlMapFeaturesLayer) => {
                cy.wrap(vlMap.ready).then(() => {
                    const deleteAction = vlMap.map.actions[0] as any;
                    expect(deleteAction.layer).to.deep.equal(vlMapFeaturesLayer.layer);
                    expect(deleteAction.style.getFill().getColor()).to.equal('rgba(241, 174, 174, 0.26)');
                });
            }
        );
    });

    it('after the delete action is finished, the onDelete callback will be called', () => {
        cy.mount(mapDeleteActionFixture);
        cy.runTestFor2<VlMap, VlMapDeleteAction>('vl-map', 'vl-map-delete-action', (vlMap, vlMapDeleteAction) => {
            cy.wrap(vlMap.ready).then(() => {
                let featureDeleted = false;
                vlMapDeleteAction.onDelete(() => {
                    featureDeleted = true;
                });
                (vlMapDeleteAction.action as any).hoverInteraction.getFeatures().push(new OlFeature({}));
                (vlMapDeleteAction.action as any).dragBoxInteraction.dispatchEvent('boxend');
                expect(featureDeleted).to.be.true;
            });
        });
    });

    it('after the delete action is finished, the features will be deleted', () => {
        cy.mount(mapDeleteActionFixture);
        cy.runTestFor2<VlMap, VlMapDeleteAction>('vl-map', 'vl-map-delete-action', (vlMap, vlMapDeleteAction) => {
            cy.wrap(vlMap.ready).then(() => {
                const removeFeatureStub = cy.stub();
                const hasFeatureStub = cy.stub();
                cy.stub(vlMapDeleteAction.layer, 'getSource').callsFake(() => ({
                    removeFeature: removeFeatureStub,
                    hasFeature: hasFeatureStub,
                    getState: () => {},
                }));
                const feature = new OlFeature({});
                expect((vlMapDeleteAction.action as any).hoverInteraction.getFeatures().getLength()).to.equal(0);
                (vlMapDeleteAction.action as any).hoverInteraction.getFeatures().push(feature);
                expect((vlMapDeleteAction.action as any).hoverInteraction.getFeatures().getLength()).to.equal(1);
                (vlMapDeleteAction.action as any).dragBoxInteraction.dispatchEvent('boxend');
                expect((vlMapDeleteAction.action as any).hoverInteraction.getFeatures().getLength()).to.equal(0);
                expect(removeFeatureStub).to.be.calledOnce;
                expect(removeFeatureStub.args[0][0]).to.deep.equal(feature);
            });
        });
    });

    it("after the delete action is finished, the onDelete callback will be called and the arguments can be used to ensure some features are deleted and others aren't", () => {
        cy.mount(mapDeleteActionFixture);
        cy.runTestFor2<VlMap, VlMapDeleteAction>('vl-map', 'vl-map-delete-action', (vlMap, vlMapDeleteAction) => {
            cy.wrap(vlMap.ready).then(() => {
                const removeFeatureStub = cy.stub();
                const hasFeatureStub = cy.stub();
                const teVerwijderenFeature = new OlFeature({ toRemove: true });
                teVerwijderenFeature.setId('teVerwijderen');
                const nietTeVerwijderenFeature = new OlFeature({ toRemove: false });
                nietTeVerwijderenFeature.setId('teVerwijderen');
                cy.stub(vlMapDeleteAction.layer, 'getSource').callsFake(() => ({
                    removeFeature: removeFeatureStub,
                    hasFeature: hasFeatureStub,
                    getState: () => {},
                    getFeatureById: (id) => (id === 'teVerwijderen' ? teVerwijderenFeature : teVerwijderenFeature),
                }));
                vlMapDeleteAction.onDelete((features, resolve, reject) => {
                    features.forEach((feature) => {
                        if (feature.getProperties().toRemove) {
                            resolve(feature);
                        } else {
                            reject();
                        }
                    });
                });
                (vlMapDeleteAction.action as any).hoverInteraction.getFeatures().push(teVerwijderenFeature);
                (vlMapDeleteAction.action as any).hoverInteraction.getFeatures().push(nietTeVerwijderenFeature);
                expect((vlMapDeleteAction.action as any).hoverInteraction.getFeatures().getLength()).to.equal(2);
                (vlMapDeleteAction.action as any).dragBoxInteraction.dispatchEvent('boxend');
                // deze test is ok gemigreerd maar lijkt me fout geweest te zijn
                //  -> er zou 1 layer over moeten blijven
                //  -> zie VlDeleteAction op lijn 41
                expect((vlMapDeleteAction.action as any).hoverInteraction.getFeatures().getLength()).to.equal(0);
                expect(removeFeatureStub).to.be.calledOnce;
                expect(removeFeatureStub.args[0][0]).to.deep.equal(teVerwijderenFeature);
            });
        });
    });

    it('the filter for the delete action can be overridden', () => {
        cy.mount(customMapDeleteActionFixture);
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
