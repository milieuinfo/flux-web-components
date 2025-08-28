import { css, CSSResult, unsafeCSS } from 'lit';
import basePlayerStyles from 'vidstack/player/styles/base.css?raw';
import plyrTheme from 'vidstack/player/styles/plyr/theme.css?raw'; // Use a raw loader to import as string

const styles: CSSResult[] = [
    css`
        ${unsafeCSS(basePlayerStyles)}
    `,
    css`
        ${unsafeCSS(plyrTheme)}
    `,
    css`
        :host {
            --plyr-color-main: var(--vl-color--action);

            --plyr-font-family: inherit;

            --plyr-control-spacing: 15px;

            --plyr-tooltip-bg: var(--vl-page-bg);
            --plyr-tooltip-color: var(--vl-color--text);
            --plyr-tooltip-padding: 3px;
            --plyr-tooltip-arrow-size: 6px;
            --plyr-tooltip-radius: 0;
        }

        .plyr__control {
            border-radius: var(--vl-border--radius);
        }

        .plyr > .plyr__control {
            padding: 15px 2rem;
        }

        .plyr .plyr__slider__track {
            background-image: linear-gradient(
                to right,
                var(--vl-color--accent) var(--value, 0%),
                transparent var(--value, 0%)
            );
        }

        .plyr media-menu-button {
            display: none;
        }
    `,
];
export default styles;
