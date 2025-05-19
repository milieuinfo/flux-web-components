import { css } from 'lit';

export const vlLinkIconStyles = css`
    .vl-link__icon {
        position: relative;
        display: inline-block;
        vertical-align: middle;
        overflow: hidden;
        text-decoration: none;
        color: inherit;
        line-height: 1;
        flex-shrink: 0;
        margin-top: 0;

        &::before,
        &::after {
            display: inline-block;
        }
        &.vl-link__icon--before {
            padding-right: 0.4rem;
        }
        &.vl-link__icon--after {
            padding-left: 0.4rem;
        }
    }
`;
