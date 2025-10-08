const fontNormalUrl =
    'http://localhost:8080/iframe.html?id=styles-base-font--font-flanders-art-sans-normal&viewMode=story';
const fontItalicUrl =
    'http://localhost:8080/iframe.html?id=styles-base-font--font-flanders-art-sans-italic&viewMode=story';

describe('cypress-e2e - styles - font - normal story', () => {
    it('should render', () => {
        cy.visit(fontNormalUrl);

        cy.get('.sb-font-normal.vl-font--weight-300')
            .find('.sb-font-title')
            .shouldHaveComputedStyle({ style: 'font-size', value: '20px' })
            .invoke('text')
            .should('contain', 'Flanders Art Sans - normal - weight 300');
    });
});

describe('cypress-e2e - styles - font - italic story', () => {
    it('should render', () => {
        cy.visit(fontItalicUrl);

        cy.get('.sb-font-italic.vl-font--weight-300')
            .find('.sb-font-title')
            .shouldHaveComputedStyle({ style: 'font-size', value: '20px' })
            .invoke('text')
            .should('contain', 'Flanders Art Sans - italic - weight 300');
    });
});
