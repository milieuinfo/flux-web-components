import { css } from 'lit';

export const linkIconStyles = css`
    .vl-link-next__icon {
        /*position: relative;*/
        /*display: inline-block;*/
        vertical-align: middle;
        overflow: hidden;
        text-decoration: none;
        color: inherit;
        line-height: 1;
        flex-shrink: 0;
    }
    .vl-link-next__icon::before,
    .vl-link-next__icon::after {
        display: inline-block;
    }
    .vl-link-next__icon--before {
        padding-right: 0.4rem;
    }
    .vl-link-next__icon--after {
        padding-left: 0.4rem;
    }
    .vl-link-next__icon--standalone {
        padding: 0;
        float: none;
        position: relative;
    }
    .vl-link-next__icon--light {
        color: #687483;
    }
    .vl-link-next__icon--borderless {
        overflow: visible;
    }
    .vl-link-next__icon--borderless::after {
        position: absolute;
        display: block;
        height: 0.1rem;
        left: 0;
        width: 100%;
        bottom: 0;
        margin-bottom: -0.3rem;
        background-color: #fff;
        content: '';
    }
    .vl-link-next__icon.vl-vi-external {
        font-size: 1em;
    }

    .vl-link-next__icon::before,
    .vl-link-next__icon::after {
        display: inline-block;
    }
`;
