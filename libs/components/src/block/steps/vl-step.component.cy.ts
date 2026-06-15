import { GlobalStyles, registerWebComponents } from '@domg-wc/common';
import { html } from 'lit';
import { VlStepComponent } from './vl-step.component';
import { VlStepsComponent } from './vl-steps.component';

registerWebComponents([VlStepsComponent, VlStepComponent]);

describe('cypress-component - block components - vl-step - default', () => {
    beforeEach(() => {
        cy.viewport(960, 1440);
        cy.then(() => GlobalStyles.getInstance().register());
    });

    it('should mount', () => {
        cy.mount(html`
            <vl-steps>
                <vl-step>
                    <span slot="icon">1</span>
                    <span slot="title">Stap 1: eerste actie</span>
                    <span slot="subtitle">Dit is de eerste subtitel.</span>
                    <span slot="content">Dit is de eerste stap content.</span>
                </vl-step>
            </vl-steps>
        `);

        cy.get('vl-step').should('exist');
    });

    it('should contain step content', () => {
        cy.mount(html`
            <vl-steps>
                <vl-step>
                    <span slot="icon">1</span>
                    <span slot="title">Stap 1: eerste actie</span>
                    <span slot="subtitle">Dit is de eerste subtitel.</span>
                    <span slot="content">Dit is de eerste stap content.</span>
                </vl-step>
            </vl-steps>
        `);

        cy.get('vl-step').find('span[slot="icon"]').contains('1');
        cy.get('vl-step').find('span[slot="title"]').contains('Stap 1: eerste actie');
        cy.get('vl-step').find('span[slot="subtitle"]').contains('Dit is de eerste subtitel');
        cy.get('vl-step').find('span[slot="content"]').contains('Dit is de eerste stap content.');
    });

    it('should have default heading level h3', () => {
        cy.mount(html`
            <vl-steps>
                <vl-step>
                    <span slot="icon">1</span>
                    <span slot="title">Stap 1: eerste actie</span>
                    <span slot="subtitle">Dit is de eerste subtitel.</span>
                    <span slot="content">Dit is de eerste stap content.</span>
                </vl-step>
            </vl-steps>
        `);

        cy.get('vl-step').shadow().find('h3.vl-step__title').should('exist');
    });

    it('should support custom heading level', () => {
        cy.mount(html`
            <vl-steps>
                <vl-step heading-level="2">
                    <span slot="icon">1</span>
                    <span slot="title">Stap 1: eerste actie</span>
                    <span slot="subtitle">Dit is de eerste subtitel.</span>
                    <span slot="content">Dit is de eerste stap content.</span>
                </vl-step>
            </vl-steps>
        `);

        cy.get('vl-step').shadow().find('h2.vl-step__title').should('exist');
        cy.get('vl-step').shadow().find('h3.vl-step__title').should('not.exist');
    });

    it('should support icon aria-label', () => {
        cy.mount(html`
            <vl-steps>
                <vl-step icon-aria-label="1 maart">
                    <span slot="icon">1</span>
                    <span slot="title">Stap 1: eerste actie</span>
                    <span slot="subtitle">Dit is de eerste subtitel.</span>
                    <span slot="content">Dit is de eerste stap content.</span>
                </vl-step>
            </vl-steps>
        `);

        cy.get('vl-step').shadow().find('.vl-step__icon').should('have.attr', 'aria-label', '1 maart');
    });

    it('should not have aria-label when icon-aria-label is not set', () => {
        cy.mount(html`
            <vl-steps>
                <vl-step>
                    <span slot="icon">1</span>
                    <span slot="title">Stap 1: eerste actie</span>
                    <span slot="subtitle">Dit is de eerste subtitel.</span>
                    <span slot="content">Dit is de eerste stap content.</span>
                </vl-step>
            </vl-steps>
        `);

        cy.get('vl-step').shadow().find('.vl-step__icon').should('not.have.attr', 'aria-label');
    });

    it('should support timeline-aria-label', () => {
        cy.mount(html`
            <vl-steps timeline>
                <vl-step timeline-aria-label="1 maart, 12 uur tot 14 uur">
                    <span slot="icon">31</span>
                    <span slot="sub-icon">maa</span>
                    <span slot="title">Stap 1: eerste actie</span>
                    <span slot="title-annotation">12u00 - 14u00</span>
                    <span slot="subtitle">Dit is de eerste subtitel.</span>
                    <span slot="content">Dit is de eerste stap content.</span>
                </vl-step>
            </vl-steps>
        `);

        cy.get('vl-step')
            .shadow()
            .find('.vl-step__icon')
            .should('have.attr', 'aria-label', '1 maart, 12 uur tot 14 uur');
    });

    it('should render sub-icon slot', () => {
        cy.mount(html`
            <vl-steps timeline>
                <vl-step>
                    <span slot="icon">31</span>
                    <span slot="sub-icon">maa</span>
                    <span slot="title">Stap 1: eerste actie</span>
                    <span slot="content">Dit is de eerste stap content.</span>
                </vl-step>
            </vl-steps>
        `);

        cy.get('vl-step')
            .shadow()
            .find('slot[name="sub-icon"]')
            .then(([slot]) => {
                const assigned = (slot as HTMLSlotElement).assignedNodes({ flatten: true });
                const text = assigned
                    .map((n) => n.textContent)
                    .join('')
                    .trim();
                expect(text).to.equal('maa');
            });
    });

    it('should render title-annotation slot', () => {
        cy.mount(html`
            <vl-steps timeline>
                <vl-step>
                    <span slot="icon">31</span>
                    <span slot="title">Stap 1: eerste actie</span>
                    <span slot="title-annotation">12u00 - 14u00</span>
                    <span slot="content">Dit is de eerste stap content.</span>
                </vl-step>
            </vl-steps>
        `);

        cy.get('vl-step')
            .shadow()
            .find('slot[name="title-annotation"]')
            .then(([slot]) => {
                const assigned = (slot as HTMLSlotElement).assignedNodes({ flatten: true });
                const text = assigned
                    .map((n) => n.textContent)
                    .join('')
                    .trim();
                expect(text).to.equal('12u00 - 14u00');
            });
    });

    it('should render duration steps', () => {
        cy.mount(html`
            <vl-steps timeline>
                <vl-step>
                    <span slot="icon">31</span>
                    <span slot="title">Stap 1: eerste actie</span>
                    <span slot="content">Dit is de eerste stap content.</span>
                    <vl-duration-step slot="duration">Lunch: 1 uur</vl-duration-step>
                    <vl-duration-step slot="duration">Vrije tijd: 2 uur</vl-duration-step>
                </vl-step>
            </vl-steps>
        `);

        cy.get('vl-duration-step')
            .eq(0)
            .shadow()
            .find('li.vl-duration-step')
            .find('slot')
            .then(([slot]) => {
                const assigned = (slot as HTMLSlotElement).assignedNodes({ flatten: true });
                const text = assigned
                    .map((n) => n.textContent)
                    .join('')
                    .trim();
                expect(text).to.equal('Lunch: 1 uur');
            });

        cy.get('vl-duration-step')
            .eq(1)
            .shadow()
            .find('li.vl-duration-step')
            .find('slot')
            .then(([slot]) => {
                const assigned = (slot as HTMLSlotElement).assignedNodes({ flatten: true });
                const text = assigned
                    .map((n) => n.textContent)
                    .join('')
                    .trim();
                expect(text).to.equal('Vrije tijd: 2 uur');
            });
    });

    it('should have disabled state', () => {
        cy.mount(html`
            <vl-steps>
                <vl-step type="disabled">
                    <span slot="icon">3</span>
                    <span slot="title">Disabled stap</span>
                    <span slot="content">Deze stap is uitgeschakeld.</span>
                </vl-step>
            </vl-steps>
        `);

        cy.get('vl-step').should('have.attr', 'type', 'disabled');
    });

    it('should be open by default when default-open is set', () => {
        cy.mount(html`
            <vl-steps>
                <vl-step toggleable default-open>
                    <span slot="icon">1</span>
                    <span slot="title">Toggleable stap</span>
                    <span slot="content">Deze stap is standaard geopend.</span>
                </vl-step>
            </vl-steps>
        `);

        cy.get('vl-step').shadow().find('li').should('have.class', 'js-vl-accordion--open');
    });
});