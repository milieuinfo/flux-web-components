import { css, CSSResult } from 'lit';
import { vlLegacyStyles } from '@domg-wc/styles';

const styles: CSSResult = css`
    :host {
        display: block;
    }

    vl-header-cookie,
    vl-header-authentication-cookie,
    vl-authentication-cookie,
    vl-jsessionid-cookie,
    vl-sticky-session-cookie,
    ::slotted(vl-cookie:not(:last-of-type)) {
        margin-bottom: 1.8rem;
    }
`;
export default [...vlLegacyStyles, styles] as CSSResult[];
