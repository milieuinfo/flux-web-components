import { css, CSSResult } from 'lit';

const styles: CSSResult = css`
    .vl-upload {
        margin-bottom: 0;
    }

    .dz-button {
        display: none;
    }

    .vl-upload__element__button {
        border-radius: 0.3rem;
        text-align: center;
        padding-right: 5px;
    }

    .vl-upload__element__button:focus {
        box-shadow: none;
        outline: rgba(0, 85, 204, 0.65) solid 3px;
        outline-offset: 2px;
    }

    slot[name='sub-title'] {
        white-space: pre-line;
    }
`;
export default styles;
