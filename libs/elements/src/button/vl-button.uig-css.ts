import { css, CSSResult } from 'lit';

// the background of a tertiary button is transparent by default, when a toggle button is
// floating over the map it needs a background
const styles: CSSResult = css`
    .vl-button--map.vl-button--tertiary {
        background-color: #fff;
    }
    .vl-button--map.vl-button--tertiary:hover,
    .vl-button--map.vl-button--tertiary:active {
        background-color: #fff;
    }
    .vl-button--loading {
        padding-block: 0.5rem;
        padding-left: 2rem;
        padding-right: 6rem;
    }
    .vl-button--loading::after {
        right: 2rem;
    }
    @media screen and (max-width: 767px) {
        .vl-button--loading {
            padding-block: 1rem;
            padding-left: 1rem;
            padding-right: 5rem;
        }
        .vl-button--loading::after {
            right: 1rem;
        }
    }
`;
export default styles;
