import type { Coordinate } from 'ol/coordinate';
import { containsCoordinate, type Extent } from 'ol/extent';
import { addCoordinateTransforms } from 'ol/proj';
import proj4 from 'proj4';
import { getLambert2008Code, getLambert72Code, getWGS84Code } from './capabilities';

export type LambertTransformation = 'helmert' | 'ntv2';

export const NTV2_GRID_URL = 'https://cdn.omgeving.vlaanderen.be/domg/lambert-ntv2-grid/1.0.0/bd72lb72_etrs89lb08.gsb';

const NTV2_GRID_TIMEOUT_IN_SECONDS = 60;

const NTV2_GRID_KEY = 'bd72lb72_etrs89lb08';

// Buiten dit gebied gooit proj4 een exception en logt het elk punt, dus daar zetten we meteen om met Helmert.
const NTV2_GRID_EXTENT_WGS84: Extent = [2.46, 49.45, 6.54, 51.57];

const LAMBERT72_PROJECTION =
    '+proj=lcc +lat_1=51.16666723333333 +lat_2=49.8333339 +lat_0=90 +lon_0=4.367486666666666 +x_0=150000.013 +y_0=5400088.438 +ellps=intl';

export const LAMBERT72_DEFINITION = `${LAMBERT72_PROJECTION} +towgs84=-106.869,52.2978,-103.724,0.3366,-0.457,1.8422,-1.2747 +units=m +no_defs`;

export const LAMBERT2008_DEFINITION =
    '+proj=lcc +lat_0=50.797815 +lon_0=4.35921583333333 +lat_1=49.8333333333333 +lat_2=51.1666666666667 +x_0=649328 +y_0=665262 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs';

const LAMBERT72_NTV2_DEFINITION = `${LAMBERT72_PROJECTION} +nadgrids=${NTV2_GRID_KEY} +units=m +no_defs`;

type CoordinateTransform = (coordinate: Coordinate) => Coordinate;

let transformation: LambertTransformation = 'helmert';
let gridSettled = false;
let gridLoading: Promise<LambertTransformation> | undefined;

export const getLambertTransformation = (): LambertTransformation => transformation;

export const isLambertGridSettled = (): boolean => gridSettled;

export const isLambert72And2008 = (code: string, otherCode: string): boolean => {
    const codes = [code, otherCode];
    return codes.includes(getLambert72Code()) && codes.includes(getLambert2008Code());
};

export const ensureLambertGrid = (): Promise<LambertTransformation> => (gridLoading ??= loadLambertGrid());

const loadLambertGrid = async (): Promise<LambertTransformation> => {
    try {
        registerNtv2Transforms(await fetchGrid());
        transformation = 'ntv2';
    } catch (error) {
        console.error(
            `vl-map: het NTv2-grid kon niet geladen worden van ${NTV2_GRID_URL}. Lambert 72 en Lambert 2008 worden omgezet met de Helmert-transformatie.`,
            error
        );
    }
    gridSettled = true;
    return transformation;
};

const fetchGrid = async (): Promise<ArrayBuffer> => {
    const response = await fetch(NTV2_GRID_URL, { signal: AbortSignal.timeout(NTV2_GRID_TIMEOUT_IN_SECONDS * 1000) });
    if (!response.ok) {
        throw new Error(`HTTP-status ${response.status}`);
    }
    const grid = await response.arrayBuffer();
    // proj4 controleert het formaat niet en logt bij bv. een HTML-pagina eerst een console.warn.
    if (new TextDecoder().decode(grid.slice(0, 8)) !== 'NUM_OREC') {
        throw new Error('het antwoord is geen NTv2-bestand');
    }
    return grid;
};

const registerNtv2Transforms = (grid: ArrayBuffer): void => {
    proj4.nadgrid(NTV2_GRID_KEY, grid);
    const viaGrid = proj4(LAMBERT72_NTV2_DEFINITION, getLambert2008Code());
    const viaHelmert = proj4(getLambert72Code(), getLambert2008Code());
    const lambert72ToWgs84 = proj4(getLambert72Code(), getWGS84Code());
    const lambert2008ToWgs84 = proj4(getLambert2008Code(), getWGS84Code());

    // Overschrijft de Helmert-transforms die register(proj4) registreerde; register() zelf laat bestaande paren ongemoeid.
    addCoordinateTransforms(
        getLambert72Code(),
        getLambert2008Code(),
        withHelmertFallback(viaGrid.forward, viaHelmert.forward, lambert72ToWgs84.forward),
        withHelmertFallback(viaGrid.inverse, viaHelmert.inverse, lambert2008ToWgs84.forward)
    );
};

const withHelmertFallback =
    (
        viaGrid: CoordinateTransform,
        viaHelmert: CoordinateTransform,
        toWgs84: CoordinateTransform
    ): CoordinateTransform =>
    (coordinate) =>
        transformInGrid(viaGrid, toWgs84, coordinate) ?? viaHelmert(coordinate);

const transformInGrid = (
    viaGrid: CoordinateTransform,
    toWgs84: CoordinateTransform,
    coordinate: Coordinate
): Coordinate | undefined => {
    try {
        if (!containsCoordinate(NTV2_GRID_EXTENT_WGS84, toWgs84(coordinate))) {
            return undefined;
        }
        const transformed = viaGrid(coordinate);
        return Number.isFinite(transformed[0]) && Number.isFinite(transformed[1]) ? transformed : undefined;
    } catch {
        // De controle in WGS84 wijkt tot ~100 m af van het datum van het grid, dus vlak bij de rand kan proj4 nog falen.
        return undefined;
    }
};
