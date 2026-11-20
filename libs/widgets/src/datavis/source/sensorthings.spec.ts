import observations from './stories/sample-data/beringen-sens-269-2025-12-01-observations.json';
import things from './stories/sample-data/beringen-sens-269-metadata.json';
import {
    buildSensorThingsDescriptionUrl,
    buildSensorThingsUrl,
    findMeasurements,
    findNextSensorThingsPage,
    findObservationsUrl,
    parseDuration,
    readSensorThings,
} from './sensorthings';

const MEASUREMENT = 'http://www.opengis.net/def/observationType/OGC-OM/2.0/OM_Measurement';
const FROST = 'https://frost.example/v1.1';

/** De Thing van de voorbeelddata, zoals `Things(1)?$expand=Datastreams(...)` hem geeft. */
const thing = things.value[0];
/** De observaties van de voorbeelddata van Datastream 1, zoals `Datastreams(1)/Observations` ze geeft. */
const magneticFieldPage = { value: [observations.value[0]] };

const datastream = (overrides: object = {}) => ({
    '@iot.selfLink': `${FROST}/Datastreams(1)`,
    name: 'Magnetische fluxdichtheid — SENS-269',
    observationType: MEASUREMENT,
    unitOfMeasurement: { name: 'microtesla', symbol: 'µT' },
    properties: { source: { title: 'Departement Omgeving' }, gapThreshold: 'PT5M' },
    ...overrides,
});

const page = (rows: [string, number | null][]) => ({
    value: [
        {
            components: ['id', 'phenomenonTime', 'result'],
            dataArray: rows.map(([time, result], id) => [id, time, result]),
        },
    ],
});

describe('jest - widgets - buildSensorThingsDescriptionUrl', () => {
    it('should ask a Thing with its Datastreams and their ObservedProperty', () => {
        const url = new URL(buildSensorThingsDescriptionUrl(`${FROST}/Things(1)`));

        expect(url.pathname).toBe('/v1.1/Things(1)');
        expect(url.searchParams.get('$expand')).toBe('Datastreams($expand=ObservedProperty)');
    });

    it('should ask a Datastream with its Thing and ObservedProperty', () => {
        const url = new URL(buildSensorThingsDescriptionUrl(`${FROST}/Datastreams('elf-269')`));

        expect(url.searchParams.get('$expand')).toBe('Thing,ObservedProperty');
    });

    it('should refuse a src that is no Thing or Datastream', () => {
        expect(() => buildSensorThingsDescriptionUrl(`${FROST}/Observations`)).toThrow('één Thing of één Datastream');
    });
});

describe('jest - widgets - findMeasurements', () => {
    it('should keep only the Datastreams with numbers of the sample, with their Thing', () => {
        const measurements = findMeasurements(thing);

        expect(measurements.map((one) => one.name)).toEqual(['Magnetische fluxdichtheid — SENS-269']);
        expect(measurements[0].Thing?.name).toBe('Meetpunt Beringen');
        expect(findObservationsUrl(measurements[0])).toBe(
            'https://example.org/FROST-Server/v1.1/Datastreams(1)/Observations',
        );
    });

    it('should read one Datastream as well', () => {
        expect(findMeasurements(datastream())).toHaveLength(1);
    });

    it('should refuse Datastreams with different units in one chart', () => {
        const twoUnits = {
            name: 'Meetpunt',
            Datastreams: [datastream(), datastream({ unitOfMeasurement: { symbol: 'V/m' } })],
        };

        expect(() => findMeasurements(twoUnits)).toThrow('verschillende eenheden');
    });

    it('should refuse a source without numbers', () => {
        expect(() => findMeasurements({ name: 'Meetpunt', Datastreams: [] })).toThrow('geen Datastream met getallen');
    });
});

