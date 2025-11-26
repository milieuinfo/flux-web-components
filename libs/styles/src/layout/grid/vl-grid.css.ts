import gridRawCss from './vl-grid.raw.css?raw';
import { css, CSSResult, unsafeCSS } from 'lit';
import { vlMediaScreenExtraSmall, vlMediaScreenMedium, vlMediaScreenSmall } from '../../base/var/vl-media-screen.css';
import { columnLargeStyles } from './column/vl-column-l.css';
import { columnMediumStyles } from './column/vl-column-m.css';
import { columnSmallStyles } from './column/vl-column-s.css';
import { columnExtraSmallStyles } from './column/vl-column-xs.css';
import { gridLargeStyles } from './grid/vl-grid-l.css';
import { gridMediumStyles } from './grid/vl-grid-m.css';
import { gridSmallStyles } from './grid/vl-grid-s.css';
import { gridExtraSmallStyles } from './grid/vl-grid-xs.css';

export const vlGridStyles: CSSResult = css`
    ${unsafeCSS(gridRawCss)}
    .vl-grid {
        display: grid;
        grid-template-columns: repeat(12, 1fr);
        grid-row-gap: var(--vl-grid-row-gap);
        grid-column-gap: var(--vl-grid-col-gap);

        .vl-column {
            ${gridLargeStyles()};
            ${columnLargeStyles()};

            @media screen and (max-width: ${vlMediaScreenMedium}px) {
                ${gridMediumStyles()}
                ${columnMediumStyles()}
            }

            @media screen and (max-width: ${vlMediaScreenSmall}px) {
                ${gridSmallStyles()}
                ${columnSmallStyles()}
            }

            @media screen and (max-width: ${vlMediaScreenExtraSmall}px) {
                ${columnExtraSmallStyles()};
                ${gridExtraSmallStyles()};
            }
        }
    }
`;
