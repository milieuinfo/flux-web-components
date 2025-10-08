import 'cypress-axe';
import '../../../../resources/cypress-commands/commands';
import '@reportportal/agent-js-cypress/lib/commands/reportPortalCommands';

// Log alle unhandled rejections met volledige reason/stack
cy.on('window:before:load', (win) => {
    win.addEventListener('unhandledrejection', (ev: PromiseRejectionEvent) => {
        const r: any = ev.reason;
        // Zorg dat je in de Cypress runner ziet wát het is en waar het vandaan komt
        // (message, name, stack, eventuele custom properties)
        // eslint-disable-next-line no-console
        cy.log('[unhandledrejection]', {
            name: r?.name,
            message: r?.message,
            stack: r?.stack,
            reason: r,
        });
    });
});

before(() => {
    cy.wait(1000); // wacht 1s voordat de eerste test in het spec-bestand start
});

beforeEach(() => {
    if (Cypress.env('RP_ACTIVE') === '1') {
        cy.addTestAttributes([{ key: 'testType', value: 'cypress-e2e' }]);
    }
});
