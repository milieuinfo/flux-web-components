import { registerWebComponents } from '@domg-wc/common';
import { VlButtonComponent } from '@domg-wc/components/atom';
import { html, nothing } from 'lit';
import { VlNavLink } from './vl-nav-link.component';

registerWebComponents([VlNavLink, VlButtonComponent]);

type MountOptions = {
    href?: string | null;
    icon?: string;
    active?: boolean;
    collapsed?: boolean;
    external?: boolean;
    disabled?: boolean;
    badge?: string;
    action?: boolean;
    customCSS?: string;
};

// vl-nav-link is een listitem en staat in vl-dashboard altijd in een lijst
const mountNavLink = ({
    href = '#overzicht',
    icon = 'places-home',
    active = false,
    collapsed = false,
    external = false,
    disabled = false,
    badge,
    action = false,
    customCSS,
}: MountOptions = {}) => {
    cy.mount(html`
        <div role="list" style="width: 300px">
            <vl-nav-link
                href=${href ?? nothing}
                icon=${icon ?? nothing}
                ?active=${active}
                ?collapsed=${collapsed}
                ?external=${external}
                ?disabled=${disabled}
                custom-css=${customCSS ?? nothing}
            >
                Overzicht
                ${action
                    ? html`<vl-button
                          slot="link-action"
                          icon="plus-circle-filled"
                          label="Item toevoegen"
                          ghost
                          data-cy="link-action"
                      ></vl-button>`
                    : nothing}
                ${badge ? html`<span slot="link-badge" data-cy="badge">${badge}</span>` : nothing}
            </vl-nav-link>
        </div>
    `);
    getButton();
};

const getButton = () => cy.get('vl-nav-link').shadow().find('vl-button');
const getLink = () => getButton().shadow().find('a');

