const tabsNextUrl = 'http://localhost:8080/iframe.html?args=&id=components-next-tabs-tabs--tabs-default&viewMode=story';
const tabsNextWithoutActiveUrl =
    'http://localhost:8080/iframe.html?args=&id=components-next-tabs-tabs--tabs-without-active-tab&viewMode=story';
const tabsNextDynamicUrl =
    'http://localhost:8080/iframe.html?args=&id=components-next-tabs-tabs--tabs-dynamic&viewMode=story';

describe('story vl-tabs - no active tab', () => {
    it('should display the story', () => {
        cy.visit(tabsNextWithoutActiveUrl);
        cy.get('vl-tabs-next').shadow();
    });
});

describe('story vl-tabs - default', () => {
    it('should display the story', () => {
        cy.visit(tabsNextUrl);
        cy.get('vl-tabs-next').shadow();
    });
});

describe('story vl-tabs - dynamic', () => {
    it('should display the story and add a tab dynamically', () => {
        cy.visit(tabsNextDynamicUrl);

        cy.get('vl-button-next#add-pane-button').click();
        cy.get('vl-tabs-next')
            .shadow()
            .find('vl-tab-next#fiets-0')
            .find('a')
            .find('slot')
            .contains('Fiets 0');
    });
});
