import { registerWebComponents } from '@domg-wc/common';
import { vlGridStyles } from '@domg-wc/styles';
import { html, nothing } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { VlFormMessageComponent } from '../form-message';
import { VlModalComponent } from '../../block/modal';
import { createDateRange } from './stories/vl-datepicker.stories-util';
import { VlDatepickerComponent } from './vl-datepicker.component';
import { datepickerDefaults } from './vl-datepicker.defaults';

registerWebComponents([VlDatepickerComponent, VlFormMessageComponent, VlModalComponent]);

// Helper functions
const createDateString = ({
    year,
    day,
    month,
    format,
    date = new Date(),
}: {
    year?: number;
    month?: number;
    day?: number;
    format?: 'Y-m-d' | 'd-m-Y' | 'd/m/Y' | 'Z';
    date?: Date;
}) => {
    const selectedYear = year ? year : date.getFullYear();
    const selectedMonth = month ? month : date.getMonth() + 1;
    const selectedDay = day ? day : date.getDate();
    const dayString = selectedDay < 10 ? `0${selectedDay}` : `${selectedDay}`;
    const monthString = selectedMonth < 10 ? `0${selectedMonth}` : `${selectedMonth}`;
    switch (format) {
        case 'Y-m-d':
            return `${selectedYear}-${monthString}-${dayString}`;
        case 'd-m-Y':
            return `${dayString}-${monthString}-${selectedYear}`;
        case 'd/m/Y':
            return `${dayString}/${monthString}/${selectedYear}`;
        default:
            return `${dayString}.${monthString}.${selectedYear}`;
    }
};

const createIsoDateString = ({
    year = 0,
    month = 0,
    day = 0,
    hours = 0,
    minutes = 0,
    seconds = 0,
    offset = true,
    type = 'date',
}: {
    year?: number;
    month?: number;
    day?: number;
    hours?: number;
    minutes?: number;
    seconds?: number;
    offset?: boolean;
    type?: 'date' | 'time' | 'date-time' | 'range';
}) => {
    const timezoneOffset = new Date().getTimezoneOffset() * 60000;
    const localTodayDate = new Date(new Date().setHours(hours, minutes, seconds, 0) - (offset ? timezoneOffset : 0));
    if (day) localTodayDate.setDate(day);
    if (month) localTodayDate.setMonth(month - 1);
    if (year) localTodayDate.setFullYear(year);
    switch (type) {
        case 'date':
            return localTodayDate.toISOString().substring(0, 10);
        case 'date-time':
            return localTodayDate.toISOString().substring(0, 16);
        case 'time':
            return localTodayDate.toTimeString().substring(0, 5);
        case 'range':
            return `${localTodayDate.toISOString()} tot en met ${localTodayDate.toISOString()}`;
    }
};

const mountDatepickerInForm = ({
    value,
    disabled,
    block,
    required,
    type,
    format,
    pattern,
    disableMaskValidation,
    maxDate,
    minDate,
    maxTime,
    minTime,
}: typeof datepickerDefaults) => {
    cy.mount(html`
        <style>
            ${vlGridStyles}
        </style>
        <div class="container">
            <form id="form" class="vl-form">
                <div class="vl-grid">
                    <div class="vl-column vl-column--3">
                        <label class="vl-form__label vl-form__label--block" for="geboortedatum">
                            Geboortedatum: *
                        </label>
                    </div>
                    <div class="vl-column vl-column--9">
                        <vl-datepicker
                            id="geboortedatum"
                            name="geboortedatum"
                            label="Geboortedatum"
                            ?block=${block}
                            ?required=${required}
                            ?disabled=${disabled}
                            ?disable-mask-validation=${disableMaskValidation}
                            pattern=${pattern || nothing}
                            format=${format || nothing}
                            type=${type || nothing}
                            value=${value || nothing}
                            min-date=${ifDefined(minDate || undefined)}
                            max-date=${ifDefined(maxDate || undefined)}
                            min-time=${ifDefined(minTime || undefined)}
                            max-time=${ifDefined(maxTime || undefined)}
                        >
                        </vl-datepicker>
                        <vl-form-message for="geboortedatum" state="valueMissing">
                            Gelieve een geboortedatum in te vullen.
                        </vl-form-message>
                        <vl-form-message for="geboortedatum" state="patternMismatch"
                            >Gelieve het juiste formaat te gebruiken.</vl-form-message
                        >
                        <vl-form-message for="geboortedatum" state="rangeOverflow"
                            >Waarde overschrijdt het toegestane maximum.</vl-form-message
                        >
                        <vl-form-message for="geboortedatum" state="rangeUnderflow"
                            >Waarde ligt onder het toegestane minimum.</vl-form-message
                        >
                    </div>
                    <div class="vl-column vl-column--9 vl-column--start-4">
                        <div class="vl-action-group">
                            <button class="vl-button" type="submit">Verstuur</button>
                            <button class="vl-button" type="reset">Reset</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    `);
};

const calendarSnapshotOptions = {
    failureThreshold: 0.05,
    failureThresholdType: 'percent' as const,
    customDiffConfig: { threshold: 0.15 },
};

const shouldOpenCalendar = () => {
    cy.get('vl-datepicker').shadow().find('button#toggle-calendar').click();
    cy.get('vl-datepicker').shadow().find('.flatpickr-calendar').should('be.visible');
};

describe('vl-datepicker - basic functionality', () => {
    it('should mount', () => {
        cy.mount(html`
            <div class="snapshot-wrapper" style="width: 400px; padding: 20px; background: white;">
                <vl-datepicker label="geboortedatum"></vl-datepicker>
            </div>
        `);
        cy.injectAxe();

        cy.get('vl-datepicker').shadow().find('input');
        cy.document().then((doc) => doc.fonts.ready);
        cy.wait(100);
        cy.get('.snapshot-wrapper').matchImageSnapshot('datepicker-mount');
        cy.checkA11y('vl-datepicker');
    });

    it('should set id', () => {
        cy.mount(html`<vl-datepicker id="test-id" label="test"></vl-datepicker>`);
        cy.injectAxe();

        cy.get('vl-datepicker').should('have.id', 'test-id');
        cy.get('vl-datepicker').shadow().find('input').should('have.id', 'test-id');
        cy.checkA11y('vl-datepicker');
    });

    it('should set name', () => {
        cy.mount(html`<vl-datepicker name="test-name" label="geboortedatum"></vl-datepicker>`);
        cy.injectAxe();

        cy.get('vl-datepicker').should('have.attr', 'name', 'test-name');
        cy.get('vl-datepicker').shadow().find('input').should('have.attr', 'name', 'test-name');
        cy.checkA11y('vl-datepicker');
    });

    it('should set label', () => {
        cy.mount(html`<vl-datepicker label="test-label"></vl-datepicker>`);
        cy.injectAxe();

        cy.get('vl-datepicker').should('have.attr', 'label', 'test-label');
        cy.get('vl-datepicker').shadow().find('input').should('have.attr', 'aria-label', 'test-label');
        cy.checkA11y('vl-datepicker');
    });
});

describe('vl-datepicker - properties & states', () => {
    beforeEach(() => {
        cy.viewport(1200, 800);
    });

    it('should set block', () => {
        cy.mount(html`
            <div class="snapshot-wrapper" style="width: 400px; padding: 20px; background: white;">
                <vl-datepicker block label="geboortedatum"></vl-datepicker>
            </div>
        `);
        cy.injectAxe();

        cy.wait(100);
        cy.get('.snapshot-wrapper').matchImageSnapshot('datepicker-block');
        cy.get('vl-datepicker').should('have.attr', 'block');
        cy.get('vl-datepicker').shadow().find('input').should('have.class', 'vl-input-field--block');
        cy.checkA11y('vl-datepicker');
    });

    it('should set required', () => {
        cy.mount(html`<vl-datepicker required label="geboortedatum"></vl-datepicker>`);
        cy.injectAxe();

        cy.get('vl-datepicker').should('have.attr', 'required');
        cy.get('vl-datepicker').shadow().find('input').should('have.attr', 'required');
        cy.checkA11y('vl-datepicker');
    });

    it('should set disabled', () => {
        cy.mount(html`
            <div class="snapshot-wrapper" style="width: 400px; padding: 20px; background: white;">
                <vl-datepicker disabled label="geboortedatum"></vl-datepicker>
            </div>
        `);
        cy.injectAxe();

        cy.wait(100);
        cy.get('.snapshot-wrapper').matchImageSnapshot('datepicker-disabled');
        cy.get('vl-datepicker').should('have.attr', 'disabled');
        cy.get('vl-datepicker').should('be.disabled');
        cy.get('vl-datepicker').shadow().find('input').should('have.class', 'vl-input-field--disabled');
        cy.get('vl-datepicker').shadow().find('input').should('be.disabled');
        cy.checkA11y('vl-datepicker');
    });

    it('should set readonly', () => {
        cy.mount(html`
            <div class="snapshot-wrapper" style="width: 400px; padding: 20px; background: white;">
                <vl-datepicker readonly label="geboortedatum"></vl-datepicker>
            </div>
        `);
        cy.injectAxe();

        cy.wait(100);
        cy.get('.snapshot-wrapper').matchImageSnapshot('datepicker-readonly');
        cy.get('vl-datepicker').should('have.attr', 'readonly');
        cy.get('vl-datepicker').shadow().find('input').should('have.attr', 'readonly');
        cy.get('vl-datepicker').shadow().find('button').should('have.attr', 'disabled');
        cy.checkA11y('vl-datepicker');
    });

    it('should set error', () => {
        cy.mount(html`
            <div class="snapshot-wrapper" style="width: 400px; padding: 20px; background: white;">
                <vl-datepicker error label="geboortedatum"></vl-datepicker>
            </div>
        `);
        cy.injectAxe();

        cy.wait(100);
        cy.get('.snapshot-wrapper').matchImageSnapshot('datepicker-error');
        cy.get('vl-datepicker').should('have.attr', 'error');
        cy.get('vl-datepicker').shadow().find('input').should('have.class', 'vl-input-field--error');
        cy.get('vl-datepicker').shadow().find('input').should('have.attr', 'error');
        cy.checkA11y('vl-datepicker');
    });

    it('should set success', () => {
        cy.mount(html`
            <div class="snapshot-wrapper" style="width: 400px; padding: 20px; background: white;">
                <vl-datepicker success label="geboortedatum"></vl-datepicker>
            </div>
        `);
        cy.injectAxe();

        cy.wait(100);
        cy.get('.snapshot-wrapper').matchImageSnapshot('datepicker-success');
        cy.get('vl-datepicker').should('have.attr', 'success');
        cy.get('vl-datepicker').shadow().find('input').should('have.class', 'vl-input-field--success');
        cy.checkA11y('vl-datepicker');
    });
});

