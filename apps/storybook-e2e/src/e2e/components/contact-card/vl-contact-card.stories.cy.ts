const contactCardUrl =
    'http://localhost:8080/iframe.html?id=components-contact-card--contact-card-default&viewMode=story';

describe('story vl-contact-card', () => {
    it('should be accessible', () => {
        cy.visitWithA11y(`${contactCardUrl}`);
    });

    it('should contain a title', () => {
        cy.visit(`${contactCardUrl}`);
        cy.get('vl-contact-card').find('vl-infoblock').shadow().find('h2').contains('Departement Onderwijs en Vorming');
    });

    // TODO wordt gefixt in `vl-properties-next`-vervangingsbranch
    it.skip('should contain an address', () => {
        cy.visit(`${contactCardUrl}`);
        cy.get('vl-contact-card')
            .get('.vl-properties__list')
            .children()
            .eq(0)
            .contains('Adres')
            .next()
            .contains('Hendrik Consciencegebouw')
            .next()
            .contains('Telefoon')
            .next()
            .find('.vl-link')
            .contains('02 553 72 02')
            .parent()
            .parent()
            .next()
            .contains('E-mail')
            .next()
            .find('.vl-link')
            .contains('onderwijs.vlaanderen@vlaanderen.be')
            .parent()
            .next()
            .contains('Website')
            .next()
            .find('.vl-link')
            .contains('http://onderwijs.vlaanderen.be');
    });
});
