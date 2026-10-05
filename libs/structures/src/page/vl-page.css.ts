import { css, CSSResult } from 'lit';

export const vlPageStyles: CSSResult = css`
    :host {
        display: block;
    }

    :host([v-center]),
    :host([v-stretch]) {
        display: flex;
        flex-direction: column;
    }

    :host([v-center]) .vl-page {
        margin-block: auto;
    }

    :host([v-stretch]) .vl-page {
        display: flex;
        flex: 1;
        flex-direction: column;
    }

    :host([v-stretch]) .vl-main-content {
        display: flex;
        flex: 1;
        flex-wrap: wrap;
    }

    :host([v-stretch]) ::slotted([slot='main']) {
        flex: 1 1 100%;
        min-width: 0;
    }
`;
