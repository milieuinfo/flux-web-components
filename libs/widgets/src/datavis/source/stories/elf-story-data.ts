import { delay, http, HttpResponse } from 'msw';
import { VENTILUS_SOURCE } from './catalogue-sources';
import type { ChartModelJson } from '../chart-model-json';
import sensorThingsObservations from './sample-data/beringen-sens-269-2025-12-01-observations.json';
import sensorThingsThings from './sample-data/beringen-sens-269-metadata.json';

// Voorbeelddata voor de stories van de bron: een gesimuleerde ELF-sensor (magnetisch veld langs een
// hoogspanningslijn), zoals in de PoC. De mock-API antwoordt op `from` en `to`, zoals een echte bron.

export const ELF_SRC = 'api/elf/sensors/ELF_L_0004';

// Een SensorThings API zoals FROST, met de voorbeelddata van sensor SENS-269 in Beringen op 1 december 2025. De
// mock antwoordt altijd met die dag, welke periode er ook gevraagd wordt.
export const ELF_SENSORTHINGS_SRC = 'api/frost/v1.1/Things(1)';
export const ELF_SENSORTHINGS_END = '2025-12-01';

/** De voorbeelddata linkt naar example.org; de mock laat die links naar zichzelf wijzen. */
function linkToMock<T>(data: T): T {
    const mock = new URL('api/frost/v1.1', document.baseURI).href;
    return JSON.parse(JSON.stringify(data).split('https://example.org/FROST-Server/v1.1').join(mock));
}

const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

/** Hoe lang de periode, hoe minder punten per uur: een lijn van 50.000 punten leest niemand. */
function pickStep(span: number): number {
    if (span <= DAY) return 10 * MINUTE;
    if (span <= 7 * DAY) return HOUR;
    if (span <= 31 * DAY) return 4 * HOUR;
    return DAY;
}

/** Een veld dat met het verbruik meegaat: hoger overdag, lager 's nachts, met wat ruis. Altijd dezelfde waarde voor
 *  hetzelfde tijdstip, zodat de story bij elke keer laden hetzelfde toont. */
export function fieldAt(time: number, level = 0.3): number {
    const hours = new Date(time).getHours() + new Date(time).getMinutes() / 60;
    const daily = 0.12 * Math.sin(((hours - 9) / 24) * 2 * Math.PI);
    const noise = 0.02 * Math.sin(time / (7 * MINUTE)) + 0.015 * Math.sin(time / (53 * MINUTE));
    return Math.round((level + (daily + noise) * (level / 0.3)) * 1000) / 1000;
}

/** Een sensor van de voorbeelddata: zijn naam in de reeks en rond welk niveau zijn veld schommelt (µT). */
export type ElfSensorLevel = { name: string; level: number };

const TEMSE: ElfSensorLevel = { name: 'Temse', level: 0.3 };

export function buildElfJson(from: number, to: number, { name, level }: ElfSensorLevel = TEMSE): ChartModelJson {
    const step = pickStep(to - from);
    const end = Math.min(to, Date.now()); // geen metingen in de toekomst
    const x: string[] = [];
    const y: number[] = [];
    for (let time = from; time < end; time += step) {
        x.push(new Date(time).toISOString());
        y.push(fieldAt(time, level));
    }
    return {
        meta: {
            sources: [VENTILUS_SOURCE],
            x: { type: 'time' },
            y: {
                type: 'number',
                title: 'Magnetische veldsterkte',
                unit: 'µT',
                unitInfo: 'microtesla, de sterkte van het magnetisch veld. De EU-limiet voor de bevolking is 100 µT.',
            },
        },
        series: [{ name, x, y }],
    };
}

export const elfHandlers = [
    http.get(`*/${ELF_SRC}`, async ({ request }) => {
        const params = new URL(request.url).searchParams;
        await delay(300); // zoals een echte bron: even laden
        return HttpResponse.json(
            buildElfJson(Date.parse(params.get('from') ?? ''), Date.parse(params.get('to') ?? '')),
        );
    }),
    http.get(/\/api\/frost\/v1\.1\/Things\(1\)/, () => HttpResponse.json(linkToMock(sensorThingsThings.value[0]))),
    http.get(/\/api\/frost\/v1\.1\/Datastreams\(\d+\)\/Observations/, async ({ request }) => {
        const datastream = /Datastreams\(\d+\)/.exec(request.url)?.[0] ?? '';
        const group = sensorThingsObservations.value.find((one) =>
            one['Datastream@iot.navigationLink'].endsWith(datastream),
        );
        await delay(300);
        return HttpResponse.json({ value: group ? [group] : [] });
    }),
];
