import type { ChartModel, ChartSeries, ChartSource } from '../models/chart.model';
import type { PeriodRange } from './period';

// De SensorThings API (OGC)
// `src` moet hier een Thing of een Datastream zijn.

export interface SensorThingsDatastream {
    '@iot.selfLink'?: string;
    name: string;
    observationType?: string;
    unitOfMeasurement?: { name?: string | null; symbol?: string | null; definition?: string | null };
    properties?: {
        unitDefinition?: string;
        /** De record van deze data in de metadatacatalogus. */
        source?: Partial<ChartSource>;
        isOpenData?: boolean;
        gapThreshold?: string | null;
    };
    ObservedProperty?: { name?: string; properties?: { unitDefinition?: string } };
    Thing?: { name?: string; '@iot.selfLink'?: string };
}

/** Observaties als `$resultFormat=dataArray`: object met kolomnamen en
 *  rijen. */
interface DataArrayGroup {
    components: string[];
    dataArray: unknown[][];
}

interface DataArrayPage {
    value: DataArrayGroup[];
    '@iot.nextLink'?: string;
}

const MEASUREMENT = 'http://www.opengis.net/def/observationType/OGC-OM/2.0/OM_Measurement';
/** Hoeveel observaties we per pagina vragen. */
const PAGE_SIZE = 10000;
/** Bij elke soort bron mee opvragen: de Datastreams, en de naam van
 *  het Thing. */
const DESCRIPTION_EXPANDS: Record<string, string> = {
    Things: 'Datastreams($expand=ObservedProperty)',
    Datastreams: 'Thing,ObservedProperty',
};

/** De URL van de beschrijving van de bron */
export function buildSensorThingsDescriptionUrl(src: string): string {
    const url = new URL(src, document.baseURI);
    const entitySet = /\/(Things|Datastreams)\([^)]+\)$/.exec(url.pathname)?.[1];
    if (!entitySet) {
        throw new Error(
            'format="sensorthings" verwacht een src naar één Thing of één Datastream, bv. …/v1.1/Things(1). Kijk de URL van je bron na.',
        );
    }
    url.searchParams.set('$expand', DESCRIPTION_EXPANDS[entitySet]);
    return toUrlWithSpaces(url);
}

export function findMeasurements(description: unknown): SensorThingsDatastream[] {
    const measurements = readDatastreams(description).filter(
        (datastream) => datastream.observationType === MEASUREMENT,
    );
    if (measurements.length === 0) throw new Error('De bron heeft geen Datastream met getallen.');
    const unit = measurements[0].unitOfMeasurement?.symbol;
    if (measurements.some((datastream) => datastream.unitOfMeasurement?.symbol !== unit)) {
        throw new Error('De Datastreams hebben verschillende eenheden: toon ze in aparte grafieken.');
    }
    if (measurements.some((datastream) => !datastream['@iot.selfLink'])) {
        throw new Error('De Datastreams van de bron hebben geen @iot.selfLink.');
    }
    return measurements;
}

/** Waar de observaties van een Datastream staan. */
export function findObservationsUrl(datastream: SensorThingsDatastream): string {
    return `${datastream['@iot.selfLink']}/Observations`;
}

/** De observaties van één periode, in volgorde van tijd, als compacte rijen. */
export function buildSensorThingsUrl(src: string, { from, to }: PeriodRange): string {
    const url = new URL(src, document.baseURI);
    url.searchParams.set(
        '$filter',
        `phenomenonTime ge ${from.toISOString()} and phenomenonTime lt ${to.toISOString()}`,
    );
    url.searchParams.set('$orderby', 'phenomenonTime asc');
    url.searchParams.set('$resultFormat', 'dataArray');
    url.searchParams.set('$top', String(PAGE_SIZE));
    return toUrlWithSpaces(url);
}

export function findNextSensorThingsPage(page: unknown): string | null {
    return (page as DataArrayPage | null)?.['@iot.nextLink'] ?? null;
}

export function readSensorThings(measurements: SensorThingsDatastream[], pages: unknown[][]): ChartModel {
    if (!pages.flat().every(isDataArrayPage)) {
        throw new Error('Het antwoord van de bron is geen SensorThings-lijst met $resultFormat=dataArray.');
    }
    const [first] = measurements;
    return {
        meta: {
            sources: readSources(measurements),
            isOpenData: first.properties?.isOpenData,
            x: { type: 'time' },
            y: {
                type: 'number',
                title: first.ObservedProperty?.name,
                unit: first.unitOfMeasurement?.symbol ?? undefined,
                // De uitleg voor de lezer hoort bij de grootheid; zolang de Datastream ze draagt, lezen we die.
                unitInfo: first.ObservedProperty?.properties?.unitDefinition ?? first.properties?.unitDefinition,
            },
        },
        series: measurements.map((datastream, index) => ({
            name: nameSeries(datastream, measurements.length),
            ...readSeries(
                datastream,
                (pages[index] as DataArrayPage[]).flatMap((page) => page.value),
            ),
        })),
    };
}

