import { html } from 'lit';
import { getStickyOffsetTop, scrollIntoViewBelowSticky } from './sticky-scroll';

const FIXED_HEADER_HEIGHT = 60;
const STICKY_BAR_HEIGHT = 40;

// Een component met de fixed balk in zijn shadow root, zoals de header-widget die vl-header inlaadt.
class StickyScrollTestHeader extends HTMLElement {
    connectedCallback() {
        if (this.shadowRoot) {
            return;
        }
        this.attachShadow({ mode: 'open' }).innerHTML =
            `<div style="position: fixed; top: 0; left: 0; right: 0; height: ${FIXED_HEADER_HEIGHT}px; background: #05c;"></div>`;
    }
}

if (!customElements.get('vl-sticky-scroll-test-header')) {
    customElements.define('vl-sticky-scroll-test-header', StickyScrollTestHeader);
}

const fixedHeader = (height = FIXED_HEADER_HEIGHT) =>
    html`<div
        data-cy="fixed-header"
        style="position: fixed; top: 0; left: 0; right: 0; height: ${height}px; background: #05c;"
    ></div>`;

// Een tweede balk die net onder de fixed header blijft plakken - zoals een sticky vl-functional-header
// onder de globale header.
const stickyBar = () =>
    html`<div
        data-cy="sticky-bar"
        style="position: sticky; top: ${FIXED_HEADER_HEIGHT}px; height: ${STICKY_BAR_HEIGHT}px; background: #fa0;"
    ></div>`;

// Genoeg inhoud voor en na het doel zodat het altijd tot bovenaan de viewport gescrold kan worden.
const contentWithTarget = () => html`
    <div style="height: 800px"></div>
    <h2 data-cy="doel" id="doel">Doel</h2>
    <div style="height: 1500px"></div>
`;

const getTarget = () => Cypress.$('[data-cy=doel]')[0] as HTMLElement;

const getTargetTop = () => getTarget().getBoundingClientRect().top;

describe('cypress-component - common - sticky-scroll utility - getStickyOffsetTop()', () => {
    beforeEach(() => {
        cy.viewport(800, 600);
        cy.window().then((win) => win.scrollTo(0, 0));
    });

    it('should return 0 when there is no sticky or fixed page chrome', () => {
        cy.mount(html`<div>${contentWithTarget()}</div>`);

        cy.then(() => expect(getStickyOffsetTop(getTarget())).to.equal(0));
    });

    it('should measure the height of a fixed header at the top of the viewport', () => {
        cy.mount(html`<div>${fixedHeader()}${contentWithTarget()}</div>`);

        cy.then(() => expect(getStickyOffsetTop(getTarget())).to.equal(FIXED_HEADER_HEIGHT));
    });

    it('should measure stacked chrome (a sticky bar below a fixed header) as one whole', () => {
        cy.mount(html`<div>${fixedHeader()}${stickyBar()}${contentWithTarget()}</div>`);

        // De sticky balk klikt vast onder de fixed header zodra er gescrold wordt.
        cy.window().then((win) => win.scrollTo(0, 500));
        cy.then(() => expect(getStickyOffsetTop(getTarget())).to.equal(FIXED_HEADER_HEIGHT + STICKY_BAR_HEIGHT));
    });

    it('should measure chrome that sits inside a shadow root', () => {
        cy.mount(html`
            <div>
                <vl-sticky-scroll-test-header></vl-sticky-scroll-test-header>
                ${contentWithTarget()}
            </div>
        `);

        cy.then(() => expect(getStickyOffsetTop(getTarget())).to.equal(FIXED_HEADER_HEIGHT));
    });

    it('should ignore sticky content in another column than the target', () => {
        cy.mount(html`
            <div>
                <div
                    data-cy="side"
                    style="position: sticky; top: 0; float: left; width: 200px; height: 400px; background: #ddd;"
                ></div>
                <div style="margin-left: 300px">${contentWithTarget()}</div>
            </div>
        `);

        cy.then(() => expect(getStickyOffsetTop(getTarget())).to.equal(0));
    });

    it('should never claim more than half of the viewport height', () => {
        cy.mount(html`<div>${fixedHeader(500)}${contentWithTarget()}</div>`);

        cy.then(() => expect(getStickyOffsetTop(getTarget())).to.equal(300));
    });
});

describe('cypress-component - common - sticky-scroll utility - scrollIntoViewBelowSticky()', () => {
    beforeEach(() => {
        cy.viewport(800, 600);
        cy.window().then((win) => win.scrollTo(0, 0));
    });

    it('should scroll the target below the fixed header instead of behind it', () => {
        cy.mount(html`<div>${fixedHeader()}${contentWithTarget()}</div>`);

        cy.then(() => {
            scrollIntoViewBelowSticky(getTarget());

            expect(getTargetTop()).to.be.closeTo(FIXED_HEADER_HEIGHT, 1);
            expect(getTarget().style.scrollMarginTop).to.equal(`${FIXED_HEADER_HEIGHT}px`);
        });
    });

    it('should scroll the target below stacked chrome', () => {
        cy.mount(html`<div>${fixedHeader()}${stickyBar()}${contentWithTarget()}</div>`);

        cy.then(() => {
            scrollIntoViewBelowSticky(getTarget());

            expect(getTargetTop()).to.be.closeTo(FIXED_HEADER_HEIGHT + STICKY_BAR_HEIGHT, 1);
        });
    });

    it('should scroll the target to the top of the viewport when there is no chrome to avoid', () => {
        cy.mount(html`<div>${contentWithTarget()}</div>`);

        cy.then(() => {
            scrollIntoViewBelowSticky(getTarget());

            expect(getTargetTop()).to.be.closeTo(0, 1);
            expect(getTarget().style.scrollMarginTop).to.equal('');
        });
    });

    it('should leave a scroll-margin-top set by the consumer untouched', () => {
        cy.mount(html`
            <div>
                ${fixedHeader()}
                <div style="height: 800px"></div>
                <h2 data-cy="doel" id="doel" style="scroll-margin-top: 100px">Doel</h2>
                <div style="height: 1500px"></div>
            </div>
        `);

        cy.then(() => {
            scrollIntoViewBelowSticky(getTarget());

            expect(getTargetTop()).to.be.closeTo(100, 1);
            expect(getTarget().style.scrollMarginTop).to.equal('100px');
        });
    });
});
