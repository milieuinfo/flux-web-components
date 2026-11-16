import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { registerWebComponents } from '@domg-wc/common';
import { VlDocumentComponent } from '../document';
import { VlSpotlight } from './index';

registerWebComponents([VlSpotlight, VlDocumentComponent]);

const getElementAtCenterOf = (spotlight: HTMLElement, element: Element): Element | null => {
    const { left, top, width, height } = element.getBoundingClientRect();
    return spotlight.shadowRoot!.elementFromPoint(left + width / 2, top + height / 2);
};

const getLinkAtCenterOf = (spotlight: HTMLElement, element: Element): Element | null => {
    const elementAtCenter = getElementAtCenterOf(spotlight, element);
    return elementAtCenter?.closest('a') ?? elementAtCenter?.assignedSlot?.closest('a') ?? null;
};

// A trusted click via CDP, so the browser hit-tests the point like a real mouse would.
const realClick = (element: Element, button: 'left' | 'middle' = 'left') => {
    const frame = window.parent.document.querySelector('iframe') as HTMLIFrameElement;
    const frameRect = frame.getBoundingClientRect();
    const scale = frameRect.width / frame.offsetWidth;
    const rect = element.getBoundingClientRect();
    const x = frameRect.x + (rect.x + rect.width / 2) * scale;
    const y = frameRect.y + (rect.y + rect.height / 2) * scale;
    const dispatch = (type: string) =>
        Cypress.automation('remote:debugger:protocol', {
            command: 'Input.dispatchMouseEvent',
            params: { type, x, y, button, clickCount: 1 },
        });
    return dispatch('mousePressed').then(() => dispatch('mouseReleased'));
};

const recordFollowedLink = (eventType: 'click' | 'auxclick') =>
    cy.window().then((win) => {
        const followed: string[] = [];
        win.addEventListener(
            eventType,
            (event) => {
                const link = event.composedPath().find((node) => node instanceof win.HTMLAnchorElement);
                followed.push((link as HTMLAnchorElement | undefined)?.href ?? '');
                event.preventDefault();
            },
            { capture: true, once: true }
        );
        cy.wrap(followed).as('followedLink');
    });

// Like data that arrives later: the first render and its slotchange are done.
const setTitleTextAfterFirstRender = (text: string) =>
    cy
        .get('vl-spotlight')
        .then(($spotlight) => ($spotlight[0] as VlSpotlight).updateComplete)
        .then(() => cy.get('#title'))
        .then(($title) => {
            $title[0].textContent = text;
        });