describe('vl-datepicker - date types & formats', () => {
    it('should set date in custom format', () => {
        const format = 'd-m-Y';
        cy.mount(html`<vl-datepicker format=${format} value="2024-04-01" label="date"></vl-datepicker>`);
        cy.injectAxe();

        shouldOpenCalendar();
        cy.wait(100);
        cy.get('vl-datepicker').shadow().find('.flatpickr-calendar').matchImageSnapshot('datepicker-custom-format-calendar', calendarSnapshotOptions);
        cy.get('vl-datepicker')
            .shadow()
            .find('.flatpickr-calendar')
            .find('.flatpickr-day:not(.prevMonthDay):not(.nextMonthDay)')
            .contains('15')
            .click();
        cy.get('vl-datepicker').shadow().find('input.vl-input-field').should('have.value', '15-04-2024');
        cy.get('vl-datepicker').should('have.value', '2024-04-15');
        cy.checkA11y('vl-datepicker');
    });

    it('should set initial date', () => {
        const date = '2021-11-01';
        cy.mount(html`
            <div class="snapshot-wrapper" style="width: 400px; padding: 20px; background: white;">
                <vl-datepicker value=${date} label="date"></vl-datepicker>
            </div>
        `);
        cy.injectAxe();

        cy.wait(100);
        cy.get('.snapshot-wrapper').matchImageSnapshot('datepicker-initial-date');
        cy.get('vl-datepicker').shadow().find('input.vl-input-field').should('have.value', '01.11.2021');
        cy.get('vl-datepicker').should('have.value', '2021-11-01');
        cy.checkA11y('vl-datepicker');
    });

    it('should set initial time', () => {
        const value = '09:06';
        cy.mount(html`
            <div class="snapshot-wrapper" style="width: 400px; padding: 20px; background: white;">
                <vl-datepicker value=${value} type="time" label="time"></vl-datepicker>
            </div>
        `);
        cy.injectAxe();

        cy.wait(100);
        cy.get('.snapshot-wrapper').matchImageSnapshot('datepicker-initial-time');
        cy.get('vl-datepicker').shadow().find('input.vl-input-field').should('have.value', '09:06');
        cy.get('vl-datepicker').should('have.value', '09:06');
        cy.checkA11y('vl-datepicker');
    });

    it('should set initial date-time', () => {
        const date = '2024-04-17T09:06:35';
        cy.mount(html`
            <div class="snapshot-wrapper" style="width: 400px; padding: 20px; background: white;">
                <vl-datepicker value=${date} type="date-time" label="date-time"></vl-datepicker>
            </div>
        `);
        cy.injectAxe();

        cy.wait(100);
        cy.get('.snapshot-wrapper').matchImageSnapshot('datepicker-initial-date-time');
        cy.get('vl-datepicker').shadow().find('input.vl-input-field').should('have.value', '17.04.2024 09:06');
        cy.get('vl-datepicker').should('have.value', '2024-04-17T09:06');
        cy.checkA11y('vl-datepicker');
    });

    it('should set initial date in long ISO format', () => {
        const date = '2024-04-17T09:06:35';
        cy.mount(html`<vl-datepicker value=${date} label="date"></vl-datepicker>`);
        cy.injectAxe();

        cy.get('vl-datepicker').shadow().find('input.vl-input-field').should('have.value', '17.04.2024');
        cy.get('vl-datepicker').should('have.value', '2024-04-17');
        cy.checkA11y('vl-datepicker');
    });

    it('should set initial range', () => {
        const date = '2024-04-17/2025-12-31';
        cy.mount(html`
            <div class="snapshot-wrapper" style="width: 400px; padding: 20px; background: white;">
                <vl-datepicker value=${date} label="date" type="range"></vl-datepicker>
            </div>
        `);
        cy.injectAxe();

        cy.wait(100);
        cy.get('.snapshot-wrapper').matchImageSnapshot('datepicker-initial-range');
        cy.get('vl-datepicker')
            .shadow()
            .find('input.vl-input-field')
            .should('have.value', '17.04.2024 tot en met 31.12.2025');
        cy.get('vl-datepicker').should('have.value', '2024-04-17/2025-12-31');
        cy.checkA11y('vl-datepicker');
    });

    it("should set today's date", () => {
        cy.mount(html`<vl-datepicker value="today" label="startdatum"></vl-datepicker>`);
        cy.injectAxe();

        cy.get('vl-datepicker').shadow().find('input.vl-input-field').should('have.value', createDateString({}));
        cy.get('vl-datepicker').should('have.value', createIsoDateString({}));
        cy.checkA11y('vl-datepicker');
    });

    it('should set empty value', () => {
        const initialValue = createIsoDateString({ day: 2, month: 12, year: 2021 });

        mountDatepickerInForm({ ...datepickerDefaults, value: initialValue, block: true });
        cy.injectAxe();

        cy.get('vl-datepicker').should('have.value', initialValue);
        cy.get('vl-datepicker').shadow().find('input').should('have.value', '02.12.2021');

        cy.get('vl-datepicker').invoke('attr', 'value', '');
        cy.get('vl-datepicker').should('not.have.value');
        cy.get('vl-datepicker').shadow().find('input.vl-input-field').should('have.value', '');

        cy.get('vl-datepicker').invoke('attr', 'value', initialValue);
        cy.get('vl-datepicker').should('have.value', initialValue);
        cy.get('vl-datepicker').shadow().find('input').should('have.value', '02.12.2021');
        cy.checkA11y('vl-datepicker');
    });
});

describe('vl-datepicker - constraints', () => {
    beforeEach(() => {
        cy.viewport(1200, 800);
    });

    it('should set min date', () => {
        cy.mount(html`<vl-datepicker min-date="15.04.2024" value="2024-04-20" label="date"></vl-datepicker>`);

        shouldOpenCalendar();
        cy.wait(100);
        cy.get('vl-datepicker').shadow().find('.flatpickr-calendar').matchImageSnapshot('datepicker-min-date-constraint', calendarSnapshotOptions);
        cy.get('vl-datepicker')
            .shadow()
            .find('.flatpickr-calendar')
            .find('span.flatpickr-day')
            .contains('14')
            .and('contain.class', 'flatpickr-disabled');
    });

    it('should set max date', () => {
        cy.mount(html`<vl-datepicker max-date="20.04.2024" value="2024-04-15" label="date"></vl-datepicker>`);

        shouldOpenCalendar();
        cy.wait(100);
        cy.get('vl-datepicker').shadow().find('.flatpickr-calendar').matchImageSnapshot('datepicker-max-date-constraint', calendarSnapshotOptions);
        cy.get('vl-datepicker')
            .shadow()
            .find('.flatpickr-calendar')
            .find('.flatpickr-day:not(.prevMonthDay):not(.nextMonthDay)')
            .contains('21')
            .and('contain.class', 'flatpickr-disabled');
    });

    it('should set min time', () => {
        const minTime = '09:15';
        cy.mount(html`<vl-datepicker type="time" min-time=${minTime} label="time"></vl-datepicker>`);
        cy.injectAxe();

        shouldOpenCalendar();
        cy.focused().blur();
        cy.wait(100);
        cy.get('vl-datepicker').shadow().find('.flatpickr-calendar').matchImageSnapshot('datepicker-min-time-constraint', calendarSnapshotOptions);
        cy.get('vl-datepicker')
            .shadow()
            .find('.flatpickr-calendar')
            .find('.numInput.flatpickr-hour')
            .should('have.value', '09');
        cy.get('vl-datepicker')
            .shadow()
            .find('.flatpickr-calendar')
            .find('.numInput.flatpickr-minute')
            .should('have.value', '15');

        cy.get('vl-datepicker')
            .shadow()
            .find('.flatpickr-calendar')
            .find('.numInput.flatpickr-minute + .arrowUp')
            .click();
        cy.get('vl-datepicker')
            .shadow()
            .find('.flatpickr-calendar')
            .find('.numInput.flatpickr-minute')
            .should('have.value', '20');

        cy.get('vl-datepicker')
            .shadow()
            .find('.flatpickr-calendar')
            .find('.numInput.flatpickr-minute + .arrowUp + .arrowDown')
            .click()
            .click()
            .click();
        cy.get('vl-datepicker')
            .shadow()
            .find('.flatpickr-calendar')
            .find('.numInput.flatpickr-minute')
            .should('have.value', '15');
        cy.checkA11y('vl-datepicker');
    });

    it('should set max time', () => {
        const maxTime = '16:45';
        cy.mount(html`<vl-datepicker type="time" max-time=${maxTime} label="time"></vl-datepicker>`);
        cy.injectAxe();

        shouldOpenCalendar();
        cy.focused().blur();
        cy.wait(100);
        cy.get('vl-datepicker').shadow().find('.flatpickr-calendar').matchImageSnapshot('datepicker-max-time-constraint', calendarSnapshotOptions);
        cy.get('vl-datepicker')
            .shadow()
            .find('.flatpickr-calendar')
            .find('.numInput.flatpickr-hour')
            .should('have.value', '12');
        cy.get('vl-datepicker')
            .shadow()
            .find('.flatpickr-calendar')
            .find('.numInput.flatpickr-minute')
            .should('have.value', '00');

        cy.get('vl-datepicker').invoke('attr', 'value', '16:45');

        cy.get('vl-datepicker')
            .shadow()
            .find('.flatpickr-calendar')
            .find('.numInput.flatpickr-minute + .arrowUp')
            .click();
        cy.get('vl-datepicker')
            .shadow()
            .find('.flatpickr-calendar')
            .find('.numInput.flatpickr-minute')
            .should('have.value', '45');

        cy.get('vl-datepicker')
            .shadow()
            .find('.flatpickr-calendar')
            .find('.numInput.flatpickr-minute + .arrowUp + .arrowDown')
            .click();
        cy.get('vl-datepicker')
            .shadow()
            .find('.flatpickr-calendar')
            .find('.numInput.flatpickr-minute')
            .should('have.value', '40');
        cy.checkA11y('vl-datepicker');
    });
});

