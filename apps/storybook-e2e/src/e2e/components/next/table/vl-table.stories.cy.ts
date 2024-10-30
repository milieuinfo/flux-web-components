const tableNextDefaultUrl = 'http://localhost:8080/iframe.html?id=components-next-table--table-default&viewMode=story';
const tableNextJoinedRowTitlesUrl = 'http://localhost:8080/iframe.html?id=components-next-table--table-joined-row-titles&viewMode=story';
const tableNextExpandableUrl = 'http://localhost:8080/iframe.html?id=components-next-table--table-expandable&viewMode=story';
const tableNextExpandableCustomToggleDetailsColumnUrl = 'http://localhost:8080/iframe.html?id=components-next-table--table-expandable-custom-toggle-details-column&viewMode=story';


describe('story - vl-table-next - default', () => {
    it('should render', () => {
        cy.visit(tableNextDefaultUrl);

        cy.get('vl-table-next').find('table.vl-table-next');
    });
});

describe('story - vl-table-next - joined row titles', () => {
    it('should render', () => {
        cy.visit(tableNextJoinedRowTitlesUrl);

        cy.get('vl-table-next').find('table.vl-table-next');
    });
});

describe('story - vl-table-next - expandable', () => {
    it('should render', () => {
        cy.visit(tableNextExpandableUrl);

        cy.get('vl-table-next').find('table.vl-table-next');
    });
});

describe('story - vl-table-next - expandable custom toggle details column', () => {
    it('should render', () => {
        cy.visit(tableNextExpandableCustomToggleDetailsColumnUrl);

        cy.get('vl-table-next').find('table.vl-table-next');
    });
});
