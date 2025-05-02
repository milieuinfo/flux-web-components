const loaderUrl = 'http://localhost:8080/iframe.html?id=components-block-loader--loader-default&viewMode=story';
const loaderWithCustomTextUrl =
    'http://localhost:8080/iframe.html?id=components-block-loader--loader-with-custom-content&viewMode=story';

describe('story vl-loader', () => {
    it('should contain a loading text', () => {
        cy.visit(`${loaderUrl}`);
        cy.getDataCy('loader').shadow().find('#text').contains('Pagina is aan het laden');
    });

    it('should contain a loader with light styling', () => {
        cy.visit(`${loaderUrl}&args=light:true`);
        cy.getDataCy('loader').shadow().find('.vl-loader').should('have.class', 'vl-loader--light');
    });

    it('should contain a loader without text', () => {
        cy.visit(`${loaderUrl}&args=single:true`);
        cy.getDataCy('loader').shadow().find('#text').should('have.class', 'vl-u-visually-hidden');
    });

    it('should contain a loader with custom loading text', () => {
        cy.visit(`${loaderWithCustomTextUrl}`);
        cy.getDataCy('loader-with-custom-content').contains('Informatie is aan het laden');
    });
});
