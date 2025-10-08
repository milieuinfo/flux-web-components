const loaderDefaultUrl = 'http://localhost:8080/iframe.html?id=components-block-loader--loader-default&viewMode=story';
const loaderWithCustomContentUrl =
    'http://localhost:8080/iframe.html?id=components-block-loader--loader-with-custom-content&viewMode=story';

describe('cypress-e2e - block components - vl-loader - default story', () => {
    it('should contain a loading text', () => {
        cy.visit(`${loaderDefaultUrl}`);
        cy.getDataCy('loader').shadow().find('#text').contains('Pagina is aan het laden');
    });

    it('should contain a loader with light styling', () => {
        cy.visit(`${loaderDefaultUrl}&args=light:true`);
        cy.getDataCy('loader').shadow().find('.vl-loader').should('have.class', 'vl-loader--light');
    });

    it('should contain a loader without text', () => {
        cy.visit(`${loaderDefaultUrl}&args=single:true`);
        cy.getDataCy('loader').shadow().find('#text').should('have.class', 'vl-u-visually-hidden');
    });
});

describe('cypress-e2e - block components - vl-loader - with custom content story', () => {
    it('should contain a loader with custom loading text', () => {
        cy.visit(`${loaderWithCustomContentUrl}`);
        cy.getDataCy('loader-with-custom-content').contains('Informatie is aan het laden');
    });
});
