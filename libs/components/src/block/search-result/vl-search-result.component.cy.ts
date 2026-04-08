import { GlobalStyles, registerWebComponents } from '@domg-wc/common';
import { html } from 'lit';
import { VlSearchResultComponent } from './vl-search-result.component';

registerWebComponents([VlSearchResultComponent]);

describe('cypress-component - block components - vl-search-result', () => {
    beforeEach(() => {
        cy.viewport(960, 1440);
        cy.then(() => GlobalStyles.getInstance().register());
        cy.mount(html`
            <vl-search-result>
                <vl-search-result-title>
                    <a href="#">Vlaanderenkiest.be</a>
                </vl-search-result-title>
                <vl-search-result-text>
                    <time>Maandag 22 oktober 2018</time>
                </vl-search-result-text>
                <vl-search-result-properties>
                    <vl-property>Vlaanderenkiest.be</vl-property>
                    <vl-property-data>Verkiezingsresultaten op Vlaanderenkiest.be...</vl-property-data>
                    <vl-property>Vlaanderen intern</vl-property>
                    <vl-property-data>Werkt u bij de Vlaamse overheid...</vl-property-data>
                </vl-search-result-properties>
            </vl-search-result>
        `);
    });

    it('should mount', () => {
        cy.get('vl-search-result').shadow().find('vl-search-result-title');
    });

    it('should be accessible', () => {
        cy.injectAxe();
        cy.checkA11y('vl-search-result');
    });

    it('should have a title', () => {
        cy.get('vl-search-result')
            .shadow()
            .find('vl-search-result-title')
            .find('a')
            .should('contain.text', 'Vlaanderenkiest.be');
        cy.get('vl-search-result').shadow().find('vl-search-result-title').shouldHaveComputedStyle({
            style: 'font-size',
            value: '20px',
        });
    });

    it('should have a text', () => {
        cy.get('vl-search-result')
            .shadow()
            .find('vl-search-result-text')
            .find('time')
            .should('contain.text', 'Maandag 22 oktober 2018');
        cy.get('vl-search-result').shadow().find('vl-search-result-text').shouldHaveComputedStyle({
            style: 'margin-bottom',
            value: '15px',
        });
    });

    it('should have properties', () => {
        // enkel een test dat de properties component correct werkt, de properties component zelf doet voldoende testen
        cy.get('vl-search-result')
            .shadow()
            .find('vl-search-result-properties')
            .shadow()
            .find('dt')
            .first()
            .should('contain.text', 'Vlaanderenkiest.be');
    });
});
