import { registerWebComponents } from '@domg-wc/common';
import { VlSideSheet } from '@domg-wc/components/block';
import { html } from 'lit';
import { ScaleLine } from 'ol/control';
import OlFullScreenControl from 'ol/control/FullScreen';
import Feature from 'ol/Feature';
import { LineString, Polygon } from 'ol/geom';
import OlLayerGroup from 'ol/layer/Group';
import proj4 from 'proj4';
import { VlSelectAction } from './actions/select/select-action';
import { VlMapMeasureAction } from './components/action/draw-action/measure-action/vl-map-measure-action';
import { VlMapSelectAction } from './components/action/layer-action/select-action/vl-map-select-action';
import { VlMapMeasureControl } from './components/controls/measure-control/vl-map-measure-control';
import { VlMapBaseLayer } from './components/baselayer/vl-map-base-layer';
import { VlMapActionControls } from './components/controls/vl-map-action-controls';
import { VlMapCurrentLocation } from './components/current-location/vl-map-current-location';
import { VlMapFeaturesLayer } from './components/layer/vector-layer/vl-map-features-layer/vl-map-features-layer';
import { VlMapLayerStyle } from './components/layer-style/vl-map-layer-style';
import { VlMapLegend } from './components/legend/vl-map-legend';
import { VlMapOverviewMap } from './components/overview-map/vl-map-overview-map';
import { VlMapSearch } from './components/search/vl-map-search';
import { VlMapSideSheet } from './components/side-sheet/vl-map-side-sheet';
import { OpenLayersUtil } from './utils/ol-util';
import { VlMap } from './vl-map';

registerWebComponents([
    VlMap,
    VlMapFeaturesLayer,
    VlMapSelectAction,
    VlMapMeasureAction,
    VlMapActionControls,
    VlMapMeasureControl,
    VlMapLayerStyle,
    VlMapLegend,
    VlMapSideSheet,
    VlMapOverviewMap,
    VlMapBaseLayer,
    VlMapCurrentLocation,
    VlMapSearch,
    VlSideSheet,
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

describe('cypress-component - map - vl-map', () => {
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
                '+proj=lcc +lat_1=51.16666723333333 +lat_2=49.8333339 +lat_0=90 +lon_0=4.367486666666666 +x_0=150000.013 +y_0=5400088.438 +ellps=intl +towgs84=-106.869,52.2978,-103.724,0.3366,-0.457,1.8422,-1.2747 +units=m +no_defs',
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
                    (nonBaseLayer) => nonBaseLayer._layer === defaultActiveActionLayer1.layer,
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

    it('returns true if one of the layers has an invalid feature', () => {
        const badPolygon = new Polygon([
            [
                [2, 2],
                [4, 4],
                [4, 2],
                [2, 4],
                [2, 2],
            ],
        ]);
        const feature = new Feature(badPolygon);

        const mockLayer = {
            layer: {
                getSource: () => ({
                    getFeatures: () => [feature],
                }),
            },
        } as any;

        cy.mount(mapFixture);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            cy.wrap(vlMap.ready).then(() => {
                Object.defineProperty(vlMap, 'nonBaseLayers', {
                    get: () => [mockLayer],
                });

                const result = vlMap.hasInvalidGeometries();
                expect(result).equals(true);
            });
        });
    });

    it('returns false if none of the layers have invalid features', () => {
        const feature = new Feature(
            new LineString([
                [0, 0],
                [1, 1],
                [2, 2],
            ]),
        );

        const mockLayer = {
            layer: {
                getSource: () => ({
                    getFeatures: () => [feature],
                }),
            },
        } as any;

        cy.mount(mapFixture);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            cy.wrap(vlMap.ready).then(() => {
                Object.defineProperty(vlMap, 'nonBaseLayers', {
                    get: () => [mockLayer],
                });

                const result = vlMap.hasInvalidGeometries();
                expect(result).equals(false);
            });
        });
    });
});

describe('cypress-component - map - vl-map - without lambert2008 attribute', () => {
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

describe('cypress-component - map - vl-map - with lambert2008 attribute', () => {
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
                expect(feature.getGeometry().getCoordinates()).to.be.deep.equal([653050.623011303, 703908.5023996672]);
            });
        });
    });
});

