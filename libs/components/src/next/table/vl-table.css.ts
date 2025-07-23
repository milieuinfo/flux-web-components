import { vlMediaScreenExtraSmall, vlMediaScreenMedium, vlMediaScreenSmall } from '@domg-wc/common-utilities/css';
import { css } from 'lit';

export const tableStyles = css`
    .vl-table-next {
        width: 100%;
        max-width: 100%;

        caption {
            color: #687483;
            caption-side: bottom;
            text-align: left;
            margin: 15px 0 5px 0;
            font-size: 1.8rem;
            font-weight: 500;
        }

        tbody tr.vl-table-next__element--disabled,
        tbody tr.vl-table-next--disabled,
        tbody td.vl-table-next__element--disabled,
        tbody td.vl-table-next--disabled {
            background: #cbd2d9;
            color: var(--vl-theme-fg-color-70);
        }

        thead tr {
            border-bottom: 0.2rem #cbd2da solid;
        }

        tfoot tr {
            border-top: 0.2rem #cbd2da solid;
        }

        tfoot td {
            font-weight: 500;
            white-space: nowrap;
        }

        tfoot td:first-child {
            padding-left: 0;
        }

        tfoot td:last-child {
            padding-right: 0;
        }

        tbody tr {
            border-bottom: 0.1rem #cbd2da solid;

            &[data-vl-table-selectable] {
                cursor: pointer;
                transition: background 0.2s ease-in-out;

                &:hover {
                    background: #f3f5f6;
                }
            }

            &.vl-table-next__grouped-row:not(.vl-table-next__grouped-row--last) {
                border-bottom: 0;
            }

            th:first-child {
                border-right: 0.2rem #cbd2da solid;
            }
        }

        tbody tr,
        tbody td {
            &.vl-table-next__element--error,
            &.vl-table-next--error {
                background: #fbebec;
                border-bottom: 1px solid #d2373c;
            }

            &.vl-table-next__element--warning,
            &.vl-table-next--warning {
                background: #fff6e7;
                border-bottom: 1px solid #ffa10a;
            }

            &.vl-table-next__element--success,
            &.vl-table-next--success {
                background: #e6f5ed;
                border-bottom: 1px solid #009e47;
            }
        }

        td,
        th {
            font-size: 1.6rem;
            line-height: 1.3;
            text-align: left;
            vertical-align: top;
            padding: 1.2rem 1rem;

            &:first-child {
                border-left: 0;
            }

            &.vl-table-next__icon-container {
                background-color: #f3f5f6;
                color: #333332;

                &.vl-vi {
                    color: #4d4d4b;
                    font-size: 3rem;
                }
            }

            @media screen and (max-width: ${vlMediaScreenSmall}px) {
                font-size: 1.4rem;
                padding: 1rem;
            }
        }

        th {
            font-weight: 500;
            white-space: nowrap;

            & > * {
                white-space: normal;
            }
        }

        &.vl-table-next__grouped-row td {
            padding: 0.3rem 1rem 0.3rem 0;
        }

        &.vl-table-next__grouped-row--first td {
            padding-top: 1.2rem;

            @media screen and (max-width: ${vlMediaScreenSmall}px) {
                padding-top: 1rem;
            }
        }

        &.vl-table-next__grouped-row--last td {
            padding-bottom: 1.2rem;

            @media screen and (max-width: ${vlMediaScreenSmall}px) {
                padding-bottom: 1rem;
            }
        }

        &.vl-pill {
            vertical-align: middle;

            @media screen and (max-width: ${vlMediaScreenSmall}px) {
                font-size: 1.4rem;
                height: 2rem;
                line-height: 2rem;
                padding: 0 0.5rem;
            }
        }
    }

    .vl-table-next--uig-zebra {
        tbody
            tr:not(.vl-table-next__element--warning):not(.vl-table-next__element--error):not(
                .vl-table-next__element--success
            ).odd {
            background-color: #f3f5f6;

            &:hover {
                background-color: #edf0f2;
            }
        }
    }

    .vl-vi .vl-table-next td.vl-table-next__icon-container,
    .vl-vi .vl-table-next th.vl-table-next__icon-container {
        text-align: center;
    }

    .vl-table-next__header-title--sortable {
        text-decoration: none;

        &.vl-table-next__header-title__sort-icon {
            opacity: 0;
        }
    }

    .vl-table-next__header-title--sortable:hover,
    .vl-table-next__header-title--sortable:focus {
        text-decoration: underline;

        &.vl-table-next__header-title__sort-icon {
            opacity: 0.5;
        }
    }

    .vl-table-next__header-title--sortable-active .vl-table-next__header-title__sort-icon {
        opacity: 1;
    }

    .vl-table-next__body-title {
        max-width: 30rem;
    }

    .vl-table-next--alt {
        tr {
            th:first-child {
                border-right: 0.1rem #cbd2da solid;
            }

            th:not(:first-child) {
                padding: 0 1.2rem 1.2rem;
            }

            td:not(:first-child) {
                padding: 1.2rem;
            }
        }
    }

    .vl-table-next--double-spacing tr td,
    .vl-table-next--double-spacing tr th {
        padding: 1.2rem 3rem;
    }

    .vl-table-next--no-header tbody tr:first-child {
        border-top: 3px #cbd2da solid;
    }

    .vl-u-table-overflow {
        width: 100%;
        overflow-x: auto;

        &.vl-table-next {
            overflow: auto;
        }
    }

    .no-js [data-vl-table-check-all] + span {
        display: none !important;
    }

    .vl-table-next--hover tbody tr {
        transition: background 0.2s ease-in-out;

        &:hover {
            background: #f3f5f6;
        }
    }

    .vl-table-next--matrix tr th:first-child {
        border-right: 0.2rem #cbd2da solid;
    }

    .vl-table-next--grid td,
    .vl-table-next--grid th {
        padding: 1.2rem;

        &:not(:first-child) {
            border-left: 0.1rem solid #cbd2da;
        }
    }

    .vl-table-next--zebra
        tbody
        tr:not(.vl-table-next__element--warning):not(.vl-table-next__element--error):not(
            .vl-table-next__element--success
        ):nth-child(odd) {
        background-color: #f3f5f6;

        &:hover {
            background-color: #edf0f2;
        }
    }

    .vl-table-next__actions--top {
        margin: 0 0 2rem;
    }

    .vl-table-next__actions--bottom {
        margin: 2rem 0 0;

        &.vl-table-next__actions__list {
            @media screen and (max-width: ${vlMediaScreenExtraSmall}px) {
                margin: 0 0 1rem;
            }
        }
    }

    .vl-table-next__actions__list .vl-table-next__action:not(:last-child) {
        margin-right: 0.6rem;
    }

    .vl-table-next__action {
        display: inline-block;
        vertical-align: middle;
        margin-bottom: 0.6rem;
    }

    .vl-table-next__action__toggle {
        display: flex;
        align-items: center;
        background: none;
        font-family: 'Flanders Art Sans', sans-serif;
        font-size: 1.6rem;
        font-weight: 400;
        line-height: 1;
        color: #333332;
        border: 0.1rem #cbd2da solid;
        text-decoration: none;
        text-align: left;
        cursor: pointer;
        padding: 0.9rem 1.5rem 0.8rem;

        @media screen and (max-width: ${vlMediaScreenSmall}px) {
            font-size: 1.5rem;
        }
    }

    [data-vl-disable='true'] .vl-table-next__action__toggle {
        color: #687483;
        cursor: default;
    }

    .vl-table-next__action__toggle__icon {
        font-size: 1.2rem;

        &:first-child {
            margin-right: 0.5rem;
        }

        &:last-child {
            margin-left: 0.5rem;
        }
    }

    @media screen and (max-width: ${vlMediaScreenExtraSmall}px) {
        .vl-table-next__action__toggle--contract-xs span {
            display: none;
        }

        .vl-table-next__action__toggle--contract-xs .vl-vi::before {
            margin: 0;
        }
    }

    @media screen and (max-width: ${vlMediaScreenExtraSmall}px) {
        .vl-table-next--collapsed-xs {
            position: relative;

            table,
            thead,
            tbody,
            th,
            td,
            tr {
                display: block;
            }

            thead tr {
                position: absolute;
                top: -9999px;
                left: -9999px;
            }

            td {
                border-bottom: 1px solid #cbd2da;
                position: relative;
                padding-left: 40%;
                white-space: normal;
                text-align: left;
            }

            td::before,
            th::before {
                content: attr(data-title);
                position: absolute;
                top: 10px;
                left: 10px;
                width: 35%;
                padding-right: 10px;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                text-align: left;
                font-weight: 500;
            }
        }
    }

    @media screen and (max-width: ${vlMediaScreenSmall}px) {
        .vl-table-next--collapsed-s {
            position: relative;

            table,
            thead,
            tbody,
            th,
            td,
            tr {
                display: block;
            }

            thead tr {
                position: absolute;
                top: -9999px;
                left: -9999px;
            }

            td {
                border-bottom: 1px solid #cbd2da;
                position: relative;
                padding-left: 40%;
                white-space: normal;
                text-align: left;
            }

            td::before,
            th::before {
                content: attr(data-title);
                position: absolute;
                top: 10px;
                left: 10px;
                width: 35%;
                padding-right: 10px;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                text-align: left;
                font-weight: 500;
            }
        }
    }

    @media screen and (max-width: ${vlMediaScreenMedium}px) {
        .vl-table-next--collapsed-m {
            position: relative;

            table,
            thead,
            tbody,
            th,
            td,
            tr {
                display: block;
            }

            thead tr {
                position: absolute;
                top: -9999px;
                left: -9999px;
            }

            td {
                border-bottom: 1px solid #cbd2da;
                position: relative;
                padding-left: 40%;
                white-space: normal;
                text-align: left;
            }

            td::before,
            th::before {
                content: attr(data-title);
                position: absolute;
                top: 10px;
                left: 10px;
                width: 35%;
                padding-right: 10px;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                text-align: left;
                font-weight: 500;
            }
        }
    }

    .vl-table-next--sticky {
        table-layout: auto;

        .vl-table-next__cell--sticky {
            position: sticky;
            left: 0;
            background-color: inherit;
            border: 0;
            z-index: 1;
        }

        thead .vl-table-next__cell--sticky {
            top: 0;
            z-index: 2;

            &::before {
                display: block;
                position: absolute;
                bottom: -3px;
                left: 0;
                right: 0;
                height: 3px;
                background-color: #cbd2da;
                content: '';
            }
        }

        tbody .vl-table-next__cell--sticky::before {
            display: block;
            position: absolute;
            bottom: 0;
            top: 0;
            right: -1px;
            width: 1px;
            background-color: #cbd2da;
            content: '';
        }

        th,
        td {
            min-width: 200px;
        }

        tr {
            background-color: #fff;
        }
    }

    .vl-table-next__sticky-wrapper {
        width: 100%;
        max-height: 75vh;
        overflow-x: auto;
        overflow-y: auto;
    }

    .vl-u-table-overflow {
        background: linear-gradient(to right, white, white, rgba(255, 255, 255, 0) 30px),
            radial-gradient(farthest-side at 0 50%, rgba(0, 0, 0, 0.3), rgba(255, 255, 255, 0)),
            linear-gradient(to left, white, white, rgba(255, 255, 255, 0) 30px),
            radial-gradient(farthest-side at 100% 50%, rgba(0, 0, 0, 0.3), rgba(255, 255, 255, 0)) 100%;
        background-color: white;
        background-repeat: no-repeat;
        background-attachment: local, scroll, local, scroll;
        background-size: 100% 100%, 15px 100%, 100% 100%, 15px 100%;
    }

    .vl-table-next__navigation {
        position: relative;
        z-index: 1;
        display: flex;
        justify-content: flex-end;
    }
`;
