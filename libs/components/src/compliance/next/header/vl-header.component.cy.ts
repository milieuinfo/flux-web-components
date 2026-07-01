import { registerWebComponents } from '@domg-wc/common';
import { html } from 'lit';
import { ApplicationLink, VlHeader } from './index';

registerWebComponents([VlHeader]);

const identifier = '59188ff6-662b-45b9-b23a-964ad48c2bfb';

describe('cypress-component - compliance components - vl-header-next', () => {
    beforeEach(() => {
        cy.intercept('GET', /widgets.*vlaanderen\.be.*entry/, stubWidgetScriptMinimal()).as('widgetScript');
    });

    afterEach(() => {
        document.querySelector('script#vl-header-widget')?.remove();
        document.querySelector('#header__container')?.remove();
    });

    describe('default', () => {
        beforeEach(() => {
            cy.mount(html`
                <body>
                    <vl-header-next development identifier="${identifier}"></vl-header-next>
                </body>
            `);
        });

        it('should mount', () => {
            cy.get('vl-header-next');
            cy.get('#header__container');
        });

        it('should be accessible', () => {
            cy.injectAxe();

            cy.get('vl-header-next');
            cy.checkA11y('vl-header-next');
            cy.checkA11y('#header__container');
        });

        it('should render with fixed height', () => {
            cy.get('#header__container').should('have.css', 'min-height', '43px');
        });

        it('should wrap the global header in a <header> element so screenreaders pick it up as banner landmark', () => {
            cy.get('#header__container').should('have.prop', 'tagName', 'HEADER');
            cy.get('header[id="header__container"]').should('have.length', 1);
        });
    });

    describe('ready event', () => {
        it('should dispatch ready event when ready', () => {
            cy.window().then((win) => {
                win.addEventListener('ready', cy.stub().as('ready'));
            });
            cy.mount(html`
                <body>
                    <vl-header-next development identifier="${identifier}"></vl-header-next>
                </body>
            `);
            cy.wait('@widgetScript');
            cy.get('@ready').should('have.been.calledOnce');
        });
    });

    describe('applicationLinks', () => {
        const mockApplicationLinks: ApplicationLink[] = [
            {
                label: 'Link 1',
                href: '#link1',
            },
            {
                label: 'Link 2',
                href: '#link2',
            },
        ];

        it('should render the application links', () => {
            cy.viewport(1280, 800);

            cy.intercept('GET', /widgets.*vlaanderen\.be.*entry/, stubWidgetScriptWithApplicationLinks()).as(
                'widgetScript'
            );

            cy.mount(html`
                <body>
                    <vl-header-next
                        development
                        identifier="${identifier}"
                        .applicationLinks=${mockApplicationLinks}
                    ></vl-header-next>
                </body>
            `);

            cy.wait('@widgetScript');
            cy.get('#header__container > div').shadow().find('button.access-menu-toggle__button').click();
            cy.get('#header__container > div')
                .shadow()
                .find(`a[href="${mockApplicationLinks[0].href}"]`)
                .contains(mockApplicationLinks[0].label);
            cy.get('#header__container > div')
                .shadow()
                .find(`a[href="${mockApplicationLinks[1].href}"]`)
                .contains(mockApplicationLinks[1].label);
        });
    });

    describe('skeleton', () => {
        it('should render the skeleton container', () => {
            cy.mount(html`
                <body>
                    <vl-header-next development identifier="${identifier}" skeleton></vl-header-next>
                </body>
            `);

            cy.get('#header__skeleton').should('have.css', 'height', '43px');
        });
    });

    describe('PAPI profile token + idpData', () => {
        beforeEach(() => {
            cy.intercept('GET', /widgets.*vlaanderen\.be.*entry/, stubWidgetScriptCapturingSetProfile()).as(
                'widgetScript'
            );
            cy.intercept('GET', '/sso/ingelogde_gebruiker', { statusCode: 200, body: '' }).as('authActive');
        });

        const lastSetProfileCall = (): Cypress.Chainable<Record<string, unknown> | undefined> =>
            cy.window().then((win) => {
                const calls = (win as unknown as { __setProfileCalls: Record<string, unknown>[] }).__setProfileCalls;
                return calls?.[calls.length - 1];
            });

        it('should pass idpProfileToken via JS property when set', () => {
            cy.mount(html`
                <body>
                    <vl-header-next
                        development
                        identifier="${identifier}"
                        .idpProfileToken=${'token-via-property'}
                    ></vl-header-next>
                </body>
            `);
            cy.wait('@widgetScript');
            cy.wait('@authActive');

            lastSetProfileCall().should((config) => {
                expect(config).to.include({ active: true, idpProfileToken: 'token-via-property' });
            });
        });

        it('should fetch and pass idpProfileToken via profile-token-url', () => {
            cy.intercept('GET', '/api/papi-token', {
                statusCode: 200,
                headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
                body: 'token-from-url',
            }).as('tokenFetch');

            cy.mount(html`
                <body>
                    <vl-header-next
                        development
                        identifier="${identifier}"
                        profile-token-url="/api/papi-token"
                    ></vl-header-next>
                </body>
            `);
            cy.wait('@widgetScript');
            cy.wait('@authActive');
            cy.wait('@tokenFetch');

            lastSetProfileCall().should((config) => {
                expect(config).to.include({ active: true, idpProfileToken: 'token-from-url' });
            });
        });

        it('should let JS property win over profile-token-url', () => {
            cy.intercept('GET', '/api/papi-token', {
                statusCode: 200,
                headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
                body: 'token-from-url',
            }).as('tokenFetch');

            cy.mount(html`
                <body>
                    <vl-header-next
                        development
                        identifier="${identifier}"
                        profile-token-url="/api/papi-token"
                        .idpProfileToken=${'token-via-property'}
                    ></vl-header-next>
                </body>
            `);
            cy.wait('@widgetScript');
            cy.wait('@authActive');

            lastSetProfileCall().should((config) => {
                expect(config).to.include({ idpProfileToken: 'token-via-property' });
            });
        });

        it('should not include idpProfileToken when user is not authenticated', () => {
            cy.intercept('GET', '/sso/ingelogde_gebruiker', { statusCode: 401, body: '' }).as('authInactive');

            cy.mount(html`
                <body>
                    <vl-header-next
                        development
                        identifier="${identifier}"
                        .idpProfileToken=${'token-via-property'}
                    ></vl-header-next>
                </body>
            `);
            cy.wait('@widgetScript');
            cy.wait('@authInactive');

            lastSetProfileCall().should((config) => {
                expect(config).to.have.property('active', false);
                expect(config).to.not.have.property('idpProfileToken');
            });
        });

        it('should pass idpData via JS property when set', () => {
            const mockIdpData = {
                user: { firstName: 'John', name: 'Doe' },
            };

            cy.mount(html`
                <body>
                    <vl-header-next
                        development
                        identifier="${identifier}"
                        .idpData=${mockIdpData}
                    ></vl-header-next>
                </body>
            `);
            cy.wait('@widgetScript');
            cy.wait('@authActive');

            lastSetProfileCall().should((config) => {
                expect(config).to.have.nested.property('idpData.user.firstName', 'John');
            });
        });

        it('should fetch and pass idpData via idp-data-url', () => {
            cy.intercept('GET', '/api/idp-data', {
                statusCode: 200,
                body: { user: { firstName: 'Jane', name: 'Smith' } },
            }).as('idpDataFetch');

            cy.mount(html`
                <body>
                    <vl-header-next
                        development
                        identifier="${identifier}"
                        idp-data-url="/api/idp-data"
                    ></vl-header-next>
                </body>
            `);
            cy.wait('@widgetScript');
            cy.wait('@authActive');
            cy.wait('@idpDataFetch');

            lastSetProfileCall().should((config) => {
                expect(config).to.have.nested.property('idpData.user.firstName', 'Jane');
            });
        });

        it('should not include idpData when a papi token is present', () => {
            const mockIdpData = {
                user: { firstName: 'John', name: 'Doe' },
            };

            cy.mount(html`
                <body>
                    <vl-header-next
                        development
                        identifier="${identifier}"
                        .idpProfileToken=${'token-via-property'}
                        .idpData=${mockIdpData}
                    ></vl-header-next>
                </body>
            `);
            cy.wait('@widgetScript');
            cy.wait('@authActive');

            lastSetProfileCall().should((config) => {
                expect(config).to.include({ active: true, idpProfileToken: 'token-via-property' });
                expect(config).to.not.have.property('idpData');
            });
        });
    });
});

