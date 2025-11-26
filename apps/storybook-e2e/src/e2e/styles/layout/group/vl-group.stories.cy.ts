const groupButtonsUrl =
    'http://localhost:8080/iframe.html?id=styles-layout-group--group-buttons&viewMode=story';
const groupLinksUrl =
    'http://localhost:8080/iframe.html?id=styles-layout-group--group-links&viewMode=story';
const groupAccordionsUrl =
    'http://localhost:8080/iframe.html?id=styles-layout-group--group-accordions&viewMode=story';
const groupIconsUrl =
    'http://localhost:8080/iframe.html?id=styles-layout-group--group-icons&viewMode=story';

describe('cypress-e2e - layout - vl-group - buttons story', () => {
    it('should render', () => {
        cy.visit(groupButtonsUrl);

        cy.get('.vl-group')
            .find('vl-button')
            .first()
            .shouldHaveComputedStyle({ style: 'color', value: 'rgb(51, 51, 50)' })
            .invoke('text')
            .should('contain', 'Aanvraag starten');
    });
});

describe('cypress-e2e - layout - vl-group - links story', () => {
    it('should render', () => {
        cy.visit(groupLinksUrl);

        cy.get('.vl-group')
            .find('vl-link')
            .first()
            .shouldHaveComputedStyle({ style: 'color', value: 'rgb(51, 51, 50)' })
            .shadow()
            .find('a')
            .should('exist');
    });
});

describe('cypress-e2e - layout - vl-group - accordions story', () => {
    it('should render', () => {
        cy.visit(groupAccordionsUrl);

        cy.get('.vl-group').find('vl-accordion').first().shadow().find('div.vl-accordion').should('exist');
    });
});

describe('cypress-e2e - layout - vl-group - icons story', () => {
    it('should render', () => {
        cy.visit(groupIconsUrl);

        cy.get('.vl-group').find('vl-icon').first().shadow().find('span.vl-icon--bell').should('exist');
    });
});
