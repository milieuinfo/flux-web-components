import { css, CSSResult } from 'lit';

const styles: CSSResult = css`
    #info {
        font-size: small;
    }
    td {
        padding-right: 15px;
    }
    table {
        color: dimgray;
    }

    #image-small {
        width: 50%;
        justify-self: center; /* Dit is nodig omdat binnen een grid bij procentuele breedte, nog altijd de volledige
        breedte wordt in acht genomen om te centreren */
    }
`;
export default styles;
