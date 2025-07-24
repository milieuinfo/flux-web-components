import { registerWebComponents } from '@domg-wc/common';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { VlButtonComponent } from '../../atom/button';
import { VlPopoverComponent } from '../popover';
import { VlInfoTile } from './index';
import { INFO_TILE_SIZE, INFO_TILE_TYPE } from './vl-info-tile.model';

registerWebComponents([VlInfoTile, VlPopoverComponent, VlButtonComponent]);

const mountDefault = ({
    autoOpen,
    toggleable,
    center,
    contentSlot,
    subtitleSlot,
    titleSlot,
    footerSlot,
    menuSlot,
    badgeSlot,
    size = 'medium',
    icon = '',
    iconAsBadge,
    type = 'default',
    verticalStretch = false,
}: {
    autoOpen?: boolean;
    toggleable?: boolean;
    center?: boolean;
    contentSlot?: string;
    subtitleSlot?: string;
    titleSlot?: string;
    footerSlot?: string;
    menuSlot?: string;
    badgeSlot?: string;
    size?: INFO_TILE_SIZE;
    icon?: string;
    iconAsBadge?: boolean;
    type?: INFO_TILE_TYPE;
    verticalStretch?: boolean;
}) =>
    cy.mount(html`
        <vl-info-tile
            ?auto-open=${autoOpen}
            ?center=${center}
            ?icon-as-badge=${iconAsBadge}
            ?toggleable=${toggleable}
            ?vertical-stretch="${verticalStretch}"
            icon="${icon}"
            size="${size}"
            type="${type}"
        >
            ${unsafeHTML(badgeSlot)} ${unsafeHTML(titleSlot)} ${unsafeHTML(menuSlot)} ${unsafeHTML(subtitleSlot)}
            ${unsafeHTML(contentSlot)} ${unsafeHTML(footerSlot)}
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
const icon = 'file-tasks-check';
const footerSlot = `<div slot="footer">
        <vl-button icon="file-download">Download</vl-button>
    </div>`;
const badgeSlot = `<div slot="badge" style="
            width: 45px; 
            height: 45px; 
            background: var(--vl-color--background-alt); 
            border: 1px solid var(--vl-color--mischka-grey); 
            border-radius: 50%; 
            display: flex; 
            flex-wrap: wrap; 
            place-content: center center;
            font-weight: 500;
        ">BD</div>`;

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

describe('story vl-info-tile - small', () => {
    beforeEach(() => {
        mountDefault({
            size: 'small',
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

    it('should have class vl-info-tile--s', () => {
        cy.get('vl-info-tile').shadow().find('.vl-info-tile').should('have.class', 'vl-info-tile--s');
    });
});

describe('story vl-info-tile - medium', () => {
    beforeEach(() => {
        mountDefault({
            size: 'medium',
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

    it('should have class vl-info-tile--m', () => {
        cy.get('vl-info-tile').shadow().find('.vl-info-tile').should('have.class', 'vl-info-tile--m');
    });
});

describe('story vl-info-tile - large', () => {
    beforeEach(() => {
        mountDefault({
            size: 'large',
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

    it('should have class vl-info-tile--l', () => {
        cy.get('vl-info-tile').shadow().find('.vl-info-tile').should('have.class', 'vl-info-tile--l');
    });
});

describe('story vl-info-tile - alt', () => {
    beforeEach(() => {
        mountDefault({
            titleSlot,
            subtitleSlot,
            contentSlot,
            type: 'alt',
        });
    });

    it('should mount', () => {
        cy.get('vl-info-tile');
    });

    it('should be accessible', () => {
        cy.injectAxe();

        cy.checkA11y('vl-info-tile');
    });

    it('should have class vl-info-tile--alt', () => {
        cy.get('vl-info-tile').shadow().find('.vl-info-tile').should('have.class', 'vl-info-tile--alt');
    });
});

describe('story vl-info-tile - warning', () => {
    beforeEach(() => {
        mountDefault({
            titleSlot,
            subtitleSlot,
            contentSlot,
            type: 'warning',
        });
    });

    it('should mount', () => {
        cy.get('vl-info-tile');
    });

    it('should be accessible', () => {
        cy.injectAxe();

        cy.checkA11y('vl-info-tile');
    });

    it('should have class vl-info-tile--warning', () => {
        cy.get('vl-info-tile').shadow().find('.vl-info-tile').should('have.class', 'vl-info-tile--warning');
    });
});

describe('story vl-info-tile - error', () => {
    beforeEach(() => {
        mountDefault({
            titleSlot,
            subtitleSlot,
            contentSlot,
            type: 'error',
        });
    });

    it('should mount', () => {
        cy.get('vl-info-tile');
    });

    it('should be accessible', () => {
        cy.injectAxe();

        cy.checkA11y('vl-info-tile');
    });

    it('should have class vl-info-tile--error', () => {
        cy.get('vl-info-tile').shadow().find('.vl-info-tile').should('have.class', 'vl-info-tile--error');
    });
});

describe('story vl-info-tile - success', () => {
    beforeEach(() => {
        mountDefault({
            titleSlot,
            subtitleSlot,
            contentSlot,
            type: 'success',
        });
    });

    it('should mount', () => {
        cy.get('vl-info-tile');
    });

    it('should be accessible', () => {
        cy.injectAxe();

        cy.checkA11y('vl-info-tile');
    });

    it('should have class vl-info-tile--success', () => {
        cy.get('vl-info-tile').shadow().find('.vl-info-tile').should('have.class', 'vl-info-tile--success');
    });
});

describe('story vl-info-tile - vertical stretch', () => {
    beforeEach(() => {
        mountDefault({
            titleSlot,
            subtitleSlot,
            contentSlot,
            verticalStretch: true,
        });
    });

    it('should mount', () => {
        cy.get('vl-info-tile');
    });

    it('should be accessible', () => {
        cy.injectAxe();

        cy.checkA11y('vl-info-tile');
    });

    it('should have class vl-info-tile--vertical-stretch', () => {
        cy.get('vl-info-tile').shadow().find('.vl-info-tile').should('have.class', 'vl-info-tile--vertical-stretch');
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

describe('story vl-info-tile - icon', () => {
    beforeEach(() => {
        mountDefault({
            titleSlot,
            subtitleSlot,
            contentSlot,
            icon,
        });
    });

    it('should have an icon', () => {
        cy.get('vl-info-tile').shadow().find(`#icon .vl-vi-${icon}`).should('exist');
    });
});

describe('story vl-info-tile - icon as badge', () => {
    beforeEach(() => {
        mountDefault({
            titleSlot,
            subtitleSlot,
            contentSlot,
            icon,
            iconAsBadge: true,
        });
    });

    it('should have an icon', () => {
        cy.get('vl-info-tile').shadow().find(`#icon`).should('have.class', 'vl-info-tile__icon--badge');
    });
});

describe('story vl-info-tile - badge', () => {
    beforeEach(() => {
        mountDefault({
            titleSlot,
            subtitleSlot,
            contentSlot,
            badgeSlot,
        });
    });

    it('should have a badge', () => {
        cy.get('vl-info-tile').shadow().find('slot[name="badge"]').should('exist');
        cy.get('vl-info-tile').find('div[slot="badge"]').contains('BD');
    });
});

describe('story vl-info-tile - footer', () => {
    beforeEach(() => {
        mountDefault({
            titleSlot,
            subtitleSlot,
            contentSlot,
            footerSlot,
        });
    });

    it('should have a footer', () => {
        cy.get('vl-info-tile').shadow().find('slot[name="footer"]').should('exist');
        cy.get('vl-info-tile').find('div[slot="footer"]').contains('Download');
    });
});
