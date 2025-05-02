import { registerWebComponents } from '@domg-wc/common';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { VlButtonComponent } from '../../atom/button';
import { VlPopoverComponent } from '../popover';
import { VlInfoTile } from './index';

registerWebComponents([VlInfoTile, VlPopoverComponent, VlButtonComponent]);

const mountDefault = ({
    autoOpen,
    toggleable,
    center,
    contentSlot,
    subtitleSlot,
    titleSlot,
    menuSlot,
}: {
    autoOpen?: boolean;
    toggleable?: boolean;
    center?: boolean;
    contentSlot?: string;
    subtitleSlot?: string;
    titleSlot?: string;
    menuSlot?: string;
}) =>
    cy.mount(html`
        <vl-info-tile ?toggleable=${toggleable} ?auto-open=${autoOpen} ?center=${center}>
            ${unsafeHTML(titleSlot)}${unsafeHTML(menuSlot)}${unsafeHTML(subtitleSlot)}${unsafeHTML(contentSlot)}
        </vl-info-tile>
    `);

const titleSlot = `<span slot="title">Broos Deprez</span>`;
const subtitleSlot = `<span slot="subtitle">Uw zoon (19.05.2005)</span>`;
const contentSlot = `<div slot="content">De studietoelage voor Broos Deprez werd toegekend.</div>`;
const menuSlot = `<span slot="menu">
    <vl-button ghost icon="nav-show-more-vertical" id="btn-acties" label="Acties"></vl-button>
    <vl-popover for="btn-acties" placement="bottom-end">
        <vl-popover-action-list>
            <vl-popover-action icon="search">Zoeken</vl-popover-action>
            <vl-popover-action icon="edit">Aanpassen</vl-popover-action>
            <vl-popover-action icon="bin">Verwijderen</vl-popover-action>
        </vl-popover-action-list>
    </vl-popover>
</span>`;

describe('component vl-info-tile - default', () => {
    beforeEach(() => {
        mountDefault({
            titleSlot,
            subtitleSlot,
            contentSlot,
        });
    });

    it('should mount', () => {
        cy.get('vl-info-tile');
    });

    it('should be accessible', () => {
        cy.injectAxe();

        cy.checkA11y('vl-info-tile');
    });

    it('should contain a title', () => {
        cy.get('vl-info-tile').shadow().find('slot[name="title"]');
        cy.get('vl-info-tile').find('span[slot="title"]').contains('Broos Deprez');
    });

    it('should contain a subtitle', () => {
        cy.get('vl-info-tile').shadow().find('slot[name="subtitle"]');
        cy.get('vl-info-tile').find('span[slot="subtitle"]').contains('Uw zoon (19.05.2005)');
    });

    it('should contain content', () => {
        cy.get('vl-info-tile').shadow().find('slot[name="content"]');
        cy.get('vl-info-tile')
            .find('div[slot="content"]')
            .contains('De studietoelage voor Broos Deprez werd toegekend.');
    });
});

describe('story vl-info-tile - toggleable', () => {
    beforeEach(() => {
        mountDefault({
            toggleable: true,
            titleSlot,
            subtitleSlot,
            contentSlot,
        });
    });

    it('should mount', () => {
        cy.get('vl-info-tile');
    });

    it('should be accessible', () => {
        cy.injectAxe();

        cy.checkA11y('vl-info-tile');
    });

    it('should contain a title', () => {
        cy.get('vl-info-tile').shadow().find('slot[name="title"]');
        cy.get('vl-info-tile').find('span[slot="title"]').contains('Broos Deprez');
    });

    it('should contain a subtitle', () => {
        cy.get('vl-info-tile').shadow().find('slot[name="subtitle"]');
        cy.get('vl-info-tile').find('span[slot="subtitle"]').contains('Uw zoon (19.05.2005)');
    });

    it('should contain content', () => {
        cy.get('vl-info-tile').shadow().find('slot[name="content"]');
        cy.get('vl-info-tile')
            .find('div[slot="content"]')
            .contains('De studietoelage voor Broos Deprez werd toegekend.');
    });

    it('should be able to open and close', () => {
        cy.get('vl-info-tile').shadow().find('.vl-info-tile').should('not.have.class', 'js-vl-accordion--open');
        cy.get('vl-info-tile').shadow().find('button.vl-toggle').should('have.attr', 'aria-expanded', 'false');
        cy.checkA11y('vl-info-tile');
        cy.get('vl-info-tile').shadow().find('button.vl-toggle').click();
        cy.get('vl-info-tile').shadow().find('.vl-info-tile').should('have.class', 'js-vl-accordion--open');
        cy.get('vl-info-tile').shadow().find('button.vl-toggle').should('have.attr', 'aria-expanded', 'true');
        cy.checkA11y('vl-info-tile');
        cy.get('vl-info-tile').shadow().find('button.vl-toggle').click();
        cy.get('vl-info-tile').shadow().find('.vl-info-tile').should('not.have.class', 'js-vl-accordion--open');
        cy.get('vl-info-tile').shadow().find('button.vl-toggle').should('have.attr', 'aria-expanded', 'false');
        cy.checkA11y('vl-info-tile');
    });
});

