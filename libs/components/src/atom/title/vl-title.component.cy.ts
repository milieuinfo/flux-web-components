import { html } from 'lit';
import { registerWebComponents } from '@domg-wc/common';
import { VlTitleComponent } from './vl-title.component';

registerWebComponents([VlTitleComponent]);

describe('cypress-component - atom components - vl-title', () => {
    it('should mount', () => {
        cy.mount(html` <vl-title></vl-title>`);

        cy.get('vl-title').shadow().find('h1');
    });

    it('should be accessible', () => {
        cy.mount(html` <vl-title>Vlaanderen</vl-title>`);
        cy.injectAxe();

        cy.checkA11y('vl-title');
    });

    it('should set different title type', () => {
        cy.mount(html` <vl-title type="h2"></vl-title>`);

        cy.get('vl-title').should('have.attr', 'type', 'h2');
        cy.get('vl-title').shadow().find('h2');
    });

    it('should set underline', () => {
        cy.mount(html` <vl-title underline></vl-title>`);

        cy.get('vl-title').should('have.attr', 'underline');
        cy.get('vl-title').shadow().find('h1').should('have.class', 'underline');
        cy.get('vl-title')
            .shadow()
            .find('h1')
            .shouldHaveComputedStyle({ style: 'border-bottom', value: '1px solid rgb(203, 210, 218)' });
    });

    it('should set alt', () => {
        cy.mount(html` <vl-title alt></vl-title>`);

        cy.get('vl-title').should('have.attr', 'alt');
        cy.get('vl-title').shadow().find('h1').should('have.class', 'alt');
    });

    it('should set no space bottom', () => {
        cy.mount(html` <vl-title no-space-bottom></vl-title>`);

        cy.get('vl-title').should('have.attr', 'no-space-bottom');
        cy.get('vl-title').shadow().find('h1').should('have.class', 'no-space-bottom');
    });

    it('should set content', () => {
        cy.mount(html` <vl-title>Vlaanderen</vl-title>`);

        cy.get('vl-title').shadow().find('h1').find('slot');
        cy.get('vl-title').contains('Vlaanderen');
    });

    it('should set appearance', () => {
        cy.mount(html` <vl-title type="h2" appearance="h3">Vlaanderen</vl-title>`);

        cy.get('vl-title').should('have.attr', 'appearance', 'h3');
        cy.get('vl-title').shadow().find('h2').should('have.class', 'h3');
    });

    it('should keep ordinary words whole on a small screen when the page has a language', () => {
        cy.viewport(320, 640);
        cy.mount(html`
            <div lang="nl">
                <vl-title type="h2">Overzicht van uw aanvragen en meldingen</vl-title>
            </div>
        `);

        // Een woord dat over twee regels verdeeld is (afgebroken met een koppelteken) heeft meer dan één rechthoek.
        cy.get('vl-title')
            .shadow()
            .find('h2')
            .then(([heading]) => {
                expect(heading.getBoundingClientRect().height).to.be.greaterThan(
                    parseFloat(getComputedStyle(heading).lineHeight) * 1.5,
                );
            });
        cy.get('vl-title').then(([title]) => {
            const text = title.firstChild as Text;
            const range = document.createRange();
            const brokenWords = [...text.data.matchAll(/\S+/g)]
                .filter((match) => {
                    range.setStart(text, match.index);
                    range.setEnd(text, match.index + match[0].length);
                    return range.getClientRects().length > 1;
                })
                .map((match) => match[0]);
            expect(brokenWords).to.deep.equal([]);
        });
    });

    it('should hyphenate a long word instead of overflowing on a small screen when the page has a language', () => {
        cy.viewport(320, 640);
        cy.mount(html`
            <div lang="nl">
                <vl-title type="h1">Toegankelijkheidsverklaring</vl-title>
            </div>
        `);

        // Of de browser effectief een koppelteken zet, hangt af van het woordenboek van het platform (op macOS wel,
        // in een Linux-CI niet zeker). Daarom controleren we de stijl en dat de kop niet over de rand loopt.
        cy.get('vl-title')
            .shadow()
            .find('h1')
            .should('have.css', 'hyphens', 'auto')
            .then(([heading]) => {
                expect(heading.scrollWidth).to.be.at.most(heading.clientWidth);
            });
    });

    it('should wrap a long word instead of overflowing on a small screen without a language', () => {
        cy.viewport(320, 640);
        cy.mount(html` <vl-title type="h1">Toegankelijkheidsverklaring</vl-title>`);

        cy.get('vl-title')
            .shadow()
            .find('h1')
            .then(([heading]) => {
                expect(heading.scrollWidth).to.be.at.most(heading.clientWidth);
            });
    });

    it('should not break a word in a narrow flex row on a desktop screen', () => {
        cy.viewport(1280, 800);
        cy.mount(html`
            <div style="display: flex; width: 900px">
                <vl-title type="h2">Toegankelijkheidsverklaring</vl-title>
                <p style="margin: 0">
                    Een lange paragraaf met heel wat tekst die naast de titel staat en ook ruimte vraagt in dezelfde
                    rij, zodat de rij te krap wordt en de elementen moeten krimpen om erin te passen.
                </p>
            </div>
        `);

        // Op desktop blijft de titel minstens zo breed als zijn langste woord; de paragraaf krimpt.
        cy.get('vl-title')
            .shadow()
            .find('h2')
            .should('not.have.css', 'hyphens', 'auto')
            .then(([heading]) => {
                const lineHeight = parseFloat(getComputedStyle(heading).lineHeight);
                expect(heading.getBoundingClientRect().height).to.be.lessThan(lineHeight * 1.5);
            });
    });
});
