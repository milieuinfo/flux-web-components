const templateUrl = 'http://localhost:8080/iframe.html?args=&id=components-template--template-default&viewMode=story';

describe('story vl-template', () => {
    it('should render', () => {
        cy.visit(`${templateUrl}`);
        cy.get('vl-template')
            .shadow()
            .getDataCy('template-content')
            .find('vl-title[type="h1"]')
            .contains('vl-template');
    });
});
