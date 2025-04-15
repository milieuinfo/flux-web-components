const fontNextNormalUrl =
    'http://localhost:8080/iframe.html?id=styles-base-intern-font--font-flanders-art-sans-normal&viewMode=story';
const fontNextItalicUrl =
    'http://localhost:8080/iframe.html?id=styles-base-intern-font--font-flanders-art-sans-italic&viewMode=story';
const fontNextSerifUrl =
    'http://localhost:8080/iframe.html?id=styles-base-intern-font--font-flanders-art-serif&viewMode=story';

describe('story - font - normal', () => {
    it('should render', () => {
        cy.visit(fontNextNormalUrl);

        cy.get('.sb-font-normal.vl-font--weight-300')
            .find('.sb-font-title')
            .shouldHaveComputedStyle({ style: 'font-size', value: '20px' })
            .invoke('text')
            .should('contain', 'Flanders Art Sans - normal - weight 300');
    });
});

describe('story - font - italic', () => {
    it('should render', () => {
        cy.visit(fontNextItalicUrl);

        cy.get('.sb-font-italic.vl-font--weight-300')
            .find('.sb-font-title')
            .shouldHaveComputedStyle({ style: 'font-size', value: '20px' })
            .invoke('text')
            .should('contain', 'Flanders Art Sans - italic - weight 300');
    });
});
