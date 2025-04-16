import { registerWebComponents } from '@domg-wc/common';
import { html } from 'lit';
import { VlMap } from '../../vl-map';
import { VlMapLayerStyle } from '../layer-style/vl-map-layer-style';
import { VlMapFeaturesLayer } from '../layer/vector-layer/vl-map-features-layer/vl-map-features-layer';
import { VlMapLayerCircleStyle } from './vl-map-layer-circle-style/vl-map-layer-circle-style';

registerWebComponents([VlMap, VlMapFeaturesLayer, VlMapLayerStyle, VlMapLayerCircleStyle]);

const mapLayerStyleFixture = html`
    <vl-map>
        <vl-map-features-layer>
            <vl-map-layer-style></vl-map-layer-style>
        </vl-map-features-layer>
    </vl-map>
`;

const mapLayerCircleStyleFixture = html`
    <vl-map>
        <vl-map-features-layer>
            <vl-map-layer-circle-style></vl-map-layer-circle-style>
        </vl-map-features-layer>
    </vl-map>
`;

const mapLayerStyleMetTextFeatureAttributeNameFixture = html`
    <vl-map>
        <vl-map-features-layer>
            <vl-map-layer-style data-vl-text-feature-attribute-name="label"></vl-map-layer-style>
        </vl-map-features-layer>
    </vl-map>
`;

const mapLayerStyleMetPropertiesFixture = html`
    <vl-map>
        <vl-map-features-layer>
            <vl-map-layer-style
                data-vl-color="rgba(255,0,0,0.5)"
                data-vl-border-color="rgba(255,255,100,1)"
                data-vl-border-size="2"
                data-vl-text-feature-attribute-name="label"
                data-vl-text-background-color="rgba(0,0,255,0.2)"
                data-vl-text-border-color="rgba(0,255,0,1)"
                data-vl-text-border-size="3"
                data-vl-text-color="rgba(255,0,0,1)"
                data-vl-text-offset-x="10"
                data-vl-text-offset-y="-10"
                data-vl-text-size="13px"
            ></vl-map-layer-style>
        </vl-map-features-layer>
    </vl-map>
`;

const mapLayerStyleMetMeerdereStijlenFixture = html`
    <vl-map>
        <vl-map-features-layer>
            <vl-map-layer-style id="map-layer-style-red" data-vl-color="rgba(255,0,0,0.8)"></vl-map-layer-style>
            <vl-map-layer-style id="map-layer-style-green" data-vl-color="rgba(0,255,0,0.8)"></vl-map-layer-style>
        </vl-map-features-layer>
    </vl-map>
`;

