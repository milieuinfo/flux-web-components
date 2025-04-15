const groupNextButtonsUrl =
    'http://localhost:8080/iframe.html?id=styles-layout-afnemers-group--group-buttons&viewMode=story';
const groupNextLinksUrl =
    'http://localhost:8080/iframe.html?id=styles-layout-afnemers-group--group-links&viewMode=story';
const groupNextAccordionsUrl =
    'http://localhost:8080/iframe.html?id=styles-layout-afnemers-group--group-accordions&viewMode=story';
const groupNextIconsUrl =
    'http://localhost:8080/iframe.html?id=styles-layout-afnemers-group--group-icons&viewMode=story';

describe('story - group - buttons', () => {
    it('should render', () => {
        cy.visit(groupNextButtonsUrl);

        cy.get('.vl-group')
            .find('vl-button')
            .first()
            .shouldHaveComputedStyle({ style: 'color', value: 'rgb(51, 51, 50)' })
            .invoke('text')
            .should('contain', 'Aanvraag starten');
    });
});

describe('story - group - links', () => {
    it('should render', () => {
        cy.visit(groupNextLinksUrl);

        cy.get('.vl-group')
            .find('vl-link')
            .first()
            .shouldHaveComputedStyle({ style: 'color', value: 'rgb(51, 51, 50)' })
            .shadow()
            .find('a')
            .should('exist');
    });
});

describe('story - group - accordions', () => {
    it('should render', () => {
        cy.visit(groupNextAccordionsUrl);

        cy.get('.vl-group').find('vl-accordion').first().shadow().find('div.vl-accordion').should('exist');
    });
});

describe('story - group - icons', () => {
    it('should render', () => {
        cy.visit(groupNextIconsUrl);

        cy.get('.vl-group').find('vl-icon').first().shadow().find('span.vl-icon--bell').should('exist');
    });
});
