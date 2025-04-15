const cascaderDefault =
    'http://localhost:8080/iframe.html?id=components-cascader-cascader--cascader-default&viewMode=story';
const cascaderDynamicTemplating =
    'http://localhost:8080/iframe.html?id=components-cascader-cascader--cascader-dynamic-templating&viewMode=story';
const cascaderPropertyBinding =
    'http://localhost:8080/iframe.html?id=components-cascader-cascader--cascader-property-binding&viewMode=story';
const cascaderSideSheetUrl =
    'http://localhost:8080/iframe.html?id=components-cascader-cascader--cascader-side-sheet&viewMode=story';
const cascaderItemSlotsDefault =
    'http://localhost:8080/iframe.html?id=components-cascader-cascader-item--cascader-item-slots&viewMode=story';

describe('story vl-cascader default', () => {
    it('should display story', () => {
        cy.visit(cascaderDefault);

        cy.get('vl-cascader').shadow().find('.vl-breadcrumb-placeholder');
        cy.get('vl-cascader').shadow().find('vl-cascader-item');
    });
});

describe('story vl-cascader dynamic templating', () => {
    it('should display story', () => {
        cy.visit(cascaderDynamicTemplating);

        cy.get('vl-cascader').shadow().find('.vl-breadcrumb-placeholder');
        cy.get('vl-cascader').shadow().find('vl-cascader-item');
    });
});

describe('story vl-cascader property binding', () => {
    it('should display story', () => {
        cy.visit(cascaderPropertyBinding);

        cy.get('vl-cascader').shadow().find('.vl-breadcrumb-placeholder');
        cy.get('vl-cascader').shadow().find('.vl-cascader-item');
    });
});

describe('story vl-cascader in side-sheet', () => {
    it('should display story', () => {
        cy.visit(cascaderSideSheetUrl);

        cy.get('vl-side-sheet');

        cy.get('vl-cascader').shadow().find('.vl-breadcrumb-placeholder');
        cy.get('vl-cascader').shadow().find('vl-cascader-item');
    });
});

describe('story vl-cascader-item-slots', () => {
    it('should display story', () => {
        cy.visit(cascaderItemSlotsDefault);

        cy.get('vl-cascader').shadow().find('.vl-breadcrumb-placeholder');
        cy.get('vl-cascader').shadow().find('vl-cascader-item');
    });
});
