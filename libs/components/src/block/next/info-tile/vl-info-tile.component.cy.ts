import { registerWebComponents } from '@domg-wc/common';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { VlInfoTileComponent } from './vl-info-tile.component';

registerWebComponents([VlInfoTileComponent]);

const slots = `
    <span slot="trigger">Broos Deprez</span>
    <span slot="subtitle">Uw zoon</span>
    <div slot="content">De studietoelage werd toegekend.</div>
`;

const mountInfoTile = (attributes = '', children = slots) =>
    cy.mount(html`${unsafeHTML(`<vl-info-tile-next ${attributes}>${children}</vl-info-tile-next>`)}`);

const shadow = () => cy.get('vl-info-tile-next').shadow();
const trigger = () => shadow().find('button#trigger');
const content = () => shadow().find('#content');
const hiddenValue = (value: string | null) =>
    content().should(($content) => expect($content[0].getAttribute('hidden')).to.equal(value));
const infoTile = (callback: (component: VlInfoTileComponent) => void) =>
    cy.get('vl-info-tile-next').then(($el) => callback($el[0] as VlInfoTileComponent));
const updated = () => cy.get('vl-info-tile-next').then(($el) => ($el[0] as VlInfoTileComponent).updateComplete);

describe('cypress-component - block components - vl-info-tile-next', () => {
    it('should render title, subtitle and content', () => {
        mountInfoTile();

        shadow().find('h3.info-tile__title slot[name="trigger"]').should('exist');
        shadow().find('[part="subtitle"] slot[name="subtitle"]').should('exist');
        hiddenValue(null);
        trigger().should('not.exist');
    });

    it('should render the title in a heading of the given level', () => {
        mountInfoTile('heading-level="5"');

        shadow().find('h5.info-tile__title').should('exist');
    });

    it('should render the toggle button inside the heading of a toggleable info tile', () => {
        mountInfoTile('toggleable heading-level="2"');

        shadow().find('h2.info-tile__title > button#trigger slot[name="trigger"]').should('exist');
        trigger().find('h1, h2, h3, h4, h5, h6').should('not.exist');
    });

    it('should keep the title label in the heading but out of the toggle button', () => {
        mountInfoTile('toggleable', `${slots}<span slot="title-label">Nieuw</span>`);

        shadow().find('h3.info-tile__title > slot[name="title-label"]').should('exist');
        trigger().find('slot[name="title-label"]').should('not.exist');
        trigger().should(($trigger) => {
            const assigned = ($trigger.find('slot[name="trigger"]')[0] as HTMLSlotElement).assignedNodes();
            expect(assigned.map((node) => node.textContent).join('')).to.equal('Broos Deprez');
        });
    });

    it('should not render a header without header slots or icon', () => {
        mountInfoTile('', '<div slot="content">Enkel inhoud</div>');

        shadow().find('[part="header"]').should('not.exist');
    });

    it('should render an icon in a badge', () => {
        mountInfoTile('icon="file-tasks-check" icon-as-badge');

        shadow()
            .find('.info-tile__icon.info-tile__icon--badge vl-icon')
            .should('have.attr', 'icon', 'file-tasks-check');
    });

    it('should hide the content of a closed toggleable info tile until found', () => {
        mountInfoTile('toggleable');

        trigger().should('have.attr', 'aria-expanded', 'false').and('have.attr', 'aria-controls', 'content');
        hiddenValue('until-found');
    });

    it('should open and close a toggleable info tile on click', () => {
        mountInfoTile('toggleable');

        trigger().click();
        cy.get('vl-info-tile-next').should('have.attr', 'open');
        hiddenValue(null);
        trigger().click();
        cy.get('vl-info-tile-next').should('not.have.attr', 'open');
        hiddenValue('until-found');
    });

    it('should start open with the open attribute', () => {
        mountInfoTile('toggleable open');

        trigger().should('have.attr', 'aria-expanded', 'true');
        hiddenValue(null);
    });

    it('should not toggle when the subtitle or content is clicked', () => {
        mountInfoTile('toggleable open');

        cy.get('vl-info-tile-next').find('[slot="content"]').click();
        cy.get('vl-info-tile-next').should('have.attr', 'open');
    });

    it('should open via show(), hide() and toggle()', () => {
        mountInfoTile('toggleable');

        infoTile((component) => component.show());
        cy.get('vl-info-tile-next').should('have.attr', 'open');
        infoTile((component) => component.hide());
        cy.get('vl-info-tile-next').should('not.have.attr', 'open');
        infoTile((component) => component.toggle());
        cy.get('vl-info-tile-next').should('have.attr', 'open');
    });

    it('should ignore show() and toggle() when not toggleable', () => {
        mountInfoTile();

        infoTile((component) => component.show());
        updated();
        cy.get('vl-info-tile-next').should('not.have.attr', 'open');
        hiddenValue(null);
    });

    it('should fire vl-toggle, vl-open and vl-close when a toggleable info tile changes', () => {
        mountInfoTile('toggleable');
        const toggle = cy.stub().as('toggle');
        const open = cy.stub().as('open');
        const close = cy.stub().as('close');
        cy.document().then((document) => {
            document.addEventListener('vl-toggle', (event) => toggle((event as CustomEvent).detail));
            document.addEventListener('vl-open', open);
            document.addEventListener('vl-close', close);
        });

        trigger().click();
        cy.get('@toggle').should('have.been.calledOnceWith', { expanded: true });
        cy.get('@open').should('have.been.calledOnce');
        trigger().click();
        cy.get('@toggle').should('have.been.calledWith', { expanded: false });
        cy.get('@close').should('have.been.calledOnce');
    });

    it('should open when the browser reveals hidden content', () => {
        mountInfoTile('toggleable');

        content().then(($content) => $content[0].dispatchEvent(new Event('beforematch')));
        cy.get('vl-info-tile-next').should('have.attr', 'open');
        hiddenValue(null);
    });

    it('should reflect properties to their attributes', () => {
        cy.mount(html`<div id="host"></div>`);
        cy.get('#host').then(($host) => {
            const tile = document.createElement('vl-info-tile-next') as VlInfoTileComponent;
            tile.innerHTML = slots;
            $host[0].appendChild(tile);
            tile.toggleable = true;
            tile.clickable = true;
            tile.highlight = true;
            tile.highlightLeft = true;
            return tile.updateComplete;
        });

        ['toggleable', 'clickable', 'highlight', 'highlight-left'].forEach((attribute) =>
            cy.get('vl-info-tile-next').should('have.attr', attribute),
        );
    });

    it('should fire vl-click-info-tile when a clickable info tile is clicked', () => {
        mountInfoTile('clickable clickable-label="Open detail"');
        const click = cy.stub().as('click');
        cy.document().then((document) => document.addEventListener('vl-click-info-tile', click));

        shadow().find('button.info-tile__clickable').should('have.attr', 'aria-label', 'Open detail').click();
        cy.get('@click').should('have.been.calledOnce');
    });

    it('should render a footer only when the footer slot is used', () => {
        mountInfoTile();
        shadow().find('[part="footer"]').should('not.exist');

        mountInfoTile('', `${slots}<div slot="footer">Footer</div>`);
        shadow().find('[part="footer"] slot[name="footer"]').should('exist');
    });

    it('should be accessible, also when toggleable and opened', () => {
        mountInfoTile();
        cy.injectAxe();
        cy.checkA11y('vl-info-tile-next');

        mountInfoTile('toggleable', '<span slot="trigger">Broos Deprez</span><div slot="content">Inhoud</div>');
        cy.injectAxe();
        cy.checkA11y('vl-info-tile-next');
        trigger().click();
        cy.checkA11y('vl-info-tile-next');

        mountInfoTile('toggleable', `${slots}<span slot="title-label">Nieuw</span>`);
        cy.injectAxe();
        cy.checkA11y('vl-info-tile-next');
    });
});

