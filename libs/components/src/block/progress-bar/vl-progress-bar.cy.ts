import { registerWebComponents } from '@domg-wc/common';
import { html } from 'lit';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { VlProgressBarComponent } from './vl-progress-bar.component';

registerWebComponents([VlProgressBarComponent]);

const mountDefault = ({ value, indeterminate, label, labelledby }: { value?: number; indeterminate?: boolean; label?: string; labelledby?: string } = {}) => {
    return cy.mount(html`
        ${labelledby
            ? html`<span id=${labelledby}>Progress bar label</span>`
            : ''}
        <vl-progress-bar
            value=${ifDefined(indeterminate ? undefined : (value || 0))}
            ?indeterminate=${indeterminate}
            label=${ifDefined(label)}
            labelledby=${ifDefined(labelledby)}
        ></vl-progress-bar>
    `);
};

describe('component vl-progress-bar', () => {
    beforeEach(() => {
        cy.spy(console, 'warn').as('consoleWarn');
    });

    it('should mount', () => {
        mountDefault();

        cy.get('vl-progress-bar').shadow().find('.vl-progress-bar');
    });

    it('should be accessible', () => {
        mountDefault();
        
        cy.injectAxe();
        cy.checkA11y('vl-progress-bar');
    });

    it('should reflect value correctly', () => {
        const value = 65;
        mountDefault({ value });

        cy.get('vl-progress-bar')
            .shadow()
            .find('.vl-progress-bar')
            .should('have.attr', 'aria-valuenow', String(value));
    });

    it('should set correct ARIA attributes for a determinate progress bar', () => {
        const value = 50;
        mountDefault({ value });

        cy.get('vl-progress-bar')
            .shadow()
            .find('.vl-progress-bar')
            .should('have.attr', 'role', 'progressbar')
            .should('have.attr', 'aria-valuenow', String(value));
    });

    it('should set aria-label', () => {
        const label = 'Bestanden uploaden';
        mountDefault({ label });

        cy.get('vl-progress-bar').shadow().find('.vl-progress-bar').should('have.attr', 'aria-label', label);
    });

    it('should set aria-labelledby', () => {
        const labelledby = 'progress-label';
        mountDefault({ labelledby });

        cy.get('vl-progress-bar').shadow().find('.vl-progress-bar').should('have.attr', 'aria-labelledby', labelledby);
        cy.get(`#${labelledby}`).should('exist');
    });

    it('should warn when no accessible name is provided', () => {
        mountDefault({});

        cy.get('@consoleWarn').should('have.been.called');
    });

    it('should display correctly in indeterminate state', () => {
        mountDefault({ indeterminate: true });

        cy.get('vl-progress-bar')
            .shadow()
            .find('.vl-progress-bar')
            .should('not.have.attr', 'aria-valuenow');
    });

    it('should not have aria-valuenow when indeterminate', () => {
        mountDefault({ indeterminate: true, value: 50 });

        cy.get('vl-progress-bar').shadow().find('.vl-progress-bar').should('not.have.attr', 'aria-valuenow');
    });

    it('should have correct width for the progress indicator', () => {
        const value = 75;
        mountDefault({ value });

        cy.get('vl-progress-bar').shadow().find('.vl-progress-bar').then(([progressBar]) => {
            const trackWidth = progressBar.querySelector('.vl-progress-bar__track')?.getBoundingClientRect().width;
            const progressWidth = progressBar.querySelector('.vl-progress-bar__progress')?.getBoundingClientRect().width;

            if (trackWidth && progressWidth) {
                expect(trackWidth / 100 * value).to.equal(progressWidth)
                return;
            }

            throw new Error('trackWidth or progressWidth is undefined')
        
        });
    });
});