import { BaseHTMLElement, webComponent } from '@domg-wc/common';
import { Feature } from 'ol';
import OlStyleFill from 'ol/style/Fill';
import OlStyleStroke from 'ol/style/Stroke';
import OlStyle from 'ol/style/Style';
import OlStyleText from 'ol/style/Text';
import { OpenLayersUtil } from '../../utils/ol-util';
import { VlMap } from '../../vl-map';

@webComponent('vl-map-layer-style')
export class VlMapLayerStyle extends BaseHTMLElement {
    private mapElement: VlMap | null = null;
    private canvasPattern: CanvasPattern | null = null;

    connectedCallback() {
        super.connectedCallback();

        this.mapElement = this.closest('vl-map');

        this._loadPattern();
        this._setStyleOnParent();
    }

    get name() {
        return this.getAttribute('name');
    }

    get color() {
        return this.getAttribute('color') || 'rgba(2, 85, 204, 0.8)';
    }

    get pattern() {
        return this.getAttribute('pattern');
    }

    get borderColor() {
        return this.getAttribute('border-color') || 'rgba(2, 85, 204, 1)';
    }

    get borderSize() {
        return this.getAttribute('border-size') || 1;
    }

    get textColor() {
        return this.getAttribute('text-color') || '#FFF';
    }

    get textBackgroundColor() {
        return this.getAttribute('text-background-color') || 'rgba(0, 0, 0, 0)';
    }

    get textBorderColor() {
        return this.getAttribute('text-border-color') || 'rgba(255, 255, 255, 0)';
    }

    get textBorderSize() {
        return Number(this.getAttribute('text-border-size') || 1);
    }

    get textSize() {
        return this.getAttribute('text-size') || '10px';
    }

    get textFeatureAttributeName() {
        return this.getAttribute('text-feature-attribute-name') || null;
    }

    get textOffsetX() {
        return this.getAttribute('text-offset-x') || 0;
    }

    get textOffsetY() {
        return this.getAttribute('text-offset-y') || 0;
    }

    get invalid() {
        return this.hasAttribute('invalid');
    }

    // @ts-expect-error: style exists in HTMLElement
    get style() {
        return (feature, resolution) => {
            if (!this.appliesTo(feature)) {
                return null;
            }
            return this._styleFunction(feature);
        };
    }

    get _styleFunction() {
        return (feature) => {
            const geometry = feature instanceof Feature && feature?.getGeometry();

            if (
                this.invalid ||
                (!this.mapElement.invalidGeometryAllowed && geometry && OpenLayersUtil.geometryIsInvalid(geometry))
            ) {
                return new OlStyle({
                    fill: new OlStyleFill({ color: 'rgba(210, 55, 60, 0.3)' }),
                    stroke: new OlStyleStroke({ color: '#d2373c', width: 2, lineDash: [4, 4] }),
                    text: this._getTextStyle(feature),
                });
            }

            const baseStyle = new OlStyle({
                fill: new OlStyleFill({
                    color: this.color,
                }),
                stroke: new OlStyleStroke({
                    color: this.borderColor,
                    width: this.borderSize as number,
                }),
                text: this._getTextStyle(feature),
            });

            if (this.canvasPattern) {
                const patternStyle = new OlStyle({
                    fill: new OlStyleFill({
                        color: this.canvasPattern,
                    }),
                });
                return [baseStyle, patternStyle];
            }

            return baseStyle;
        };
    }

    _getTextStyle(feature, textColor?) {
        return new OlStyleText({
            font: `${this.textSize} "Flanders Art Sans",sans-serif`,
            text: this.featureLabelFunction(feature),
            fill: new OlStyleFill({
                color: textColor || this.textColor,
            }),
            stroke: new OlStyleStroke({
                color: this.textBorderColor,
                width: this.textBorderSize,
            }),
            backgroundFill: new OlStyleFill({
                color: this.textBackgroundColor,
            }),
            offsetX: this.textOffsetX as number,
            offsetY: this.textOffsetY as number,
        });
    }

    /**
     * Geeft terug of de stijl geldig is voor een welbepaalde feature. Default true.
     *
     * @param {Object} feature Openlayers feature
     *
     * @Return {boolean} true als de stijl geldig is op basis van een feature, indien false, zal de stijl niet gemaakt worden
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    appliesTo(feature: any) {
        return true;
    }

    /**
     * Geeft de feature label functie terug.
     *
     * @Return {Function|null} de functie die gebruikt wordt om de label te maken op basis van een feature
     */
    get featureLabelFunction() {
        return this.textFeatureAttributeName ? (feature) => feature.get(this.textFeatureAttributeName) : () => '';
    }

    _featureZIndex(feature) {
        return feature && feature.get ? feature.get('zIndex') : 0;
    }

    _hasUniqueStyles(features) {
        const styles = this._getStyles(features);
        return styles && this._containsObject(styles) && this._areIdentical(styles);
    }

    _containsStyle(features) {
        return this._containsObject(features.map((feature) => feature.getStyle()));
    }

    _getStyles(features) {
        return features.map((feature) => feature.getStyle());
    }

    _containsObject(objects) {
        return objects.some((object) => !!object);
    }

    _areIdentical(objects) {
        return objects.every((object, i, objects) => object == objects[0]);
    }

    _loadPattern() {
        const patternUrl = this.pattern;
        if (!patternUrl) return;

        const img = new Image();
        img.onload = async () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            this.canvasPattern = ctx.createPattern(img, 'repeat');

            await this.mapElement?.ready;
            (this.parentElement as any)?._layer?.getSource()?.changed();
        };
        img.src = patternUrl;
    }

    _setStyleOnParent() {
        if (this.parentElement) {
            customElements.whenDefined(this.parentElement.tagName.toLowerCase()).then(() => {
                // @ts-expect-error: style property is readonly
                this.parentElement.style! = this;
            });
        }
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-map-layer-style': VlMapLayerStyle;
    }
}