describe('vl-datepicker - calendar interaction', () => {
    beforeEach(() => {
        cy.viewport(1200, 800);
    });

    it('should open the datepicker on button click', () => {
        cy.mount(html`<vl-datepicker value="2024-04-15" label="date"></vl-datepicker>`);

        shouldOpenCalendar();
        cy.wait(100);
        cy.get('vl-datepicker').shadow().find('.flatpickr-calendar').matchImageSnapshot('datepicker-calendar-open', calendarSnapshotOptions);
    });

    it('should open time picker', () => {
        cy.mount(html`<vl-datepicker type="time" value="14:30" label="time"></vl-datepicker>`);
        cy.injectAxe();

        shouldOpenCalendar();
        cy.focused().blur();
        cy.wait(100);
        cy.get('vl-datepicker').shadow().find('.flatpickr-calendar').matchImageSnapshot('datepicker-time-picker-open', calendarSnapshotOptions);
        cy.checkA11y('vl-datepicker');
    });

    it('should show error state with open calendar', () => {
        cy.mount(html`<vl-datepicker error value="2024-04-15" label="date"></vl-datepicker>`);

        shouldOpenCalendar();
        cy.wait(100);
        cy.get('vl-datepicker').shadow().find('.flatpickr-calendar').matchImageSnapshot('datepicker-error-calendar-open', calendarSnapshotOptions);
    });

    it('should open date-time picker', () => {
        cy.mount(html`<vl-datepicker type="date-time" value="2024-04-15T14:30" label="date-time"></vl-datepicker>`);

        shouldOpenCalendar();
        cy.focused().blur();
        cy.wait(100);
        cy.get('vl-datepicker').shadow().find('.flatpickr-calendar').matchImageSnapshot('datepicker-date-time-picker-open', calendarSnapshotOptions);
    });

    it('should set range', () => {
        cy.mount(html`<vl-datepicker type="range" min-date="01.04.2024" max-date="30.04.2024" label="date"></vl-datepicker>`);
        cy.injectAxe();

        shouldOpenCalendar();
        cy.get('vl-datepicker')
            .shadow()
            .find('.flatpickr-calendar')
            .find('.flatpickr-day:not(.prevMonthDay):not(.nextMonthDay)')
            .contains('15')
            .click();
        cy.wait(100);
        cy.get('vl-datepicker')
            .shadow()
            .find('.flatpickr-calendar')
            .matchImageSnapshot('datepicker-range-partial-selection', calendarSnapshotOptions);

        cy.get('vl-datepicker')
            .shadow()
            .find('.flatpickr-calendar')
            .find('.flatpickr-day:not(.prevMonthDay):not(.nextMonthDay)')
            .contains('25')
            .click();

        cy.get('vl-datepicker')
            .shadow()
            .find('input.vl-input-field')
            .should('have.value', '15.04.2024 tot en met 25.04.2024');
        cy.get('vl-datepicker').should('have.value', '2024-04-15/2024-04-25');
        cy.checkA11y('vl-datepicker');
    });

    it('should set range by manual input', () => {
        cy.mount(html`<vl-datepicker type="range" label="date"></vl-datepicker>`);
        cy.injectAxe();

        const startDate = createDateString({ day: 15 });
        const endDate = createDateString({ day: 25 });

        cy.get('vl-datepicker').shadow().find('input.vl-input-field').type(`${startDate} tot en met ${endDate}`);

        cy.get('vl-datepicker')
            .shadow()
            .find('input.vl-input-field')
            .should('have.value', `${startDate} tot en met ${endDate}`);
        cy.get('vl-datepicker').should(
            'have.value',
            `${createIsoDateString({ day: 15 })}/${createIsoDateString({ day: 25 })}`
        );
        cy.checkA11y('vl-datepicker');
    });

    it('should open the calendar above when there is not enough space below', () => {
        cy.mount(
            html`
                <div style="margin-top: calc(100vh - 50px); margin-left: calc(100vw - 250px)">
                    <vl-datepicker label="date"></vl-datepicker>
                </div>
            `
        );
        shouldOpenCalendar();

        cy.get('vl-datepicker')
            .shadow()
            .find('.flatpickr-calendar')
            .should('not.have.class', 'static')
            .should('have.class', 'open');

        // Controleer dat de kalender boven de button verschijnt (via CSS Anchor Positioning flip)
        cy.get('vl-datepicker')
            .shadow()
            .find('.flatpickr-calendar')
            .then(($calendar) => {
                cy.get('vl-datepicker')
                    .shadow()
                    .find('button#toggle-calendar')
                    .should(($button) => {
                        const buttonRect = $button[0].getBoundingClientRect();
                        const calendarRect = $calendar[0].getBoundingClientRect();
                        // Kalender bottom moet boven of gelijk aan de button top zijn
                        expect(calendarRect.bottom).to.be.at.most(buttonRect.top + 10);
                    });
            });
    });

    it('should open the calendar below the input when static is true', () => {
        cy.mount(html`<vl-datepicker static value="2024-04-15" label="date"></vl-datepicker>`);
        shouldOpenCalendar();
        cy.wait(100);
        cy.get('vl-datepicker').shadow().find('.flatpickr-calendar').matchImageSnapshot('datepicker-static-calendar', calendarSnapshotOptions);

        cy.get('vl-datepicker')
            .shadow()
            .find('.flatpickr-calendar')
            .should('have.class', 'static')
            .should('not.have.attr', 'style');
    });

    it('should position calendar near the toggle button', () => {
        cy.mount(html`<vl-datepicker></vl-datepicker>`);

        cy.get('vl-datepicker').shadow().find('button#toggle-calendar').click();

        // Controleer dat de kalender dicht bij de button verschijnt.
        // 50px tolerantie: flatpickr's default positionering verschilt per browser
        // (Safari/WebKit voegt extra offset toe via de isSafari workaround).
        cy.get('vl-datepicker')
            .shadow()
            .find('.flatpickr-calendar')
            .should('have.class', 'open')
            .then(($calendar) => {
                cy.get('vl-datepicker')
                    .shadow()
                    .find('button#toggle-calendar')
                    .should(($button) => {
                        const buttonRect = $button[0].getBoundingClientRect();
                        const calendarRect = $calendar[0].getBoundingClientRect();
                        const verticalDistance = Math.abs(calendarRect.top - buttonRect.bottom);
                        expect(verticalDistance).to.be.lessThan(50);
                    });
            });
    });

    it('should position calendar correctly inside a scrollable container', () => {
        cy.mount(html`
            <div style="height: 200px; overflow: auto;">
                <div style="height: 600px; padding-top: 100px;">
                    <vl-datepicker></vl-datepicker>
                </div>
            </div>
        `);

        // Scroll de container
        cy.get('div[style*="overflow"]').scrollTo(0, 80);

        cy.get('vl-datepicker').shadow().find('button#toggle-calendar').click();

        cy.get('vl-datepicker')
            .shadow()
            .find('.flatpickr-calendar')
            .should('have.class', 'open')
            .then(($calendar) => {
                cy.get('vl-datepicker')
                    .shadow()
                    .find('button#toggle-calendar')
                    .should(($button) => {
                        const buttonRect = $button[0].getBoundingClientRect();
                        const calendarRect = $calendar[0].getBoundingClientRect();
                        const verticalDistance = Math.abs(calendarRect.top - buttonRect.bottom);
                        expect(verticalDistance).to.be.lessThan(50);
                    });
            });
    });

    // Test alle 12 position varianten (default flatpickr positionering)
    const positionsBelowButton = [
        'auto', 'below', 'auto left', 'below left', 'auto center', 'below center', 'auto right', 'below right',
    ];
    const positionsAboveButton = ['above', 'above left', 'above center', 'above right'];

    positionsBelowButton.forEach((position) => {
        it(`should position calendar below the button with position="${position}"`, () => {
            cy.viewport(1024, 768);
            cy.mount(html`
                <div style="margin-top: 200px; margin-left: 300px;">
                    <vl-datepicker position=${position}></vl-datepicker>
                </div>
            `);

            cy.get('vl-datepicker').shadow().find('button#toggle-calendar').click();
            cy.get('vl-datepicker')
                .shadow()
                .find('.flatpickr-calendar')
                .should('have.class', 'open')
                .then(($calendar) => {
                    cy.get('vl-datepicker')
                        .shadow()
                        .find('button#toggle-calendar')
                        .should(($button) => {
                            const buttonRect = $button[0].getBoundingClientRect();
                            const calendarRect = $calendar[0].getBoundingClientRect();
                            // Kalender moet onder de button staan
                            // 50px tolerantie: flatpickr positionering verschilt per browser
                            expect(calendarRect.top).to.be.at.least(buttonRect.bottom - 50);
                        });
                });
        });
    });

    positionsAboveButton.forEach((position) => {
        it(`should position calendar above the button with position="${position}"`, () => {
            cy.viewport(1024, 768);
            cy.mount(html`
                <div style="margin-top: 400px; margin-left: 300px;">
                    <vl-datepicker position=${position}></vl-datepicker>
                </div>
            `);

            cy.get('vl-datepicker').shadow().find('button#toggle-calendar').click();
            cy.get('vl-datepicker')
                .shadow()
                .find('.flatpickr-calendar')
                .should('have.class', 'open')
                .then(($calendar) => {
                    cy.get('vl-datepicker')
                        .shadow()
                        .find('button#toggle-calendar')
                        .should(($button) => {
                            const buttonRect = $button[0].getBoundingClientRect();
                            const calendarRect = $calendar[0].getBoundingClientRect();
                            // Kalender bottom moet boven of gelijk aan de button top zijn
                            // 50px tolerantie: flatpickr positionering verschilt per browser
                            expect(calendarRect.bottom).to.be.at.most(buttonRect.top + 50);
                        });
                });
        });
    });

    // Test datepicker in alle vl-modal varianten (center, full-screen, left, right)
    // De transform: translate(-50%, -50%) is verwijderd uit vl-modal (flux-css override)
    // zodat position: fixed en CSS Anchor Positioning correct werken voor child elementen.
    const modalVariants: { size: string; position: string }[] = [
        { size: 'default', position: 'center' },
        { size: 'medium', position: 'center' },
        { size: 'large', position: 'center' },
        { size: 'full-screen', position: 'center' },
        { size: 'default', position: 'left' },
        { size: 'default', position: 'right' },
    ];

    modalVariants.forEach(({ size, position: modalPosition }) => {
        it(`should position calendar correctly in vl-modal (size="${size}", position="${modalPosition}") with default positioning`, () => {
            cy.viewport(1024, 768);
            cy.mount(html`
                <vl-modal id="test-modal" title="Modal" size=${size} position=${modalPosition}>
                    <span slot="content">
                        <vl-datepicker></vl-datepicker>
                    </span>
                </vl-modal>
            `);

            cy.get('vl-modal').then(($modal) => ($modal[0] as any).open());

            cy.get('vl-datepicker').shadow().find('button#toggle-calendar').click();
            cy.get('vl-datepicker')
                .shadow()
                .find('.flatpickr-calendar')
                .should('have.class', 'open');
        });
    });

    // TODO: lukt lokaal of op bamboo, maar niet op beide
    //  dit type test gaan we niet meer doen, foutgevoelig en tijdsintensief
    //  we gaan ook niet testen of pixels in een bepaalde range vallen
    //  wat mag is (eerder functioneel) testen hoe 'iets' gepositioneerd wordt tov 'iets' anders - bv. links ervan of erboven
    it.skip('should position the calendar correctly after adding HTML elements to the DOM', () => {
        cy.viewport(1920, 1080);

        cy.mount(
            html`<div>
                <button
                    id="add-line"
                    onclick="document.getElementById('add-line').insertAdjacentElement('afterend', document.createElement('br'))"
                >
                    add line</button
                ><vl-datepicker position="below left"></vl-datepicker>
            </div>`
        );
        cy.get('vl-datepicker')
            .shadow()
            .find('#datepicker-calendar-placeholder')
            .shouldHaveComputedStyle({ style: 'top', value: '-27px' });
        cy.get('#add-line').click();
        cy.get('#add-line').click();
        cy.get('vl-datepicker').shadow().find('button#toggle-calendar').click();
        cy.get('vl-datepicker')
            .shadow()
            .find('#datepicker-calendar-placeholder')
            .shouldHaveComputedStyle({ style: 'top', value: '-54px' });
        cy.get('vl-datepicker').shadow().find('button#toggle-calendar').click();
        cy.get('#add-line').click();
        cy.get('#add-line').click();
        cy.get('vl-datepicker').shadow().find('button#toggle-calendar').click();
        cy.get('vl-datepicker')
            .shadow()
            .find('#datepicker-calendar-placeholder')
            .shouldHaveComputedStyle({ style: 'top', value: '-108px' });
    });
});

