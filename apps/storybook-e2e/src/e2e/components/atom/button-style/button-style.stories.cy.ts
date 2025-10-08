const buttonStyleDefaultUrl =
'http://localhost:8080/iframe.html?id=components-atom-button-style--button-style-default&viewMode=story';
const buttonStyleLinkUrl =
    'http://localhost:8080/iframe.html?id=components-atom-button-style--button-style-link&viewMode=story';

describe('story - button - default', () => {
    it('should render', () => {
        cy.visit(buttonStyleDefaultUrl);

        cy.get('button.sb-button').should('exist');
    });
});

describe('story - button - link', () => {
    it('should render', () => {
        cy.visit(buttonStyleLinkUrl);

        cy.get('a.sb-button').should('exist');
    });
});
