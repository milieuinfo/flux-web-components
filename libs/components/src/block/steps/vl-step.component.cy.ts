import { GlobalStyles, registerWebComponents } from '@domg-wc/common';
import { html } from 'lit';
import { VlStepComponent } from './vl-step.component';

registerWebComponents([VlStepComponent]);

describe('cypress-component - block components - vl-step - default', () => {
    beforeEach(() => {
        cy.viewport(960, 1440);
        cy.then(() => GlobalStyles.getInstance().register());
    });

    it('should mount', () => {
        cy.mount(html`
            <vl-step>
                <span slot="icon">1</span>
                <span slot="title">Stap 1: eerste actie</span>
                <span slot="subtitle">Dit is de eerste subtitel.</span>
                <span slot="content">Dit is de eerste stap content.</span>
            </vl-step>
        `);

        cy.get('vl-step').should('exist');
    });

    it('should contain step content', () => {
        cy.mount(html`
            <vl-step>
                <span slot="icon">1</span>
                <span slot="title">Stap 1: eerste actie</span>
                <span slot="subtitle">Dit is de eerste subtitel.</span>
                <span slot="content">Dit is de eerste stap content.</span>
            </vl-step>
        `);

        cy.get('vl-step').find('span[slot="icon"]').contains('1');
        cy.get('vl-step').find('span[slot="title"]').contains('Stap 1: eerste actie');
        cy.get('vl-step').find('span[slot="subtitle"]').contains('Dit is de eerste subtitel');
        cy.get('vl-step').find('span[slot="content"]').contains('Dit is de eerste stap content.');
    });

    it('should have default heading level h3', () => {
        cy.mount(html`
            <vl-step>
                <span slot="icon">1</span>
                <span slot="title">Stap 1: eerste actie</span>
                <span slot="subtitle">Dit is de eerste subtitel.</span>
                <span slot="content">Dit is de eerste stap content.</span>
            </vl-step>
        `);

        cy.get('vl-step').shadow().find('h3.vl-step__title').should('exist');
    });

    it('should support custom heading level', () => {
        cy.mount(html`
            <vl-step heading-level="2">
                <span slot="icon">1</span>
                <span slot="title">Stap 1: eerste actie</span>
                <span slot="subtitle">Dit is de eerste subtitel.</span>
                <span slot="content">Dit is de eerste stap content.</span>
            </vl-step>
        `);

        cy.get('vl-step').shadow().find('h2.vl-step__title').should('exist');
        cy.get('vl-step').shadow().find('h3.vl-step__title').should('not.exist');
    });

    it('should support icon aria-label', () => {
        cy.mount(html`
            <vl-step icon-aria-label="1 maart">
                <span slot="icon">1</span>
                <span slot="title">Stap 1: eerste actie</span>
                <span slot="subtitle">Dit is de eerste subtitel.</span>
                <span slot="content">Dit is de eerste stap content.</span>
            </vl-step>
        `);

        cy.get('vl-step').shadow().find('.vl-step__icon').should('have.attr', 'aria-label', '1 maart');
    });

    it('should not have aria-label when icon-aria-label is not set', () => {
        cy.mount(html`
            <vl-step>
                <span slot="icon">1</span>
                <span slot="title">Stap 1: eerste actie</span>
                <span slot="subtitle">Dit is de eerste subtitel.</span>
                <span slot="content">Dit is de eerste stap content.</span>
            </vl-step>
        `);

        cy.get('vl-step').shadow().find('.vl-step__icon').should('not.have.attr', 'aria-label');
    });
});