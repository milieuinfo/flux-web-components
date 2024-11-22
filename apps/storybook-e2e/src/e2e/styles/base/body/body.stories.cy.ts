const bodyNextDefaultUrl =
    'http://localhost:8080/iframe.html?id=styles-next-base-intern-body--body-default&viewMode=story';

describe('story - body-next - default', () => {
    it('should render', () => {
        cy.visit(bodyNextDefaultUrl);

        cy.get('body')
            .find('#root-inner')
            .find('div')
            .shouldHaveComputedStyle({ style: 'color', value: 'rgb(51, 51, 50)' })
            .invoke('text')
            .should('contain', 'Deze specifieke <body> en <html> styling wordt automatisch op het document gezet.');
    });
});
