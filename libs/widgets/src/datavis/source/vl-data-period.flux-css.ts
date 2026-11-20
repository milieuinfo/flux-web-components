import { vlFocusOutlineMixin, vlVisuallyHiddenMixin } from '@domg-wc/styles';
import { css, CSSResult } from 'lit';

export const vlDataPeriodFluxStyles: CSSResult = css`
    /* Container: de indeling volgt de breedte van de figuur. */
    :host {
        display: block;
        container-type: inline-size;
        font-size: var(--vl-font-size--xsmall);
    }

    :host(:not([slot])) {
        margin-bottom: var(--vl-spacing--normal);
    }

    /* Lengte links, dagen rechts; bij te weinig plats komen de dagen eronder. */
    .period {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        gap: var(--vl-spacing--xsmall) var(--vl-spacing--normal);
    }

    .durations {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: var(--vl-spacing--xxsmall);
        margin: 0;
        padding: 0;
        border: 0;
    }

    legend {
        float: left;
        margin-right: var(--vl-spacing--xxsmall);
        padding: 0;
        color: var(--vl-color--text-subtle);
    }

    .duration input {
        ${vlVisuallyHiddenMixin()};
    }

    .duration span,
    .step,
    .today {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        min-height: 2.4rem;
        padding: 0 var(--vl-spacing--xsmall);
        border: 1px solid var(--vl-color--border-default);
        border-radius: 999px;
        background-color: var(--vl-color--background-default);
        color: var(--vl-color--text-default);
        font: inherit;
        white-space: nowrap;
        cursor: pointer;
    }

    .duration span:hover,
    .step:not(:disabled):hover,
    .today:hover {
        border-color: var(--vl-color--border-action);
    }

    .duration input:checked + span {
        border-color: var(--vl-color--border-action);
        background-color: var(--vl-color--background-action);
        color: var(--vl-color--text-on-action);
    }

    .duration input:focus-visible + span,
    .step:focus-visible,
    .today:focus-visible {
        ${vlFocusOutlineMixin()};
    }

    .days,
    .stepper {
        display: flex;
        align-items: center;
        gap: var(--vl-spacing--xxsmall);
    }

    .step {
        width: 2.4rem;
        padding: 0;
    }

    .current {
        padding: 0 var(--vl-spacing--xxsmall);
        font-variant-numeric: tabular-nums;
        white-space: nowrap;
    }

    .step:disabled {
        cursor: default;
        border-color: var(--vl-color--border-disabled);
        color: var(--vl-color--text-disabled);
    }

    /* Heel smal: het label alleen voor de schermlezer. */
    @container (max-width: 34rem) {
        legend {
            ${vlVisuallyHiddenMixin()};
        }
    }
`;
