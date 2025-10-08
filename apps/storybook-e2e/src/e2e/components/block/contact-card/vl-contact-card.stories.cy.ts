const contactCardUrl =
    'http://localhost:8080/iframe.html?id=components-block-contact-card--contact-card-default&viewMode=story';

describe('cypress-e2e - block components - vl-contact-card - default story', () => {
    it('should be accessible', () => {
        cy.visitWithA11y(`${contactCardUrl}`);
    });

    it('should contain a title', () => {
        cy.visit(`${contactCardUrl}`);
        cy.get('vl-contact-card').find('vl-infoblock').shadow().find('h2').contains('Departement Onderwijs en Vorming');
    });

    it('should contain an address', () => {
        cy.visit(`${contactCardUrl}`);

        cy.get('vl-contact-card')
            .find(`vl-properties`)
            .shadow()
            .children()
            .eq(0)
            .contains('Adres')
            .next()
            .contains('Hendrik Consciencegebouw')
            .next()
            .contains('Koning Albert II-laan 15')
            .next()
            .contains('1210 Brussel')
            .next()
            .contains('Routeplanner');

        cy.get('vl-contact-card')
            .find(`vl-properties`)
            .shadow()
            .children()
            .eq(0)
            .contains('Telefoon')
            .next()
            .contains('02 553 72 02')
            .parent();

        cy.get('vl-contact-card')
            .find(`vl-properties`)
            .shadow()
            .children()
            .eq(0)
            .contains('E-mail')
            .next()
            .contains('onderwijs.vlaanderen@vlaanderen.be');

        cy.get('vl-contact-card')
            .find(`vl-properties`)
            .shadow()
            .children()
            .eq(0)
            .contains('Website')
            .next()
            .contains('http://onderwijs.vlaanderen.be');
    });
});
