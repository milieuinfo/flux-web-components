const chartLineUrl = (story: string) =>
    `http://localhost:8080/iframe.html?args=&id=data-visualisation-chart-line--chart-line-${story}&viewMode=story`;

['default', 'gap'].forEach((story) => {
    describe(`cypress-e2e - widgets - vl-chart-line - ${story} story`, () => {
        it('should render', () => {
            cy.visit(chartLineUrl(story));
            cy.get('vl-chart-line').shadow().find('.plot svg.main-svg').should('exist');
        });
    });
});

describe('cypress-e2e - widgets - vl-chart-line - loading story', () => {
    it('should render', () => {
        cy.visit(chartLineUrl('loading'));
        cy.get('vl-chart-line').shadow().find('.state-message[role="status"]').should('be.visible');
    });
});

describe('cypress-e2e - widgets - vl-chart-line - empty story', () => {
    it('should render', () => {
        cy.visit(chartLineUrl('empty'));
        cy.get('vl-chart-line').shadow().find('.state-message vl-alert[type="info"]').should('be.visible');
    });
});

describe('cypress-e2e - widgets - vl-chart-line - error story', () => {
    it('should render', () => {
        cy.visit(chartLineUrl('error'));
        cy.get('vl-chart-line').shadow().find('.state-message vl-alert[type="error"]').should('be.visible');
    });
});
