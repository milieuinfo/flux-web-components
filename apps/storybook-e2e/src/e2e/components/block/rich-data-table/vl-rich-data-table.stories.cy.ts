const richDataTableDefaultUrl =
    'http://localhost:8080/iframe.html?args=&id=components-block-rich-data-table--rich-data-table-default&viewMode=story';
const richDataTableSortingUrl =
    'http://localhost:8080/iframe.html?args=&id=components-block-rich-data-table--rich-data-table-sorting&viewMode=story';
const richDataTableFilterUrl =
    'http://localhost:8080/iframe.html?args=&id=components-block-rich-data-table--rich-data-table-filter&viewMode=story';
const richDataTablePagingUrl =
    'http://localhost:8080/iframe.html?args=&id=components-block-rich-data-table--rich-data-table-filter-and-pagination&viewMode=story';
const richDataTableSelectableUrl =
    'http://localhost:8080/iframe.html?args=&id=components-block-rich-data-table--rich-data-table-selectable&viewMode=story';

describe('cypress-e2e - block components - vl-rich-table - story renders', () => {
    it('should render the default story', () => {
        cy.visit(richDataTableDefaultUrl);
        cy.get('vl-rich-data-table').should('exist');
    });

    it('should render the sorting story', () => {
        cy.visit(richDataTableSortingUrl);
        cy.get('vl-rich-data-table').should('exist');
    });

    it('should render the filter story', () => {
        cy.visit(richDataTableFilterUrl);
        cy.get('vl-rich-data-table').should('exist');
    });

    it('should render the filter and pagination story', () => {
        cy.visit(richDataTablePagingUrl);
        cy.get('vl-rich-data-table').should('exist');
    });

    it('should render the selectable story', () => {
        cy.visit(richDataTableSelectableUrl);
        cy.get('vl-rich-data-table').should('exist');
    });
});
