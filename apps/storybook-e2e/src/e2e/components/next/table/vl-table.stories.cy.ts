const tableNextDefaultUrl = 'http://localhost:8080/iframe.html?id=components-table--table-default&viewMode=story';
const tableNextJoinedRowTitlesUrl =
    'http://localhost:8080/iframe.html?id=components-table--table-joined-row-titles&viewMode=story';
const tableNextExpandableUrl = 'http://localhost:8080/iframe.html?id=components-table--table-expandable&viewMode=story';
const tableNextExpandableCustomToggleDetailsColumnUrl =
    'http://localhost:8080/iframe.html?id=components-table--table-expandable-custom-toggle-details-column&viewMode=story';

describe('story - vl-table - default', () => {
    it('should render', () => {
        cy.visit(tableNextDefaultUrl);

        cy.get('vl-table').find('table.vl-table');
    });
});

describe('story - vl-table - joined row titles', () => {
    it('should render', () => {
        cy.visit(tableNextJoinedRowTitlesUrl);

        cy.get('vl-table').find('table.vl-table');
    });
});

describe('story - vl-table - expandable', () => {
    it('should render', () => {
        cy.visit(tableNextExpandableUrl);

        cy.get('vl-table').find('table.vl-table');
    });
});

describe('story - vl-table - expandable custom toggle details column', () => {
    it('should render', () => {
        cy.visit(tableNextExpandableCustomToggleDetailsColumnUrl);

        cy.get('vl-table').find('table.vl-table');
    });
});
