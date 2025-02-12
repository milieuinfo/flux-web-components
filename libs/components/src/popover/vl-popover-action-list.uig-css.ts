import { css, CSSResult } from 'lit';

const styles: CSSResult = css`
    :host {
        display: flex;
        justify-content: center;
        flex-direction: column;
        gap: 1rem;
    }

    ::slotted(hr) {
        width: calc(100% - 1rem);
    }
`;
export default styles;
