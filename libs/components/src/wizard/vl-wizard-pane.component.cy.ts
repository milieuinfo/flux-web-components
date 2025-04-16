import { registerWebComponents } from '@domg-wc/common';
import { html, nothing } from 'lit';
import { VlWizardPane } from './vl-wizard-pane.component';
import { VlWizard } from './vl-wizard.component';

registerWebComponents([VlWizardPane, VlWizard]);

describe('component vl-wizard-pane - default', () => {
    const mountDefault = ({ isActive, name }: { isActive?: boolean; name?: string }) => {
        return cy.mount(
            html`
                <vl-wizard>
                    <vl-wizard-pane isActive=${isActive} data-vl-name=${name || nothing}>
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

        cy.get('vl-wizard-pane').should('have.attr', 'data-vl-name', 'TEST-NAME');
    });

    it('it should dynamically update the name', () => {
        mountDefault({ name: 'TEST-NAME' });

        cy.get('vl-wizard').find('vl-wizard-pane').should('have.attr', 'data-vl-name', 'TEST-NAME');
        cy.get('vl-wizard')
            .shadow()
            .find('vl-progress-bar')
            .shadow()
            .find('.vl-progress-bar__bullet__text')
            .should('have.text', 'TEST-NAME');

        cy.get('vl-wizard').find('vl-wizard-pane').invoke('attr', 'data-vl-name', 'NEW-NAME');
        cy.get('vl-wizard')
            .shadow()
            .find('vl-progress-bar')
            .shadow()
            .find('.vl-progress-bar__bullet__text')
            .should('have.text', 'NEW-NAME');
    });
});

describe('component vl-wizard-pane - isActive state', () => {
    it('should initialize <vl-wizard-pane.isActive> as true if there is only 1 <vl-wizard-pane> in the <vl-wizard>', () => {
        cy.mount(html`
            <vl-wizard>
                <vl-wizard-pane data-vl-name="first-pane">
                    <p>Wizard Pane Content (1)</p>
                </vl-wizard-pane>
            </vl-wizard>
        `);

        cy.get('vl-wizard-pane[data-vl-name="first-pane"]').find('p').should('have.text', 'Wizard Pane Content (1)');
    });

    it('should NOT have visible content when <vl-wizard-pane> is not the activeStep, i,e: <isActive> is false', () => {
        cy.mount(html`
            <vl-wizard data-vl-active-step="2">
                <vl-wizard-pane data-vl-name="first-pane">
                    <p>Wizard Pane Content (1)</p>
                </vl-wizard-pane>
                <vl-wizard-pane data-vl-name="second-pane">
                    <p>Another Wizard Pane Content (2)</p>
                </vl-wizard-pane>
            </vl-wizard>
        `);

        cy.get('vl-wizard-pane[data-vl-name="first-pane"]').find('p').should('not.be.visible');
    });

    it('it should dynamically update the name', () => {
        cy.mount(html`
            <vl-wizard data-vl-active-step="2">
                <vl-wizard-pane data-vl-name="first-pane">
                    <p>Wizard Pane Content (1)</p>
                </vl-wizard-pane>
                <vl-wizard-pane data-vl-name="second-pane">
                    <p>Another Wizard Pane Content (2)</p>
                </vl-wizard-pane>
            </vl-wizard>
        `);

        cy.get('vl-wizard').find('vl-wizard-pane').should('have.attr', 'data-vl-name', 'first-pane');
        cy.get('vl-wizard')
            .shadow()
            .find('vl-progress-bar')
            .shadow()
            .find('.vl-progress-bar__bullet__text')
            .first()
            .should('have.text', 'first-pane');

        cy.get('vl-wizard').find('vl-wizard-pane').invoke('attr', 'data-vl-name', 'NEW-NAME');
        cy.get('vl-wizard')
            .shadow()
            .find('vl-progress-bar')
            .shadow()
            .find('.vl-progress-bar__bullet__text')
            .first()
            .should('have.text', 'NEW-NAME');
    });
});
