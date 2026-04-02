const consumerFatLibUrl = 'http://localhost:8080';

describe('consumer-fat-lib application', () => {
    it('should be accessible', () => {
        cy.visitWithA11y(consumerFatLibUrl);
        cy.configureAxe({
            rules: [
                {
                    id: 'color-contrast',
                    enabled: false,
                },
            ],
        });
        cy.checkA11y('#domg-wc-compliance');
    });

    it('should render the page title', () => {
        cy.visit(consumerFatLibUrl);
        cy.get('vl-title[type="h1"]').should('contain.text', 'Consumer App - fat-lib');
    });

    it('should render the accessibility declaration', () => {
        cy.visit(consumerFatLibUrl);
        cy.get('#domg-wc-compliance')
            .find('vl-accessibility')
            .shadow()
            .find('vl-title[type="h1"]')
            .should('contain.text', 'Toegankelijkheidsverklaring');
    });

    it('should render the header container', () => {
        cy.visit(consumerFatLibUrl);
        cy.get('#header__container').find('#vl-global-header').should('exist');
    });

    it('should render the footer container', () => {
        cy.visit(consumerFatLibUrl);
        cy.get('#footer__container').find('.vlw__footer').should('exist');
    });
});
