import { html } from 'lit';
import { registerWebComponents } from '@domg-wc/common';
import { VlLoaderComponent } from './vl-loader.component';

registerWebComponents([VlLoaderComponent]);

describe('cypress-component - block components - vl-loader', () => {
    it('should be accessible', () => {
        cy.mount(html`<vl-loader></vl-loader>`);
        cy.injectAxe();
        cy.checkA11y('vl-loader');
    });

    it('should show default text when no attribute or slot content is provided', () => {
        cy.mount(html`<vl-loader></vl-loader>`);
        cy.get('vl-loader').shadow().find('#text').should('contain.text', 'Pagina is aan het laden');
    });

    it('should show text attribute value', () => {
        cy.mount(html`<vl-loader text="Gegevens laden"></vl-loader>`);
        cy.get('vl-loader').shadow().find('#text').should('contain.text', 'Gegevens laden');
    });

    it('should show text attribute value with close tag on next line', () => {
        cy.mount(
            html`<vl-loader text="Gegevens laden">
                 </vl-loader>`
        );
        cy.get('vl-loader').shadow().find('#text').should('contain.text', 'Gegevens laden');
    });

    it('should show text attribute value when whitespace-only content is between open and close tags', () => {
        cy.mount(html`<vl-loader text="foobar"></vl-loader>`);
        cy.get('vl-loader').then(($el) => {
            $el[0].appendChild(document.createTextNode('\n'));
        });
        cy.get('vl-loader').shadow().find('#text').should('contain.text', 'foobar');
    });

    it('should show default text when whitespace-only content is between open and close tags without text attribute', () => {
        cy.mount(html`<vl-loader></vl-loader>`);
        cy.get('vl-loader').then(($el) => {
            $el[0].appendChild(document.createTextNode('\n'));
        });
        cy.get('vl-loader').shadow().find('#text').should('contain.text', 'Pagina is aan het laden');
    });

    it('should show custom slot content', () => {
        cy.mount(html`
            <vl-loader>
                <span>Aangepaste tekst</span>
            </vl-loader>
        `);
        cy.get('vl-loader').contains('Aangepaste tekst');
    });

    it('should apply light styling', () => {
        cy.mount(html`<vl-loader light></vl-loader>`);
        cy.get('vl-loader').shadow().find('.vl-loader').should('have.class', 'vl-loader--light');
    });

    it('should visually hide text when single attribute is set', () => {
        cy.mount(html`<vl-loader single></vl-loader>`);
        cy.get('vl-loader').shadow().find('#text').should('have.class', 'vl-u-visually-hidden');
    });
});
