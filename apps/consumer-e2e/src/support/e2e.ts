import 'cypress-axe';

// consumer-e2e draait bewust standalone: het simuleert een externe afnemer van de gepubliceerde @domg-wc packages
// en mag daarom niets buiten deze app resolven!
//
// resources/cypress-commands/commands.ts heeft geen eigen package.json, dus zijn imports (cypress-axe,
// cypress-wait-until) lossen enkel op vanuit de repo-root. Van de 11 gedeelde commands gebruiken de consumer-specs er
// één - die staat hier. Heb je een ander gedeeld command nodig? Registreer het dan hieronder; de typings in
// resources/cypress-commands/cypress-chainable.d.ts specifiëren ze alle 11, dus een niet-geregistreerd command
// compileert wel, maar faalt at runtime.
Cypress.Commands.add('visitWithA11y', (url) => {
    cy.visit(url);
    cy.injectAxe();
});
