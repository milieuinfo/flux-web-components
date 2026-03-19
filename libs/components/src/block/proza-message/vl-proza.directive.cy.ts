import { FluxConfig, registerWebComponents } from '@domg-wc/common';
import { html } from 'lit';
import { VlAlert } from '../alert/vl-alert.component';
import { VlProzaMessage } from './vl-proza-message.component';
import { vlProza } from './vl-proza.directive';

registerWebComponents([VlAlert]);

describe('cypress-component - block components - vlProza directive', () => {
    const mockDomain = 'test-domain';

    const stubFetch = (responses: Record<string, { code: string; tekst: string }>) => {
        cy.window().then((win) => {
            cy.stub(win, 'fetch').callsFake((uri: string) => {
                const matchingKey = Object.keys(responses).find((key) => uri.includes(key));
                if (matchingKey) {
                    return Promise.resolve(
                        new win.Response(JSON.stringify(responses[matchingKey]), {
                            status: 200,
                            headers: { 'Content-Type': 'application/json' },
                        })
                    );
                }
                return Promise.resolve(
                    new win.Response(JSON.stringify({ create: false, read: true, update: false, delete: false }), {
                        status: 200,
                        headers: { 'Content-Type': 'application/json' },
                    })
                );
            });
        });
    };

    beforeEach(() => {
        VlProzaMessage.clearCache();
        FluxConfig['preferences'] = { ...FluxConfig.getPreferences(), prozaDomain: mockDomain };
    });

    it('should resolve a proza message in a title attribute', () => {
        stubFetch({
            [`${mockDomain}/alert.titel`]: { code: 'alert.titel', tekst: 'Opgelet!' },
        });

        cy.mount(html` <vl-alert data-cy="alert" icon="warning" title=${vlProza('alert.titel')} type="warning">
        </vl-alert>`);

        cy.get('vl-alert').shadow().find('#title').should('contain.text', 'Opgelet!');
    });

    it('should show the fallback value while loading', () => {
        stubFetch({
            [`${mockDomain}/alert.titel`]: { code: 'alert.titel', tekst: 'Opgelet!' },
        });

        cy.mount(html` <vl-alert
            data-cy="alert"
            icon="warning"
            title=${vlProza('alert.titel', { fallback: 'Laden...' })}
            type="warning"
        >
        </vl-alert>`);

        cy.get('vl-alert').shadow().find('#title').should('contain.text', 'Opgelet!');
    });

    it('should strip HTML tags from the message', () => {
        stubFetch({
            [`${mockDomain}/alert.titel`]: {
                code: 'alert.titel',
                tekst: '<p>Dit is een <b>belangrijke</b> melding.</p>',
            },
        });

        cy.mount(html` <vl-alert data-cy="alert" icon="warning" title=${vlProza('alert.titel')} type="warning">
        </vl-alert>`);

        cy.get('vl-alert').shadow().find('#title').should('contain.text', 'Dit is een belangrijke melding.');
    });

    it('should replace template parameters', () => {
        stubFetch({
            [`${mockDomain}/welkom.titel`]: {
                code: 'welkom.titel',
                tekst: '<p>Welkom, ${parameter.naam}!</p>',
            },
        });

        cy.mount(html` <vl-alert
            data-cy="alert"
            icon="user"
            title=${vlProza('welkom.titel', { parameters: { naam: 'Jan' } })}
            type="success"
        >
        </vl-alert>`);

        cy.get('vl-alert').shadow().find('#title').should('contain.text', 'Welkom, Jan!');
    });

    it('should use the domain from options when provided', () => {
        const otherDomain = 'other-domain';

        stubFetch({
            [`${otherDomain}/alert.titel`]: { code: 'alert.titel', tekst: 'Ander domein titel' },
        });

        cy.mount(html` <vl-alert
            data-cy="alert"
            icon="info-circle"
            title=${vlProza('alert.titel', { domain: otherDomain })}
            type="info"
        >
        </vl-alert>`);

        cy.get('vl-alert').shadow().find('#title').should('contain.text', 'Ander domein titel');
    });

    it('should use prozaDomain from FluxConfig as default', () => {
        stubFetch({
            [`${mockDomain}/alert.titel`]: { code: 'alert.titel', tekst: 'FluxConfig domein' },
        });

        cy.mount(html` <vl-alert data-cy="alert" icon="warning" title=${vlProza('alert.titel')} type="warning">
        </vl-alert>`);

        cy.get('vl-alert').shadow().find('#title').should('contain.text', 'FluxConfig domein');
    });

    it('should fallback to FluxConfig prozaDomain when options.domain is an empty string', () => {
        stubFetch({
            [`${mockDomain}/alert.titel`]: { code: 'alert.titel', tekst: 'FluxConfig domein (via empty override)' },
        });

        cy.mount(html` <vl-alert
            data-cy="alert"
            icon="warning"
            title=${vlProza('alert.titel', { domain: '' })}
            type="warning"
        >
        </vl-alert>`);

        cy.get('vl-alert').shadow().find('#title').should('contain.text', 'FluxConfig domein (via empty override)');
    });

    it('should throw an error when no domain is configured', () => {
        FluxConfig['preferences'] = { ...FluxConfig.getPreferences(), prozaDomain: undefined };

        Cypress.once('fail', (err) => {
            expect(err.message).to.contain('[vlProza] Geen domein opgegeven');
            return false;
        });

        cy.mount(html` <vl-alert data-cy="alert" icon="warning" title=${vlProza('alert.titel')} type="warning">
        </vl-alert>`);
    });
});
