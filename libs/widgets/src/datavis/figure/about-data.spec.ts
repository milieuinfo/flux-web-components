import type { ChartMeta } from '../models/chart.model';
import { buildAboutGroups, hasAboutDetails } from './about-data';

const OPEN_DATA_HREF = 'https://www.vlaanderen.be/open-data';

const buildMeta = (meta: Partial<ChartMeta> = {}): ChartMeta => ({
    sources: [{ title: 'Vlaamse Milieumaatschappij' }],
    x: { type: 'number', title: 'Jaar' },
    y: { type: 'number', title: 'Magnetische veldsterkte', unit: 'µT' },
    ...meta,
});

const NITROGEN = {
    title: 'Maatwerkgebieden stikstofdecreet',
    metadataId: '449f14d5-c179-58ae-95be-15fc48fdd414',
    owner: 'Agentschap voor Natuur en Bos',
    license: { title: 'Modellicentie gratis hergebruik', href: 'https://example.org/licentie' },
};

const terms = (meta: ChartMeta) => buildAboutGroups(meta, OPEN_DATA_HREF).map((group) => group.map((e) => e.term));

describe('jest - widgets - buildAboutGroups', () => {
    it('should name the source, with its link', () => {
        const meta = buildMeta({ sources: [{ title: 'Vlaamse Milieumaatschappij', href: 'https://www.vmm.be' }] });

        expect(buildAboutGroups(meta, OPEN_DATA_HREF)[0][0]).toEqual({
            term: 'Bron',
            description: 'Vlaamse Milieumaatschappij',
            href: 'https://www.vmm.be',
        });
    });

    it('should give a source its owner, license, record and key in one group', () => {
        const [source] = buildAboutGroups(buildMeta({ sources: [NITROGEN] }), OPEN_DATA_HREF);

        expect(source).toEqual([
            {
                term: 'Bron',
                description: 'Maatwerkgebieden stikstofdecreet',
                href: 'https://metadata.omgeving.vlaanderen.be/srv/dut/catalog.search#/metadata/449f14d5-c179-58ae-95be-15fc48fdd414',
            },
            { term: 'Eigenaar', description: 'Agentschap voor Natuur en Bos' },
            { term: 'Licentie', description: 'Modellicentie gratis hergebruik', href: 'https://example.org/licentie' },
            { term: 'Metadata-ID', description: '449f14d5-c179-58ae-95be-15fc48fdd414', isSubtle: true },
        ]);
    });

    it('should give every source its own numbered group, and the figure a group of its own', () => {
        const meta = buildMeta({ sources: [NITROGEN, { title: 'Vlaamse Milieumaatschappij' }] });

        expect(terms(meta)).toEqual([['Bron 1', 'Eigenaar', 'Licentie', 'Metadata-ID'], ['Bron 2'], ['Eenheid']]);
    });

    it('should link to the data of a source', () => {
        const meta = buildMeta({ sources: [{ title: 'ELF', dataHref: 'https://example.org/v1.1/Datastreams(1)' }] });

        expect(buildAboutGroups(meta, OPEN_DATA_HREF)[0]).toContainEqual({
            term: 'Data',
            description: 'De cijfers bij de bron',
            href: 'https://example.org/v1.1/Datastreams(1)',
        });
    });

    it('should give just the unit: its explanation is next to the axis', () => {
        const meta = buildMeta();
        meta.y.unitInfo = 'microtesla, de sterkte van het magnetisch veld';

        expect(buildAboutGroups(meta, OPEN_DATA_HREF).at(-1)).toEqual([{ term: 'Eenheid', description: 'µT' }]);
    });

    it('should leave out the figure group when there is no unit and no open data', () => {
        const meta = buildMeta();
        meta.y = { type: 'number' };

        expect(terms(meta)).toEqual([['Bron']]);
    });

    it('should mention open data for the whole figure, linking to the open data page', () => {
        const one = buildAboutGroups(buildMeta({ isOpenData: true }), OPEN_DATA_HREF)
            .at(-1)!
            .at(-1);
        const many = buildAboutGroups(
            buildMeta({ isOpenData: true, sources: [{ title: 'A' }, { title: 'B' }] }),
            OPEN_DATA_HREF,
        )
            .at(-1)!
            .at(-1);

        expect(one).toEqual(expect.objectContaining({ term: 'Open data', href: OPEN_DATA_HREF }));
        expect(one?.description).toMatch(/^De bron publiceert/);
        expect(many?.description).toMatch(/^Alle bronnen publiceren/);
    });
});

describe('jest - widgets - hasAboutDetails', () => {
    it('should be false when the source line already says everything', () => {
        expect(hasAboutDetails(buildMeta({ isOpenData: true }))).toBe(false);
    });

    it('should be false for an explanation of the unit: it is next to the axis', () => {
        const meta = buildMeta();
        meta.y.unitInfo = 'microtesla';

        expect(hasAboutDetails(meta)).toBe(false);
    });

    it('should be true when a source has a metadata key: the source line does not show it', () => {
        expect(hasAboutDetails(buildMeta({ sources: [{ title: 'Stikstof', metadataId: '449f14d5' }] }))).toBe(true);
    });

    it('should be false for just an owner: the source line already names it', () => {
        expect(hasAboutDetails(buildMeta({ sources: [{ title: 'Stikstof', owner: 'ANB' }] }))).toBe(false);
    });

    it('should be true when a source links to its data', () => {
        expect(hasAboutDetails(buildMeta({ sources: [{ title: 'ELF', dataHref: 'https://example.org' }] }))).toBe(true);
    });
});
