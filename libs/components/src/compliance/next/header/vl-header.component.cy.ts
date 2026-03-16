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
