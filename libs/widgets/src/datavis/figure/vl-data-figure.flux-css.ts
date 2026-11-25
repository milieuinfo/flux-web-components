import { css, CSSResult } from 'lit';

export const vlDataFigureFluxStyles: CSSResult = css`
    :host {
        display: block;
    }

    figure {
        margin: 0;
        display: flex;
        flex-direction: column;
        /* Eén ritme tussen kop, controls en grafiek: dicht genoeg om als één blok te lezen. */
        gap: var(--vl-spacing--small);
    }

    /* Kop links, controls rechts bovenaan, zoals de werkbalk van een grafiek. Een raster van twee rijen: de kop en de
       controls delen de eerste rij, de ondertitel krijgt de tweede over de volle breedte. Op een smal scherm loopt de
       kop door over meer regels; zo kost de werkbalk nooit een eigen rij. De figcaption neemt het raster over
       (subgrid): de DOM-volgorde blijft kop, ondertitel, controls, ook voor de schermlezer. */
    .header {
        display: grid;
        grid-template-columns: minmax(0, 1fr) auto;
        grid-template-rows: auto auto;
        column-gap: var(--vl-spacing--normal);
    }

    figcaption {
        display: grid;
        grid-column: 1 / -1;
        grid-row: 1 / -1;
        grid-template-columns: subgrid;
        grid-template-rows: subgrid;
    }

    /* Veel eigen controls lopen door over meer regels, rechts uitgelijnd. */
    .controls {
        grid-column: 2;
        grid-row: 1;
        align-self: start;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-end;
        align-items: center;
        gap: var(--vl-spacing--xsmall);
    }

    /* De uitklapblokken onder elkaar, zonder ruimte ertussen: elk blok heeft een lijn erboven (explanationStyles). */
    .explanations {
        display: flex;
        flex-direction: column;
    }

    /* Schermvullend: de hele figuur met haar uitleg, en de grafiek krijgt de hoogte van het scherm. De hoogte gaat
       als custom property naar de grafiek: die erft door de slot heen tot in de shadow DOM van de grafiek. */
    :host(:fullscreen) {
        overflow: auto;
        padding: var(--vl-spacing--medium);
        background-color: var(--vl-color--background-default);
        --vl-chart-height: 70vh;
    }

    .headline {
        grid-column: 1;
        grid-row: 1;
    }

    /* Over de volle breedte, ook onder de controls. */
    .subtitle {
        display: block;
        grid-column: 1 / -1;
        grid-row: 2;
        margin-top: var(--vl-spacing--xxsmall);
    }
`;
