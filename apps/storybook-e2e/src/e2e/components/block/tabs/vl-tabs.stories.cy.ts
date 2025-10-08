const tabsDefaultUrl =
    'http://localhost:8080/iframe.html?args=&id=components-block-tabs-tabs--tabs-default&viewMode=story';
const tabsWithoutActiveTabUrl =
    'http://localhost:8080/iframe.html?args=&id=components-block-tabs-tabs--tabs-without-active-tab&viewMode=story';
const tabsDynamicUrl =
    'http://localhost:8080/iframe.html?args=&id=components-block-tabs-tabs--tabs-dynamic&viewMode=story';

describe('cypress-e2e - block components - vl-tabs - default story', () => {
    it('should display the story', () => {
        cy.visit(tabsDefaultUrl);
        cy.get('vl-tabs').shadow();
    });
});

describe('cypress-e2e - block components - vl-tabs - without active tab story', () => {
    it('should display the story', () => {
        cy.visit(tabsWithoutActiveTabUrl);
        cy.get('vl-tabs').shadow();
    });
});

describe('cypress-e2e - block components - vl-tabs - dynamic story', () => {
    it('should display the story and add a tab dynamically', () => {
        cy.visit(tabsDynamicUrl);

        cy.get('vl-button#add-pane-button').click();
        cy.get('vl-tabs').shadow().find('vl-tab#fiets-0').find('a').find('slot').contains('Fiets 0');
    });
});
