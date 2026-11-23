import { registerWebComponents } from '@domg-wc/common';
import { watchStyleAttributeCspViolations } from '@resources/utils-test';
import { html } from 'lit';
import { VlAccessibility } from './vl-accessibility.component';
import { COMPLIANCE_STATUS, EVALUATION_STATUS } from './vl-accessibility.model';

registerWebComponents([VlAccessibility]);

describe('cypress-component - compliance components - vl-accessibility - strict CSP', () => {
    Object.values(COMPLIANCE_STATUS).forEach((compliance) => {
        Object.values(EVALUATION_STATUS).forEach((evaluation) => {
            const fullyCompliant = compliance === COMPLIANCE_STATUS.FULLY_COMPLIANT;
            const title =
                `should ${fullyCompliant ? 'not render' : 'show'} the inaccessible content without CSP violations ` +
                `for ${compliance} and ${evaluation}`;

            it(title, () => {
                const cspWatcher = watchStyleAttributeCspViolations();
                cy.mount(html`<vl-accessibility compliance=${compliance} evaluation=${evaluation}></vl-accessibility>`);

                // eerst een kop die er altijd is: anders slaagt 'not.exist' ook vóór de eerste render
                cy.get('vl-accessibility').shadow().find('vl-title#compliance-status').should('be.visible');
                cy.get('vl-accessibility')
                    .shadow()
                    .find('vl-title#inaccessible-content')
                    .should(fullyCompliant ? 'not.exist' : 'be.visible');

                cy.then(() => cspWatcher.stop()).should('deep.equal', []);
            });
        });
    });
});
