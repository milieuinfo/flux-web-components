const doormatNextDefaultUrl =
    'http://localhost:8080/iframe.html?id=components-block-doormat--doormat-default&viewMode=story';
const doormatNextAltUrl = 'http://localhost:8080/iframe.html?id=components-block-doormat--doormat-alt&viewMode=story';
const doormatNextImageUrl =
    'http://localhost:8080/iframe.html?id=components-block-doormat--doormat-image&viewMode=story';
const doormatNextGraphicUrl =
    'http://localhost:8080/iframe.html?id=components-block-doormat--doormat-graphic&viewMode=story';

describe('story - vl-doormat - default', () => {
    it('should render', () => {
        cy.visit(doormatNextDefaultUrl);

        cy.get('vl-doormat').shadow().find('a');
    });
});

describe('story - vl-doormat - alt', () => {
    it('should render', () => {
        cy.visit(doormatNextAltUrl);

        cy.get('vl-doormat').shadow().find('a');
    });
});

describe('story - vl-doormat - image', () => {
    it('should render', () => {
        cy.visit(doormatNextImageUrl);

        cy.get('vl-doormat').shadow().find('a');
    });
});

describe('story - vl-doormat - graphic', () => {
    it('should render', () => {
        cy.visit(doormatNextGraphicUrl);

        cy.get('vl-doormat').shadow().find('a');
    });
});
