const separatorNextDefaultUrl =
    'http://localhost:8080/iframe.html?id=styles-next-layout-afnemers-separator--separator-default&viewMode=story';
const separatorNextSlashUrl =
    'http://localhost:8080/iframe.html?id=styles-next-layout-afnemers-separator--separator-slash&viewMode=story';
const separatorNextWaveUrl =
    'http://localhost:8080/iframe.html?id=styles-next-layout-afnemers-separator--separator-wave&viewMode=story';

describe('story - separator-next - default', () => {
    it('should render', () => {
        cy.visit(separatorNextDefaultUrl);

        cy.get('hr.vl-separator-next')
            .shouldHaveComputedStyle({ style: 'border-bottom', value: '1px solid rgb(203, 210, 218)' });
    });
});

describe('story - separator-next - slash', () => {
    it('should render', () => {
        cy.visit(separatorNextSlashUrl);

        cy.get('hr.vl-separator-slash-next')
            .shouldHaveComputedStyle({ style: 'min-height', value: '6px' });
    });
});

describe('story - separator-next - wave', () => {
    it('should render', () => {
        cy.visit(separatorNextWaveUrl);

        cy.get('hr.vl-separator-wave-next')
            .shouldHaveComputedStyle({ style: 'height', value: '4px' });
    });
});
