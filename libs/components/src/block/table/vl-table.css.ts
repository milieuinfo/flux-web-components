import { vlMediaScreenExtraSmall, vlMediaScreenMedium, vlMediaScreenSmall } from '@domg-wc/styles';
import { css } from 'lit';

export const tableStyles = css`
    vl-table {
        display: block;
        max-width: 100%;
        overflow-x: auto;
    }

    .vl-table {
        width: 100%;
        max-width: 100%;
        border-collapse: collapse;

        caption {
            color: #687483;
            caption-side: bottom;
            text-align: left;
            margin: 15px 0 5px 0;
            font-size: 1.8rem;
            font-weight: 500;
        }

        tbody tr.vl-table__element--disabled,
        tbody tr.vl-table--disabled,
        tbody td.vl-table__element--disabled,
        tbody td.vl-table--disabled {
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

            &[table-selectable] {
                cursor: pointer;
                transition: background 0.2s ease-in-out;

                &:hover {
                    background: #f3f5f6;
                }
            }

            &.vl-table__grouped-row:not(.vl-table__grouped-row--last) {
                border-bottom: 0;
            }

            th:first-child {
                border-right: 0.2rem #cbd2da solid;
            }
        }

        tbody tr,
        tbody td {
            &.vl-table__element--error,
            &.vl-table--error {
                background: #fbebec;
                border-bottom: 1px solid #d2373c;
            }

            &.vl-table__element--warning,
            &.vl-table--warning {
                background: #fff6e7;
                border-bottom: 1px solid #ffa10a;
            }

            &.vl-table__element--success,
            &.vl-table--success {
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

            &.vl-table__icon-container {
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

        &.vl-table__grouped-row td {
            padding: 0.3rem 1rem 0.3rem 0;
        }

        &.vl-table__grouped-row--first td {
            padding-top: 1.2rem;

            @media screen and (max-width: ${vlMediaScreenSmall}px) {
                padding-top: 1rem;
            }
        }

        &.vl-table__grouped-row--last td {
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

    .vl-table--flux-zebra {
        tbody tr:not(.vl-table__element--warning):not(.vl-table__element--error):not(.vl-table__element--success).odd {
            background-color: #f3f5f6;
            &:hover {
                background-color: #edf0f2;
            }
        }
    }

    .vl-vi .vl-table td.vl-table__icon-container,
    .vl-vi .vl-table th.vl-table__icon-container {
        text-align: center;
    }

    .vl-table__header-title--sortable {
        text-decoration: none;

        &.vl-table__header-title__sort-icon {
            opacity: 0;
        }
    }

    .vl-table__header-title--sortable:hover,
    .vl-table__header-title--sortable:focus {
        text-decoration: underline;

        &.vl-table__header-title__sort-icon {
            opacity: 0.5;
        }
    }

    .vl-table__header-title--sortable-active .vl-table__header-title__sort-icon {
        opacity: 1;
    }

    .vl-table__body-title {
        max-width: 30rem;
    }

    .vl-table--alt {
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

    .vl-table--double-spacing tr td,
    .vl-table--double-spacing tr th {
        padding: 1.2rem 3rem;
    }

    .vl-table--no-header tbody tr:first-child {
        border-top: 3px #cbd2da solid;
    }

    .vl-u-table-overflow {
        width: 100%;
        overflow-x: auto;

        &.vl-table {
            overflow: auto;
        }
    }

    .no-js [table-check-all] + span {
        display: none !important;
    }

    .vl-table--hover tbody tr {
        transition: background 0.2s ease-in-out;

        &:hover {
            background: #f3f5f6;
        }
    }

    .vl-table--matrix tr th:first-child {
        border-right: 0.2rem #cbd2da solid;
    }

    .vl-table--grid td,
    .vl-table--grid th {
        padding: 1.2rem;

        &:not(:first-child) {
            border-left: 0.1rem solid #cbd2da;
        }
    }

    .vl-table--zebra
        tbody
        tr:not(.vl-table__element--warning):not(.vl-table__element--error):not(.vl-table__element--success):nth-child(
            odd
        ) {
        background-color: #f3f5f6;

        &:hover {
            background-color: #edf0f2;
        }
    }

    .vl-table__actions--top {
        margin: 0 0 2rem;
    }

    .vl-table__actions--bottom {
        margin: 2rem 0 0;

        &.vl-table__actions__list {
            @media screen and (max-width: ${vlMediaScreenExtraSmall}px) {
                margin: 0 0 1rem;
            }
        }
    }

    .vl-table__actions__list .vl-table__action:not(:last-child) {
        margin-right: 0.6rem;
    }

    .vl-table__action {
        display: inline-block;
        vertical-align: middle;
        margin-bottom: 0.6rem;
    }

    .vl-table__action__toggle {
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

    [disable='true'] .vl-table__action__toggle {
        color: #687483;
        cursor: default;
    }

    .vl-table__action__toggle__icon {
        font-size: 1.2rem;

        &:first-child {
            margin-right: 0.5rem;
        }

        &:last-child {
            margin-left: 0.5rem;
        }
    }

    @media screen and (max-width: ${vlMediaScreenExtraSmall}px) {
        .vl-table__action__toggle--contract-xs span {
            display: none;
        }

        .vl-table__action__toggle--contract-xs .vl-vi::before {
            margin: 0;
        }
    }

    @media screen and (max-width: ${vlMediaScreenExtraSmall}px) {
        .vl-table--collapsed-xs {
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
        .vl-table--collapsed-s {
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
        .vl-table--collapsed-m {
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

    .vl-table--sticky {
        table-layout: auto;

        .vl-table__cell--sticky {
            position: sticky;
            left: 0;
            background-color: inherit;
            border: 0;
            z-index: 1;
        }

        thead .vl-table__cell--sticky {
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

        tbody .vl-table__cell--sticky::before {
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

    .vl-table__sticky-wrapper {
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

    .vl-table__navigation {
        position: relative;
        z-index: 1;
        display: flex;
        justify-content: flex-end;
    }
`;
