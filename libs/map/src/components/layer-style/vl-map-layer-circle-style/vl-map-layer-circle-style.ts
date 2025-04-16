import { webComponent } from '@domg-wc/common';
import OlStyleCircle from 'ol/style/Circle';
import OlStyleFill from 'ol/style/Fill';
import OlStyleStroke from 'ol/style/Stroke';
import OlStyle from 'ol/style/Style';
import { VlMapLayerStyle } from '../vl-map-layer-style';

@webComponent('vl-map-layer-circle-style')
export class VlMapLayerCircleStyle extends VlMapLayerStyle {
    get size(): number {
        const getSize = Number(this.getAttribute('size'));
        return getSize || 5;
    }

    get borderColor() {
        return this.getAttribute('border-color') || 'rgba(0, 0, 0, 0)';
    }

    get borderSize() {
        return this.getAttribute('border-size') || 1;
    }

    get clusterTextColor() {
        return this.getAttribute('cluster-text-color') || '#FFF';
    }

    get clusterColor() {
        return this.getAttribute('cluster-color') || 'rgba(2, 85, 204, 1)';
    }

    get clusterMultiplier(): number {
        const clusterMultiplier = Number(this.getAttribute('cluster-multiplier'));
        return isNaN(clusterMultiplier) || clusterMultiplier === 0 ? 1 : clusterMultiplier;
    }

    get _styleFunction() {
        return (feature, resolution) => {
            const features = feature && feature.get ? feature.get('features') || [] : [];
            let { textColor, color, borderColor, borderSize } = this;
            const numberOfFeatures = features.length || 1;
            const rangeMultiplier = Math.max(1.5, numberOfFeatures.toString().length);
            const clusterMultiplierResult = numberOfFeatures === 1 ? 1 : this.clusterMultiplier * rangeMultiplier;
            let radius = this.size * clusterMultiplierResult;

            if (this.parentElement && this.parentElement['cluster']) {
                if (this._hasUniqueStyles(features)) {
                    let style = features[0].getStyle();
                    if (style instanceof Function) {
                        style = style();
                    }
                    const styleImage = style.getImage();
                    color = styleImage.getFill().getColor();
                    borderColor = styleImage.getStroke().getColor();
                    borderSize = styleImage.getStroke().getWidth();
                    radius =
                        numberOfFeatures > 1
                            ? styleImage.getRadius() * clusterMultiplierResult
                            : styleImage.getRadius();
                } else if (this._containsStyle(features)) {
                    color = this.clusterColor;
                    textColor = this.clusterTextColor;
                } else {
                    // default options zijn goed
                }
            }

            return new OlStyle({
                image: new OlStyleCircle({
                    fill: new OlStyleFill({
                        color,
                    }),
                    stroke: new OlStyleStroke({
                        color: borderColor,
                        width: Number(borderSize),
                    }),
                    radius,
                }),
                text: this._getTextStyle(feature, textColor),
                zIndex: this._featureZIndex(feature),
            });
        };
    }

    get featureLabelFunction() {
        return (feature) => {
            const features = feature && feature.get ? feature.get('features') || [] : [];

            if (Array.isArray(features) && features.length > 0) {
                const size = features.length || 1;

                if (size > 1) {
                    return size.toString();
                }

                return this.__getFeatureText(features[0]);
            }

            return this.__getFeatureText(feature);
        };
    }

    __getFeatureText(f) {
        if (this.textFeatureAttributeName) {
            return this.textFeatureAttributeName ? f.get(this.textFeatureAttributeName) : '';
        }

        return '';
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-map-layer-circle-style': VlMapLayerCircleStyle;
    }
}
