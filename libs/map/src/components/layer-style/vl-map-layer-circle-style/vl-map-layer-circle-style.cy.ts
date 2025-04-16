import { registerWebComponents } from '@domg-wc/common';
import { html } from 'lit';
import OlFeature from 'ol/Feature';
import OlPoint from 'ol/geom/Point';
import OlStyleCircle, { Options as CircleOptions } from 'ol/style/Circle';
import OlStyleFill from 'ol/style/Fill';
import OlStyleStroke, { Options as StrokeOptions } from 'ol/style/Stroke';
import OlStyle from 'ol/style/Style';
import { OpenLayersUtil } from '../../../utils/ol-util';
import { VlMap } from '../../../vl-map';
import { VlMapFeaturesLayer } from '../../layer/vector-layer/vl-map-features-layer/vl-map-features-layer';
import { VlMapLayerCircleStyle } from './vl-map-layer-circle-style';

registerWebComponents([VlMap, VlMapFeaturesLayer, VlMapLayerCircleStyle]);

const mapLayerCircleStyleFixture = html`
    <vl-map>
        <vl-map-features-layer>
            <vl-map-layer-circle-style></vl-map-layer-circle-style>
        </vl-map-features-layer>
    </vl-map>
`;

const mapLayerCircleStylePropertiesFixture = html`
    <vl-map>
        <vl-map-features-layer>
            <vl-map-layer-circle-style
                data-vl-color="#fff"
                data-vl-text-color="#000"
                data-vl-size="1"
                data-vl-text-offset-x="2"
                data-vl-text-offset-y="3"
                data-vl-border-color="#123"
                data-vl-border-size="4"
                data-vl-cluster-text-color="#456"
                data-vl-cluster-color="#789"
            ></vl-map-layer-circle-style>
        </vl-map-features-layer>
    </vl-map>
`;

const mapLayerCircleStyleMetTextFeatureAttributeNameFixture = html`
    <vl-map>
        <vl-map-features-layer>
            <vl-map-layer-circle-style data-vl-text-feature-attribute-name="label"></vl-map-layer-circle-style>
        </vl-map-features-layer>
    </vl-map>
`;