describe('cypress-component - form components - vl-datepicker - native input on mobile', () => {
    beforeEach(() => {
        cy.viewport(320, 480);
    });

    it('should test', () => {});

    it('should mount', () => {
        cy.mount(html`<vl-datepicker disable-mobile-native-input></vl-datepicker>`);

        cy.get('vl-datepicker').shadow();
    });

    it('should be accessible', () => {
        cy.mount(html`
            <vl-datepicker disable-mobile-native-input id="date" name="date" label="date"></vl-datepicker>
        `);
        cy.injectAxe();

        cy.checkA11y('vl-datepicker');
    });

    it('should open the datepicker on button click', () => {
        cy.mount(html`<vl-datepicker disable-mobile-native-input></vl-datepicker>`);

        cy.get('vl-datepicker').shadow().find('button#toggle-calendar').click();
        cy.get('vl-datepicker').shadow().find('.flatpickr-calendar').should('have.class', 'open');
    });

    it('should set id', () => {
        cy.mount(html`<vl-datepicker disable-mobile-native-input id="test-id"></vl-datepicker>`);

        cy.get('vl-datepicker').should('have.id', 'test-id');
        cy.get('vl-datepicker').shadow().find('input').should('have.id', 'test-id');
    });

    it('should set name', () => {
        cy.mount(html`<vl-datepicker
            disable-mobile-native-input
            name="test-name"
            label="geboortedatum"
        ></vl-datepicker>`);
        cy.injectAxe();

        cy.get('vl-datepicker').should('have.attr', 'name', 'test-name');
        cy.get('vl-datepicker').shadow().find('input').should('have.attr', 'name', 'test-name');
        cy.checkA11y('vl-datepicker');
    });

    it('should set label', () => {
        cy.mount(html`<vl-datepicker disable-mobile-native-input label="test-label"></vl-datepicker>`);
        cy.injectAxe();

        cy.get('vl-datepicker').should('have.attr', 'label', 'test-label');
        cy.get('vl-datepicker').shadow().find('input').should('have.attr', 'aria-label', 'test-label');
        cy.checkA11y('vl-datepicker');
    });

    it('should set block', () => {
        cy.mount(html`<vl-datepicker disable-mobile-native-input block label="geboortedatum"></vl-datepicker>`);
        cy.injectAxe();

        cy.get('vl-datepicker').should('have.attr', 'block');
        cy.get('vl-datepicker').shadow().find('input').should('have.class', 'vl-input-field--block');
        cy.checkA11y('vl-datepicker');
    });

    it('should set required', () => {
        cy.mount(html`<vl-datepicker disable-mobile-native-input required label="geboortedatum"></vl-datepicker>`);
        cy.injectAxe();

        cy.get('vl-datepicker').should('have.attr', 'required');
        cy.get('vl-datepicker').shadow().find('input').should('have.attr', 'required');
        cy.checkA11y('vl-datepicker');
    });

    it('should set disabled', () => {
        cy.mount(html`<vl-datepicker disable-mobile-native-input disabled label="geboortedatum"></vl-datepicker>`);
        cy.injectAxe();

        cy.get('vl-datepicker').should('have.attr', 'disabled');
        cy.get('vl-datepicker').should('be.disabled');
        cy.get('vl-datepicker').shadow().find('input').should('have.class', 'vl-input-field--disabled');
        cy.get('vl-datepicker').shadow().find('input').should('be.disabled');
        cy.checkA11y('vl-datepicker');
    });

    it('should set readonly', () => {
        cy.mount(html`<vl-datepicker disable-mobile-native-input readonly label="geboortedatum"></vl-datepicker>`);
        cy.injectAxe();

        cy.get('vl-datepicker').should('have.attr', 'readonly');
        cy.get('vl-datepicker').shadow().find('input').should('have.attr', 'readonly');
        cy.get('vl-datepicker').shadow().find('button').should('have.attr', 'disabled');

        cy.checkA11y('vl-datepicker');
    });

    it('should set error', () => {
        cy.mount(html`<vl-datepicker disable-mobile-native-input error label="geboortedatum"></vl-datepicker>`);
        cy.injectAxe();

        cy.get('vl-datepicker').should('have.attr', 'error');
        cy.get('vl-datepicker').shadow().find('input').should('have.class', 'vl-input-field--error');
        cy.get('vl-datepicker').shadow().find('input').should('have.attr', 'error');
        cy.checkA11y('vl-datepicker');
    });

    it('should set success', () => {
        cy.mount(html`<vl-datepicker disable-mobile-native-input success label="geboortedatum"></vl-datepicker>`);
        cy.injectAxe();

        cy.get('vl-datepicker').should('have.attr', 'success');
        cy.get('vl-datepicker').shadow().find('input').should('have.class', 'vl-input-field--success');
        cy.checkA11y('vl-datepicker');
    });

    it('should set date in format', () => {
        const format = 'd-m-Y';
        cy.mount(html`<vl-datepicker disable-mobile-native-input format=${format}></vl-datepicker>`);

        const testDate = createDateString({ day: 15, format: format });
        cy.get('vl-datepicker').shadow().find('button#toggle-calendar').click();
        cy.get('vl-datepicker')
            .shadow()
            .find('.flatpickr-calendar')
            .find('.flatpickr-day:not(.prevMonthDay):not(.nextMonthDay)')
            .contains('15')
            .click();
        cy.get('vl-datepicker').shadow().find('input.vl-input-field').should('have.value', testDate);
        cy.get('vl-datepicker').should('have.value', createIsoDateString({ day: 15 }));
    });

    it('should set initial date', () => {
        const date = '2021-11-01';
        cy.mount(html`<vl-datepicker disable-mobile-native-input value=${date} label="date"></vl-datepicker>`);
        cy.injectAxe();

        cy.get('vl-datepicker').shadow().find('input.vl-input-field').should('have.value', '01.11.2021');
        cy.get('vl-datepicker').should('have.value', '2021-11-01');
        cy.checkA11y('vl-datepicker');
    });

    it('should set initial time', () => {
        const value = '09:06';
        cy.mount(html`<vl-datepicker
            disable-mobile-native-input
            value=${value}
            type="time"
            label="time"
        ></vl-datepicker>`);
        cy.injectAxe();

        cy.get('vl-datepicker').shadow().find('input.vl-input-field').should('have.value', '09:06');
        cy.get('vl-datepicker').should('have.value', '09:06');
        cy.checkA11y('vl-datepicker');
    });

    it('should set initial date-time', () => {
        const date = '2024-04-17T09:06:35';
        cy.mount(html`<vl-datepicker
            disable-mobile-native-input
            value=${date}
            type="date-time"
            label="date-time"
        ></vl-datepicker>`);
        cy.injectAxe();

        cy.get('vl-datepicker').shadow().find('input.vl-input-field').should('have.value', '17.04.2024 09:06');
        cy.get('vl-datepicker').should('have.value', '2024-04-17T09:06');
        cy.checkA11y('vl-datepicker');
    });

    it('should set initial date in long ISO format', () => {
        const date = '2024-04-17T09:06:35';
        cy.mount(html`<vl-datepicker disable-mobile-native-input value=${date} label="date"></vl-datepicker>`);
        cy.injectAxe();

        cy.get('vl-datepicker').shadow().find('input.vl-input-field').should('have.value', '17.04.2024');
        cy.get('vl-datepicker').should('have.value', '2024-04-17');
        cy.checkA11y('vl-datepicker');
    });

    it("should set today's date", () => {
        cy.mount(html`<vl-datepicker disable-mobile-native-input value="today" label="startdatum"></vl-datepicker>`);
        cy.injectAxe();

        cy.get('vl-datepicker').shadow().find('input.vl-input-field').should('have.value', createDateString({}));
        cy.get('vl-datepicker').should('have.value', createIsoDateString({}));
        cy.checkA11y('vl-datepicker');
    });

    it('should set min date', () => {
        const minDate = createDateString({ day: 15 });
        cy.mount(html`<vl-datepicker disable-mobile-native-input min-date=${minDate}></vl-datepicker>`);

        cy.get('vl-datepicker').shadow().find('button#toggle-calendar').click();
        cy.get('vl-datepicker')
            .shadow()
            .find('.flatpickr-calendar')
            .find('span.flatpickr-day')
            .contains('14')
            .and('contain.class', 'flatpickr-disabled');
    });

    it('should set max date', () => {
        const maxDate = createDateString({ day: 20 });
        cy.mount(html`<vl-datepicker disable-mobile-native-input max-date=${maxDate}></vl-datepicker>`);

        cy.get('vl-datepicker').shadow().find('button#toggle-calendar').click();
        cy.get('vl-datepicker')
            .shadow()
            .find('.flatpickr-calendar')
            .find('.flatpickr-day:not(.prevMonthDay):not(.nextMonthDay)')
            .contains('21')
            .and('contain.class', 'flatpickr-disabled');
    });

    it('should set min time', () => {
        const minTime = '09:15';
        cy.mount(html`<vl-datepicker disable-mobile-native-input type="time" min-time=${minTime}></vl-datepicker>`);

        cy.get('vl-datepicker').shadow().find('button#toggle-calendar').click();
        cy.get('vl-datepicker')
            .shadow()
            .find('.flatpickr-calendar')
            .find('.numInput.flatpickr-hour')
            .should('have.value', '09');

        cy.get('vl-datepicker')
            .shadow()
            .find('.flatpickr-calendar')
            .find('.numInput.flatpickr-minute')
            .should('have.value', '15');

        cy.get('vl-datepicker')
            .shadow()
            .find('.flatpickr-calendar')
            .find('.numInput.flatpickr-minute + .arrowUp')
            .click();

        cy.get('vl-datepicker')
            .shadow()
            .find('.flatpickr-calendar')
            .find('.numInput.flatpickr-minute')
            .should('have.value', '20');

        cy.get('vl-datepicker')
            .shadow()
            .find('.flatpickr-calendar')
            .find('.numInput.flatpickr-minute + .arrowUp + .arrowDown')
            .click()
            .click()
            .click();

        cy.get('vl-datepicker')
            .shadow()
            .find('.flatpickr-calendar')
            .find('.numInput.flatpickr-minute')
            .should('have.value', '15');
    });
});

