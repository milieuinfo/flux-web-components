import type { ChartModel } from './chart.model';

/** Er kunnen aximum 6 reeksen op één lijngrafiek worden weergegeven. Als er
 *  meer dan zes reeksen moeten getoond worden is
 *  het misschien best om de grafiek of layout te herzien of nieuwe
 *  afwegingen te maken hoe de data te structureren. */
export const MAX_SERIES = 6;

/** Checkt of een model getekend kan worden. Alle problemen worden in een
 *  lijst opgesomd, de lijst is leeg als er geen zijn. */
export function validateChartModel(model: ChartModel): string[] {
    if (!model?.meta?.x || !model.meta.y || !Array.isArray(model.series)) {
        return ['Het model heeft niet de vorm { meta: { x, y }, series: [] }.'];
    }
    const problems: string[] = [];
    if (!model.meta.sources?.length || model.meta.sources.some((source) => !source.title && !source.metadataId)) {
        problems.push('De data heeft geen bron.');
    }
    if (model.series.length > MAX_SERIES) {
        problems.push(
            `Het model heeft ${model.series.length} reeksen; hoogstens ${MAX_SERIES} zijn leesbaar te kleuren.`,
        );
    }
    if (model.series.length > 0 && !model.meta.y.unit) {
        problems.push('De y-as heeft geen eenheid.');
    }

    for (const series of model.series) {
        if (series.x.some((value) => Number.isNaN(value))) {
            problems.push(`Reeks '${series.name}' heeft x-waarden die geen getal zijn.`);
        }
        if (series.x?.length !== series.y?.length) {
            problems.push(`Reeks '${series.name}': x en y zijn niet even lang.`);
        }
    }

    return problems;
}

/** Elke bron hoort een record in de metadatacatalogus te hebben, zodat de
 *  lezer kan nagaan waar de cijfers vandaan komen. */
export function findSourceWarnings(model: ChartModel): string[] {
    return model.meta.sources
        .filter((source) => !source.metadataId)
        .map(
            (source) => `Bron '${source.title}' heeft geen metadataId: de lezer kan haar niet in de catalogus vinden.`,
        );
}
