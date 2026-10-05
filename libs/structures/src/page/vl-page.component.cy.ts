import { registerWebComponents } from '@domg-wc/common';
import { html, nothing } from 'lit';
import { VlPage } from './vl-page.component';

registerWebComponents([VlPage]);

const HOST_HEIGHT = 400;

type MountOptions = { center?: boolean; stretch?: boolean; height?: number; customCSS?: string };

const mountPage = ({ center = false, stretch = false, height, customCSS }: MountOptions = {}) => {
    cy.mount(
        html`
            <vl-page
                ?v-center=${center}
                ?v-stretch=${stretch}
                custom-css=${customCSS ?? nothing}
                style=${height ? `height: ${height}px` : nothing}
            >
                <div slot="header" data-cy="header">header</div>
                <div slot="main" data-cy="main">main</div>
                <div slot="footer" data-cy="footer">footer</div>
            </vl-page>
        `
    );
};

const getMainContent = () => cy.get('vl-page').shadow().find('div.vl-page > main.vl-main-content');

const rectOf = (selector: string) => cy.get(selector).then(([element]) => element.getBoundingClientRect());

// De Cypress mount-harness zet [data-cy-root] zelf in een <main> (support/component-index.html), waardoor
// het <main> van vl-page altijd genest en dubbel is. Dat is een artefact van de harness, niet van vl-page.
const a11yOptions = {
    rules: {
        'landmark-main-is-top-level': { enabled: false },
        'landmark-no-duplicate-main': { enabled: false },
    },
};

describe('cypress-component - structures - vl-page', () => {
    it('should mount', () => {
        mountPage();

        getMainContent();
    });

    it('should be accessible', () => {
        mountPage();

        cy.injectAxe();
        cy.checkA11y('vl-page', a11yOptions);
    });

    it('should be accessible without slotted content', () => {
        cy.mount(html`<vl-page></vl-page>`);

        getMainContent();
        cy.injectAxe();
        cy.checkA11y('vl-page', a11yOptions);
    });

    it('should render the header, the main content and the footer in that order', () => {
        mountPage();

        cy.get('vl-page').shadow().children().should('have.length', 3);
        cy.get('vl-page').shadow().children().eq(0).should('match', 'slot[name="header"]');
        cy.get('vl-page').shadow().children().eq(1).should('match', 'div.vl-page');
        cy.get('vl-page').shadow().children().eq(2).should('match', 'slot[name="footer"]');
    });

    it('should render the main slot inside the main landmark', () => {
        mountPage();

        getMainContent().children().should('match', 'slot[name="main"]');
        cy.get('[data-cy="main"]').should('be.visible').and('contain.text', 'main');
    });

    it('should render the slotted header and footer content', () => {
        mountPage();

        cy.get('[data-cy="header"]').should('be.visible').and('contain.text', 'header');
        cy.get('[data-cy="footer"]').should('be.visible').and('contain.text', 'footer');
    });

    it('should keep the main content at its content height without v-stretch', () => {
        mountPage({ height: HOST_HEIGHT });
        getMainContent();

        rectOf('[data-cy="header"]').then((header) => {
            rectOf('[data-cy="main"]').then((main) => {
                expect(main.top).to.equal(header.bottom);
                expect(main.height).to.be.lessThan(HOST_HEIGHT / 2);
            });
        });
    });

    it('should let the main content fill the space between the header and the footer with v-stretch', () => {
        mountPage({ stretch: true, height: HOST_HEIGHT });
        getMainContent();

        rectOf('vl-page').then((host) => {
            rectOf('[data-cy="header"]').then((header) => {
                rectOf('[data-cy="footer"]').then((footer) => {
                    rectOf('[data-cy="main"]').then((main) => {
                        expect(main.top).to.equal(header.bottom);
                        expect(main.bottom).to.equal(footer.top);
                        expect(footer.bottom).to.equal(host.bottom);
                        expect(main.height).to.equal(HOST_HEIGHT - header.height - footer.height);
                    });
                });
            });
        });
    });

    it('should keep a horizontally centered main content at full width with v-stretch', () => {
        cy.mount(html`
            <vl-page v-stretch style="height: ${HOST_HEIGHT}px">
                <div slot="main" data-cy="main" style="margin: 0 auto; padding: 0 10px">main</div>
            </vl-page>
        `);
        getMainContent();

        rectOf('vl-page').then((host) => {
            rectOf('[data-cy="main"]').then((main) => {
                expect(main.width).to.equal(host.width);
                expect(main.height).to.equal(HOST_HEIGHT);
            });
        });
    });

    it('should stack multiple main elements with v-stretch', () => {
        cy.mount(html`
            <vl-page v-stretch style="height: ${HOST_HEIGHT}px">
                <div slot="main" data-cy="main-1">main 1</div>
                <div slot="main" data-cy="main-2">main 2</div>
            </vl-page>
        `);
        getMainContent();

        rectOf('vl-page').then((host) => {
            rectOf('[data-cy="main-1"]').then((first) => {
                rectOf('[data-cy="main-2"]').then((second) => {
                    expect(first.width).to.equal(host.width);
                    expect(second.width).to.equal(host.width);
                    expect(second.top).to.equal(first.bottom);
                    expect(second.bottom).to.equal(host.bottom);
                });
            });
        });
    });

    it('should keep the content visible with v-stretch when the host has no height', () => {
        mountPage({ stretch: true });

        cy.get('[data-cy="main"]').should('be.visible');
        rectOf('[data-cy="header"]').then((header) => {
            rectOf('[data-cy="main"]').then((main) => {
                expect(main.top).to.equal(header.bottom);
                expect(main.height).to.be.greaterThan(0);
            });
        });
    });

    it('should center the main content between the header and the footer with v-center', () => {
        mountPage({ center: true, height: HOST_HEIGHT });
        getMainContent();

        rectOf('[data-cy="header"]').then((header) => {
            rectOf('[data-cy="footer"]').then((footer) => {
                rectOf('[data-cy="main"]').then((main) => {
                    const spaceAbove = main.top - header.bottom;
                    const spaceBelow = footer.top - main.bottom;

                    expect(spaceAbove).to.be.greaterThan(0);
                    expect(spaceAbove).to.be.closeTo(spaceBelow, 1);
                });
            });
        });
    });

    it('should apply the custom css', () => {
        mountPage({ customCSS: '.vl-page { padding-top: 10px; }' });

        cy.get('vl-page').shadow().find('div.vl-page').should('have.css', 'padding-top', '10px');
    });
});

