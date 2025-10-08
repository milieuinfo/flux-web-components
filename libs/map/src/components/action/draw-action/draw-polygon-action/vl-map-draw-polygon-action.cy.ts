import { registerWebComponents } from '@domg-wc/common';
import { html } from 'lit';
import { VlCompositeVectorLayer } from '../../../..//actions/layer/composite-vector-layer';
import { VlCompositeVectorSource } from '../../../../actions/source/composite-vector-source';
import { VlMap } from '../../../../vl-map';
import { VlMapLayerStyle } from '../../../layer-style/vl-map-layer-style';
import { VlMapFeaturesLayer } from '../../../layer/vector-layer/vl-map-features-layer/vl-map-features-layer';
import { VlMapWfsLayer } from '../../../layer/vector-layer/vl-map-wfs-layer/vl-map-wfs-layer';
import { VlMapDrawPolygonAction } from './vl-map-draw-polygon-action';

registerWebComponents([VlMap, VlMapFeaturesLayer, VlMapDrawPolygonAction, VlMapWfsLayer, VlMapLayerStyle]);

const mapDrawPolygonActionSnappingWfsLayersFixture = html`
    <vl-map id="map-with-draw-polygon-snap-action">
        <vl-map-features-layer id="polygon-layer">
            <vl-map-draw-polygon-action
                id="draw-polygon-snap-action"
                default-active
                snapping
                snapping-pixel-tolerance="1000"
            >
                <vl-map-wfs-layer
                    id="stromendwater"
                    name="Stromend waterlichamen"
                    url="https://geoserver.vmm.be/geoserver/vmm/wfs"
                    layers="owl_l"
                    max-resolution="4"
                >
                    <vl-map-layer-style
                        color="rgba(6, 163, 247, 0.4)"
                        border-size="4"
                        border-color="rgba(6, 163, 247, 1)"
                    ></vl-map-layer-style>
                </vl-map-wfs-layer>
                <vl-map-wfs-layer
                    id="stilstaandwater"
                    name="Stilstaand waterlichamen"
                    url="https://gisservices.inbo.be/arcgis/services/Watervlakken/MapServer/WFSServer?service=wfs"
                    layers="Watervlakken"
                    max-resolution="4"
                >
                    <vl-map-layer-style
                        color="rgba(6, 163, 247, 0.4)"
                        border-size="4"
                        border-color="rgba(6, 163, 247, 1)"
                    ></vl-map-layer-style>
                </vl-map-wfs-layer>
            </vl-map-draw-polygon-action>
        </vl-map-features-layer>
    </vl-map>
`;

const mapDrawPolygonActionSnapping = html`
    <vl-map id="map-with-draw-polygon-snap-action">
        <vl-map-features-layer id="polygon-layer">
            <vl-map-draw-polygon-action id="draw-polygon-snap-action" default-active snapping>
            </vl-map-draw-polygon-action>
        </vl-map-features-layer>
    </vl-map>
`;

describe('cypress-component - map - vl-map-draw-polygon-action', () => {
    it('a polygon draw action is a map action', () => {
        expect(VlMapDrawPolygonAction.isVlMapAction()).to.be.true;
    });

    it('snapping is properly configured if the snapping attribute is there but without layers', () => {
        cy.mount(mapDrawPolygonActionSnapping);
        cy.runTestFor2<VlMap, VlMapDrawPolygonAction>(
            'vl-map',
            'vl-map-draw-polygon-action',
            (vlMap, vlMapDrawPolygonAction) => {
                cy.wrap(vlMap.ready).then(() => {
                    expect(vlMapDrawPolygonAction.action.options.snapping).to.equal(true);
                });
            }
        );
    });

    it('snapping is properly configured if there are layers and pixel tolerance', () => {
        cy.mount(mapDrawPolygonActionSnappingWfsLayersFixture);
        cy.runTestFor2<VlMap, VlMapDrawPolygonAction>(
            'vl-map',
            'vl-map-draw-polygon-action',
            (vlMap, vlMapDrawPolygonAction) => {
                cy.wrap(vlMap.ready).then(() => {
                    const drawActionOptions = vlMapDrawPolygonAction.action.options;
                    expect(drawActionOptions.snapping.pixelTolerance).to.equal('1000');
                    expect(drawActionOptions.snapping.node).to.equal(false);
                    expect(drawActionOptions.snapping.vertex).to.equal(false);
                    expect(drawActionOptions.snapping.layer instanceof VlCompositeVectorLayer).to.equal(true);
                    expect(drawActionOptions.snapping.layer.getSource() instanceof VlCompositeVectorSource).to.equal(
                        true
                    );
                    cy.runTestFor<VlMapWfsLayer>(`#stromendwater`, (stromendWaterLayer) => {
                        expect(drawActionOptions.snapping.layer.getSource().sources[0]).to.equal(
                            stromendWaterLayer._layer.getSource()
                        );
                        expect(drawActionOptions.snapping.layer.getStyle()).to.equal(stromendWaterLayer.style);
                    });
                    cy.runTestFor<VlMapWfsLayer>(`#stilstaandwater`, (stilstaandWaterLayer) => {
                        expect(drawActionOptions.snapping.layer.getSource().sources[1]).to.equal(
                            stilstaandWaterLayer._layer.getSource()
                        );
                    });
                });
            }
        );
    });
});
