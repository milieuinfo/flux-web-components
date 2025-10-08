const searchResultDefaultUrl =
    'http://localhost:8080/iframe.html?id=components-block-search-result--search-result-default&viewMode=story';
const searchResultGroupUrl =
    'http://localhost:8080/iframe.html?id=components-block-search-result--search-result-group&viewMode=story';

describe('cypress-e2e - block components - vl-search-result - default story', () => {
    it('should render', () => {
        cy.visit(searchResultDefaultUrl);

        cy.get('vl-search-result').shadow().find('vl-search-result-title');
    });
});

describe('cypress-e2e - block components - vl-search-result - group story', () => {
    it('should render', () => {
        cy.visit(searchResultGroupUrl);

        cy.get('vl-search-result').eq(1).shadow().find('vl-search-result-title');
    });
});
