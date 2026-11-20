const dataTableUrl = (story: string) =>
    `http://localhost:8080/iframe.html?args=&id=data-visualisation-data-table--data-table-${story}&viewMode=story`;

describe('cypress-e2e - widgets - vl-data-table - default story', () => {
    it('should render', () => {
        cy.visit(dataTableUrl('default'));
        cy.get('vl-data-table').shadow().find('vl-accordion table').should('exist');
    });
});

describe('cypress-e2e - widgets - vl-data-table - with-pager story', () => {
    it('should render', () => {
        cy.visit(dataTableUrl('with-pager'));
        cy.get('vl-data-table').shadow().find('vl-pager').should('exist');
    });
});
