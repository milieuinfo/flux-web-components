import { registerWebComponents } from '@domg-wc/common';
import { watchStyleAttributeCspViolations } from '@resources/utils-test';
import { html } from 'lit';
import { VlProgressBarComponent } from './vl-progress-bar.component';

registerWebComponents([VlProgressBarComponent]);

const shouldHaveProgressWidth = (percentage: number) =>
    cy
        .get('vl-progress-bar')
        .shadow()
        .find('.vl-progress-bar__track')
        .should(([track]) => {
            const trackWidth = track.getBoundingClientRect().width;
            const progressWidth = track.querySelector('.vl-progress-bar__progress')?.getBoundingClientRect().width;

            expect(progressWidth).to.be.closeTo((trackWidth * percentage) / 100, 0.5);
        });

const emulateReducedMotion = (reduce: boolean) =>
    cy.then(() =>
        Cypress.automation('remote:debugger:protocol', {
            command: 'Emulation.setEmulatedMedia',
            params: { features: reduce ? [{ name: 'prefers-reduced-motion', value: 'reduce' }] : [] },
        })
    );

describe('cypress-component - block components - vl-progress-bar - strict CSP', () => {
    it('should update the width of the progress indicator when the value changes without CSP violations', () => {
        const cspWatcher = watchStyleAttributeCspViolations();
        cy.mount(html`<vl-progress-bar value="20" label="Voortgang"></vl-progress-bar>`);
        shouldHaveProgressWidth(20);

        cy.get('vl-progress-bar').invoke('attr', 'value', '80');
        shouldHaveProgressWidth(80);

        cy.then(() => cspWatcher.stop()).should('deep.equal', []);
    });

    it('should limit the width of the progress indicator to the range 0-100 without CSP violations', () => {
        const cspWatcher = watchStyleAttributeCspViolations();
        cy.mount(html`<vl-progress-bar value="150" label="Voortgang"></vl-progress-bar>`);
        shouldHaveProgressWidth(100);

        cy.get('vl-progress-bar').invoke('attr', 'value', '-20');
        shouldHaveProgressWidth(0);

        cy.then(() => cspWatcher.stop()).should('deep.equal', []);
    });

    it('should show the value width and switch to indeterminate and back without CSP violations', () => {
        const cspWatcher = watchStyleAttributeCspViolations();
        cy.mount(html`<vl-progress-bar value="40" label="Voortgang"></vl-progress-bar>`);
        shouldHaveProgressWidth(40);

        cy.get('vl-progress-bar').invoke('attr', 'indeterminate', '');
        shouldHaveProgressWidth(66.666);

        cy.get('vl-progress-bar').invoke('removeAttr', 'indeterminate');
        shouldHaveProgressWidth(40);

        cy.then(() => cspWatcher.stop()).should('deep.equal', []);
    });

    it('should render an indeterminate progress bar without CSP violations', () => {
        const cspWatcher = watchStyleAttributeCspViolations();
        cy.mount(html`<vl-progress-bar indeterminate label="Voortgang"></vl-progress-bar>`);
        shouldHaveProgressWidth(66.666);

        cy.then(() => cspWatcher.stop()).should('deep.equal', []);
    });

    describe('with reduced motion', () => {
        beforeEach(() => {
            emulateReducedMotion(true);
        });

        afterEach(() => {
            emulateReducedMotion(false);
        });

        it('should show the full width when switching to indeterminate without CSP violations', () => {
            const cspWatcher = watchStyleAttributeCspViolations();
            cy.mount(html`<vl-progress-bar value="40" label="Voortgang"></vl-progress-bar>`);
            shouldHaveProgressWidth(40);

            cy.get('vl-progress-bar').invoke('attr', 'indeterminate', '');
            shouldHaveProgressWidth(100);

            cy.then(() => cspWatcher.stop()).should('deep.equal', []);
        });
    });
});
