import { registerWebComponents } from '@domg-wc/common';
import { html, nothing } from 'lit';
import { VlButtonComponent } from '../../atom/button';
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
        <vl-button ghost icon="nav-show-more-vertical" id="btn-acties" label="Acties"></vl-button>
        <vl-popover
            id="popover"
            for="btn-acties"
            ?open=${open}
            placement=${placement || nothing}
            trigger=${trigger || nothing}
            hide-arrow=${hideArrow || nothing}
            hide-on-click=${hideOnClick || nothing}
            distance=${distance || nothing}
            content-padding=${contentPadding || nothing}
        >
            <vl-popover-action-list aria-label="Acties">
                <vl-popover-action icon="search" .action=${'search'}>Zoeken</vl-popover-action>
                <vl-popover-action icon="bell" .action=${'report'}>Rapportenoverzicht</vl-popover-action>
                <vl-popover-action icon="pin" .action=${'locate'}>Vind locatie</vl-popover-action>
            </vl-popover-action-list>
        </vl-popover>
    `);
};

describe('cypress-component - block components - vl-popover - default', () => {
    it('should mount', () => {
        mountDefault({});

        cy.get('vl-popover');
    });

    it('should be accessible', () => {
        mountDefault({});

        cy.injectAxe();
        cy.get('#btn-acties').click();

        cy.get('#btn-acties').shadow().find('[aria-haspopup="true"]').should('exist');
        cy.get('#btn-acties').shadow().find('[aria-controls="popover"]').should('exist');
        cy.checkA11y('vl-popover');
    });

    it('should open', () => {
        cy.injectAxe();
        mountDefault({});

        cy.get('#btn-acties').click();
        cy.checkA11y('vl-popover');

        cy.get('vl-popover').should('have.attr', 'open');
        cy.get('#btn-acties').click();
        cy.get('vl-popover').should('not.have.attr', 'open');
        cy.checkA11y('vl-popover');
    });

    it('should close when clicking an action', () => {
        mountDefault({ hideOnClick: true });
        cy.injectAxe();

        cy.get('#btn-acties').click();
        cy.get('vl-popover').should('have.attr', 'open');
        cy.checkA11y('vl-popover');

        cy.get('vl-popover').find('vl-popover-action').first().click();
        cy.get('vl-popover').should('not.have.attr', 'open');
        cy.checkA11y('vl-popover');
    });

    it('should not close when clicking an action', () => {
        mountDefault({});
        cy.injectAxe();

        cy.get('#btn-acties').click();
        cy.get('vl-popover').should('have.attr', 'open');
        cy.checkA11y('vl-popover');

        cy.get('vl-popover').find('vl-popover-action').first().click();
        cy.get('vl-popover').should('have.attr', 'open');
        cy.checkA11y('vl-popover');
    });

    it('should have default bottom placement', () => {
        mountDefault({});
        cy.injectAxe();

        cy.get('#btn-acties').click();
        cy.get('vl-popover').should('have.attr', 'placement', 'bottom');
        cy.checkA11y('vl-popover');
    });

    it('should not have role tooltip if trigger is click', () => {
        mountDefault({});
        cy.injectAxe();

        cy.get('#btn-acties').trigger('click');
        cy.get('vl-popover').shadow().find('div[role="tooltip"]').should('not.exist');
        cy.checkA11y('vl-popover');
    });

    it('should not open on focus when trigger is not set to focus', () => {
        mountDefault({ trigger: 'click' });

        cy.get('#btn-acties').shadow().find('button').focus();
        cy.get('vl-popover').should('not.be.visible');
    });

    it('should open on focus when trigger is set to focus', () => {
        mountDefault({ trigger: 'focus' });

        cy.get('#btn-acties').shadow().find('button').focus();
        cy.get('vl-popover').should('be.visible');
    });
});

const mountWithMaxHeight = (maxHeight: number) => {
    return cy.mount(html`
        <vl-button ghost icon="nav-show-more-vertical" id="btn-scroll" label="Acties"></vl-button>
        <vl-popover id="popover-scroll" for="btn-scroll" max-height=${maxHeight}>
            <vl-popover-action-list aria-label="Lange actielijst">
                <vl-popover-action icon="search" .action=${'a1'}>Item 1</vl-popover-action>
                <vl-popover-action icon="search" .action=${'a2'}>Item 2</vl-popover-action>
                <vl-popover-action icon="search" .action=${'a3'}>Item 3</vl-popover-action>
                <vl-popover-action icon="search" .action=${'a4'}>Item 4</vl-popover-action>
                <vl-popover-action icon="search" .action=${'a5'}>Item 5</vl-popover-action>
                <vl-popover-action icon="search" .action=${'a6'}>Item 6</vl-popover-action>
                <vl-popover-action icon="search" .action=${'a7'}>Item 7</vl-popover-action>
                <vl-popover-action icon="search" .action=${'a8'}>Item 8</vl-popover-action>
            </vl-popover-action-list>
        </vl-popover>
    `);
};

describe('cypress-component - block components - vl-popover - scroll', () => {
    it('should have overflow-y: auto on popover-content', () => {
        mountDefault({});

        cy.get('#btn-acties').click();
        cy.get('vl-popover').shadow().find('.popover-content').should('have.css', 'overflow-y', 'auto');
    });

    it('should have tabindex on popover-content when open', () => {
        mountDefault({});

        cy.get('#btn-acties').click();
        cy.get('vl-popover').shadow().find('.popover-content').should('have.attr', 'tabindex', '0');

        cy.get('#btn-acties').click();
        cy.get('vl-popover').shadow().find('.popover-content').should('not.have.attr', 'tabindex');
    });

    it('should not have tabindex on tooltip popover-content', () => {
        mountDefault({ trigger: 'hover' });

        cy.get('#btn-acties').trigger('mouseover', { force: true });
        cy.get('vl-popover').shadow().find('.popover-content').should('not.have.attr', 'tabindex');
    });

    it('should respect max-height attribute', () => {
        mountWithMaxHeight(100);

        cy.get('#btn-scroll').click();
        cy.get('vl-popover#popover-scroll')
            .shadow()
            .find('.popover-content')
            .should('have.css', 'max-height', '100px');
    });

    it('should be scrollable when content exceeds max-height', () => {
        mountWithMaxHeight(100);

        cy.get('#btn-scroll').click();
        cy.get('vl-popover#popover-scroll')
            .shadow()
            .find('.popover-content')
            .then(($el) => {
                expect($el[0].scrollHeight).to.be.greaterThan($el[0].clientHeight);
            });
    });

    it('should be accessible when scrollable', () => {
        mountWithMaxHeight(100);
        cy.injectAxe();

        cy.get('#btn-scroll').click();
        cy.checkA11y('vl-popover#popover-scroll');
    });
});

describe('cypress-component - block components - vl-popover - hover', () => {
    beforeEach(() => {
        mountDefault({ trigger: 'hover' });
    });

    it('should be accessible', () => {
        cy.injectAxe();
        cy.get('#btn-acties').trigger('mouseover');

        cy.get('#btn-acties').should('not.have.attr', 'aria-haspopup', 'true');
        cy.get('#btn-acties').should('not.have.attr', 'aria-controls', 'popover');
        cy.get('#btn-acties').should('have.attr', 'aria-describedby', 'popover');
        cy.checkA11y('vl-popover');
    });

    it('should open', () => {
        cy.injectAxe();

        cy.get('#btn-acties').trigger('mouseover', { force: true });
        cy.get('vl-popover').should('have.attr', 'open');
        cy.checkA11y('vl-popover');
    });

    it('should have default bottom placement', () => {
        cy.injectAxe();

        cy.get('#btn-acties').trigger('mouseover');
        cy.get('vl-popover').should('have.attr', 'placement', 'bottom');
        cy.checkA11y('vl-popover');
    });

    it('should have role tooltip', () => {
        cy.injectAxe();

        cy.get('#btn-acties').trigger('mouseover');
        cy.get('vl-popover').shadow().find('div[role="tooltip"]').should('exist');
        cy.checkA11y('vl-popover');
    });
});