const stubWidgetScriptMinimal = () => ({
    statusCode: 200,
    headers: { 'Content-Type': 'application/javascript' },
    body: `
        window.globalHeaderClient = {
            mount: () => Promise.resolve(),
            accessMenu: {
                setProfile: () => {},
                setApplicationMenuLinks: () => Promise.resolve(),
            },
        };
        window.dispatchEvent(new Event('widget.global_header.mounted'));
    `,
});

const stubWidgetScriptCapturingSetProfile = () => ({
    statusCode: 200,
    headers: { 'Content-Type': 'application/javascript' },
    body: `
        window.__setProfileCalls = [];
        window.globalHeaderClient = {
            mount: () => Promise.resolve(),
            accessMenu: {
                setProfile: (config) => { window.__setProfileCalls.push(config); return Promise.resolve(true); },
                setApplicationMenuLinks: () => Promise.resolve(),
            },
        };
        window.dispatchEvent(new Event('widget.global_header.mounted'));
    `,
});

const stubWidgetScriptWithApplicationLinks = () => ({
    statusCode: 200,
    headers: { 'Content-Type': 'application/javascript' },
    body: `
        window.globalHeaderClient = (() => {
            let appLinks = [];
            let shadowRoot = null;

            return {
                mount: function(headerElement) {
                    shadowRoot = headerElement.attachShadow({ mode: 'open' });
                    const btn = document.createElement('button');
                    btn.className = 'access-menu-toggle__button';
                    btn.onclick = function() {
                        appLinks.forEach(function(link) {
                            const a = document.createElement('a');
                            a.href = link.href;
                            a.textContent = link.label;
                            shadowRoot.appendChild(a);
                        });
                    };
                    shadowRoot.appendChild(btn);
                    return Promise.resolve();
                },
                accessMenu: {
                    setProfile: () => {},
                    setApplicationMenuLinks: function(links) {
                        appLinks = links;
                        return Promise.resolve();
                    },
                },
            };
        })();
        window.dispatchEvent(new Event('widget.global_header.mounted'));
    `,
});
