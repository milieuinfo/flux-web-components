import { registerWebComponents } from '@domg-wc/common';
import { html, nothing } from 'lit';
import { VlWizardPane } from './vl-wizard-pane.component';
import { VlWizard } from './vl-wizard.component';

registerWebComponents([VlWizardPane, VlWizard]);

type MountDefaultProps = {
    activeStep?: number;
    panes?: string[];
    hideLabels?: boolean;
    numeric?: boolean;
};

const mountDefault = ({ activeStep, panes, hideLabels = false, numeric = false }: MountDefaultProps) => {
    const paneElements = panes
        ? panes.map((paneName) => {
              return html`
                  <vl-wizard-pane data-vl-name=${paneName}>
                      <p>Wizard Pane Content (${paneName})</p>
                  </vl-wizard-pane>
              `;
          })
        : nothing;

    cy.mount(
        html`
            <vl-wizard
                data-vl-active-step=${activeStep || nothing}
                ?data-vl-hide-labels=${hideLabels}
                ?data-vl-numeric=${numeric}
            >
                ${paneElements}
            </vl-wizard>
        `
    );
};

describe('component vl-wizard - default', () => {
    it('should mount', () => {
        mountDefault({});
        cy.get('[data-cy-root]').within(() => {
            cy.get('vl-wizard').shadow();
        });
    });

    it('should be accessible', () => {
        mountDefault({});

        cy.injectAxe();
        cy.checkA11y('vl-wizard');
    });
});

describe('component vl-wizard-pane - properties', () => {
    it('should reflect <activeStep> attribute', () => {
        mountDefault({ activeStep: 2 });

        cy.get('vl-wizard').should('have.attr', 'data-vl-active-step', '2');
    });

    it('should render the correct number of panes', () => {
        mountDefault({ panes: ['Step 1', 'Step 2', 'Step 3'] });

        cy.get('vl-wizard').find('vl-wizard-pane').should('have.length', 3);
        cy.get('vl-wizard').find('vl-wizard-pane').should('not.have.length', 4);
    });

    it('should render the correct <pane.name> when the pane is hovered', () => {
        mountDefault({
            panes: ['Step 1', 'Step 2', 'Step 3'],
            activeStep: 1,
        });

        cy.get('vl-wizard').find('vl-wizard-pane[data-vl-name="Step 1"]').trigger('mouseover');
        cy.get('vl-wizard').find('vl-wizard-pane[data-vl-name="Step 1"]').contains('Wizard Pane Content (Step 1)');
    });

    it('should set the correct pane as active', () => {
        mountDefault({
            panes: ['Step 1', 'Step 2', 'Step 3'],
            activeStep: 2,
        });
        cy.get('vl-wizard').find('vl-wizard-pane[data-vl-name="Step 2"]').contains('Wizard Pane Content (Step 2)');
    });

    it('should add numeric steps', () => {
        mountDefault({ numeric: true, panes: ['Step 1', 'Step 2', 'Step 3'] });
        cy.get('vl-wizard')
            .shadow()
            .find('vl-progress-bar')
            .shadow()
            .find('div.vl-progress-bar.vl-progress-bar--numeric');
    });

    it('should display the step labels by default', () => {
        mountDefault({ panes: ['Step 1', 'Step 2', 'Step 3'] });

        cy.get('vl-wizard').should('not.have.attr', 'data-vl-hide-labels');

        cy.get('vl-wizard')
            .shadow()
            .find('vl-progress-bar')
            .shadow()
            .find('.vl-progress-bar__step')
            .eq(0)
            .find('.vl-progress-bar__bullet__text')
            .should('contain.text', 'Step 1');
        cy.get('vl-wizard')
            .shadow()
            .find('vl-progress-bar')
            .shadow()
            .find('.vl-progress-bar__step')
            .eq(1)
            .find('.vl-progress-bar__bullet__text')
            .should('contain.text', 'Step 2');
    });

    it('should hide the step labels when <data-vl-hide-labels> is true', () => {
        mountDefault({ panes: ['Step 1', 'Step 2', 'Step 3'], hideLabels: true });

        cy.get('vl-wizard').should('have.attr', 'data-vl-hide-labels');

        cy.get('vl-wizard')
            .shadow()
            .find('vl-progress-bar')
            .shadow()
            .find('.vl-progress-bar__step')
            .eq(0)
            .find('.vl-progress-bar__bullet__text')
            .should('not.exist');
        cy.get('vl-wizard')
            .shadow()
            .find('vl-progress-bar')
            .shadow()
            .find('.vl-progress-bar__step')
            .eq(1)
            .find('.vl-progress-bar__bullet__text')
            .should('not.exist');
    });
});
