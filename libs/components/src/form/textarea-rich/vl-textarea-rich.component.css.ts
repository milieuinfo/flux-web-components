import { css, CSSResult, unsafeCSS } from 'lit';
import textareaRichComponentRawCss from './vl-textarea-rich.component.raw.css?raw';

export const vlTextareaRichComponentStyles: CSSResult = css`
    ${unsafeCSS(textareaRichComponentRawCss)}

    /* ===================================================================
       TinyMCE Editor Container
       =================================================================== */

    .tox-tinymce {
        border-radius: var(--vl-border--radius);
        border: 0.1rem solid var(--vl-color--border-alt);
    }

    /* ===================================================================
       Toolbar Styles
       =================================================================== */

    .tox .tox-toolbar__primary {
        border-bottom: 0.1rem solid var(--vl-color--border-alt);
        background: none;
    }

    .tox:not(.tox-tinymce-inline) .tox-editor-header {
        box-shadow: none;
        padding: 0;
    }

    .tox:not([dir='rtl']) .tox-toolbar__group:not(:last-of-type) {
        border-right: 1px solid var(--vl-color--border-alt);
    }

    .tox .tox-toolbar__group {
        padding: 0 4px 0 4px;
    }

    .tox .tox-tbtn {
        margin: 4px 0;
        height: 32px;
    }

    .tox .tox-tbtn:hover {
        background: var(--vl-textarea-rich--tbtn-hover-bg);
    }

    .tox .tox-tbtn--enabled,
    .tox .tox-tbtn--enabled:hover {
        background: var(--vl-textarea-rich--tbtn-enabled-bg);
    }

    .tox .tox-editor-header.hidden {
        display: none;
    }

    /* ===================================================================
       Status Bar
       =================================================================== */

    .tox .tox-statusbar {
        border-top: 0.1rem solid var(--vl-color--border-alt);
    }

    /* ===================================================================
       Link Plugin Dialog
       =================================================================== */

    .tox .tox-dialog {
        box-shadow: var(--vl-textarea-rich--dialog-shadow);
        font-family: var(--vl-font);
        border-radius: 0;
        padding: 3rem;

        .tox-dialog__header,
        .tox-dialog__body-content,
        .tox-dialog__footer {
            padding: 0;
        }

        .tox-dialog__header {
            margin-bottom: 1.5rem;

            .tox-button.tox-button--icon {
                display: none;
            }

            .tox-dialog__title {
                font-family: var(--vl-font);
                font-weight: 500;
            }
        }

        .tox-form__group {
            margin-bottom: 1.5rem;
        }

        .tox-label {
            color: var(--vl-textarea-rich--dialog-label-color);
            font-size: var(--vl-font-size--small);
            font-weight: 500;
            margin-bottom: 0.6rem;
        }

        .tox-dialog__body-content {
            overflow: visible;
        }

        .tox-textfield {
            font-family: var(--vl-font);
            height: 3.5rem;
            line-height: 3.5rem;
            border-radius: var(--vl-border--radius);
            border: 0.1rem solid var(--vl-color--text-alt);
            padding: 0 1rem;

            &:focus {
                border: 0.1rem solid var(--vl-color--text-alt);
                box-shadow: var(--vl-focus--shadow);
            }
        }

        .tox-dialog__footer {
            margin-top: 1rem;
            justify-content: flex-start;

            .tox-button {
                margin-right: 1.5rem;
                margin-left: 0;
                order: 1;
                border: 0;
                padding: 0 2rem;
                font-size: var(--vl-font-size--small);
                font-family: var(--vl-font);
                font-weight: 500;
                line-height: 3.5rem;
                background-color: var(--vl-color--action);
                text-decoration: none;
                border-radius: var(--vl-border--radius);
                color: var(--vl-color--white);
                cursor: default;

                &:hover {
                    background-color: var(--vl-color--action-hover);
                }

                &.tox-button--secondary {
                    order: 2;
                    background-color: transparent;
                    cursor: pointer;
                    color: var(--vl-color--action);
                    font-weight: 400;
                    text-decoration: underline;
                    padding: 0;
                }
            }
        }
    }
`;
