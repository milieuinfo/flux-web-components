import { css, CSSResult } from 'lit';

// deze css is gegenereerd uit de oude custom scss
const styles: CSSResult = css`
    :root {
        --vl-theme-primary-color: #ffe615;
        --vl-theme-primary-color-60: #fff073;
        --vl-theme-primary-color-70: #ffee5b;
        --vl-theme-primary-color-rgba-30: rgba(255, 230, 21, 0.3);
        --vl-theme-fg-color: #333332;
        --vl-theme-fg-color-60: #858584;
        --vl-theme-fg-color-70: #707070;
    }

    .vl-vi::before,
    .vl-vi::after {
        font-family: 'vlaanderen-icon' !important;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-style: normal;
        font-variant: normal;
        font-weight: normal;
        text-decoration: none;
        text-transform: none;
        display: inline-block;
        vertical-align: middle;
    }
    .vl-vi.vl-vi-u-180deg::before {
        display: inline-block;
        transform: rotate(180deg);
        vertical-align: middle;
    }

    .vl-vi-u-xs::before {
        font-size: 0.8rem;
    }

    .vl-vi-u-s::before {
        font-size: 1.3rem;
    }

    .vl-vi-u-m::before {
        font-size: 1.7rem;
    }

    .vl-vi-u-l::before {
        font-size: 2rem;
    }

    .vl-vi-u-xl::before {
        font-size: 2.2rem;
    }

    .vl-vi-u-90deg::before {
        display: inline-block;
        transform: rotate(90deg);
    }

    .vl-vi-u-180deg::before {
        display: inline-block;
        transform: rotate(180deg);
    }

    .vl-contact-card__title,
    .vl-link.vl-contact-card__title {
        font-size: 2.2rem;
        font-family: 'Flanders Art Sans', sans-serif;
        font-weight: 500;
        margin-bottom: 1.8rem;
        line-height: 1.36;
        border-radius: 0;
        appearance: none;
        -webkit-appearance: none;
        border: 0;
        background-color: transparent;
        padding: 0;
        margin-bottom: 1rem;
        display: block;
        line-height: 3rem;
        overflow: hidden;
    }
    @media screen and (max-width: 767px) {
        .vl-contact-card__title,
        .vl-link.vl-contact-card__title {
            font-size: 2rem;
            margin-bottom: 1.4rem;
        }
    }

    .vl-contact-card__content {
        padding: 2.5rem;
        display: flex;
        flex-wrap: wrap;
        font-size: 1.6rem;
        line-height: 2rem;
    }
    @media screen and (min-width: 767px) {
        .vl-region--alt .vl-contact-card__content {
            padding: 0;
        }
    }
    @media screen and (max-width: 767px) {
        .vl-contact-card__content {
            display: block;
            font-size: 1.5rem;
            padding: 1.5rem;
        }
    }
    .no-flexbox .vl-contact-card__content::before,
    .no-flexbox .vl-contact-card__content::after {
        content: '';
        display: table;
    }
    .no-flexbox .vl-contact-card__content::after {
        clear: both;
    }
    .vl-contact-card__content .vl-map__container {
        height: 100%;
        margin-bottom: 0;
    }

    .vl-contact-card__data,
    .vl-contact-card__map {
        width: 50%;
    }
    .no-flexbox .vl-contact-card__data,
    .no-flexbox .vl-contact-card__map {
        float: left;
    }
    @media screen and (max-width: 767px) {
        .vl-contact-card__data,
        .vl-contact-card__map {
            width: auto;
        }
    }

    .vl-contact-card__data {
        padding-right: 1.5rem;
        line-height: 2.4rem;
    }
    @media screen and (max-width: 767px) {
        .vl-contact-card__data {
            padding-right: 0;
        }
    }

    .vl-contact-card__data__title {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        float: left;
        clear: left;
        width: 30%;
        padding-right: 0.5rem;
        margin-bottom: 1rem;
        white-space: normal;
        color: #687483;
    }
    @media screen and (max-width: 767px) {
        .vl-contact-card__data__title {
            display: none;
        }
    }

    .vl-contact-card__data__content {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        float: left;
        width: 70%;
        margin-bottom: 2.5rem;
        white-space: normal;
    }
    @media screen and (max-width: 767px) {
        .vl-contact-card__data__content {
            float: none;
            width: auto;
            margin-bottom: 1.25rem;
        }
    }

    .vl-contact-card__data__title *,
    .vl-contact-card__data__content * {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: normal;
    }

    .vl-contact-card__data__name {
        font-weight: 700;
    }

    .vl-contact-card__map {
        height: 25rem;
        padding-left: 1.5rem;
        position: relative;
        min-height: 25rem;
        overflow: hidden;
    }
    @media screen and (max-width: 767px) {
        .vl-contact-card__map {
            padding-left: 0;
            margin-top: 2rem;
            min-height: 0;
        }
    }
    .vl-contact-card__map .vl-map {
        width: 100%;
        height: 100%;
        border: 1px solid #cbd2da;
    }
    @media screen and (max-width: 767px) {
        .vl-contact-card__map .vl-map {
            position: relative;
            min-height: 15rem;
            height: auto;
        }
    }
    .no-js .vl-contact-card__map {
        height: auto;
        min-height: 0;
    }
    .no-js .vl-contact-card__map .vl-map {
        height: auto;
    }

    .vl-contact-card__footer {
        width: 100%;
        margin-top: 2.5rem;
        padding-top: 1rem;
        border-top: 1px solid #cbd2da;
        font-size: 1.6rem;
        overflow: hidden;
    }
    @media screen and (max-width: 767px) {
        .vl-contact-card__footer {
            margin-top: 1.5rem;
            font-size: 1.6rem;
        }
    }

    .vl-contact-card.js-vl-accordion .vl-contact-card__title {
        padding-left: 2rem;
        position: relative;
        cursor: pointer;
        margin-bottom: 0;
        transition: margin-bottom 0.3s;
    }
    .vl-contact-card.js-vl-accordion .vl-contact-card__title .vl-vi {
        position: absolute;
        left: 0;
        top: 0;
        transition: transform 0.2s;
        color: #333332;
        font-size: 1.3rem;
        line-height: 3.2rem;
    }
    .vl-contact-card.js-vl-accordion .vl-contact-card__content-wrapper {
        overflow: hidden;
        visibility: hidden;
        max-height: 0;
        transition: max-height 0.3s cubic-bezier(0, 1.05, 0, 1);
    }
    .vl-contact-card.js-vl-accordion .vl-contact-card__content-wrapper .vl-map {
        display: none;
    }
    .vl-contact-card.js-vl-accordion--open .vl-contact-card__title {
        margin-bottom: 1rem;
    }
    .vl-contact-card.js-vl-accordion--open .vl-contact-card__content-wrapper {
        max-height: 9999px;
        visibility: visible;
        transition: max-height 0.3s ease-in;
    }
    .vl-contact-card.js-vl-accordion--open .vl-contact-card__content-wrapper .vl-map {
        display: block;
    }
`;
export default styles;