const realPress = (key: 'Enter' | ' ') => {
    const code = key === 'Enter' ? 'Enter' : 'Space';
    const keyCode = key === 'Enter' ? 13 : 32;
    (['keyDown', 'keyUp'] as const).forEach((type) => {
        cy.then(() =>
            Cypress.automation('remote:debugger:protocol', {
                command: 'Input.dispatchKeyEvent',
                params: { type, key, code, windowsVirtualKeyCode: keyCode, text: key === 'Enter' ? '\r' : ' ' },
            }),
        );
    });
};

const toggleableSlots = `<span slot="trigger">Broos Deprez</span>
    <span slot="subtitle">Uw zoon</span>
    <div slot="content">De studietoelage werd toegekend.</div>`;

const leftOffset = (selector: string) =>
    shadow()
        .find(selector)
        .should('be.visible')
        .then(($element) => {
            const header = ($element[0].getRootNode() as ShadowRoot).querySelector('.info-tile__header')!;
            return Math.round($element[0].getBoundingClientRect().left - header.getBoundingClientRect().left);
        });

const titleTextOffset = () =>
    shadow()
        .find('.info-tile__header')
        .should('be.visible')
        .then(($header) => {
            const title = ($header[0].getRootNode() as ShadowRoot).host.querySelector('[slot="trigger"]')!;
            return Math.round(title.getBoundingClientRect().left - $header[0].getBoundingClientRect().left);
        });

