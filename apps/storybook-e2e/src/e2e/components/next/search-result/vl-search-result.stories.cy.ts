const searchResultNextDefaultUrl =
    'http://localhost:8080/iframe.html?id=components-next-search-result--search-result-default&viewMode=story';
const searchResultNextGroupUrl =
    'http://localhost:8080/iframe.html?id=components-next-search-result--search-result-group&viewMode=story';

describe('story - vl-search-result-next - default', () => {
    it('should render', () => {
        cy.visit(searchResultNextDefaultUrl);

        cy.get('vl-search-result-next').shadow().find('vl-search-result-title-next');
    });
});

describe('story - vl-search-result-next - group', () => {
    it('should render', () => {
        cy.visit(searchResultNextGroupUrl);

        cy.get('vl-search-result-next').eq(1).shadow().find('vl-search-result-title-next');
    });
});
