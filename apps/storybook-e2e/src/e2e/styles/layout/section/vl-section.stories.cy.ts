const sectionNextDefaultUrl =
    'http://localhost:8080/iframe.html?id=styles-layout-afnemers-section--section-default&viewMode=story';
const sectionNextLightBlueUrl =
    'http://localhost:8080/iframe.html?id=styles-layout-afnemers-section--section-light-blue&viewMode=story';
const sectionNextOverlapUrl =
    'http://localhost:8080/iframe.html?id=styles-layout-afnemers-section--section-overlap&viewMode=story';

describe('story - section - default', () => {
    it('should render', () => {
        cy.visit(sectionNextDefaultUrl);

        cy.get('.vl-section')
            .first()
            .shouldHaveComputedStyle({ style: 'background-color', value: 'rgb(247, 249, 252)' })
            .find('p')
            .invoke('text')
            .should('contain', 'vl-section vl-section--alt');
    });
});

describe('story - section - light blue', () => {
    it('should render', () => {
        cy.visit(sectionNextLightBlueUrl);

        cy.get('.vl-section')
            .first()
            .shouldHaveComputedStyle({ style: 'background-color', value: 'rgb(173, 216, 230)' })
            .find('p')
            .invoke('text')
            .should('contain', 'vl-section vl-section--alt');
    });
});

describe('story - section - overlap', () => {
    it('should render', () => {
        cy.visit(sectionNextOverlapUrl);

        cy.get('.vl-section')
            .first()
            .shouldHaveComputedStyle({ style: 'background-color', value: 'rgba(0, 0, 0, 0)' })
            .find('p')
            .first()
            .invoke('text')
            .should('contain', 'vl-content-block');
    });
});
