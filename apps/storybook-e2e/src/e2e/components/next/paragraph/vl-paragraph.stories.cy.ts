const paragraphNextDefaultUrl = 'http://localhost:8080/iframe.html?id=components-next-paragraph--paragraph-default&viewMode=story';
const paragraphNextBoldUrl = 'http://localhost:8080/iframe.html?id=components-next-paragraph--paragraph-bold&viewMode=story';
const paragraphNextIntroductionUrl = 'http://localhost:8080/iframe.html?id=components-next-paragraph--paragraph-introduction&viewMode=story';

describe('story - vl-paragraph-next - default', () => {
    it('should render', () => {
        cy.visit(paragraphNextDefaultUrl);
        cy.get('vl-paragraph-next').shadow().find('p');
    });
});

describe('story - vl-paragraph-next - bold', () => {
    it('should render', () => {
        cy.visit(paragraphNextBoldUrl);
        cy.get('vl-paragraph-next').shadow().find('p');
    });
});

describe('story - vl-paragraph-next - introduction', () => {
    it('should render', () => {
        cy.visit(paragraphNextIntroductionUrl);
        cy.get('vl-paragraph-next').shadow().find('p');
    });
});
