import { css, CSSResult } from 'lit';

// deze css is gegenereerd uit de oude custom scss
const styles: CSSResult = css`
    .vl-input-slider {
        display: flex;
        align-items: center;
    }
    .vl-input-slider .vl-input-slider__input-range {
        width: calc(100% - 1rem);
    }
    .vl-input-slider .vl-input-slider__input-number {
        font-size: 1.4rem;
        width: 4.7rem;
        margin-left: 1.5rem;
        padding: 0 0 0 0.6rem !important;
        height: 2.4rem;
        line-height: 2.4rem;
    }
    .vl-input-slider input[type='range'] {
        -webkit-appearance: none;
        height: 2.4rem;
    }
    .vl-input-slider input[type='range']::-webkit-slider-runnable-track {
        background: #c6cdd3;
        height: 0.4rem;
        width: 100%;
        cursor: pointer;
    }
    .vl-input-slider input[type='range']::-moz-range-track {
        background: #c6cdd3;
        height: 0.4rem;
        width: 100%;
        cursor: pointer;
    }
    .vl-input-slider input[type='range']::-webkit-slider-thumb {
        -webkit-appearance: none;
        cursor: pointer;
        width: 1.5rem;
        height: 2.4rem;
        background-color: #4d88db;
        border-radius: 0.3rem;
        margin-top: -1rem;
        border-left: 0.7rem solid #05c;
        border-right: 0.7rem solid #05c;
        border-top: 0.55rem solid #05c;
        border-bottom: 0.55rem solid #05c;
    }
    .vl-input-slider input[type='range']::-moz-range-thumb {
        cursor: pointer;
        width: 0.1rem;
        height: 1.3rem;
        background-color: #4d88db;
        border-radius: 0.3rem;
        margin-top: -1rem;
        border-left: 0.7rem solid #05c;
        border-right: 0.7rem solid #05c;
        border-top: 0.55rem solid #05c;
        border-bottom: 0.55rem solid #05c;
    }
`;
export default styles;
