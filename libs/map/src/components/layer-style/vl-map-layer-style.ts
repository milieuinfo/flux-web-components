import { BaseElementOfType, webComponent } from '@domg-wc/common';
import OlStyleFill from 'ol/style/Fill';
import OlStyleStroke from 'ol/style/Stroke';
import OlStyle from 'ol/style/Style';
import OlStyleText from 'ol/style/Text';

@webComponent('vl-map-layer-style')
export class VlMapLayerStyle extends BaseElementOfType(HTMLElement) {
    connectedCallback() {
        super.connectedCallback();

        this._setStyleOnParent();
    }

    get name() {
        return this.getAttribute('data-vl-name');
    }

    get color() {
        return this.getAttribute('color') || 'rgba(2, 85, 204, 0.8)';
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

    get style() {
        return (feature, resolution) => {
            if (!this.appliesTo(feature)) {
                return null;
            }
            return this._styleFunction(feature, resolution);
        };
    }

    get _styleFunction() {
        return (feature, resolution) => {
            const styleConfig = {
                fill: new OlStyleFill({
                    color: this.color,
                }),
                stroke: new OlStyleStroke({
                    color: this.borderColor,
                    width: this.borderSize,
                }),
                text: undefined,
            };
            styleConfig.text = this._getTextStyle(feature);
            return new OlStyle(styleConfig);
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
            offsetX: this.textOffsetX,
            offsetY: this.textOffsetY,
        });
    }

    /**
     * Geeft terug of de stijl geldig is voor een welbepaalde feature. Default true.
     *
     * @param {Object} feature Openlayers feature
     *
     * @Return {boolean} true als de stijl geldig is op basis van een feature, indien false, zal de stijl niet gemaakt worden
     */
    appliesTo(feature) {
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

    _setStyleOnParent() {
        if (this.parentElement) {
            customElements.whenDefined(this.parentElement.tagName.toLowerCase()).then(() => {
                this.parentElement.style = this;
            });
        }
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-map-layer-style': VlMapLayerStyle;
    }
}
