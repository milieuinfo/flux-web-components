import { css } from "lit";

export const dropTargetStyles = css`
    .drop-target {
        outline: 2px dashed transparent;
        outline-offset: 2px;
        transition: outline 0.2s ease-out;
        position: relative;

        .drop-target__message {
            opacity: 0;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            text-align: center;
            z-index: 2;
            pointer-events: none;
            transition: opacity 0.2s ease-out;
        }

        .drop-target__backdrop {
            opacity: 0;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(255, 255, 255, 0.85);
            z-index: 1;
            pointer-events: none;
            transition: opacity 0.2s ease-out;
        }

        &.drop-target--drag-over {
            outline-color: var(--vl-color--action);

            .drop-target__message,
            .drop-target__backdrop {
                opacity: 1;
            }
        }
    }
`;