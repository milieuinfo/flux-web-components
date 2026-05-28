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

const mountTall = ({ maxHeight }: { maxHeight?: string } = {}) => {
    const actions = Array.from(
        { length: 30 },
        (_, i) => html`<vl-popover-action icon="search" .action=${`action-${i}`}>Actie ${i}</vl-popover-action>`
    );
    return cy.mount(html`
        <vl-button ghost icon="nav-show-more-vertical" id="btn-acties" label="Acties"></vl-button>
        <vl-popover id="popover" for="btn-acties" open max-height=${maxHeight || nothing}>
            <vl-popover-action-list aria-label="Acties">${actions}</vl-popover-action-list>
        </vl-popover>
    `);
};

const mountTallText = ({ maxHeight }: { maxHeight?: string } = {}) => {
    const paragraphs = Array.from(
        { length: 20 },
        (_, i) => html`<p>Lange tooltip-tekst zonder focusbare inhoud, regel ${i}.</p>`
    );
    return cy.mount(html`
        <vl-button ghost icon="nav-show-more-vertical" id="btn-info" label="Info"></vl-button>
        <vl-popover id="popover" for="btn-info" type="tooltip" open max-height=${maxHeight || nothing}>
            ${paragraphs}
        </vl-popover>
    `);
};

describe('cypress-component - block components - vl-popover - max-height', () => {
    it('should make the content scrollable when it exceeds max-height', () => {
        cy.injectAxe();
        mountTall({ maxHeight: '200px' });

        cy.get('vl-popover')
            .shadow()
            .find('.popover-scroll')
            .then(($el) => {
                expect($el[0].scrollHeight).to.be.greaterThan($el[0].clientHeight);
                expect($el[0].clientHeight).to.be.lessThan(250);
            });
        cy.checkA11y('vl-popover');
    });

    it('should not add a redundant tabindex when the scrollable content already has focusable children', () => {
        // De knoppen van de action-list zijn elk al een tab-stop, dus het scroll-gebied is
        // al toetsenbord-bereikbaar. Een eigen tabindex zou enkel een lege focus-ring toevoegen.
        mountTall({ maxHeight: '200px' });

        cy.get('vl-popover').shadow().find('.popover-scroll').should('not.have.attr', 'tabindex');
    });

    it('should make the scrollable content keyboard reachable when it has no focusable children', () => {
        cy.injectAxe();
        mountTallText({ maxHeight: '200px' });

        cy.get('vl-popover')
            .shadow()
            .find('.popover-scroll')
            .then(($el) => {
                expect($el[0].scrollHeight).to.be.greaterThan($el[0].clientHeight);
            });
        cy.get('vl-popover').shadow().find('.popover-scroll').should('have.attr', 'tabindex', '0');
        cy.checkA11y('vl-popover');
    });

    it('should keep the arrow when scrolling', () => {
        mountTall({ maxHeight: '200px' });

        cy.get('vl-popover').shadow().find('i#popover-arrow').should('exist');
    });

    it('should not force a scrollbar or tabindex when content fits', () => {
        mountDefault({ open: true });

        cy.get('vl-popover')
            .shadow()
            .find('.popover-scroll')
            .then(($el) => {
                expect($el[0].scrollHeight).to.eq($el[0].clientHeight);
            });
        cy.get('vl-popover').shadow().find('.popover-scroll').should('not.have.attr', 'tabindex');
    });
});

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
