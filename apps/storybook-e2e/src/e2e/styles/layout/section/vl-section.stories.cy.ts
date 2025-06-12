const sectionDefaultUrl =
    'http://localhost:8080/iframe.html?id=styles-layout-afnemers-section--section-default&viewMode=story';
const sectionLightBlueUrl =
    'http://localhost:8080/iframe.html?id=styles-layout-afnemers-section--section-light-blue&viewMode=story';
const sectionOverlapUrl =
    'http://localhost:8080/iframe.html?id=styles-layout-afnemers-section--section-overlap&viewMode=story';

describe('story - section - default', () => {
    it('should render', () => {
        cy.visit(sectionDefaultUrl);

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
        cy.visit(sectionLightBlueUrl);

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
        cy.visit(sectionOverlapUrl);

        cy.get('.vl-section')
            .first()
            .shouldHaveComputedStyle({ style: 'background-color', value: 'rgba(0, 0, 0, 0)' })
            .find('p')
            .first()
            .invoke('text')
            .should('contain', 'vl-content-block');
    });
});
