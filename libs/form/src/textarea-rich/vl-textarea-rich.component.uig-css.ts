import { css, CSSResult } from 'lit';

const styles: CSSResult = css`
    .tox-tinymce {
        border-radius: 0.3rem;
        border: 0.1rem solid #8695a8;
    }

    .tox .tox-toolbar__primary {
        border-bottom: 0.1rem solid #8695a8;
        background: none;
    }

    .tox:not(.tox-tinymce-inline) .tox-editor-header {
        box-shadow: none;
        padding: 0;
    }

    .tox .tox-statusbar {
        border-top: 0.1rem solid #8695a8;
    }

    .tox:not([dir='rtl']) .tox-toolbar__group:not(:last-of-type) {
        border-right: 1px solid #8695a8;
    }

    .tox .tox-toolbar__group {
        padding: 0 4px 0 4px;
    }

    .tox .tox-tbtn {
        margin: 4px 0;
        height: 32px;
    }

    .tox .tox-tbtn:hover {
        background: #dee0e2;
    }

    .tox .tox-tbtn--enabled,
    .tox .tox-tbtn--enabled:hover {
        background: #c8cbcf;
    }

    .tox .tox-editor-header.hidden {
        display: none;
    }

    /* Link plugin modal styles */
    .tox .tox-dialog {
        box-shadow: 0 0 2.1rem 0 rgba(0, 0, 0, 0.3);
        font-family: 'Flanders Art Sans', sans-serif;
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
                font-family: 'Flanders Art Sans', sans-serif;
                font-weight: 500;
            }
        }

        .tox-form__group {
            margin-bottom: 1.5rem;
        }

        .tox-label {
            color: #4d4d4b;
            font-size: 1.6rem;
            font-weight: 500;
            margin-bottom: 0.6rem;
        }

        .tox-dialog__body-content {
            overflow: visible;
        }

        .tox-textfield {
            font-family: 'Flanders Art Sans', sans-serif;
            height: 3.5rem;
            line-height: 3.5rem;
            border-radius: 0.3rem;
            border: 0.1rem solid #687483;
            padding: 0 1rem;

            &:focus {
                border: 0.1rem solid #687483;
                box-shadow: 0 0 0 2px #fff, 0 0 0 5px rgba(0, 85, 204, 0.65);
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
                padding: 0;
                font-size: 1.6rem;
                font-family: 'Flanders Art Sans', sans-serif;
                font-weight: 500;
                line-height: 3.5rem;
                padding: 0 2rem;
                background-color: #05c;
                text-decoration: none;
                border-radius: 0.3rem;
                color: #fff;
                cursor: default;

                &:hover {
                    background-color: #003bb0;
                }

                &.tox-button--secondary {
                    order: 2;
                    background-color: transparent;
                    cursor: pointer;
                    color: #05c;
                    font-weight: 400;
                    text-decoration: underline;
                    padding: 0;
                }
            }
        }
    }
`;
export default styles;
