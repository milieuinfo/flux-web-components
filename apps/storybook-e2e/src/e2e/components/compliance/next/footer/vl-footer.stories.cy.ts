const footerNextDefaultUrl =
    'http://localhost:8080/iframe.html?id=components-compliance-next-footer--footer-default&viewMode=story';

describe('cypress-e2e - compliance components - vl-footer-next - default story', () => {
    beforeEach(() => {
        // zelfde aanpak als in de component tests: zonder deze intercept haalt de test het echte widget-script op bij
        // widgets.tni-vlaanderen.be - traag, buiten onze controle en dus regelmatig falend
        cy.intercept('GET', /widgets.*vlaanderen\.be.*entry/, stubWidgetScript()).as('widgetScript');
    });

    it('should render', () => {
        cy.visit(footerNextDefaultUrl);

        cy.get('vl-footer-next');
        cy.wait('@widgetScript');
        cy.get('#footer__container').find('div').shadow().contains('Global footer (mock)');
    });
});

/**
 * Vervangt het widget-script: het echte script zet window.globalFooterClient klaar en meldt via een window-event dat
 * de widget gemount is. mount() rendert - net als de echte widget - in een shadow root op het meegegeven #footer
 * element, zodat de test de volledige keten (script laden -> mount met het juiste element -> shadow DOM) blijft
 * afdekken, maar dan met stabiele mock-inhoud.
 */
const stubWidgetScript = () => ({
    statusCode: 200,
    headers: { 'Content-Type': 'application/javascript' },
    body: `
        window.globalFooterClient = {
            mount: (footerElement) => {
                const shadowRoot = footerElement.attachShadow({ mode: 'open' });
                const content = document.createElement('div');
                content.textContent = 'Global footer (mock)';
                shadowRoot.appendChild(content);
                return Promise.resolve();
            },
        };
        window.dispatchEvent(new Event('widget.global_footer.mounted'));
    `,
});
