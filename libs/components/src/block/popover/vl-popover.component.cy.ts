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
    maxHeight,
}: {
    trigger?: string;
    contentPadding?: string;
    open?: boolean;
    placement?: string;
    hideArrow?: boolean;
    hideOnClick?: boolean;
    distance?: number;
    maxHeight?: string;
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
            max-height=${maxHeight || nothing}
        >
            <vl-popover-action-list aria-label="Acties">
                <vl-popover-action icon="search" .action=${'search'}>Zoeken</vl-popover-action>
                <vl-popover-action icon="bell" .action=${'report'}>Rapportenoverzicht</vl-popover-action>
                <vl-popover-action icon="pin" .action=${'locate'}>Vind locatie</vl-popover-action>
            </vl-popover-action-list>
        </vl-popover>
    `);
};

const mountLongList = ({ maxHeight }: { maxHeight?: string } = {}) => {
    return cy.mount(html`
        <vl-button ghost icon="nav-show-more-vertical" id="btn-acties" label="Acties"></vl-button>
        <vl-popover id="popover" for="btn-acties" placement="bottom-start" max-height=${maxHeight || nothing}>
            <vl-popover-action-list aria-label="Acties">
                ${Array.from(
                    { length: 30 },
                    (_, i) => html`<vl-popover-action icon="pin" .action=${`actie-${i + 1}`}>Actie ${i + 1}</vl-popover-action>`
                )}
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

describe('cypress-component - block components - vl-popover - max-height / scroll', () => {
    it('should not make the content scrollable when it fits', () => {
        mountDefault({});
        cy.injectAxe();

        cy.get('#btn-acties').click();
        cy.get('vl-popover').shadow().find('.popover-scroll-container').should('not.have.attr', 'tabindex');
        cy.get('vl-popover')
            .shadow()
            .find('.popover-scroll-container')
            .should(($el) => {
                expect($el[0].scrollHeight).to.be.at.most($el[0].clientHeight);
            });
        cy.checkA11y('vl-popover');
    });

    it('should show a scrollbar and stay within max-height when content overflows', () => {
        mountLongList({ maxHeight: '150px' });
        cy.injectAxe();

        cy.get('#btn-acties').click();
        cy.get('vl-popover')
            .shadow()
            .find('.popover-scroll-container')
            .should(($el) => {
                const el = $el[0];
                expect(el.scrollHeight).to.be.greaterThan(el.clientHeight);
                expect(el.clientHeight).to.be.at.most(150);
            });
        cy.checkA11y('vl-popover');
    });

    it('should make the scroll container keyboard focusable when scrollable', () => {
        mountLongList({ maxHeight: '150px' });

        cy.get('#btn-acties').click();
        cy.get('vl-popover').shadow().find('.popover-scroll-container').should('have.attr', 'tabindex', '0');
    });

    it('should stay within the viewport when content is longer than the available space', () => {
        cy.viewport(500, 320);
        mountLongList({});
        cy.injectAxe();

        cy.get('#btn-acties').click();
        cy.get('vl-popover')
            .shadow()
            .find('.popover-content')
            .should(($el) => {
                const rect = $el[0].getBoundingClientRect();
                expect(rect.bottom).to.be.at.most(Cypress.config('viewportHeight'));
            });
        cy.get('vl-popover')
            .shadow()
            .find('.popover-scroll-container')
            .should(($el) => {
                expect($el[0].scrollHeight).to.be.greaterThan($el[0].clientHeight);
            });
        cy.checkA11y('vl-popover');
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
