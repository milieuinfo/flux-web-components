import { registerWebComponents } from '@domg-wc/common';
import { html, nothing } from 'lit';
import { VlBadgeComponent } from './vl-badge.component';

registerWebComponents([VlBadgeComponent]);

const img =
    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10"><rect width="10" height="10"/></svg>';

type MountOptions = { icon?: string; img?: string; alt?: string; background?: string; customCSS?: string };

const mountBadge = ({ icon, img, alt, background, customCSS }: MountOptions = {}) => {
    cy.mount(html`
        <vl-badge
            icon=${icon ?? nothing}
            img=${img ?? nothing}
            alt=${alt ?? nothing}
            background=${background ?? nothing}
            custom-css=${customCSS ?? nothing}
        ></vl-badge>
    `);
    cy.get('vl-badge').shadow();
};

// decoratief: de host heeft geen rol en geen naam
const expectNoRoleAndLabel = () =>
    cy.get('vl-badge').should(([badge]) => {
        expect(badge.hasAttribute('role'), 'role').to.equal(false);
        expect(badge.hasAttribute('aria-label'), 'aria-label').to.equal(false);
    });

describe('cypress-component - block components - vl-badge', () => {
    it('should mount', () => {
        mountBadge({ icon: 'building-big' });
    });

    it('should be accessible with an icon', () => {
        mountBadge({ icon: 'building-big' });

        cy.injectAxe();
        cy.checkA11y('vl-badge');
    });

    it('should be accessible with an image', () => {
        mountBadge({ img, alt: 'Logo van het bedrijf' });

        cy.injectAxe();
        cy.checkA11y('vl-badge');
    });

    it('should be accessible with a primary background', () => {
        mountBadge({ icon: 'building-big', background: 'primary' });

        cy.injectAxe();
        cy.checkA11y('vl-badge');
    });

    it('should render the icon as decorative', () => {
        mountBadge({ icon: 'building-big' });

        cy.get('vl-badge')
            .shadow()
            .find('span.vl-icon.vl-icon--building-big')
            .should('have.attr', 'aria-hidden', 'true')
            .and('be.visible');
        cy.get('vl-badge').shadow().find('img').should('not.exist');
        expectNoRoleAndLabel();
    });

    it('should keep an icon with an empty alt decorative', () => {
        mountBadge({ icon: 'building-big', alt: '' });

        expectNoRoleAndLabel();
    });

    it('should label an icon with alt as an image', () => {
        mountBadge({ icon: 'building-big', alt: 'Bedrijf' });

        cy.get('vl-badge').should('have.attr', 'role', 'img');
        cy.get('vl-badge').should('have.attr', 'aria-label', 'Bedrijf');
        cy.get('vl-badge').shadow().find('.vl-icon').should('have.attr', 'aria-hidden', 'true');

        cy.get('vl-badge').then(([badge]) => badge.removeAttribute('alt'));
        expectNoRoleAndLabel();
    });

    it('should keep a role and aria-label of the consumer on an icon without alt', () => {
        cy.mount(html`<vl-badge icon="check" role="img" aria-label="Status: ok"></vl-badge>`);
        cy.get('vl-badge').shadow().find('.vl-icon');

        // een update van de badge zonder alt laat ze staan
        cy.get('vl-badge').then(([badge]) => badge.setAttribute('icon', 'building-big'));
        cy.get('vl-badge').shadow().find('.vl-icon--building-big');

        cy.get('vl-badge').should('have.attr', 'role', 'img');
        cy.get('vl-badge').should('have.attr', 'aria-label', 'Status: ok');
    });

    it('should be accessible with an icon with alt', () => {
        mountBadge({ icon: 'building-big', alt: 'Bedrijf' });

        cy.injectAxe();
        cy.checkA11y('vl-badge');
    });

    it('should render the image with the alt text', () => {
        mountBadge({ img, alt: 'Logo van het bedrijf' });

        cy.get('vl-badge')
            .shadow()
            .find('img.vl-badge__img')
            .should('have.attr', 'src', img)
            .and('have.attr', 'alt', 'Logo van het bedrijf');
        expectNoRoleAndLabel();
    });

    it('should render the image with an empty alt text when no alt is set', () => {
        mountBadge({ img });

        cy.get('vl-badge').shadow().find('img').should('have.attr', 'alt', '');
    });

    it('should render the image instead of the icon when both are set', () => {
        mountBadge({ img, icon: 'building-big' });

        cy.get('vl-badge').shadow().find('img').should('exist');
        cy.get('vl-badge').shadow().find('.vl-icon').should('not.exist');
    });

    it('should render nothing inside the badge without icon or image', () => {
        mountBadge();

        cy.get('vl-badge').shadow().children().should('have.length', 0);
    });

    it('should render a round badge with the subtle background by default', () => {
        mountBadge({ icon: 'building-big' });

        cy.get('vl-badge')
            .should('have.attr', 'background', 'subtle')
            .and('have.css', 'width', '45px')
            .and('have.css', 'height', '45px')
            .and('have.css', 'border-radius', '50%')
            .and('have.css', 'background-color', 'rgb(247, 249, 252)');
    });

    it('should render the default background', () => {
        mountBadge({ icon: 'building-big', background: 'default' });

        cy.get('vl-badge').should('have.css', 'background-color', 'rgb(255, 255, 255)');
    });

    it('should render the primary background', () => {
        mountBadge({ icon: 'building-big', background: 'primary' });

        // de standaard --vl-theme-primary-color (#ffe615)
        cy.get('vl-badge')
            .should('have.css', 'background-color', 'rgb(255, 230, 21)')
            .and('have.css', 'border-color', 'rgb(255, 230, 21)');
    });

    it('should be accessible with an action background', () => {
        mountBadge({ icon: 'building-big', background: 'action' });

        cy.injectAxe();
        cy.checkA11y('vl-badge');
    });

    it('should render the action background with white content', () => {
        mountBadge({ icon: 'building-big', background: 'action' });

        // --vl-color--action (#0055cc) en --vl-color--text-on-action (wit)
        cy.get('vl-badge')
            .should('have.css', 'background-color', 'rgb(0, 85, 204)')
            .and('have.css', 'border-color', 'rgb(0, 85, 204)')
            .and('have.css', 'color', 'rgb(255, 255, 255)');
    });

    it('should use the theme primary color for the primary background', () => {
        cy.mount(html`
            <div style="--vl-theme-primary-color: rgb(50, 183, 190)">
                <vl-badge icon="building-big" background="primary"></vl-badge>
            </div>
        `);

        cy.get('vl-badge').should('have.css', 'background-color', 'rgb(50, 183, 190)');
    });

    it('should let the icon follow the font size of the badge', () => {
        mountBadge({ icon: 'building-big' });

        cy.get('vl-badge').invoke('attr', 'style', 'font-size: 10px');
        cy.get('vl-badge').shadow().find('.vl-icon').should('have.css', 'font-size', '10px');
    });

    it('should expose the img and icon parts', () => {
        mountBadge({ img });
        cy.get('vl-badge').shadow().find('img').should('have.attr', 'part', 'img');

        mountBadge({ icon: 'building-big' });
        cy.get('vl-badge').eq(1).shadow().find('.vl-icon').should('have.attr', 'part', 'icon');
    });

    it('should apply custom-css', () => {
        mountBadge({ icon: 'building-big', customCSS: ':host { width: 20px; }' });

        cy.get('vl-badge').should('have.css', 'width', '20px');
    });
});
