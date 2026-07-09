import { registerWebComponents } from '@domg-wc/common';
import { html } from 'lit';
import { VlModalComponent } from '../../block/modal';
import { VlDatepickerComponent } from './vl-datepicker.component';

registerWebComponents([VlDatepickerComponent, VlModalComponent]);

describe('vl-datepicker - anchor-positioning (polyfill)', () => {
    const positions = [
        'auto', 'below', 'auto left', 'below left', 'auto center', 'below center', 'auto right', 'below right',
        'above', 'above left', 'above center', 'above right',
    ];

    const openCalendar = () => {
        cy.get('vl-datepicker').shadow().find('button#toggle-calendar').click();
        return cy.get('vl-datepicker').shadow().find('.flatpickr-calendar');
    };

    it('should render the calendar in the top-layer popover when anchor-positioning is set', () => {
        cy.mount(html`<vl-datepicker anchor-positioning></vl-datepicker>`);

        openCalendar().should('have.class', 'open').should('have.attr', 'popover', 'manual');
    });

    it('should not use popover when anchor-positioning is not set', () => {
        cy.mount(html`<vl-datepicker></vl-datepicker>`);

        openCalendar().should('have.class', 'open').should('not.have.attr', 'popover');
    });

    positions.forEach((position) => {
        it(`should activate the popover with anchor-positioning and position="${position}"`, () => {
            cy.mount(html`<vl-datepicker anchor-positioning position=${position}></vl-datepicker>`);

            openCalendar().should('have.class', 'open').should('have.attr', 'popover', 'manual');
        });
    });

    // FLUX-595 regression — anchor-positioning rendert in de top-layer popover en ontsnapt zo aan ancestor
    // transform / overflow:auto die de oude positionering brak. We asserten functioneel dat de popover
    // actief is in deze problematische contexten (niet de exacte pixels).
    describe('FLUX-595 — anchor-positioning in problematische ancestor contexten', () => {
        it('should activate the popover when ancestor has transform', () => {
            cy.mount(html`
                <div style="transform: translateX(0); padding: 100px;">
                    <vl-datepicker anchor-positioning></vl-datepicker>
                </div>
            `);

            openCalendar().should('have.class', 'open').should('have.attr', 'popover', 'manual');
        });

        it('should activate the popover when ancestor is scrollable (overflow:auto)', () => {
            cy.mount(html`
                <div style="overflow: auto; max-height: 300px; padding: 80px;">
                    <div style="height: 100px;"></div>
                    <vl-datepicker anchor-positioning></vl-datepicker>
                    <div style="height: 400px;"></div>
                </div>
            `);

            openCalendar().should('have.class', 'open').should('have.attr', 'popover', 'manual');
        });

        it('should activate the popover when ancestor combines transform + overflow:auto (ticket screenshot scenario)', () => {
            cy.mount(html`
                <div
                    style="transform: translateX(0); overflow: auto; max-height: 300px;
                           padding: 80px; margin: 50px;"
                >
                    <div style="height: 100px;"></div>
                    <vl-datepicker anchor-positioning></vl-datepicker>
                    <div style="height: 400px;"></div>
                </div>
            `);

            openCalendar().should('have.class', 'open').should('have.attr', 'popover', 'manual');
        });
    });

    const modalVariants: { size: string; position: string }[] = [
        { size: 'default', position: 'center' },
        { size: 'medium', position: 'center' },
        { size: 'large', position: 'center' },
        { size: 'full-screen', position: 'center' },
        { size: 'default', position: 'left' },
        { size: 'default', position: 'right' },
    ];

    modalVariants.forEach(({ size, position: modalPosition }) => {
        it(`should activate the popover in vl-modal (size="${size}", position="${modalPosition}") with anchor-positioning`, () => {
            cy.mount(html`
                <vl-modal id="test-modal" title="Modal" size=${size} position=${modalPosition}>
                    <span slot="content">
                        <vl-datepicker anchor-positioning></vl-datepicker>
                    </span>
                </vl-modal>
            `);

            cy.get('vl-modal').then(($modal) => ($modal[0] as any).open());

            openCalendar().should('have.class', 'open').should('have.attr', 'popover', 'manual');
        });
    });
});
