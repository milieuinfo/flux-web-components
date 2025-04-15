const separatorNextDefaultUrl =
    'http://localhost:8080/iframe.html?id=styles-layout-afnemers-separator--separator-default&viewMode=story';
const separatorNextSlashUrl =
    'http://localhost:8080/iframe.html?id=styles-layout-afnemers-separator--separator-slash&viewMode=story';
const separatorNextWaveUrl =
    'http://localhost:8080/iframe.html?id=styles-layout-afnemers-separator--separator-wave&viewMode=story';

describe('story - separator - default', () => {
    it('should render', () => {
        cy.visit(separatorNextDefaultUrl);

        cy.get('hr.vl-separator').shouldHaveComputedStyle({
            style: 'border-bottom',
            value: '1px solid rgb(203, 210, 218)',
        });
    });
});

describe('story - separator - slash', () => {
    it('should render', () => {
        cy.visit(separatorNextSlashUrl);

        cy.get('hr.vl-separator-slash').shouldHaveComputedStyle({ style: 'min-height', value: '6px' });
    });
});

describe('story - separator - wave', () => {
    it('should render', () => {
        cy.visit(separatorNextWaveUrl);

        cy.get('hr.vl-separator-wave').shouldHaveComputedStyle({ style: 'height', value: '4px' });
    });
});
