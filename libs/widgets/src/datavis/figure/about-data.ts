import { findSourceHref, isOpenData, nameSource, type ChartMeta, type ChartSource } from '../models/chart.model';

export type AboutEntry = { term: string; description: string; href?: string; isSubtle?: boolean };

/** Tekst/paragraphs dat samen horen. */
export type AboutGroup = AboutEntry[];

const OPEN_DATA_DESCRIPTIONS = {
    one: 'De bron publiceert deze cijfers als Vlaamse Open Data.',
    many: 'Alle bronnen publiceren deze cijfers als Vlaamse Open Data.',
};
const DATA_DESCRIPTION = 'De cijfers bij de bron';

/** Wat het datacontract zelf over de data vertelt: per bron een groep (titel,
 *  eigenaar, licentie, sleutel en data) */
export function buildAboutGroups(meta: ChartMeta, openDataHref: string): AboutGroup[] {
    const isMany = meta.sources.length > 1;
    const groups = meta.sources.map((source, index) => describeSource(source, isMany ? `Bron ${index + 1}` : 'Bron'));
    const figure: AboutGroup = [];
    if (meta.y.unit) figure.push({ term: 'Eenheid', description: meta.y.unit });
    if (isOpenData(meta)) {
        const description = isMany ? OPEN_DATA_DESCRIPTIONS.many : OPEN_DATA_DESCRIPTIONS.one;
        figure.push({ term: 'Open data', description, href: openDataHref });
    }
    return figure.length > 0 ? [...groups, figure] : groups;
}

/** Bron: de dataset met link, de auteur, onder welke licentie, metadatakey
 *  en waar de data staat. */
function describeSource(source: ChartSource, term: string): AboutGroup {
    const group: AboutGroup = [{ term, description: nameSource(source), href: findSourceHref(source) }];
    if (source.owner) group.push({ term: 'Eigenaar', description: source.owner });
    if (source.license) group.push({ term: 'Licentie', description: source.license.title, href: source.license.href });
    if (source.metadataId) group.push({ term: 'Metadata-ID', description: source.metadataId, isSubtle: true });
    if (source.dataHref) group.push({ term: 'Data', description: DATA_DESCRIPTION, href: source.dataHref });
    return group;
}

export function hasAboutDetails(meta: ChartMeta): boolean {
    return meta.sources.some((source) => source.metadataId || source.license || source.dataHref);
}
