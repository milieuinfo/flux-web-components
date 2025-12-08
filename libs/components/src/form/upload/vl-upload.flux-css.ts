import { css, CSSResult } from 'lit';

export const vlUploadFluxStyles: CSSResult = css`
    .vl-upload {
        position: relative;
        margin-bottom: 0;
        transition: background-color 0.3s ease-out;

        /* vl-upload elements */

        .vl-upload__overlay-content {
            color: var(--vl-color--action);
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            font-size: inherit; /* mag weg eens govflanders style weggewerkt is */
        }

        .vl-upload__element {
            font-family: var(--vl-font);
            border: 0.1rem dashed var(--vl-color--border-bold);
            border-radius: 0.3rem;
            text-align: center;
            position: relative;
            z-index: 4;
            min-height: 100%;
            background-color: transparent;
            transition: background-color 0.3s ease-out;

            &:focus-within,
            &:hover {
                background-color: var(--vl-color--background-action-subtle);
                border-width: 0.2rem;
                border-color: var(--vl-color--border-action-subtle);
            }
        }

        .vl-upload__overlay {
            position: absolute;
            display: none;
            pointer-events: none;
            left: -0.1rem;
            top: -0.1rem;
            width: 100%;
            height: 100%;
            background-color: #fff;
            border: 0.2rem dashed var(--vl-color--border-action);
            border-radius: 0.3rem;
            z-index: 10;
            opacity: 0.9;
            font-family: var(--vl-font);
        }

        .vl-upload__dropzone {
            color: var(--vl-color--action);
            display: block;
            padding: var(--vl-spacing--xsmall);
            cursor: pointer;
            height: 100%;

            &:focus-within,
            &:hover {
                padding: calc(var(--vl-spacing--xsmall) - 0.1rem);
            }
        }

        slot[name='sub-title'] {
            white-space: pre-line;
        }

        .dz-button {
            display: none;
        }
    }

    /* vl-upload variants */

    .vl-upload--dragging .vl-upload__overlay {
        opacity: 1;
        display: block;
    }

    .vl-upload--error .vl-upload__element {
        border-color: var(--vl-color--border-error-subtle);
        background-color: var(--vl-color--background-error-subtle);

        &:hover,
        &:focus-within {
            border-color: var(--vl-color--border-error);
        }
    }

    .vl-upload--success .vl-upload__element {
        border-color: var(--vl-color--border-success-subtle);
        background-color: var(--vl-color--background-success-subtle);

        &:hover,
        &:focus-within {
            border-color: var(--vl-color--border-success);
        }
    }

    .vl-upload--disabled,
    .vl-upload--readonly {
        .vl-upload__button {
            cursor: default;
            &:hover {
                text-decoration: underline;
            }
        }

        .vl-upload__element {
            cursor: default;
            border-color: var(--vl-color--border-disabled);
            background-color: var(--vl-color--background-disabled-subtle);

            &:hover,
            &:focus-within {
                border-color: var(--vl-color--border-disabled);
                background-color: var(--vl-color--background-disabled-subtle);
                border-width: 0.1rem;
            }
        }

        #dropzone-container {
            cursor: default;

            &:hover,
            &:focus-within {
                padding: var(--vl-spacing--xsmall);
            }
        }
    }

    .vl-upload--disabled {
        .vl-upload__button {
            color: var(--vl-color--text-disabled);
            pointer-events: none;
            cursor: not-allowed;
        }

        .vl-upload__element {
            cursor: not-allowed;
        }

        #dropzone-container {
            cursor: not-allowed;
        }
    }

    /* vl-upload-files */

    .vl-upload-files {
        /* vl-upload-files elements */

        .vl-upload-files__list {
            & > li + li {
                border-top: 1px solid var(--vl-color--border);
            }
        }

        .vl-upload-files__remove-all {
            margin: 0 0 0 auto;
            display: block;
        }
    }
`;
