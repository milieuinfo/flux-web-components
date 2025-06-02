import { BaseHTMLElement, webComponent } from '@domg-wc/common';
import OlStyleFill from 'ol/style/Fill';
import OlStyleStroke from 'ol/style/Stroke';
import OlStyleCircle from 'ol/style/Circle';
import OlStyle from 'ol/style/Style';

@webComponent('vl-map-draw-action-style')
export class VlMapDrawActionStyle extends BaseHTMLElement {
    connectedCallback() {
        super.connectedCallback();

        this._setStyleOnParent();
    }

    get fillColor() {
        return this.getAttribute('color') || 'rgba(2, 85, 204, 0.8)';
    }

    get strokeColor() {
        return this.getAttribute('border-color') || 'rgba(2, 85, 204, 1)';
    }

    get strokeSize() {
        return this.getAttribute('border-size') || 1;
    }

    get circleRadius() {
        return this.getAttribute('circle-size') || 4;
    }

    get circleColor() {
        return this.getAttribute('circle-color') || 'rgba(2, 85, 204, 0.8)';
    }

    get circleStrokeColor() {
        return this.getAttribute('circle-border-color') || 'rgba(2, 85, 204, 1)';
    }

    get circleStrokeSize() {
        return this.getAttribute('circle-border-size') || 1;
    }

    // @ts-expect-error: style exists in HTMLElement
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
                    width: this.strokeSize as number,
                }),
                image: new OlStyleCircle({
                    radius: this.circleRadius as number,
                    fill: new OlStyleFill({
                        color: this.circleColor,
                    }),
                    stroke: new OlStyleStroke({
                        color: this.circleStrokeColor,
                        width: this.circleStrokeSize as number,
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
                // @ts-expect-error: style property is readonly
                this.parentElement.style! = this;
            });
        }
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-map-draw-action-style': VlMapDrawActionStyle;
    }
}
