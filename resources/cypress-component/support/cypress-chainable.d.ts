import { TemplateResult } from 'lit';
import '../../cypress-commands/cypress-chainable';

declare global {
    namespace Cypress {
        interface Chainable<Subject> {
            mount(template: TemplateResult): Chainable<Subject>;
        }
    }
}
