const tabsUrl =
    'http://localhost:8080/iframe.html?args=&id=components-block-tabs-tabs--tabs-default&viewMode=story';
const tabsWithoutActiveUrl =
    'http://localhost:8080/iframe.html?args=&id=components-block-tabs-tabs--tabs-without-active-tab&viewMode=story';
const tabsDynamicUrl =
    'http://localhost:8080/iframe.html?args=&id=components-block-tabs-tabs--tabs-dynamic&viewMode=story';

describe('story vl-tabs - no active tab', () => {
    it('should display the story', () => {
        cy.visit(tabsWithoutActiveUrl);
        cy.get('vl-tabs').shadow();
    });
});

describe('story vl-tabs - default', () => {
    it('should display the story', () => {
        cy.visit(tabsUrl);
        cy.get('vl-tabs').shadow();
    });
});

describe('story vl-tabs - dynamic', () => {
    it('should display the story and add a tab dynamically', () => {
        cy.visit(tabsDynamicUrl);

        cy.get('vl-button#add-pane-button').click();
        cy.get('vl-tabs').shadow().find('vl-tab#fiets-0').find('a').find('slot').contains('Fiets 0');
    });
});
