import { GeoJSONReader } from 'jsts/org/locationtech/jts/io';
import { IsValidOp } from 'jsts/org/locationtech/jts/operation/valid';
import GeoJSON from 'ol/format/GeoJSON';
import { Geometry } from 'ol/geom';

const geoJsonFormatter = new GeoJSON();

export class OpenLayersUtil {
    static createDummyLayer(id, source?) {
        return {
            id: id,
            addEventListener: () => {},
            getSource: () => {
                return source || OpenLayersUtil.createDummySource();
            },
        };
    }

    static createDummyLayerGroup(id) {
        return {
            id: id,
            getLayers: () => {
                return {
                    getArray: () => {},
                };
            },
            addEventListener: () => {},
        };
    }

    static createDummySource(features?) {
        return {
            addEventListener: () => {},
            getExtent: () => {},
            getFeatures: () => {
                return features;
            },
            clear: () => {},
            addFeatures: () => {},
        };
    }

    static createClusterFeaturesObject(features) {
        return {
            get: (value) => {
                if (value == 'features') {
                    return features;
                }
            },
        };
    }

    static geometryIsInvalid(geometry: Geometry): boolean {
        if (!geometry) return false;

        const geoJSON = new GeoJSON();
        const geoJSONReader = new GeoJSONReader();

        const geojson = geoJSON.writeGeometryObject(geometry as Geometry);
        const jstsGeometry = geoJSONReader.read(geojson);

        return !IsValidOp.isValid(jstsGeometry);
    }
}
