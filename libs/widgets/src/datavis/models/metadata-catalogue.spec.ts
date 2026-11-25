import { readFileSync } from 'fs';
import { join } from 'path';
import { buildRecordUrl, MetadataCatalogue, readRecord } from './metadata-catalogue';

// Echte records uit de catalogus, zoals `buildRecordUrl` ze geeft (gelezen op 2026-11-12).
const vlops = readFileSync(join(__dirname, 'sample-data/record-vlops-nh3.xml'), 'utf-8');
const ventilus = readFileSync(join(__dirname, 'sample-data/record-ventilus.xml'), 'utf-8');

const VLOPS_ID = '2bee1b5e-c3c4-59bb-8d9a-742d3002d34e';

describe('jest - widgets - buildRecordUrl', () => {
    it('should ask the record as ISO 19139', () => {
        expect(buildRecordUrl(VLOPS_ID)).toBe(
            `https://metadata.omgeving.vlaanderen.be/srv/api/records/${VLOPS_ID}/formatters/xml`,
        );
    });
});

describe('jest - widgets - readRecord', () => {
    it('should read the title, the owner, the license and that it is open data', () => {
        expect(readRecord(vlops)).toEqual({
            title: 'VLOPS kaarten - NH3 - NH3 concentratie (VLOPS23, meteo 2021, emissies 2021)',
            owner: 'VLAAMSE MILIEUMAATSCHAPPIJ',
            license: {
                title: 'Modellicentie gratis hergebruik',
                href: expect.stringContaining('www.vlaanderen.be'),
            },
            isOpenData: true,
        });
    });

    it('should leave out a license the record does not give, and not call restricted data open', () => {
        expect(readRecord(ventilus)).toEqual({
            title: 'Ventilus - Magnetische veld hoogspanningslijnen (bestaande toestand)',
            owner: 'Departement Omgeving',
            isOpenData: false,
        });
    });

    it('should not decide on open data with a license it does not know', () => {
        const unknownLicense = vlops.replace(/modellicentie_gratis_hergebruik/g, 'eigen_licentie');

        expect(readRecord(unknownLicense)).not.toHaveProperty('isOpenData');
    });

    it('should refuse what is not a record', () => {
        expect(() => readRecord('<html></html>')).toThrow('ISO 19139');
    });
});

/** De catalogus antwoordt met deze tekst, of faalt zoals bij een status 404. */
const answerWith = (text: string) => jest.fn(async () => text);
const failWith = (status: number) =>
    jest.fn(async (): Promise<string> => {
        throw new Error(`De catalogus antwoordde met status ${status}.`);
    });

describe('jest - widgets - MetadataCatalogue', () => {
    it('should fill a source from its record, once for every chart on the page', async () => {
        const fetchText = answerWith(vlops);
        const catalogue = new MetadataCatalogue(fetchText);

        const [first] = await catalogue.completeSources([{ metadataId: VLOPS_ID }]);
        await catalogue.completeSources([{ metadataId: VLOPS_ID }]);

        expect(first).toEqual(expect.objectContaining({ metadataId: VLOPS_ID, owner: 'VLAAMSE MILIEUMAATSCHAPPIJ' }));
        expect(fetchText).toHaveBeenCalledTimes(1);
        expect(fetchText).toHaveBeenCalledWith(buildRecordUrl(VLOPS_ID));
        expect(catalogue.completeSourcesFromCache([{ metadataId: VLOPS_ID }])[0].title).toContain('VLOPS');
    });

    it('should keep a source as it is when its record does not come', async () => {
        const catalogue = new MetadataCatalogue(failWith(404));

        expect(await catalogue.completeSources([{ metadataId: VLOPS_ID }])).toEqual([{ metadataId: VLOPS_ID }]);
    });

    it('should ask again after a failure', async () => {
        const fetchText = failWith(503);
        const catalogue = new MetadataCatalogue(fetchText);

        await catalogue.completeSources([{ metadataId: VLOPS_ID }]);
        await catalogue.completeSources([{ metadataId: VLOPS_ID }]);

        expect(fetchText).toHaveBeenCalledTimes(2);
    });

    it('should leave a source without a record alone', async () => {
        const fetchText = answerWith(vlops);
        const catalogue = new MetadataCatalogue(fetchText);

        expect(await catalogue.completeSources([{ title: 'Eigen meting' }])).toEqual([{ title: 'Eigen meting' }]);
        expect(fetchText).not.toHaveBeenCalled();
    });

    it('should keep the records of each catalogue apart', async () => {
        const first = new MetadataCatalogue(answerWith(vlops));
        const second = new MetadataCatalogue(answerWith(vlops));

        await first.completeSources([{ metadataId: VLOPS_ID }]);

        expect(second.completeSourcesFromCache([{ metadataId: VLOPS_ID }])).toEqual([{ metadataId: VLOPS_ID }]);
    });
});
