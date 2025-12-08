import { css, CSSResult } from 'lit';

export const vlUploadProgressStyles: CSSResult = css`
    :host {
        display: block;
        box-sizing: border-box;
    }

    .vl-upload-progress {
        display: block;

        &.vl-upload-progress--error {
            vl-icon::part(icon) {
                color: var(--vl-color--error);
            }
        }
    }

    .vl-upload-progress__filesize {
        color: var(--vl-color--text-subtle);
        white-space: nowrap;
    }

    .vl-upload-progress__actions {
        display: block;
        height: 3.5rem;
    }
`;