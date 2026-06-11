import { registerWebComponents } from '@domg-wc/common';
import { html } from 'lit';
import { VlShareButton } from './vl-share-button.component';
import { VlShareButtonsComponent } from './vl-share-buttons.component';

registerWebComponents([VlShareButtonsComponent, VlShareButton]);

describe('cypress-component - block components - vl-share-buttons', () => {
    it('should mount', () => {
        cy.mount(html` <vl-share-buttons></vl-share-buttons>`);

        cy.get('vl-share-buttons').shadow().find('.vl-share-buttons');
    });

    it('should warn once that the component is deprecated', () => {
        cy.spy(console, 'warn').as('warn');

        cy.mount(html` <vl-share-buttons></vl-share-buttons>`);

        cy.get('@warn').should('have.been.calledOnce');
        cy.get('@warn').should(
            'have.been.calledWith',
            'vl-share-buttons is deprecated en wordt verwijderd in v3. Gebruik een vl-button met cta-link, icon en label, bv. <vl-button cta-link="…" icon="facebook" label="Delen op Facebook">.'
        );
    });
});

describe('cypress-component - block components - vl-share-button', () => {
    it('should mount', () => {
        cy.mount(html` <vl-share-button href="#" medium="facebook"></vl-share-button>`);

        cy.get('vl-share-button').shadow().find('.vl-share-button');
    });

    it('should warn once that the component is deprecated', () => {
        cy.spy(console, 'warn').as('warn');

        cy.mount(html` <vl-share-button href="#" medium="facebook"></vl-share-button>`);

        cy.get('@warn').should('have.been.calledOnce');
        cy.get('@warn').should(
            'have.been.calledWith',
            'vl-share-button is deprecated en wordt verwijderd in v3. Gebruik een vl-button met cta-link, icon en label, bv. <vl-button cta-link="…" icon="facebook" label="Delen op Facebook">.'
        );
    });
});
