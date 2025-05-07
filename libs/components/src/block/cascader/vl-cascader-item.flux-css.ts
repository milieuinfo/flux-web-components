import { css, CSSResult } from 'lit';

export const vlCascaderItemFluxStyles: CSSResult = css`
    :host {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 1rem;
    }

    .vl-cascader-link {
        display: flex;
        min-height: 4rem;
        align-items: center;
        width: 100%;
    }

    vl-link::part(button) {
        width: 100%;
        display: flex;
        justify-content: space-between;
    }
`;
