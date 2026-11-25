import type { ChartSource } from '../../models/chart.model';

// Echte records uit de metadatacatalogus van Omgeving (https://metadata.omgeving.vlaanderen.be). De stories geven
// alleen de sleutel, net als de data: titel, eigenaar en licentie leest de grafiek uit de record. De cijfers in de
// stories zijn verzonnen; de bronnen niet.

/** VLOPS kaarten - NH3 - NH3 concentratie: concentratie in de lucht, in µg/m³. Open data. */
export const VLOPS_NH3_SOURCE: ChartSource = { metadataId: '2bee1b5e-c3c4-59bb-8d9a-742d3002d34e' };

/** Ventilus - Magnetische veld hoogspanningslijnen: magnetisch veld, in µT. Beperkte toegang (INSPIRE artikel
 *  13(1)(e)): geen licentie, geen open data. */
export const VENTILUS_SOURCE: ChartSource = { metadataId: '1fe4dff9-87b4-5646-b29a-a026025f520e' };

/** Maatwerkgebieden stikstofdecreet: een kaartlaag, geen meetreeks; in de stories als tweede bron. Open data. */
export const STIKSTOF_SOURCE: ChartSource = { metadataId: '449f14d5-c179-58ae-95be-15fc48fdd414' };