describe('cypress-component - structures - vl-nav-link', () => {
    beforeEach(() => {
        cy.viewport(1280, 800);
    });

    it('should mount', () => {
        mountNavLink();
    });

    it('should be accessible', () => {
        mountNavLink({ active: true, badge: '3', action: true });

        cy.injectAxe();
        cy.checkA11y('vl-nav-link');
    });

    it('should be accessible when collapsed', () => {
        mountNavLink({ collapsed: true, badge: '3' });

        cy.injectAxe();
        cy.checkA11y('vl-nav-link');
    });

    it('should have the listitem role', () => {
        mountNavLink();

        cy.get('vl-nav-link').should('have.attr', 'role', 'listitem');
    });

    it('should keep an existing role', () => {
        cy.mount(html`<vl-nav-link href="#overzicht" role="none">Overzicht</vl-nav-link>`);

        cy.get('vl-nav-link').shadow().find('vl-button');
        cy.get('vl-nav-link').should('have.attr', 'role', 'none');
    });

    it('should render a ghost link button with the icon and href', () => {
        mountNavLink({ href: '#beheer', icon: 'list' });

        getButton().should('have.attr', 'ghost');
        getButton().should('have.attr', 'icon', 'list');
        getButton().should('have.attr', 'cta-link', '#beheer');
        getLink().should('have.attr', 'href', '#beheer');
        cy.get('vl-nav-link').should('contain.text', 'Overzicht');
    });

    it('should render a button without href', () => {
        mountNavLink({ href: null });

        getButton().should('not.have.attr', 'cta-link');
        getButton().shadow().find('button');
    });

    it('should use the link text as accessible name', () => {
        mountNavLink();

        getLink().should('have.attr', 'aria-label', 'Overzicht');
    });

    it('should add the badge text to the accessible name', () => {
        mountNavLink({ badge: '3' });

        cy.get('[data-cy="badge"]').should('contain.text', '3');
        getLink().should('have.attr', 'aria-label', 'Overzicht, 3');
    });

    it('should update the accessible name when only the data of a text node changes', () => {
        mountNavLink({ badge: '1' });
        getLink().should('have.attr', 'aria-label', 'Overzicht, 1');

        // zoals een binding in Lit, Angular of React: dezelfde text node, andere tekst, geen slotchange
        cy.get('vl-nav-link').then(([link]) => {
            const linkText = [...link.childNodes].find(
                (node) => node.nodeType === Node.TEXT_NODE && node.textContent?.includes('Overzicht'),
            ) as Text;
            linkText.data = 'Mijn overzicht';
        });
        cy.get('[data-cy="badge"]').then(([badge]) => {
            const badgeText = [...badge.childNodes].find(
                (node) => node.nodeType === Node.TEXT_NODE && node.textContent?.trim(),
            ) as Text;
            badgeText.data = '5';
        });

        getLink().should('have.attr', 'aria-label', 'Mijn overzicht, 5');
    });

    it('should update the accessible name when a child moves to the link-badge slot', () => {
        cy.mount(html`
            <div role="list">
                <vl-nav-link href="#notificaties">Notificaties<span data-cy="teller">4</span></vl-nav-link>
            </div>
        `);
        getLink().should('have.attr', 'aria-label', 'Notificaties 4');

        cy.get('[data-cy="teller"]').then(([teller]) => teller.setAttribute('slot', 'link-badge'));

        getLink().should('have.attr', 'aria-label', 'Notificaties, 4');
    });

    it('should hide the badge for assistive technology because its text is in the accessible name', () => {
        mountNavLink({ badge: '3' });

        cy.get('vl-nav-link')
            .shadow()
            .find('slot[name="link-badge"]')
            .parent()
            .should('have.attr', 'aria-hidden', 'true');
        getLink().should('have.attr', 'aria-label', 'Overzicht, 3');
    });

    it('should style a span in the link-badge slot as a badge', () => {
        mountNavLink({ badge: '3' });

        cy.get('[data-cy="badge"]')
            .should('be.visible')
            .and('have.css', 'position', 'absolute')
            .and('have.css', 'background-color', 'rgb(210, 55, 60)')
            .and('have.css', 'color', 'rgb(255, 255, 255)')
            .and('have.css', 'height', '18px');
    });

    it('should shrink the span when collapsed', () => {
        mountNavLink({ badge: '3', collapsed: true });

        cy.get('[data-cy="badge"]').should('have.css', 'height', '10px');
    });

    [false, true].forEach((collapsed) => {
        it(`should center the text of the span vertically${collapsed ? ' when collapsed' : ''}`, () => {
            mountNavLink({ badge: '1', collapsed });

            cy.get('[data-cy="badge"]').then(([badge]) => {
                const badgeRect = badge.getBoundingClientRect();
                const range = badge.ownerDocument.createRange();
                range.selectNodeContents(badge);
                const textRect = range.getBoundingClientRect();
                const badgeCenter = badgeRect.top + badgeRect.height / 2;
                const textCenter = textRect.top + textRect.height / 2;

                expect(textCenter).to.be.closeTo(badgeCenter, 1);
                // op een halve pixel snappen de pil en de tekst op een scherm met pixelverhouding 1 elk anders
                expect(badgeRect.top % 1).to.equal(0);
            });
        });
    });

    it('should set aria-current to page on the inner link when active', () => {
        mountNavLink({ active: true });

        cy.get('vl-nav-link').should('have.attr', 'active');
        getLink().should('have.attr', 'aria-current', 'page');
    });

    it('should not set aria-current on the inner link when not active', () => {
        mountNavLink();

        getLink().should('not.have.attr', 'aria-current');
    });

    it('should update aria-current on the inner link when active changes', () => {
        mountNavLink();

        cy.get('vl-nav-link').then(([link]) => {
            (link as VlNavLink).active = true;
        });
        getLink().should('have.attr', 'aria-current', 'page');

        cy.get('vl-nav-link').then(([link]) => {
            (link as VlNavLink).active = false;
        });
        getLink().should('not.have.attr', 'aria-current');
    });

    describe('click', () => {
        beforeEach(() => {
            cy.window().then((window) =>
                window.history.replaceState(null, '', window.location.pathname + window.location.search),
            );
        });

        it('should follow the link when the padding around the button is clicked', () => {
            mountNavLink({ href: '#items' });

            cy.get('vl-nav-link').shadow().find('.vl-group').click(5, 10);

            cy.location('hash').should('equal', '#items');
        });

        // een click-listener op de interne <a> meet de doorgestuurde klik en houdt de navigatie tegen: verandert de hash
        // toch, dan zette vl-nav-link zelf location.href, en dat vangt de router van een SPA niet op
        const spyOnInnerLinkClick = () =>
            getLink().then(([anchor]) => {
                const spy = cy.spy().as('innerClick');
                anchor.addEventListener('click', (event) => {
                    spy();
                    event.preventDefault();
                });
            });

        it('should forward a click in the padding to the inner link without setting location.href', () => {
            mountNavLink({ href: '#items' });
            spyOnInnerLinkClick();

            cy.get('vl-nav-link').shadow().find('.vl-group').click(5, 10);

            cy.get('@innerClick').should('have.been.calledOnce');
            cy.location('hash').should('not.equal', '#items');
        });

        it('should forward a click in the padding to the inner link after the link moved in the DOM', () => {
            mountNavLink({ href: '#items' });
            cy.get('vl-nav-link').then(([link]) => {
                link.parentElement!.append(link);
            });
            spyOnInnerLinkClick();

            cy.get('vl-nav-link').shadow().find('.vl-group').click(5, 10);

            cy.get('@innerClick').should('have.been.calledOnce');
        });

        it('should forward a click in the padding of an external link to the inner link', () => {
            mountNavLink({ href: 'https://www.vlaanderen.be', external: true });
            cy.window().then((window) => cy.stub(window, 'open').as('open'));
            spyOnInnerLinkClick();

            cy.get('vl-nav-link').shadow().find('.vl-group').click(5, 10);

            cy.get('@innerClick').should('have.been.calledOnce');
            cy.get('@open').should('not.have.been.called');
            getLink().should('have.attr', 'target', '_blank');
        });

        it('should not forward a click in the padding of a disabled link', () => {
            mountNavLink({ href: '#items', disabled: true });
            spyOnInnerLinkClick();

            cy.get('vl-nav-link').shadow().find('.vl-group').click(5, 10, { force: true });

            cy.get('@innerClick').should('not.have.been.called');
            cy.location('hash').should('not.equal', '#items');
        });

        it('should not follow the link when the link-action is clicked', () => {
            mountNavLink({ href: '#items', action: true });

            cy.get('[data-cy="link-action"]').click();

            cy.location('hash').should('not.equal', '#items');
        });

        it('should click the inner button when the padding around a link without href is clicked', () => {
            mountNavLink({ href: null });
            cy.get('vl-nav-link').then(([link]) => {
                link.addEventListener('vl-click', cy.stub().as('vlClick'));
            });

            cy.get('vl-nav-link').shadow().find('.vl-group').click(5, 10);

            cy.get('@vlClick').should('have.been.calledOnce');
        });
    });

    it('should use the subtle action background token when active', () => {
        mountNavLink({ active: true });

        cy.get('vl-nav-link').should('have.css', 'background-color', 'rgb(228, 235, 245)');
    });

    [false, true].forEach((collapsed) => {
        it(`should keep the active background and bar within the host${collapsed ? ' when collapsed' : ''}`, () => {
            mountNavLink({ active: true, collapsed });

            cy.get('vl-nav-link').then(([link]) => {
                const host = link.getBoundingClientRect();
                const hostStyle = getComputedStyle(link);
                const bar = getComputedStyle(link, '::before');

                // geen outline meer die buiten de host uitsteekt
                expect(hostStyle.outlineStyle).to.equal('none');
                expect(bar.outlineStyle).to.equal('none');

                // de achtergrond is die van de host zelf; de balk staat absoluut binnen de host
                const barLeft = host.left + parseFloat(bar.left);
                const barTop = host.top + parseFloat(bar.top);
                const barRight = barLeft + parseFloat(bar.width);
                const barBottom = barTop + parseFloat(bar.height);
                expect(parseFloat(bar.width)).to.be.greaterThan(0);
                expect(barLeft).to.be.at.least(host.left);
                expect(barTop).to.be.at.least(host.top);
                expect(barRight).to.be.at.most(host.right);
                expect(barBottom).to.be.at.most(host.bottom);
            });
        });
    });

    it('should open an external link in a new tab', () => {
        mountNavLink({ external: true });

        getLink().should('have.attr', 'target', '_blank').and('have.attr', 'rel', 'noopener noreferrer nofollow');
    });

    it('should disable the link', () => {
        mountNavLink({ disabled: true });

        cy.get('vl-nav-link').should('have.attr', 'disabled');
        getLink().should('have.attr', 'aria-disabled', 'true').and('not.have.attr', 'href');
    });

    it('should render the link-action slot', () => {
        mountNavLink({ action: true });

        cy.get('[data-cy="link-action"]').should('be.visible');
    });

    it('should hide the label and the link-action when collapsed', () => {
        mountNavLink({ collapsed: true, action: true });

        getLink().should('have.css', 'font-size', '0px');
        getLink().find('[part="icon"]').should('be.visible');
        cy.get('[data-cy="link-action"]').should('not.be.visible');
    });

    it('should reflect the collapsed property to the attribute', () => {
        mountNavLink();

        cy.get('vl-nav-link').then(([link]) => {
            (link as VlNavLink).collapsed = true;
        });

        cy.get('vl-nav-link').should('have.attr', 'collapsed');
        getLink().should('have.css', 'font-size', '0px');
    });

    it('should not apply the collapsed styles at the medium breakpoint', () => {
        cy.viewport(1023, 800);
        mountNavLink({ collapsed: true, action: true });

        getLink().should('not.have.css', 'font-size', '0px');
        cy.get('[data-cy="link-action"]').should('be.visible');
    });

    it('should apply custom-css', () => {
        mountNavLink({ customCSS: ':host > .vl-group { padding-block: 10px; }' });

        cy.get('vl-nav-link').shadow().find('.vl-group').should('have.css', 'padding-top', '10px');
    });
});
