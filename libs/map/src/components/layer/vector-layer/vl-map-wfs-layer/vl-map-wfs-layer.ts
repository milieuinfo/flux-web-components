import { webComponent } from '@domg-wc/common';
import OlGML2 from 'ol/format/GML2';
import * as OlLoadingstrategy from 'ol/loadingstrategy';
import { transformExtent } from 'ol/proj';
import OlVectorSource from 'ol/source/Vector';
import { VlMapVectorLayer } from '../vl-map-vector-layer';

// De geometry-property in een DescribeFeatureType-schema herken je aan het feit dat zijn type tot de GML-namespace
// behoort (bv. gml:PointPropertyType, gml:MultiSurfacePropertyType). Matchen op de namespace i.p.v. op de type-naam is
// robuuster: het werkt voor elk geometrie-type, ook voor minder courante of niet-GeoServer schema's, zolang ze GML
// gebruiken. WFS 2.0 gebruikt http://www.opengis.net/gml/3.2; het gemeenschappelijke voorvoegsel dekt beide versies.
const GML_NAMESPACE = 'http://www.opengis.net/gml';

@webComponent('vl-map-wfs-layer')
export class VlMapWfsLayer extends VlMapVectorLayer {
    static get _observedAttributes() {
        return super._observedAttributes.concat(['cql-filter']);
    }

    private __resolvedGeometryName?: string;

    connectedCallback() {
        if (this.__shouldDetectGeometryName) {
            return this.__connectAfterGeometryDetection();
        }
        this._source = this.__createSource();
        this._layer = this._createLayer();
        return super.connectedCallback();
    }

    get _url() {
        const url = this.getAttribute('url');
        if (!url) {
            throw new Error('URL not defined');
        }
        return new URL(url);
    }

    get _layers() {
        const layers = this.getAttribute('layers');
        if (!layers) {
            throw new Error('Layers not defined');
        }
        return layers;
    }

    __createSource() {
        const vectorSource = new OlVectorSource({
            format: this.__sourceFormat,
            strategy: this.__loadingStrategy,
            url: this.__getWfsUrl.bind(this),
        });

        vectorSource.on('featuresloadend', (evt) => {
            evt.features.forEach((f) => {
                f.getGeometry().transform(this.__layerProjectionCode, this.__mapProjectionCode);
            });
        });

        return vectorSource;
    }

    __getWfsUrl(extent) {
        const url = this._url;
        const { searchParams } = url;
        const transformedExtent: string =
            extent && extent.length === 4
                ? transformExtent(extent, this.__mapProjectionCode, this.__layerProjectionCode).join(',')
                : '';
        searchParams.set('service', 'WFS');
        searchParams.set('request', 'GetFeature');
        searchParams.set('typename', this._layers);

        const cqlFilter = this.__cqlFilter;
        const geometryName = this.__geometryName;
        if (cqlFilter && geometryName) {
            searchParams.set('cql_filter', `BBOX(${geometryName},${transformedExtent}) AND (${cqlFilter})`);
        } else {
            searchParams.set('bbox', transformedExtent);
        }

        searchParams.set('srsname', this.__layerProjectionCode);
        searchParams.set('outputFormat', this.__wfsOutputFormat);
        searchParams.set('version', this.__wfsVersion);
        return url;
    }

    get __loadingStrategy() {
        return OlLoadingstrategy.bbox;
    }

    get __sourceFormat() {
        return new OlGML2();
    }

    get __wfsOutputFormat() {
        return 'GML2';
    }

    get __wfsVersion() {
        return '2.0.0';
    }

    private get __cqlFilter(): string | null {
        return this.getAttribute('cql-filter');
    }

    private get __geometryName(): string | undefined {
        return this.getAttribute('geometry-name') || this.__resolvedGeometryName;
    }

    private get __shouldDetectGeometryName(): boolean {
        return !!this.__cqlFilter && !this.getAttribute('geometry-name');
    }

    private async __connectAfterGeometryDetection(): Promise<void> {
        this.__resolvedGeometryName = await this.__describeGeometryName();
        this._source = this.__createSource();
        this._layer = this._createLayer();
        return super.connectedCallback();
    }

    _cqlFilterChangedCallback(_oldValue: string, newValue: string): void {
        if (!this._source) {
            return;
        }
        if (newValue && !this.getAttribute('geometry-name') && !this.__resolvedGeometryName) {
            this.__describeGeometryName().then((geometryName) => {
                this.__resolvedGeometryName = geometryName;
                this._source.refresh();
            });
        } else {
            this._source.refresh();
        }
    }

    private async __describeGeometryName(): Promise<string | undefined> {
        try {
            const url = this._url;
            const { searchParams } = url;
            searchParams.set('service', 'WFS');
            searchParams.set('version', this.__wfsVersion);
            searchParams.set('request', 'DescribeFeatureType');
            searchParams.set('typename', this._layers);

            const response = await fetch(url.toString());
            if (!response.ok) {
                this.__warnGeometryDetectionFailed(`DescribeFeatureType gaf status ${response.status}`);
                return undefined;
            }

            const schema = new DOMParser().parseFromString(await response.text(), 'application/xml');
            if (schema.querySelector('parsererror')) {
                this.__warnGeometryDetectionFailed('DescribeFeatureType respons kon niet als XML geparset worden');
                return undefined;
            }

            const geometryName = this.__findGeometryName(schema);
            if (!geometryName) {
                this.__warnGeometryDetectionFailed('geen geometry-property gevonden in het WFS-schema');
            }
            return geometryName;
        } catch (error) {
            this.__warnGeometryDetectionFailed(error);
            return undefined;
        }
    }

    private __findGeometryName(schema: Document): string | undefined {
        const elements = Array.from(schema.getElementsByTagNameNS('*', 'element'));
        const geometryElement = elements.find((element) => {
            const type = element.getAttribute('type');
            if (!type) {
                return false;
            }
            const prefix = type.includes(':') ? type.split(':')[0] : null;
            const namespace = element.lookupNamespaceURI(prefix) ?? '';
            return namespace.startsWith(GML_NAMESPACE);
        });
        return geometryElement?.getAttribute('name') ?? undefined;
    }

    private __warnGeometryDetectionFailed(reason: unknown): void {
        console.warn(
            `vl-map-wfs-layer: kon de geometry-property niet automatisch bepalen voor "${this._layers}" (${reason}). ` +
                `Het cql-filter wordt niet server-side toegepast (terugval op een bbox-request). ` +
                `Geef het geometry-name attribuut expliciet mee om dit op te lossen.`,
            reason instanceof Error ? reason : ''
        );
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-map-wfs-layer': VlMapWfsLayer;
    }
}
