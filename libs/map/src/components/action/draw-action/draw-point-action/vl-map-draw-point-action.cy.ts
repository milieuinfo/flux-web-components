import { registerWebComponents } from '@domg-wc/common';
import { html } from 'lit';
import { VlCompositeVectorLayer } from '../../../..//actions/layer/composite-vector-layer';
import { VlCompositeVectorSource } from '../../../../actions/source/composite-vector-source';
import { VlMap } from '../../../../vl-map';
import { VlMapLayerStyle } from '../../../layer-style/vl-map-layer-style';
import { VlMapFeaturesLayer } from '../../../layer/vector-layer/vl-map-features-layer/vl-map-features-layer';
import { VlMapWfsLayer } from '../../../layer/vector-layer/vl-map-wfs-layer/vl-map-wfs-layer';
import { VlMapDrawPointAction } from './vl-map-draw-point-action';

registerWebComponents([VlMap, VlMapFeaturesLayer, VlMapDrawPointAction, VlMapWfsLayer, VlMapLayerStyle]);

const mapDrawPointActionSnappingWfsLayersFixture = html`
    <vl-map id="map-with-draw-point-snap-action">
        <vl-map-features-layer id="point-layer">
            <vl-map-draw-point-action
                id="draw-point-snap-action"
                data-vl-default-active
                data-vl-snapping
                data-vl-snapping-pixel-tolerance="1000"
            >
                <vl-map-wfs-layer
                    id="stromendwater"
                    data-vl-name="Stromend waterlichamen"
                    data-vl-url="https://geoserver.vmm.be/geoserver/vmm/wfs"
                    data-vl-layers="owl_l"
                    data-vl-max-resolution="4"
                >
                    <vl-map-layer-style
                        data-vl-color="rgba(6, 163, 247, 0.4)"
                        data-vl-border-size="4"
                        data-vl-border-color="rgba(6, 163, 247, 1)"
                    ></vl-map-layer-style>
                </vl-map-wfs-layer>
                <vl-map-wfs-layer
                    id="stilstaandwater"
                    data-vl-name="Stilstaand waterlichamen"
                    data-vl-url="https://gisservices.inbo.be/arcgis/services/Watervlakken/MapServer/WFSServer?service=wfs"
                    data-vl-layers="Watervlakken"
                    data-vl-max-resolution="4"
                >
                    <vl-map-layer-style
                        data-vl-color="rgba(6, 163, 247, 0.4)"
                        data-vl-border-size="4"
                        data-vl-border-color="rgba(6, 163, 247, 1)"
                    ></vl-map-layer-style>
                </vl-map-wfs-layer>
            </vl-map-draw-point-action>
        </vl-map-features-layer>
    </vl-map>
`;

const mapDrawPointActionSnapping = html`
    <vl-map id="map-with-draw-point-snap-action">
        <vl-map-features-layer id="point-layer">
            <vl-map-draw-point-action id="draw-point-snap-action" data-vl-default-active data-vl-snapping>
            </vl-map-draw-point-action>
        </vl-map-features-layer>
    </vl-map>
`;

describe('vl-map-draw-point-action', () => {
    it('a dot draw action is a map action', () => {
        expect(VlMapDrawPointAction.isVlMapAction()).to.be.true;
    });

    it('snapping is properly configured if the snapping attribute is there but without layers', () => {
        cy.mount(mapDrawPointActionSnapping);
        cy.runTestFor2<VlMap, VlMapDrawPointAction>(
            'vl-map',
            'vl-map-draw-point-action',
            (vlMap, vlMapDrawPointAction) => {
                cy.wrap(vlMap.ready).then(() => {
                    expect(vlMapDrawPointAction.action.options.snapping).to.equal(true);
                });
            }
        );
    });

    it('snapping is properly configured if there are layers and pixel tolerance', () => {
        cy.mount(mapDrawPointActionSnappingWfsLayersFixture);
        cy.runTestFor2<VlMap, VlMapDrawPointAction>(
            'vl-map',
            'vl-map-draw-point-action',
            (vlMap, vlMapDrawPointAction) => {
                cy.wrap(vlMap.ready).then(() => {
                    const drawActionOptions = vlMapDrawPointAction.action.options;
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
