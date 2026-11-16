import { FluxConfig, registerWebComponents } from '@domg-wc/common';
import { html } from 'lit';
import { VlProzaMessage } from './vl-proza-message.component';

registerWebComponents([VlProzaMessage]);

describe('cypress-component - block components - vl-proza-message', () => {
    const mockDomain = 'mock-domain';
    const editableMockDomain = 'editable-domain';
    const mockCode = 'test.bericht';
    const mockTekst = 'Dit is een test bericht';

    beforeEach(() => {
        VlProzaMessage.clearCache();
        // setPreferences() kan maar 1x aangeroepen worden, reset nodig tussen testen
        FluxConfig['preferences'] = null;

        cy.window().then((win) => {
            cy.stub(win, 'fetch').callsFake((uri: string) => {
                if (uri.includes('toegelatenoperaties')) {
                    return Promise.resolve(
                        new win.Response(
                            JSON.stringify({
                                create: false,
                                read: true,
                                update: uri.includes(editableMockDomain),
                                delete: false,
                            }),
                            { status: 200, headers: { 'Content-Type': 'application/json' } }
                        )
                    );
                }
                if (uri.includes(mockCode)) {
                    return Promise.resolve(
                        new win.Response(
                            JSON.stringify({ code: mockCode, tekst: mockTekst }),
                            { status: 200, headers: { 'Content-Type': 'application/json' } }
                        )
                    );
                }
                return Promise.resolve(
                    new win.Response(JSON.stringify({}), {
                        status: 404,
                        headers: { 'Content-Type': 'application/json' },
                    })
                );
            });
        });
    });

    it('should load a message with an explicit domain attribute', () => {
        cy.mount(html`
            <vl-proza-message domain="${mockDomain}" code="${mockCode}"></vl-proza-message>
        `);

        cy.get('vl-proza-message').shadow().find('vl-typography').should('contain.text', mockTekst);
    });

    it('should use prozaDomain from FluxConfig when no domain attribute is set', () => {
        FluxConfig.setPreferences({ prozaDomain: mockDomain });

        cy.mount(html`
            <vl-proza-message code="${mockCode}"></vl-proza-message>
        `);

        cy.get('vl-proza-message').shadow().find('vl-typography').should('contain.text', mockTekst);
    });

    it('should prefer the explicit domain attribute over FluxConfig.prozaDomain', () => {
        FluxConfig.setPreferences({ prozaDomain: 'wrong-domain' });

        cy.mount(html`
            <vl-proza-message domain="${mockDomain}" code="${mockCode}"></vl-proza-message>
        `);

        cy.get('vl-proza-message').shadow().find('vl-typography').should('contain.text', mockTekst);
    });

    it('should show a white inner ring next to the focus outline on the refresh button inside a primary button', () => {
        cy.mount(html`
            <vl-button>
                <vl-proza-message domain="${editableMockDomain}" code="${mockCode}"></vl-proza-message>
            </vl-button>
        `);

        cy.get('vl-proza-message')
            .shadow()
            .find('#refresh-button')
            .shadow()
            .find('button')
            .focus()
            .should('have.focus')
            .and('have.css', 'outline-style', 'solid')
            .and('have.css', 'box-shadow')
            .and('contain', 'rgb(255, 255, 255) 0px 0px 0px 2px');
    });

    it('should give the edit and refresh button a Dutch accessible name that describes the action', () => {
        cy.mount(html`
            <vl-proza-message domain="${editableMockDomain}" code="${mockCode}"></vl-proza-message>
        `);

        cy.get('vl-proza-message')
            .shadow()
            .find('#edit-button')
            .shadow()
            .find('button')
            .should('have.attr', 'aria-label', 'Bericht aanpassen in Proza (opent in een nieuw venster)');
        cy.get('vl-proza-message')
            .shadow()
            .find('#refresh-button')
            .shadow()
            .find('button')
            .should('have.attr', 'aria-label', 'Bericht opnieuw ophalen');
    });
});
