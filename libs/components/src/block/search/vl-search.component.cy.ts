import { registerWebComponents } from '@domg-wc/common';
import { html } from 'lit';
import { VlSearchComponent } from './vl-search.component';

registerWebComponents([VlSearchComponent]);

describe('cypress-component - block components - vl-search', () => {
    beforeEach(() => {
        // private static enkel op compile-time; reset de "warn once"-vlag voor test-isolatie
        (VlSearchComponent as unknown as { deprecationWarningShown: boolean }).deprecationWarningShown = false;
    });

    it('should mount', () => {
        cy.mount(html` <vl-search></vl-search>`);

        cy.get('vl-search').shadow().find('.vl-search');
    });

    it('should warn once that the component is deprecated', () => {
        cy.spy(console, 'warn').as('warn');

        cy.mount(html` <vl-search></vl-search>`);

        cy.get('@warn').should('have.been.calledOnce');
        cy.get('@warn').should(
            'have.been.calledWith',
            'vl-search is deprecated en wordt verwijderd in v3. Bouw een zoekformulier met de input-group' +
                ' (vl-input-field + vl-button met loading), zie het zoek-patroon onder Patronen/Zoeken.'
        );
    });
});
