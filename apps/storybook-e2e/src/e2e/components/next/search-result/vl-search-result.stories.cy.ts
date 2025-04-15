const searchResultNextDefaultUrl =
    'http://localhost:8080/iframe.html?id=components-search-result--search-result-default&viewMode=story';
const searchResultNextGroupUrl =
    'http://localhost:8080/iframe.html?id=components-search-result--search-result-group&viewMode=story';

describe('story - vl-search-result - default', () => {
    it('should render', () => {
        cy.visit(searchResultNextDefaultUrl);

        cy.get('vl-search-result').shadow().find('vl-search-result-title');
    });
});

describe('story - vl-search-result - group', () => {
    it('should render', () => {
        cy.visit(searchResultNextGroupUrl);

        cy.get('vl-search-result').eq(1).shadow().find('vl-search-result-title');
    });
});
