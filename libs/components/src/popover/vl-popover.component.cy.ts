import { registerWebComponents } from '@domg-wc/common-utilities';
import { html, nothing } from 'lit';
import { VlButtonComponent } from '../next/button';
import { VlPopoverActionListComponent, VlPopoverComponent } from './index';
import { VlPopoverActionComponent } from './vl-popover-action.component';

registerWebComponents([VlPopoverComponent, VlPopoverActionComponent, VlPopoverActionListComponent, VlButtonComponent]);

const mountDefault = ({
    trigger,
    contentPadding,
    open,
    placement,
    hideArrow,
    hideOnClick,
    distance,
}: {
    trigger?: string;
    contentPadding?: string;
    open?: boolean;
    placement?: string;
    hideArrow?: boolean;
    hideOnClick?: boolean;
    distance?: number;
}) => {
    return cy.mount(html`
        <vl-button-next ghost icon="nav-show-more-vertical" id="btn-acties" label="Acties"></vl-button-next>
        <vl-popover
            for="btn-acties"
            open=${open || nothing}
            placement=${placement || nothing}
            trigger=${trigger || nothing}
            hide-arrow=${hideArrow || nothing}
            hide-on-click=${hideOnClick || nothing}
            distance=${distance || nothing}
            content-padding=${contentPadding || nothing}
        >
            <vl-popover-action-list>
                <vl-popover-action icon="search" .action=${'search'}>Zoeken</vl-popover-action>
                <vl-popover-action icon="bell" .action=${'report'}>Rapportenoverzicht</vl-popover-action>
                <vl-popover-action icon="pin" .action=${'locate'}>Vind locatie</vl-popover-action>
            </vl-popover-action-list>
        </vl-popover>
    `);
};

const mountHover = ({
    trigger,
    contentPadding,
    open,
    placement,
    hideArrow,
    hideOnClick,
    distance,
}: {
    trigger?: string;
    contentPadding?: string;
    open?: boolean;
    placement?: string;
    hideArrow?: boolean;
    hideOnClick?: boolean;
    distance?: number;
}) => {
    cy.mount(html`
        <button id="btn-close" aria-describedby="tooltip" is="vl-button">Hover over me</button>
        <vl-popover
            for="btn-close"
            open=${open || nothing}
            placement=${placement || nothing}
            trigger=${trigger || nothing}
            hide-arrow=${hideArrow || nothing}
            hide-on-click=${hideOnClick || nothing}
            distance=${distance || nothing}
            content-padding=${contentPadding || nothing}
        >
            Een boodschap die context geeft.
        </vl-popover>
    `);
};

describe('component vl-popover - default', () => {
    it('should mount', () => {
        mountDefault({});

        cy.get('vl-popover');
    });

    it('should be accessible', () => {
        mountDefault({});

        cy.injectAxe();
        cy.get('#btn-acties').click();
        cy.checkA11y('vl-popover');
    });

    it('should open', () => {
        mountDefault({});

        cy.get('#btn-acties').click();

        cy.get('vl-popover').should('have.attr', 'open');
        cy.get('#btn-acties').click();
        cy.get('vl-popover').should('not.have.attr', 'open');
    });

    it('should close when clicking an action', () => {
        mountDefault({ hideOnClick: true });

        cy.get('#btn-acties').click();
        cy.get('vl-popover').should('have.attr', 'open');
        cy.get('vl-popover').find('vl-popover-action').first().click();
        cy.get('vl-popover').should('not.have.attr', 'open');
    });

    it('should not close when clicking an action', () => {
        mountDefault({});

        cy.get('#btn-acties').click();
        cy.get('vl-popover').should('have.attr', 'open');
        cy.get('vl-popover').find('vl-popover-action').first().click();
        cy.get('vl-popover').should('have.attr', 'open');
    });

    it('should have default bottom placement', () => {
        mountDefault({});

        cy.get('#btn-acties').click();
        cy.get('vl-popover').should('have.attr', 'placement', 'bottom');
    });
});

describe('story vl-popover hover', () => {
    beforeEach(() => {
        mountHover({ trigger: 'hover' });
    });

    it('should be accessible', () => {
        cy.injectAxe();
        cy.get('button#btn-close').trigger('mouseover');
        cy.checkA11y('vl-popover');
    });

    it('should open', () => {
        cy.get('button#btn-close').trigger('mouseover');
        cy.get('vl-popover').should('have.attr', 'open');
    });

    it('should have default bottom placement', () => {
        cy.get('button#btn-close').trigger('mouseover');
        cy.get('vl-popover').should('have.attr', 'placement', 'bottom');
    });
});