describe('vl-datepicker - events', () => {
    // deze test slaagt in Electron/Firefox, maar niet in Chromium browsers gezien verschil in event werking
    it('should dispatch vl-input event on user input', () => {
        cy.mount(html`<vl-datepicker label="date"></vl-datepicker>`);
        cy.injectAxe();
        cy.createStubForEvent('vl-datepicker', 'vl-input');

        shouldOpenCalendar();
        cy.get('vl-datepicker')
            .shadow()
            .find('.flatpickr-calendar')
            .find('.flatpickr-day:not(.prevMonthDay):not(.nextMonthDay)')
            .contains('15')
            .click();
        cy.get('@vl-input')
            .should('have.been.called')
            .its('lastCall.args.0.detail')
            .should('deep.equal', { value: createIsoDateString({ day: 15 }) });
        cy.checkA11y('vl-datepicker');
    });

    // deze test slaagt in Electron/Firefox, maar niet in Chromium browsers gezien verschil in event werking
    it('should dispatch vl-change event and not vl-input event when changing value programmatically', () => {
        const value = createIsoDateString({ day: 21, month: 12, year: 2023 });

        cy.mount(html`<vl-datepicker label="date"></vl-datepicker>`);
        cy.createStubForEvent('vl-datepicker', 'vl-change');
        cy.createStubForEvent('vl-datepicker', 'vl-input');

        cy.get('vl-datepicker').shadow().find('div.flatpickr-calendar');
        cy.get('vl-datepicker').then((datepicker$) => {
            const datepicker = datepicker$[0];
            datepicker.setAttribute('value', value);
        });
        cy.get('vl-datepicker').should('have.value', value);
        cy.get('vl-datepicker').shadow().find('input.vl-input-field').should('have.value', '21.12.2023');

        cy.get('@vl-change')
            .should('have.been.calledTwice')
            .its('secondCall.args.0.detail')
            .should('deep.equal', { value });
        cy.get('@vl-input').should('to.not.have.been.called.at.all');
    });

    // deze test slaagt in Electron/Firefox, maar niet in Chromium browsers gezien verschil in event werking
    it('should dispatch vl-valid event on valid input', () => {
        cy.mount(html`<vl-datepicker required label="date"></vl-datepicker>`);
        cy.injectAxe();
        cy.createStubForEvent('vl-datepicker', 'vl-valid');

        shouldOpenCalendar();
        cy.get('vl-datepicker')
            .shadow()
            .find('.flatpickr-calendar')
            .find('.flatpickr-day:not(.prevMonthDay):not(.nextMonthDay)')
            .contains('15')
            .click();
        cy.get('@vl-valid')
            .should('have.been.calledOnce')
            .its('firstCall.args.0.detail')
            .should('deep.equal', { value: createIsoDateString({ day: 15 }) });
        cy.checkA11y('vl-datepicker');
    });
});

