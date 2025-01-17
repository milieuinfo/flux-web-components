import { registerWebComponents } from '@domg-wc/common-utilities';
import { GlobalStyles } from '@domg-wc/common-utilities/css';
import { html } from 'lit';
import { VlSearchResultComponent } from './vl-search-result.component';

registerWebComponents([VlSearchResultComponent]);

describe('component - vl-search-result-next', () => {

    beforeEach(() => {
        cy.viewport(960, 1440);
        cy.then(() => GlobalStyles.register());
        cy.mount(html`
            <vl-search-result-next>
                <vl-search-result-title-next>
                    <a href="#">Vlaanderenkiest.be</a>
                </vl-search-result-title-next>
                <vl-search-result-text-next>
                    <time>Maandag 22 oktober 2018</time>
                </vl-search-result-text-next>
                <vl-search-result-properties-next>
                    <label>Vlaanderenkiest.be</label>
                    <data>Verkiezingsresultaten op Vlaanderenkiest.be...</data>
                    <label>Vlaanderen intern</label>
                    <data>Werkt u bij de Vlaamse overheid...</data>
                </vl-search-result-properties-next>
            </vl-search-result-next>
        `);
    });

    it('should mount', () => {
        cy.get('vl-search-result-next').shadow().find('vl-search-result-title-next');
    });

    it('should be accessible', () => {
        cy.injectAxe();
        cy.checkA11y('vl-search-result-next');
    });

    it('should have a title', () => {
        cy.get('vl-search-result-next')
            .shadow()
            .find('vl-search-result-title-next')
            .find('a')
            .should('contain.text', 'Vlaanderenkiest.be');
        cy.get('vl-search-result-next').shadow().find('vl-search-result-title-next').shouldHaveComputedStyle({
            style: 'font-size',
            value: '20px',
        });
    });

    it('should have a text', () => {
        cy.get('vl-search-result-next')
            .shadow()
            .find('vl-search-result-text-next')
            .find('time')
            .should('contain.text', 'Maandag 22 oktober 2018');
        cy.get('vl-search-result-next').shadow().find('vl-search-result-text-next').shouldHaveComputedStyle({
            style: 'margin-bottom',
            value: '15px',
        });
    });

    it('should have properties', () => {
        // enkel een test dat de properties component correct werkt, de properties component zelf doet voldoende testen
        cy.get('vl-search-result-next')
            .shadow()
            .find('vl-search-result-properties-next')
            .shadow()
            .find('dt')
            .first()
            .should('contain.text', 'Vlaanderenkiest.be');
    });
});
