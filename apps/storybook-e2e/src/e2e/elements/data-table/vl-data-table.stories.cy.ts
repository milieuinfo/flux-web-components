const dataTableDefaultUrl =
    'http://localhost:8080/iframe.html?id=elements-data-table--data-table-default&viewMode=story';
const dataTableExpandableUrl =
    'http://localhost:8080/iframe.html?id=elements-data-table--data-table-expandable&viewMode=story';
const dataTableExpandableWithCustomToggleUrl =
    'http://localhost:8080/iframe.html?args=&id=elements-data-table--data-table-expandable-custom-toggle-details-column&viewMode=story';

describe('story - vl-table - default', () => {
    it('should render', () => {
        cy.visit(dataTableDefaultUrl);

        cy.get('[is="vl-data-table"]').should('have.class', 'vl-data-table');
    });
});

describe('story - vl-table - expandable', () => {
    it('should render', () => {
        cy.visit(dataTableExpandableUrl);

        cy.get('[is="vl-data-table"]').should('have.class', 'vl-data-table');
    });
});

describe('story - vl-table - expandable with custom toggle', () => {
    it('should render', () => {
        cy.visit(dataTableExpandableWithCustomToggleUrl);

        cy.get('[is="vl-data-table"]').should('have.class', 'vl-data-table');
    });
});
