import { css, CSSResult, unsafeCSS } from 'lit';
import datepickerComponentRawCss from './vl-datepicker.component.raw.css?raw';

export const vlDatepickerComponentStyles: CSSResult = css`
    ${unsafeCSS(datepickerComponentRawCss)}

    /* ===================================================================
       Box Sizing Reset
       =================================================================== */

    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }

    /* ===================================================================
       Host & Layout
       =================================================================== */

    :host {
        position: relative;
    }

    button {
        cursor: pointer;
    }

    /* ===================================================================
       Icon Font Base
       =================================================================== */

    .vl-vi::before,
    .vl-vi::after {
        font-family: "vlaanderen-icon" !important;
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

    /* ===================================================================
       Icon Definitions
       =================================================================== */

    .vl-vi-calendar::before {
        content: "\\f14b";
    }

    .vl-vi-clock::before {
        content: "\\f15e";
    }

    /* ===================================================================
       Input Field Styling
       =================================================================== */

    .vl-input-field:not(input[type='date']) {
        border-radius: 0.3rem 0 0 0.3rem;
    }

    /* ===================================================================
       Input Addon Success/Error States
       =================================================================== */

    .vl-input-addon--success {
        border-color: var(--vl-color--success);
    }

    .vl-input-addon--success .vl-vi {
        color: var(--vl-color--success) !important;
    }

    .vl-input-addon--error {
        border-color: var(--vl-color--error);
    }

    .vl-input-addon--error .vl-vi {
        color: var(--vl-color--error) !important;
    }

    /* ===================================================================
       Flatpickr Calendar Z-Index
       =================================================================== */

    .flatpickr-calendar {
        z-index: var(--vl-z-layer--datepicker) !important;
    }

    /* ===================================================================
       Block Variant
       =================================================================== */

    .flatpickr-wrapper--block,
    input[block] {
        width: 100%;
    }

    /* ===================================================================
       Native Date Input
       =================================================================== */

    input[type='date'] {
        border-radius: 0.3rem !important;
    }

    /* ===================================================================
       Today Indicator
       =================================================================== */

    .flatpickr-calendar .today {
        border: 1px #bbb solid;
    }

    /* ===================================================================
       Input Group Layout
       =================================================================== */

    .vl-group--input-group {
        input {
            border-radius: 0.3rem 0px 0px 0.3rem;
            border-right-width: 0px;
        }

        button {
            border-radius: 0px 0.3rem 0.3rem 0px;
        }
    }

    /* ===================================================================
       Flatpickr Calendar Base
       =================================================================== */

    .flatpickr-calendar {
        background: transparent;
        opacity: 0;
        display: none;
        text-align: center;
        visibility: hidden;
        padding: 0;
        -webkit-animation: none;
        animation: none;
        direction: ltr;
        border: 0;
        font-size: 14px;
        line-height: 24px;
        border-radius: 5px;
        position: absolute;
        width: 307.875px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        -ms-touch-action: manipulation;
        touch-action: manipulation;
        -webkit-box-shadow: 0 3px 13px var(--vl-datepicker--calendar-shadow);
        box-shadow: 0 3px 13px var(--vl-datepicker--calendar-shadow);
    }

    .flatpickr-calendar.open,
    .flatpickr-calendar.inline {
        opacity: 1;
        max-height: 640px;
        visibility: visible;
    }

    .flatpickr-calendar.open {
        display: inline-block;
        z-index: 100021;
    }

    .flatpickr-calendar.animate.open {
        -webkit-animation: fpFadeInDown 300ms cubic-bezier(0.23, 1, 0.32, 1);
        animation: fpFadeInDown 300ms cubic-bezier(0.23, 1, 0.32, 1);
    }

    .flatpickr-calendar.inline {
        display: block;
        position: relative;
        top: 2px;
    }

    .flatpickr-calendar.static {
        position: absolute;
        top: calc(100% + 2px);
    }

    .flatpickr-calendar.static.open {
        z-index: 999;
        display: block;
    }

    .flatpickr-calendar.multiMonth .flatpickr-days .dayContainer:nth-child(n+1) .flatpickr-day.inRange:nth-child(7n+7) {
        -webkit-box-shadow: none !important;
        box-shadow: none !important;
    }

    .flatpickr-calendar.multiMonth .flatpickr-days .dayContainer:nth-child(n+2) .flatpickr-day.inRange:nth-child(7n+1) {
        -webkit-box-shadow: -2px 0 0 var(--vl-datepicker--day-hover), 5px 0 0 var(--vl-datepicker--day-hover);
        box-shadow: -2px 0 0 var(--vl-datepicker--day-hover), 5px 0 0 var(--vl-datepicker--day-hover);
    }

    .flatpickr-calendar .hasWeeks .dayContainer,
    .flatpickr-calendar .hasTime .dayContainer {
        border-bottom: 0;
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0;
    }

    .flatpickr-calendar .hasWeeks .dayContainer {
        border-left: 0;
    }

    .flatpickr-calendar.hasTime .flatpickr-time {
        height: 40px;
        border-top: 1px solid var(--vl-datepicker--header-background);
    }

    .flatpickr-calendar.hasTime .flatpickr-innerContainer {
        border-bottom: 0;
    }

    .flatpickr-calendar.hasTime .flatpickr-time {
        border: 1px solid var(--vl-datepicker--header-background);
    }

    .flatpickr-calendar.noCalendar.hasTime .flatpickr-time {
        height: auto;
    }

    .flatpickr-calendar:before,
    .flatpickr-calendar:after {
        position: absolute;
        display: block;
        pointer-events: none;
        border: solid transparent;
        content: "";
        height: 0;
        width: 0;
        left: 22px;
    }

    .flatpickr-calendar.rightMost:before,
    .flatpickr-calendar.arrowRight:before,
    .flatpickr-calendar.rightMost:after,
    .flatpickr-calendar.arrowRight:after {
        left: auto;
        right: 22px;
    }

    .flatpickr-calendar.arrowCenter:before,
    .flatpickr-calendar.arrowCenter:after {
        left: 50%;
        right: 50%;
    }

    .flatpickr-calendar:before {
        border-width: 5px;
        margin: 0 -5px;
    }

    .flatpickr-calendar:after {
        border-width: 4px;
        margin: 0 -4px;
    }

    .flatpickr-calendar.arrowTop:before,
    .flatpickr-calendar.arrowTop:after {
        bottom: 100%;
    }

    .flatpickr-calendar.arrowTop:before {
        border-bottom-color: var(--vl-datepicker--header-background);
    }

    .flatpickr-calendar.arrowTop:after {
        border-bottom-color: var(--vl-datepicker--header-background);
    }

    .flatpickr-calendar.arrowBottom:before,
    .flatpickr-calendar.arrowBottom:after {
        top: 100%;
    }

    .flatpickr-calendar.arrowBottom:before {
        border-top-color: var(--vl-datepicker--header-background);
    }

    .flatpickr-calendar.arrowBottom:after {
        border-top-color: var(--vl-datepicker--header-background);
    }

    .flatpickr-calendar:focus {
        outline: 0;
    }

    .flatpickr-wrapper {
        position: relative;
        display: inline-block;
    }

    .flatpickr-calendar {
        background: var(--vl-datepicker--calendar-background);
        border-radius: 0.3rem;
        border: 0.1rem solid var(--vl-datepicker--calendar-border);
        box-shadow: none;
        margin-top: 0.5rem;
    }

    .flatpickr-calendar.arrowTop::before,
    .flatpickr-calendar.arrowTop::after,
    .flatpickr-calendar.arrowBottom::before,
    .flatpickr-calendar.arrowBottom::after {
        display: none;
    }

    .flatpickr-calendar .numInput[type=number],
    .flatpickr-calendar input[type=number] {
        -moz-appearance: textfield;
    }

    .flatpickr-calendar .numInput[type=number]::-webkit-inner-spin-button,
    .flatpickr-calendar .numInput[type=number]::-webkit-outer-spin-button,
    .flatpickr-calendar input[type=number]::-webkit-inner-spin-button,
    .flatpickr-calendar input[type=number]::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    /* ===================================================================
       Flatpickr Months Header
       =================================================================== */

    .flatpickr-months {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        position: relative;
    }

    .flatpickr-months .flatpickr-month {
        border-radius: 5px 5px 0 0;
        background: var(--vl-datepicker--header-background);
        color: var(--vl-datepicker--header-text);
        fill: var(--vl-datepicker--header-text);
        height: 34px;
        line-height: 1;
        text-align: center;
        position: relative;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        overflow: hidden;
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        -ms-flex: 1;
        flex: 1;
    }

    .flatpickr-months .flatpickr-month {
        border-radius: 0;
        background: 0;
        border-bottom: 1px solid var(--vl-datepicker--header-border);
        height: 5.5rem;
    }

    .flatpickr-months .flatpickr-prev-month,
    .flatpickr-months .flatpickr-next-month {
        text-decoration: none;
        cursor: pointer;
        position: absolute;
        top: 0;
        height: 34px;
        padding: 10px;
        z-index: 3;
        color: var(--vl-datepicker--header-text);
        fill: var(--vl-datepicker--header-text);
        border-radius: 50%;
        width: 3.5rem;
        height: 3.5rem;
        top: 50%;
        transform: translateY(-50%);
    }

    .flatpickr-months .flatpickr-prev-month.flatpickr-disabled,
    .flatpickr-months .flatpickr-next-month.flatpickr-disabled {
        display: none;
    }

    .flatpickr-months .flatpickr-prev-month i,
    .flatpickr-months .flatpickr-next-month i {
        position: relative;
    }

    .flatpickr-months .flatpickr-prev-month.flatpickr-prev-month,
    .flatpickr-months .flatpickr-next-month.flatpickr-prev-month {
        left: 10px;
    }

    .flatpickr-months .flatpickr-prev-month.flatpickr-next-month,
    .flatpickr-months .flatpickr-next-month.flatpickr-next-month {
        right: 10px;
    }

    .flatpickr-months .flatpickr-prev-month:hover,
    .flatpickr-months .flatpickr-next-month:hover {
        color: var(--vl-datepicker--day-today-border);
    }

    .flatpickr-months .flatpickr-prev-month:hover svg,
    .flatpickr-months .flatpickr-next-month:hover svg {
        fill: #f64747;
    }

    .flatpickr-months .flatpickr-prev-month svg,
    .flatpickr-months .flatpickr-next-month svg {
        width: 14px;
        height: 14px;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 0;
        right: 0;
        margin: auto;
        fill: var(--vl-datepicker--month-text);
        stroke: var(--vl-datepicker--month-text);
        stroke-width: 0.15rem;
        width: 1.2rem;
        height: 1.2rem;
    }

    .flatpickr-months .flatpickr-prev-month svg path,
    .flatpickr-months .flatpickr-next-month svg path {
        -webkit-transition: fill 0.1s;
        transition: fill 0.1s;
        fill: inherit;
    }

    /* ===================================================================
       Numeric Input Wrapper
       =================================================================== */

    .numInputWrapper {
        position: relative;
        height: auto;
    }

    .numInputWrapper input,
    .numInputWrapper span {
        display: inline-block;
    }

    .numInputWrapper input {
        width: 100%;
    }

    .numInputWrapper input::-ms-clear {
        display: none;
    }

    .numInputWrapper input::-webkit-outer-spin-button,
    .numInputWrapper input::-webkit-inner-spin-button {
        margin: 0;
        -webkit-appearance: none;
    }

    .numInputWrapper span {
        position: absolute;
        right: 0;
        width: 14px;
        padding: 0 4px 0 2px;
        height: 50%;
        line-height: 50%;
        opacity: 0;
        cursor: pointer;
        border: 1px solid rgba(72, 72, 72, 0.15);
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
    }

    .numInputWrapper span:hover {
        background: rgba(0, 0, 0, 0.1);
    }

    .numInputWrapper span:active {
        background: rgba(0, 0, 0, 0.2);
    }

    .numInputWrapper span:after {
        display: block;
        content: "";
        position: absolute;
    }

    .numInputWrapper span.arrowUp {
        top: 0;
        border-bottom: 0;
    }

    .numInputWrapper span.arrowUp:after {
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
        border-bottom: 4px solid rgba(72, 72, 72, 0.6);
        top: 26%;
    }

    .numInputWrapper span.arrowDown {
        top: 50%;
    }

    .numInputWrapper span.arrowDown:after {
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
        border-top: 4px solid rgba(72, 72, 72, 0.6);
        top: 40%;
    }

    .numInputWrapper span svg {
        width: inherit;
        height: auto;
    }

    .numInputWrapper span svg path {
        fill: rgba(90, 97, 113, 0.5);
    }

    .numInputWrapper:hover {
        background: rgba(0, 0, 0, 0.05);
    }

    .numInputWrapper:hover span {
        opacity: 1;
    }

    .numInputWrapper:hover {
        background-color: transparent;
    }

    /* ===================================================================
       Current Month Display
       =================================================================== */

    .flatpickr-current-month {
        font-size: 135%;
        line-height: inherit;
        font-weight: 300;
        color: inherit;
        position: absolute;
        width: 75%;
        left: 12.5%;
        padding: 7.48px 0 0 0;
        line-height: 1;
        height: 34px;
        display: inline-block;
        text-align: center;
        -webkit-transform: translate3d(0px, 0px, 0px);
        transform: translate3d(0px, 0px, 0px);
        font-size: 125%;
        color: var(--vl-color--text);
        padding-top: 0;
        position: relative;
        top: 50%;
        transform: translateY(-50%);
        left: 0;
        right: 0;
        line-height: 3rem;
    }

    .flatpickr-current-month span.cur-month {
        font-family: inherit;
        font-weight: 700;
        color: inherit;
        display: inline-block;
        margin-left: 0.5ch;
        padding: 0;
    }

    .flatpickr-current-month span.cur-month:hover {
        background: rgba(0, 0, 0, 0.05);
    }

    .flatpickr-current-month .numInputWrapper {
        width: 6ch;
        width: 7ch\\0 ;
        display: inline-block;
    }

    .flatpickr-current-month .numInputWrapper span.arrowUp:after {
        border-bottom-color: var(--vl-datepicker--header-text);
    }

    .flatpickr-current-month .numInputWrapper span.arrowDown:after {
        border-top-color: var(--vl-datepicker--header-text);
    }

    .flatpickr-current-month input.cur-year {
        background: transparent;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        color: inherit;
        cursor: text;
        padding: 0 0 0 0.5ch;
        margin: 0;
        display: inline-block;
        font-size: inherit;
        font-family: inherit;
        font-weight: 300;
        line-height: inherit;
        height: auto;
        border: 0;
        border-radius: 0;
        vertical-align: initial;
        -webkit-appearance: textfield;
        -moz-appearance: textfield;
        appearance: textfield;
        font-weight: 500;
        color: var(--vl-datepicker--month-text);
    }

    .flatpickr-current-month input.cur-year:focus {
        outline: 0;
    }

    .flatpickr-current-month input.cur-year[disabled],
    .flatpickr-current-month input.cur-year[disabled]:hover {
        font-size: 100%;
        color: rgba(90, 97, 113, 0.5);
        background: transparent;
        pointer-events: none;
    }

    .flatpickr-current-month .flatpickr-monthDropdown-months {
        appearance: none;
        background: var(--vl-datepicker--header-background);
        border: none;
        border-radius: 0;
        box-sizing: border-box;
        color: inherit;
        cursor: pointer;
        font-size: inherit;
        font-family: inherit;
        font-weight: 300;
        height: auto;
        line-height: inherit;
        margin: -1px 0 0 0;
        outline: none;
        padding: 0 0 0 0.5ch;
        position: relative;
        vertical-align: initial;
        -webkit-box-sizing: border-box;
        -webkit-appearance: none;
        -moz-appearance: none;
        width: auto;
        font-size: 1.8rem;
        font-weight: 500;
        font-family: "Flanders Art Sans", sans-serif;
        color: var(--vl-datepicker--month-text);
        background: transparent;
        border: 0;
    }

    .flatpickr-current-month .flatpickr-monthDropdown-months:focus,
    .flatpickr-current-month .flatpickr-monthDropdown-months:active {
        outline: none;
    }

    .flatpickr-current-month .flatpickr-monthDropdown-months:hover {
        background: none;
    }

    .flatpickr-current-month .flatpickr-monthDropdown-months .flatpickr-monthDropdown-month {
        background-color: var(--vl-datepicker--header-background);
        outline: none;
        padding: 0;
    }

    /* ===================================================================
       Weekdays
       =================================================================== */

    .flatpickr-weekdays {
        background: var(--vl-datepicker--header-background);
        text-align: center;
        overflow: hidden;
        width: 100%;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -webkit-align-items: center;
        -ms-flex-align: center;
        align-items: center;
        height: 28px;
        background: 0;
        padding: 2rem 1.5rem 2rem;
    }

    .flatpickr-weekdays .flatpickr-weekdaycontainer {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        -ms-flex: 1;
        flex: 1;
    }

    span.flatpickr-weekday {
        cursor: default;
        font-size: 90%;
        background: var(--vl-datepicker--header-background);
        color: var(--vl-datepicker--header-text);
        line-height: 1;
        margin: 0;
        text-align: center;
        display: block;
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        -ms-flex: 1;
        flex: 1;
        font-weight: bolder;
        background: 0;
        font-size: 100%;
        color: inherit;
    }

    /* ===================================================================
       Days Container
       =================================================================== */

    .dayContainer,
    .flatpickr-weeks {
        padding: 1px 0 0 0;
    }

    .flatpickr-days {
        position: relative;
        overflow: hidden;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: start;
        -webkit-align-items: flex-start;
        -ms-flex-align: start;
        align-items: flex-start;
        width: 307.875px;
        border-left: 1px solid var(--vl-datepicker--header-background);
        border-right: 1px solid var(--vl-datepicker--header-background);
        border: 0;
        margin-bottom: 1.5rem;
    }

    .flatpickr-days:focus {
        outline: 0;
    }

    .dayContainer {
        padding: 0;
        outline: 0;
        text-align: left;
        width: 307.875px;
        min-width: 307.875px;
        max-width: 307.875px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        display: inline-block;
        display: -ms-flexbox;
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        -webkit-flex-wrap: wrap;
        flex-wrap: wrap;
        -ms-flex-wrap: wrap;
        -ms-flex-pack: justify;
        -webkit-justify-content: space-around;
        justify-content: space-around;
        -webkit-transform: translate3d(0px, 0px, 0px);
        transform: translate3d(0px, 0px, 0px);
        opacity: 1;
        padding: 0 1.5rem;
    }

    .dayContainer + .dayContainer {
        -webkit-box-shadow: -1px 0 0 var(--vl-datepicker--header-background);
        box-shadow: -1px 0 0 var(--vl-datepicker--header-background);
    }

    /* ===================================================================
       Individual Day Cell
       =================================================================== */

    .flatpickr-day {
        background: none;
        border: 1px solid transparent;
        border-radius: 150px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        color: var(--vl-datepicker--day-text);
        cursor: pointer;
        font-weight: 400;
        width: 14.2857143%;
        -webkit-flex-basis: 14.2857143%;
        -ms-flex-preferred-size: 14.2857143%;
        flex-basis: 14.2857143%;
        max-width: 39px;
        height: 39px;
        line-height: 39px;
        margin: 0;
        display: inline-block;
        position: relative;
        -webkit-box-pack: center;
        -webkit-justify-content: center;
        -ms-flex-pack: center;
        justify-content: center;
        text-align: center;
        font-size: 1.6rem;
        line-height: 3rem;
        height: 3rem;
        max-width: 3rem;
        margin: 0.45rem;
    }

    .flatpickr-day.inRange,
    .flatpickr-day.prevMonthDay.inRange,
    .flatpickr-day.nextMonthDay.inRange,
    .flatpickr-day.today.inRange,
    .flatpickr-day.prevMonthDay.today.inRange,
    .flatpickr-day.nextMonthDay.today.inRange,
    .flatpickr-day:hover,
    .flatpickr-day.prevMonthDay:hover,
    .flatpickr-day.nextMonthDay:hover,
    .flatpickr-day:focus,
    .flatpickr-day.prevMonthDay:focus,
    .flatpickr-day.nextMonthDay:focus {
        cursor: pointer;
        outline: 0;
        background: var(--vl-datepicker--day-hover);
        border-color: var(--vl-datepicker--day-hover);
    }

    .flatpickr-day:hover,
    .flatpickr-day:focus {
        color: var(--vl-color--text) !important;
        background: var(--vl-color--action-hover-background) !important;
        border-color: transparent !important;
        font-weight: 400;
    }

    .flatpickr-day.today {
        border-color: var(--vl-datepicker--day-today-border);
        border: 0;
    }

    .flatpickr-day.today:hover,
    .flatpickr-day.today:focus {
        border-color: var(--vl-datepicker--day-today-border);
        background: var(--vl-datepicker--day-today-border);
        color: var(--vl-datepicker--day-selected-text);
    }

    .flatpickr-calendar.mark-today .flatpickr-day.today:not(.selected) {
        background: #f4f4f4;
    }

    .flatpickr-day.prevMonthDay,
    .flatpickr-day.nextMonthDay {
        color: var(--vl-datepicker--day-other-month);
    }

    .flatpickr-day.inRange.today {
        background-color: var(--vl-datepicker--day-selected-bg);
        font-weight: 500;
    }

    .flatpickr-day.inRange.today::after {
        top: 0;
        right: 1.6rem;
    }

    .flatpickr-day.selected,
    .flatpickr-day.startRange,
    .flatpickr-day.endRange,
    .flatpickr-day.selected.inRange,
    .flatpickr-day.startRange.inRange,
    .flatpickr-day.endRange.inRange,
    .flatpickr-day.selected:focus,
    .flatpickr-day.startRange:focus,
    .flatpickr-day.endRange:focus,
    .flatpickr-day.selected:hover,
    .flatpickr-day.startRange:hover,
    .flatpickr-day.endRange:hover,
    .flatpickr-day.selected.prevMonthDay,
    .flatpickr-day.startRange.prevMonthDay,
    .flatpickr-day.endRange.prevMonthDay,
    .flatpickr-day.selected.nextMonthDay,
    .flatpickr-day.startRange.nextMonthDay,
    .flatpickr-day.endRange.nextMonthDay {
        background: #ff5a5f;
        -webkit-box-shadow: none;
        box-shadow: none;
        color: var(--vl-datepicker--day-selected-text);
        border-color: #ff5a5f;
        background-color: var(--vl-datepicker--day-selected-bg);
        border-color: var(--vl-datepicker--day-selected-bg);
    }

    .flatpickr-day.selected.startRange,
    .flatpickr-day.startRange.startRange,
    .flatpickr-day.endRange.startRange {
        border-radius: 50px 0 0 50px;
    }

    .flatpickr-day.selected.endRange,
    .flatpickr-day.startRange.endRange,
    .flatpickr-day.endRange.endRange {
        border-radius: 0 50px 50px 0;
    }

    .flatpickr-day.selected.startRange + .endRange:not(:nth-child(7n+1)),
    .flatpickr-day.startRange.startRange + .endRange:not(:nth-child(7n+1)),
    .flatpickr-day.endRange.startRange + .endRange:not(:nth-child(7n+1)) {
        -webkit-box-shadow: -10px 0 0 #ff5a5f;
        box-shadow: -10px 0 0 #ff5a5f;
        box-shadow: -10px 0 0 var(--vl-datepicker--range-shadow);
    }

    .flatpickr-day.selected.startRange.endRange,
    .flatpickr-day.startRange.startRange.endRange,
    .flatpickr-day.endRange.startRange.endRange {
        border-radius: 50px;
    }

    .flatpickr-day.selected.prevMonthDay,
    .flatpickr-day.selected.nextMonthDay,
    .flatpickr-day.startRange.prevMonthDay,
    .flatpickr-day.startRange.nextMonthDay,
    .flatpickr-day.endRange.prevMonthDay,
    .flatpickr-day.endRange.nextMonthDay {
        background-color: var(--vl-datepicker--day-selected-bg);
        border-color: var(--vl-datepicker--day-selected-bg);
    }

    .flatpickr-day.selected.inRange,
    .flatpickr-day.selected.selected,
    .flatpickr-day.startRange.inRange,
    .flatpickr-day.startRange.selected,
    .flatpickr-day.endRange.inRange,
    .flatpickr-day.endRange.selected {
        background: var(--vl-datepicker--day-selected-bg);
        border-color: var(--vl-datepicker--day-selected-bg);
        border-radius: 50%;
        color: var(--vl-datepicker--day-selected-text);
        font-weight: 500;
    }

    .flatpickr-day.selected::after,
    .flatpickr-day.startRange::after,
    .flatpickr-day.endRange::after {
        content: "";
        display: block;
        width: 3rem;
        height: 3rem;
        position: absolute;
        top: -0.1rem;
        background: var(--vl-datepicker--range-bg);
        z-index: -1;
    }

    .flatpickr-day.startRange::after {
        left: 1.5rem;
    }

    .flatpickr-day.endRange::after {
        right: 1.5rem;
    }

    .flatpickr-day:not(.inRange) + .flatpickr-day.selected:not(.startRange)::after {
        display: none;
    }

    .flatpickr-day.startRange.startRange + .endRange,
    .flatpickr-day.endRange.startRange + .endRange {
        box-shadow: none;
    }

    .flatpickr-day.inRange,
    .flatpickr-day.nextMonthDay.inRange,
    .flatpickr-day.prevMonthDay.inRange {
        border-radius: 0;
        -webkit-box-shadow: -5px 0 0 var(--vl-datepicker--day-hover), 5px 0 0 var(--vl-datepicker--day-hover);
        box-shadow: -5px 0 0 var(--vl-datepicker--day-hover), 5px 0 0 var(--vl-datepicker--day-hover);
        background: var(--vl-datepicker--range-bg);
        box-shadow: -5px 0 0 var(--vl-datepicker--range-shadow), 5px 0 0 var(--vl-datepicker--range-shadow);
        border-color: var(--vl-datepicker--range-bg);
    }

    .flatpickr-day.inRange.startRange,
    .flatpickr-day.inRange.endRange,
    .flatpickr-day.nextMonthDay.inRange.startRange,
    .flatpickr-day.nextMonthDay.inRange.endRange,
    .flatpickr-day.prevMonthDay.inRange.startRange,
    .flatpickr-day.prevMonthDay.inRange.endRange {
        box-shadow: none;
    }

    .flatpickr-day.flatpickr-disabled,
    .flatpickr-day.flatpickr-disabled:hover,
    .flatpickr-day.prevMonthDay,
    .flatpickr-day.nextMonthDay,
    .flatpickr-day.notAllowed,
    .flatpickr-day.notAllowed.prevMonthDay,
    .flatpickr-day.notAllowed.nextMonthDay {
        color: var(--vl-datepicker--day-disabled);
        background: transparent;
        border-color: transparent;
        cursor: default;
    }

    .flatpickr-day.flatpickr-disabled,
    .flatpickr-day.flatpickr-disabled:hover {
        cursor: not-allowed;
        color: rgba(72, 72, 72, 0.1);
    }

    .flatpickr-day.flatpickr-disabled::before {
        position: absolute;
        left: 0;
        right: 0;
        top: 50%;
        transform: translate(0, -50%) rotate(-45deg);
        content: "";
        border-top: 1px solid var(--vl-datepicker--day-other-month);
    }

    .flatpickr-day.flatpickr-disabled:not(.nextMonthDay):not(.prevMonthDay) {
        color: var(--vl-datepicker--day-disabled-strong);
    }

    .flatpickr-day.flatpickr-disabled:not(.nextMonthDay):not(.prevMonthDay)::before {
        border-color: var(--vl-datepicker--day-disabled-strong);
    }

    .flatpickr-day.week.selected {
        border-radius: 0;
        -webkit-box-shadow: -5px 0 0 #ff5a5f, 5px 0 0 #ff5a5f;
        box-shadow: -5px 0 0 #ff5a5f, 5px 0 0 #ff5a5f;
    }

    .flatpickr-day.hidden {
        visibility: hidden;
    }

    .rangeMode .flatpickr-day {
        margin-top: 1px;
    }

    span.flatpickr-day.selected {
        font-weight: bold;
    }

    /* ===================================================================
       Week Wrapper
       =================================================================== */

    .flatpickr-weekwrapper {
        float: left;
    }

    .flatpickr-weekwrapper .flatpickr-weeks {
        padding: 0 12px;
        border-left: 1px solid var(--vl-datepicker--header-background);
    }

    .flatpickr-weekwrapper .flatpickr-weekday {
        float: none;
        width: 100%;
        line-height: 28px;
    }

    .flatpickr-weekwrapper span.flatpickr-day,
    .flatpickr-weekwrapper span.flatpickr-day:hover {
        display: block;
        width: 100%;
        max-width: none;
        color: var(--vl-datepicker--day-disabled);
        background: transparent;
        cursor: default;
        border: none;
    }

    /* ===================================================================
       Inner Container
       =================================================================== */

    .flatpickr-innerContainer {
        display: block;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        overflow: hidden;
        background: var(--vl-datepicker--calendar-background);
        border-bottom: 1px solid var(--vl-datepicker--header-background);
        border-bottom: 0;
    }

    .flatpickr-rContainer {
        display: inline-block;
        padding: 0;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
    }

    /* ===================================================================
       Time Picker
       =================================================================== */

    .flatpickr-time {
        text-align: center;
        outline: 0;
        display: block;
        height: 0;
        line-height: 40px;
        max-height: 40px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        overflow: hidden;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        background: var(--vl-datepicker--calendar-background);
        border-radius: 0 0 5px 5px;
    }

    .flatpickr-time:after {
        content: "";
        display: table;
        clear: both;
    }

    .flatpickr-time .numInputWrapper {
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        -ms-flex: 1;
        flex: 1;
        width: 40%;
        height: 40px;
        float: left;
    }

    .flatpickr-time .numInputWrapper span.arrowUp:after {
        border-bottom-color: var(--vl-datepicker--day-text);
    }

    .flatpickr-time .numInputWrapper span.arrowDown:after {
        border-top-color: var(--vl-datepicker--day-text);
    }

    .flatpickr-time.hasSeconds .numInputWrapper {
        width: 26%;
    }

    .flatpickr-time.time24hr .numInputWrapper {
        width: 49%;
    }

    .flatpickr-time input {
        background: transparent;
        -webkit-box-shadow: none;
        box-shadow: none;
        border: 0;
        border-radius: 0;
        text-align: center;
        margin: 0;
        padding: 0;
        height: inherit;
        line-height: inherit;
        color: var(--vl-datepicker--day-text);
        font-size: 14px;
        position: relative;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        -webkit-appearance: textfield;
        -moz-appearance: textfield;
        appearance: textfield;
    }

    .flatpickr-time input.flatpickr-hour {
        font-weight: bold;
    }

    .flatpickr-time input.flatpickr-minute,
    .flatpickr-time input.flatpickr-second {
        font-weight: 400;
    }

    .flatpickr-time input:focus {
        outline: 0;
        border: 0;
    }

    .flatpickr-time .flatpickr-time-separator,
    .flatpickr-time .flatpickr-am-pm {
        height: inherit;
        float: left;
        line-height: inherit;
        color: var(--vl-datepicker--day-text);
        font-weight: bold;
        width: 2%;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        -webkit-align-self: center;
        -ms-flex-item-align: center;
        align-self: center;
    }

    .flatpickr-time .flatpickr-am-pm {
        outline: 0;
        width: 18%;
        cursor: pointer;
        text-align: center;
        font-weight: 400;
    }

    .flatpickr-time input:hover,
    .flatpickr-time .flatpickr-am-pm:hover,
    .flatpickr-time input:focus,
    .flatpickr-time .flatpickr-am-pm:focus {
        background: #eaeaea;
    }

    .flatpickr-input[readonly] {
        cursor: pointer;
    }

    /* ===================================================================
       Animations
       =================================================================== */

    @-webkit-keyframes fpFadeInDown {
        from {
            opacity: 0;
            -webkit-transform: translate3d(0, -20px, 0);
            transform: translate3d(0, -20px, 0);
        }
        to {
            opacity: 1;
            -webkit-transform: translate3d(0, 0, 0);
            transform: translate3d(0, 0, 0);
        }
    }

    @keyframes fpFadeInDown {
        from {
            opacity: 0;
            -webkit-transform: translate3d(0, -20px, 0);
            transform: translate3d(0, -20px, 0);
        }
        to {
            opacity: 1;
            -webkit-transform: translate3d(0, 0, 0);
            transform: translate3d(0, 0, 0);
        }
    }

    /* ===================================================================
       Validation States
       =================================================================== */

    .vl-datepicker .vl-datepicker__input-field {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
    }

    .vl-datepicker.validated.invalid .vl-datepicker__input-field,
    .vl-datepicker.validated.invalid .vl-datepicker__input-addon {
        border-color: var(--vl-datepicker--error-border);
        background-color: var(--vl-datepicker--error-background);
    }

    .vl-datepicker.validated.valid .vl-datepicker__input-field,
    .vl-datepicker.validated.valid .vl-datepicker__input-addon {
        border-color: var(--vl-datepicker--success-border);
        background-color: var(--vl-datepicker--success-background);
    }

    /* ===================================================================
       Tooltip Styles
       =================================================================== */

    .vl-tooltip {
        max-width: 27rem;
        background: var(--vl-datepicker--tooltip-background);
        border: 1px var(--vl-datepicker--tooltip-border) solid;
        text-align: center;
        font-size: 1.6rem;
        line-height: 1.25;
        font-weight: 400;
        color: var(--vl-datepicker--tooltip-text);
        font-family: "Flanders Art Sans", sans-serif;
        padding: 0.3rem 1rem;
        z-index: 10009;
        position: relative;
        box-shadow: 0 0 2rem 0 var(--vl-datepicker--tooltip-shadow);
    }

    .vl-tooltip::before {
        content: "";
        position: absolute;
        top: -0.9rem;
        right: -0.9rem;
        bottom: -0.9rem;
        left: -0.9rem;
        z-index: 0;
    }

    .vl-tooltip--static {
        display: block;
        pointer-events: auto;
    }

    .vl-tooltip--static[x-placement^=top],
    .vl-tooltip--static[data-popper-placement^=top] {
        transform: translate(-50%, -100%);
        margin-left: 50%;
    }

    .vl-tooltip--static[x-placement^=left],
    .vl-tooltip--static[data-popper-placement^=left] {
        transform: translate(-100%, 0%);
    }

    .vl-tooltip--static[x-placement^=bottom],
    .vl-tooltip--static[data-popper-placement^=bottom] {
        transform: translate(-50%, 0%);
        margin-left: 50%;
        top: 100%;
    }

    .vl-tooltip--static[x-placement^=right],
    .vl-tooltip--static[data-popper-placement^=right] {
        margin-left: calc(100% + 10px);
    }

    .vl-tooltip .tooltip__inner {
        position: relative;
        z-index: 1;
    }

    .vl-tooltip.vl-tooltip--large {
        font-weight: 400;
        font-size: 1.4rem;
        padding: 2rem 3.2rem 2rem 2rem;
    }

    .vl-tooltip.vl-tooltip--large .tooltip__inner {
        text-align: left;
    }

    .vl-tooltip__title {
        margin: 0 0 0.5rem;
        border-bottom: 1px solid #bdc5d0;
        font-size: 1.6rem;
    }

    .vl-tooltip__close {
        margin: 5px;
        padding: 3px;
        position: absolute;
        right: 0px;
        top: 0px;
        border: 0;
        font-size: 1.6rem;
    }

    .vl-tooltip__close:hover {
        color: var(--vl-color--action);
    }

    .vl-tooltip__close:focus {
        color: var(--vl-color--action-active);
    }

    @media screen and (max-width: 767px) {
        .vl-tooltip__close {
            font-size: 1.4rem;
        }
    }

    .vl-tooltip[x-placement^=top] .vl-tooltip__arrow,
    .vl-tooltip[data-popper-placement^=top] .vl-tooltip__arrow {
        left: 50%;
        margin-left: -0.6rem;
        border-bottom-width: 0;
        border-top-color: var(--vl-datepicker--tooltip-border);
        bottom: -0.6rem;
    }

    .vl-tooltip[x-placement^=top] .vl-tooltip__arrow::after,
    .vl-tooltip[data-popper-placement^=top] .vl-tooltip__arrow::after {
        content: " ";
        bottom: 1px;
        margin-left: -0.5rem;
        border-bottom-width: 0;
        border-top-color: var(--vl-datepicker--tooltip-background);
    }

    .vl-tooltip[x-placement^=right] .vl-tooltip__arrow,
    .vl-tooltip[data-popper-placement^=right] .vl-tooltip__arrow {
        top: 50%;
        left: -0.6rem;
        margin-top: -0.6rem;
        border-left-width: 0;
        border-right-color: var(--vl-datepicker--tooltip-border);
    }

    .vl-tooltip[x-placement^=right] .vl-tooltip__arrow::after,
    .vl-tooltip[data-popper-placement^=right] .vl-tooltip__arrow::after {
        content: " ";
        left: 1px;
        bottom: -0.5rem;
        border-left-width: 0;
        border-right-color: var(--vl-datepicker--tooltip-background);
    }

    .vl-tooltip[x-placement^=bottom] .vl-tooltip__arrow,
    .vl-tooltip[data-popper-placement^=bottom] .vl-tooltip__arrow {
        left: 50%;
        margin-left: -0.6rem;
        border-top-width: 0;
        border-bottom-color: var(--vl-datepicker--tooltip-border);
        top: -0.6rem;
    }

    .vl-tooltip[x-placement^=bottom] .vl-tooltip__arrow::after,
    .vl-tooltip[data-popper-placement^=bottom] .vl-tooltip__arrow::after {
        content: " ";
        top: 1px;
        margin-left: -0.5rem;
        border-top-width: 0;
        border-bottom-color: var(--vl-datepicker--tooltip-background);
    }

    .vl-tooltip[x-placement^=left] .vl-tooltip__arrow,
    .vl-tooltip[data-popper-placement^=left] .vl-tooltip__arrow {
        top: 50%;
        right: -0.6rem;
        margin-top: -0.6rem;
        border-right-width: 0;
        border-left-color: var(--vl-datepicker--tooltip-border);
    }

    .vl-tooltip[x-placement^=left] .vl-tooltip__arrow::after,
    .vl-tooltip[data-popper-placement^=left] .vl-tooltip__arrow::after {
        content: " ";
        right: 1px;
        border-right-width: 0;
        border-left-color: var(--vl-datepicker--tooltip-background);
        bottom: -0.5rem;
    }

    .vl-tooltip__arrow {
        border-width: 0.6rem;
    }

    .vl-tooltip__arrow,
    .vl-tooltip__arrow::after {
        position: absolute;
        display: block;
        width: 0;
        height: 0;
        border-color: transparent;
        border-style: solid;
        border-width: 0.5rem;
        content: "";
    }

    /* ===================================================================
       Calendar Placeholder Positioning
       =================================================================== */

    #datepicker-calendar-placeholder {
        position: absolute;
        top: 0;
        left: 0;
        width: 100vw;
        z-index: var(--vl-z-layer--datepicker);
    }
`;
