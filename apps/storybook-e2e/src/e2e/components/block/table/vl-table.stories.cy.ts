const tableDefaultUrl = 'http://localhost:8080/iframe.html?id=components-block-table--table-default&viewMode=story';
const tableJoinedRowTitlesUrl =
    'http://localhost:8080/iframe.html?id=components-block-table--table-joined-row-titles&viewMode=story';
const tableExpandableUrl =
    'http://localhost:8080/iframe.html?id=components-block-table--table-expandable&viewMode=story';
const tableExpandableCustomToggleDetailsColumnUrl =
    'http://localhost:8080/iframe.html?id=components-block-table--table-expandable-custom-toggle-details-column&viewMode=story';
const tableNextRowStylingUrl =
    'http://localhost:8080/iframe.html?id=components-block-table--table-row-styling&viewMode=story';

describe('cypress-e2e - block components - vl-table - default story', () => {
    it('should render', () => {
        cy.visit(tableDefaultUrl);

        cy.get('vl-table').find('table.vl-table');
    });
});

describe('cypress-e2e - block components - vl-table - joined row titles story', () => {
    it('should render', () => {
        cy.visit(tableJoinedRowTitlesUrl);

        cy.get('vl-table').find('table.vl-table');
    });
});

describe('cypress-e2e - block components - vl-table - expandable story', () => {
    it('should render', () => {
        cy.visit(tableExpandableUrl);

        cy.get('vl-table').find('table.vl-table');
    });
});

describe('cypress-e2e - block components - vl-table - expandable custom toggle details column story', () => {
    it('should render', () => {
        cy.visit(tableExpandableCustomToggleDetailsColumnUrl);

        cy.get('vl-table').find('table.vl-table');
    });
});

describe('cypress-e2e - block components - vl-table-next - row styling story', () => {
    it('should render', () => {
        cy.visit(tableNextRowStylingUrl);

        cy.get('vl-table').find('table.vl-table');
    });
});
