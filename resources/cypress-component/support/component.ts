import '../../cypress-commands/commands';
import { getContainerEl } from '@cypress/mount-utils';
import { LitElement, render, TemplateResult } from 'lit';

// de reportPortalCommands importeren overschrijft cy.log en geeft daardoor een probleem als ReportPortal niet
// correct geconfigureerd is - dus conditioneel activeren zodat alle configuratie overal samen actief wordt
if (Cypress.env('RP_ACTIVE') === '1') {
    await import('@reportportal/agent-js-cypress/lib/commands/reportPortalCommands');
}

let componentInstance: LitElement | HTMLElement;

Cypress.on('run:start', () => {
    Cypress.on('test:before:run', () => {
        componentInstance?.remove();
        getContainerEl().innerHTML = '';
    });
});

Cypress.Commands.add('mount', (template: TemplateResult) => {
    return cy.then(() => {
        const componentNode = document.createElement('div');
        getContainerEl().append(componentNode);
        render(template, componentNode);
        return cy
            .wrap(componentNode)
            .children()
            .first()
            .then((element) => {
                const name = element.prop('tagName').toLowerCase();
                componentInstance = document.querySelector(`${name}:not([data-cy-root])`)[0];
                return cy.wrap(element);
            });
    });
});

before(() => {
    cy.wait(1000); // wacht 1s voordat de eerste test in het spec-bestand start
});

// beforeEach(() => {
//     if (Cypress.env('RP_ACTIVE') === '1') {
//         cy.addTestAttributes([{ key: 'testType', value: 'cypress-component' }]);
//     }
// });
