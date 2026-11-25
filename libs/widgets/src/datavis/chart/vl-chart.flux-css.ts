import { vlFocusOutlineMixin, vlVisuallyHiddenMixin } from '@domg-wc/styles';
import { css, CSSResult } from 'lit';

export const vlChartFluxStyles: CSSResult = css`
    :host {
        display: block;
        /* Lijnen in de plot en de notities erboven delen deze kleur. */
        --vl-chart-reference-color: var(--vl-color--grey-900);
    }

    /* Fonts en kleuren voor Plotly; readChartSpec() leest ze in. */
    .plot {
        --vl-chart-grid-color: var(--vl-color--grey-300);
        --vl-chart-axis-color: var(--vl-color--grey-800);
        --vl-chart-background: var(--vl-color--background-default);
        height: var(--vl-chart-height, 40rem);
        font-family: var(--vl-font);
        font-size: var(--vl-font-size--xsmall);
        color: var(--vl-color--text-default);
    }

    /* Zolang er geen grafiek getekend is wordt er een vlak met rasterlijnen
       weergegeven op de plaats en hoogte van de grafiek, zodat de
       pagina niet verspringt als de data er is. */
    .skeleton {
        height: var(--vl-chart-height, 40rem);
        border-radius: var(--vl-border--radius, 0.4rem);
        background: repeating-linear-gradient(
            to bottom,
            var(--vl-color--grey-100) 0 calc(20% - 1px),
            var(--vl-color--grey-300) calc(20% - 1px) 20%
        );
        animation: vl-chart-pulse 1.6s ease-in-out infinite;
    }

    @keyframes vl-chart-pulse {
        50% {
            opacity: 0.5;
        }
    }

    /* Refresh laadt grafiek gedimdt staan tot nieuwe data aankomt en rendert. */
    .plot {
        transition: opacity 200ms ease-out;
    }

    .plot:not([hidden]) {
        animation: vl-chart-fade-in 200ms ease-out;
    }

    .is-reloading .plot {
        opacity: 0.4;
        transition-delay: 150ms;
    }

    @keyframes vl-chart-fade-in {
        from {
            opacity: 0;
        }
    }

    @media (prefers-reduced-motion: reduce) {
        .skeleton,
        .plot:not([hidden]) {
            animation: none;
        }

        .plot {
            transition: none;
        }
    }

    /* De hover (tooltip, lijn, stippen) bovenop de grafiek van Plotly. */
    .plot-frame {
        position: relative;
    }

    .hover {
        position: absolute;
        inset: 0;
        pointer-events: none;
    }

    /* De verticale lijn bij het hoveren op de grafiek. */
    .crosshair {
        position: absolute;
        width: 1px;
        transform: translateX(-0.5px);
        background-color: var(--vl-color--grey-500);
    }

    /* De stip op elke lijn in de kleur van de reeks. */
    .hover-dot {
        position: absolute;
        width: 1.2rem;
        height: 1.2rem;
        box-sizing: border-box;
        border: 2px solid var(--vl-color--background-default);
        border-radius: 50%;
        transform: translate(-50%, -50%);
    }

    .tooltip {
        position: absolute;
        min-width: 14rem;
        max-width: 28rem;
        padding: var(--vl-spacing--xxsmall) var(--vl-spacing--xsmall);
        border-radius: var(--vl-border--radius, 0.4rem);
        background-color: var(--vl-color--background-default);
        box-shadow:
            0 1px 2px color-mix(in srgb, var(--vl-color--text-default) 12%, transparent),
            0 4px 16px color-mix(in srgb, var(--vl-color--text-default) 12%, transparent);
        font-family: var(--vl-font);
        font-size: var(--vl-font-size--xsmall);
        color: var(--vl-color--text-default);
    }

    .tooltip-title {
        display: flex;
        justify-content: space-between;
        gap: var(--vl-spacing--xsmall);
        margin: 0 0 var(--vl-spacing--xxsmall);
    }

    .tooltip-unit {
        color: var(--vl-color--grey-800);
    }

    .tooltip table {
        width: 100%;
        border-collapse: collapse;
    }

    .tooltip td {
        padding: calc(var(--vl-spacing--xxsmall) / 2) 0;
        vertical-align: baseline;
    }

    .tooltip .swatch {
        display: inline-block;
        width: 0.8rem;
        height: 0.8rem;
        margin-right: var(--vl-spacing--xxsmall);
        border-radius: 50%;
    }

    /* Waarden rechts uitgelijnd (zelfde aantal decimalen, countDecimalsInData). */
    .tooltip td.tooltip-value {
        padding-left: var(--vl-spacing--xsmall);
        text-align: right;
        font-weight: 500;
        white-space: nowrap;
    }

    .tooltip .no-value {
        color: var(--vl-color--text-subtle);
    }

    .tooltip .no-value .tooltip-value {
        font-weight: normal;
    }

    /* Met het toetsenbord (TAB) doorloop je de waarden. */
    .plot:focus-visible {
        ${vlFocusOutlineMixin()};
    }

    /* Plotly zet zijn CSS in document.head, en die bereikt de shadow DOM van vl-chart niet.
       Zonder 'position: absolute' staan de svg-lagen (lijnen, titels, legende) onder elkaar in plaats van op elkaar. */
    .plot .main-svg {
        position: absolute;
        top: 0;
        left: 0;
        pointer-events: none;
    }

    .plot .main-svg .draglayer {
        pointer-events: all;
    }

    .plot .crisp {
        shape-rendering: crispEdges;
    }

    /* De tooltip is custom made en Plotly meldt alleen welk punt de muis aanwijst. */
    .plot .hoverlayer {
        display: none;
    }

    .plot .user-select-none {
        user-select: none;
    }

    /* Hoort bij de waarde-as: zelfde grootte en kleur als de ticklabels. */
    .unit {
        margin: 0 0 var(--vl-spacing--xxsmall);
        font-size: var(--vl-font-size--xsmall);
        color: var(--vl-color--grey-800);
    }

    div.unit {
        display: flex;
        align-items: center;
        gap: var(--vl-spacing--xxsmall);
    }

    .unit-info {
        margin: 0;
        max-width: 40ch;
        /* vl-popover breekt standaard midden in een woord (break-all); uitleg leest beter per woord. */
        word-break: normal;
        overflow-wrap: break-word;
    }

    /* Een referentielijn buiten het bereik van de waarde-as (zonder \`in-view\`): als notitie boven de grafiek. */
    .reference-notes {
        margin: 0 0 var(--vl-spacing--xxsmall);
        padding: 0;
        list-style: none;
        font-size: var(--vl-font-size--xsmall);
        color: var(--vl-chart-reference-color);
    }

    /* Als er naast de lijnen geen plaats is voor labels (VlChartLine): dezelfde namen en waarden boven de grafiek als legende. */
    .legend {
        display: flex;
        flex-wrap: wrap;
        gap: var(--vl-spacing--xxsmall) var(--vl-spacing--small);
        margin: 0 0 var(--vl-spacing--xsmall);
        padding: 0;
        list-style: none;
        font-size: var(--vl-font-size--xsmall);
    }

    .legend .swatch {
        display: inline-block;
        width: 1.2rem;
        height: 0.3rem;
        margin-right: var(--vl-spacing--xxsmall);
        vertical-align: middle;
        border-radius: 0.2rem;
    }

    /* Leest voor wat de tooltip toont. */
    .visually-hidden {
        ${vlVisuallyHiddenMixin()};
    }

    /* Bronnen links, open-data mark altijd rechts */
    .source-row {
        display: flex;
        justify-content: space-between;
        /* Op de eerste regel: "Bron:", de eerste titel en het kenmerk delen hun basislijn. */
        align-items: first baseline;
        gap: var(--vl-spacing--small);
        margin-top: var(--vl-spacing--xsmall);
    }

    /* "Bron:" naast de bronnen; elke bron met haar eigenaar eronder. */
    .source {
        font-size: var(--vl-font-size--xsmall);
        line-height: var(--vl-line-height--mobile);
        display: grid;
        align-items: first baseline;
        grid-template-columns: max-content minmax(0, 1fr);
        column-gap: var(--vl-spacing--xxsmall);
        min-width: 0;
    }

    .source-list {
        display: grid;
        gap: var(--vl-spacing--xxsmall);
        margin: 0;
        padding: 0;
        list-style: none;
        overflow-wrap: anywhere;
    }

    .source-owner {
        display: block;
    }

    .open-data-mark {
        flex: none;
        margin: 0;
        white-space: nowrap;
    }

    .open-data-mark a {
        text-decoration: none;
    }

    .open-data-mark a:hover,
    .open-data-mark a:focus-visible {
        text-decoration: underline;
    }
`;
