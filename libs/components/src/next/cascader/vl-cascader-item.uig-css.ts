import { css, CSSResult } from 'lit';

const styles: CSSResult = css`
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

    vl-link-next::part(button) {
        width: 100%;
        display: flex;
        justify-content: space-between;
    }
`;
export default styles;