describe('cypress-component - structures - vl-page - with vl-header-next and vl-footer-next', () => {
    const HEADER_HEIGHT = 43;
    const FOOTER_HEIGHT = 128;

    // vl-header-next en vl-footer-next renderen niets in hun slot: ze zetten hun container vooraan en achteraan in de
    // body. Deze stub doet hetzelfde, zonder de widgets te laden.
    const stubHeaderAndFooterContainers = () => {
        cy.document().then((document) => {
            document.body.insertAdjacentHTML(
                'afterbegin',
                `<header id="header__container" style="height: ${HEADER_HEIGHT}px"></header>`,
            );
            document.body.insertAdjacentHTML(
                'beforeend',
                `<footer id="footer__container" style="height: ${FOOTER_HEIGHT}px"></footer>`,
            );
        });
    };

    // het recept uit de documentatie (Hoogte), toegepast op de keten body > main > [data-cy-root] > div > vl-page
    // van de harness
    const applyPageHeightRecipe = () => {
        cy.document().then((document) => {
            const style = document.createElement('style');
            style.id = 'page-height-recipe';
            style.textContent = `
                html { height: 100%; }
                body { display: flex; flex-direction: column; min-height: 100%; margin: 0; }
                main, [data-cy-root], [data-cy-root] > div { display: flex; flex: 1; flex-direction: column; }
                vl-page { flex: 1; }
            `;
            document.head.append(style);
        });
    };

    const mountPageWithHeaderAndFooter = ({ center = false, stretch = false }: MountOptions) => {
        stubHeaderAndFooterContainers();
        applyPageHeightRecipe();
        cy.mount(html`
            <vl-page ?v-center=${center} ?v-stretch=${stretch}>
                <vl-header-next slot="header"></vl-header-next>
                <div slot="main" data-cy="main">main</div>
                <vl-footer-next slot="footer"></vl-footer-next>
            </vl-page>
        `);
        getMainContent();
    };

    afterEach(() => {
        cy.document().then((document) => {
            document
                .querySelectorAll('#header__container, #footer__container, #page-height-recipe')
                .forEach((element) => element.remove());
        });
    });

    it('should fit the page in the viewport with v-stretch', () => {
        mountPageWithHeaderAndFooter({ stretch: true });

        cy.window().then((window) => {
            rectOf('#header__container').then((header) => {
                rectOf('#footer__container').then((footer) => {
                    rectOf('[data-cy="main"]').then((main) => {
                        expect(window.document.documentElement.scrollHeight).to.equal(window.innerHeight);
                        expect(footer.bottom).to.be.closeTo(window.innerHeight, 1);
                        expect(main.top).to.be.closeTo(header.bottom, 1);
                        expect(main.bottom).to.be.closeTo(footer.top, 1);
                    });
                });
            });
        });
    });

    it('should center the main content in the visible space between the header and the footer with v-center', () => {
        mountPageWithHeaderAndFooter({ center: true });

        cy.window().then((window) => {
            rectOf('#header__container').then((header) => {
                rectOf('#footer__container').then((footer) => {
                    rectOf('[data-cy="main"]').then((main) => {
                        const spaceAbove = main.top - header.bottom;
                        const spaceBelow = footer.top - main.bottom;

                        expect(window.document.documentElement.scrollHeight).to.equal(window.innerHeight);
                        expect(footer.bottom).to.be.closeTo(window.innerHeight, 1);
                        expect(spaceAbove).to.be.greaterThan(0);
                        expect(spaceAbove).to.be.closeTo(spaceBelow, 1);
                    });
                });
            });
        });
    });
});
