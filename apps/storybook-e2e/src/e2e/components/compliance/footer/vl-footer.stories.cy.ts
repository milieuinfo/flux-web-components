const footerDefaultUrl = 'http://localhost:8080/iframe.html?id=components-compliance-footer--footer-default&viewMode=story';

describe('cypress-e2e - compliance components - vl-footer - default story', () => {
    beforeEach(() => {
        // zelfde aanpak als bij de next-variant: zonder deze intercepts haalt de test het echte polyfill- en
        // client-script op bij prod.widgets.burgerprofiel.vlaanderen.be, waarna de client de widget bootstrapt bij
        // tni.widgets.burgerprofiel.dev-vlaanderen.be - dat endpoint is traag, buiten onze controle en dus regelmatig
        // falend. Met een gestubde client vertrekt die bootstrap-call zelfs niet meer.
        cy.intercept('GET', /burgerprofiel.*vl-widget-polyfill/, stubPolyfillScript()).as('polyfillScript');
        cy.intercept('GET', /burgerprofiel.*vl-widget-client/, stubWidgetClientScript('footer')).as(
            'widgetClientScript'
        );
    });

    it('should render', () => {
        cy.visit(footerDefaultUrl);

        cy.get('vl-footer');
        cy.wait('@widgetClientScript');
        cy.get('#footer__container').find('footer').contains('Global footer (mock)');
    });
});

const stubPolyfillScript = () => ({
    statusCode: 200,
    headers: { 'Content-Type': 'application/javascript' },
    body: '/* polyfill stub */',
});

/**
 * Vervangt het widget client-script: het echte script zet window.vl.widget.client klaar, waarna de component via
 * bootstrap(widgetUrl) een widget krijgt die hij met setMountElement/mount in het #footer element rendert. De stub
 * bootst dat na met stabiele mock-inhoud (een <footer> element, zoals de echte widget), zodat de test de volledige
 * keten (script laden -> bootstrap -> mount in het juiste element) blijft afdekken.
 */
const stubWidgetClientScript = (elementTag: 'header' | 'footer') => ({
    statusCode: 200,
    headers: { 'Content-Type': 'application/javascript' },
    body: `
        window.vl = window.vl || {};
        window.vl.widget = window.vl.widget || {};
        window.vl.widget.client = {
            bootstrap: () => {
                let mountElement = null;
                return Promise.resolve({
                    setMountElement: (element) => { mountElement = element; },
                    mount: () => {
                        const rendered = document.createElement('${elementTag}');
                        rendered.textContent = 'Global ${elementTag} (mock)';
                        mountElement.appendChild(rendered);
                        return Promise.resolve();
                    },
                    getExtension: () => Promise.resolve({
                        getMenu: () => ({ getGroup: () => ({ addMultiple: () => {} }) }),
                        configure: () => {},
                    }),
                    on: () => {},
                });
            },
        };
    `,
});
