import { FluxConfig, registerWebComponents } from '@domg-wc/common';
import { html } from 'lit';
import { VlProzaMessage } from './vl-proza-message.component';

registerWebComponents([VlProzaMessage]);

describe('cypress-component - block components - vl-proza-message', () => {
    const mockDomain = 'mock-domain';
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
                            JSON.stringify({ create: false, read: true, update: false, delete: false }),
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
});
