import { vlMediaScreenSmall } from '@domg-wc/styles';
import { css, CSSResult } from 'lit';

const styles: CSSResult = css`
    .vl-infotext {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        font-weight: 500;
        color: var(--vl-color--text-alt);
        max-width: 14rem;

        @media screen and (max-width: ${vlMediaScreenSmall}px) {
            .vl-infotext__text {
                font-size: 1.4rem;
            }
        }

        &.vl-infotext--badge {
            background-color: var(--vl-color--background-alt);
            border: 1px solid var(--vl-color--border-alt);
            border-radius: 50%;
            width: 14rem;
            height: 14rem;

            .vl-infotext__value {
                line-height: 1;
                margin-top: -1rem;
            }

            .vl-infotext__text {
                font-size: 1.3rem;
                font-weight: 400;
                padding: 1rem 1rem 0;
            }
        }
    }

    a.vl-infotext {
        color: var(--vl-color--action);
        text-decoration: none;

        &:hover,
        &:focus {
            color: var(--vl-color--action-hover);

            .vl-infotext__text {
                text-decoration: underline;
            }
        }

        .vl-infotext__external-icon {
            color: var(--vl-color--icon-subtle);
        }
    }
`;

export default styles;
