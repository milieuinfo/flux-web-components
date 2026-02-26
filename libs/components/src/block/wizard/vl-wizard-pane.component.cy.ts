import { registerWebComponents } from '@domg-wc/common';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { VlWizardPane } from './vl-wizard-pane.component';
import { VlWizard } from './vl-wizard.component';

registerWebComponents([VlWizardPane, VlWizard]);

describe('cypress-component - block components - vl-wizard-pane - default', () => {
    const mountDefault = ({ isActive, name }: { isActive?: boolean; name?: string }) => {
        return cy.mount(
            html`
                <vl-wizard>
                    <vl-wizard-pane ?isActive=${isActive} name=${ifDefined(name || undefined)}>
                        <p>Wizard Pane Content (1)</p>
                    </vl-wizard-pane>
                </vl-wizard>
            `
        );
    };

    it('should mount', () => {
        mountDefault({});

        cy.get('[data-cy-root]').within(() => {
            cy.get('vl-wizard-pane').shadow();
            cy.get('vl-wizard-pane').find('p').should('have.text', 'Wizard Pane Content (1)');
        });
    });

    it('should be accessible', () => {
        mountDefault({});

        cy.injectAxe();
        cy.checkA11y('vl-wizard-pane');
    });

    it('should reflect the <name> attribute', () => {
        mountDefault({ name: 'TEST-NAME' });

        cy.get('vl-wizard-pane').should('have.attr', 'name', 'TEST-NAME');
    });

    it('it should dynamically update the name', () => {
        mountDefault({ name: 'TEST-NAME' });

        cy.get('vl-wizard').find('vl-wizard-pane').should('have.attr', 'name', 'TEST-NAME');
        cy.get('vl-wizard')
            .shadow()
            .find('vl-progress-indicator')
            .shadow()
            .find('.vl-progress-indicator__label')
            .should('have.text', 'TEST-NAME');

        cy.get('vl-wizard').find('vl-wizard-pane').invoke('attr', 'name', 'NEW-NAME');
        cy.get('vl-wizard')
            .shadow()
            .find('vl-progress-indicator')
            .shadow()
            .find('.vl-progress-indicator__label')
            .should('have.text', 'NEW-NAME');
    });
});

describe('cypress-component - block components - vl-wizard-pane - isActive state', () => {
    it('should initialize <vl-wizard-pane.isActive> as true if there is only 1 <vl-wizard-pane> in the <vl-wizard>', () => {
        cy.mount(html`
            <vl-wizard>
                <vl-wizard-pane name="first-pane">
                    <p>Wizard Pane Content (1)</p>
                </vl-wizard-pane>
            </vl-wizard>
        `);

        cy.get('vl-wizard-pane[name="first-pane"]').find('p').should('have.text', 'Wizard Pane Content (1)');
    });

    it('should NOT have visible content when <vl-wizard-pane> is not the activeStep, i,e: <isActive> is false', () => {
        cy.mount(html`
            <vl-wizard active-step="2">
                <vl-wizard-pane name="first-pane">
                    <p>Wizard Pane Content (1)</p>
                </vl-wizard-pane>
                <vl-wizard-pane name="second-pane">
                    <p>Another Wizard Pane Content (2)</p>
                </vl-wizard-pane>
            </vl-wizard>
        `);

        cy.get('vl-wizard-pane[name="first-pane"]').find('p').should('not.be.visible');
    });

    it('it should dynamically update the name', () => {
        cy.mount(html`
            <vl-wizard active-step="2">
                <vl-wizard-pane name="first-pane">
                    <p>Wizard Pane Content (1)</p>
                </vl-wizard-pane>
                <vl-wizard-pane name="second-pane">
                    <p>Another Wizard Pane Content (2)</p>
                </vl-wizard-pane>
            </vl-wizard>
        `);

        cy.get('vl-wizard').find('vl-wizard-pane').should('have.attr', 'name', 'first-pane');
        cy.get('vl-wizard')
            .shadow()
            .find('vl-progress-indicator')
            .shadow()
            .find('.vl-progress-indicator__label')
            .first()
            .should('have.text', 'first-pane');

        cy.get('vl-wizard').find('vl-wizard-pane').invoke('attr', 'name', 'NEW-NAME');
        cy.get('vl-wizard')
            .shadow()
            .find('vl-progress-indicator')
            .shadow()
            .find('.vl-progress-indicator__label')
            .first()
            .should('have.text', 'NEW-NAME');
    });
});
