const descriptionDataDefaultUrl =
    'http://localhost:8080/iframe.html?id=components-block-description-data-description-data--description-data-default&viewMode=story';

const descriptionDataWithSpannerUrl =
    'http://localhost:8080/iframe.html?id=components-block-description-data-description-data--description-data-with-spanner&viewMode=story';

describe('cypress-e2e - block components - vl-description-data - default story', () => {
    it('should render the default story', () => {
        cy.visit(descriptionDataDefaultUrl);
        cy.get('vl-description-data');
    });
});

describe('cypress-e2e - block components - vl-description-data - with full-width item story', () => {
    it('should render the with full-width item story', () => {
        cy.visit(descriptionDataWithSpannerUrl);
        cy.get('vl-description-data');
    });
});
