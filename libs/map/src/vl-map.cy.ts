import { registerWebComponents } from '@domg-wc/common';
import { html } from 'lit';
import OlFullScreenControl from 'ol/control/FullScreen';
import OlLayerGroup from 'ol/layer/Group';
import proj4 from 'proj4';
import { VlSelectAction } from './actions/select/select-action';
import { VlMapMeasureAction } from './components/action/draw-action/measure-action/vl-map-measure-action';
import { VlMapSelectAction } from './components/action/layer-action/select-action/vl-map-select-action';
import { VlMapMeasureControl } from './components/controls/measure-control/vl-map-measure-control';
import { VlMapActionControls } from './components/controls/vl-map-action-controls';
import { VlMapFeaturesLayer } from './components/layer/vector-layer/vl-map-features-layer/vl-map-features-layer';
import { OpenLayersUtil } from './utils/ol-util';
import { VlMap } from './vl-map';

registerWebComponents([
    VlMap,
    VlMapFeaturesLayer,
    VlMapSelectAction,
    VlMapMeasureAction,
    VlMapActionControls,
    VlMapMeasureControl,
]);

const mapFixture = html` <vl-map lambert2008></vl-map>`;
const mapFixtureWithoutLambert2008 = html` <vl-map></vl-map> `;

const mapFullscreenFixture = html` <vl-map allow-fullscreen lambert2008></vl-map>`;

const mapWithActionsFixture = html`
    <vl-map lambert2008>
        <vl-map-features-layer>
            <vl-map-select-action default-active></vl-map-select-action>
            <vl-map-measure-action></vl-map-measure-action>
        </vl-map-features-layer>
    </vl-map>
`;

const mapWithActionsAndMultipleLayersFixture = html`
    <vl-map lambert2008>
        <vl-map-features-layer>
            <vl-map-select-action default-active></vl-map-select-action>
        </vl-map-features-layer>
        <vl-map-features-layer>
            <vl-map-measure-action></vl-map-measure-action>
        </vl-map-features-layer>
    </vl-map>
`;

const mapWithActionsAndControlFixture = html`
    <vl-map lambert2008>
        <vl-map-action-controls>
            <vl-map-measure-control></vl-map-measure-control>
        </vl-map-action-controls>
        <vl-map-features-layer>
            <vl-map-select-action></vl-map-select-action>
            <vl-map-measure-action></vl-map-measure-action>
        </vl-map-features-layer>
    </vl-map>
`;

const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