describe('cypress-component - map - vl-map - scale', () => {
    it('adds a scale line control by default', () => {
        cy.mount(mapFixture);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            cy.wrap(vlMap.ready).then(() => {
                const hasScaleLine = vlMap.map
                    .getControls()
                    .getArray()
                    .some((control) => control instanceof ScaleLine);
                expect(hasScaleLine).to.be.true;
            });
        });
    });

    it('does not add a scale line control when hide-scale is set', () => {
        cy.mount(html`<vl-map lambert2008 hide-scale></vl-map>`);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            cy.wrap(vlMap.ready).then(() => {
                const hasScaleLine = vlMap.map
                    .getControls()
                    .getArray()
                    .some((control) => control instanceof ScaleLine);
                expect(hasScaleLine).to.be.false;
            });
        });
    });
});

describe('cypress-component - map - vl-map - scale positie', () => {
    const corners: { position: string; horizontal: 'left' | 'right'; vertical: 'top' | 'bottom' }[] = [
        { position: 'bottom-left', horizontal: 'left', vertical: 'bottom' },
        { position: 'bottom-right', horizontal: 'right', vertical: 'bottom' },
        { position: 'top-left', horizontal: 'left', vertical: 'top' },
        { position: 'top-right', horizontal: 'right', vertical: 'top' },
    ];

    corners.forEach(({ position, horizontal, vertical }) => {
        it(`positions the scale line in the ${position} corner`, () => {
            cy.viewport(1000, 660);
            cy.mount(html`<vl-map lambert2008 scale-position="${position}"></vl-map>`);
            cy.runTestFor<VlMap>('vl-map', (vlMap) => {
                cy.wrap(vlMap.ready).then(() => {
                    cy.get('vl-map').should(() => {
                        const scaleLine = vlMap.shadowRoot?.querySelector<HTMLElement>('.ol-scale-line');
                        expect(scaleLine, 'scale line control').to.exist;
                        const scaleRect = scaleLine!.getBoundingClientRect();
                        const mapRect = vlMap.getBoundingClientRect();
                        const midX = mapRect.left + mapRect.width / 2;
                        const midY = mapRect.top + mapRect.height / 2;

                        if (horizontal === 'left') {
                            expect(scaleRect.left).to.be.lessThan(midX);
                        } else {
                            expect(scaleRect.right).to.be.greaterThan(midX);
                        }

                        if (vertical === 'top') {
                            expect(scaleRect.top).to.be.lessThan(midY);
                        } else {
                            expect(scaleRect.bottom).to.be.greaterThan(midY);
                        }

                        const zoom = vlMap.shadowRoot?.querySelector<HTMLElement>('.ol-zoom');
                        expect(zoom, 'zoom control').to.exist;
                        const zoomRect = zoom!.getBoundingClientRect();
                        const overlapsZoom =
                            scaleRect.left < zoomRect.right &&
                            scaleRect.right > zoomRect.left &&
                            scaleRect.top < zoomRect.bottom &&
                            scaleRect.bottom > zoomRect.top;
                        expect(overlapsZoom, `scale line (${position}) overlaps zoom control`).to.be.false;
                    });
                });
            });
        });
    });
});

