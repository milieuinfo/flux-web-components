import { TemplateResult } from 'lit';
import '../../cypress-commands/cypress-chainable';
import { Options } from '@simonsmith/cypress-image-snapshot';

declare global {
    namespace Cypress {
        interface Chainable<Subject> {
            mount(template: TemplateResult): Chainable<Subject>;
            matchImageSnapshot(nameOrOptions?: string | Options, options?: Options): Chainable<Subject>;
        }
    }
}