describe('vl-datepicker - form integration', () => {
    it('should reset datepicker with initial value', () => {
        const initialValue = createIsoDateString({ day: 2, month: 12, year: 2021 });

        mountDatepickerInForm({ ...datepickerDefaults, value: initialValue, block: true });
        cy.injectAxe();
        cy.get('form').then((form$) => {
            form$.on('submit', (e) => {
                e.preventDefault();
            });
        });

        cy.get('vl-datepicker').should('have.value', initialValue);
        cy.get('vl-datepicker').shadow().find('input').should('have.value', '02.12.2021');

        const value = createIsoDateString({ day: 21, month: 12, year: 2023 });
        cy.get('vl-datepicker').invoke('attr', 'value', value);
        cy.get('vl-datepicker').should('have.value', value);
        cy.get('vl-datepicker').shadow().find('input.vl-input-field').should('have.value', '21.12.2023');

        cy.get('button[type="reset"]').click();
        cy.get('vl-datepicker').should('have.value', initialValue);
        cy.get('vl-datepicker').shadow().find('input.vl-input-field').should('have.value', '02.12.2021');
        cy.checkA11y('vl-datepicker');
    });

    it('should process required validation', () => {
        mountDatepickerInForm({ ...datepickerDefaults, required: true });
        cy.injectAxe();
        cy.get('form').then((form$) => {
            form$.on('submit', (e) => {
                e.preventDefault();
            });
        });

        cy.get('vl-datepicker').shadow().find('input').should('not.have.class', 'vl-input-field--error');

        cy.get('button[type="submit"]').click();
        cy.get('vl-datepicker').shadow().find('input').should('have.class', 'vl-input-field--error');

        shouldOpenCalendar();
        cy.get('vl-datepicker')
            .shadow()
            .find('.flatpickr-calendar')
            .find('.flatpickr-day:not(.prevMonthDay):not(.nextMonthDay)')
            .contains('15')
            .click();
        cy.get('vl-datepicker').should('have.value', createIsoDateString({ day: 15 }));
        cy.get('vl-datepicker').shadow().find('input').should('have.value', createDateString({ day: 15 }));

        cy.get('button[type="submit"]').click();
        cy.get('vl-datepicker').shadow().find('input').should('not.have.class', 'vl-input-field--error');
        cy.checkA11y('vl-datepicker');
    });

    it('should validate date pattern by default', () => {
        mountDatepickerInForm({ ...datepickerDefaults });
        cy.injectAxe();
        cy.get('form').then((form$) => {
            form$.on('submit', (e) => {
                e.preventDefault();
            });
        });

        cy.get('vl-datepicker').shadow().find('input').should('not.have.class', 'vl-input-field--error');
        cy.get('vl-datepicker').shadow().find('input.vl-input-field').type('151220');
        cy.get('button[type="submit"]').click({ force: true });

        cy.get('vl-form-message[state="valueMissing"]').shadow().find('p').should('have.attr', 'hidden');
        cy.get('vl-form-message[state="patternMismatch"]')
            .should('have.text', 'Gelieve het juiste formaat te gebruiken.')
            .should('have.attr', 'show');

        cy.get('button[type="reset"]').click();

        cy.get('vl-datepicker').shadow().find('input.vl-input-field').type('15122023');
        cy.get('button[type="submit"]').click();
        cy.get('vl-form-message[state="patternMismatch"]').shadow().find('p').should('have.attr', 'hidden');
        cy.checkA11y('vl-datepicker');
    });

    it('should validate alternative date pattern', () => {
        mountDatepickerInForm({ ...datepickerDefaults, format: 'd/m/Y' });
        cy.injectAxe();
        cy.get('form').then((form$) => {
            form$.on('submit', (e) => {
                e.preventDefault();
            });
        });

        cy.get('vl-datepicker').shadow().find('input').should('not.have.class', 'vl-input-field--error');
        cy.get('vl-datepicker').shadow().find('input.vl-input-field').type('1512202');
        cy.get('button[type="submit"]').click({ force: true });

        cy.get('vl-form-message[state="valueMissing"]').should('not.have.attr', 'show');
        cy.get('vl-form-message[state="valueMissing"]').shadow().find('p').should('have.attr', 'hidden');
        cy.get('vl-form-message[state="patternMismatch"]')
            .should('have.text', 'Gelieve het juiste formaat te gebruiken.')
            .should('have.attr', 'show');

        cy.get('button[type="reset"]').click();

        cy.get('vl-datepicker').shadow().find('input.vl-input-field').type('15122023');
        cy.get('button[type="submit"]').click();
        cy.get('vl-form-message[state="patternMismatch"]').should('not.have.attr', 'show');
        cy.checkA11y('vl-datepicker');
    });

    it('should disable automatic mask validation', () => {
        mountDatepickerInForm({ ...datepickerDefaults, disableMaskValidation: true });
        cy.injectAxe();
        cy.get('form').then((form$) => {
            form$.on('submit', (e) => {
                e.preventDefault();
            });
        });

        cy.get('vl-datepicker').shadow().find('input').should('not.have.class', 'vl-input-field--error');
        cy.get('vl-datepicker').shadow().find('input.vl-input-field').type('hello');
        cy.get('vl-datepicker').should('have.value', 'hello');
        cy.get('button[type="submit"]').click({ force: true });

        cy.get('vl-form-message[state="valueMissing"]').shadow().find('p').should('have.attr', 'hidden');
        cy.get('vl-form-message[state="patternMismatch"]').shadow().find('p').should('have.attr', 'hidden');
        cy.checkA11y('vl-datepicker');
    });

    it('should disable automatic mask validation with invalid initial value', () => {
        mountDatepickerInForm({ ...datepickerDefaults, disableMaskValidation: true, value: 'hello' });
        cy.injectAxe();
        cy.get('form').then((form$) => {
            form$.on('submit', (e) => {
                e.preventDefault();
            });
        });

        cy.get('vl-datepicker').shadow().find('input').should('not.have.class', 'vl-input-field--error');
        cy.get('vl-datepicker').should('have.value', 'hello');
        cy.get('button[type="submit"]').click({ force: true });

        cy.get('vl-form-message[state="valueMissing"]').shadow().find('p').should('have.attr', 'hidden');
        cy.get('vl-form-message[state="patternMismatch"]').shadow().find('p').should('have.attr', 'hidden');
        cy.checkA11y('vl-datepicker');
    });

    it('should validate pattern with disabled automatic mask validation', () => {
        mountDatepickerInForm({
            ...datepickerDefaults,
            disableMaskValidation: true,
            pattern: '^(0?[1-9]|[12][0-9]|3[01]).(0?[1-9]|1[012]).([0-9]{4})$',
        });
        cy.injectAxe();
        cy.get('form').then((form$) => {
            form$.on('submit', (e) => {
                e.preventDefault();
            });
        });

        cy.get('vl-datepicker').shadow().find('input').should('not.have.class', 'vl-input-field--error');
        cy.get('vl-datepicker').shadow().find('input.vl-input-field').type('1512202');
        cy.get('button[type="submit"]').click({ force: true });

        cy.get('vl-form-message[state="valueMissing"]').shadow().find('p').should('have.attr', 'hidden');
        cy.get('vl-form-message[state="patternMismatch"]')
            .should('have.text', 'Gelieve het juiste formaat te gebruiken.')
            .should('have.attr', 'show');

        cy.get('button[type="reset"]').click();

        cy.get('vl-datepicker').shadow().find('input.vl-input-field').type('15.12.2023');
        cy.get('button[type="submit"]').click();
        cy.get('vl-form-message[state="patternMismatch"]').shadow().find('p').should('have.attr', 'hidden');
        cy.checkA11y('vl-datepicker');
    });

    it('should validate time pattern by default with mask', () => {
        mountDatepickerInForm({ ...datepickerDefaults, type: 'time' });
        cy.injectAxe();
        cy.get('form').then((form$) => {
            form$.on('submit', (e) => {
                e.preventDefault();
            });
        });

        cy.get('vl-datepicker').shadow().find('input').should('not.have.class', 'vl-input-field--error');

        cy.get('vl-datepicker').shadow().find('input.vl-input-field').type('9');
        cy.get('vl-datepicker').should('have.value', '09:');

        cy.get('button[type="submit"]').click({ force: true });

        cy.get('vl-form-message[state="valueMissing"]').shadow().find('p').should('have.attr', 'hidden');
        cy.get('vl-form-message[state="patternMismatch"]')
            .should('have.text', 'Gelieve het juiste formaat te gebruiken.')
            .should('have.attr', 'show');

        cy.get('button[type="reset"]').click();

        cy.get('vl-datepicker').shadow().find('input.vl-input-field').type('99');
        cy.get('vl-datepicker').should('have.value', '09:09');
        cy.get('button[type="submit"]').click();
        cy.get('vl-form-message[state="patternMismatch"]').shadow().find('p').should('have.attr', 'hidden');
        cy.checkA11y('vl-datepicker');
    });

    it('should validate alternative time pattern with mask', () => {
        mountDatepickerInForm({ ...datepickerDefaults, type: 'time', format: 'H:i:S' });
        cy.injectAxe();
        cy.get('form').then((form$) => {
            form$.on('submit', (e) => {
                e.preventDefault();
            });
        });

        cy.get('vl-datepicker').shadow().find('input').should('not.have.class', 'vl-input-field--error');

        cy.get('vl-datepicker').shadow().find('input.vl-input-field').type('9');
        cy.get('vl-datepicker').should('have.value', '09:');

        cy.get('button[type="submit"]').click({ force: true });

        cy.get('vl-form-message[state="valueMissing"]').shadow().find('p').should('have.attr', 'hidden');
        cy.get('vl-form-message[state="patternMismatch"]')
            .should('have.text', 'Gelieve het juiste formaat te gebruiken.')
            .should('have.attr', 'show');

        cy.get('button[type="reset"]').click();

        cy.get('vl-datepicker').shadow().find('input.vl-input-field').type('999');
        cy.get('vl-datepicker').shadow().find('input.vl-input-field').should('have.value', '09:09:09');
        cy.get('vl-datepicker').should('have.value', '09:09:09');
        cy.get('button[type="submit"]').click();
        cy.get('vl-form-message[state="patternMismatch"]').shadow().find('p').should('have.attr', 'hidden');
        cy.checkA11y('vl-datepicker');
    });

    it('should process disabled validation', () => {
        mountDatepickerInForm({ ...datepickerDefaults, disabled: true });
        cy.injectAxe();
        cy.get('form').then((form$) => {
            form$.on('submit', (e) => {
                e.preventDefault();
            });
        });

        cy.get('vl-datepicker').shadow().find('input').should('have.class', 'vl-input-field--disabled');

        cy.get('button[type="submit"]').click();
        cy.get('vl-datepicker').shadow().find('input').should('have.class', 'vl-input-field--disabled');

        cy.get('vl-datepicker')
            .shadow()
            .find('button#toggle-calendar')
            .should('have.class', 'vl-input-addon--disabled');
        cy.get('vl-datepicker').shadow().find('input').should('have.class', 'vl-input-field--disabled');
        cy.checkA11y('vl-datepicker');
    });

    it('should validate min/max with type "date"', () => {
        const format = 'd.m.Y';
        const [minDate, maxDate] = createDateRange(new Date('2024-04-10'), 2, format);
        mountDatepickerInForm({ ...datepickerDefaults, minDate, maxDate, format, type: 'date' });
        cy.injectAxe();
        cy.get('form').then((form$) => {
            form$.on('submit', (e) => {
                e.preventDefault();
            });
        });

        cy.get('vl-datepicker').shadow().find('input').should('not.have.class', 'vl-input-field--error');

        cy.get('vl-datepicker').shadow().find('input.vl-input-field').type('10.04.2024');
        cy.get('vl-datepicker').should('have.value', '2024-04-10');

        cy.get('button[type="submit"]').click({ force: true });

        cy.get('vl-form-message[state="rangeOverflow"]').shadow().find('p').should('have.attr', 'hidden');
        cy.get('vl-form-message[state="rangeUnderflow"]').shadow().find('p').should('have.attr', 'hidden');

        cy.get('button[type="reset"]').click();

        cy.get('vl-datepicker').shadow().find('input.vl-input-field').type('13.04.2024');
        cy.get('vl-datepicker').should('have.value', '2024-04-13');
        cy.get('button[type="submit"]').click();
        cy.get('vl-form-message[state="rangeOverflow"]').should('have.attr', 'show');
        cy.get('vl-form-message[state="rangeUnderflow"]').shadow().find('p').should('have.attr', 'hidden');

        cy.get('button[type="reset"]').click();
        cy.get('vl-form-message[state="rangeOverflow"]').shadow().find('p').should('have.attr', 'hidden');
        cy.get('vl-form-message[state="rangeUnderflow"]').shadow().find('p').should('have.attr', 'hidden');

        cy.get('vl-datepicker').shadow().find('input.vl-input-field').type('07.04.2024');
        cy.get('vl-datepicker').should('have.value', '2024-04-07');
        cy.get('button[type="submit"]').click();
        cy.get('vl-form-message[state="rangeOverflow"]').shadow().find('p').should('have.attr', 'hidden');
        cy.get('vl-form-message[state="rangeUnderflow"]').should('have.attr', 'show');
        cy.checkA11y('vl-datepicker');
    });

    it('should disable dates outside min/max in calendar', () => {
        const format = 'd.m.Y';
        const [minDate, maxDate] = createDateRange(new Date('2024-04-10'), 2, format);
        mountDatepickerInForm({ ...datepickerDefaults, minDate, maxDate, format, type: 'date', value: '2024-04-10' });

        cy.get('vl-datepicker').shadow().find('button#toggle-calendar').click();
        cy.wait(100);

        // dagen voor min-date zijn uitgeschakeld
        cy.get('vl-datepicker')
            .shadow()
            .find('.flatpickr-day:not(.prevMonthDay):not(.nextMonthDay)')
            .contains('7')
            .should('have.class', 'flatpickr-disabled');

        // dagen na max-date zijn uitgeschakeld
        cy.get('vl-datepicker')
            .shadow()
            .find('.flatpickr-day:not(.prevMonthDay):not(.nextMonthDay)')
            .contains('13')
            .should('have.class', 'flatpickr-disabled');

        // dag binnen range is selecteerbaar
        cy.get('vl-datepicker')
            .shadow()
            .find('.flatpickr-day:not(.prevMonthDay):not(.nextMonthDay)')
            .contains('10')
            .should('not.have.class', 'flatpickr-disabled');
    });

    it('should validate min/max with type "time"', () => {
        mountDatepickerInForm({ ...datepickerDefaults, minTime: '10:00', maxTime: '12:00', type: 'time' });
        cy.injectAxe();
        cy.get('form').then((form$) => {
            form$.on('submit', (e) => {
                e.preventDefault();
            });
        });

        cy.get('vl-datepicker').shadow().find('input').should('not.have.class', 'vl-input-field--error');

        cy.get('vl-datepicker').shadow().find('input.vl-input-field').type('11:00');
        cy.get('vl-datepicker').should('have.value', '11:00');

        cy.get('button[type="submit"]').click({ force: true });

        cy.get('vl-form-message[state="rangeOverflow"]').shadow().find('p').should('have.attr', 'hidden');
        cy.get('vl-form-message[state="rangeUnderflow"]').shadow().find('p').should('have.attr', 'hidden');

        cy.get('button[type="reset"]').click();

        cy.get('vl-datepicker').shadow().find('input.vl-input-field').type('12:30');
        cy.get('vl-datepicker').should('have.value', '12:30');
        cy.get('button[type="submit"]').click();
        cy.get('vl-form-message[state="rangeOverflow"]').should('have.attr', 'show');
        cy.get('vl-form-message[state="rangeUnderflow"]').shadow().find('p').should('have.attr', 'hidden');

        cy.get('button[type="reset"]').click();
        cy.get('vl-form-message[state="rangeOverflow"]').shadow().find('p').should('have.attr', 'hidden');
        cy.get('vl-form-message[state="rangeUnderflow"]').shadow().find('p').should('have.attr', 'hidden');

        cy.get('vl-datepicker').shadow().find('input.vl-input-field').type('9:30');
        cy.get('vl-datepicker').should('have.value', '09:30');
        cy.get('button[type="submit"]').click();
        cy.get('vl-form-message[state="rangeOverflow"]').shadow().find('p').should('have.attr', 'hidden');
        cy.get('vl-form-message[state="rangeUnderflow"]').should('have.attr', 'show');
        cy.checkA11y('vl-datepicker');
    });

    it('should validate min/max with type "range"', () => {
        const format = 'd.m.Y';
        const [minDate, maxDate] = createDateRange(new Date('2024-04-10'), 2, format);
        mountDatepickerInForm({ ...datepickerDefaults, minDate, maxDate, format, type: 'range' });
        cy.injectAxe();
        cy.get('form').then((form$) => {
            form$.on('submit', (e) => {
                e.preventDefault();
            });
        });

        cy.get('vl-datepicker').shadow().find('input').should('not.have.class', 'vl-input-field--error');

        cy.get('vl-datepicker').shadow().find('input.vl-input-field').type('10.04.2024 tot en met 11.04.2024');
        cy.get('vl-datepicker').should('have.value', '2024-04-10/2024-04-11');

        cy.get('button[type="submit"]').click({ force: true });

        cy.get('vl-form-message[state="rangeOverflow"]').shadow().find('p').should('have.attr', 'hidden');
        cy.get('vl-form-message[state="rangeUnderflow"]').shadow().find('p').should('have.attr', 'hidden');

        cy.get('button[type="reset"]').click();

        cy.get('vl-datepicker').shadow().find('input.vl-input-field').type('10.04.2024 tot en met 13.04.2024');
        cy.get('vl-datepicker').should('have.value', '2024-04-10/2024-04-13');
        cy.get('button[type="submit"]').click();
        cy.get('vl-form-message[state="rangeOverflow"]').should('have.attr', 'show');
        cy.get('vl-form-message[state="rangeUnderflow"]').shadow().find('p').should('have.attr', 'hidden');

        cy.get('button[type="reset"]').click();
        cy.get('vl-form-message[state="rangeOverflow"]').shadow().find('p').should('have.attr', 'hidden');
        cy.get('vl-form-message[state="rangeUnderflow"]').shadow().find('p').should('have.attr', 'hidden');

        cy.get('vl-datepicker').shadow().find('input.vl-input-field').type('07.04.2024 tot en met 11.04.2024');
        cy.get('vl-datepicker').should('have.value', '2024-04-07/2024-04-11');
        cy.get('button[type="submit"]').click();
        cy.get('vl-form-message[state="rangeOverflow"]').shadow().find('p').should('have.attr', 'hidden');
        cy.get('vl-form-message[state="rangeUnderflow"]').should('have.attr', 'show');
        cy.checkA11y('vl-datepicker');
    });

    it('should validate min/max with min-date="today" and max-date="today"', () => {
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);

        mountDatepickerInForm({ ...datepickerDefaults, minDate: 'today', maxDate: 'today', format: 'd.m.Y', type: 'date' });
        cy.get('form').then((form$) => {
            form$.on('submit', (e) => {
                e.preventDefault();
            });
        });

        // vandaag wordt geaccepteerd
        cy.get('vl-datepicker').shadow().find('input.vl-input-field').type(createDateString({ date: today }));
        cy.get('button[type="submit"]').click({ force: true });
        cy.get('vl-form-message[state="rangeOverflow"]').shadow().find('p').should('have.attr', 'hidden');
        cy.get('vl-form-message[state="rangeUnderflow"]').shadow().find('p').should('have.attr', 'hidden');

        cy.get('button[type="reset"]').click();

        // gisteren triggert rangeUnderflow
        cy.get('vl-datepicker').shadow().find('input.vl-input-field').type(createDateString({ date: yesterday }));
        cy.get('button[type="submit"]').click();
        cy.get('vl-form-message[state="rangeUnderflow"]').should('have.attr', 'show');
        cy.get('vl-form-message[state="rangeOverflow"]').shadow().find('p').should('have.attr', 'hidden');

        cy.get('button[type="reset"]').click();

        // morgen triggert rangeOverflow
        cy.get('vl-datepicker').shadow().find('input.vl-input-field').type(createDateString({ date: tomorrow }));
        cy.get('button[type="submit"]').click();
        cy.get('vl-form-message[state="rangeOverflow"]').should('have.attr', 'show');
        cy.get('vl-form-message[state="rangeUnderflow"]').shadow().find('p').should('have.attr', 'hidden');
    });

    it('should disable dates outside today in calendar with min-date="today" and max-date="today"', () => {
        const today = new Date();
        const todayDay = today.getDate();

        cy.mount(html`<vl-datepicker min-date="today" max-date="today" label="date"></vl-datepicker>`);

        cy.get('vl-datepicker').shadow().find('button#toggle-calendar').click();
        cy.wait(100);

        // vandaag is selecteerbaar
        cy.get('vl-datepicker')
            .shadow()
            .find('.flatpickr-day:not(.prevMonthDay):not(.nextMonthDay)')
            .contains(new RegExp(`^${todayDay}$`))
            .should('not.have.class', 'flatpickr-disabled');

        // alle andere dagen zijn uitgeschakeld
        cy.get('vl-datepicker')
            .shadow()
            .find('.flatpickr-day:not(.prevMonthDay):not(.nextMonthDay):not(.today)')
            .each(($day) => {
                cy.wrap($day).should('have.class', 'flatpickr-disabled');
            });
    });
});