describe('cypress-component - map - vl-map - scale positie met legende', () => {
    const features = {
        type: 'FeatureCollection',
        features: [{ type: 'Feature', id: 1, geometry: { type: 'Point', coordinates: [210000, 190000] } }],
    };

    const overlaps = (a: DOMRect, b: DOMRect) =>
        a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;

    const legendBox = (vlMap: VlMap) => {
        const legend = vlMap.querySelector('vl-map-legend');
        return (
            legend?.shadowRoot?.querySelector<HTMLElement>('.flux-map-legend') ??
            legend?.querySelector<HTMLElement>('.flux-map-legend')
        );
    };

    it('the bottom-right scale line overlaps a legend with the default bottom_right placement', () => {
        cy.viewport(1000, 660);
        cy.mount(html`
            <vl-map lambert2008 scale-position="bottom-right">
                <vl-map-features-layer name="Shapes" .features=${features} projection-code="EPSG:31370">
                    <vl-map-layer-style name="Shapes" color="rgba(102, 51, 153, 0.6)"></vl-map-layer-style>
                </vl-map-features-layer>
                <vl-map-legend></vl-map-legend>
            </vl-map>
        `);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            cy.wrap(vlMap.ready).then(() => {
                cy.get('vl-map').should(() => {
                    const scaleLine = vlMap.shadowRoot?.querySelector<HTMLElement>('.ol-scale-line');
                    const legend = legendBox(vlMap);
                    expect(scaleLine, 'scale line control').to.exist;
                    expect(legend, 'legend').to.exist;
                    const legendRect = legend!.getBoundingClientRect();
                    expect(legendRect.width, 'legend width').to.be.greaterThan(0);
                    expect(overlaps(scaleLine!.getBoundingClientRect(), legendRect)).to.be.true;
                });
            });
        });
    });

    it('moving the legend to bottom_left keeps the bottom-right scale line free', () => {
        cy.viewport(1000, 660);
        cy.mount(html`
            <vl-map lambert2008 scale-position="bottom-right">
                <vl-map-features-layer name="Shapes" .features=${features} projection-code="EPSG:31370">
                    <vl-map-layer-style name="Shapes" color="rgba(102, 51, 153, 0.6)"></vl-map-layer-style>
                </vl-map-features-layer>
                <vl-map-legend placement="bottom_left"></vl-map-legend>
            </vl-map>
        `);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            cy.wrap(vlMap.ready).then(() => {
                cy.get('vl-map').should(() => {
                    const scaleLine = vlMap.shadowRoot?.querySelector<HTMLElement>('.ol-scale-line');
                    const legend = legendBox(vlMap);
                    expect(scaleLine, 'scale line control').to.exist;
                    expect(legend, 'legend').to.exist;
                    const legendRect = legend!.getBoundingClientRect();
                    expect(legendRect.width, 'legend width').to.be.greaterThan(0);
                    expect(overlaps(scaleLine!.getBoundingClientRect(), legendRect)).to.be.false;
                });
            });
        });
    });

    it('the top-right scale line overlaps a legend with placement top_right', () => {
        cy.viewport(1000, 660);
        cy.mount(html`
            <vl-map lambert2008 scale-position="top-right">
                <vl-map-features-layer name="Shapes" .features=${features} projection-code="EPSG:31370">
                    <vl-map-layer-style name="Shapes" color="rgba(102, 51, 153, 0.6)"></vl-map-layer-style>
                </vl-map-features-layer>
                <vl-map-legend placement="top_right"></vl-map-legend>
            </vl-map>
        `);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            cy.wrap(vlMap.ready).then(() => {
                cy.get('vl-map').should(() => {
                    const scaleLine = vlMap.shadowRoot?.querySelector<HTMLElement>('.ol-scale-line');
                    const legend = legendBox(vlMap);
                    expect(scaleLine, 'scale line control').to.exist;
                    expect(legend, 'legend').to.exist;
                    const legendRect = legend!.getBoundingClientRect();
                    expect(legendRect.width, 'legend width').to.be.greaterThan(0);
                    expect(overlaps(scaleLine!.getBoundingClientRect(), legendRect)).to.be.true;
                });
            });
        });
    });

    it('the top-left scale line overlaps a legend with placement top_left', () => {
        cy.viewport(1000, 660);
        cy.mount(html`
            <vl-map lambert2008 scale-position="top-left">
                <vl-map-features-layer name="Shapes" .features=${features} projection-code="EPSG:31370">
                    <vl-map-layer-style name="Shapes" color="rgba(102, 51, 153, 0.6)"></vl-map-layer-style>
                </vl-map-features-layer>
                <vl-map-legend placement="top_left"></vl-map-legend>
            </vl-map>
        `);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            cy.wrap(vlMap.ready).then(() => {
                cy.get('vl-map').should(() => {
                    const scaleLine = vlMap.shadowRoot?.querySelector<HTMLElement>('.ol-scale-line');
                    const legend = legendBox(vlMap);
                    expect(scaleLine, 'scale line control').to.exist;
                    expect(legend, 'legend').to.exist;
                    const legendRect = legend!.getBoundingClientRect();
                    expect(legendRect.width, 'legend width').to.be.greaterThan(0);
                    expect(overlaps(scaleLine!.getBoundingClientRect(), legendRect)).to.be.true;
                });
            });
        });
    });
});


