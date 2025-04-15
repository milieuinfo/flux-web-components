import { css, CSSResult } from 'lit';

const styles: CSSResult = css`
    .container {
        padding: 50px;
    }

    .form-buttons {
        vl-button:not(:last-child) {
            margin-right: 1.4rem;
        }
    }

    .form-buttons-top {
        margin-bottom: 50px;
        border: 1px solid #ccc;
        padding: 10px;
    }

    .submitted-form {
        margin-top: 70px;
        border: 1px solid #ccc;
        padding: 20px;
    }

    .vl-properties__column {
        width: calc(33% - 1rem);
    }

    .vl-properties__label {
        flex: 0 0 40%;
    }

    .vl-properties__data {
        flex: 3 0 60%;
    }
`;
export default styles;
