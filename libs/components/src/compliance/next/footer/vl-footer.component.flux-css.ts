import { css } from 'lit';

// body-scope wins over :root via CSS inheritance (closer ancestor),
// restoring legacy VO values after the widget bundle overwrites them on :root.
export const legacyThemeTokenStyles = css`
    body {
        --vl-theme-primary-color: #ffe615;
        --vl-theme-primary-color-60: #fff073;
        --vl-theme-primary-color-70: #ffee5b;
        --vl-theme-primary-color-rgba-30: rgba(255, 230, 21, 0.3);
        --vl-theme-fg-color: #333332;
        --vl-theme-fg-color-60: #858584;
        --vl-theme-fg-color-70: #707070;
    }
`;