describe('cypress-component - block components - vl-spotlight', () => {
    it('should render', () => {
        cy.mount(html`<vl-spotlight></vl-spotlight>`);

        cy.get(`vl-spotlight`).should('be.visible');
    });

    it('should be accessible', () => {
        cy.mount(html`<vl-spotlight></vl-spotlight>`);

        cy.injectAxe();
        cy.checkA11y('vl-spotlight');
    });

    it('should have a title', () => {
        cy.mount(html`
            <vl-spotlight>
                <span slot="title">Premies voor renovatie</span>
            </vl-spotlight>
        `);

        cy.get(`vl-spotlight`).contains('Premies voor renovatie');
    });

    it('should have a subtitle', () => {
        cy.mount(html`
            <vl-spotlight>
                <span slot="title">Premies voor renovatie</span>
                <span slot="subtitle">Artikel 3.3.1</span>
            </vl-spotlight>
        `);

        cy.get(`vl-spotlight`).contains('Artikel 3.3.1');
    });

    it('should have content', () => {
        cy.mount(html`
            <vl-spotlight>
                <span slot="title">Premies voor renovatie</span>
                <span slot="content">Er zijn er verschillende...</span>
            </vl-spotlight>
        `);

        cy.get(`vl-spotlight`).contains('Er zijn er verschillende...');
    });

    it('should have a border by default', () => {
        cy.mount(html`
            <vl-spotlight>
                <span slot="title">Premies voor renovatie</span>
            </vl-spotlight>
        `);

        cy.get(`vl-spotlight`)
            .shadow()
            .find('article')
            .shouldHaveComputedStyle({ pseudo: 'before', style: 'height', value: '2px' })
            .shouldHaveComputedStyle({ pseudo: 'before', style: 'background-color', value: 'rgb(203, 210, 218)' });
    });

    it('should have no border', () => {
        cy.mount(html`
            <vl-spotlight no-border>
                <span slot="title">Premies voor renovatie</span>
            </vl-spotlight>
        `);

        cy.get(`vl-spotlight`).shadow().find('article').should('have.class', 'vl-spotlight--no-border');
    });

    it('should have an external link', () => {
        cy.mount(html`
            <vl-spotlight link="http://www.google.com" external>
                <span slot="title">Premies voor renovatie</span>
            </vl-spotlight>
        `);

        cy.get(`vl-spotlight`)
            .shadow()
            .find('a')
            .should('have.attr', 'href', 'http://www.google.com')
            .and('have.attr', 'target', '_blank')
            .and('have.attr', 'rel', 'noopener noreferrer nofollow');
        cy.get(`vl-spotlight`).shadow().find('span.vl-icon--external').should('exist');
    });

    it('should hide the external icon from assistive technology', () => {
        cy.mount(html`
            <vl-spotlight link="http://www.google.com" external>
                <span slot="title">Premies voor renovatie</span>
            </vl-spotlight>
        `);

        cy.get('vl-spotlight').shadow().find('a .vl-icon--external').should('have.attr', 'aria-hidden', 'true');
    });

    it('should only link the title, not the rest of the card', () => {
        cy.mount(html`
            <vl-spotlight link="https://example.com">
                <span slot="title">Premies voor renovatie</span>
                <span slot="subtitle">Artikel 3.3.1</span>
                <span slot="text">Gaat u bouwen of verbouwen?</span>
                <span slot="content">Er zijn er verschillende...</span>
            </vl-spotlight>
        `);

        cy.get('vl-spotlight')
            .shadow()
            .find('a')
            .should('have.length', 1)
            .and('have.attr', 'href', 'https://example.com');
        cy.get('vl-spotlight').shadow().find('h3 a slot[name="title"]').should('exist');
        cy.get('vl-spotlight').shadow().find('a slot').should('have.length', 1);
        cy.get('vl-spotlight').shadow().find('article.vl-spotlight slot').should('have.length', 4);
    });

    it('should not render a link without the link attribute', () => {
        cy.mount(html`
            <vl-spotlight>
                <span slot="title">Premies voor renovatie</span>
            </vl-spotlight>
        `);

        cy.get('vl-spotlight').shadow().find('h3 slot[name="title"]').should('exist');
        cy.get('vl-spotlight').shadow().find('a').should('not.exist');
    });

    it('should keep the whole card clickable', () => {
        cy.mount(html`
            <vl-spotlight link="https://example.com" img-src="dak.jpg" img-alt="" style="display: block; width: 400px;">
                <span slot="title">Premies voor renovatie</span>
                <span slot="subtitle">Artikel 3.3.1</span>
                <span slot="text">Gaat u bouwen of verbouwen?</span>
            </vl-spotlight>
        `);

        cy.get('vl-spotlight').shadow().find('img').should('exist');
        cy.get('vl-spotlight').then(($spotlight) => {
            const spotlight = $spotlight[0];
            const link = spotlight.shadowRoot!.querySelector('a')!;
            const card = spotlight.shadowRoot!.querySelector('.vl-spotlight')!;
            const { left, top, right, bottom } = card.getBoundingClientRect();

            expect(getLinkAtCenterOf(spotlight, spotlight.querySelector('[slot="title"]')!)).to.equal(link);
            expect(getLinkAtCenterOf(spotlight, spotlight.querySelector('[slot="subtitle"]')!)).to.equal(link);
            expect(getLinkAtCenterOf(spotlight, spotlight.querySelector('[slot="text"]')!)).to.equal(link);
            expect(getLinkAtCenterOf(spotlight, spotlight.shadowRoot!.querySelector('img')!)).to.equal(link);
            expect(spotlight.shadowRoot!.elementFromPoint(left + 1, top + 1)).to.equal(link);
            expect(spotlight.shadowRoot!.elementFromPoint(right - 1, bottom - 1)).to.equal(link);
        });
    });

    it('should follow the link when clicking next to the title', () => {
        const onClick = cy.stub().as('click');
        cy.mount(html`
            <vl-spotlight link="https://example.com" style="display: block; width: 400px;">
                <span slot="title">Premies voor renovatie</span>
                <span slot="text">Gaat u bouwen of verbouwen?</span>
            </vl-spotlight>
        `);
        cy.get('vl-spotlight')
            .shadow()
            .find('a')
            .then(($link) => {
                $link[0].addEventListener('click', (event) => {
                    event.preventDefault();
                    onClick();
                });
            });

        cy.get('vl-spotlight').click('bottomRight');

        cy.get('@click').should('have.been.calledOnce');
    });

    it('should follow the spotlight link when clicking anywhere on the card', () => {
        cy.mount(html`
            <vl-spotlight link="https://example.com/">
                <span slot="title">Premies voor renovatie</span>
                <span slot="text" id="text">Gaat u bouwen of verbouwen?</span>
            </vl-spotlight>
        `);
        recordFollowedLink('click');

        cy.get('#text')
            .should('be.visible')
            .then(($text) => realClick($text[0]));
        cy.get('@followedLink').should('deep.equal', ['https://example.com/']);
    });

    it('should follow the spotlight link when middle clicking on the card', () => {
        cy.mount(html`
            <vl-spotlight link="https://example.com/">
                <span slot="title">Premies voor renovatie</span>
                <span slot="text" id="text">Gaat u bouwen of verbouwen?</span>
            </vl-spotlight>
        `);
        recordFollowedLink('auxclick');

        cy.get('#text')
            .should('be.visible')
            .then(($text) => realClick($text[0], 'middle'));
        cy.get('@followedLink').should('deep.equal', ['https://example.com/']);
    });

    it('should keep the card clickable without a title', () => {
        cy.mount(html`
            <vl-spotlight link="https://example.com/" link-label="Premies voor renovatie">
                <span slot="text" id="text">Gaat u bouwen of verbouwen?</span>
            </vl-spotlight>
        `);
        recordFollowedLink('click');

        cy.get('#text')
            .should('be.visible')
            .then(($text) => realClick($text[0]));
        cy.get('@followedLink').should('deep.equal', ['https://example.com/']);
    });

    it('should keep the link reachable with the keyboard without a title', () => {
        cy.mount(html`
            <vl-spotlight link="https://example.com/" link-label="Premies voor renovatie">
                <span slot="text">Gaat u bouwen of verbouwen?</span>
            </vl-spotlight>
        `);

        cy.press(Cypress.Keyboard.Keys.TAB);

        cy.get('vl-spotlight')
            .shadow()
            .find('a')
            .should('have.focus')
            .and('have.attr', 'aria-label', 'Premies voor renovatie');
    });

    it('should not render an empty heading for a link without a title', () => {
        cy.mount(html`
            <vl-spotlight link="https://example.com/" link-label="Premies voor renovatie" external>
                <span slot="text">Gaat u bouwen of verbouwen?</span>
            </vl-spotlight>
        `);

        cy.get('vl-spotlight').shadow().find('a').should('exist');
        cy.get('vl-spotlight').shadow().find('h3').should('not.exist');
        cy.get('vl-spotlight').shadow().find('span.vl-icon--external').should('not.exist');
        cy.injectAxe();
        cy.checkA11y('vl-spotlight');
    });

    it('should stay below a stacked element of the page that overlaps the card', () => {
        cy.mount(html`
            <div style="position: relative; width: 400px;">
                <div id="page-overlay" style="position: absolute; inset: 0; z-index: 1;"></div>
                <vl-spotlight link="https://example.com" style="display: block;">
                    <span slot="title">Premies voor renovatie</span>
                    <span slot="text">Gaat u bouwen of verbouwen?</span>
                    <span slot="content">Er zijn er verschillende...</span>
                </vl-spotlight>
            </div>
        `);

        cy.get('vl-spotlight').shadow().find('a').should('exist');
        cy.get('vl-spotlight').then(($spotlight) => {
            const spotlight = $spotlight[0];
            const pageOverlay = spotlight.ownerDocument.querySelector('#page-overlay');
            const getPageElementAtCenterOf = (element: Element): Element | null => {
                const { left, top, width, height } = element.getBoundingClientRect();
                return spotlight.ownerDocument.elementFromPoint(left + width / 2, top + height / 2);
            };

            expect(getPageElementAtCenterOf(spotlight.querySelector('[slot="title"]')!)).to.equal(pageOverlay);
            expect(getPageElementAtCenterOf(spotlight.querySelector('[slot="text"]')!)).to.equal(pageOverlay);
            expect(getPageElementAtCenterOf(spotlight.querySelector('[slot="content"]')!)).to.equal(pageOverlay);
        });
    });

    [
        { name: 'with a link', link: 'https://example.com' },
        { name: 'without a link', link: undefined },
    ].forEach(({ name, link }) => {
        it(`should keep an overlay from the content slot above the next spotlight ${name}`, () => {
            cy.mount(html`
                <div style="width: 400px;">
                    <vl-spotlight id="first" link=${ifDefined(link)} style="display: block;">
                        <span slot="title">Premies voor renovatie</span>
                        <div slot="content">
                            <div
                                id="overlay"
                                style="position: absolute; z-index: 10; width: 200px; height: 300px;"
                            ></div>
                        </div>
                    </vl-spotlight>
                    <vl-spotlight id="second" link=${ifDefined(link)} style="display: block;">
                        <span slot="title">Verslag bestuursvergadering</span>
                        <span slot="text">Gaat u bouwen of verbouwen?</span>
                    </vl-spotlight>
                </div>
            `);

            cy.get('#second').shadow().find('h3').should('exist');
            cy.get('#second').then(($second) => {
                const second = $second[0];
                const overlay = second.ownerDocument.querySelector('#overlay');
                const getPageElementAtCenterOf = (element: Element): Element | null => {
                    const { left, top, width, height } = element.getBoundingClientRect();
                    return second.ownerDocument.elementFromPoint(left + width / 2, top + height / 2);
                };
                const { left, top } = second.getBoundingClientRect();

                expect(getPageElementAtCenterOf(second.querySelector('[slot="title"]')!)).to.equal(overlay);
                expect(getPageElementAtCenterOf(second.querySelector('[slot="text"]')!)).to.equal(overlay);
                expect(second.ownerDocument.elementFromPoint(left + 1, top + 1)).to.equal(overlay);
            });
        });
    });

    it('should not nest a link from the content slot in the title link', () => {
        const onSpotlightLinkClick = cy.stub().as('spotlightLinkClick');
        const onDocumentLinkClick = cy.stub().as('documentLinkClick');
        cy.mount(html`
            <vl-spotlight link="https://example.com" alt size="s">
                <span slot="title">Verslag bestuursvergadering</span>
                <vl-document slot="content" href="https://example.com/document.docx">
                    <span slot="type">DOCX</span>
                    <span slot="title">document</span>
                    <span slot="metadata">DOCX-112kb</span>
                </vl-document>
            </vl-spotlight>
        `);
        cy.get('vl-spotlight')
            .shadow()
            .find('a')
            .then(($link) => {
                $link[0].addEventListener('click', (event) => {
                    event.preventDefault();
                    onSpotlightLinkClick();
                });
            });
        cy.get('vl-document')
            .shadow()
            .find('a')
            .then(($link) => {
                $link[0].addEventListener('click', (event) => {
                    event.preventDefault();
                    onDocumentLinkClick();
                });
            });

        cy.get('vl-spotlight').shadow().find('a slot[name="content"]').should('not.exist');
        cy.get('vl-spotlight').then(($spotlight) => {
            expect(getLinkAtCenterOf($spotlight[0], $spotlight[0].querySelector('vl-document')!)).to.equal(null);
        });
        cy.get('vl-document').shadow().find('a').click();

        cy.get('@documentLinkClick').should('have.been.calledOnce');
        cy.get('@spotlightLinkClick').should('not.have.been.called');
    });

    it('should follow the link of a document in the content slot', () => {
        cy.mount(html`
            <vl-spotlight link="https://example.com/" alt size="s">
                <span slot="title">Verslag bestuursvergadering</span>
                <vl-document slot="content" href="https://example.com/document.docx">
                    <span slot="type">DOCX</span>
                    <span slot="title">document</span>
                    <span slot="metadata">DOCX-112kb</span>
                </vl-document>
            </vl-spotlight>
        `);
        recordFollowedLink('click');

        cy.get('vl-document')
            .shadow()
            .find('a')
            .should('be.visible')
            .then(($link) => realClick($link[0]));
        cy.get('@followedLink').should('deep.equal', ['https://example.com/document.docx']);
    });

    it('should reach the title link and a link in the content slot with the keyboard', () => {
        cy.mount(html`
            <vl-spotlight link="https://example.com">
                <span slot="title">Verslag bestuursvergadering</span>
                <vl-document slot="content" href="https://example.com/document.docx">
                    <span slot="type">DOCX</span>
                    <span slot="title">document</span>
                    <span slot="metadata">DOCX-112kb</span>
                </vl-document>
            </vl-spotlight>
        `);

        cy.press(Cypress.Keyboard.Keys.TAB);
        cy.get('vl-spotlight').shadow().find('a').should('have.focus');
        cy.press(Cypress.Keyboard.Keys.TAB);
        cy.get('vl-document').shadow().find('a').should('have.focus');
    });

    it('should show the focus ring around the whole card', () => {
        cy.mount(html`
            <vl-spotlight link="https://example.com" style="display: block; width: 400px;">
                <span slot="title">Premies voor renovatie</span>
                <span slot="text">Gaat u bouwen of verbouwen?</span>
            </vl-spotlight>
        `);

        cy.get('vl-spotlight').shadow().find('a').focus();

        cy.get('vl-spotlight')
            .shadow()
            .find('a')
            .shouldHaveComputedStyle({ style: 'outline-style', value: 'none' })
            .shouldHaveComputedStyle({ pseudo: '::before', style: 'outline-style', value: 'solid' })
            .shouldHaveComputedStyle({ pseudo: '::before', style: 'outline-width', value: '3px' })
            .shouldHaveComputedStyle({ pseudo: '::before', style: 'outline-color', value: 'rgba(0, 85, 204, 0.65)' })
            .shouldHaveComputedStyle({ pseudo: '::before', style: 'outline-offset', value: '2px' })
            .then(($link) => {
                const card = ($link[0].getRootNode() as ShadowRoot).querySelector('.vl-spotlight')!;
                const ring = getComputedStyle($link[0], '::before');
                expect(parseFloat(ring.width)).to.be.closeTo(card.getBoundingClientRect().width, 0.5);
                expect(parseFloat(ring.height)).to.be.closeTo(card.getBoundingClientRect().height, 0.5);
            });
    });

    it('should render the title only once when there is an image', () => {
        cy.mount(html`
            <vl-spotlight link="https://example.com" external img-src="dak.jpg" img-alt="">
                <span slot="title">Premies voor renovatie</span>
            </vl-spotlight>
        `);

        cy.get('vl-spotlight').shadow().find('h3').should('have.length', 1);
        cy.get('vl-spotlight').shadow().find('slot[name="title"]').should('have.length', 1);
        cy.get('vl-spotlight').shadow().find('.vl-icon--external').should('have.length', 1);
    });

    it('should link a title that is added after the first render', () => {
        cy.mount(html`<vl-spotlight link="https://example.com"></vl-spotlight>`);

        cy.get('vl-spotlight').then(($spotlight) => {
            const title = document.createElement('span');
            title.slot = 'title';
            title.textContent = 'Premies voor renovatie';
            $spotlight[0].append(title);
        });

        cy.get('vl-spotlight').shadow().find('h3 a slot[name="title"]').should('exist');
        cy.get('vl-spotlight').contains('Premies voor renovatie').should('be.visible');
    });

    it('should show the title link when the title gets its text after the first render', () => {
        cy.mount(html`
            <vl-spotlight link="https://example.com">
                <span slot="title" id="title"></span>
            </vl-spotlight>
        `);
        setTitleTextAfterFirstRender('Premies voor renovatie');

        cy.get('vl-spotlight').shadow().find('h3').should('be.visible');
        cy.get('vl-spotlight').shadow().find('h3 a slot[name="title"]').should('exist');
    });

    it('should show the title when it gets its text after the first render without a link', () => {
        cy.mount(html`
            <vl-spotlight>
                <span slot="title" id="title"></span>
            </vl-spotlight>
        `);
        setTitleTextAfterFirstRender('Premies voor renovatie');

        cy.get('vl-spotlight').shadow().find('h3').should('be.visible');
    });

    it('should warn when a link has neither a title nor a link-label', () => {
        cy.window().then((win) => {
            cy.stub(win.console, 'warn').as('consoleWarn');
        });
        cy.mount(html`
            <vl-spotlight link="https://example.com">
                <span slot="text">Gaat u bouwen of verbouwen?</span>
            </vl-spotlight>
        `);

        cy.get('@consoleWarn').should('have.been.calledOnce').and('have.been.calledWithMatch', 'link-label');
    });

    it('should not warn when a link has a title or a link-label', () => {
        cy.window().then((win) => {
            cy.stub(win.console, 'warn').as('consoleWarn');
        });
        cy.mount(html`
            <vl-spotlight id="with-title" link="https://example.com">
                <span slot="title">Premies voor renovatie</span>
            </vl-spotlight>
            <vl-spotlight
                id="with-link-label"
                link="https://example.com"
                link-label="Premies voor renovatie"
            ></vl-spotlight>
        `);

        cy.get('#with-title').shadow().find('h3 a').should('exist');
        cy.get('#with-link-label').shadow().find('a').should('exist');
        cy.get('@consoleWarn').should('not.have.been.called');
    });

    it('should be accessible with a link, an image and a link in the content slot', () => {
        cy.mount(html`
            <vl-spotlight link="https://example.com" external img-src="dak.jpg" img-alt="">
                <span slot="title">Verslag bestuursvergadering</span>
                <span slot="subtitle">Artikel 3.3.1</span>
                <span slot="text">Gaat u bouwen of verbouwen?</span>
                <vl-document slot="content" href="https://example.com/document.docx">
                    <span slot="type">DOCX</span>
                    <span slot="title">document</span>
                    <span slot="metadata">DOCX-112kb</span>
                </vl-document>
            </vl-spotlight>
        `);

        cy.injectAxe();
        cy.checkA11y('vl-spotlight');
    });

    it('should set aria-label on link when link-label is provided', () => {
        cy.mount(html`
            <vl-spotlight link="https://example.com" link-label="Ga naar voorbeeld - opent in nieuw venster" external>
                <span slot="title">Voorbeeld</span>
            </vl-spotlight>
        `);

        cy.get(`vl-spotlight`).shadow().find('a').should('have.attr', 'aria-label', 'Ga naar voorbeeld - opent in nieuw venster');
    });

    it('should pass the img-alt to the image', () => {
        cy.mount(html`
            <vl-spotlight img-src="dak.jpg" img-alt="Oud pannendak met verweerde dakpannen">
                <span slot="title">Premies voor renovatie</span>
            </vl-spotlight>
        `);

        cy.get('vl-spotlight').shadow().find('img').should('have.attr', 'alt', 'Oud pannendak met verweerde dakpannen');
    });

    it('should warn when img-src is set without img-alt', () => {
        cy.window().then((win) => {
            cy.stub(win.console, 'warn').as('consoleWarn');
        });
        cy.mount(html`
            <vl-spotlight img-src="dak.jpg">
                <span slot="title">Premies voor renovatie</span>
            </vl-spotlight>
        `);

        cy.get('vl-spotlight').shadow().find('img').should('have.attr', 'alt', '');
        cy.get('@consoleWarn').should('have.been.calledOnce').and('have.been.calledWithMatch', 'img-alt');
    });

    it('should not warn when img-alt is set, also when it is empty for a decorative image', () => {
        cy.window().then((win) => {
            cy.stub(win.console, 'warn').as('consoleWarn');
        });
        cy.mount(html`
            <vl-spotlight id="descriptive" img-src="dak.jpg" img-alt="Oud pannendak met verweerde dakpannen">
                <span slot="title">Premies voor renovatie</span>
            </vl-spotlight>
            <vl-spotlight id="decorative" img-src="dak.jpg" img-alt="">
                <span slot="title">Premies voor renovatie</span>
            </vl-spotlight>
            <vl-spotlight id="no-image">
                <span slot="title">Premies voor renovatie</span>
            </vl-spotlight>
        `);

        cy.get('#decorative').shadow().find('img').should('have.attr', 'alt', '');
        cy.get('@consoleWarn').should('not.have.been.called');
    });

    it('should not warn when img-alt is set as a property', () => {
        cy.window().then((win) => {
            cy.stub(win.console, 'warn').as('consoleWarn');
        });
        cy.mount(html`
            <vl-spotlight img-src="dak.jpg" .imgAlt=${'Oud pannendak met verweerde dakpannen'}>
                <span slot="title">Premies voor renovatie</span>
            </vl-spotlight>
        `);

        cy.get('vl-spotlight').shadow().find('img').should('have.attr', 'alt', 'Oud pannendak met verweerde dakpannen');
        cy.get('@consoleWarn').should('not.have.been.called');
    });
});