describe('cypress-component - block components - vl-info-tile-next - toetsenbord, varianten en events', () => {
    it('should be reachable with Tab and toggle with Enter and Space', () => {
        mountInfoTile('toggleable');

        cy.press(Cypress.Keyboard.Keys.TAB);
        trigger().should('have.focus');
        realPress('Enter');
        cy.get('vl-info-tile-next').should('have.attr', 'open');
        realPress(' ');
        cy.get('vl-info-tile-next').should('not.have.attr', 'open');
    });

    [
        ['size="medium"', 'info-tile--m'],
        ['size="large"', 'info-tile--l'],
        ['type="alt"', 'info-tile--alt'],
        ['type="error"', 'info-tile--error'],
        ['type="success"', 'info-tile--success'],
        ['type="warning"', 'info-tile--warning'],
        ['center', 'info-tile--center'],
        ['full-height', 'info-tile--full-height'],
    ].forEach(([attribute, className]) => {
        it(`should render ${className} for ${attribute}`, () => {
            mountInfoTile(attribute);

            shadow().find('[part~="base"]').should('have.class', className);
        });
    });

    it('should not fire events on the first render', () => {
        const toggle = cy.stub().as('toggle');
        cy.document().then((document) => document.addEventListener('vl-toggle', toggle));
        mountInfoTile('toggleable open');

        updated();
        cy.get('@toggle').should('not.have.been.called');
    });

    it('should keep the actions above the clickable overlay', () => {
        const click = cy.stub().as('click');
        const action = cy.stub().as('action');
        cy.document().then((document) => document.addEventListener('vl-click-info-tile', click));
        mountInfoTile('clickable clickable-label="Open detail"', `${slots}<button slot="actions">Actie</button>`);

        cy.get('vl-info-tile-next')
            .find('[slot="actions"]')
            .then(($button) => $button[0].addEventListener('click', action));
        cy.get('vl-info-tile-next').find('[slot="actions"]').click();
        cy.get('@action').should('have.been.called');
        cy.get('@click').should('not.have.been.called');
    });

    it('should let clicks in the content bubble to the document', () => {
        const click = cy.stub().as('click');
        cy.document().then((document) => document.addEventListener('click', click));
        mountInfoTile('toggleable open');

        cy.get('vl-info-tile-next').find('[slot="content"]').click();
        cy.get('@click').should('have.been.called');
    });

    it('should render the footer without a landmark', () => {
        mountInfoTile('', `${slots}<div slot="footer">Footer</div>`);

        shadow().find('footer').should('not.exist');
        shadow().find('div[part="footer"]').should('exist');
    });

    it('should warn when a toggleable info tile has no trigger', () => {
        cy.window().then((win) => cy.spy(win.console, 'warn').as('warn'));
        mountInfoTile('toggleable', '<div slot="content">Inhoud</div>');

        cy.get('@warn').should('have.been.calledWithMatch', /trigger slot/);
        trigger().should('not.exist');
    });

    it('should indent the subtitle of a toggleable info tile like the title text', () => {
        cy.viewport(1200, 700);
        mountInfoTile('toggleable', toggleableSlots);

        titleTextOffset().then((title) => leftOffset('.info-tile__subtitle').should('equal', title));
    });

    it('should indent the content of an open toggleable info tile', () => {
        cy.viewport(1200, 700);
        mountInfoTile('toggleable open', toggleableSlots);

        leftOffset('.info-tile__content').should('equal', 20);
    });

    it('should not indent the content of an open, centered toggleable info tile', () => {
        cy.viewport(1200, 700);
        mountInfoTile('toggleable open center', toggleableSlots);

        shadow().find('.info-tile__content').should('have.css', 'margin-left', '0px');
        shadow()
            .find('.info-tile__content')
            .should(($content) => {
                const tile = ($content[0].getRootNode() as ShadowRoot)
                    .querySelector('.info-tile')!
                    .getBoundingClientRect();
                const content = $content[0].getBoundingClientRect();
                expect((content.left + content.right) / 2).to.be.closeTo((tile.left + tile.right) / 2, 0.5);
            });
    });

    it('should indent the subtitle like the title text on a small screen', () => {
        cy.viewport(375, 700);
        mountInfoTile('toggleable', toggleableSlots);

        titleTextOffset().then((title) => leftOffset('.info-tile__subtitle').should('equal', title));
    });

    it('should indent the subtitle like the title text when centered', () => {
        cy.viewport(1200, 700);
        mountInfoTile('toggleable center', toggleableSlots);

        shadow()
            .find('.info-tile__subtitle')
            .should(($subtitle) => {
                const title = ($subtitle[0].getRootNode() as ShadowRoot).host
                    .querySelector('[slot="trigger"]')!
                    .getBoundingClientRect().left;
                const subtitle = ($subtitle[0].getRootNode() as ShadowRoot).host
                    .querySelector('[slot="subtitle"]')!
                    .getBoundingClientRect().left;
                expect(subtitle).to.be.at.least(title - 0.5);
            });
    });
});

describe('cypress-component - block components - vl-info-tile-next - slots na het renderen', () => {
    it('should show a footer that is added after the first render', () => {
        mountInfoTile();
        shadow().find('[part="footer"]').should('not.exist');

        cy.get('vl-info-tile-next').then(($tile) => {
            $tile[0].insertAdjacentHTML('beforeend', '<div slot="footer">Footer</div>');
        });
        shadow().find('[part="footer"] slot[name="footer"]').should('exist');
    });

    it('should remove the subtitle wrapper when the subtitle is removed', () => {
        mountInfoTile();
        shadow().find('[part="subtitle"]').should('exist');

        cy.get('vl-info-tile-next')
            .find('[slot="subtitle"]')
            .then(($subtitle) => $subtitle[0].remove());
        shadow().find('[part="subtitle"]').should('not.exist');
    });

    it('should render the header when an element gets the trigger slot later', () => {
        mountInfoTile('', '<span>Titel</span><div slot="content">Inhoud</div>');
        shadow().find('[part="header"]').should('not.exist');

        cy.get('vl-info-tile-next')
            .find('span')
            .then(($span) => $span[0].setAttribute('slot', 'trigger'));
        shadow().find('.info-tile__title slot[name="trigger"]').should('exist');
    });
});