describe('vl-datepicker - accessibility', () => {
    it('should be accessible', () => {
        cy.mount(html` <vl-datepicker id="date" name="date" label="date"></vl-datepicker> `);
        cy.injectAxe();

        cy.checkA11y('vl-datepicker');
    });

    it('should be accessible in form', () => {
        mountDatepickerInForm({ ...datepickerDefaults });
        cy.injectAxe();

        cy.checkA11y('vl-datepicker');
    });

    it('should be accessible on mobile', () => {
        cy.viewport(320, 480);
        mountDatepickerInForm({ ...datepickerDefaults });
        cy.injectAxe();

        cy.checkA11y('vl-datepicker');
    });

    it('should set aria-invalid when invalid', () => {
        cy.mount(html`
            <form id="test-form">
                <vl-datepicker id="test-datepicker" name="test" label="date" required></vl-datepicker>
                <button type="submit">Submit</button>
            </form>
        `);

        cy.get('button[type="submit"]').click();
        cy.get('vl-datepicker').shadow().find('input').should('have.attr', 'aria-invalid', 'true');
    });

    it('should focus first invalid datepicker on form submit', () => {
        cy.mount(html`
            <form id="test-form">
                <vl-datepicker id="datepicker1" name="date1" label="date1" required></vl-datepicker>
                <vl-datepicker id="datepicker2" name="date2" label="date2" required></vl-datepicker>
                <button type="submit">Submit</button>
            </form>
        `);

        cy.get('button[type="submit"]').click();
        cy.get('vl-datepicker#datepicker1').shadow().find('input').should('have.focus');
    });
});

describe('vl-datepicker - keyboard navigation', () => {
    it('should be focusable', () => {
        cy.mount(html`<vl-datepicker label="date"></vl-datepicker>`);
        cy.injectAxe();

        cy.get('vl-datepicker').shadow().find('input.vl-input-field').first().focus().should('be.focused');
        cy.checkA11y('vl-datepicker');
    });

    it('should focus button after input', () => {
        cy.mount(html`<vl-datepicker label="date"></vl-datepicker>`);
        cy.injectAxe();

        cy.get('vl-datepicker').shadow().find('button#toggle-calendar').focus().should('be.focused');
        cy.checkA11y('vl-datepicker');
    });

    it('should allow keyboard input in date field', () => {
        cy.mount(html`<vl-datepicker label="date"></vl-datepicker>`);
        cy.injectAxe();

        cy.get('vl-datepicker').shadow().find('input.vl-input-field').first().focus().type('15042024');
        cy.get('vl-datepicker').should('have.value', '2024-04-15');
        cy.checkA11y('vl-datepicker');
    });

    it('should close calendar with Escape key', () => {
        cy.mount(html`<vl-datepicker label="date"></vl-datepicker>`);
        cy.injectAxe();

        shouldOpenCalendar();
        // force: true — op WebKit dekt de open kalender het veld af.
        cy.get('vl-datepicker').shadow().find('input.vl-input-field').first().type('{esc}', { force: true });
        cy.wait(100);
        cy.get('vl-datepicker').shadow().find('.flatpickr-calendar').should('not.be.visible');
        cy.checkA11y('vl-datepicker');
    });

    it('should allow keyboard navigation in time picker', () => {
        cy.mount(html`<vl-datepicker type="time" label="time"></vl-datepicker>`);
        cy.injectAxe();

        cy.get('vl-datepicker').shadow().find('input.vl-input-field').first().focus().type('1430');
        cy.get('vl-datepicker').should('have.value', '14:30');
        cy.checkA11y('vl-datepicker');
    });
});

describe('vl-datepicker - form data submission', () => {
    it('should submit form data with correct name and value', () => {
        let formData: FormData | null = null;

        cy.mount(
            html`
                <form
                    id="test-form"
                    @submit=${(e: Event) => {
                        e.preventDefault();
                        formData = new FormData(e.target as HTMLFormElement);
                    }}
                >
                    <vl-datepicker name="birthdate" value="2024-04-15" label="date"></vl-datepicker>
                    <button type="submit">Submit</button>
                </form>
            `
        );
        cy.injectAxe();
        cy.checkA11y('vl-datepicker');
        cy.then(() => {
            cy.get('button[type="submit"]')
                .click()
                .then(() => {
                    expect(formData).to.not.be.null;
                    expect(formData?.get('birthdate')).to.equal('2024-04-15');
                });
        });
    });

    it('should not include empty datepicker in form data', () => {
        let formData: FormData | null = null;

        cy.mount(
            html`
                <form
                    id="test-form"
                    @submit=${(e: Event) => {
                        e.preventDefault();
                        formData = new FormData(e.target as HTMLFormElement);
                    }}
                >
                    <vl-datepicker name="birthdate" label="date"></vl-datepicker>
                    <button type="submit">Submit</button>
                </form>
            `
        );
        cy.injectAxe();
        cy.checkA11y('vl-datepicker');
        cy.then(() => {
            cy.get('button[type="submit"]')
                .click()
                .then(() => {
                    expect(formData).to.not.be.null;
                    expect(formData?.get('birthdate')).to.equal('');
                });
        });
    });

    it('should handle multiple datepickers in one form', () => {
        let formData: FormData | null = null;

        cy.mount(
            html`
                <form
                    id="test-form"
                    @submit=${(e: Event) => {
                        e.preventDefault();
                        formData = new FormData(e.target as HTMLFormElement);
                    }}
                >
                    <vl-datepicker name="startdate" value="2024-04-15" label="start"></vl-datepicker>
                    <vl-datepicker name="enddate" value="2024-04-20" label="end"></vl-datepicker>
                    <vl-datepicker name="optionaldate" label="optional"></vl-datepicker>
                    <button type="submit">Submit</button>
                </form>
            `
        );
        cy.injectAxe();
        cy.checkA11y('vl-datepicker');
        cy.then(() => {
            cy.get('button[type="submit"]')
                .click()
                .then(() => {
                    expect(formData).to.not.be.null;
                    expect(formData?.get('startdate')).to.equal('2024-04-15');
                    expect(formData?.get('enddate')).to.equal('2024-04-20');
                    expect(formData?.get('optionaldate')).to.equal('');
                });
        });
    });

    it('should submit time format correctly', () => {
        let formData: FormData | null = null;

        cy.mount(
            html`
                <form
                    id="test-form"
                    @submit=${(e: Event) => {
                        e.preventDefault();
                        formData = new FormData(e.target as HTMLFormElement);
                    }}
                >
                    <vl-datepicker name="time" type="time" value="14:30" label="time"></vl-datepicker>
                    <button type="submit">Submit</button>
                </form>
            `
        );
        cy.injectAxe();
        cy.checkA11y('vl-datepicker');
        cy.then(() => {
            cy.get('button[type="submit"]')
                .click()
                .then(() => {
                    expect(formData).to.not.be.null;
                    expect(formData?.get('time')).to.equal('14:30');
                });
        });
    });

    it('should submit range format correctly', () => {
        let formData: FormData | null = null;

        cy.mount(
            html`
                <form
                    id="test-form"
                    @submit=${(e: Event) => {
                        e.preventDefault();
                        formData = new FormData(e.target as HTMLFormElement);
                    }}
                >
                    <vl-datepicker
                        name="daterange"
                        type="range"
                        value="2024-04-15/2024-04-20"
                        label="range"
                    ></vl-datepicker>
                    <button type="submit">Submit</button>
                </form>
            `
        );
        cy.injectAxe();
        cy.checkA11y('vl-datepicker');
        cy.then(() => {
            cy.get('button[type="submit"]')
                .click()
                .then(() => {
                    expect(formData).to.not.be.null;
                    expect(formData?.get('daterange')).to.equal('2024-04-15/2024-04-20');
                });
        });
    });
});