describe('vl-map-layer-style', () => {
    it('de style wordt goed geconfigureerd met default properties', () => {
        cy.mount(mapLayerStyleFixture);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            cy.wrap(vlMap.ready).then(() => {
                const vlMapLayerStyleElement = vlMap.querySelector('vl-map-layer-style');
                expect(vlMapLayerStyleElement.color).to.be.equal('rgba(2, 85, 204, 0.8)');
                expect(vlMapLayerStyleElement.borderColor).to.be.equal('rgba(2, 85, 204, 1)');
                expect(vlMapLayerStyleElement.borderSize).to.be.equal(1);
                expect(vlMapLayerStyleElement.textBackgroundColor).to.be.equal('rgba(0, 0, 0, 0)');
                expect(vlMapLayerStyleElement.textBorderColor).to.be.equal('rgba(255, 255, 255, 0)');
                expect(vlMapLayerStyleElement.textBorderSize).to.be.equal(1);
                expect(vlMapLayerStyleElement.textColor).to.be.equal('#FFF');
                expect(vlMapLayerStyleElement.textFeatureAttributeName).to.be.null;
                expect(vlMapLayerStyleElement.featureAttributeName).to.be.undefined;
                expect(vlMapLayerStyleElement.featureAttributeValue).to.be.undefined;
                expect(vlMapLayerStyleElement.textOffsetX).to.be.equal(0);
                expect(vlMapLayerStyleElement.textOffsetY).to.be.equal(0);
                expect(vlMapLayerStyleElement.textSize).to.be.equal('10px');
                const style = vlMapLayerStyleElement.style();
                expect(style.getFill().getColor()).to.be.equal('rgba(2, 85, 204, 0.8)');
                expect(style.getStroke().getColor()).to.be.equal('rgba(2, 85, 204, 1)');
                expect(style.getStroke().getWidth()).to.be.equal(1);
                expect(style.getText().getFill().getColor()).to.be.equal('#FFF');
                expect(style.getText().getOffsetX()).to.be.equal(0);
                expect(style.getText().getOffsetY()).to.be.equal(0);
                expect(style.getText().getFont()).to.be.equal('10px "Flanders Art Sans",sans-serif');
                expect(style.getText().getBackgroundFill().getColor()).to.be.equal('rgba(0, 0, 0, 0)');
                expect(style.getText().getStroke().getColor()).to.be.equal('rgba(255, 255, 255, 0)');
                expect(style.getText().getStroke().getWidth()).to.be.equal(1);
                expect(style.getText().getText()).to.be.equal('');
            });
        });
    });

    it('de layer-style geeft null terug als de stijl niet valid is voor een feature', () => {
        cy.mount(mapLayerStyleFixture);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            cy.wrap(vlMap.ready).then(() => {
                const styleElement = vlMap.querySelector('vl-map-layer-style');
                styleElement.appliesTo = () => false;
                expect(styleElement.style()).to.be.null;
            });
        });
    });

    it('de layer-circle-style geeft null terug als de stijl niet valid is voor een feature', () => {
        cy.mount(mapLayerCircleStyleFixture);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            cy.wrap(vlMap.ready).then(() => {
                const styleElement = vlMap.querySelector('vl-map-layer-circle-style');
                styleElement.appliesTo = () => false;
                expect(styleElement.style()).to.be.null;
            });
        });
    });

    it('de layer-style geeft niet null terug als de stijl valid is', () => {
        cy.mount(mapLayerStyleFixture);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            cy.wrap(vlMap.ready).then(() => {
                const styleElement = vlMap.querySelector('vl-map-layer-style');
                styleElement.appliesTo = () => true;
                expect(styleElement.style()).to.be.not.null;
            });
        });
    });

    it('de layer-circle-style geeft niet null terug als de stijl valid is', () => {
        cy.mount(mapLayerCircleStyleFixture);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            cy.wrap(vlMap.ready).then(() => {
                const styleElement = vlMap.querySelector('vl-map-layer-circle-style');
                styleElement.appliesTo = () => true;
                expect(styleElement.style()).to.be.not.null;
            });
        });
    });

    it('als er een featureAttributeName gedefinieerd is, zal de tekst stijl ook beschikbaar zijn', () => {
        cy.mount(mapLayerStyleMetTextFeatureAttributeNameFixture);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            cy.wrap(vlMap.ready).then(() => {
                const layerStyleElement = vlMap.querySelector('vl-map-layer-style');
                expect(layerStyleElement.textFeatureAttributeName).to.be.equal('label');
                const style = layerStyleElement.style({
                    get: (property) => property + 1,
                });
                expect(style.getText().getFill().getColor()).to.be.equal('#FFF');
                expect(style.getText().getOffsetX()).to.be.equal(0);
                expect(style.getText().getOffsetY()).to.be.equal(0);
                expect(style.getText().getFont()).to.be.equal('10px "Flanders Art Sans",sans-serif');
                expect(style.getText().getBackgroundFill().getColor()).to.be.equal('rgba(0, 0, 0, 0)');
                expect(style.getText().getStroke().getColor()).to.be.equal('rgba(255, 255, 255, 0)');
                expect(style.getText().getStroke().getWidth()).to.be.equal(1);
                expect(style.getText().getText()).to.be.equal('label1');
            });
        });
    });

    it('de style wordt goed geconfigureerd met aangepaste properties', () => {
        cy.mount(mapLayerStyleMetPropertiesFixture);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            cy.wrap(vlMap.ready).then(() => {
                const vlLayerStyleElement = vlMap.querySelector('vl-map-layer-style');
                expect(vlLayerStyleElement.color).to.be.equal('rgba(255,0,0,0.5)');
                expect(vlLayerStyleElement.borderColor).to.be.equal('rgba(255,255,100,1)');
                expect(vlLayerStyleElement.borderSize).to.be.equal('2');
                expect(vlLayerStyleElement.textBackgroundColor).to.be.equal('rgba(0,0,255,0.2)');
                expect(vlLayerStyleElement.textBorderColor).to.be.equal('rgba(0,255,0,1)');
                expect(vlLayerStyleElement.textBorderSize).to.be.equal(3);
                expect(vlLayerStyleElement.textColor).to.be.equal('rgba(255,0,0,1)');
                expect(vlLayerStyleElement.textFeatureAttributeName).to.be.equal('label');
                expect(vlLayerStyleElement.textOffsetX).to.be.equal('10');
                expect(vlLayerStyleElement.textOffsetY).to.be.equal('-10');
                expect(vlLayerStyleElement.textSize).to.be.equal('13px');
                const style = vlLayerStyleElement.style({
                    get: (property) => property + 2,
                });
                expect(style.getFill().getColor()).to.be.equal('rgba(255,0,0,0.5)');
                expect(style.getStroke().getColor()).to.be.equal('rgba(255,255,100,1)');
                expect(style.getStroke().getWidth()).to.be.equal('2');
                expect(style.getText().getFill().getColor()).to.be.equal('rgba(255,0,0,1)');
                expect(style.getText().getOffsetX()).to.be.equal('10');
                expect(style.getText().getOffsetY()).to.be.equal('-10');
                expect(style.getText().getFont()).to.be.equal('13px "Flanders Art Sans",sans-serif');
                expect(style.getText().getBackgroundFill().getColor()).to.be.equal('rgba(0,0,255,0.2)');
                expect(style.getText().getStroke().getColor()).to.be.equal('rgba(0,255,0,1)');
                expect(style.getText().getStroke().getWidth()).to.be.equal(3);
                expect(style.getText().getText()).to.be.equal('label2');
            });
        });
    });

    it('de correcte stijl kan opgevraagd worden bij een laag met meerdere stijlen', () => {
        cy.mount(mapLayerStyleMetMeerdereStijlenFixture);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            cy.wrap(vlMap.ready).then(() => {
                vlMap.querySelector('#map-layer-style-red').appliesTo = (feature) => feature.get('status') === 'red';
                vlMap.querySelector('#map-layer-style-green').appliesTo = (feature) =>
                    feature.get('status') === 'green';
                const vlFeatureLayerElement = vlMap.querySelector('vl-map-features-layer');
                const styleRed = vlFeatureLayerElement.style({ get: () => 'red' });
                const styleGreen = vlFeatureLayerElement.style({ get: () => 'green' });
                const styleOnbestaand = vlFeatureLayerElement.style({
                    get: () => 'orange',
                });
                expect(styleRed.length).to.be.equal(1);
                expect(styleRed[0].getFill().getColor()).to.be.equal('rgba(255,0,0,0.8)');
                expect(styleGreen.length).to.be.equal(1);
                expect(styleGreen[0].getFill().getColor()).to.be.equal('rgba(0,255,0,0.8)');
                expect(styleOnbestaand.length).to.be.equal(0);
            });
        });
    });
});
