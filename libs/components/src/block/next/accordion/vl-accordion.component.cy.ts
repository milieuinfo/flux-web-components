import { registerWebComponents } from '@domg-wc/common';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { VlAccordionComponent } from './vl-accordion.component';

registerWebComponents([VlAccordionComponent]);

const content = '<p slot="content" id="inhoud">Onderwijs helpt jonge mensen.</p>';

const mountAccordion = (attributes = '') =>
    cy.mount(
        html`${unsafeHTML(
            `<vl-accordion-next toggle-text="Onderwijsdoelstelling" ${attributes}>${content}</vl-accordion-next>`,
        )}`,
    );

const trigger = () => cy.get('vl-accordion-next').shadow().find('button#trigger');
const panel = () => cy.get('vl-accordion-next').shadow().find('#content');
const hiddenValue = (value: string | null) =>
    panel().should(($panel) => expect($panel[0].getAttribute('hidden')).to.equal(value));
const accordion = (callback: (component: VlAccordionComponent) => void) =>
    cy.get('vl-accordion-next').then(($el) => callback($el[0] as VlAccordionComponent));
const nextFrame = () => cy.get('vl-accordion-next').then(($el) => ($el[0] as VlAccordionComponent).updateComplete);

describe('cypress-component - block components - vl-accordion-next', () => {
    it('should render a closed accordion by default', () => {
        mountAccordion();

        trigger().should('have.attr', 'aria-expanded', 'false').and('have.attr', 'aria-controls', 'content');
        trigger().find('slot[name="trigger"]').should('have.text', 'Onderwijsdoelstelling');
        hiddenValue('until-found');
        cy.get('vl-accordion-next').should('not.have.attr', 'open');
    });

    it('should be open when the open attribute is set', () => {
        mountAccordion('open');

        trigger().should('have.attr', 'aria-expanded', 'true');
        hiddenValue(null);
    });

    it('should open and close on click and reflect the state to the open attribute', () => {
        mountAccordion();

        trigger().click();
        cy.get('vl-accordion-next').should('have.attr', 'open');
        trigger().should('have.attr', 'aria-expanded', 'true');
        hiddenValue(null);

        trigger().click();
        cy.get('vl-accordion-next').should('not.have.attr', 'open');
        hiddenValue('until-found');
    });

    it('should open and close via show(), hide() and toggle()', () => {
        mountAccordion();

        accordion((component) => component.show());
        cy.get('vl-accordion-next').should('have.attr', 'open');
        accordion((component) => component.hide());
        cy.get('vl-accordion-next').should('not.have.attr', 'open');
        accordion((component) => component.toggle());
        cy.get('vl-accordion-next').should('have.attr', 'open');
    });

    it('should follow the open property when it is set from outside', () => {
        mountAccordion();

        accordion((component) => (component.open = true));
        trigger().should('have.attr', 'aria-expanded', 'true');
        hiddenValue(null);
    });

    it('should fire vl-toggle with expanded, and vl-open and vl-close, all bubbling', () => {
        mountAccordion();
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

        accordion((component) => (component.open = false));
        cy.get('@toggle').should('have.been.calledTwice').and('have.been.calledWith', { expanded: false });
        cy.get('@close').should('have.been.calledOnce');
    });

    it('should not fire events on the first render', () => {
        const toggle = cy.stub().as('toggle');
        cy.document().then((document) => document.addEventListener('vl-toggle', toggle));
        mountAccordion('open');

        nextFrame();
        cy.get('@toggle').should('not.have.been.called');
    });

    it('should stay closed and hide its content completely when disabled', () => {
        mountAccordion('disabled open');

        trigger().should('be.disabled').and('have.attr', 'aria-expanded', 'false');
        hiddenValue('');
    });

    it('should ignore show() and toggle() when disabled', () => {
        mountAccordion('disabled');

        accordion((component) => component.show());
        accordion((component) => component.toggle());
        nextFrame();
        cy.get('vl-accordion-next').should('not.have.attr', 'open');
        trigger().should('have.attr', 'aria-expanded', 'false');
    });

    it('should open when the browser reveals hidden content', () => {
        mountAccordion();

        panel().then(($panel) => $panel[0].dispatchEvent(new Event('beforematch')));
        cy.get('vl-accordion-next').should('have.attr', 'open');
        hiddenValue(null);
    });

    it('should not open via beforematch when disabled', () => {
        mountAccordion('disabled');

        panel().then(($panel) => $panel[0].dispatchEvent(new Event('beforematch')));
        nextFrame();
        cy.get('vl-accordion-next').should('not.have.attr', 'open');
    });

    it('should show the open and close toggle texts', () => {
        mountAccordion('open-toggle-text="Open" close-toggle-text="Sluit"');

        trigger().find('slot[name="trigger"]').should('have.text', 'Open');
        trigger().click();
        trigger().find('slot[name="trigger"]').should('have.text', 'Sluit');
    });

    it('should wrap the trigger in a heading of the given level', () => {
        mountAccordion('heading-level="2"');

        cy.get('vl-accordion-next').shadow().find('h2 > button#trigger').should('exist');
    });

    it('should not render a heading without or with an invalid heading level', () => {
        mountAccordion('heading-level="7"');

        cy.get('vl-accordion-next').shadow().find('h1, h2, h3, h4, h5, h6').should('not.exist');
    });

    it('should render the trigger, subtitle and actions slots', () => {
        cy.mount(html`
            <vl-accordion-next>
                <span slot="trigger">Titel</span>
                <span slot="subtitle">Subtitel</span>
                <button slot="actions">Actie</button>
                <p slot="content">Inhoud</p>
            </vl-accordion-next>
        `);

        trigger()
            .find('slot[name="trigger"]')
            .then(($slot) => {
                expect(($slot[0] as HTMLSlotElement).assignedElements()[0].textContent).to.equal('Titel');
            });
        cy.get('vl-accordion-next').shadow().find('[part="actions"] slot[name="actions"]').should('exist');
        cy.get('vl-accordion-next').shadow().find('[part="subtitle"] slot[name="subtitle"]').should('exist');
    });

    it('should apply the content padding', () => {
        mountAccordion('open content-padding="large"');

        cy.get('vl-accordion-next').shadow().find('.accordion__panel').should('have.css', 'padding', '20px');
    });

    it('should expose its parts', () => {
        mountAccordion('open');

        ['base', 'header', 'trigger', 'icon', 'subtitle', 'content', 'actions'].forEach((part) =>
            cy.get('vl-accordion-next').shadow().find(`[part~="${part}"]`).should('exist'),
        );
        cy.get('vl-accordion-next').shadow().find('[part~="base"]').should('have.attr', 'part', 'base expanded');
    });

    it('should be accessible when closed and when opened', () => {
        mountAccordion();
        cy.injectAxe();
        cy.checkA11y('vl-accordion-next');

        trigger().click();
        cy.checkA11y('vl-accordion-next');
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

describe('cypress-component - block components - vl-accordion-next - toetsenbord en toestand', () => {
    it('should be reachable with Tab and toggle with Enter and Space', () => {
        mountAccordion();

        cy.press(Cypress.Keyboard.Keys.TAB);
        trigger().should('have.focus');
        realPress('Enter');
        cy.get('vl-accordion-next').should('have.attr', 'open');
        realPress(' ');
        cy.get('vl-accordion-next').should('not.have.attr', 'open');
    });

    it('should close an open accordion when it becomes disabled', () => {
        mountAccordion('open');

        accordion((component) => (component.disabled = true));
        cy.get('vl-accordion-next').should('not.have.attr', 'open');
        trigger().should('have.attr', 'aria-expanded', 'false');
    });

    it('should warn when the toggle button has no name', () => {
        cy.window().then((win) => cy.spy(win.console, 'warn').as('warn'));
        cy.mount(html`<vl-accordion-next><p slot="content">Inhoud</p></vl-accordion-next>`);

        cy.get('@warn').should('have.been.calledWithMatch', /toggle-text of de trigger slot/);
    });

    it('should not warn when the toggle button has a name', () => {
        cy.window().then((win) => cy.spy(win.console, 'warn').as('warn'));
        mountAccordion();
        nextFrame();

        cy.get('@warn').should('not.have.been.calledWithMatch', /toggle-text of de trigger slot/);
    });
});