describe('vl-map-layer-circle-style', () => {
    it('de style wordt goed geconfigureerd met default properties', () => {
        cy.mount(mapLayerCircleStyleFixture);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            const styleElement: VlMapLayerCircleStyle = vlMap.querySelector('vl-map-layer-circle-style');
            expect(styleElement.color).to.be.equal('rgba(2, 85, 204, 0.8)');
            expect(styleElement.textColor).to.be.equal('#FFF');
            expect(styleElement.textOffsetX).to.be.equal(0);
            expect(styleElement.textOffsetY).to.be.equal(0);
            expect(styleElement.size).to.be.equal(5);
            expect(styleElement.borderColor).to.be.equal('rgba(0, 0, 0, 0)');
            expect(styleElement.borderSize).to.be.equal(1);
            expect(styleElement.clusterTextColor).to.be.equal('#FFF');
            expect(styleElement.clusterColor).to.be.equal('rgba(2, 85, 204, 1)');
        });
    });

    it('de gegenereerde style komt overeen met de ingestelde properties', () => {
        cy.mount(mapLayerCircleStylePropertiesFixture);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            const styleElement = vlMap.querySelector('vl-map-layer-circle-style');
            const style = styleElement.style();
            const imageStyle = style.getImage();
            const stroke = imageStyle.getStroke();
            const text = style.getText();
            expect(imageStyle.getFill().getColor()).to.be.equal('#fff');
            expect(text.getFill().getColor()).to.be.equal('#000');
            expect(text.getOffsetX()).to.be.equal('2');
            expect(text.getOffsetY()).to.be.equal('3');
            expect(imageStyle.getRadius()).to.be.equal(1);
            expect(stroke.getColor()).to.be.equal('#123');
            expect(stroke.getWidth()).to.be.equal(4);
            expect(imageStyle).to.be.instanceof(OlStyleCircle);
        });
    });

    it('de style wordt gezet bij het parent element', async () => {
        cy.mount(mapLayerCircleStyleFixture);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            const layerElement = vlMap.querySelector('vl-map-features-layer');
            const styleElement = vlMap.querySelector('vl-map-layer-circle-style');
            expect(layerElement.style('feature')[0]).to.deep.equal(styleElement.style('feature'));
        });
    });

    it('indien er meerdere features binnen een bepaalde afstand liggen van elkaar zullen ze geclusterd weergegeven worden en zal het aantal features in de cluster weergegeven worden', () => {
        cy.mount(mapLayerCircleStyleFixture);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            const styleElement = vlMap.querySelector('vl-map-layer-circle-style');
            const feature1 = new OlFeature({
                geometry: new OlPoint([109100, 204175]),
            });
            const feature2 = new OlFeature({
                geometry: new OlPoint([109101, 204176]),
            });
            const features = OpenLayersUtil.createClusterFeaturesObject([feature1, feature2]);
            const style = styleElement.style(features);
            const textStyle = style.getText();
            expect(textStyle.getText()).to.be.equal(features.get('features').length.toString());
        });
    });

    it('de cluster grootte is afhankelijk van het aantal features in de cluster', () => {
        cy.mount(mapLayerCircleStylePropertiesFixture);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            const styleElement = vlMap.querySelector('vl-map-layer-circle-style');
            const feature = new OlFeature({
                geometry: new OlPoint([109100, 204175]),
            });
            const generateFeaturesArray = (feature, quantity) => {
                const features = [];
                for (let i = 0; i < quantity; i++) {
                    features.push(feature);
                }
                return features;
            };
            let style = styleElement.style(OpenLayersUtil.createClusterFeaturesObject([feature]));
            expect(style.getImage().getRadius()).to.be.equal(1);
            style = styleElement.style(OpenLayersUtil.createClusterFeaturesObject(generateFeaturesArray(feature, 10)));
            expect(style.getImage().getRadius()).to.be.equal(2);
            style = styleElement.style(OpenLayersUtil.createClusterFeaturesObject(generateFeaturesArray(feature, 100)));
            expect(style.getImage().getRadius()).to.be.equal(3);
        });
    });

    it('indien al de features binnen een cluster een identieke cirkel custom style hebben, zal de cluster deze style overnemen', () => {
        cy.mount(mapLayerCircleStylePropertiesFixture);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            const layerElement = vlMap.querySelector('vl-map-features-layer');
            const styleElement = vlMap.querySelector('vl-map-layer-circle-style');
            const featureFillColor = '#fff';
            const featureStrokeColor = '#123';
            const featureStrokeWidth = 10;
            const featureRadius = 5;
            const featureRadius2 = 6;
            const featurePoints = 15;
            const featureStyle = new OlStyle({
                image: new OlStyleCircle(<CircleOptions>{
                    fill: new OlStyleFill({
                        color: featureFillColor,
                    }),
                    stroke: new OlStyleStroke({
                        color: featureStrokeColor,
                        width: featureStrokeWidth,
                    }),
                    radius: featureRadius,
                    radius2: featureRadius2,
                    points: featurePoints,
                }),
            });
            const feature1 = new OlFeature({
                geometry: new OlPoint([109100, 204175]),
            });
            const feature2 = new OlFeature({
                geometry: new OlPoint([109101, 204176]),
            });
            feature1.setStyle(featureStyle);
            feature2.setStyle(featureStyle);
            const features = [feature1, feature2];
            layerElement.setAttribute('data-vl-cluster', '');
            const style = styleElement.style(OpenLayersUtil.createClusterFeaturesObject(features));
            const clusterMultiplier = Math.max(1.5, features.length.toString().length);
            const styleImage = style.getImage();
            const styleImageFill = styleImage.getFill();
            const styleImageStroke = styleImage.getStroke();
            expect(styleImageFill.getColor()).to.be.equal(featureFillColor);
            expect(styleImageStroke.getColor()).to.be.equal(featureStrokeColor);
            expect(styleImage.getRadius()).to.be.equal(featureRadius * clusterMultiplier);
            expect(styleImage).to.be.instanceof(OlStyleCircle);
        });
    });

    it('indien de features binnen een cluster een verschillende cirkel style hebben, zal de cluster de gedefinieerde cluster kleur krijgen', () => {
        cy.mount(mapLayerCircleStylePropertiesFixture);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            const layerElement = vlMap.querySelector('vl-map-features-layer');
            const styleElement = vlMap.querySelector('vl-map-layer-circle-style');
            const clusterKleur = '#789';
            const clusterTekstKleur = '#456';
            styleElement.clusterKleur = clusterKleur;
            styleElement.clusterTekstKleur = clusterTekstKleur;
            const feature1 = new OlFeature({
                geometry: new OlPoint([109100, 204175]),
            });
            const feature2 = new OlFeature({
                geometry: new OlPoint([109101, 204176]),
            });
            feature1.setStyle(
                new OlStyle({
                    image: new OlStyleCircle(<CircleOptions>{
                        fill: new OlStyleFill({
                            color: 'rgba(1, 2, 3, 1)',
                        }),
                        stroke: new OlStyleStroke(<StrokeOptions>{
                            color: 'rgba(2, 3, 4, 1)',
                            width: 10,
                        }),
                        radius: 5,
                        radius2: 6,
                        points: 15,
                    }),
                })
            );
            feature2.setStyle(
                new OlStyle({
                    image: new OlStyleCircle(<CircleOptions>{
                        fill: new OlStyleFill({
                            color: 'rgba(2, 3, 4, 1)',
                        }),
                        stroke: new OlStyleStroke(<StrokeOptions>{
                            color: 'rgba(3, 4, 5, 1)',
                            width: 11,
                        }),
                        radius: 6,
                        radius2: 7,
                        points: 16,
                    }),
                })
            );
            const features = [feature1, feature2];
            layerElement.setAttribute('data-vl-cluster', '');
            const style = styleElement.style(OpenLayersUtil.createClusterFeaturesObject(features));
            const clusterMultiplier = Math.max(1.5, features.length.toString().length);
            const styleImage = style.getImage();
            const styleImageFill = styleImage.getFill();
            const styleImageStroke = styleImage.getStroke();
            const styleText = style.getText();
            const styleTextFill = styleText.getFill();
            expect(styleImageFill.getColor()).to.be.equal(clusterKleur);
            expect(styleImageStroke.getColor()).to.be.equal(styleElement.borderColor);
            expect(styleImage.getRadius()).to.be.equal(styleElement.size * clusterMultiplier);
            expect(styleTextFill.getColor()).to.be.equal(clusterTekstKleur);
            expect(styleImage).to.be.instanceof(OlStyleCircle);
        });
    });

    it('indien de features binnen een cluster geen cirkel custom style hebben, zal de cluster de standaard laag style krijgen', () => {
        cy.mount(mapLayerCircleStyleFixture);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            const styleElement = vlMap.querySelector('vl-map-layer-circle-style');
            const feature1 = new OlFeature({
                geometry: new OlPoint([109100, 204175]),
            });
            const feature2 = new OlFeature({
                geometry: new OlPoint([109101, 204176]),
            });
            const features = [feature1, feature2];
            const style = styleElement.style(OpenLayersUtil.createClusterFeaturesObject(features));
            const clusterMultiplier = Math.max(1.5, features.length.toString().length);
            const styleImage = style.getImage();
            const styleImageFill = styleImage.getFill();
            const styleImageStroke = styleImage.getStroke();
            const styleText = style.getText();
            const styleTextFill = styleText.getFill();
            expect(styleImageFill.getColor()).to.be.equal(styleElement.color);
            expect(styleImageStroke.getColor()).to.be.equal(styleElement.borderColor);
            expect(styleImage.getRadius()).to.be.equal(styleElement.size * clusterMultiplier);
            expect(styleTextFill.getColor()).to.be.equal(styleElement.clusterTextColor);
            expect(styleImage).to.be.instanceof(OlStyleCircle);
        });
    });

    it('wanneer als feature een niet-feature object wordt meegegeven, kan de style functie er mee om', () => {
        cy.mount(mapLayerCircleStyleFixture);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            const styleElement = vlMap.querySelector('vl-map-layer-circle-style');
            const style = styleElement.style(1);
            const styleImage = style.getImage();
            const styleImageFill = styleImage.getFill();
            const styleImageStroke = styleImage.getStroke();
            const styleText = style.getText();
            const styleTextFill = styleText.getFill();
            expect(styleImageFill.getColor()).to.be.equal(styleElement.color);
            expect(styleImageStroke.getColor()).to.be.equal(styleElement.borderColor);
            expect(styleImage.getRadius()).to.be.equal(styleElement.size);
            expect(styleTextFill.getColor()).to.be.equal(styleElement.clusterTextColor);
            expect(styleImage).to.be.instanceof(OlStyleCircle);
        });
    });

    it('als er een featureAttributeName gedefinieerd is, zal de tekst stijl ook beschikbaar zijn', () => {
        cy.mount(mapLayerCircleStyleMetTextFeatureAttributeNameFixture);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            const vlMapLayerStyleElement = vlMap.querySelector('vl-map-layer-circle-style');
            expect(vlMapLayerStyleElement.textFeatureAttributeName).to.be.equal('label');
            const style = vlMapLayerStyleElement.style({
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

    it('als er geen featureAttributeName gedefinieerd is én indien er geen features binnen een bepaalde afstand liggen van elkaar zullen ze niet geclusterd weergegeven worden en zal er geen tekst stijl beschikbaar zijn', () => {
        cy.mount(mapLayerCircleStyleFixture);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            const styleElement = vlMap.querySelector('vl-map-layer-circle-style');
            expect(styleElement.textFeatureAttributeName).to.be.null;
            const feature = new OlFeature({
                geometry: new OlPoint([109100, 204175]),
            });
            feature.set('label', 'feature1');
            const features = OpenLayersUtil.createClusterFeaturesObject([feature]);
            const style = styleElement.style(features);
            const textStyle = style.getText();
            expect(textStyle.getText()).to.be.empty;
        });
    });

    it('als er een featureAttributeName gedefinieerd is én indien er geen features binnen een bepaalde afstand liggen van elkaar zullen ze niet geclusterd weergegeven worden en zal de tekst stijl ook beschikbaar zijn', () => {
        cy.mount(mapLayerCircleStyleMetTextFeatureAttributeNameFixture);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            const styleElement = vlMap.querySelector('vl-map-layer-circle-style');
            expect(styleElement.textFeatureAttributeName).to.be.equal('label');
            const feature1 = new OlFeature({
                geometry: new OlPoint([109100, 204175]),
            });
            feature1.set('label', 'feature1');
            const feature2 = new OlFeature({
                geometry: new OlPoint([109101, 204176]),
            });
            feature2.set('label', 'feature2');
            const features1 = OpenLayersUtil.createClusterFeaturesObject([feature1]);
            const style1 = styleElement.style(features1);
            const textStyle1 = style1.getText();
            expect(textStyle1.getText()).to.be.equal('feature1');
            const features2 = OpenLayersUtil.createClusterFeaturesObject([feature2]);
            const style2 = styleElement.style(features2);
            const textStyle2 = style2.getText();
            expect(textStyle2.getText()).to.be.equal('feature2');
        });
    });

    it('als er geen featureAttributeName gedefinieerd is én indien er meerdere features binnen een bepaalde afstand liggen van elkaar zullen ze geclusterd weergegeven worden en zal het aantal features in de cluster weergegeven worden', () => {
        cy.mount(mapLayerCircleStyleFixture);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            const styleElement = vlMap.querySelector('vl-map-layer-circle-style');
            expect(styleElement.textFeatureAttributeName).to.be.equal(null);
            const feature1 = new OlFeature({
                geometry: new OlPoint([109100, 204175]),
            });
            feature1.set('label', 'feature1');
            const feature2 = new OlFeature({
                geometry: new OlPoint([109101, 204176]),
            });
            feature2.set('label', 'feature2');
            const features = OpenLayersUtil.createClusterFeaturesObject([feature1, feature2]);
            const style = styleElement.style(features);
            const textStyle = style.getText();
            expect(textStyle.getText()).to.be.equal('2');
        });
    });

    it('als er een featureAttributeName gedefinieerd is én indien er meerdere features binnen een bepaalde afstand liggen van elkaar zullen ze geclusterd weergegeven worden en zal het aantal features in de cluster weergegeven worden', () => {
        cy.mount(mapLayerCircleStyleMetTextFeatureAttributeNameFixture);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            const styleElement = vlMap.querySelector('vl-map-layer-circle-style');
            expect(styleElement.textFeatureAttributeName).to.be.equal('label');
            const feature1 = new OlFeature({
                geometry: new OlPoint([109100, 204175]),
            });
            feature1.set('label', 'feature1');
            const feature2 = new OlFeature({
                geometry: new OlPoint([109101, 204176]),
            });
            feature2.set('label', 'feature2');
            const features = OpenLayersUtil.createClusterFeaturesObject([feature1, feature2]);
            const style = styleElement.style(features);
            const textStyle = style.getText();
            expect(textStyle.getText()).to.be.equal('2');
        });
    });

    it('als er geen featureAttributeName gedefinieerd is én clustering is niet ingeschakeld moet de er geen label van de feature weergegeven', () => {
        cy.mount(mapLayerCircleStyleFixture);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            const styleElement = vlMap.querySelector('vl-map-layer-circle-style');
            expect(styleElement.textFeatureAttributeName).to.be.null;
            const feature = new OlFeature({
                geometry: new OlPoint([109100, 204175]),
            });
            feature.set('label', 'feature');
            const style = styleElement.style(feature);
            const textStyle = style.getText();
            expect(textStyle.getText()).to.be.empty;
        });
    });

    it('als er een featureAttributeName gedefinieerd is én clustering is niet ingeschakeld moet de label van de feature goed weergegeven worden', () => {
        cy.mount(mapLayerCircleStyleMetTextFeatureAttributeNameFixture);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            const styleElement = vlMap.querySelector('vl-map-layer-circle-style');
            expect(styleElement.textFeatureAttributeName).to.be.equal('label');
            const feature = new OlFeature({
                geometry: new OlPoint([109100, 204175]),
            });
            feature.set('label', 'feature');
            const style = styleElement.style(feature);
            const textStyle = style.getText();
            expect(textStyle.getText()).to.be.equal('feature');
        });
    });
});
