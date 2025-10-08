const gridResponsiveUrl =
    'http://localhost:8080/iframe.html?id=styles-layout-afnemers-grid--grid-responsive&viewMode=story';
const gridOffsetUrl =
    'http://localhost:8080/iframe.html?id=styles-layout-afnemers-grid--grid-column-start&viewMode=story';
const gridJustifyAlignUrl =
    'http://localhost:8080/iframe.html?id=styles-layout-afnemers-grid--grid-justify-align&viewMode=story';

describe('cypress-e2e - layout - vl-grid - responsive story', () => {
    it('should render', () => {
        cy.visit(gridResponsiveUrl);

        cy.get('.vl-grid')
            .find('.vl-column')
            .shouldHaveComputedStyle({ style: 'grid-column-end', value: 'span 3' })
            .shouldHaveComputedStyle({ style: 'background-color', value: 'rgb(173, 216, 230)' });
    });
});

describe('cypress-e2e - layout - vl-grid - offset story', () => {
    it('should render', () => {
        cy.visit(gridOffsetUrl);

        cy.get('.vl-grid')
            .find('.vl-column')
            .shouldHaveComputedStyle({ style: 'grid-column-start', value: '9' })
            .shouldHaveComputedStyle({ style: 'background-color', value: 'rgb(0, 250, 154)' });
    });
});

describe('cypress-e2e - layout - vl-grid - justify/align story', () => {
    it('should render', () => {
        cy.visit(gridJustifyAlignUrl);

        cy.get('.vl-grid')
            .find('.vl-column')
            .shouldHaveComputedStyle({ style: 'justify-self', value: 'start' })
            .shouldHaveComputedStyle({ style: 'background-color', value: 'rgb(0, 250, 154)' });
    });
});
