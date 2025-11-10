import { GeometryCollection, LineString, MultiPolygon, Polygon } from 'ol/geom';
import { OpenLayersUtil } from './ol-util';

describe('jest - map - ol-utils', () => {
    it('geeft false terug voor een geldige Polygon', () => {
        const polygon = new Polygon([
            [
                [0, 0],
                [2, 0],
                [2, 2],
                [0, 2],
                [0, 0],
            ],
        ]);

        expect(OpenLayersUtil.geometryIsInvalid(polygon)).toBe(false);
    });

    it('geeft true terug voor een ongeldige Polygon', () => {
        const polygon = new Polygon([
            [
                [0, 0],
                [2, 2],
                [2, 0],
                [0, 2],
                [0, 0],
            ],
        ]);

        expect(OpenLayersUtil.geometryIsInvalid(polygon)).toBe(true);
    });

    it('geeft true terug wanneer een GeometryCollection een ongeldige geometrie bevat', () => {
        const goodPolygon = new Polygon([
            [
                [0, 0],
                [2, 0],
                [2, 2],
                [0, 2],
                [0, 0],
            ],
        ]);

        const badPolygon = new Polygon([
            [
                [0, 0],
                [2, 2],
                [2, 0],
                [0, 2],
                [0, 0],
            ],
        ]);

        const collection = new GeometryCollection([goodPolygon, badPolygon]);

        expect(OpenLayersUtil.geometryIsInvalid(collection)).toBe(true);
    });

    it('geeft false terug wanneer alle geometrieën in een GeometryCollection geldig zijn', () => {
        const line1 = new LineString([
            [0, 0],
            [1, 1],
        ]);

        const line2 = new LineString([
            [2, 2],
            [3, 3],
        ]);

        const collection = new GeometryCollection([line1, line2]);

        expect(OpenLayersUtil.geometryIsInvalid(collection)).toBe(false);
    });

    it('geeft true terug voor een MultiPolygon die een ongeldige polygoon bevat', () => {
        const validPolygon = new Polygon([
            [
                [0, 0],
                [1, 0],
                [1, 1],
                [0, 1],
                [0, 0],
            ],
        ]);

        const badPolygon = new Polygon([
            [
                [2, 2],
                [4, 4],
                [4, 2],
                [2, 4],
                [2, 2],
            ],
        ]);

        const multi = new MultiPolygon([validPolygon.getCoordinates(), badPolygon.getCoordinates()]);

        expect(OpenLayersUtil.geometryIsInvalid(multi)).toBe(true);
    });

    it('geeft false terug voor een MultiPolygon met enkel geldige polygonen', () => {
        const p1 = new Polygon([
            [
                [0, 0],
                [1, 0],
                [1, 1],
                [0, 1],
                [0, 0],
            ],
        ]);

        const p2 = new Polygon([
            [
                [2, 2],
                [3, 2],
                [3, 3],
                [2, 3],
                [2, 2],
            ],
        ]);

        const multi = new MultiPolygon([p1.getCoordinates(), p2.getCoordinates()]);

        expect(OpenLayersUtil.geometryIsInvalid(multi)).toBe(false);
    });

    it('geeft false terug voor niet-ondersteunde geometrietypes', () => {
        // intentionally passing an invalid value (null)
        expect(OpenLayersUtil.geometryIsInvalid(null as any)).toBe(false);
    });
});
