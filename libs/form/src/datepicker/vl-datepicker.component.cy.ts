import { registerWebComponents } from '@domg-wc/common';
import { vlGridStyles } from '@domg-wc/styles';
import { html, nothing } from 'lit';
import { VlErrorMessageComponent } from '../error-message';
import { getErrorMessageTextPart } from '../error-message/vl-error-message.component.cy';
import { VlDatepickerComponent } from './vl-datepicker.component';
import { datepickerDefaults } from './vl-datepicker.defaults';

registerWebComponents([VlDatepickerComponent, VlErrorMessageComponent]);

describe('component - vl-datepicker', () => {
    it('should mount', () => {
        cy.mount(html`<vl-datepicker></vl-datepicker>`);

        cy.get('vl-datepicker').shadow();
    });

    it('should be accessible', () => {
        cy.mount(html` <vl-datepicker id="date" name="date" label="date"></vl-datepicker> `);
        cy.injectAxe();

        cy.checkA11y('vl-datepicker');
    });

    it('should open the datepicker on button click', () => {
        cy.mount(html`<vl-datepicker></vl-datepicker>`);

        cy.get('vl-datepicker').shadow().find('button#toggle-calendar').click();
        cy.get('vl-datepicker').shadow().find('.flatpickr-calendar').should('be.visible');
    });

    it('should set id', () => {
        cy.mount(html`<vl-datepicker id="test-id"></vl-datepicker>`);

        cy.get('vl-datepicker').should('have.id', 'test-id');
        cy.get('vl-datepicker').shadow().find('input').should('have.id', 'test-id');
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

    it('should set block', () => {
        cy.mount(html`<vl-datepicker block label="geboortedatum"></vl-datepicker>`);
        cy.injectAxe();

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
        cy.mount(html`<vl-datepicker disabled label="geboortedatum"></vl-datepicker>`);
        cy.injectAxe();

        cy.get('vl-datepicker').should('have.attr', 'disabled');
        cy.get('vl-datepicker').should('be.disabled');
        cy.get('vl-datepicker').shadow().find('input').should('have.class', 'vl-input-field--disabled');
        cy.get('vl-datepicker').shadow().find('input').should('be.disabled');
        cy.checkA11y('vl-datepicker');
    });

    it('should set readonly', () => {
        cy.mount(html`<vl-datepicker readonly label="geboortedatum"></vl-datepicker>`);
        cy.injectAxe();

        cy.get('vl-datepicker').should('have.attr', 'readonly');
        cy.get('vl-datepicker').shadow().find('input').should('have.attr', 'readonly');
        cy.get('vl-datepicker').shadow().find('button').should('have.attr', 'disabled');

        cy.checkA11y('vl-datepicker');
    });

    it('should set error', () => {
        cy.mount(html`<vl-datepicker error label="geboortedatum"></vl-datepicker>`);
        cy.injectAxe();

        cy.get('vl-datepicker').should('have.attr', 'error');
        cy.get('vl-datepicker').shadow().find('input').should('have.class', 'vl-input-field--error');
        cy.get('vl-datepicker').shadow().find('input').should('have.attr', 'error');
        cy.checkA11y('vl-datepicker');
    });

    it('should set success', () => {
        cy.mount(html`<vl-datepicker success label="geboortedatum"></vl-datepicker>`);
        cy.injectAxe();

        cy.get('vl-datepicker').should('have.attr', 'success');
        cy.get('vl-datepicker').shadow().find('input').should('have.class', 'vl-input-field--success');
        cy.checkA11y('vl-datepicker');
    });

    it('should set date in format', () => {
        const format = 'd-m-Y';
        cy.mount(html`<vl-datepicker format=${format}></vl-datepicker>`);

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
        cy.mount(html`<vl-datepicker value=${date} label="date"></vl-datepicker>`);
        cy.injectAxe();

        cy.get('vl-datepicker').shadow().find('input.vl-input-field').should('have.value', '01.11.2021');
        cy.get('vl-datepicker').should('have.value', '2021-11-01');
        cy.checkA11y('vl-datepicker');
    });

    it('should set initial time', () => {
        const value = '09:06';
        cy.mount(html`<vl-datepicker value=${value} type="time" label="time"></vl-datepicker>`);
        cy.injectAxe();

        cy.get('vl-datepicker').shadow().find('input.vl-input-field').should('have.value', '09:06');
        cy.get('vl-datepicker').should('have.value', '09:06');
        cy.checkA11y('vl-datepicker');
    });

    it('should set initial date-time', () => {
        const date = '2024-04-17T09:06:35';
        cy.mount(html`<vl-datepicker value=${date} type="date-time" label="date-time"></vl-datepicker>`);
        cy.injectAxe();

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

    it("should set today's date", () => {
        cy.mount(html`<vl-datepicker value="today" label="startdatum"></vl-datepicker>`);
        cy.injectAxe();

        cy.get('vl-datepicker').shadow().find('input.vl-input-field').should('have.value', createDateString({}));
        cy.get('vl-datepicker').should('have.value', createIsoDateString({}));
        cy.checkA11y('vl-datepicker');
    });

    it('should set min date', () => {
        const minDate = createDateString({ day: 15 });
        cy.mount(html`<vl-datepicker min-date=${minDate}></vl-datepicker>`);

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
        cy.mount(html`<vl-datepicker max-date=${maxDate}></vl-datepicker>`);

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
        cy.mount(html`<vl-datepicker type="time" min-time=${minTime}></vl-datepicker>`);

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

    it('should set max time', () => {
        const maxTime = '16:45';
        cy.mount(html`<vl-datepicker type="time" max-time=${maxTime}></vl-datepicker>`);

        cy.get('vl-datepicker').shadow().find('button#toggle-calendar').click();

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
    });

    it('should set range', () => {
        cy.mount(html`<vl-datepicker type="range"></vl-datepicker>`);
        cy.injectAxe();

        const startDate = createDateString({ day: 15 });
        const endDate = createDateString({ day: 25 });

        cy.get('vl-datepicker').shadow().find('button#toggle-calendar').click();
        cy.get('vl-datepicker')
            .shadow()
            .find('.flatpickr-calendar')
            .find('.flatpickr-day:not(.prevMonthDay):not(.nextMonthDay)')
            .contains('15')
            .click();
        cy.get('vl-datepicker')
            .shadow()
            .find('.flatpickr-calendar')
            .find('.flatpickr-day:not(.prevMonthDay):not(.nextMonthDay)')
            .contains('25')
            .click();

        cy.get('vl-datepicker')
            .shadow()
            .find('input.vl-input-field')
            .should('have.value', `${startDate} tot en met ${endDate}`);

        cy.get('vl-datepicker').should(
            'have.value',
            `${createIsoDateString({ day: 15 })}/${createIsoDateString({ day: 25 })}`
        );
    });

    it('should set range by manual input', () => {
        cy.mount(html`<vl-datepicker type="range"></vl-datepicker>`);
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
    });

    // deze test slaagt in Electron/Firefox, maar niet in Chromium browsers gezien verschil in event werking
    it('should dispatch vl-input event on user input', () => {
        cy.mount(html`<vl-datepicker></vl-datepicker>`);
        cy.createStubForEvent('vl-datepicker', 'vl-input');

        cy.get('vl-datepicker').shadow().find('button#toggle-calendar').click();
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
    });

    // deze test slaagt in Electron/Firefox, maar niet in Chromium browsers gezien verschil in event werking
    it('should dispatch vl-change event and not vl-input event on when changing value programmatically', () => {
        const value = createIsoDateString({ day: 21, month: 12, year: 2023 });

        cy.mount(html`<vl-datepicker></vl-datepicker>`);
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
        cy.mount(html`<vl-datepicker required></vl-datepicker>`);
        cy.createStubForEvent('vl-datepicker', 'vl-valid');

        cy.get('vl-datepicker').shadow().find('button#toggle-calendar').click();
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
    });

    it('should open the calendar above when there is not enough space below', () => {
        cy.mount(
            html`
                <div style="margin-top: calc(100vh - 50px); margin-left: calc(100vw - 250px)">
                    <vl-datepicker></vl-datepicker>
                </div>
            `
        );
        cy.get('vl-datepicker').shadow().find('button#toggle-calendar').click();

        cy.get('vl-datepicker')
            .shadow()
            .find('.flatpickr-calendar')
            .should('not.have.class', 'static')
            // 'style' wordt toegevoegd bij het automatisch positioneren
            .should('have.attr', 'style');

        cy.get('vl-datepicker')
            .shadow()
            .find('.flatpickr-calendar')
            .invoke('attr', 'style')
            .should('contain', 'top')
            .should('contain', 'left')
            .should('contain', 'right');
    });

    it('should open the calendar below the input when static is true', () => {
        cy.mount(
            html`
                <div style="margin-top: calc(100vh - 50px); margin-left: calc(100vw - 250px)">
                    <vl-datepicker static></vl-datepicker>
                </div>
            `
        );
        cy.get('vl-datepicker').shadow().find('button#toggle-calendar').click();

        cy.get('vl-datepicker')
            .shadow()
            .find('.flatpickr-calendar')
            .should('have.class', 'static')
            // 'style' wordt toegevoegd bij het automatisch positioneren
            .should('not.have.attr', 'style');
    });

    // TODO: lukt lokaal of op bamboo, maar niet op beide
    //  dit type test gaan we niet meer doen, foutgevoelig en tijdsintensief
    //  we gaan ook niet testen of pixels in een bepaalde range vallen
    //  wat mag is (eerder functioneel) testen hoe 'iets' gepositioneerd wordt tov 'iets' anders - bv. links ervan of erboven
    it.skip('should pass the position property to Flatpickr', () => {
        cy.viewport(1920, 1080);

        cy.mount(html`<vl-datepicker position="below left"></vl-datepicker>`);

        cy.get('vl-datepicker').shadow().find('button#toggle-calendar').click();
        cy.get('vl-datepicker')
            .shadow()
            .find('.flatpickr-calendar')
            .shouldHaveComputedStyle({ style: 'top', value: '37px' })
            .shouldHaveComputedStyle({ style: 'left', value: '193px' });
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

describe('component - vl-datepicker - native input on mobile', () => {
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
        cy.get('vl-datepicker').shadow().find('.flatpickr-calendar').should('be.visible');
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

    it('should set max time', () => {
        const maxTime = '16:45';
        cy.mount(html`<vl-datepicker disable-mobile-native-input type="time" max-time=${maxTime}></vl-datepicker>`);

        cy.get('vl-datepicker').shadow().find('button#toggle-calendar').click();

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
    });

    it('should set range', () => {
        cy.mount(html`<vl-datepicker disable-mobile-native-input type="range"></vl-datepicker>`);
        cy.injectAxe();

        const startDate = createDateString({ day: 15 });
        const endDate = createDateString({ day: 25 });

        cy.get('vl-datepicker').shadow().find('button#toggle-calendar').click();
        cy.get('vl-datepicker')
            .shadow()
            .find('.flatpickr-calendar')
            .find('.flatpickr-day:not(.prevMonthDay):not(.nextMonthDay)')
            .contains('15')
            .click();
        cy.get('vl-datepicker')
            .shadow()
            .find('.flatpickr-calendar')
            .find('.flatpickr-day:not(.prevMonthDay):not(.nextMonthDay)')
            .contains('25')
            .click();

        cy.get('vl-datepicker')
            .shadow()
            .find('input.vl-input-field')
            .should('have.value', `${startDate} tot en met ${endDate}`);

        cy.get('vl-datepicker').should(
            'have.value',
            `${createIsoDateString({ day: 15 })}/${createIsoDateString({ day: 25 })}`
        );
    });

    it('should set range by manual input', () => {
        cy.mount(html`<vl-datepicker disable-mobile-native-input type="range"></vl-datepicker>`);
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
    });

    // deze test slaagt in Electron/Firefox, maar niet in Chromium browsers gezien verschil in event werking
    it('should dispatch vl-input event on user input', () => {
        cy.mount(html`<vl-datepicker disable-mobile-native-input></vl-datepicker>`);
        cy.createStubForEvent('vl-datepicker', 'vl-input');

        cy.get('vl-datepicker').shadow().find('button#toggle-calendar').click();
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
    });

    // deze test slaagt in Electron/Firefox, maar niet in Chromium browsers gezien verschil in event werking
    it('should dispatch vl-change event and not vl-input event on when changing value programmatically', () => {
        const value = createIsoDateString({ day: 21, month: 12, year: 2023 });

        cy.mount(html`<vl-datepicker disable-mobile-native-input></vl-datepicker>`);
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
        cy.mount(html`<vl-datepicker disable-mobile-native-input required></vl-datepicker>`);
        cy.createStubForEvent('vl-datepicker', 'vl-valid');

        cy.get('vl-datepicker').shadow().find('button#toggle-calendar').click();
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
    });
});

describe('component - vl-datepicker - in form', () => {
    it('should reset datepicker with initial value', () => {
        const initialValue = createIsoDateString({ day: 2, month: 12, year: 2021 });

        mountDatepickerInForm({ ...datepickerDefaults, value: initialValue, block: true });
        cy.get('form').then((form$) => {
            form$.on('submit', (e) => {
                e.preventDefault();
            });
        });
        cy.injectAxe();

        cy.get('vl-datepicker').shadow();
        cy.get('vl-datepicker').should('have.value', initialValue);
        cy.get('vl-datepicker').shadow().find('input').should('have.value', '02.12.2021');
        cy.checkA11y('vl-datepicker');

        const value = createIsoDateString({ day: 21, month: 12, year: 2023 });
        cy.get('vl-datepicker').invoke('attr', 'value', value);
        cy.get('vl-datepicker').should('have.value', value);
        cy.get('vl-datepicker').shadow().find('input.vl-input-field').should('have.value', '21.12.2023');

        cy.get('button[type="reset"]').click();
        cy.get('vl-datepicker').should('have.value', initialValue);
        cy.get('vl-datepicker').shadow().find('input.vl-input-field').should('have.value', '02.12.2021');
        cy.checkA11y('vl-datepicker');
    });

    it('should set empty value', () => {
        const initialValue = createIsoDateString({ day: 2, month: 12, year: 2021 });

        mountDatepickerInForm({ ...datepickerDefaults, value: initialValue, block: true });
        cy.get('form').then((form$) => {
            form$.on('submit', (e) => {
                e.preventDefault();
            });
        });
        cy.injectAxe();

        cy.get('vl-datepicker').shadow();
        cy.get('vl-datepicker').should('have.value', initialValue);
        cy.get('vl-datepicker').shadow().find('input').should('have.value', '02.12.2021');
        cy.checkA11y('vl-datepicker');

        cy.get('vl-datepicker').invoke('attr', 'value', '');
        cy.get('vl-datepicker').should('not.have.value');
        cy.get('vl-datepicker').shadow().find('input.vl-input-field').should('have.value', '');
        cy.checkA11y('vl-datepicker');

        cy.get('vl-datepicker').invoke('attr', 'value', initialValue);
        cy.get('vl-datepicker').should('have.value', initialValue);
        cy.get('vl-datepicker').shadow().find('input').should('have.value', '02.12.2021');
        cy.checkA11y('vl-datepicker');

        cy.get('vl-datepicker').invoke('attr', 'value', '');
        cy.get('vl-datepicker').should('not.have.value');
        cy.get('vl-datepicker').shadow().find('input.vl-input-field').should('have.value', '');
        cy.checkA11y('vl-datepicker');
    });

    it('should process required validation', () => {
        mountDatepickerInForm({ ...datepickerDefaults, required: true });
        cy.get('form').then((form$) => {
            form$.on('submit', (e) => {
                e.preventDefault();
            });
        });
        cy.injectAxe();

        cy.get('vl-datepicker').shadow().find('input').should('not.have.class', 'vl-input-field--error');

        cy.get('button[type="submit"]').click();
        cy.get('vl-datepicker').shadow().find('input').should('have.class', 'vl-input-field--error');
        cy.checkA11y('vl-datepicker');

        cy.get('vl-datepicker').shadow().find('button#toggle-calendar').click();
        cy.get('vl-datepicker')
            .shadow()
            .find('.flatpickr-calendar')
            .find('.flatpickr-day:not(.prevMonthDay):not(.nextMonthDay)')
            .contains('15')
            .click();
        cy.get('vl-datepicker').should('have.value', createIsoDateString({ day: 15 }));
        cy.get('vl-datepicker')
            .shadow()
            .find('input')
            .should('have.value', createDateString({ day: 15 }));

        cy.get('button[type="submit"]').click();
        cy.get('vl-datepicker').shadow().find('input').should('not.have.class', 'vl-input-field--error');
        cy.checkA11y('vl-datepicker');
    });

    it('should validate date pattern by default', () => {
        mountDatepickerInForm({ ...datepickerDefaults });
        cy.get('form').then((form$) => {
            form$.on('submit', (e) => {
                e.preventDefault();
            });
        });
        cy.injectAxe();

        cy.get('vl-datepicker').shadow().find('input').should('not.have.class', 'vl-input-field--error');
        cy.get('vl-datepicker').shadow().find('input.vl-input-field').type('151220');
        cy.get('button[type="submit"]').click({ force: true });

        getErrorMessageTextPart(cy.get('vl-error-message[state="valueMissing"]')).should('not.be.visible');
        getErrorMessageTextPart(cy.get('vl-error-message[state="patternMismatch"]')).should('be.visible');
        cy.get('vl-error-message[state="patternMismatch"]').should(
            'have.text',
            'Gelieve het juiste formaat te gebruiken.'
        );
        cy.checkA11y('vl-datepicker');

        cy.get('button[type="reset"]').click();

        cy.get('vl-datepicker').shadow().find('input.vl-input-field').type('15122023');
        cy.get('button[type="submit"]').click();
        getErrorMessageTextPart(cy.get('vl-error-message[state="patternMismatch"]')).should('not.be.visible');
        cy.checkA11y('vl-datepicker');
    });

    it('should validate alternative date pattern', () => {
        mountDatepickerInForm({ ...datepickerDefaults, format: 'd/m/Y' });
        cy.get('form').then((form$) => {
            form$.on('submit', (e) => {
                e.preventDefault();
            });
        });
        cy.injectAxe();

        cy.get('vl-datepicker').shadow().find('input').should('not.have.class', 'vl-input-field--error');
        cy.get('vl-datepicker').shadow().find('input.vl-input-field').type('1512202');
        cy.get('button[type="submit"]').click({ force: true });

        getErrorMessageTextPart(cy.get('vl-error-message[state="valueMissing"]')).should('not.be.visible');
        getErrorMessageTextPart(cy.get('vl-error-message[state="patternMismatch"]')).should('be.visible');
        cy.get('vl-error-message[state="patternMismatch"]').should(
            'have.text',
            'Gelieve het juiste formaat te gebruiken.'
        );
        cy.checkA11y('vl-datepicker');

        cy.get('button[type="reset"]').click();

        cy.get('vl-datepicker').shadow().find('input.vl-input-field').type('15122023');
        cy.get('button[type="submit"]').click();
        getErrorMessageTextPart(cy.get('vl-error-message[state="patternMismatch"]')).should('not.be.visible');
        cy.checkA11y('vl-datepicker');
    });

    it('should disable automatic mask validation', () => {
        mountDatepickerInForm({ ...datepickerDefaults, disableMaskValidation: true });
        cy.get('form').then((form$) => {
            form$.on('submit', (e) => {
                e.preventDefault();
            });
        });
        cy.injectAxe();

        cy.get('vl-datepicker').shadow().find('input').should('not.have.class', 'vl-input-field--error');
        cy.get('vl-datepicker').shadow().find('input.vl-input-field').type('hello');
        cy.get('vl-datepicker').should('have.value', 'hello');
        cy.get('button[type="submit"]').click({ force: true });

        getErrorMessageTextPart(cy.get('vl-error-message[state="valueMissing"]')).should('not.be.visible');
        getErrorMessageTextPart(cy.get('vl-error-message[state="patternMismatch"]')).should('not.be.visible');
        cy.checkA11y('vl-datepicker');
    });

    it('should disable automatic mask validation with invalid initial value', () => {
        mountDatepickerInForm({ ...datepickerDefaults, disableMaskValidation: true, value: 'hello' });
        cy.get('form').then((form$) => {
            form$.on('submit', (e) => {
                e.preventDefault();
            });
        });
        cy.injectAxe();

        cy.get('vl-datepicker').shadow().find('input').should('not.have.class', 'vl-input-field--error');
        cy.get('vl-datepicker').should('have.value', 'hello');
        cy.get('button[type="submit"]').click({ force: true });

        getErrorMessageTextPart(cy.get('vl-error-message[state="valueMissing"]')).should('not.be.visible');
        getErrorMessageTextPart(cy.get('vl-error-message[state="patternMismatch"]')).should('not.be.visible');
        cy.checkA11y('vl-datepicker');
    });

    it('should validate pattern with disabled automatic mask validation', () => {
        mountDatepickerInForm({
            ...datepickerDefaults,
            disableMaskValidation: true,
            pattern: '^(0?[1-9]|[12][0-9]|3[01]).(0?[1-9]|1[012]).([0-9]{4})$',
        });
        cy.get('form').then((form$) => {
            form$.on('submit', (e) => {
                e.preventDefault();
            });
        });
        cy.injectAxe();

        cy.get('vl-datepicker').shadow().find('input').should('not.have.class', 'vl-input-field--error');
        cy.get('vl-datepicker').shadow().find('input.vl-input-field').type('1512202');
        // cy.get('vl-datepicker').shadow().find('input.vl-input-field').type('1');
        cy.get('button[type="submit"]').click({ force: true });

        getErrorMessageTextPart(cy.get('vl-error-message[state="valueMissing"]')).should('not.be.visible');
        getErrorMessageTextPart(cy.get('vl-error-message[state="patternMismatch"]')).should('be.visible');
        cy.get('vl-error-message[state="patternMismatch"]').should(
            'have.text',
            'Gelieve het juiste formaat te gebruiken.'
        );
        cy.checkA11y('vl-datepicker');

        cy.get('button[type="reset"]').click();

        cy.get('vl-datepicker').shadow().find('input.vl-input-field').type('15.12.2023');
        cy.get('button[type="submit"]').click();
        getErrorMessageTextPart(cy.get('vl-error-message[state="patternMismatch"]')).should('not.be.visible');
        cy.checkA11y('vl-datepicker');
    });

    it('should validate time pattern by default with mask', () => {
        mountDatepickerInForm({ ...datepickerDefaults, type: 'time' });
        cy.get('form').then((form$) => {
            form$.on('submit', (e) => {
                e.preventDefault();
            });
        });
        cy.injectAxe();

        cy.get('vl-datepicker').shadow().find('input').should('not.have.class', 'vl-input-field--error');

        cy.get('vl-datepicker').shadow().find('input.vl-input-field').type('9');
        cy.get('vl-datepicker').should('have.value', '09:');

        cy.get('button[type="submit"]').click({ force: true });

        getErrorMessageTextPart(cy.get('vl-error-message[state="valueMissing"]')).should('not.be.visible');
        getErrorMessageTextPart(cy.get('vl-error-message[state="patternMismatch"]')).should('be.visible');
        cy.get('vl-error-message[state="patternMismatch"]').should(
            'have.text',
            'Gelieve het juiste formaat te gebruiken.'
        );
        cy.checkA11y('vl-datepicker');

        cy.get('button[type="reset"]').click();

        cy.get('vl-datepicker').shadow().find('input.vl-input-field').type('99');
        cy.get('vl-datepicker').should('have.value', '09:09');
        cy.get('button[type="submit"]').click();
        getErrorMessageTextPart(cy.get('vl-error-message[state="patternMismatch"]')).should('not.be.visible');
        cy.checkA11y('vl-datepicker');
    });

    it('should validate alternative time pattern with mask', () => {
        mountDatepickerInForm({ ...datepickerDefaults, type: 'time', format: 'H:i:S' });
        cy.get('form').then((form$) => {
            form$.on('submit', (e) => {
                e.preventDefault();
            });
        });
        cy.injectAxe();

        cy.get('vl-datepicker').shadow().find('input').should('not.have.class', 'vl-input-field--error');

        cy.get('vl-datepicker').shadow().find('input.vl-input-field').type('9');
        cy.get('vl-datepicker').should('have.value', '09:');

        cy.get('button[type="submit"]').click({ force: true });

        getErrorMessageTextPart(cy.get('vl-error-message[state="valueMissing"]')).should('not.be.visible');
        getErrorMessageTextPart(cy.get('vl-error-message[state="patternMismatch"]')).should('be.visible');
        cy.get('vl-error-message[state="patternMismatch"]').should(
            'have.text',
            'Gelieve het juiste formaat te gebruiken.'
        );
        cy.checkA11y('vl-datepicker');

        cy.get('button[type="reset"]').click();

        cy.get('vl-datepicker').shadow().find('input.vl-input-field').type('999');
        cy.get('vl-datepicker').shadow().find('input.vl-input-field').should('have.value', '09:09:09');
        cy.get('vl-datepicker').should('have.value', '09:09:09');
        cy.get('button[type="submit"]').click();
        getErrorMessageTextPart(cy.get('vl-error-message[state="patternMismatch"]')).should('not.be.visible');
        cy.checkA11y('vl-datepicker');
    });

    it('should process disabled validation', () => {
        mountDatepickerInForm({ ...datepickerDefaults, disabled: true });
        cy.get('form').then((form$) => {
            form$.on('submit', (e) => {
                e.preventDefault();
            });
        });
        cy.injectAxe();

        cy.get('vl-datepicker').shadow().find('input').should('have.class', 'vl-input-field--disabled');

        cy.get('button[type="submit"]').click();
        cy.get('vl-datepicker').shadow().find('input').should('have.class', 'vl-input-field--disabled');
        cy.checkA11y('vl-datepicker');

        cy.get('vl-datepicker')
            .shadow()
            .find('button#toggle-calendar')
            .should('have.class', 'vl-input-addon--disabled');
        cy.get('vl-datepicker').shadow().find('input').should('have.class', 'vl-input-field--disabled');

        cy.get('button[type="submit"]').click();
        cy.checkA11y('vl-datepicker');
    });
});

/**
 * Deze functie maakt een datumstring aan in het formaat Y-m-d, d-m-Y of d/m/Y.
 * @param selectedYear
 * @param selectedDay
 * @param selectedMonth
 * @param format
 */
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
    // als de dag kleiner is dan 10, voeg een 0 toe voor de dag
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
    const timezoneOffset = new Date().getTimezoneOffset() * 60000; //offset in milliseconds
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
                        >
                        </vl-datepicker>
                        <vl-error-message for="geboortedatum" state="valueMissing">
                            Gelieve een geboortedatum in te vullen.
                        </vl-error-message>
                        <vl-error-message for="geboortedatum" state="patternMismatch"
                            >Gelieve het juiste formaat te gebruiken.</vl-error-message
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
