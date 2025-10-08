const bodyDefaultUrl = 'http://localhost:8080/iframe.html?id=styles-base-body--body-default&viewMode=story';

describe('cypress-e2e - styles - body - default story', () => {
    it('should render', () => {
        cy.visit(bodyDefaultUrl);

        cy.get('body')
            .find('#root-inner')
            .find('div')
            .shouldHaveComputedStyle({ style: 'color', value: 'rgb(51, 51, 50)' })
            .invoke('text')
            .should('contain', 'Deze specifieke <body> en <html> styling wordt automatisch op het document gezet.');
    });
});