describe('vl-map', () => {
    it('the Lambert 31370 projection is correctly defined', () => {
        // TODO: Remove this when the bug in proj4 is fixed
        cy.on('uncaught:exception', (err) => {
            if (err.message.includes(`Cannot read properties of undefined`)) {
                // return false to prevent the error from
                // failing this test
                return false;
            }
        });

        cy.spy(proj4, 'defs');
        cy.mount(mapFixture);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            expect(proj4.defs).to.be.calledWith(
                'EPSG:31370',
                '+proj=lcc +lat_1=51.16666723333333 +lat_2=49.8333339 +lat_0=90 +lon_0=4.367486666666666 +x_0=150000.013 +y_0=5400088.438 +ellps=intl +towgs84=-106.869,52.2978,-103.724,0.3366,-0.457,1.8422,-1.2747 +units=m +no_defs'
            );
        });
    });

    it('the extent contains Flanders', () => {
        cy.mount(mapFixture);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            const extent = vlMap._extent;
            expect(extent).to.be.lengthOf(4);
            expect(extent[0]).to.be.equal(500000);
            expect(extent[1]).to.be.equal(537856);
            expect(extent[2]).to.be.equal(762144);
            expect(extent[3]).to.be.equal(800000);
            expect(vlMap.map.getView().getCenter()).to.be.deep.equal([639845.7772538576, 700521.2187096793]);
        });
    });

    it('can request the map actions', () => {
        cy.mount(mapWithActionsAndControlFixture);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            cy.wrap(vlMap.ready).then(() => {
                expect(!!vlMap.actions).to.be.true;
                expect(vlMap.actions).to.be.lengthOf(2);
            });
        });
    });

    it('can request the map controls', () => {
        cy.mount(mapWithActionsAndControlFixture);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            cy.wrap(vlMap.ready).then(() => {
                expect(!!vlMap.controls).to.be.true;
                expect(vlMap.controls).to.be.lengthOf(4);
            });
        });
    });

    it('can request the active action', () => {
        cy.mount(mapWithActionsFixture);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            cy.wrap(vlMap.ready).then(() => {
                expect(!!vlMap.activeAction).to.be.true;
                expect(vlMap.activeAction).to.be.equal(vlMap.actions[0]);
                vlMap.activateAction(vlMap.actions[1]);
                expect(!!vlMap.activeAction).to.be.true;
                expect(vlMap.activeAction).to.be.equal(vlMap.actions[1]);
            });
        });
    });

    it('can request the default active action', () => {
        cy.mount(mapWithActionsFixture);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            cy.wrap(vlMap.ready).then(() => {
                expect(!!vlMap.defaultAction).to.be.true;
                expect(vlMap.defaultAction).to.be.equal(vlMap.actions[0]);
            });
        });
    });

    it('can create a layer group', () => {
        cy.mount(mapFixture);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            cy.wrap(vlMap.ready).then(() => {
                const title = 'title';
                const layer1 = OpenLayersUtil.createDummyLayer('layer 1');
                const layer2 = OpenLayersUtil.createDummyLayer('layer 2');
                const layers = [layer1, layer2];
                const layerGroup = vlMap.__createLayerGroup(title, layers);
                const properties = layerGroup.getProperties();
                const layerGroupLayers = layerGroup.getLayers().getArray();
                expect(layerGroup).to.be.instanceof(OlLayerGroup);
                expect(properties.title).to.be.equal(title);
                expect(layerGroupLayers).to.be.deep.equal(layers);
            });
        });
    });

    it('an action can be added to the map', () => {
        cy.mount(mapFixture);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            cy.wrap(vlMap.ready).then(() => {
                const spy = cy.spy(vlMap.map, 'addAction');
                const action = new VlSelectAction();
                vlMap.addAction(action);
                expect(spy).to.be.calledOnce;
                expect(spy).to.be.calledWith(action);
            });
        });
    });

    it('an action can be removed from the map', () => {
        cy.mount(mapWithActionsAndControlFixture);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            cy.wrap(vlMap.ready).then(() => {
                const spy = cy.spy(vlMap, 'removeAction');
                const action = vlMap.actions[0];
                vlMap.removeAction(action);
                expect(spy).to.be.calledOnce;
                expect(spy).to.be.calledWith(action);
            });
        });
    });

    it('if the action to be removed is the current action, the default is activated', () => {
        cy.mount(mapWithActionsFixture);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            cy.wrap(vlMap.ready).then(() => {
                vlMap.activateAction(vlMap.actions[1]);
                expect(vlMap.activeAction).to.be.equal(vlMap.actions[1]);
                vlMap.removeAction(vlMap.actions[1]);
                expect(vlMap.defaultAction).to.be.equal(vlMap.actions[0]);
                expect(vlMap.activeAction).to.be.equal(vlMap.actions[0]);
            });
        });
    });

    it('if the action to be removed is the current action and the default active action, the action is deactivated and no other action gets activated', () => {
        cy.mount(mapWithActionsFixture);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            cy.wrap(vlMap.ready).then(() => {
                vlMap.activateAction(vlMap.actions[0]);
                vlMap.removeAction(vlMap.actions[0]);
                expect(vlMap.activeAction).to.be.undefined;
            });
        });
    });

    it('a control can be added to the map', () => {
        cy.mount(mapFixture);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            cy.wrap(vlMap.ready).then(() => {
                const stub = cy.stub(vlMap.map, 'addControl');
                const control = new VlMapMeasureControl();
                vlMap.addControl(control);
                expect(stub).to.be.calledOnce;
                expect(stub).to.be.calledWith(control);
            });
        });
    });

    it('when an action is activated, the previous active action gets deactivated', () => {
        cy.mount(mapWithActionsFixture);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            cy.wrap(vlMap.ready).then(() => {
                const spy = cy.spy(vlMap.map, 'deactivateCurrentAction');
                vlMap.activateAction(vlMap.actions[1]);
                expect(spy).to.be.calledOnce;
            });
        });
    });

    it("when an action is activated, its active state and its control active state will be set to true, and the previous active action's active state and its control active state will be set to false", () => {
        cy.mount(mapWithActionsAndControlFixture);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            cy.wrap(vlMap.ready).then(() => {
                const controlAction2ToggleButton = vlMap.actions[1].getControl().element;
                vlMap.activateAction(vlMap.actions[1]);
                expect(vlMap.actions[1].element._active).to.be.true;
                expect(vlMap.actions[0].element._active).to.be.false;
                expect(controlAction2ToggleButton.on).to.be.true;
                vlMap.activateAction(vlMap.actions[0]);
                expect(vlMap.actions[1].element._active).to.be.false;
                expect(vlMap.actions[0].element._active).to.be.true;
                expect(controlAction2ToggleButton.on).to.be.false;
            });
        });
    });

    it('an action can only be activated when its layer is visible', () => {
        cy.mount(mapWithActionsAndControlFixture);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            cy.wrap(vlMap.ready).then(() => {
                const spy = cy.spy(vlMap.map, 'activateAction');
                const action = vlMap.actions[1];
                action.layer.setVisible(false);
                vlMap.activateAction(action);
                expect(spy).to.be.not.called;
                action.layer.setVisible(true);
                vlMap.activateAction(action);
                expect(spy).to.be.calledOnce;
            });
        });
    });

    it('when the current action is deactivated, the default action will be activated', () => {
        cy.mount(mapWithActionsFixture);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            cy.wrap(vlMap.ready).then(() => {
                expect(vlMap.actions[0]).to.be.equal(vlMap.defaultAction);
                vlMap.activateAction(vlMap.actions[1]);
                expect(vlMap.activeAction).to.be.equal(vlMap.actions[1]);
                expect(vlMap.activeAction).to.be.not.equal(vlMap.defaultAction);
                vlMap.deactivateAction(vlMap.actions[1]);
                expect(vlMap.activeAction).to.be.equal(vlMap.actions[0]);
                expect(vlMap.activeAction).to.be.equal(vlMap.defaultAction);
            });
        });
    });

    it("an action can only be deactivated when it's active", () => {
        cy.mount(mapWithActionsAndControlFixture);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            cy.wrap(vlMap.ready).then(() => {
                const changeActiveActionSpy = cy.spy(vlMap, 'changeActiveAction');
                const deactivateCurrentActionSpy = cy.spy(vlMap.map, 'deactivateCurrentAction');
                vlMap.deactivateAction(vlMap.actions[1]);
                expect(changeActiveActionSpy).to.be.not.called;
                expect(deactivateCurrentActionSpy).to.be.not.called;
                vlMap.activateAction(vlMap.actions[1]);
                expect(changeActiveActionSpy).to.be.calledOnce;
                vlMap.deactivateAction(vlMap.actions[1]);
                expect(changeActiveActionSpy).to.be.calledTwice;
                expect(deactivateCurrentActionSpy).to.be.calledOnce;
            });
        });
    });

    it('an active action on a layer will be deactivated when that layer is set to invisible', () => {
        cy.mount(mapWithActionsAndControlFixture);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            cy.wrap(vlMap.ready).then(() => {
                const action = vlMap.actions[1];
                vlMap.activateAction(action);
                expect(vlMap.activeAction).to.be.equal(action);
                const deactivateCurrentActionSpy = cy.spy(vlMap.map, 'deactivateCurrentAction');
                const layer = vlMap.nonBaseLayers.find((nonBaseLayer) => nonBaseLayer._layer === action.layer);
                layer.visible = false;
                expect(deactivateCurrentActionSpy).to.be.calledOnce;
                expect(vlMap.activeAction).to.be.not.equal(action);
            });
        });
    });

    it('an action control that is linked to an action on a layer will be disabled when that layer is set to invisible and will de deactivated when the action was active', () => {
        cy.mount(mapWithActionsAndControlFixture);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            cy.wrap(vlMap.ready).then(() => {
                const action = vlMap.actions[1];
                const control = action.getControl().get('element');
                vlMap.activateAction(action);
                const setDisabledSpy = cy.spy(control, 'setDisabled');
                const setActiveSpy = cy.spy(control, 'setActive');
                const layer = vlMap.nonBaseLayers.find((nonBaseLayer) => nonBaseLayer._layer === action.layer);
                layer.visible = false;
                expect(setDisabledSpy).to.be.calledOnce;
                expect(setDisabledSpy).to.be.calledWith(true);
                expect(setActiveSpy).to.be.calledOnce;
                expect(setActiveSpy).to.be.calledWith(false);
            });
        });
    });

    it('a default active action on a layer will be activated when the layer is set visible and there is no other action active', () => {
        cy.mount(mapWithActionsAndMultipleLayersFixture);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            cy.wrap(vlMap.ready).then(() => {
                // await sleep(350); // Wait for default action to be activated
                // const { map } = vlMap;
                const defaultActiveActionLayer1 = vlMap.actions[0];
                const actionLayer2 = vlMap.actions[1];
                expect(!!vlMap.activeAction).to.be.true;
                expect(vlMap.activeAction).to.be.equal(defaultActiveActionLayer1);
                expect(vlMap.defaultAction).to.be.equal(defaultActiveActionLayer1);
                const layer1 = vlMap.nonBaseLayers.find(
                    (nonBaseLayer) => nonBaseLayer._layer === defaultActiveActionLayer1.layer
                );
                const deactivateCurrentActionSpy = cy.spy(vlMap.map, 'deactivateCurrentAction');
                layer1.visible = false;
                expect(deactivateCurrentActionSpy).to.be.calledOnce;
                expect(!!vlMap.activeAction).to.be.false;
                layer1.visible = true;
                expect(!!vlMap.activeAction).to.be.true;
                expect(vlMap.activeAction).to.be.equal(defaultActiveActionLayer1);
                vlMap.activateAction(actionLayer2);
                expect(!!vlMap.activeAction).to.be.true;
                expect(vlMap.activeAction).to.be.equal(actionLayer2);
                layer1.visible = false;
                expect(!!vlMap.activeAction).to.be.true;
                expect(vlMap.activeAction).to.be.equal(actionLayer2);
                layer1.visible = true;
                expect(!!vlMap.activeAction).to.be.true;
                expect(vlMap.activeAction).to.be.equal(actionLayer2);
            });
        });
    });

    it('you can zoom to a bounding box', () => {
        cy.mount(mapFixture);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            cy.wrap(vlMap.ready).then(() => {
                cy.spy(vlMap.map, 'zoomToExtent');
                const boundingbox = [0, 1, 2, 3];
                vlMap.zoomTo(boundingbox, null);
                expect(vlMap.map.zoomToExtent).to.be.calledWith(boundingbox);
            });
        });
    });

    it('you can zoom to a geometry', () => {
        cy.mount(mapFixture);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            cy.wrap(vlMap.ready).then(() => {
                cy.spy(vlMap.map, 'zoomToGeometry');
                const geometry = {
                    type: 'Point',
                    coordinates: [104719.27, 192387.25],
                };
                vlMap.zoomTo(geometry, null);
                expect(vlMap.map.zoomToGeometry).to.be.calledWith(geometry);
            });
        });
    });

    it('when a regular map has the fullscreen attribute, the fullscreen control will be added', () => {
        cy.mount(mapFixture);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            cy.wrap(vlMap.ready).then(() => {
                // @ts-ignore
                expect(vlMap.map.controls.getArray().find((control) => control instanceof OlFullScreenControl)).to.be
                    .undefined;
            });
        });
    });

    it('when a fullscreen map has the fullscreen attribute, the fullscreen control will be added', () => {
        cy.mount(mapFullscreenFixture);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            cy.wrap(vlMap.ready).then(() => {
                // @ts-ignore
                expect(vlMap.map.controls.getArray().find((control) => control instanceof OlFullScreenControl)).to
                    .exist;
            });
        });
    });

    describe('vl-map without lambert2008 attribute', () => {
        it('the projection is that of Lambert 72', () => {
            cy.mount(mapFixtureWithoutLambert2008);
            cy.runTestFor<VlMap>('vl-map', (vlMap) => {
                cy.wrap(vlMap.ready).then(() => {
                    expect(vlMap.map.getView().getProjection().getCode()).to.be.equal('EPSG:31370');
                });
            });
        });
        it('feature layers with a Lambert 72 projection-code should not reproject to Lambert 2008 (EPSG:3812)', () => {
            cy.mount(html`
                <vl-map>
                    <vl-map-features-layer
                        name="Shapes"
                        features='{"type":"FeatureCollection","features":[{"type":"Feature","geometry":{"type":"Point","coordinates":[153055,203908]},"properties":{"styleId":"style-1"}}]}'
                        projection-code="EPSG:31370"
                    >
                        <vl-map-layer-circle-style
                            id="style-1"
                            name="Openbaar onderzoek"
                            color="#ffe615"
                            size="5"
                            border-color="#000"
                            border-size="1"
                        ></vl-map-layer-circle-style>
                    </vl-map-features-layer>
                </vl-map>
            `);
            cy.runTestFor<VlMap>('vl-map', (vlMap) => {
                cy.wrap(vlMap.ready).then(() => {
                    const layer = vlMap.nonBaseLayers[0];
                    const source = layer._layer.getSource();
                    const features = source.getFeatures();
                    expect(features).to.have.length(1);
                    const feature = features.find((feature) => feature.get('styleId') === 'style-1');
                    expect(feature.getGeometry().getType()).to.be.equal('Point');
                    expect(feature.getGeometry().getCoordinates()).to.be.deep.equal([153055, 203908]);
                });
            });
        });
    });

    // with lambert2008 attribute
    describe('vl-map with lambert2008 attribute', () => {
        it('the projection is that of Lambert 2008', () => {
            cy.mount(mapFixture);
            cy.runTestFor<VlMap>('vl-map', (vlMap) => {
                cy.wrap(vlMap.ready).then(() => {
                    expect(vlMap.map.getView().getProjection().getCode()).to.be.equal('EPSG:3812');
                });
            });
        });
        it('feature layers with a Lambert 72 projection-code should reproject to Lambert 2008 (EPSG:3812)', () => {
            cy.mount(html`
                <vl-map lambert2008>
                    <vl-map-features-layer
                        name="Shapes"
                        features='{"type":"FeatureCollection","features":[{"type":"Feature","geometry":{"type":"Point","coordinates":[153055,203908]},"properties":{"styleId":"style-1"}}]}'
                        projection-code="EPSG:31370"
                    >
                        <vl-map-layer-circle-style
                            id="style-1"
                            name="Openbaar onderzoek"
                            color="#ffe615"
                            size="5"
                            border-color="#000"
                            border-size="1"
                        ></vl-map-layer-circle-style>
                    </vl-map-features-layer>
                </vl-map>
            `);
            cy.runTestFor<VlMap>('vl-map', (vlMap) => {
                cy.wrap(vlMap.ready).then(() => {
                    const layer = vlMap.nonBaseLayers[0];
                    const source = layer._layer.getSource();
                    const features = source.getFeatures();
                    expect(features).to.have.length(1);
                    const feature = features.find((feature) => feature.get('styleId') === 'style-1');
                    expect(feature.getGeometry().getType()).to.be.equal('Point');
                    // coordinates should be reprojected to EPSG:3812
                    expect(feature.getGeometry().getCoordinates()).to.be.deep.equal([
                        653050.623011303, 703908.5023996672,
                    ]);
                });
            });
        });
    });
});
