const sectionNextDefaultUrl =
    'http://localhost:8080/iframe.html?id=styles-next-layout-afnemers-section--section-default&viewMode=story';
const sectionNextLightBlueUrl =
    'http://localhost:8080/iframe.html?id=styles-next-layout-afnemers-section--section-light-blue&viewMode=story';
const sectionNextOverlapUrl =
    'http://localhost:8080/iframe.html?id=styles-next-layout-afnemers-section--section-overlap&viewMode=story';

describe('story - section-next - default', () => {
    it('should render', () => {
        cy.visit(sectionNextDefaultUrl);

        cy.get('.vl-section-next')
            .first()
            .shouldHaveComputedStyle({ style: 'background-color', value: 'rgb(247, 249, 252)' })
            .find('p')
            .invoke('text')
            .should('contain', 'vl-section-next vl-section-next--alt');
    });
});

describe('story - section-next - light blue', () => {
    it('should render', () => {
        cy.visit(sectionNextLightBlueUrl);

        cy.get('.vl-section-next')
            .first()
            .shouldHaveComputedStyle({ style: 'background-color', value: 'rgb(173, 216, 230)' })
            .find('p')
            .invoke('text')
            .should('contain', 'vl-section-next vl-section-next--alt');
    });
});

describe('story - section-next - overlap', () => {
    it('should render', () => {
        cy.visit(sectionNextOverlapUrl);

        cy.get('.vl-section-next')
            .first()
            .shouldHaveComputedStyle({ style: 'background-color', value: 'rgba(0, 0, 0, 0)' })
            .find('p')
            .first()
            .invoke('text')
            .should('contain', 'vl-content-block-next');
    });
});
