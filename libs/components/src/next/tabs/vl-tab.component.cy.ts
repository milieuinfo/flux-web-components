import { html } from 'lit';
import { registerWebComponents } from '@domg-wc/common-utilities';
import { VlTabComponent } from './vl-tab.component';

registerWebComponents([VlTabComponent]);

type MountDefaultProps = {
    disableLinks?: boolean;
    id?: string;
    title?: string;
};

const props = {
    disableLinks: false,
    id: 'tab',
    title: 'Tab',
};

const mountDefault = ({ disableLinks, id, title }: MountDefaultProps) => {
    return cy.mount(html` <ul id="tab-list" class="vl-tabs" tabs-list="" role="tablist">
        <vl-tab-next role="tab" id="${id}" href="${id}" ${disableLinks ? 'disable-link' : ''}>
            <slot name="${id}-title-slot">${title}</slot>
        </vl-tab-next>
    </ul>`);
};

describe('component vl-tab-section', () => {
    beforeEach(() => {
        mountDefault({ ...props });
    });

    it('should mount', () => {
        cy.get('[data-cy-root]').within(() => {
            cy.get('vl-tab-next');
        });
    });

    it('should be accessible', () => {
        cy.injectAxe();

        // voeg eerst de li.role, a.aria-selected && a.role attrs toe aan de elements voor de accessibility check testen
        // want dit is een unit test cy weet niet de volledig DOM structuur van mijn vl-tabs > vl-tab-section > vl-tab
        // ul.role="tablist" > li.role="tab" > a
        // dit wordt getest in vl-tabs.cy.ts > desktop.accessibility check

        cy.get('vl-tab-next').invoke('attr', 'role', 'none');
        cy.get('vl-tab-next').find('a').invoke('attr', 'aria-selected', 'false');
        cy.get('vl-tab-next').find('a').invoke('attr', 'role', 'tab');

        cy.checkA11y('vl-tab-next');
        cy.checkA11y('a.vl-tab__link');
    });
});

describe('component vl-tab-section - attributes', () => {
    it('should handle <id> attribute correctly', () => {
        mountDefault({ ...props, id: 'new-tab' });

        cy.get('vl-tab-next').should('have.id', 'new-tab');
        cy.get('vl-tab-next').should('have.attr', 'id', 'new-tab');
    });

    it('should handle href <attribute> correctly', () => {
        mountDefault({ ...props, id: 'new-href' });

        cy.get('vl-tab-next').invoke('attr', 'href', 'new-href');
        cy.get('.vl-tab__link').should('have.attr', 'href', 'new-href');
    });

    it('should handle <disable-link> attribute correctly', () => {
        mountDefault({ ...props, disableLinks: true });

        cy.get('vl-tab-next').should('not.have.attr', 'disable-link');
    });
});
