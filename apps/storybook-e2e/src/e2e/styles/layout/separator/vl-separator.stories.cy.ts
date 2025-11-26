const separatorDefaultUrl =
    'http://localhost:8080/iframe.html?id=styles-layout-separator--separator-default&viewMode=story';
const separatorSlashUrl =
    'http://localhost:8080/iframe.html?id=styles-layout-separator--separator-slash&viewMode=story';
const separatorWaveUrl =
    'http://localhost:8080/iframe.html?id=styles-layout-separator--separator-wave&viewMode=story';

describe('cypress-e2e - layout - vl-separator - default story', () => {
    it('should render', () => {
        cy.visit(separatorDefaultUrl);

        cy.get('hr.vl-separator').shouldHaveComputedStyle({
            style: 'border-bottom',
            value: '1px solid rgb(203, 210, 218)',
        });
    });
});

describe('cypress-e2e - layout - vl-separator - slash story', () => {
    it('should render', () => {
        cy.visit(separatorSlashUrl);

        cy.get('hr.vl-separator-slash').shouldHaveComputedStyle({ style: 'min-height', value: '6px' });
    });
});

describe('cypress-e2e - layout - vl-separator - wave story', () => {
    it('should render', () => {
        cy.visit(separatorWaveUrl);

        cy.get('hr.vl-separator-wave').shouldHaveComputedStyle({ style: 'height', value: '4px' });
    });
});
