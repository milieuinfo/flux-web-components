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
    const shiftOf = (vlMap: VlMap, property: string) => parseFloat(vlMap.style.getPropertyValue(property)) || 0;

    const childShiftOf = (vlMap: VlMap, tag: string, property: string, index = 0) =>
        parseFloat(vlMap.querySelectorAll<HTMLElement>(tag)[index]?.style.getPropertyValue(property) ?? '') || 0;

    const features = {
        type: 'FeatureCollection',
        features: [{ type: 'Feature', id: 1, geometry: { type: 'Point', coordinates: [210000, 190000] } }],
    };

    const overlaps = (a: DOMRect, b: DOMRect) =>
        a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;

    const toggleButtonRectOf = (vlMap: VlMap) =>
        vlMap
            .querySelector('vl-map-side-sheet')!
            .shadowRoot!.querySelector<HTMLElement>('vl-button')!
            .getBoundingClientRect();

    const afterTwoFrames = () =>
        cy
            .window()
            .then(
                (win) =>
                    new Cypress.Promise<void>((resolve) =>
                        win.requestAnimationFrame(() => win.requestAnimationFrame(() => resolve())),
                    ),
            );

    it('does not write any shift property when the attribute is absent', () => {
        cy.viewport(1200, 660);
        cy.mount(html`
            <vl-map lambert2008>
                <vl-map-side-sheet open><p>inhoud</p></vl-map-side-sheet>
            </vl-map>
        `);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            cy.wrap(vlMap.ready).then(() => {
                afterTwoFrames().then(() => {
                    expect(vlMap.style.getPropertyValue('--vl-map--shift-scale-line')).to.equal('');
                    expect(vlMap.style.getPropertyValue('--vl-map--shift-zoom')).to.equal('');
                });
            });
        });
    });

    it('starts shifting when auto-shift-controls is added at runtime', () => {
        cy.viewport(1200, 660);
        cy.mount(html`
            <vl-map lambert2008>
                <vl-map-side-sheet right open><p>inhoud</p></vl-map-side-sheet>
            </vl-map>
        `);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            cy.wrap(vlMap.ready).then(() => {
                cy.then(() => {
                    vlMap.setAttribute('auto-shift-controls', '');
                });
                cy.get('vl-map').should(() => {
                    expect(shiftOf(vlMap, '--vl-map--shift-zoom')).to.be.lessThan(0);
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
                    const scaleLine = vlMap.shadowRoot?.querySelector<HTMLElement>('.ol-scale-line');
                    const sideSheet = vlMap.querySelector<HTMLElement>('vl-map-side-sheet');
                    expect(scaleLine, 'scale line control').to.exist;
                    expect(shiftOf(vlMap, '--vl-map--shift-scale-line')).to.be.greaterThan(0);
                    expect(scaleLine!.getBoundingClientRect().left).to.be.greaterThan(
                        sideSheet!.getBoundingClientRect().right,
                    );
                });
            });
        });
    });

    it('shifts the zoom control clear of an open right side-sheet', () => {
        cy.viewport(1200, 660);
        cy.mount(html`
            <vl-map lambert2008 auto-shift-controls>
                <vl-map-side-sheet right open><p>inhoud</p></vl-map-side-sheet>
            </vl-map>
        `);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            cy.wrap(vlMap.ready).then(() => {
                cy.get('vl-map').should(() => {
                    const zoom = vlMap.shadowRoot?.querySelector<HTMLElement>('.ol-zoom');
                    const sideSheet = vlMap.querySelector<HTMLElement>('vl-map-side-sheet');
                    expect(zoom, 'zoom control').to.exist;
                    expect(shiftOf(vlMap, '--vl-map--shift-zoom')).to.be.lessThan(0);
                    expect(zoom!.getBoundingClientRect().right).to.be.lessThan(sideSheet!.getBoundingClientRect().left);
                });
            });
        });
    });

    it('shifts the legend clear of an open right side-sheet', () => {
        cy.viewport(1200, 660);
        cy.mount(html`
            <vl-map lambert2008 auto-shift-controls>
                <vl-map-legend></vl-map-legend>
                <vl-map-side-sheet right open><p>inhoud</p></vl-map-side-sheet>
            </vl-map>
        `);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            cy.wrap(vlMap.ready).then(() => {
                cy.get('vl-map').should(() => {
                    const legend = vlMap
                        .querySelector('vl-map-legend')
                        ?.shadowRoot?.querySelector<HTMLElement>('.flux-map-legend');
                    const sideSheet = vlMap.querySelector<HTMLElement>('vl-map-side-sheet');
                    expect(legend, 'legend').to.exist;
                    expect(childShiftOf(vlMap, 'vl-map-legend', '--vl-map--shift-legend')).to.be.lessThan(0);
                    expect(legend!.getBoundingClientRect().right).to.be.lessThan(
                        sideSheet!.getBoundingClientRect().left,
                    );
                });
            });
        });
    });

    it('shifts a top-left legend clear of the toggle button of an open left side-sheet', () => {
        cy.viewport(1200, 660);
        cy.mount(html`
            <vl-map lambert2008 auto-shift-controls>
                <vl-map-legend placement="top_left"></vl-map-legend>
                <vl-map-side-sheet open><p>inhoud</p></vl-map-side-sheet>
            </vl-map>
        `);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            cy.wrap(vlMap.ready).then(() => {
                cy.get('vl-map').should(() => {
                    const legend = vlMap
                        .querySelector('vl-map-legend')
                        ?.shadowRoot?.querySelector<HTMLElement>('.flux-map-legend');
                    const toggleButtonRect = toggleButtonRectOf(vlMap);
                    expect(legend, 'legend').to.exist;
                    expect(toggleButtonRect.width).to.be.greaterThan(0);
                    expect(childShiftOf(vlMap, 'vl-map-legend', '--vl-map--shift-legend')).to.be.greaterThan(0);
                    expect(legend!.getBoundingClientRect().left).to.be.greaterThan(toggleButtonRect.right);
                });
            });
        });
    });

    it('shifts a top-right legend clear of the toggle button of an open right side-sheet', () => {
        cy.viewport(1200, 660);
        cy.mount(html`
            <vl-map lambert2008 auto-shift-controls>
                <vl-map-legend placement="top_right"></vl-map-legend>
                <vl-map-side-sheet right open><p>inhoud</p></vl-map-side-sheet>
            </vl-map>
        `);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            cy.wrap(vlMap.ready).then(() => {
                cy.get('vl-map').should(() => {
                    const legend = vlMap
                        .querySelector('vl-map-legend')
                        ?.shadowRoot?.querySelector<HTMLElement>('.flux-map-legend');
                    const toggleButtonRect = toggleButtonRectOf(vlMap);
                    expect(legend, 'legend').to.exist;
                    expect(toggleButtonRect.width).to.be.greaterThan(0);
                    expect(childShiftOf(vlMap, 'vl-map-legend', '--vl-map--shift-legend')).to.be.lessThan(0);
                    expect(legend!.getBoundingClientRect().right).to.be.lessThan(toggleButtonRect.left);
                });
            });
        });
    });

    it('shifts a top-left scale line clear of the toggle button of an open left side-sheet', () => {
        cy.viewport(1200, 660);
        cy.mount(html`
            <vl-map lambert2008 auto-shift-controls scale-position="top-left">
                <vl-map-side-sheet open><p>inhoud</p></vl-map-side-sheet>
            </vl-map>
        `);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            cy.wrap(vlMap.ready).then(() => {
                cy.get('vl-map').should(() => {
                    const scaleLine = vlMap.shadowRoot?.querySelector<HTMLElement>('.ol-scale-line');
                    const toggleButtonRect = toggleButtonRectOf(vlMap);
                    expect(scaleLine, 'scale line control').to.exist;
                    expect(toggleButtonRect.width).to.be.greaterThan(0);
                    expect(shiftOf(vlMap, '--vl-map--shift-scale-line')).to.be.greaterThan(0);
                    expect(scaleLine!.getBoundingClientRect().left).to.be.greaterThan(toggleButtonRect.right);
                });
            });
        });
    });

    it('shifts the overview map clear of an open right side-sheet when its control is added later', () => {
        cy.viewport(1200, 660);
        cy.mount(html`
            <vl-map lambert2008 auto-shift-controls>
                <vl-map-side-sheet right open><p>inhoud</p></vl-map-side-sheet>
                <vl-map-overview-map></vl-map-overview-map>
                <vl-map-baselayer url="https://localhost" layer="layername_1" title="layer title 1"></vl-map-baselayer>
            </vl-map>
        `);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            cy.wrap(vlMap.ready).then(() => {
                cy.get('vl-map').should(() => {
                    const overviewMap = vlMap.shadowRoot?.querySelector<HTMLElement>('.ol-overviewmap');
                    const sideSheet = vlMap.querySelector<HTMLElement>('vl-map-side-sheet');
                    expect(overviewMap, 'overview map control').to.exist;
                    expect(shiftOf(vlMap, '--vl-map--shift-overviewmap')).to.be.lessThan(0);
                    expect(overviewMap!.getBoundingClientRect().right).to.be.lessThan(
                        sideSheet!.getBoundingClientRect().left,
                    );
                });
            });
        });
    });

    it('keeps the left-hand controls in place when there is no room to clear a left side-sheet', () => {
        cy.viewport(1200, 660);
        cy.mount(html`
            <vl-map lambert2008 auto-shift-controls style="width: 520px; --vl-side-sheet-width: 70%">
                <vl-map-side-sheet open><p>inhoud</p></vl-map-side-sheet>
            </vl-map>
        `);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            cy.wrap(vlMap.ready).then(() => {
                afterTwoFrames().then(() => {
                    cy.get('vl-map').should(() => {
                        const scaleLine = vlMap.shadowRoot?.querySelector<HTMLElement>('.ol-scale-line');
                        const sideSheet = vlMap.querySelector<HTMLElement>('vl-map-side-sheet');
                        expect(scaleLine, 'scale line control').to.exist;
                        expect(sideSheet!.getBoundingClientRect().width).to.be.greaterThan(0);
                        expect(shiftOf(vlMap, '--vl-map--shift-scale-line')).to.equal(0);
                        expect(scaleLine!.getBoundingClientRect().left).to.be.lessThan(
                            sideSheet!.getBoundingClientRect().right,
                        );
                    });
                });
            });
        });
    });

    it('keeps the right-hand controls in place when there is no room to clear a right side-sheet', () => {
        cy.viewport(1200, 660);
        cy.mount(html`
            <vl-map lambert2008 auto-shift-controls style="width: 520px; --vl-side-sheet-width: 95%">
                <vl-map-side-sheet right open><p>inhoud</p></vl-map-side-sheet>
            </vl-map>
        `);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            cy.wrap(vlMap.ready).then(() => {
                afterTwoFrames().then(() => {
                    cy.get('vl-map').should(() => {
                        const zoom = vlMap.shadowRoot?.querySelector<HTMLElement>('.ol-zoom');
                        const sideSheet = vlMap.querySelector<HTMLElement>('vl-map-side-sheet');
                        expect(zoom, 'zoom control').to.exist;
                        expect(sideSheet!.getBoundingClientRect().width).to.be.greaterThan(0);
                        expect(shiftOf(vlMap, '--vl-map--shift-zoom')).to.equal(0);
                        expect(zoom!.getBoundingClientRect().right).to.be.greaterThan(
                            sideSheet!.getBoundingClientRect().left,
                        );
                    });
                });
            });
        });
    });

    it('resets the shift when the side-sheet closes', () => {
        cy.viewport(1200, 660);
        cy.mount(html`
            <vl-map lambert2008 auto-shift-controls>
                <vl-map-side-sheet open><p>inhoud</p></vl-map-side-sheet>
            </vl-map>
        `);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            cy.wrap(vlMap.ready).then(() => {
                cy.get('vl-map').should(() => {
                    expect(shiftOf(vlMap, '--vl-map--shift-scale-line')).to.be.greaterThan(0);
                });
                cy.then(() => {
                    vlMap.querySelector('vl-map-side-sheet')?.removeAttribute('open');
                });
                cy.get('vl-map').should(() => {
                    expect(shiftOf(vlMap, '--vl-map--shift-scale-line')).to.equal(0);
                    expect(vlMap.style.getPropertyValue('--vl-map--shift-scale-line'), 'property removed').to.equal('');
                });
            });
        });
    });

    it('shifts the right-hand cluster by one shared delta', () => {
        cy.viewport(1200, 660);
        cy.mount(html`
            <vl-map lambert2008 auto-shift-controls>
                <vl-map-legend></vl-map-legend>
                <vl-map-side-sheet right open><p>inhoud</p></vl-map-side-sheet>
            </vl-map>
        `);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            cy.wrap(vlMap.ready).then(() => {
                cy.get('vl-map').should(() => {
                    const zoom = shiftOf(vlMap, '--vl-map--shift-zoom');
                    const legend = childShiftOf(vlMap, 'vl-map-legend', '--vl-map--shift-legend');
                    expect(zoom).to.be.lessThan(0);
                    expect(legend).to.equal(zoom);
                });
            });
        });
    });

    it('removes the shift properties when auto-shift-controls is removed at runtime', () => {
        cy.viewport(1200, 660);
        cy.mount(html`
            <vl-map lambert2008 auto-shift-controls>
                <vl-map-side-sheet right open><p>inhoud</p></vl-map-side-sheet>
            </vl-map>
        `);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            cy.wrap(vlMap.ready).then(() => {
                cy.get('vl-map').should(() => {
                    expect(shiftOf(vlMap, '--vl-map--shift-zoom')).to.be.lessThan(0);
                });
                cy.then(() => {
                    vlMap.removeAttribute('auto-shift-controls');
                });
                cy.get('vl-map').should(() => {
                    expect(vlMap.style.getPropertyValue('--vl-map--shift-zoom')).to.equal('');
                });
            });
        });
    });

    it('treats a plain vl-side-sheet without left/right as a right side-sheet', () => {
        cy.viewport(1200, 660);
        cy.mount(html`
            <vl-map lambert2008 auto-shift-controls>
                <vl-side-sheet absolute open><p>inhoud</p></vl-side-sheet>
            </vl-map>
        `);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            cy.wrap(vlMap.ready).then(() => {
                cy.get('vl-map').should(() => {
                    expect(shiftOf(vlMap, '--vl-map--shift-zoom')).to.be.lessThan(0);
                    expect(shiftOf(vlMap, '--vl-map--shift-scale-line')).to.equal(0);
                });
            });
        });
    });

    it('keeps a shifted control inside the map and operable', () => {
        cy.viewport(1200, 660);
        cy.mount(html`
            <vl-map lambert2008 auto-shift-controls zoomInTooltip="Zoom in" zoomOutTooltip="Zoom uit">
                <vl-map-side-sheet right open><p>inhoud</p></vl-map-side-sheet>
            </vl-map>
        `);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            cy.wrap(vlMap.ready).then(() => {
                cy.get('vl-map').should(() => {
                    const mapRect = vlMap.getBoundingClientRect();
                    const zoom = vlMap.shadowRoot?.querySelector<HTMLElement>('.ol-zoom');
                    expect(zoom, 'zoom control').to.exist;
                    const zoomRect = zoom!.getBoundingClientRect();
                    expect(zoomRect.left).to.be.gte(mapRect.left);
                    expect(zoomRect.right).to.be.lte(mapRect.right + 1);
                    const zoomButton = zoom!.querySelector('button');
                    expect(zoomButton?.getAttribute('title')).to.be.a('string').and.not.be.empty;
                    expect(shiftOf(vlMap, '--vl-map--shift-zoom')).to.be.lessThan(0);
                });
                cy.then(() => {
                    const zoomIn = vlMap.shadowRoot!.querySelector<HTMLButtonElement>('.ol-zoom-in')!;
                    const rect = zoomIn.getBoundingClientRect();
                    const hit = vlMap.shadowRoot!.elementFromPoint(
                        rect.left + rect.width / 2,
                        rect.top + rect.height / 2,
                    );
                    expect(zoomIn.contains(hit), 'zoom-in button is on top at its shifted position').to.be.true;
                    const zoomBefore = vlMap.map.getView().getZoom()!;
                    zoomIn.click();
                    cy.wrap(null).should(() => {
                        expect(vlMap.map.getView().getZoom()).to.be.closeTo(zoomBefore + 1, 0.01);
                    });
                });
            });
        });
    });

    it('shifts a bottom-right scale line together with the zoom control for an open right side-sheet', () => {
        cy.viewport(1200, 660);
        cy.mount(html`
            <vl-map lambert2008 auto-shift-controls scale-position="bottom-right">
                <vl-map-side-sheet right open><p>inhoud</p></vl-map-side-sheet>
            </vl-map>
        `);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            cy.wrap(vlMap.ready).then(() => {
                cy.get('vl-map').should(() => {
                    const scaleLine = vlMap.shadowRoot?.querySelector<HTMLElement>('.ol-scale-line');
                    const sideSheet = vlMap.querySelector<HTMLElement>('vl-map-side-sheet');
                    expect(scaleLine, 'scale line control').to.exist;
                    expect(shiftOf(vlMap, '--vl-map--shift-zoom')).to.be.lessThan(0);
                    expect(shiftOf(vlMap, '--vl-map--shift-scale-line')).to.equal(
                        shiftOf(vlMap, '--vl-map--shift-zoom'),
                    );
                    expect(scaleLine!.getBoundingClientRect().right).to.be.lessThan(
                        sideSheet!.getBoundingClientRect().left,
                    );
                });
            });
        });
    });

    it('recalculates the shift when scale-position changes at runtime', () => {
        cy.viewport(1200, 660);
        cy.mount(html`
            <vl-map lambert2008 auto-shift-controls>
                <vl-map-side-sheet open><p>inhoud</p></vl-map-side-sheet>
            </vl-map>
        `);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            cy.wrap(vlMap.ready).then(() => {
                cy.get('vl-map').should(() => {
                    expect(shiftOf(vlMap, '--vl-map--shift-scale-line')).to.be.greaterThan(0);
                });
                cy.then(() => {
                    vlMap.setAttribute('scale-position', 'bottom-right');
                });
                cy.get('vl-map').should(() => {
                    const scaleLine = vlMap.shadowRoot?.querySelector<HTMLElement>('.ol-scale-line');
                    expect(shiftOf(vlMap, '--vl-map--shift-scale-line')).to.equal(0);
                    expect(scaleLine!.getBoundingClientRect().right).to.be.lte(vlMap.getBoundingClientRect().right);
                });
            });
        });
    });

    it('recalculates the shift when the legend placement changes at runtime', () => {
        cy.viewport(1200, 660);
        cy.mount(html`
            <vl-map lambert2008 auto-shift-controls>
                <vl-map-legend></vl-map-legend>
                <vl-map-side-sheet open><p>inhoud</p></vl-map-side-sheet>
            </vl-map>
        `);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            cy.wrap(vlMap.ready).then(() => {
                cy.get('vl-map').should(() => {
                    expect(shiftOf(vlMap, '--vl-map--shift-scale-line')).to.be.greaterThan(0);
                    expect(childShiftOf(vlMap, 'vl-map-legend', '--vl-map--shift-legend')).to.equal(0);
                });
                cy.then(() => {
                    vlMap.querySelector('vl-map-legend')?.setAttribute('placement', 'bottom_left');
                });
                cy.get('vl-map').should(() => {
                    const legend = vlMap
                        .querySelector('vl-map-legend')
                        ?.shadowRoot?.querySelector<HTMLElement>('.flux-map-legend');
                    const sideSheet = vlMap.querySelector<HTMLElement>('vl-map-side-sheet');
                    expect(childShiftOf(vlMap, 'vl-map-legend', '--vl-map--shift-legend')).to.be.greaterThan(0);
                    expect(legend!.getBoundingClientRect().left).to.be.greaterThan(
                        sideSheet!.getBoundingClientRect().right,
                    );
                });
            });
        });
    });

    it('keeps the right-hand cluster just clear of an open right side-sheet while the rotate control is hidden', () => {
        cy.viewport(1200, 660);
        cy.mount(html`
            <vl-map lambert2008 auto-shift-controls>
                <vl-map-side-sheet right open><p>inhoud</p></vl-map-side-sheet>
            </vl-map>
        `);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            cy.wrap(vlMap.ready).then(() => {
                cy.get('vl-map').should(() => {
                    const zoom = vlMap.shadowRoot?.querySelector<HTMLElement>('.ol-zoom');
                    const rotate = vlMap.shadowRoot?.querySelector<HTMLElement>('.ol-rotate');
                    const sideSheet = vlMap.querySelector<HTMLElement>('vl-map-side-sheet');
                    expect(rotate!.classList.contains('ol-hidden'), 'rotate control hidden').to.be.true;
                    expect(shiftOf(vlMap, '--vl-map--shift-zoom')).to.be.lessThan(0);
                    const gap = sideSheet!.getBoundingClientRect().left - zoom!.getBoundingClientRect().right;
                    expect(gap).to.be.within(6, 10);
                });
            });
        });
    });

    it('shifts the right-hand cluster on a narrow map while the rotate control is hidden', () => {
        cy.viewport(1200, 660);
        cy.mount(html`
            <vl-map lambert2008 auto-shift-controls style="width: 640px">
                <vl-map-side-sheet right open><p>inhoud</p></vl-map-side-sheet>
                <vl-map-overview-map></vl-map-overview-map>
                <vl-map-baselayer url="https://localhost" layer="layername_1" title="layer title 1"></vl-map-baselayer>
                <vl-map-features-layer name="Shapes" .features=${features} projection-code="EPSG:31370">
                    <vl-map-layer-style name="Shapes" color="rgba(102, 51, 153, 0.6)"></vl-map-layer-style>
                </vl-map-features-layer>
                <vl-map-legend></vl-map-legend>
            </vl-map>
        `);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            cy.wrap(vlMap.ready).then(() => {
                cy.get('vl-map').should(() => {
                    const zoom = vlMap.shadowRoot?.querySelector<HTMLElement>('.ol-zoom');
                    const sideSheet = vlMap.querySelector<HTMLElement>('vl-map-side-sheet');
                    expect(vlMap.shadowRoot?.querySelector('.ol-overviewmap'), 'overview map control').to.exist;
                    expect(shiftOf(vlMap, '--vl-map--shift-zoom')).to.be.lessThan(0);
                    expect(zoom!.getBoundingClientRect().right).to.be.lessThan(sideSheet!.getBoundingClientRect().left);
                });
            });
        });
    });

    it('takes the rotate control into account once the map is rotated', () => {
        cy.viewport(1200, 660);
        cy.mount(html`
            <vl-map lambert2008 auto-shift-controls>
                <vl-map-side-sheet right open><p>inhoud</p></vl-map-side-sheet>
            </vl-map>
        `);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            cy.wrap(vlMap.ready).then(() => {
                cy.then(() => {
                    vlMap.map.getView().setRotation(Math.PI / 4);
                });
                cy.get('vl-map').should(() => {
                    const rotate = vlMap.shadowRoot?.querySelector<HTMLElement>('.ol-rotate');
                    const toggleButtonRect = toggleButtonRectOf(vlMap);
                    expect(rotate!.classList.contains('ol-hidden'), 'rotate control hidden').to.be.false;
                    expect(shiftOf(vlMap, '--vl-map--shift-rotate')).to.be.lessThan(0);
                    expect(rotate!.getBoundingClientRect().right).to.be.lessThan(toggleButtonRect.left);
                });
            });
        });
    });

    it('does not shift top-right controls over a vl-map-search', () => {
        cy.viewport(1200, 660);
        cy.mount(html`
            <vl-map lambert2008 auto-shift-controls scale-position="top-right" style="width: 1000px">
                <vl-map-search></vl-map-search>
                <vl-map-features-layer name="Shapes" .features=${features} projection-code="EPSG:31370">
                    <vl-map-layer-style name="Shapes" color="rgba(102, 51, 153, 0.6)"></vl-map-layer-style>
                </vl-map-features-layer>
                <vl-map-legend placement="top_right"></vl-map-legend>
                <vl-map-side-sheet right open><p>inhoud</p></vl-map-side-sheet>
            </vl-map>
        `);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            const search = () => vlMap.shadowRoot?.querySelector<HTMLElement>('vl-map-search');
            const legend = () =>
                vlMap.querySelector('vl-map-legend')?.shadowRoot?.querySelector<HTMLElement>('.flux-map-legend');
            cy.wrap(vlMap.ready).then(() => {
                cy.get('vl-map').should(() => {
                    expect(search(), 'map search').to.exist;
                    expect(search()!.getBoundingClientRect().width, 'search width').to.be.greaterThan(0);
                    expect(legend(), 'legend').to.exist;
                    expect(legend()!.getBoundingClientRect().width, 'legend width').to.be.greaterThan(0);
                });
                cy.get('vl-map').should(() => {
                    const zoom = vlMap.shadowRoot!.querySelector<HTMLElement>('.ol-zoom')!;
                    const sideSheet = vlMap.querySelector<HTMLElement>('vl-map-side-sheet')!;
                    expect(shiftOf(vlMap, '--vl-map--shift-zoom'), 'bottom row shifts').to.be.lessThan(0);
                    expect(zoom.getBoundingClientRect().right).to.be.lessThan(sideSheet.getBoundingClientRect().left);
                    const searchRect = search()!.getBoundingClientRect();
                    const scaleLine = vlMap.shadowRoot!.querySelector<HTMLElement>('.ol-scale-line')!;
                    expect(overlaps(legend()!.getBoundingClientRect(), searchRect), 'legend over search').to.be.false;
                    expect(overlaps(scaleLine.getBoundingClientRect(), searchRect), 'scale over search').to.be.false;
                    expect(childShiftOf(vlMap, 'vl-map-legend', '--vl-map--shift-legend'), 'top row stays').to.equal(0);
                });
            });
        });
    });

    it('shifts vl-map-current-location and vl-map-action-controls clear of an open right side-sheet', () => {
        cy.viewport(1200, 660);
        cy.mount(html`
            <vl-map lambert2008 auto-shift-controls>
                <vl-map-current-location></vl-map-current-location>
                <vl-map-action-controls>
                    <vl-map-measure-control></vl-map-measure-control>
                </vl-map-action-controls>
                <vl-map-features-layer>
                    <vl-map-measure-action></vl-map-measure-action>
                </vl-map-features-layer>
                <vl-map-side-sheet right open><p>inhoud</p></vl-map-side-sheet>
            </vl-map>
        `);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            cy.wrap(vlMap.ready).then(() => {
                cy.get('vl-map').should(() => {
                    const currentLocation = vlMap
                        .querySelector('vl-map-current-location')
                        ?.shadowRoot?.querySelector<HTMLElement>('.flux-map-current-location');
                    const measureControl = vlMap.querySelector<HTMLElement>('vl-map-measure-control');
                    const sideSheetLeft = vlMap
                        .querySelector<HTMLElement>('vl-map-side-sheet')!
                        .getBoundingClientRect().left;
                    const toggleButtonRect = toggleButtonRectOf(vlMap);
                    expect(currentLocation, 'current location').to.exist;
                    expect(measureControl, 'measure control').to.exist;
                    expect(
                        childShiftOf(vlMap, 'vl-map-current-location', '--vl-map--shift-current-location'),
                    ).to.be.lessThan(0);
                    expect(
                        childShiftOf(vlMap, 'vl-map-action-controls', '--vl-map--shift-action-controls'),
                    ).to.be.lessThan(0);
                    expect(currentLocation!.getBoundingClientRect().right).to.be.lessThan(sideSheetLeft);
                    expect(measureControl!.getBoundingClientRect().right).to.be.lessThan(
                        Math.min(sideSheetLeft, toggleButtonRect.left),
                    );
                });
            });
        });
    });

    it('recalculates the shift for a fixed vl-side-sheet when the page scrolls', () => {
        cy.viewport(1200, 660);
        cy.mount(html`
            <div style="height: 700px"></div>
            <vl-map lambert2008 auto-shift-controls>
                <vl-side-sheet open><p>inhoud</p></vl-side-sheet>
            </vl-map>
            <div style="height: 700px"></div>
        `);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            cy.wrap(vlMap.ready).then(() => {
                cy.get('vl-map').should(() => {
                    const scaleLine = vlMap.shadowRoot?.querySelector<HTMLElement>('.ol-scale-line');
                    expect(scaleLine!.getBoundingClientRect().width, 'scale line rendered').to.be.greaterThan(0);
                });
                afterTwoFrames();
                afterTwoFrames().then(() => {
                    expect(shiftOf(vlMap, '--vl-map--shift-zoom'), 'shift before scrolling').to.equal(0);
                });
                cy.then(() => {
                    vlMap.scrollIntoView();
                });
                cy.get('vl-map').should(() => {
                    const zoom = vlMap.shadowRoot?.querySelector<HTMLElement>('.ol-zoom');
                    const sideSheet = vlMap.querySelector<HTMLElement>('vl-side-sheet');
                    expect(shiftOf(vlMap, '--vl-map--shift-zoom')).to.be.lessThan(0);
                    expect(zoom!.getBoundingClientRect().right).to.be.lessThan(sideSheet!.getBoundingClientRect().left);
                });
            });
        });
    });

    it('does not set a transform on the controls when auto-shift-controls is absent', () => {
        cy.viewport(1200, 660);
        cy.mount(html`
            <vl-map lambert2008>
                <vl-map-legend></vl-map-legend>
                <vl-map-current-location></vl-map-current-location>
                <vl-map-action-controls>
                    <vl-map-measure-control></vl-map-measure-control>
                </vl-map-action-controls>
                <vl-map-features-layer>
                    <vl-map-measure-action></vl-map-measure-action>
                </vl-map-features-layer>
            </vl-map>
        `);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            cy.wrap(vlMap.ready).then(() => {
                cy.get('vl-map').should(() => {
                    const transformOf = (element?: HTMLElement | null) => {
                        expect(element, 'element').to.exist;
                        return window.getComputedStyle(element!).transform;
                    };
                    const shadowOf = (tag: string, selector: string) =>
                        vlMap.querySelector(tag)?.shadowRoot?.querySelector<HTMLElement>(selector);
                    expect(transformOf(vlMap.shadowRoot?.querySelector<HTMLElement>('.ol-zoom'))).to.equal('none');
                    expect(transformOf(vlMap.shadowRoot?.querySelector<HTMLElement>('.ol-scale-line'))).to.equal(
                        'none',
                    );
                    expect(transformOf(shadowOf('vl-map-legend', '.flux-map-legend'))).to.equal('none');
                    expect(transformOf(shadowOf('vl-map-current-location', '.flux-map-current-location'))).to.equal(
                        'none',
                    );
                    expect(transformOf(shadowOf('vl-map-action-controls', 'div'))).to.equal('none');
                });
            });
        });
    });

    it('recalculates the shift when the legend placement property changes', () => {
        cy.viewport(1200, 660);
        cy.mount(html`
            <vl-map lambert2008 auto-shift-controls>
                <vl-map-legend></vl-map-legend>
                <vl-map-side-sheet open><p>inhoud</p></vl-map-side-sheet>
            </vl-map>
        `);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            cy.wrap(vlMap.ready).then(() => {
                cy.get('vl-map').should(() => {
                    expect(shiftOf(vlMap, '--vl-map--shift-scale-line')).to.be.greaterThan(0);
                });
                cy.then(() => {
                    vlMap.querySelector<VlMapLegend>('vl-map-legend')!.placement = 'bottom_left';
                });
                cy.get('vl-map').should(() => {
                    const legend = vlMap
                        .querySelector('vl-map-legend')
                        ?.shadowRoot?.querySelector<HTMLElement>('.flux-map-legend');
                    const sideSheet = vlMap.querySelector<HTMLElement>('vl-map-side-sheet');
                    expect(vlMap.querySelector('vl-map-legend')!.hasAttribute('placement'), 'not reflected').to.be
                        .false;
                    expect(childShiftOf(vlMap, 'vl-map-legend', '--vl-map--shift-legend')).to.be.greaterThan(0);
                    expect(legend!.getBoundingClientRect().left).to.be.greaterThan(
                        sideSheet!.getBoundingClientRect().right,
                    );
                });
            });
        });
    });

    it('gives each legend its own shift', () => {
        cy.viewport(1200, 660);
        cy.mount(html`
            <vl-map lambert2008 auto-shift-controls>
                <vl-map-features-layer name="Shapes" .features=${features} projection-code="EPSG:31370">
                    <vl-map-layer-style name="Shapes" color="rgba(102, 51, 153, 0.6)"></vl-map-layer-style>
                </vl-map-features-layer>
                <vl-map-legend placement="top_left"></vl-map-legend>
                <vl-map-legend></vl-map-legend>
                <vl-map-side-sheet right open><p>inhoud</p></vl-map-side-sheet>
            </vl-map>
        `);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            cy.wrap(vlMap.ready).then(() => {
                cy.get('vl-map').should(() => {
                    const legends = vlMap.querySelectorAll('vl-map-legend');
                    const topLeft = legends[0].shadowRoot!.querySelector<HTMLElement>('.flux-map-legend')!;
                    const bottomRight = legends[1].shadowRoot!.querySelector<HTMLElement>('.flux-map-legend')!;
                    const mapRect = vlMap.getBoundingClientRect();
                    const sideSheetLeft = vlMap
                        .querySelector<HTMLElement>('vl-map-side-sheet')!
                        .getBoundingClientRect().left;
                    expect(childShiftOf(vlMap, 'vl-map-legend', '--vl-map--shift-legend', 1)).to.be.lessThan(0);
                    expect(bottomRight.getBoundingClientRect().right).to.be.lessThan(sideSheetLeft);
                    expect(childShiftOf(vlMap, 'vl-map-legend', '--vl-map--shift-legend', 0)).to.equal(0);
                    expect(topLeft.getBoundingClientRect().left).to.be.gte(mapRect.left);
                });
            });
        });
    });

    it('measures vl-map-action-controls without the padding of its wrapper', () => {
        cy.viewport(1200, 660);
        cy.mount(html`
            <vl-map lambert2008 auto-shift-controls>
                <vl-map-search></vl-map-search>
                <vl-map-action-controls>
                    <vl-map-measure-control></vl-map-measure-control>
                </vl-map-action-controls>
                <vl-map-features-layer>
                    <vl-map-measure-action></vl-map-measure-action>
                </vl-map-features-layer>
                <vl-map-side-sheet right open><p>inhoud</p></vl-map-side-sheet>
            </vl-map>
        `);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            cy.wrap(vlMap.ready).then(() => {
                cy.get('vl-map').should(() => {
                    const measureControl = vlMap.querySelector<HTMLElement>('vl-map-measure-control')!;
                    const sideSheetLeft = vlMap
                        .querySelector<HTMLElement>('vl-map-side-sheet')!
                        .getBoundingClientRect().left;
                    const toggleButtonRect = toggleButtonRectOf(vlMap);
                    expect(vlMap.shadowRoot?.querySelector('vl-map-search'), 'map search').to.exist;
                    expect(
                        childShiftOf(vlMap, 'vl-map-action-controls', '--vl-map--shift-action-controls'),
                    ).to.be.lessThan(0);
                    expect(measureControl.getBoundingClientRect().right).to.be.lessThan(
                        Math.min(sideSheetLeft, toggleButtonRect.left),
                    );
                });
            });
        });
    });

    it('does not shift a control that already overlaps a vl-map-search further over it', () => {
        cy.viewport(1200, 660);
        cy.mount(html`
            <vl-map lambert2008 auto-shift-controls>
                <vl-map-search></vl-map-search>
                <vl-map-features-layer name="Shapes" .features=${features} projection-code="EPSG:31370">
                    <vl-map-layer-style name="Shapes" color="rgba(102, 51, 153, 0.6)"></vl-map-layer-style>
                </vl-map-features-layer>
                <vl-map-legend placement="top_left"></vl-map-legend>
                <vl-map-side-sheet open><p>inhoud</p></vl-map-side-sheet>
            </vl-map>
        `);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            cy.wrap(vlMap.ready).then(() => {
                cy.get('vl-map').should(() => {
                    expect(vlMap.shadowRoot?.querySelector('vl-map-search'), 'map search').to.exist;
                    expect(shiftOf(vlMap, '--vl-map--shift-scale-line'), 'bottom row shifts').to.be.greaterThan(0);
                    expect(childShiftOf(vlMap, 'vl-map-legend', '--vl-map--shift-legend'), 'top row stays').to.equal(0);
                });
            });
        });
    });

    it('does not pass the shift on to a nested vl-map', () => {
        cy.viewport(1200, 660);
        cy.mount(html`
            <vl-map lambert2008 auto-shift-controls>
                <vl-map-side-sheet right open style="--vl-side-sheet-width: 50%">
                    <vl-map lambert2008 id="nested"></vl-map>
                </vl-map-side-sheet>
            </vl-map>
        `);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            const nested = vlMap.querySelector<VlMap>('#nested')!;
            cy.wrap(vlMap.ready).then(() => {
                cy.wrap(nested.ready).then(() => {
                    cy.get('vl-map').should(() => {
                        const nestedZoom = nested.shadowRoot!.querySelector<HTMLElement>('.ol-zoom')!;
                        expect(shiftOf(vlMap, '--vl-map--shift-zoom'), 'outer map shifts').to.be.lessThan(0);
                        expect(window.getComputedStyle(nestedZoom).transform).to.equal('none');
                    });
                });
            });
        });
    });

    it('leaves the controls of a nested vl-map and the content of a side-sheet alone', () => {
        cy.viewport(1200, 660);
        cy.mount(html`
            <vl-map lambert2008 auto-shift-controls id="outer">
                <vl-map-side-sheet right open style="--vl-side-sheet-width: 50%">
                    <vl-map-legend id="sheet-legend"></vl-map-legend>
                    <vl-map lambert2008 id="nested">
                        <vl-map-legend id="nested-legend"></vl-map-legend>
                        <vl-map-current-location id="nested-location"></vl-map-current-location>
                    </vl-map>
                </vl-map-side-sheet>
            </vl-map>
        `);
        cy.runTestFor<VlMap>('vl-map#outer', (vlMap) => {
            const nested = vlMap.querySelector<VlMap>('#nested')!;
            cy.wrap(vlMap.ready).then(() => {
                cy.wrap(nested.ready).then(() => {
                    cy.get('vl-map#outer').should(() => {
                        expect(shiftOf(vlMap, '--vl-map--shift-zoom'), 'outer map shifts').to.be.lessThan(0);
                        const inlineShift = (selector: string, property: string) =>
                            vlMap.querySelector<HTMLElement>(selector)!.style.getPropertyValue(property);
                        expect(inlineShift('#sheet-legend', '--vl-map--shift-legend'), 'legend in sheet').to.equal('');
                        expect(inlineShift('#nested-legend', '--vl-map--shift-legend'), 'nested legend').to.equal('');
                        expect(
                            inlineShift('#nested-location', '--vl-map--shift-current-location'),
                            'nested current location',
                        ).to.equal('');
                    });
                });
            });
        });
    });

    it('ignores an open side-sheet of a nested vl-map', () => {
        cy.viewport(1200, 660);
        cy.mount(html`
            <vl-map lambert2008 auto-shift-controls id="outer">
                <vl-map-side-sheet right open style="--vl-side-sheet-width: 50%">
                    <vl-map lambert2008 id="nested">
                        <vl-map-side-sheet left open><p>inhoud</p></vl-map-side-sheet>
                    </vl-map>
                </vl-map-side-sheet>
            </vl-map>
        `);
        cy.runTestFor<VlMap>('vl-map#outer', (vlMap) => {
            const nested = vlMap.querySelector<VlMap>('#nested')!;
            cy.wrap(vlMap.ready).then(() => {
                cy.wrap(nested.ready).then(() => {
                    cy.get('vl-map#outer').should(() => {
                        expect(shiftOf(vlMap, '--vl-map--shift-zoom'), 'outer zoom shifts').to.be.lessThan(0);
                        expect(shiftOf(vlMap, '--vl-map--shift-scale-line'), 'outer scale stays').to.equal(0);
                    });
                });
            });
        });
    });

    it('does not shift anything while the side-sheet is modal on a small screen', () => {
        cy.viewport(375, 812);
        cy.mount(html`
            <vl-map lambert2008 auto-shift-controls allow-fullscreen>
                <vl-map-current-location></vl-map-current-location>
                <vl-map-side-sheet right open><p>inhoud</p></vl-map-side-sheet>
            </vl-map>
        `);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            cy.wrap(vlMap.ready).then(() => {
                cy.get('vl-map').should(() => {
                    const scaleLine = vlMap.shadowRoot?.querySelector<HTMLElement>('.ol-scale-line');
                    expect(scaleLine!.getBoundingClientRect().width, 'scale line rendered').to.be.greaterThan(0);
                });
                afterTwoFrames();
                afterTwoFrames().then(() => {
                    expect(
                        childShiftOf(vlMap, 'vl-map-current-location', '--vl-map--shift-current-location'),
                        'current location',
                    ).to.equal(0);
                    expect(shiftOf(vlMap, '--vl-map--shift-full-screen'), 'fullscreen').to.equal(0);
                    expect(shiftOf(vlMap, '--vl-map--shift-zoom'), 'zoom').to.equal(0);
                });
            });
        });
    });
});
