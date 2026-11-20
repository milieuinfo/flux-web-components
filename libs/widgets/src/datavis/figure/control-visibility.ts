import { css, CSSResult } from 'lit';
import { findModel, type DataState } from '../models/chart.model';

export type ControlVisibility = 'visible' | 'waiting' | 'hidden';

export function findControlVisibility(dataState: DataState): ControlVisibility {
    if (findModel(dataState)) return 'visible';
    return dataState.status === 'loading' ? 'waiting' : 'hidden';
}

export const controlStyles: CSSResult = css`
    :host {
        display: inline-block;
    }

    .waiting {
        visibility: hidden;
    }

    .hidden {
        display: none;
    }

    vl-link {
        white-space: nowrap;
    }

    /* De tooltip zit naast de knop in de shadow root; zonder neemt host plaats in de rij in. */
    vl-tooltip {
        position: absolute;
    }
`;
