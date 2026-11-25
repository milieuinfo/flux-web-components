import type { ChartModel, ChartSeries } from '../../models/chart.model';
import { STIKSTOF_SOURCE, VLOPS_NH3_SOURCE } from '../../source/stories/catalogue-sources';

// Voorbeelddata voor de stories van de figuur en haar onderdelen: elk onderdeel leest de data van de grafiek in
// zijn figuur, dus elke story toont een figuur.

const years = Float64Array.from([2018, 2019, 2020, 2021, 2022, 2023, 2024]);

const buildSeries = (name: string, y: number[]): ChartSeries => ({ name, x: years, y: Float64Array.from(y) });

const buildModel = (series: ChartSeries[]): ChartModel => ({
    meta: {
        sources: [VLOPS_NH3_SOURCE],
        isOpenData: true,
        x: { type: 'number', title: 'Jaar' },
        y: { type: 'number', title: 'Concentratie', unit: 'µg/m³' },
    },
    series,
});

export const twoSeriesModel = buildModel([
    buildSeries('Meetpunt Gent', [12.5, 13.1, 12.8, 11.9, 11.2, 10.8, 10.1]),
    buildSeries('Meetpunt Antwerpen', [15.2, 14.7, 14.9, 13.8, 13.1, 12.6, 12.2]),
]);

/** Met uitleg bij de eenheid: die staat naast de as, achter de info-knop. */
export const unitInfoModel: ChartModel = {
    ...twoSeriesModel,
    meta: {
        ...twoSeriesModel.meta,
        y: { ...twoSeriesModel.meta.y, unitInfo: 'microgram per kubieke meter lucht, gemiddeld over het jaar' },
    },
};

/** Twee bronnen uit de catalogus: onder de grafiek beide titels met hun eigenaar, in "Over deze data" per bron de
 *  link, sleutel en licentie. */
export const catalogueSourceModel: ChartModel = {
    ...twoSeriesModel,
    meta: { ...twoSeriesModel.meta, sources: [VLOPS_NH3_SOURCE, STIKSTOF_SOURCE] },
};
