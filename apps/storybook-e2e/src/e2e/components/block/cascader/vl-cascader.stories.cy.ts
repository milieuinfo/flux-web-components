const cascaderDefault =
    'http://localhost:8080/iframe.html?id=components-block-cascader-cascader--cascader-default&viewMode=story';
const cascaderDynamicTemplating =
    'http://localhost:8080/iframe.html?id=components-block-cascader-cascader--cascader-dynamic-templating&viewMode=story';
const cascaderPropertyBinding =
    'http://localhost:8080/iframe.html?id=components-block-cascader-cascader--cascader-property-binding&viewMode=story';
const cascaderSideSheetUrl =
    'http://localhost:8080/iframe.html?id=components-block-cascader-cascader--cascader-side-sheet&viewMode=story';
const cascaderItemSlotsDefault =
    'http://localhost:8080/iframe.html?id=components-block-cascader-cascader-item--cascader-item-slots&viewMode=story';

describe('cypress-e2e - block components - vl-cascader - default story', () => {
    it('should display story', () => {
        cy.visit(cascaderDefault);

        cy.get('vl-cascader').shadow().find('.vl-breadcrumb-placeholder');
        cy.get('vl-cascader').shadow().find('vl-cascader-item');
    });
});

describe('cypress-e2e - block components - vl-cascader - dynamic templating story', () => {
    it('should display story', () => {
        cy.visit(cascaderDynamicTemplating);

        cy.get('vl-cascader').shadow().find('.vl-breadcrumb-placeholder');
        cy.get('vl-cascader').shadow().find('vl-cascader-item');
    });
});

describe('cypress-e2e - block components - vl-cascader - property binding story', () => {
    it('should display story', () => {
        cy.visit(cascaderPropertyBinding);

        cy.get('vl-cascader').shadow().find('.vl-breadcrumb-placeholder');
        cy.get('vl-cascader').shadow().find('.vl-cascader-item');
    });
});

describe('cypress-e2e - block components - vl-cascader - side-sheet story', () => {
    it('should display story', () => {
        cy.visit(cascaderSideSheetUrl);

        cy.get('vl-side-sheet');

        cy.get('vl-cascader').shadow().find('.vl-breadcrumb-placeholder');
        cy.get('vl-cascader').shadow().find('vl-cascader-item');
    });
});

describe('cypress-e2e - block components - vl-cascader - item-slots story', () => {
    it('should display story', () => {
        cy.visit(cascaderItemSlotsDefault);

        cy.get('vl-cascader').shadow().find('.vl-breadcrumb-placeholder');
        cy.get('vl-cascader').shadow().find('vl-cascader-item');
    });
});
