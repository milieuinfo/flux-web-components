import { registerWebComponents } from '@domg-wc/common';
import { html } from 'lit';
import { VlMap } from '../../../../vl-map';
import { VlMapBaseLayerGRBGray } from '../../../baselayer/vl-map-base-layer-grb-gray/vl-map-base-layer-grb-gray';
import { VlMapFeaturesLayer } from '../../../layer/vector-layer/vl-map-features-layer/vl-map-features-layer';
import { VlMapWfsLayer } from '../../../layer/vector-layer/vl-map-wfs-layer/vl-map-wfs-layer';
import { VlMapDrawPolygonAction } from '../draw-polygon-action/vl-map-draw-polygon-action';
import { VlMapDrawActionStyle } from './vl-map-draw-action-style';

registerWebComponents([
    VlMap,
    VlMapWfsLayer,
    VlMapBaseLayerGRBGray,
    VlMapFeaturesLayer,
    VlMapDrawPolygonAction,
    VlMapDrawActionStyle,
]);

describe('cypress-component - map - vl-map-draw-action-style', () => {
    beforeEach(() => {
        cy.mount(html`
            <vl-map lambert2008>
                <vl-map-baselayer-grb-gray></vl-map-baselayer-grb-gray>
                <vl-map-features-layer>
                    <vl-map-draw-polygon-action .active=${true} default-active=${true}>
                        <vl-map-draw-action-style
                            color="rgb(255, 105, 180)"
                            border-color="rgb(0, 191, 255)"
                            border-size="3"
                            circle-color="rgb(230, 230, 250)"
                            circle-border-color="rgb(255, 255, 0)"
                            circle-border-size="2"
                            circle-size="5"
                        ></vl-map-draw-action-style>
                    </vl-map-draw-polygon-action>
                </vl-map-features-layer>
            </vl-map>
        `);
    });

    it('should set the fill color of the parent draw-action', () => {
        cy.get('vl-map-draw-action-style').then(($styleElement) => {
            // @ts-ignore
            const drawActionElementStyle = $styleElement[0].parentNode.style;

            expect(drawActionElementStyle.getFill().getColor()).to.eq('rgb(255, 105, 180)');
        });
    });

    it('should set the stroke color of the parent draw-action', () => {
        cy.get('vl-map-draw-action-style').then(($styleElement) => {
            // @ts-ignore
            const drawActionElementStyle = $styleElement[0].parentNode.style;

            expect(drawActionElementStyle.getStroke().getColor()).to.eq('rgb(0, 191, 255)');
        });
    });

    it('should set the stroke width of the parent draw-action', () => {
        cy.get('vl-map-draw-action-style').then(($styleElement) => {
            // @ts-ignore
            const drawActionElementStyle = $styleElement[0].parentNode.style;

            expect(drawActionElementStyle.getStroke().getWidth()).to.eq('3');
        });
    });

    it('should set the circle fill color of the parent draw-action', () => {
        cy.get('vl-map-draw-action-style').then(($styleElement) => {
            // @ts-ignore
            const drawActionElementStyle = $styleElement[0].parentNode.style;

            expect(drawActionElementStyle.getImage().getFill().getColor()).to.eq('rgb(230, 230, 250)');
        });
    });

    it('should set the circle stroke color of the parent draw-action', () => {
        cy.get('vl-map-draw-action-style').then(($styleElement) => {
            // @ts-ignore
            const drawActionElementStyle = $styleElement[0].parentNode.style;

            expect(drawActionElementStyle.getImage().getStroke().getColor()).to.eq('rgb(255, 255, 0)');
        });
    });

    it('should set the circle stroke width of the parent draw-action', () => {
        cy.get('vl-map-draw-action-style').then(($styleElement) => {
            // @ts-ignore
            const drawActionElementStyle = $styleElement[0].parentNode.style;

            expect(drawActionElementStyle.getImage().getStroke().getWidth()).to.eq('2');
        });
    });

    it('should set the circle radius of the parent draw-action', () => {
        cy.get('vl-map-draw-action-style').then(($styleElement) => {
            // @ts-ignore
            const drawActionElementStyle = $styleElement[0].parentNode.style;

            expect(drawActionElementStyle.getImage().getRadius()).to.eq('5');
        });
    });
});
