import 'cypress-axe';

import '../../../../resources/cypress-commands/commands';

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
