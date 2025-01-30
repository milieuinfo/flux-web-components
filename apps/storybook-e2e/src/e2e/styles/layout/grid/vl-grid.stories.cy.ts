const gridNextResponsiveUrl =
    'http://localhost:8080/iframe.html?id=styles-next-layout-afnemers-grid--grid-responsive&viewMode=story';
const gridNextOffsetUrl =
    'http://localhost:8080/iframe.html?id=styles-next-layout-afnemers-grid--grid-offset&viewMode=story';
const gridNextJustifyAlignUrl =
    'http://localhost:8080/iframe.html?id=styles-next-layout-afnemers-grid--grid-justify-align&viewMode=story';

describe('story - grid-next - responsive', () => {
    it('should render', () => {
        cy.visit(gridNextResponsiveUrl);

        cy.get('.vl-grid-next')
            .find('.vl-column-next')
            .shouldHaveComputedStyle({ style: 'grid-column-end', value: 'span 3' })
            .shouldHaveComputedStyle({ style: 'background-color', value: 'rgb(173, 216, 230)' });
    });
});

describe('story - grid-next - offset', () => {
    it('should render', () => {
        cy.visit(gridNextOffsetUrl);

        cy.get('.vl-grid-next')
            .find('.vl-column-next')
            .shouldHaveComputedStyle({ style: 'grid-column-start', value: '9' })
            .shouldHaveComputedStyle({ style: 'background-color', value: 'rgb(0, 250, 154)' });
    });
});

describe('story - grid-next - justify/align', () => {
    it('should render', () => {
        cy.visit(gridNextJustifyAlignUrl);

        cy.get('.vl-grid-next')
            .find('.vl-column-next')
            .shouldHaveComputedStyle({ style: 'justify-self', value: 'start' })
            .shouldHaveComputedStyle({ style: 'background-color', value: 'rgb(0, 250, 154)' });
    });
});
