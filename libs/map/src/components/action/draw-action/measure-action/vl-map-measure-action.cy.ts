import { registerWebComponents } from '@domg-wc/common';
import { html } from 'lit';
import { VlCompositeVectorLayer } from '../../../..//actions/layer/composite-vector-layer';
import { VlCompositeVectorSource } from '../../../../actions/source/composite-vector-source';
import { VlMap } from '../../../../vl-map';
import { VlMapLayerStyle } from '../../../layer-style/vl-map-layer-style';
import { VlMapFeaturesLayer } from '../../../layer/vector-layer/vl-map-features-layer/vl-map-features-layer';
import { VlMapWfsLayer } from '../../../layer/vector-layer/vl-map-wfs-layer/vl-map-wfs-layer';
import { VlMapMeasureAction } from './vl-map-measure-action';

registerWebComponents([VlMap, VlMapFeaturesLayer, VlMapMeasureAction, VlMapWfsLayer, VlMapLayerStyle]);

const mapMeasureActionASnappingWfsLayersFixture = html`
    <vl-map id="map-with-measure-snap-action">
        <vl-map-features-layer id="point-layer">
            <vl-map-measure-action
                id="measure-snap-action"
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
            </vl-map-measure-action>
        </vl-map-features-layer>
    </vl-map>
`;

const mapMeasureActionSnappingFixture = html`
    <vl-map id="map-with-measure-snap-action">
        <vl-map-features-layer id="point-layer">
            <vl-map-measure-action id="measure-snap-action" data-vl-default-active data-vl-snapping>
            </vl-map-measure-action>
        </vl-map-features-layer>
    </vl-map>
`;

const mapMeasureActionFixture = html`
    <vl-map>
        <vl-map-features-layer>
            <vl-map-measure-action></vl-map-measure-action>
        </vl-map-features-layer>
    </vl-map>
`;

describe('vl-map-measure-action', () => {
    it('a measure action is a map action', () => {
        expect(VlMapMeasureAction.isVlMapAction()).to.be.true;
    });

    it('measure action has the correct identifier', () => {
        cy.mount(mapMeasureActionFixture);
        cy.runTestFor2<VlMap, VlMapMeasureAction>('vl-map', 'vl-map-measure-action', (vlMap, vlMapMeasureAction) => {
            cy.wrap(vlMap.ready).then(() => {
                expect(vlMapMeasureAction.identifier).to.equal('measure');
            });
        });
    });

    it('snapping is properly configured if the snapping attribute is there but without layers', () => {
        cy.mount(mapMeasureActionSnappingFixture);
        cy.runTestFor2<VlMap, VlMapMeasureAction>('vl-map', 'vl-map-measure-action', (vlMap, vlMapMeasureAction) => {
            cy.wrap(vlMap.ready).then(() => {
                expect(vlMapMeasureAction.action.options.snapping).to.equal(true);
            });
        });
    });

    it('snapping is properly configured if there are layers and pixel tolerance', () => {
        cy.mount(mapMeasureActionASnappingWfsLayersFixture);
        cy.runTestFor2<VlMap, VlMapMeasureAction>('vl-map', 'vl-map-measure-action', (vlMap, vlMapMeasureAction) => {
            cy.wrap(vlMap.ready).then(() => {
                const measureActionsOptions = vlMapMeasureAction.action.options;
                expect(measureActionsOptions.snapping.pixelTolerance).to.equal('1000');
                expect(measureActionsOptions.snapping.node).to.equal(false);
                expect(measureActionsOptions.snapping.vertex).to.equal(false);
                expect(measureActionsOptions.snapping.layer instanceof VlCompositeVectorLayer).to.equal(true);
                expect(measureActionsOptions.snapping.layer.getSource() instanceof VlCompositeVectorSource).to.equal(
                    true
                );
                cy.runTestFor<VlMapWfsLayer>(`#stromendwater`, (stromendWaterLayer) => {
                    expect(measureActionsOptions.snapping.layer.getSource().sources[0]).to.equal(
                        stromendWaterLayer._layer.getSource()
                    );
                    expect(measureActionsOptions.snapping.layer.getStyle()).to.equal(stromendWaterLayer.style);
                });
                cy.runTestFor<VlMapWfsLayer>(`#stilstaandwater`, (stilstaandWaterLayer) => {
                    expect(measureActionsOptions.snapping.layer.getSource().sources[1]).to.equal(
                        stilstaandWaterLayer._layer.getSource()
                    );
                });
            });
        });
    });
});