describe('jest - widgets - readSensorThings', () => {
    it('should draw the sample as a series of its Thing, with unit, title and source', () => {
        const model = readSensorThings(findMeasurements(thing), [[magneticFieldPage]]);

        expect(model.series.map((series) => series.name)).toEqual(['Meetpunt Beringen']);
        expect(model.meta).toMatchObject({
            sources: [
                {
                    metadataId: '1fe4dff9-87b4-5646-b29a-a026025f520e',
                    dataHref: 'https://example.org/FROST-Server/v1.1/Datastreams(1)',
                },
            ],
            isOpenData: false,
            x: { type: 'time' },
            y: { type: 'number', title: 'Magnetische fluxdichtheid', unit: 'µT' },
        });
        expect(model.meta.y.unitInfo).toContain('microtesla');
    });

    it('should keep the owner and license of a source', () => {
        const source = {
            title: 'Maatwerkgebieden stikstofdecreet',
            owner: 'Agentschap voor Natuur en Bos',
            license: { title: 'Modellicentie gratis hergebruik' },
        };

        const model = readSensorThings([datastream({ properties: { source } })], [[magneticFieldPage]]);

        expect(model.meta.sources).toEqual([{ ...source, dataHref: `${FROST}/Datastreams(1)` }]);
    });

    it('should link a source to its data: its Datastream, or the Thing they share', () => {
        const thing = { name: 'Meetpunt Beringen', '@iot.selfLink': `${FROST}/Things(1)` };
        const elf = { title: 'ELF-meetnet' };
        const measurements = [
            datastream({ Thing: thing, properties: { source: elf } }),
            datastream({ Thing: thing, '@iot.selfLink': `${FROST}/Datastreams(2)`, properties: { source: elf } }),
            datastream({ '@iot.selfLink': `${FROST}/Datastreams(3)`, properties: { source: { title: 'Eigen' } } }),
        ];

        const sources = readSensorThings(measurements, [[page([])], [page([])], [page([])]]).meta.sources;

        expect(sources.map((source) => source.dataHref)).toEqual([`${FROST}/Things(1)`, `${FROST}/Datastreams(3)`]);
    });

    it('should keep a data link the platform gives itself', () => {
        const source = { title: 'Eigen', dataHref: 'https://example.org/download' };

        const model = readSensorThings([datastream({ properties: { source } })], [[magneticFieldPage]]);

        expect(model.meta.sources[0].dataHref).toBe('https://example.org/download');
    });

    it('should place an observation over a period, like a yearly average, at the start of that period', () => {
        const yearly = page([['2024-01-01T00:00:00Z/2025-01-01T00:00:00Z', 12.5]]);

        const [series] = readSensorThings([datastream()], [[yearly]]).series;

        expect(Array.from(series.x as Float64Array)).toEqual([Date.parse('2024-01-01T00:00:00Z')]);
    });

    it('should name every source once, also when several Datastreams share one', () => {
        const nitrogen = {
            title: 'Maatwerkgebieden stikstofdecreet',
            metadataId: '449f14d5-c179-58ae-95be-15fc48fdd414',
        };
        const measurements = [
            datastream({ properties: { source: nitrogen } }),
            datastream({ properties: { source: { title: 'Departement Omgeving' } } }),
            datastream({ properties: { source: nitrogen } }),
        ];
        const pages = measurements.map(() => [magneticFieldPage]);

        expect(readSensorThings(measurements, pages).meta.sources.map((source) => source.title)).toEqual([
            'Maatwerkgebieden stikstofdecreet',
            'Departement Omgeving',
        ]);
    });

    it('should name each series after its Datastream when the Thing has more than one', () => {
        const thingName = { Thing: { name: 'Meetpunt Beringen' } };
        const model = readSensorThings(
            [datastream({ ...thingName, name: 'Sensor A' }), datastream({ ...thingName, name: 'Sensor B' })],
            [[page([])], [page([])]],
        );

        expect(model.series.map((series) => series.name)).toEqual(['Sensor A', 'Sensor B']);
    });

    it('should break the line where the sample is silent for longer than gapThreshold', () => {
        const [series] = readSensorThings(findMeasurements(thing), [[magneticFieldPage]]).series;

        expect(Array.from(series.y).filter(Number.isNaN)).toHaveLength(3);
        expect(series.x).toHaveLength(1380 + 3);
    });

    it('should put the gap at the moment the next measurement was due', () => {
        const [series] = readSensorThings(
            [datastream()],
            [
                [
                    page([
                        ['2025-12-01T10:00:00Z', 0.4],
                        ['2025-12-01T10:20:00Z', 0.5],
                    ]),
                ],
            ],
        ).series;

        expect(Array.from(series.x as Float64Array)).toEqual([
            Date.parse('2025-12-01T10:00:00Z'),
            Date.parse('2025-12-01T10:05:00Z'),
            Date.parse('2025-12-01T10:20:00Z'),
        ]);
        expect(Array.from(series.y)).toEqual([0.4, NaN, 0.5]);
    });

    it('should read all pages, and a missing result as a gap', () => {
        const [series] = readSensorThings(
            [datastream()],
            [[page([['2025-12-01T10:00:00Z', 0.4]]), page([['2025-12-01T10:01:00Z', null]])]],
        ).series;

        expect(Array.from(series.y)).toEqual([0.4, NaN]);
    });

    it('should prefer the explanation of the unit on the ObservedProperty', () => {
        const model = readSensorThings(
            [
                datastream({
                    properties: { source: { title: 'Departement Omgeving' }, unitDefinition: 'Van de Datastream' },
                    ObservedProperty: { name: 'Magnetisch veld', properties: { unitDefinition: 'Van de grootheid' } },
                }),
            ],
            [[page([])]],
        );

        expect(model.meta.y.unitInfo).toBe('Van de grootheid');
    });

    it('should refuse an answer that is not a dataArray', () => {
        expect(() => readSensorThings([datastream()], [[{ value: [{ result: 1 }] }]])).toThrow('dataArray');
    });
});

describe('jest - widgets - buildSensorThingsUrl', () => {
    const range = { from: new Date(Date.UTC(2025, 10, 30, 23)), to: new Date(Date.UTC(2025, 11, 1, 23)) };

    it('should ask the observations of the period as a dataArray, in time order', () => {
        const url = new URL(buildSensorThingsUrl(`${FROST}/Datastreams(1)/Observations`, range));

        expect(url.searchParams.get('$filter')).toBe(
            'phenomenonTime ge 2025-11-30T23:00:00.000Z and phenomenonTime lt 2025-12-01T23:00:00.000Z',
        );
        expect(url.searchParams.get('$resultFormat')).toBe('dataArray');
        expect(url.searchParams.get('$orderby')).toBe('phenomenonTime asc');
        expect(url.search).not.toContain('+');
    });
});

describe('jest - widgets - findNextSensorThingsPage', () => {
    it('should follow @iot.nextLink until there is none', () => {
        expect(findNextSensorThingsPage({ value: [], '@iot.nextLink': `${FROST}/next` })).toBe(`${FROST}/next`);
        expect(findNextSensorThingsPage({ value: [] })).toBeNull();
    });
});

describe('jest - widgets - parseDuration', () => {
    it('should read an ISO 8601 duration in milliseconds, and never a gap without one', () => {
        expect(parseDuration('PT5M')).toBe(5 * 60 * 1000);
        expect(parseDuration('PT1H30S')).toBe((60 * 60 + 30) * 1000);
        expect(parseDuration(null)).toBe(Infinity);
        expect(parseDuration('P')).toBe(Infinity);
    });
});
