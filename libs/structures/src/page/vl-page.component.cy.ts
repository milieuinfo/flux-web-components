import { registerWebComponents } from '@domg-wc/common';
import { html, nothing } from 'lit';
import { VlPage } from './vl-page.component';

registerWebComponents([VlPage]);

// Met v-center of v-stretch wordt de wrapper absoluut gepositioneerd met height 100%. De host is van zichzelf inline
// en heeft dan geen hoogte om tegen te rekenen, dus geeft een afnemer de host zelf een hoogte - net zoals hier.
const HOST_HEIGHT = 400;

type MountOptions = { center?: boolean; stretch?: boolean; height?: number };

const mountPage = ({ center = false, stretch = false, height }: MountOptions = {}) => {
    cy.mount(
        html`
            <vl-page
                ?v-center=${center}
                ?v-stretch=${stretch}
                style=${height ? `display: block; height: ${height}px` : nothing}
            >
                <div slot="header" data-cy="header">header</div>
                <div slot="main" data-cy="main">main</div>
                <div slot="footer" data-cy="footer">footer</div>
            </vl-page>
        `
    );
};

const getWrapper = () => cy.get('vl-page').shadow().children('div');

const getMainContent = () => cy.get('vl-page').shadow().find('div.vl-page > main.vl-main-content');

describe('cypress-component - structures - vl-page', () => {
    it('should mount', () => {
        mountPage();

        getMainContent();
    });

    it('should be accessible', () => {
        mountPage();

        cy.injectAxe();
        cy.checkA11y('vl-page', {
            // De Cypress mount-harness zet [data-cy-root] zelf in een <main> (support/component-index.html), waardoor
            // het <main> van vl-page altijd genest en dubbel is. Dat is een artefact van de harness, niet van vl-page.
            rules: {
                'landmark-main-is-top-level': { enabled: false },
                'landmark-no-duplicate-main': { enabled: false },
            },
        });
    });

    it('should render the header, the main content and the footer in that order', () => {
        mountPage();

        getWrapper().children().should('have.length', 3);
        getWrapper().children().eq(0).should('match', 'slot[name="header"]');
        getWrapper().children().eq(1).should('match', 'div.vl-page');
        getWrapper().children().eq(2).should('match', 'slot[name="footer"]');
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

        getMainContent().then(([mainContent]) => {
            expect(mainContent.getBoundingClientRect().height).to.be.lessThan(HOST_HEIGHT);
        });
    });

    it('should stretch the main content over the full height of the host with v-stretch', () => {
        mountPage({ stretch: true, height: HOST_HEIGHT });

        getMainContent().then(([mainContent]) => {
            expect(mainContent.getBoundingClientRect().height).to.equal(HOST_HEIGHT);
        });
    });

    // v-center laat de wrapper de host vullen; de verticale centrering zelf komt van een 'top: 50%' op de statisch
    // gepositioneerde .vl-page en heeft daardoor geen effect - gedrag overgenomen uit vl-template.
    it('should let the wrapper fill the host with v-center', () => {
        mountPage({ center: true, height: HOST_HEIGHT });

        getWrapper().then(([wrapper]) => {
            expect(wrapper.getBoundingClientRect().height).to.equal(HOST_HEIGHT);
        });
    });
});