function readSources(measurements: SensorThingsDatastream[]): ChartSource[] {
    const datastreamsPerSource = new Map<string, SensorThingsDatastream[]>();
    for (const datastream of measurements) {
        const key = datastream.properties?.source?.metadataId ?? datastream.properties?.source?.title ?? '';
        datastreamsPerSource.set(key, [...(datastreamsPerSource.get(key) ?? []), datastream]);
    }
    return [...datastreamsPerSource.values()].map((datastreams) => {
        const source = datastreams[0].properties?.source ?? {};
        return { ...source, dataHref: source.dataHref ?? findDataHref(datastreams) };
    });
}

function findDataHref(datastreams: SensorThingsDatastream[]): string | undefined {
    if (datastreams.length === 1) return datastreams[0]['@iot.selfLink'];
    const thing = datastreams[0].Thing?.['@iot.selfLink'];
    return datastreams.every((datastream) => datastream.Thing?.['@iot.selfLink'] === thing) ? thing : undefined;
}

function nameSeries(datastream: SensorThingsDatastream, measurementCount: number): string {
    if (measurementCount > 1) return datastream.name;
    return datastream.Thing?.name ?? datastream.name;
}

function toUrlWithSpaces(url: URL): string {
    url.search = url.searchParams.toString().replace(/\+/g, '%20');
    return url.toString();
}

function isDataArrayPage(page: unknown): page is DataArrayPage {
    const value = (page as DataArrayPage | null)?.value;
    return Array.isArray(value) && value.every((group) => Array.isArray(group?.dataArray));
}

/** Een Thing met zijn Datastreams, of één Datastream met haar Thing. */
function readDatastreams(description: unknown): SensorThingsDatastream[] {
    const entity = description as { Datastreams?: SensorThingsDatastream[]; name?: string } | null;
    if (Array.isArray(entity?.Datastreams)) {
        return entity.Datastreams.map((datastream) => ({ ...datastream, Thing: datastream.Thing ?? entity }));
    }
    if (entity && 'observationType' in entity) return [entity as SensorThingsDatastream];
    return [];
}

function readSeries(datastream: SensorThingsDatastream, groups: DataArrayGroup[]): Omit<ChartSeries, 'name'> {
    const gapThreshold = parseDuration(datastream.properties?.gapThreshold);
    const x: number[] = [];
    const y: number[] = [];
    for (const [time, result] of readRows(groups)) {
        const previous = x[x.length - 1];
        // Geen meting waar er een had moeten zijn: een onderbreking op dat moment, zodat de lijn er niet overheen loopt.
        if (time - previous > gapThreshold) {
            x.push(previous + gapThreshold);
            y.push(NaN);
        }
        x.push(time);
        y.push(typeof result === 'number' ? result : NaN);
    }
    return { x: Float64Array.from(x), y: Float64Array.from(y) };
}

/** De rijen als [tijd in milliseconden, resultaat]. */
function readRows(groups: DataArrayGroup[]): [number, unknown][] {
    return groups.flatMap((group) => {
        const timeColumn = group.components.indexOf('phenomenonTime');
        const resultColumn = group.components.indexOf('result');
        if (timeColumn === -1 || resultColumn === -1) {
            throw new Error('De observaties van de bron hebben geen kolom phenomenonTime of result.');
        }
        return group.dataArray.map((row): [number, unknown] => [readTime(row[timeColumn]), row[resultColumn]]);
    });
}

function readTime(phenomenonTime: unknown): number {
    return Date.parse(String(phenomenonTime).split('/')[0]);
}

export function parseDuration(value: string | null | undefined): number {
    const match = /^P(?:(\d+)D)?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?)?$/.exec(value ?? '');
    if (!match) return Infinity;
    const [days, hours, minutes, seconds] = match.slice(1).map((part) => Number(part ?? 0));
    const duration = (((days * 24 + hours) * 60 + minutes) * 60 + seconds) * 1000;
    return duration > 0 ? duration : Infinity;
}
