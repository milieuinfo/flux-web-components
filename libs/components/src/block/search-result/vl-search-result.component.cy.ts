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

    it('should not overlap sibling when title wraps over multiple lines', () => {
        cy.mount(html`
            <vl-search-result>
                <vl-search-result-title>
                    <a href="#">
                        Dit is een heel lange zoekresultaattitel die zeker over meerdere regels wrapt in een normale viewport breedte zodat we overlap met de volgende sibling kunnen detecteren
                    </a>
                </vl-search-result-title>
                <vl-search-result-text>
                    <time>Maandag 22 oktober 2018</time>
                </vl-search-result-text>
            </vl-search-result>
        `);

        cy.get('vl-search-result')
            .shadow()
            .find('vl-search-result-title')
            .then(($title) => {
                const titleBottom = $title[0].getBoundingClientRect().bottom;
                cy.get('vl-search-result')
                    .shadow()
                    .find('vl-search-result-text')
                    .then(($text) => {
                        const textTop = $text[0].getBoundingClientRect().top;
                        expect(textTop).to.be.gte(titleBottom);
                    });
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

    it('should update properties shadow DOM when a light DOM text node is mutated in-place', () => {
        cy.get('vl-search-result')
            .shadow()
            .find('vl-search-result-properties')
            .shadow()
            .find('dd')
            .first()
            .should('contain.text', 'Verkiezingsresultaten op Vlaanderenkiest.be...');

        cy.get('vl-search-result').then(($searchResult) => {
            const textNode = $searchResult[0].shadowRoot?.querySelector(
                'vl-search-result-properties vl-property-data'
            )?.firstChild;
            textNode!.textContent = 'Bijgewerkte verkiezingsresultaten';
        });

        cy.get('vl-search-result')
            .shadow()
            .find('vl-search-result-properties')
            .shadow()
            .find('dd')
            .first()
            .should('contain.text', 'Bijgewerkte verkiezingsresultaten');
    });

    it('should update properties shadow DOM when a light DOM attribute is mutated in-place', () => {
        // het mount-command ruimt enkel op tussen tests, niet binnen een test: de container leegmaken zodat de
        // eigen mount hieronder niet naast de beforeEach-mount terechtkomt
        cy.document().then((doc) => (doc.querySelector('[data-cy-root]')!.innerHTML = ''));
        cy.mount(html`
            <vl-search-result>
                <vl-search-result-properties>
                    <vl-property>Vlaanderenkiest.be</vl-property>
                    <vl-property-data><span style="color: blue">Verkiezingsresultaten</span></vl-property-data>
                </vl-search-result-properties>
            </vl-search-result>
        `);

        cy.get('vl-search-result')
            .shadow()
            .find('vl-search-result-properties')
            .shadow()
            .find('dd')
            .first()
            .find('span')
            .should('have.attr', 'style', 'color: blue');

        cy.get('vl-search-result').then(($searchResult) => {
            const span = $searchResult[0].shadowRoot?.querySelector('vl-search-result-properties vl-property-data span');
            span!.setAttribute('style', 'color: red');
        });

        cy.get('vl-search-result')
            .shadow()
            .find('vl-search-result-properties')
            .shadow()
            .find('dd')
            .first()
            .find('span')
            .should('have.attr', 'style', 'color: red');
    });
});
