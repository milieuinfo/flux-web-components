import { registerWebComponents } from '@domg-wc/common';
import { html } from 'lit';
import { VlCompositeVectorLayer } from '../../../..//actions/layer/composite-vector-layer';
import { VlCompositeVectorSource } from '../../../../actions/source/composite-vector-source';
import { VlMap } from '../../../../vl-map';
import { VlMapLayerStyle } from '../../../layer-style/vl-map-layer-style';
import { VlMapFeaturesLayer } from '../../../layer/vector-layer/vl-map-features-layer/vl-map-features-layer';
import { VlMapWfsLayer } from '../../../layer/vector-layer/vl-map-wfs-layer/vl-map-wfs-layer';
import { VlTestCustomMapModifyAction } from './test-custom-map-modify-action';
import { VlMapModifyAction } from './vl-map-modify-action';

registerWebComponents([
    VlMap,
    VlMapFeaturesLayer,
    VlMapWfsLayer,
    VlMapLayerStyle,
    VlMapModifyAction,
    VlTestCustomMapModifyAction,
]);

const mapModifyActionFixture = html`
    <vl-map>
        <vl-map-features-layer>
            <vl-map-modify-action></vl-map-modify-action>
        </vl-map-features-layer>
    </vl-map>
`;

const mapModifyActionSnappingWfsLayersFixture = html`
    <vl-map>
        <vl-map-features-layer>
            <vl-map-modify-action data-vl-snapping data-vl-snapping-pixel-tolerance="1000">
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
            </vl-map-modify-action>
        </vl-map-features-layer>
    </vl-map>
`;

const customMapModifyActionFixture = html`
    <vl-map>
        <vl-map-features-layer>
            <vl-custom-map-modify-action></vl-custom-map-modify-action>
        </vl-map-features-layer>
    </vl-map>
`;

describe('vl-map-modify-action', () => {
    it('a modify action is a map action', () => {
        expect(VlMapModifyAction.isVlMapAction()).to.be.true;
    });

    it('after the modify action is finished, the onModify callback will be called', () => {
        cy.mount(mapModifyActionFixture);
        cy.runTestFor2<VlMap, VlMapModifyAction>('vl-map', 'vl-map-modify-action', (vlMap, vlMapModifyAction) => {
            cy.wrap(vlMap.ready).then(() => {
                let featureModified = false;
                vlMapModifyAction.onModify(() => {
                    featureModified = true;
                });
                (vlMapModifyAction.action as any).modifyInteraction.dispatchEvent({
                    type: 'modifyend',
                    features: ['gewijzigdeFeature'],
                });
                expect(featureModified).to.be.true;
            });
        });
    });

    it('snapping is enabled even when there are no specific snapping layers', () => {
        cy.mount(mapModifyActionFixture);
        cy.runTestFor2<VlMap, VlMapModifyAction>('vl-map', 'vl-map-modify-action', (vlMap, vlMapModifyAction) => {
            cy.wrap(vlMap.ready).then(() => {
                expect(vlMapModifyAction.action.options.snapping).to.equal(true);
            });
        });
    });

    it('snapping is properly configured when there are layers and a pixel tolerance was configured', () => {
        cy.mount(mapModifyActionSnappingWfsLayersFixture);
        cy.runTestFor2<VlMap, VlMapModifyAction>('vl-map', 'vl-map-modify-action', (vlMap, vlMapModifyAction) => {
            cy.wrap(vlMap.ready).then(() => {
                const modifyActionOptions = vlMapModifyAction.action.options;
                expect(modifyActionOptions.snapping.pixelTolerance).to.equal('1000');
                expect(modifyActionOptions.snapping.node).to.equal(false);
                expect(modifyActionOptions.snapping.vertex).to.equal(false);
                expect(modifyActionOptions.snapping.layer instanceof VlCompositeVectorLayer).to.equal(true);
                expect(modifyActionOptions.snapping.layer.getSource() instanceof VlCompositeVectorSource).to.equal(
                    true
                );
                expect(modifyActionOptions.snapping.layer.getSource().sources[0]).to.equal(
                    vlMap.querySelector('#stromendwater')['_layer'].getSource()
                );
                expect(modifyActionOptions.snapping.layer.getSource().sources[1]).to.equal(
                    vlMap.querySelector('#stilstaandwater')['_layer'].getSource()
                );
                expect(modifyActionOptions.snapping.layer.getStyle()).to.equal(
                    vlMap.querySelector('#stromendwater').style
                );
            });
        });
    });

    it('the event listener that listens to style changes on snapping layers will be removed when the action gets disconnected', () => {
        cy.mount(mapModifyActionSnappingWfsLayersFixture);
        cy.runTestFor2<VlMap, VlMapModifyAction>('vl-map', 'vl-map-modify-action', (vlMap, vlMapModifyAction) => {
            cy.wrap(vlMap.ready).then(() => {
                const stromendWaterLayer = vlMap.querySelector('#stromendwater');
                const removeSpy = cy.stub(stromendWaterLayer, 'removeEventListener');
                vlMapModifyAction.remove();
                expect(removeSpy).to.be.calledOnce;
            });
        });
    });

    it('changes to the snapping attribute reprocesses the action', () => {
        cy.mount(mapModifyActionFixture);
        cy.runTestFor2<VlMap, VlMapModifyAction>('vl-map', 'vl-map-modify-action', (vlMap, vlMapModifyAction) => {
            cy.wrap(vlMap.ready).then(() => {
                const processSpy = cy.stub(vlMapModifyAction, '_processAction');
                vlMapModifyAction.setAttribute('data-vl-snapping', '');
                expect(processSpy).to.be.calledOnce;
            });
        });
    });

    it('changes to the snapping pixel tolerance attribute reprocesses the action', () => {
        cy.mount(mapModifyActionFixture);
        cy.runTestFor2<VlMap, VlMapModifyAction>('vl-map', 'vl-map-modify-action', (vlMap, vlMapModifyAction) => {
            cy.wrap(vlMap.ready).then(() => {
                const processSpy = cy.stub(vlMapModifyAction, '_processAction');
                vlMapModifyAction.setAttribute('data-vl-snapping-pixel-tolerance', '100');
                expect(processSpy).to.be.calledOnce;
            });
        });
    });

    it('the filter for the modify action returns true by default', () => {
        cy.mount(customMapModifyActionFixture);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            cy.wrap(vlMap.ready).then(() => {
                const action = vlMap.map.actions[0];
                expect(action.filter()).to.be.true;
            });
        });
    });

    it('the filter for the modify action can be overridden', () => {
        cy.mount(customMapModifyActionFixture);
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