describe('cypress-component - map - vl-map - auto-shift-controls', () => {
    const features = {
        type: 'FeatureCollection',
        features: [{ type: 'Feature', id: 1, geometry: { type: 'Point', coordinates: [210000, 190000] } }],
    };

    const overlaps = (a: DOMRect, b: DOMRect) =>
        a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;

    const controlRect = (vlMap: VlMap, selector: string) =>
        vlMap.shadowRoot!.querySelector<HTMLElement>(selector)!.getBoundingClientRect();

    const childRect = (vlMap: VlMap, tag: string, selector: string, index = 0) =>
        vlMap.querySelectorAll(tag)[index]!.shadowRoot!.querySelector<HTMLElement>(selector)!.getBoundingClientRect();

    const sheetRect = (vlMap: VlMap, selector = 'vl-map-side-sheet') =>
        vlMap.querySelector<HTMLElement>(selector)!.getBoundingClientRect();

    const toggleRect = (vlMap: VlMap, selector = 'vl-map-side-sheet') =>
        vlMap.querySelector(selector)!.shadowRoot!.querySelector<HTMLElement>('vl-button')!.getBoundingClientRect();

    const mapRect = (vlMap: VlMap) => vlMap.shadowRoot!.querySelector<HTMLElement>('#map')!.getBoundingClientRect();

    it('leaves the controls under the side-sheet when the attribute is absent', () => {
        cy.viewport(1200, 660);
        cy.mount(html`
            <vl-map lambert2008>
                <vl-map-side-sheet open><p>inhoud</p></vl-map-side-sheet>
            </vl-map>
        `);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            cy.wrap(vlMap.ready).then(() => {
                cy.get('vl-map').should(() => {
                    const scaleLine = vlMap.shadowRoot!.querySelector<HTMLElement>('.ol-scale-line')!;
                    expect(window.getComputedStyle(scaleLine).left).to.equal('8px');
                    expect(scaleLine.getBoundingClientRect().left).to.be.lessThan(sheetRect(vlMap).right);
                });
            });
        });
    });

    it('shifts the scale line clear of an open left side-sheet', () => {
        cy.viewport(1200, 660);
        cy.mount(html`
            <vl-map lambert2008 auto-shift-controls>
                <vl-map-side-sheet open><p>inhoud</p></vl-map-side-sheet>
            </vl-map>
        `);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            cy.wrap(vlMap.ready).then(() => {
                cy.get('vl-map').should(() => {
                    expect(controlRect(vlMap, '.ol-scale-line').left).to.be.greaterThan(sheetRect(vlMap).right);
                });
            });
        });
    });

    it('shifts the bottom-right controls clear of an open right side-sheet', () => {
        cy.viewport(1200, 660);
        cy.mount(html`
            <vl-map lambert2008 auto-shift-controls allow-fullscreen>
                <vl-map-side-sheet right open><p>inhoud</p></vl-map-side-sheet>
                <vl-map-overview-map></vl-map-overview-map>
                <vl-map-baselayer url="https://localhost" layer="layername_1" title="layer title 1"></vl-map-baselayer>
                <vl-map-features-layer name="Shapes" .features=${features} projection-code="EPSG:31370">
                    <vl-map-layer-style name="Shapes" color="rgba(102, 51, 153, 0.6)"></vl-map-layer-style>
                </vl-map-features-layer>
                <vl-map-legend></vl-map-legend>
                <vl-map-current-location></vl-map-current-location>
            </vl-map>
        `);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            cy.wrap(vlMap.ready).then(() => {
                cy.get('vl-map').should(() => {
                    const sheetLeft = sheetRect(vlMap).left;
                    expect(controlRect(vlMap, '.ol-zoom').right, 'zoom').to.be.lessThan(sheetLeft);
                    expect(controlRect(vlMap, '.ol-full-screen').right, 'fullscreen').to.be.lessThan(sheetLeft);
                    expect(controlRect(vlMap, '.ol-overviewmap').right, 'overview map').to.be.lessThan(sheetLeft);
                    const legend = childRect(vlMap, 'vl-map-legend', '.flux-map-legend');
                    expect(legend.width, 'legend rendered').to.be.greaterThan(0);
                    expect(legend.right, 'legend').to.be.lessThan(sheetLeft);
                    expect(
                        childRect(vlMap, 'vl-map-current-location', '.flux-map-current-location').right,
                        'current location'
                    ).to.be.lessThan(sheetLeft);
                });
            });
        });
    });

    it('shifts the top-right controls clear of the toggle button of an open right side-sheet', () => {
        cy.viewport(1200, 660);
        cy.mount(html`
            <vl-map lambert2008 auto-shift-controls scale-position="top-right">
                <vl-map-side-sheet right open><p>inhoud</p></vl-map-side-sheet>
                <vl-map-action-controls>
                    <vl-map-measure-control></vl-map-measure-control>
                </vl-map-action-controls>
                <vl-map-features-layer name="Shapes" .features=${features} projection-code="EPSG:31370">
                    <vl-map-layer-style name="Shapes" color="rgba(102, 51, 153, 0.6)"></vl-map-layer-style>
                    <vl-map-measure-action></vl-map-measure-action>
                </vl-map-features-layer>
                <vl-map-legend placement="top_right"></vl-map-legend>
            </vl-map>
        `);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            cy.wrap(vlMap.ready).then(() => {
                cy.then(() => vlMap.map.getView().setRotation(Math.PI / 4));
                cy.get('vl-map').should(() => {
                    const toggleLeft = toggleRect(vlMap).left;
                    expect(toggleRect(vlMap).width, 'toggle rendered').to.be.greaterThan(0);
                    expect(controlRect(vlMap, '.ol-rotate').right, 'rotate').to.be.lessThan(toggleLeft);
                    expect(controlRect(vlMap, '.ol-scale-line').right, 'scale').to.be.lessThan(toggleLeft);
                    expect(childRect(vlMap, 'vl-map-legend', '.flux-map-legend').right, 'legend').to.be.lessThan(
                        toggleLeft
                    );
                    expect(
                        vlMap.querySelector('vl-map-measure-control')!.getBoundingClientRect().right,
                        'measure control'
                    ).to.be.lessThan(toggleLeft);
                });
            });
        });
    });

    it('shifts the top-left controls clear of the toggle button of an open left side-sheet', () => {
        cy.viewport(1200, 660);
        cy.mount(html`
            <vl-map lambert2008 auto-shift-controls scale-position="top-left">
                <vl-map-side-sheet open><p>inhoud</p></vl-map-side-sheet>
                <vl-map-features-layer name="Shapes" .features=${features} projection-code="EPSG:31370">
                    <vl-map-layer-style name="Shapes" color="rgba(102, 51, 153, 0.6)"></vl-map-layer-style>
                </vl-map-features-layer>
                <vl-map-legend placement="top_left"></vl-map-legend>
            </vl-map>
        `);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            cy.wrap(vlMap.ready).then(() => {
                cy.get('vl-map').should(() => {
                    const toggleRight = toggleRect(vlMap).right;
                    expect(controlRect(vlMap, '.ol-scale-line').left, 'scale').to.be.greaterThan(toggleRight);
                    expect(childRect(vlMap, 'vl-map-legend', '.flux-map-legend').left, 'legend').to.be.greaterThan(
                        toggleRight
                    );
                });
            });
        });
    });

    it('follows the width of a toggle button with toggle-text', () => {
        cy.viewport(1200, 660);
        cy.mount(html`
            <vl-map lambert2008 auto-shift-controls scale-position="top-left">
                <vl-map-side-sheet open toggle-text="Lagen en legende"><p>inhoud</p></vl-map-side-sheet>
            </vl-map>
        `);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            cy.wrap(vlMap.ready).then(() => {
                cy.get('vl-map').should(() => {
                    expect(toggleRect(vlMap).width, 'wide toggle').to.be.greaterThan(80);
                    expect(controlRect(vlMap, '.ol-scale-line').left).to.be.greaterThan(toggleRect(vlMap).right);
                });
            });
        });
    });

    it('moves every control on one side by the same distance, so they keep their layout', () => {
        cy.viewport(1200, 660);
        cy.mount(html`
            <vl-map lambert2008 auto-shift-controls>
                <vl-map-side-sheet right><p>inhoud</p></vl-map-side-sheet>
                <vl-map-overview-map></vl-map-overview-map>
                <vl-map-baselayer url="https://localhost" layer="layername_1" title="layer title 1"></vl-map-baselayer>
                <vl-map-features-layer name="Shapes" .features=${features} projection-code="EPSG:31370">
                    <vl-map-layer-style name="Shapes" color="rgba(102, 51, 153, 0.6)"></vl-map-layer-style>
                </vl-map-features-layer>
                <vl-map-legend></vl-map-legend>
            </vl-map>
        `);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            const positions = () => [
                controlRect(vlMap, '.ol-zoom').left,
                controlRect(vlMap, '.ol-overviewmap').left,
                childRect(vlMap, 'vl-map-legend', '.flux-map-legend').left,
            ];
            let closed: number[] = [];
            cy.wrap(vlMap.ready).then(() => {
                cy.get('vl-map').should(() => {
                    expect(childRect(vlMap, 'vl-map-legend', '.flux-map-legend').width).to.be.greaterThan(0);
                    expect(controlRect(vlMap, '.ol-overviewmap').width).to.be.greaterThan(0);
                });
                cy.then(() => {
                    closed = positions();
                    vlMap.querySelector<VlMapSideSheet>('vl-map-side-sheet')!.open();
                });
                cy.get('vl-map').should(() => {
                    const open = positions();
                    const deltas = open.map((left, index) => Math.round(left - closed[index]));
                    expect(deltas[0], 'zoom moved').to.be.lessThan(0);
                    expect(new Set(deltas).size, `same distance: ${deltas.join(', ')}`).to.equal(1);
                });
            });
        });
    });

    it('follows opening and closing of the side-sheet', () => {
        cy.viewport(1200, 660);
        cy.mount(html`
            <vl-map lambert2008 auto-shift-controls>
                <vl-map-side-sheet open><p>inhoud</p></vl-map-side-sheet>
            </vl-map>
        `);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            cy.wrap(vlMap.ready).then(() => {
                cy.get('vl-map').should(() => {
                    expect(controlRect(vlMap, '.ol-scale-line').left).to.be.greaterThan(sheetRect(vlMap).right);
                });
                cy.then(() => vlMap.querySelector<VlMapSideSheet>('vl-map-side-sheet')!.close());
                cy.get('vl-map').should(() => {
                    const scaleLine = vlMap.shadowRoot!.querySelector<HTMLElement>('.ol-scale-line')!;
                    expect(window.getComputedStyle(scaleLine).left).to.equal('8px');
                });
                cy.then(() => vlMap.querySelector<VlMapSideSheet>('vl-map-side-sheet')!.open());
                cy.get('vl-map').should(() => {
                    expect(controlRect(vlMap, '.ol-scale-line').left).to.be.greaterThan(sheetRect(vlMap).right);
                });
            });
        });
    });

    it('starts and stops shifting when auto-shift-controls is toggled at runtime', () => {
        cy.viewport(1200, 660);
        cy.mount(html`
            <vl-map lambert2008>
                <vl-map-side-sheet right open><p>inhoud</p></vl-map-side-sheet>
            </vl-map>
        `);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            cy.wrap(vlMap.ready).then(() => {
                cy.get('vl-map').should(() => {
                    expect(controlRect(vlMap, '.ol-zoom').right).to.be.greaterThan(sheetRect(vlMap).left);
                });
                cy.then(() => vlMap.setAttribute('auto-shift-controls', ''));
                cy.get('vl-map').should(() => {
                    expect(controlRect(vlMap, '.ol-zoom').right).to.be.lessThan(sheetRect(vlMap).left);
                });
                cy.then(() => vlMap.removeAttribute('auto-shift-controls'));
                cy.get('vl-map').should(() => {
                    expect(controlRect(vlMap, '.ol-zoom').right).to.be.greaterThan(sheetRect(vlMap).left);
                });
            });
        });
    });

    it('follows a runtime change of scale-position', () => {
        cy.viewport(1200, 660);
        cy.mount(html`
            <vl-map lambert2008 auto-shift-controls>
                <vl-map-side-sheet right open><p>inhoud</p></vl-map-side-sheet>
            </vl-map>
        `);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            cy.wrap(vlMap.ready).then(() => {
                cy.then(() => vlMap.setAttribute('scale-position', 'bottom-right'));
                cy.get('vl-map').should(() => {
                    const scale = controlRect(vlMap, '.ol-scale-line');
                    expect(scale.right).to.be.lessThan(sheetRect(vlMap).left);
                    expect(overlaps(scale, controlRect(vlMap, '.ol-zoom')), 'scale over zoom').to.be.false;
                });
            });
        });
    });

    it('follows a runtime change of the legend placement', () => {
        cy.viewport(1200, 660);
        cy.mount(html`
            <vl-map lambert2008 auto-shift-controls>
                <vl-map-side-sheet open><p>inhoud</p></vl-map-side-sheet>
                <vl-map-features-layer name="Shapes" .features=${features} projection-code="EPSG:31370">
                    <vl-map-layer-style name="Shapes" color="rgba(102, 51, 153, 0.6)"></vl-map-layer-style>
                </vl-map-features-layer>
                <vl-map-legend></vl-map-legend>
            </vl-map>
        `);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            cy.wrap(vlMap.ready).then(() => {
                cy.get('vl-map').should(() => {
                    expect(childRect(vlMap, 'vl-map-legend', '.flux-map-legend').width).to.be.greaterThan(0);
                });
                cy.then(() => vlMap.querySelector('vl-map-legend')!.setAttribute('placement', 'bottom_left'));
                cy.get('vl-map').should(() => {
                    expect(childRect(vlMap, 'vl-map-legend', '.flux-map-legend').left).to.be.greaterThan(
                        sheetRect(vlMap).right
                    );
                });
            });
        });
    });

    it('follows the side-sheet when the map is resized', () => {
        cy.viewport(1200, 660);
        cy.mount(html`
            <vl-map lambert2008 auto-shift-controls style="width: 1100px">
                <vl-map-side-sheet open><p>inhoud</p></vl-map-side-sheet>
            </vl-map>
        `);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            cy.wrap(vlMap.ready).then(() => {
                cy.then(() => (vlMap.style.width = '800px'));
                cy.get('vl-map').should(() => {
                    const sheet = sheetRect(vlMap);
                    const scale = controlRect(vlMap, '.ol-scale-line');
                    expect(sheet.width).to.be.closeTo(800 / 3, 2);
                    expect(scale.left).to.be.greaterThan(sheet.right);
                    expect(scale.left - sheet.right).to.be.lessThan(16);
                });
            });
        });
    });

    it('shifts both sides when a left and a right side-sheet are open', () => {
        cy.viewport(1200, 660);
        cy.mount(html`
            <vl-map lambert2008 auto-shift-controls>
                <vl-map-side-sheet open style="--vl-side-sheet-width: 25%"><p>links</p></vl-map-side-sheet>
                <vl-map-side-sheet right open style="--vl-side-sheet-width: 25%"><p>rechts</p></vl-map-side-sheet>
            </vl-map>
        `);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            cy.wrap(vlMap.ready).then(() => {
                cy.get('vl-map').should(() => {
                    expect(controlRect(vlMap, '.ol-scale-line').left).to.be.greaterThan(
                        sheetRect(vlMap, 'vl-map-side-sheet[left]').right
                    );
                    expect(controlRect(vlMap, '.ol-zoom').right).to.be.lessThan(
                        sheetRect(vlMap, 'vl-map-side-sheet[right]').left
                    );
                });
            });
        });
    });

    it('does not shift on a small screen, where an open side-sheet is modal', () => {
        cy.viewport(375, 660);
        cy.mount(html`
            <vl-map lambert2008 auto-shift-controls>
                <vl-map-side-sheet open><p>inhoud</p></vl-map-side-sheet>
            </vl-map>
        `);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            cy.wrap(vlMap.ready).then(() => {
                cy.get('vl-map').should(() => {
                    const scaleLine = vlMap.shadowRoot!.querySelector<HTMLElement>('.ol-scale-line')!;
                    expect(scaleLine.getBoundingClientRect().width).to.be.greaterThan(0);
                    expect(window.getComputedStyle(scaleLine).left).to.equal('8px');
                });
            });
        });
    });

    it('gives each legend its own position', () => {
        cy.viewport(1200, 660);
        cy.mount(html`
            <vl-map lambert2008 auto-shift-controls>
                <vl-map-side-sheet right open><p>inhoud</p></vl-map-side-sheet>
                <vl-map-features-layer name="Shapes" .features=${features} projection-code="EPSG:31370">
                    <vl-map-layer-style name="Shapes" color="rgba(102, 51, 153, 0.6)"></vl-map-layer-style>
                </vl-map-features-layer>
                <vl-map-legend></vl-map-legend>
                <vl-map-legend placement="top_left"></vl-map-legend>
            </vl-map>
        `);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            cy.wrap(vlMap.ready).then(() => {
                cy.get('vl-map').should(() => {
                    const right = childRect(vlMap, 'vl-map-legend', '.flux-map-legend', 0);
                    const left = childRect(vlMap, 'vl-map-legend', '.flux-map-legend', 1);
                    expect(right.width).to.be.greaterThan(0);
                    expect(right.right, 'bottom-right legend shifts').to.be.lessThan(sheetRect(vlMap).left);
                    expect(left.left - mapRect(vlMap).left, 'top-left legend stays').to.be.lessThan(20);
                });
            });
        });
    });

    it('does not pass the shift on to a nested vl-map', () => {
        cy.viewport(1200, 660);
        cy.mount(html`
            <vl-map lambert2008 auto-shift-controls>
                <vl-map-side-sheet right open style="--vl-side-sheet-width: 50%">
                    <vl-map lambert2008 auto-shift-controls id="nested"></vl-map>
                </vl-map-side-sheet>
            </vl-map>
        `);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            const nested = vlMap.querySelector<VlMap>('#nested')!;
            cy.wrap(vlMap.ready).then(() => {
                cy.wrap(nested.ready).then(() => {
                    cy.get('vl-map').should(() => {
                        expect(controlRect(vlMap, '.ol-zoom').right, 'outer map shifts').to.be.lessThan(
                            sheetRect(vlMap).left
                        );
                        const nestedZoom = nested.shadowRoot!.querySelector<HTMLElement>('.ol-zoom')!;
                        expect(window.getComputedStyle(nestedZoom).right).to.equal('10px');
                    });
                });
            });
        });
    });

    it('keeps the side-sheet width out of the style attribute of vl-map', () => {
        cy.viewport(1200, 660);
        cy.mount(html`
            <vl-map lambert2008 auto-shift-controls>
                <vl-map-side-sheet right open><p>inhoud</p></vl-map-side-sheet>
            </vl-map>
        `);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            cy.wrap(vlMap.ready).then(() => {
                cy.get('vl-map').should(() => {
                    expect(controlRect(vlMap, '.ol-zoom').right).to.be.lessThan(sheetRect(vlMap).left);
                    expect(vlMap.getAttribute('style')).not.to.contain('--vl-map--side-sheet');
                    expect(
                        vlMap.shadowRoot!.querySelector<HTMLElement>('#map')!.style.getPropertyValue(
                            '--vl-map--side-sheet-right'
                        )
                    ).to.equal(`${vlMap.querySelector<HTMLElement>('vl-map-side-sheet')!.offsetWidth}px`);
                });
            });
        });
    });

    it('keeps the controls clear of the side-sheet on a narrow map, even if they reach the opposite edge', () => {
        cy.viewport(1200, 660);
        cy.mount(html`
            <vl-map lambert2008 auto-shift-controls style="width: 520px; --vl-side-sheet-width: 80%">
                <vl-map-side-sheet open><p>inhoud</p></vl-map-side-sheet>
            </vl-map>
        `);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            cy.wrap(vlMap.ready).then(() => {
                cy.get('vl-map').should(() => {
                    const scale = controlRect(vlMap, '.ol-scale-line');
                    expect(scale.left).to.be.greaterThan(sheetRect(vlMap).right);
                    expect(scale.right, 'scale reaches past the map edge').to.be.greaterThan(mapRect(vlMap).right);
                    expect(overlaps(scale, controlRect(vlMap, '.ol-zoom')), 'scale over zoom').to.be.true;
                });
            });
        });
    });
});
