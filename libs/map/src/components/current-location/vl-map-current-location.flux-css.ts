import { css, CSSResult } from 'lit';
import { vlLegacyStyles } from '@domg-wc/styles';

const mapCurrentLocationStyles: CSSResult = css`
    div.flux-map-current-location {
        position: absolute;
        z-index: 1;
        padding: 0;
        margin: 0;
        border: 1px #cbd2da solid;
        border-radius: 0;
        background: #fff;
        top: initial;
        left: initial;
        bottom: 90px;
        right: 10px;
    }

    div.flux-map-current-location button {
        color: #333332;
        background: #fff;
        margin: 0;
        border-radius: 0;
        height: 3.5rem;
        width: 3.5rem;
        display: block;
        padding: 0;
        font-weight: bold;
        text-decoration: none;
        font-size: inherit;
        text-align: center;
        border: none;
        cursor: pointer;
    }

    div.flux-map-current-location .vl-icon {
        padding: 0 0.9rem;
        line-height: 3.5rem;
    }
`;
export const vlMapCurrentLocationStyles = [mapCurrentLocationStyles, ...vlLegacyStyles] as CSSResult[];
