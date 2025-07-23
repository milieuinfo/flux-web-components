const tableDefaultUrl = 'http://localhost:8080/iframe.html?id=components-block-table--table-default&viewMode=story';
const tableJoinedRowTitlesUrl =
    'http://localhost:8080/iframe.html?id=components-block-table--table-joined-row-titles&viewMode=story';
const tableExpandableUrl =
    'http://localhost:8080/iframe.html?id=components-block-table--table-expandable&viewMode=story';
const tableExpandableCustomToggleDetailsColumnUrl =
    'http://localhost:8080/iframe.html?id=components-block-table--table-expandable-custom-toggle-details-column&viewMode=story';
const tableNextRowStylingUrl =
    'http://localhost:8080/iframe.html?id=components-block-table--table-row-styling&viewMode=story';

describe('story - vl-table - default', () => {
    it('should render', () => {
        cy.visit(tableDefaultUrl);

        cy.get('vl-table').find('table.vl-table');
    });
});

describe('story - vl-table - joined row titles', () => {
    it('should render', () => {
        cy.visit(tableJoinedRowTitlesUrl);

        cy.get('vl-table').find('table.vl-table');
    });
});

describe('story - vl-table - expandable', () => {
    it('should render', () => {
        cy.visit(tableExpandableUrl);

        cy.get('vl-table').find('table.vl-table');
    });
});

describe('story - vl-table - expandable custom toggle details column', () => {
    it('should render', () => {
        cy.visit(tableExpandableCustomToggleDetailsColumnUrl);

        cy.get('vl-table').find('table.vl-table');
    });
});

describe('story - vl-table-next - row styling', () => {
    it('should render', () => {
        cy.visit(tableNextRowStylingUrl);

        cy.get('vl-table').find('table.vl-table');
    });
});
