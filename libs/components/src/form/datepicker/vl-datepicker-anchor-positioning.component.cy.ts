import { registerWebComponents } from '@domg-wc/common';
import { html } from 'lit';
import { VlModalComponent } from '../../block/modal';
import { VlDatepickerComponent } from './vl-datepicker.component';

registerWebComponents([VlDatepickerComponent, VlModalComponent]);

// module-scope: ook de losgetrokken describes hieronder gebruiken deze helper
const openCalendar = () => {
    cy.get('vl-datepicker').shadow().find('button#toggle-calendar').click();
    return cy.get('vl-datepicker').shadow().find('.flatpickr-calendar');
};

describe('cypress-component - form components - vl-datepicker - anchor-positioning (polyfill)', () => {
    const positions = [
        'auto',
        'below',
        'auto left',
        'below left',
        'auto center',
        'below center',
        'auto right',
        'below right',
        'above',
        'above left',
        'above center',
        'above right',
    ];

    it('should render the calendar in the top-layer popover by default', () => {
        cy.mount(html`<vl-datepicker></vl-datepicker>`);

        openCalendar().should('have.class', 'open').should('have.attr', 'popover', 'manual');
    });

    it('should not use popover when inline-positioning is set', () => {
        cy.mount(html`<vl-datepicker inline-positioning></vl-datepicker>`);

        openCalendar().should('have.class', 'open').should('not.have.attr', 'popover');
    });

    positions.forEach((position) => {
        it(`should activate the popover by default with position="${position}"`, () => {
            cy.mount(html`<vl-datepicker position=${position}></vl-datepicker>`);

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
                        <vl-datepicker></vl-datepicker>
                    </span>
                </vl-modal>
            `);

            cy.get('vl-modal').then(($modal) => ($modal[0] as any).open());

            openCalendar().should('have.class', 'open').should('have.attr', 'popover', 'manual');
        });
    });
});

describe('cypress-component - form components - vl-datepicker - anchor-positioning (polyfill) - static heeft voorrang op de anchor-modus', () => {
    it('should render a static calendar without popover under the default (anchor) mode', () => {
        cy.mount(html`<vl-datepicker static value="2024-04-15"></vl-datepicker>`);

        openCalendar().should(($cal) => {
            expect($cal).to.have.class('open');
            expect($cal).to.have.class('static');
            expect($cal[0].hasAttribute('popover'), 'geen popover').to.be.false;
            expect($cal[0].hasAttribute('style'), 'geen inline style').to.be.false;
        });
    });

    it('should render a static calendar without popover when inline-positioning is also set', () => {
        cy.mount(html`<vl-datepicker static inline-positioning value="2024-04-15"></vl-datepicker>`);

        openCalendar().should(($cal) => {
            expect($cal).to.have.class('open');
            expect($cal).to.have.class('static');
            expect($cal[0].hasAttribute('popover'), 'geen popover').to.be.false;
            expect($cal[0].hasAttribute('style'), 'geen inline style').to.be.false;
        });
    });

    ['above', 'below center', 'auto right'].forEach((position) => {
        it(`should stay static and ignore position="${position}" (no popover)`, () => {
            cy.mount(html`<vl-datepicker static position=${position} value="2024-04-15"></vl-datepicker>`);

            openCalendar()
                .should('have.class', 'open')
                .should('have.class', 'static')
                .should('not.have.attr', 'popover');
        });
    });
});

// FLUX-595 regression — anchor-positioning rendert in de top-layer popover en ontsnapt zo aan ancestor
// transform / overflow:auto die de oude positionering brak. We asserten functioneel dat de popover
// actief is in deze problematische contexten (niet de exacte pixels).
describe('cypress-component - form components - vl-datepicker - anchor-positioning (polyfill) - FLUX-595 — anchor-positioning in problematische ancestor contexten', () => {
    it('should activate the popover when ancestor has transform', () => {
        cy.mount(html`
            <div style="transform: translateX(0); padding: 100px;">
                <vl-datepicker></vl-datepicker>
            </div>
        `);

        openCalendar().should('have.class', 'open').should('have.attr', 'popover', 'manual');
    });

    it('should activate the popover when ancestor is scrollable (overflow:auto)', () => {
        cy.mount(html`
            <div style="overflow: auto; max-height: 300px; padding: 80px;">
                <div style="height: 100px;"></div>
                <vl-datepicker></vl-datepicker>
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
                <vl-datepicker></vl-datepicker>
                <div style="height: 400px;"></div>
            </div>
        `);

        openCalendar().should('have.class', 'open').should('have.attr', 'popover', 'manual');
    });
});
