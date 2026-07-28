const headerNextDefaultUrl = 'http://localhost:8080/iframe.html?id=components-compliance-next-header--header-default&viewMode=story';

describe('cypress-e2e - compliance components - vl-header-next - default story', () => {
    beforeEach(() => {
        // zelfde aanpak als in de component tests: zonder deze intercept haalt de test het echte widget-script op bij
        // widgets.tni-vlaanderen.be - traag, buiten onze controle en dus regelmatig falend
        cy.intercept('GET', /widgets.*vlaanderen\.be.*entry/, stubWidgetScript()).as('widgetScript');
    });

    it('should render', () => {
        cy.visit(headerNextDefaultUrl);

        cy.get('vl-header-next');
        cy.wait('@widgetScript');
        cy.get('#header__container').find('div').shadow().find('.host').contains('Global header (mock)');
    });
});

/**
 * Vervangt het widget-script: het echte script zet window.globalHeaderClient klaar en meldt via een window-event dat
 * de widget gemount is. mount() rendert - net als de echte widget - in een shadow root op het meegegeven #header
 * element, zodat de test de volledige keten (script laden -> mount met het juiste element -> shadow DOM) blijft
 * afdekken, maar dan met stabiele mock-inhoud.
 */
const stubWidgetScript = () => ({
    statusCode: 200,
    headers: { 'Content-Type': 'application/javascript' },
    body: `
        window.globalHeaderClient = {
            mount: (headerElement) => {
                const shadowRoot = headerElement.attachShadow({ mode: 'open' });
                const host = document.createElement('div');
                host.className = 'host';
                host.textContent = 'Global header (mock)';
                shadowRoot.appendChild(host);
                return Promise.resolve();
            },
            accessMenu: {
                setProfile: () => Promise.resolve(true),
                setApplicationMenuLinks: () => Promise.resolve(),
            },
        };
        window.dispatchEvent(new Event('widget.global_header.mounted'));
    `,
});
