import '../../cypress-commands/commands';
import { getContainerEl } from '@cypress/mount-utils';
import { LitElement, render, TemplateResult } from 'lit';
import { addMatchImageSnapshotCommand } from '@simonsmith/cypress-image-snapshot/command';

if (Cypress.browser.name === 'webkit') {
    // WebKit rendert op een andere device pixel ratio dan de Chromium-baselines, dus elke vergelijking
    // faalt op een formaatverschil. Daarom geen vergelijking op WebKit: dit commando doet niets en slaagt
    // altijd (lege return, want een waarde teruggeven zou een cast vereisen)
    //TODO eventueel in toekomst eigen WebKit-baselines toevoegen
    Cypress.Commands.add('matchImageSnapshot', { prevSubject: ['optional', 'element', 'window', 'document'] }, () => {});
} else {
    addMatchImageSnapshotCommand({
        failureThreshold: 0.001,
        failureThresholdType: 'percent',
        customDiffConfig: { threshold: 0.001 },
        capture: 'viewport',
    });
}

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
