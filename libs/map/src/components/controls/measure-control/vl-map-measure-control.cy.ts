import { registerWebComponents } from '@domg-wc/common-utilities';
import { html } from 'lit';
import { VlMap } from '../../../vl-map';
import { VlMapMeasureAction } from '../../action/draw-action/measure-action/vl-map-measure-action';
import { VlMapBaseLayerGRBGray } from '../../baselayer/vl-map-base-layer-grb-gray/vl-map-base-layer-grb-gray';
import { VlMapFeaturesLayer } from '../../layer/vector-layer/vl-map-features-layer/vl-map-features-layer';
import { VlMapActionControls } from '../vl-map-action-controls';
import { VlMapMeasureControl } from './vl-map-measure-control';

registerWebComponents([
    VlMap,
    VlMapBaseLayerGRBGray,
    VlMapFeaturesLayer,
    VlMapActionControls,
    VlMapMeasureAction,
    VlMapMeasureControl,
]);

const measureControlFixture = html`
    <vl-map lambert2008>
        <vl-map-baselayer-grb-gray></vl-map-baselayer-grb-gray>
        <vl-map-action-controls>
            <vl-map-measure-control></vl-map-measure-control>
        </vl-map-action-controls>
        <vl-map-features-layer>
            <vl-map-measure-action></vl-map-measure-action>
        </vl-map-features-layer>
    </vl-map>
`;

describe('vl-map-measure-control', () => {
    it('the measure control is configured correctly', () => {
        cy.mount(measureControlFixture);
        cy.runTestFor<VlMapMeasureControl>('vl-map-measure-control', (vlMapMeasureControl) => {
            expect(vlMapMeasureControl).to.not.be.null;
            expect(vlMapMeasureControl.controlElement.tagName.toLowerCase()).to.be.equal('vl-button-next');
            expect(vlMapMeasureControl.identifier).to.be.equal('measure');
            expect(vlMapMeasureControl.type).to.be.equal('action');
        });
    });

    it('the measure control will be added to the map', () => {
        cy.mount(measureControlFixture);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            const controls = vlMap.map.getControls().getArray();
            expect(
                !!controls.find((control) => control.get('element') && control.get('element').identifier === 'measure')
            ).to.be.true;
        });
    });

    it('the measure action of the measure control can be requested', () => {
        cy.mount(measureControlFixture);
        cy.runTestFor2<VlMap, VlMapMeasureControl>('vl-map', 'vl-map-measure-control', (vlMap, vlMapMeasureControl) => {
            cy.wrap(vlMap.ready).then(() => {
                expect(!!vlMapMeasureControl).to.be.true;
                const measureAction = vlMapMeasureControl.getAction();
                expect(!!measureAction).to.be.true;
                expect(measureAction.element.identifier).to.be.equal(vlMapMeasureControl.identifier);
            });
        });
    });

    it('the measure control can be activated and deactivated', () => {
        it('the measure control is configured correctly', () => {
            cy.mount(measureControlFixture);
            cy.runTestFor<VlMapMeasureControl>('vl-map-measure-control', (vlMapMeasureControl) => {
                expect(vlMapMeasureControl.controlElement.on).to.be.false;
                vlMapMeasureControl.setActive(true);
                expect(vlMapMeasureControl.controlElement.on).to.be.true;
                vlMapMeasureControl.setActive(false);
                expect(vlMapMeasureControl.controlElement.on).to.be.false;
            });
        });
    });

    it('the measure control can be disabled and enabled', () => {
        cy.mount(measureControlFixture);
        cy.runTestFor<VlMapMeasureControl>('vl-map-measure-control', (vlMapMeasureControl) => {
            expect(vlMapMeasureControl.controlElement.disabled).to.be.false;
            vlMapMeasureControl.setDisabled(true);
            expect(vlMapMeasureControl.controlElement.disabled).to.be.true;
            vlMapMeasureControl.setDisabled(false);
            expect(vlMapMeasureControl.controlElement.disabled).to.be.false;
        });
    });
});
