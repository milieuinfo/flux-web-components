const paragraphNextDefaultUrl =
    'http://localhost:8080/iframe.html?id=components-atom-paragraph--paragraph-default&viewMode=story';
const paragraphNextBoldUrl =
    'http://localhost:8080/iframe.html?id=components-atom-paragraph--paragraph-bold&viewMode=story';
const paragraphNextIntroductionUrl =
    'http://localhost:8080/iframe.html?id=components-atom-paragraph--paragraph-introduction&viewMode=story';

describe('story - vl-paragraph - default', () => {
    it('should render', () => {
        cy.visit(paragraphNextDefaultUrl);
        cy.get('vl-paragraph').shadow().find('p');
    });
});

describe('story - vl-paragraph - bold', () => {
    it('should render', () => {
        cy.visit(paragraphNextBoldUrl);
        cy.get('vl-paragraph').shadow().find('p');
    });
});

describe('story - vl-paragraph - introduction', () => {
    it('should render', () => {
        cy.visit(paragraphNextIntroductionUrl);
        cy.get('vl-paragraph').shadow().find('p');
    });
});
