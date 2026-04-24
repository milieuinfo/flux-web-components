import { vlFocusOutlineMixin } from '@domg-wc/styles';
import { css, CSSResult } from 'lit';

export const vlTabsFluxStyles: CSSResult = css`
    :host {
        display: block;
    }

    .vl-tabs {
        border-bottom: 1px solid var(--vl-color--border-default);
    }

    .vl-tabs--no-border {
        border: 0;
    }

    .vl-tabs nav {
        display: flex;
        flex-wrap: wrap;
    }

    /* Horizontal navigation */
    .vl-tabs ul {
        display: flex;
        flex-wrap: wrap;
        list-style: none;
    }

    /* Mobile version */
    .vl-tabs--mobile {
        border: 0;
        position: relative;

        .vl-tabs__mobile-toggle {
            flex-shrink: 0;

            &::part(button) {
                justify-content: space-between;
            }
        }

        .vl-tabs__mobile-selected {
            flex: 1;
            min-width: 0;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .vl-tabs__mobile-dropdown {
            display: flex;
            flex-direction: column;
            gap: 0;
            border: 1px solid var(--vl-color--border-default);
            border-radius: var(--vl-border-radius);
            position: absolute;
            top: 4.3rem;
            left: 0;
            right: 0;
            background: var(--vl-color--background-default);
            z-index: 1;
            max-height: calc(100vh - 6rem);
            overflow-y: auto;
        }

        .vl-tabs__mobile-option {
            padding: 0.75rem 1rem;
            cursor: pointer;

            &[aria-selected='true'] {
                font-weight: 500;
            }

            &:hover {
                background-color: var(--vl-color--background-subtle);
            }

            &:focus {
                ${vlFocusOutlineMixin()};
                outline-offset: -2px;
            }
        }
    }

    [hidden] {
        display: none !important;
    }
`;
