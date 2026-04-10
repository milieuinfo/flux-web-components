import { registerWebComponents } from '@domg-wc/common';
import { html } from 'lit';
import { VlTabLinkComponent } from './vl-tab-link.component';

registerWebComponents([VlTabLinkComponent]);

describe('cypress-component - block components - vl-tab-link-next', () => {
    const mountTabLink = ({ selected = false, external = false } = {}) => {
        return cy.mount(html`
            <vl-tab-link-next 
                href="#test" 
                ?selected=${selected} 
                ?external=${external}
            >
                Link tab
            </vl-tab-link-next>
        `);
    };

    it('should render the link with the correct href attribute', () => {
        mountTabLink();

        cy.get('vl-tab-link-next').shadow().find('a').should('have.attr', 'href', '#test');
    });

    it('should reflect selected state with aria-current', () => {
        mountTabLink({ selected: true });

        cy.get('vl-tab-link-next').shadow().find('a').should('have.attr', 'aria-current', 'page');
    });

    it('should render external links with the right target and rel attributes', () => {
        mountTabLink({ external: true });

        cy.get('vl-tab-link-next')
            .shadow()
            .find('a')
            .should('have.attr', 'target', '_blank')
            .and('have.attr', 'rel', 'nofollow noopener noreferrer');
    });

    it('should dispatch vl-tab-link-click on link click', () => {
        mountTabLink();
        
        cy.createStubForEvent('vl-tab-link-next', 'vl-tab-link-click');
        cy.get('vl-tab-link-next').shadow().find('a').click()
        cy.get('@vl-tab-link-click').should('have.been.called');
    });
});