describe('vl-datepicker - edge cases', () => {
    beforeEach(() => {
        cy.viewport(1200, 800);
    });

    it('should handle invalid date format gracefully', () => {
        cy.mount(html`<vl-datepicker label="date"></vl-datepicker>`);
        cy.injectAxe();

        cy.get('vl-datepicker').shadow().find('input.vl-input-field').type('32132024');
        // Component corrects invalid date to valid date or keeps input value
        cy.get('vl-datepicker').should('exist');
        cy.get('vl-datepicker').shadow().find('input.vl-input-field').should('have.value', '31.12.2024');
        cy.checkA11y('vl-datepicker');
    });

    it('should handle leap year date (February 29)', () => {
        cy.mount(html`<vl-datepicker value="2024-02-29" label="date"></vl-datepicker>`);
        cy.injectAxe();

        cy.get('vl-datepicker').shadow().find('input.vl-input-field').should('have.value', '29.02.2024');
        cy.get('vl-datepicker').should('have.value', '2024-02-29');
        cy.checkA11y('vl-datepicker');
    });

    it('should handle non-leap year February 29 gracefully', () => {
        cy.mount(html`<vl-datepicker label="date"></vl-datepicker>`);
        cy.injectAxe();

        cy.get('vl-datepicker').shadow().find('input.vl-input-field').type('29022023');
        // Component corrects invalid leap year date to last valid day of February
        cy.get('vl-datepicker').should('have.value', '2023-02-28');
        cy.get('vl-datepicker').shadow().find('input.vl-input-field').should('have.value', '28.02.2023');
        cy.checkA11y('vl-datepicker');
    });

    it('should set placeholder attribute', () => {
        cy.mount(html`<vl-datepicker placeholder="DD.MM.YYYY" label="date"></vl-datepicker>`);
        cy.injectAxe();

        cy.get('vl-datepicker').should('have.attr', 'placeholder', 'DD.MM.YYYY');
        cy.get('vl-datepicker').shadow().find('input').should('have.attr', 'placeholder', 'DD.MM.YYYY');
        cy.checkA11y('vl-datepicker');
    });

    it('should set autocomplete attribute', () => {
        cy.mount(html`<vl-datepicker autocomplete="bday" label="date"></vl-datepicker>`);
        cy.injectAxe();

        cy.get('vl-datepicker').should('have.attr', 'autocomplete', 'bday');
        cy.get('vl-datepicker').shadow().find('input').should('have.attr', 'autocomplete', 'bday');
        cy.checkA11y('vl-datepicker');
    });

    it('should handle year boundaries (December to January)', () => {
        cy.mount(html`<vl-datepicker value="2023-12-31" label="date"></vl-datepicker>`);
        cy.injectAxe();

        cy.get('vl-datepicker').shadow().find('input.vl-input-field').should('have.value', '31.12.2023');

        shouldOpenCalendar();
        cy.wait(100);
        cy.get('vl-datepicker').shadow().find('.flatpickr-calendar').matchImageSnapshot('datepicker-calendar-december', calendarSnapshotOptions);

        cy.get('vl-datepicker')
            .shadow()
            .find('.flatpickr-calendar')
            .find('.flatpickr-next-month')
            .click();
        cy.wait(100);
        cy.get('vl-datepicker').shadow().find('.flatpickr-calendar').matchImageSnapshot('datepicker-calendar-january-next-year', calendarSnapshotOptions);

        cy.get('vl-datepicker')
            .shadow()
            .find('.flatpickr-calendar')
            .find('.flatpickr-day:not(.prevMonthDay):not(.nextMonthDay)')
            .contains('1')
            .click();

        cy.get('vl-datepicker').should('have.value', '2024-01-01');
        cy.checkA11y('vl-datepicker');
    });

    it('should handle empty string value', () => {
        cy.mount(html`<vl-datepicker value="" label="date"></vl-datepicker>`);
        cy.injectAxe();

        cy.get('vl-datepicker').shadow().find('input').should('have.value', '');
        cy.get('vl-datepicker').should('not.have.value');
        cy.checkA11y('vl-datepicker');
    });

    it('should handle very long date ranges', () => {
        cy.mount(html`<vl-datepicker type="range" value="2024-01-01/2024-12-31" label="range"></vl-datepicker>`);
        cy.injectAxe();

        cy.get('vl-datepicker')
            .shadow()
            .find('input.vl-input-field')
            .should('have.value', '01.01.2024 tot en met 31.12.2024');
        cy.get('vl-datepicker').should('have.value', '2024-01-01/2024-12-31');
        cy.checkA11y('vl-datepicker');
    });
});

describe('vl-datepicker - interaction', () => {
    beforeEach(() => {
        cy.viewport(1200, 800);
    });

    it('should prevent selecting disabled dates', () => {
        const maxDate = createDateString({ day: 20 });
        cy.mount(html`<vl-datepicker max-date=${maxDate} label="date"></vl-datepicker>`);

        shouldOpenCalendar();
        cy.get('vl-datepicker')
            .shadow()
            .find('.flatpickr-calendar')
            .find('.flatpickr-day:not(.prevMonthDay):not(.nextMonthDay)')
            .contains('21')
            .click({ force: true });

        cy.get('vl-datepicker').should('not.have.value');
    });

    it('should update button aria-expanded when calendar opens and closes', () => {
        cy.mount(html`<vl-datepicker label="date"></vl-datepicker>`);
        cy.injectAxe();

        shouldOpenCalendar();
        cy.get('vl-datepicker').shadow().find('button#toggle-calendar').should('have.attr', 'aria-expanded', 'true');

        // force: true — op WebKit dekt de open kalender de toggle-button af.
        cy.get('vl-datepicker').shadow().find('button#toggle-calendar').click({ force: true });
        cy.get('vl-datepicker').shadow().find('button#toggle-calendar').should('have.attr', 'aria-expanded', 'false');
        cy.checkA11y('vl-datepicker');
    });

    it('should toggle calendar on button click', () => {
        cy.mount(html`<vl-datepicker label="date"></vl-datepicker>`);
        cy.injectAxe();

        cy.get('vl-datepicker').shadow().find('.flatpickr-calendar').should('not.be.visible');

        shouldOpenCalendar();
        cy.get('vl-datepicker').shadow().find('.flatpickr-calendar').should('be.visible');

        // force: true — op WebKit dekt de open kalender de toggle-button af.
        cy.get('vl-datepicker').shadow().find('button#toggle-calendar').click({ force: true });
        cy.get('vl-datepicker').shadow().find('.flatpickr-calendar').should('not.be.visible');
        cy.checkA11y('vl-datepicker');
    });

    it('should display correct icon for date type', () => {
        cy.mount(html`<vl-datepicker type="date" label="date"></vl-datepicker>`);
        cy.injectAxe();

        cy.get('vl-datepicker').shadow().find('button .vl-icon--calendar').should('exist');
        cy.checkA11y('vl-datepicker');
    });

    it('should display correct icon for time type', () => {
        cy.mount(html`<vl-datepicker type="time" label="time"></vl-datepicker>`);
        cy.injectAxe();

        cy.get('vl-datepicker').shadow().find('button .vl-icon--clock').should('exist');
        cy.checkA11y('vl-datepicker');
    });

    it('should clear selection when input is cleared manually', () => {
        cy.mount(html`<vl-datepicker value="2024-04-15" label="date"></vl-datepicker>`);
        cy.injectAxe();

        cy.get('vl-datepicker').should('have.value', '2024-04-15');

        cy.get('vl-datepicker').shadow().find('input.vl-input-field').clear();
        cy.get('vl-datepicker').should('not.have.value');
        cy.checkA11y('vl-datepicker');
    });

    it('should maintain calendar state across multiple interactions', () => {
        cy.mount(html`<vl-datepicker value="2024-04-15" label="date"></vl-datepicker>`);

        shouldOpenCalendar();
        cy.wait(100);
        cy.get('vl-datepicker').shadow().find('.flatpickr-calendar').matchImageSnapshot('datepicker-calendar-with-selected-date', calendarSnapshotOptions);
        cy.get('vl-datepicker')
            .shadow()
            .find('.flatpickr-calendar')
            .find('.flatpickr-day.selected')
            .should('contain.text', '15');

        // force: true — op WebKit dekt de geopende kalender de toggle-button af.
        cy.get('vl-datepicker').shadow().find('button#toggle-calendar').click({ force: true });
        shouldOpenCalendar();
        cy.get('vl-datepicker')
            .shadow()
            .find('.flatpickr-calendar')
            .find('.flatpickr-day.selected')
            .should('contain.text', '15');
    });
});

describe('vl-datepicker - mobile UA rendering', () => {
    let originalUserAgent: string;

    before(() => {
        cy.window().then((win) => {
            originalUserAgent = win.navigator.userAgent;
        });
    });

    afterEach(() => {
        cy.window().then((win) => {
            Object.defineProperty(win.navigator, 'userAgent', {
                get: () => originalUserAgent,
                configurable: true,
            });
        });
    });

    it('should render the styled input + calendar button on mobile UA', () => {
        cy.window().then((win) => {
            Object.defineProperty(win.navigator, 'userAgent', {
                get: () => 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15',
                configurable: true,
            });
        });

        cy.mount(html`<vl-datepicker label="date"></vl-datepicker>`);

        cy.get('vl-datepicker').shadow().find('input.vl-input-field').should('exist').and('be.visible');
        cy.get('vl-datepicker').shadow().find('button#toggle-calendar').should('exist').and('be.visible');
        cy.get('vl-datepicker').shadow().find('input[type="date"]').should('not.exist');
    });
});

describe('vl-datepicker - mobile', () => {
    beforeEach(() => {
        cy.viewport(320, 480);
    });

    it('should mount', () => {
        cy.mount(html`<vl-datepicker label="date"></vl-datepicker>`);
        cy.injectAxe();

        cy.get('vl-datepicker').shadow().find('input');
        cy.checkA11y('vl-datepicker');
    });

    it('should be accessible', () => {
        cy.mount(html` <vl-datepicker id="date" name="date" label="date"></vl-datepicker> `);
        cy.injectAxe();

        cy.checkA11y('vl-datepicker');
    });

    it('should open the datepicker on button click', () => {
        cy.mount(html`<vl-datepicker label="date"></vl-datepicker>`);

        shouldOpenCalendar();
    });

    it('should set initial date', () => {
        const date = '2021-11-01';
        cy.mount(html`<vl-datepicker value=${date} label="date"></vl-datepicker>`);
        cy.injectAxe();

        cy.get('vl-datepicker').shadow().find('input.vl-input-field').should('have.value', '01.11.2021');
        cy.get('vl-datepicker').should('have.value', '2021-11-01');
        cy.checkA11y('vl-datepicker');
    });
});

describe('vl-datepicker - blur-validation', () => {
    it('should show error on blur after focus, even without input', () => {
        cy.mount(html`
            <form>
                <vl-datepicker id="dp" name="dp" required blur-validation></vl-datepicker>
                <vl-form-message for="dp" state="valueMissing">Gelieve een datum in te vullen.</vl-form-message>
            </form>
        `);
        cy.get('vl-datepicker').shadow().find('input.vl-input-field').focus().blur();
        cy.get('vl-form-message[state="valueMissing"]').should('have.attr', 'show');
    });

    // Note: flatpickr filters invalid chars before they reach validity, so deeper
    // typed-input blur-validation tests are not reliable. The focus-then-blur test
    // above covers the core path; submit flow has its own existing coverage.
});
