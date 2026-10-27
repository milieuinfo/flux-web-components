import { vlFocusOutlineMixin, vlHyphenateMixin } from '@domg-wc/styles';
import { css, CSSResult } from 'lit';

export const vlDashboardHeaderStyles: CSSResult = css`
    /* blijft staan als de inhoud scrolt; op mobiel zet vl-dashboard de afstand onder zijn mobiele balk */
    :host {
        display: block;
        position: sticky;
        top: var(--vl-dashboard-header-sticky-top, 0);
        z-index: 1;
        background-color: var(--vl-color--background-default);
    }

    /* horizontaal dezelfde padding als de inhoud van de pagina, zie --vl-dashboard-content-inline-padding */
    .vl-dashboard-header {
        --vl-dashboard-header-padding: var(--vl-spacing--normal)
            var(--vl-dashboard-content-inline-padding, var(--vl-spacing--normal));

        box-sizing: border-box;
        min-height: 8.8rem;
        padding: var(--vl-dashboard-header-padding);
        border-bottom: 1px solid var(--vl-color--border-default);
        display: flex;
        align-items: center;
        justify-content: flex-end;
        flex-wrap: wrap;
        gap: var(--vl-spacing--xsmall);

        &:not(:has(vl-title)) {
            align-items: flex-end;
            min-height: 0;
            padding: 0;
            border-bottom: 0;
        }
        &.vl-dashboard-header--has-actions {
            padding: var(--vl-dashboard-header-padding);
            border-bottom: 1px solid var(--vl-color--border-default);
        }
    }

    .vl-dashboard-header__title,
    .vl-dashboard-header__actions {
        display: flex;
        gap: var(--vl-spacing--xsmall);
        align-items: center;
        flex-wrap: wrap;
    }

    .vl-dashboard-header__title {
        /* Indien de actions ervoor zouden zorgen dat de titel kleiner wordt
         * dan --vl-dashboard-title-min-width, zorgt deze variabele ervoor dat
         * de titel de volledige breedte inneemt van de header en de actions
         * op een nieuwe lijn beginnen. */
        flex: 1 1 var(--vl-dashboard-title-min-width, 30rem);
        min-width: 0; /* Important for flex and ellipsis */

        &.vl-dashboard-header__title--untitled {
            flex-basis: 0;
        }

        vl-title::part(h1) {
            font-size: var(--vl-font-size--large);
            word-break: break-word;
            ${vlHyphenateMixin()};
        }

        /* de h1 krijgt de focus na een navigatie en via de skip link; de outline vervangt die van de browser */
        vl-title::part(h1):focus-visible,
        vl-title:focus-visible {
            ${vlFocusOutlineMixin()};
        }
    }
`;
