const templateDefaultUrl =
    'http://localhost:8080/iframe.html?args=&id=components-block-template--template-default&viewMode=story';

describe('cypress-e2e - block components - vl-template - default story', () => {
    it('should render', () => {
        cy.visit(`${templateDefaultUrl}`);
        cy.get('vl-template')
            .shadow()
            .getDataCy('template-content')
            .find('vl-title[type="h1"]')
            .contains('vl-template');
    });
});
