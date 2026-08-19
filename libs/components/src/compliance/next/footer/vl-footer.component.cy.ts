import { registerWebComponents } from '@domg-wc/common';
import { html } from 'lit';
import { VlFooter } from './vl-footer.component';

registerWebComponents([VlFooter]);

type MountDefaultProps = {
    development: boolean;
    identifier: string;
    onReady: (evt: CustomEvent) => void;
};

const mountDefault = (props: MountDefaultProps) => {
    cy.mount(html`
        <body>
            <vl-footer-next
                ?development=${props.development}
                identifier=${props.identifier}
                @ready=${(evt: CustomEvent) => props.onReady(evt)}
            ></vl-footer-next>
        </body>
    `);

    // elke test moet wachten tot het widget-script uitgevoerd is
    cy.wait('@widgetScript');

    return cy.window().its('globalFooterClient').should('exist');
};

const props: MountDefaultProps = {
    development: false,
    identifier: '0337f8dc-3266-4e7a-8f4a-95fd65189e5b',
    onReady: () => console.log('ready'),
};

// root-niveau hooks: mocha draait deze voor/na elke test van elke suite in dit bestand, net zoals ze
// eerder als hooks van de omhullende describe deden
beforeEach(() => {
    // zonder deze intercept haalt elke test het echte widget-script op bij widgets.(tni-)vlaanderen.be: traag,
    // buiten onze controle en dus regelmatig falend
    cy.intercept('GET', /widgets.*vlaanderen\.be.*entry/, stubWidgetScript()).as('widgetScript');
});

afterEach(() => {
    // awaitScript slaat het laden over als er al een script met dit id staat, dus zonder opkuis krijgt de volgende
    // test geen widget meer. Via document i.p.v. cy.get: het script hoeft er niet te zijn als een test vroeg faalt.
    document.querySelector('script#vl-footer-widget')?.remove();
    // De component ruimt zijn container zelf op bij disconnect; deze regel vangt de gevallen op waarin dat niet
    // gebeurde, zodat een volgende test nooit twee #footer__container-elementen ziet.
    document.querySelector('#footer__container')?.remove();
    // Weg met de client van deze test, anders is de wachtvoorwaarde in mountDefault meteen voldaan.
    delete (window as unknown as Record<string, unknown>).globalFooterClient;
});

describe('cypress-component - compliance components - vl-footer-next - default', () => {
    beforeEach(() => {
        mountDefault(props);
    });

    it('should mount', () => {
        cy.get('vl-footer-next');
    });

    it('should be accessible', () => {
        cy.get('vl-footer-next');

        cy.injectAxe();
        cy.checkA11y('vl-footer-next');
    });
});

describe('cypress-component - compliance components - vl-footer-next - properties default', () => {
    it('should have default values properties', () => {
        mountDefault(props);

        cy.get('vl-footer-next').should('not.have.attr', 'development', props.development);
        cy.get('vl-footer-next').should('have.attr', 'identifier', props.identifier);
    });
});

describe('cypress-component - compliance components - vl-footer-next - properties reflect', () => {
    it('should reflect the <development> attribute', () => {
        mountDefault({ ...props, development: true });

        cy.get('vl-footer-next').should('have.attr', 'development', '');
    });

    it('should reflect the <identifier> attribute', () => {
        mountDefault({ ...props, identifier: 'TEST_IDENTIFIER' });

        cy.get('vl-footer-next').should('have.attr', 'identifier', 'TEST_IDENTIFIER');
    });
});

describe('cypress-component - compliance components - vl-footer-next - events', () => {
    it('should emit ready event', () => {
        // mountDefault hangt de listener via @ready op het element zelf;
        // de component vuurt 'ready' af zodra de widget gemount is
        mountDefault({ ...props, development: true, onReady: cy.stub().as('ready') });

        cy.get('@ready').should('have.been.calledOnce');
    });
});

describe('cypress-component - compliance components - vl-footer-next - sticky footer spacer', () => {
    const RESERVED_HEIGHT_VAR = '--vl-footer--bar-reserved-height';

    afterEach(() => {
        document.documentElement.style.removeProperty(RESERVED_HEIGHT_VAR);
    });

    it('should reserve space for the fixed footer bar on the container', () => {
        mountDefault({ ...props, development: true, identifier: 'TEST_IDENTIFIER' });

        cy.get('#footer__container').should('have.css', 'min-height', '48px');
    });

    it('should let consumers override the reserved height via CSS variable', () => {
        document.documentElement.style.setProperty(RESERVED_HEIGHT_VAR, '60px');
        mountDefault({ ...props, development: true, identifier: 'TEST_IDENTIFIER' });

        cy.get('#footer__container').should('have.css', 'min-height', '60px');
    });

    it('should let consumers disable the reservation via CSS variable', () => {
        document.documentElement.style.setProperty(RESERVED_HEIGHT_VAR, '0px');
        mountDefault({ ...props, development: true, identifier: 'TEST_IDENTIFIER' });

        cy.get('#footer__container').should('have.css', 'min-height', '0px');
    });
});

/**
 * Vervangt het widget-script: het echte script zet window.globalFooterClient klaar en meldt via een window-event dat de
 * widget gemount is. Meer heeft de component niet nodig.
 */
const stubWidgetScript = () => ({
    statusCode: 200,
    headers: { 'Content-Type': 'application/javascript' },
    body: `
        window.globalFooterClient = {
            mount: () => Promise.resolve(),
        };
        window.dispatchEvent(new Event('widget.global_footer.mounted'));
    `,
});
