import OlVectorLayer from 'ol/layer/Vector';
import OlStyle from 'ol/style/Style';
import { getLambert72Code } from '../../../utils/capabilities';
import { VlMapLayerStyle } from '../../layer-style/vl-map-layer-style';
import { VlMapLayer } from '../vl-map-layer';

export class VlMapVectorLayer extends VlMapLayer {
    static get _observedAttributes() {
        return VlMapLayer._observedAttributes.concat(['projection-code']);
    }

    private pendingLayerStyles: (VlMapLayerStyle | OlStyle)[] = [];

    static get EVENTS() {
        return {
            styleChanged: 'style-changed',
        };
    }

    constructor() {
        super();
        this._styles = [];
    }

    get __layerProjectionCode(): string {
        // Kan breaking changes veroorzaken als de data standaard in Lambert 72 is en de kaart in Lambert 2008.
        // Om dit op te lossen, moet nu expliciet de projection-code op de layer gezet worden: `projection-code="EPSG:31370"`
        // Zoniet wordt de default van de map gebruikt.
        return this.hasAttribute('projection-code') ? this.getAttribute('projection-code') : this.__mapProjectionCode;
    }

    get __mapProjectionCode(): string {
        return this.mapElement?._projection?.getCode() || getLambert72Code();
    }

    async connectedCallback(): Promise<void> {
        await super.connectedCallback();

        this.applyPendingStyles();
    }

    /**
     * Geeft de OpenLayers kaartlaag stijl.
     *
     * @return {ol.style}
     */
    // @ts-expect-error: overwriting HTMLElement's style CSSStyleDeclaration property
    get style() {
        return this.layer?.getStyle() || null;
    }

    /**
     * Zet de kaartlaag stijl.
     * Indien een VlMapLayerStyle gekozen wordt, wordt die toegevoegd aan de reeds bestaande stijlen.
     * Bij een OpenLayers StyleLike wordt de stijl overschreven.
     * Bij voorkeur wordt een VlMapLayerStyle gekozen.
     *
     * @param {VlMapLayerStyle|object|null} style een VlMapLayerStyle of een OpenLayers StyleLike, of null om de stijl te verwijderen.
     * @deprecated Gebruik van een OpenLayers style als argument wordt afgeraden. Gebruik in de plaats daarvan de VlMapLayerStyle component. In een latere versie zal de mogelijkheid om een OpenLayers style te zetten verdwijnen.
     *
     * @see {@link https://openlayers.org/en/latest/apidoc/module-ol_style_Style.html#~StyleLike|OpenLayers StyleLike}
     */
    // @ts-expect-error: overwriting HTMLElement's style CSSStyleDeclaration property
    set style(style: OlStyle | VlMapLayerStyle) {
        if (this._layer) {
            this.applyStyle(style);
        } else {
            // in het geval OlLayer instance nog niet defined is, willen we de layer styles bijhouden tot we die kunnen instellen
            this.pendingLayerStyles = [...this.pendingLayerStyles, style];
        }
    }

    private applyStyle(style: OlStyle | VlMapLayerStyle): void {
        if (style instanceof VlMapLayerStyle) {
            this._styles.push(style);
            this._layer.setStyle((feature) =>
                this._styles.flatMap((style) => style.style(feature)).filter((style) => style != null)
            );
        } else {
            this._styles = [];
            this._layer.setStyle(style);
        }
        this.dispatchEvent(
            new CustomEvent(VlMapVectorLayer.EVENTS.styleChanged, {
                bubbles: true,
                composed: true,
                detail: { style },
            })
        );
    }

    _createLayer() {
        const layer = new OlVectorLayer(<any>{
            title: this._name,
            source: this._source,
            updateWhileAnimating: true,
            updateWhileInteracting: true,
            minResolution: this._minResolution,
            maxResolution: this._maxResolution,
            visible: this._visible,
            opacity: this._opacity,
        });
        layer.set('id', VlMapLayer._counter);
        return layer;
    }

    private applyPendingStyles() {
        if (this._layer) {
            this.pendingLayerStyles?.forEach((style) => this.applyStyle(style));
            this.pendingLayerStyles = [];
        }
    }
}
