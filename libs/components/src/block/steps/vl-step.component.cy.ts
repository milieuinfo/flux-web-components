import { GlobalStyles, registerWebComponents } from '@domg-wc/common';
import { html } from 'lit';
import { VlDurationStepComponent } from './vl-duration-step.component';
import { VlStepComponent } from './vl-step.component';
import { VlStepsComponent } from './vl-steps.component';

registerWebComponents([VlStepsComponent, VlStepComponent, VlDurationStepComponent]);

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

    it('should render a black dot by default, a black dot + aria-current when selected and a blue dot when interactive', () => {
        cy.mount(html`
            <vl-steps timeline>
                <vl-step>
                    <span slot="icon">31</span>
                    <span slot="title">Stap 1: eerste actie</span>
                    <span slot="content">Dit is de eerste stap content.</span>
                    <vl-duration-step slot="duration">Standaard toestand</vl-duration-step>
                    <vl-duration-step slot="duration" selected>Geselecteerde toestand</vl-duration-step>
                    <vl-duration-step slot="duration" interactive>Interactieve toestand</vl-duration-step>
                </vl-step>
            </vl-steps>
        `);

        cy.get('vl-duration-step').eq(0).should('not.have.attr', 'aria-current');
        cy.get('vl-duration-step').eq(1).should('have.attr', 'selected');
        cy.get('vl-duration-step').eq(1).should('have.attr', 'aria-current', 'true');
        cy.get('vl-duration-step').eq(2).should('not.have.attr', 'aria-current');

        // default = zwart (grey-1000)
        cy.get('vl-duration-step')
            .eq(0)
            .shadow()
            .find('li.vl-duration-step')
            .should('have.attr', 'part', 'duration-step')
            .then(([li]) => {
                expect(getComputedStyle(li, '::after').backgroundColor).to.equal('rgb(51, 51, 50)');
            });

        // selected = zwart (grey-1000)
        cy.get('vl-duration-step')
            .eq(1)
            .shadow()
            .find('li.vl-duration-step')
            .then(([li]) => {
                expect(getComputedStyle(li, '::after').backgroundColor).to.equal('rgb(51, 51, 50)');
            });

        // interactive = blauw (action)
        cy.get('vl-duration-step')
            .eq(2)
            .shadow()
            .find('li.vl-duration-step')
            .then(([li]) => {
                expect(getComputedStyle(li, '::after').backgroundColor).to.equal('rgb(0, 85, 204)');
            });
    });

    it('should keep the dot black when a step is both selected and interactive', () => {
        cy.mount(html`
            <vl-steps timeline>
                <vl-step>
                    <span slot="title">Stap 1: eerste actie</span>
                    <span slot="content">Dit is de eerste stap content.</span>
                    <vl-duration-step slot="duration" selected interactive>Huidige toestand</vl-duration-step>
                </vl-step>
            </vl-steps>
        `);

        cy.get('vl-duration-step')
            .shadow()
            .find('li.vl-duration-step')
            .then(([li]) => {
                expect(getComputedStyle(li, '::after').backgroundColor).to.equal('rgb(51, 51, 50)');
            });
    });

    it('should toggle aria-current when the selected property changes', () => {
        cy.mount(html`
            <vl-steps timeline>
                <vl-step>
                    <span slot="title">Stap 1: eerste actie</span>
                    <span slot="content">Dit is de eerste stap content.</span>
                    <vl-duration-step slot="duration">Toestand</vl-duration-step>
                </vl-step>
            </vl-steps>
        `);

        cy.get('vl-duration-step').should('not.have.attr', 'aria-current');
        cy.get('vl-duration-step').then(([el]) => {
            (el as VlDurationStepComponent).selected = true;
        });
        cy.get('vl-duration-step').should('have.attr', 'aria-current', 'true');
        cy.get('vl-duration-step').then(([el]) => {
            (el as VlDurationStepComponent).selected = false;
        });
        cy.get('vl-duration-step').should('not.have.attr', 'aria-current');
    });

    it('should toggle the dot colour when the interactive property changes', () => {
        cy.mount(html`
            <vl-steps timeline>
                <vl-step>
                    <span slot="title">Stap 1: eerste actie</span>
                    <span slot="content">Dit is de eerste stap content.</span>
                    <vl-duration-step slot="duration">Toestand</vl-duration-step>
                </vl-step>
            </vl-steps>
        `);

        cy.get('vl-duration-step')
            .shadow()
            .find('li.vl-duration-step')
            .then(([li]) => {
                expect(getComputedStyle(li, '::after').backgroundColor).to.equal('rgb(51, 51, 50)');
            });

        cy.get('vl-duration-step').then(([el]) => {
            (el as VlDurationStepComponent).interactive = true;
        });
        cy.get('vl-duration-step').should('have.attr', 'interactive');
        cy.get('vl-duration-step')
            .shadow()
            .find('li.vl-duration-step')
            .then(([li]) => {
                expect(getComputedStyle(li, '::after').backgroundColor).to.equal('rgb(0, 85, 204)');
            });

        cy.get('vl-duration-step').then(([el]) => {
            (el as VlDurationStepComponent).interactive = false;
        });
        cy.get('vl-duration-step').should('not.have.attr', 'interactive');
        cy.get('vl-duration-step')
            .shadow()
            .find('li.vl-duration-step')
            .then(([li]) => {
                expect(getComputedStyle(li, '::after').backgroundColor).to.equal('rgb(51, 51, 50)');
            });
    });

    it('should let a consumer restyle the stip through the exposed part', () => {
        cy.mount(html`
            <style>
                vl-duration-step[interactive]::part(duration-step)::after {
                    background-color: rgb(255, 0, 0);
                }
            </style>
            <vl-steps timeline>
                <vl-step>
                    <span slot="title">Stap 1: eerste actie</span>
                    <span slot="content">Dit is de eerste stap content.</span>
                    <vl-duration-step slot="duration" interactive>Interactieve toestand</vl-duration-step>
                </vl-step>
            </vl-steps>
        `);

        cy.get('vl-duration-step')
            .shadow()
            .find('li.vl-duration-step')
            .then(([li]) => {
                expect(getComputedStyle(li, '::after').backgroundColor).to.equal('rgb(255, 0, 0)');
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