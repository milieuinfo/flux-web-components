const paragraphDefaultUrl =
    'http://localhost:8080/iframe.html?id=components-atom-paragraph--paragraph-default&viewMode=story';
const paragraphBoldUrl =
    'http://localhost:8080/iframe.html?id=components-atom-paragraph--paragraph-bold&viewMode=story';
const paragraphIntroductionUrl =
    'http://localhost:8080/iframe.html?id=components-atom-paragraph--paragraph-introduction&viewMode=story';

describe('story - vl-paragraph - default', () => {
    it('should render', () => {
        cy.visit(paragraphDefaultUrl);
        cy.get('vl-paragraph').shadow().find('p');
    });
});

describe('story - vl-paragraph - bold', () => {
    it('should render', () => {
        cy.visit(paragraphBoldUrl);
        cy.get('vl-paragraph').shadow().find('p');
    });
});

describe('story - vl-paragraph - introduction', () => {
    it('should render', () => {
        cy.visit(paragraphIntroductionUrl);
        cy.get('vl-paragraph').shadow().find('p');
    });
});
