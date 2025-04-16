import { BaseElementOfType, webComponent } from '@domg-wc/common';
import OlStyleFill from 'ol/style/Fill';
import OlStyleStroke from 'ol/style/Stroke';
import OlStyleCircle from 'ol/style/Circle';
import OlStyle from 'ol/style/Style';

@webComponent('vl-map-draw-action-style')
export class VlMapDrawActionStyle extends BaseElementOfType(HTMLElement) {
    connectedCallback() {
        super.connectedCallback();

        this._setStyleOnParent();
    }

    get fillColor() {
        return this.getAttribute('data-vl-color') || 'rgba(2, 85, 204, 0.8)';
    }

    get strokeColor() {
        return this.getAttribute('data-vl-border-color') || 'rgba(2, 85, 204, 1)';
    }

    get strokeSize() {
        return this.getAttribute('data-vl-border-size') || 1;
    }

    get circleRadius() {
        return this.getAttribute('data-vl-circle-size') || 4;
    }

    get circleColor() {
        return this.getAttribute('data-vl-circle-color') || 'rgba(2, 85, 204, 0.8)';
    }

    get circleStrokeColor() {
        return this.getAttribute('data-vl-circle-border-color') || 'rgba(2, 85, 204, 1)';
    }

    get circleStrokeSize() {
        return this.getAttribute('data-vl-circle-border-size') || 1;
    }

    get style() {
        return this._styleFunction();
    }

    get _styleFunction(): () => OlStyle {
        return () => {
            const styleConfig = {
                fill: new OlStyleFill({
                    color: this.fillColor,
                }),
                stroke: new OlStyleStroke({
                    color: this.strokeColor,
                    width: this.strokeSize,
                }),
                image: new OlStyleCircle({
                    radius: this.circleRadius,
                    fill: new OlStyleFill({
                        color: this.circleColor,
                    }),
                    stroke: new OlStyleStroke({
                        color: this.circleStrokeColor,
                        width: this.circleStrokeSize,
                    }),
                }),
                text: undefined,
            };
            return new OlStyle(styleConfig);
        };
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
        'vl-map-draw-action-style': VlMapDrawActionStyle;
    }
}
