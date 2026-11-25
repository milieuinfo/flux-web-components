import { METADATA_CATALOGUE } from './metadata-catalogue';

// Het ChartModel is het contract tussen data en de benodigde data
// om de grafiek te tekenen. Elk grafiektype tekent vanuit dit model.

/** Eén as en bijhorende schaal van de grafiek */
export interface ChartAxis {
    type: 'number' | 'time' | 'category';
    title?: string;
    unit?: string;
    unitInfo?: string;
}

/** Eén bron van de data, zoals beschreven in de metadatacatalogus van Omgeving. Met een `metadataId` volstaat die
 *  sleutel: titel, eigenaar en licentie komen dan uit de record (zie metadata-catalogue.ts). */
export interface ChartSource {
    /** De sleutel (UUID) van de metadatarecord in de catalogus. */
    metadataId?: string;
    title?: string;
    href?: string;
    owner?: string;
    license?: { title: string; href?: string };
    dataHref?: string;
    isOpenData?: boolean;
}
// TODO: referentiedata
export interface ChartMeta {
    /** Minstens één; een grafiek kan data van meer dan één bron combineren. */
    sources: ChartSource[];
    isOpenData?: boolean;
    x: ChartAxis;
    y: ChartAxis;
}

/** Eén volledige reeks (alle metingen van 1 object) getekend als één lijn. */
export interface ChartSeries {
    name: string;
    x: Float64Array | string[];
    y: Float64Array;
}

/** Het contract tussen data en grafiek en bevat alles
 *  wat een grafiektype nodig heeft om te kunnen tekenen. */
export interface ChartModel {
    meta: ChartMeta;
    series: ChartSeries[];
}

/** Wat de grafiek op elk moment kan tonen.
 *  Alleen 'data' en 'partial' hebben een model om te tekenen. */
// TODO: `partial` overbodig?
export type DataState =
    | { status: 'loading' }
    | { status: 'data'; model: ChartModel }
    | { status: 'partial'; model: ChartModel }
    | { status: 'empty' }
    | { status: 'error'; problems: string[] };

/** Het model om te tekenen, of `null` als er (nog) niets te tekenen valt.
 *
 * @example
 * const model = findModel(state)
 * if (!model) return;
 * draw(model); */
export function findModel(dataState: DataState | undefined): ChartModel | null {
    return dataState && 'model' in dataState ? dataState.model : null;
}

const RECORD_PAGE = `${METADATA_CATALOGUE}/srv/dut/catalog.search#/metadata/`;

/** Link naar de beschrijving van een bron vindt. */
export function findSourceHref(source: ChartSource): string | undefined {
    if (source.href) return source.href;
    return source.metadataId ? `${RECORD_PAGE}${encodeURIComponent(source.metadataId)}` : undefined;
}

export function nameSource(source: ChartSource): string {
    return source.title || `Metadatarecord ${source.metadataId ?? ''}`.trim();
}

export function isOpenData(meta: ChartMeta): boolean {
    const fromRecords = meta.sources.map((source) => source.isOpenData);
    if (fromRecords.includes(false)) return false;
    if (fromRecords.every((value) => value === true)) return true;
    return meta.isOpenData ?? false;
}