describe('story vl-info-tile - center', () => {
    beforeEach(() => {
        mountDefault({
            center: true,
            titleSlot,
            subtitleSlot,
            contentSlot,
        });
    });

    it('should mount', () => {
        cy.get('vl-info-tile');
    });

    it('should be accessible', () => {
        cy.injectAxe();

        cy.checkA11y('vl-info-tile');
    });

    it('should center', () => {
        cy.get('vl-info-tile').shadow().find('.vl-info-tile').should('have.class', 'vl-info-tile--center');
    });
});

describe('story vl-info-tile - auto open', () => {
    beforeEach(() => {
        mountDefault({
            autoOpen: true,
            toggleable: true,
            titleSlot,
            subtitleSlot,
            contentSlot,
        });
    });

    it('should mount', () => {
        cy.get('vl-info-tile');
    });

    it('should be accessible', () => {
        cy.injectAxe();

        cy.checkA11y('vl-info-tile');
    });

    it('should open the info-tile automatically', () => {
        cy.get('vl-info-tile').shadow().find('.vl-info-tile').should('have.class', 'js-vl-accordion--open');
        cy.get('vl-info-tile').shadow().find('button.vl-toggle').should('have.attr', 'aria-expanded', 'true');
    });
});

describe('story vl-info-tile - menu', () => {
    beforeEach(() => {
        mountDefault({
            titleSlot,
            subtitleSlot,
            contentSlot,
            menuSlot,
        });
    });

    it('should have a closed popover menu', () => {
        cy.get('#btn-acties');
        cy.get('vl-popover').should('have.attr', 'for', 'btn-acties').should('not.have.attr', 'open');
    });

    it('should toggle the popover menu when clicking the popover action button', () => {
        cy.get('vl-popover').should('not.have.attr', 'open');
        cy.get('#btn-acties').click();
        cy.get('vl-popover').should('have.attr', 'open');
        cy.get('#btn-acties').click();
        cy.get('vl-popover').should('not.have.attr', 'open');
    });
});

describe('story vl-info-tile - menu and toggleable', () => {
    beforeEach(() => {
        mountDefault({
            toggleable: true,
            titleSlot,
            subtitleSlot,
            contentSlot,
            menuSlot,
        });
    });

    it('should toggle only the popover menu when clicking the popover action button and not the tile itself', () => {
        cy.get('vl-popover').should('not.have.attr', 'open');
        cy.get('vl-info-tile').shadow().find('.vl-info-tile').should('not.have.class', 'js-vl-accordion--open');
        cy.get('#btn-acties').click();
        cy.get('vl-popover').should('have.attr', 'open');
        cy.get('vl-info-tile').shadow().find('.vl-info-tile').should('not.have.class', 'js-vl-accordion--open');
        cy.get('#btn-acties').click();
        cy.get('vl-popover').should('not.have.attr', 'open');
        cy.get('vl-info-tile').shadow().find('.vl-info-tile').should('not.have.class', 'js-vl-accordion--open');
    });

    it('should not toggle the popover menu when toggling the tile itself', () => {
        cy.get('vl-popover').should('not.have.attr', 'open');
        cy.get('vl-info-tile').shadow().find('.vl-info-tile').should('not.have.class', 'js-vl-accordion--open');
        cy.get('vl-info-tile').shadow().find('button.vl-toggle').click();
        cy.get('vl-popover').should('not.have.attr', 'open');
        cy.get('vl-info-tile').shadow().find('.vl-info-tile').should('have.class', 'js-vl-accordion--open');
        cy.get('vl-info-tile').shadow().find('button.vl-toggle').click();
        cy.get('vl-popover').should('not.have.attr', 'open');
        cy.get('vl-info-tile').shadow().find('.vl-info-tile').should('not.have.class', 'js-vl-accordion--open');
    });

    it('should be able to open both the tile and the popover menu', () => {
        cy.get('vl-popover').should('not.have.attr', 'open');
        cy.get('vl-info-tile').shadow().find('.vl-info-tile').should('not.have.class', 'js-vl-accordion--open');
        cy.get('vl-info-tile').shadow().find('button.vl-toggle').click();
        cy.get('vl-info-tile').shadow().find('.vl-info-tile').should('have.class', 'js-vl-accordion--open');
        cy.get('#btn-acties').click();
        cy.get('vl-popover').should('have.attr', 'open');
        cy.get('vl-info-tile').shadow().find('button.vl-toggle').click();
        cy.get('vl-info-tile').shadow().find('.vl-info-tile').should('not.have.class', 'js-vl-accordion--open');
        // popover sluit vanzelf bij een externe klik
        cy.get('vl-popover').should('not.have.attr', 'open');
    });
});
