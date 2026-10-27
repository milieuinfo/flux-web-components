import { registerWebComponents } from '@domg-wc/common';
import { html, nothing } from 'lit';
import { VlNavLink } from './vl-nav-link.component';
import { VlNavSub } from './vl-nav-sub.component';

registerWebComponents([VlNavSub, VlNavLink]);

type MountOptions = {
    label?: string | null;
    icon?: string;
    href?: string;
    active?: boolean;
    collapsed?: boolean;
    customCSS?: string;
};

// vl-nav-sub is een listitem en staat in vl-dashboard altijd in een lijst (de breedte is testopzet)
const mountNavSub = ({
    label = 'Sub navigatie',
    icon = 'paperplane',
    href,
    active = false,
    collapsed = false,
    customCSS,
}: MountOptions = {}) => {
    cy.mount(html`
        <div role="list" style="width: 300px">
            <vl-nav-sub
                label=${label ?? nothing}
                icon=${icon ?? nothing}
                href=${href ?? nothing}
                ?active=${active}
                ?collapsed=${collapsed}
                custom-css=${customCSS ?? nothing}
            >
                <vl-nav-link href="#item-1" icon="paperplane" data-cy="link-1">Item 1</vl-nav-link>
                <vl-nav-link href="#item-2" icon="paperplane" data-cy="link-2">Item 2</vl-nav-link>
            </vl-nav-sub>
        </div>
    `);
    getNavSub().find('.vl-nav-sub');
};

const getNavSub = () => cy.get('vl-nav-sub').shadow();

describe('cypress-component - structures - vl-nav-sub', () => {
    beforeEach(() => {
        cy.viewport(1280, 800);
    });

    it('should mount', () => {
        mountNavSub();
    });

    it('should be accessible', () => {
        mountNavSub();

        cy.injectAxe();
        cy.checkA11y('vl-nav-sub');
    });

    it('should be accessible when collapsed', () => {
        mountNavSub({ collapsed: true });

        cy.injectAxe();
        cy.checkA11y('vl-nav-sub');
    });

    it('should have the listitem role', () => {
        mountNavSub();

        cy.get('vl-nav-sub').should('have.attr', 'role', 'listitem');
    });

    it('should render the label with the icon', () => {
        mountNavSub();

        getNavSub().find('#label .vl-nav-sub__label-text').should('have.text', 'Sub navigatie');
        getNavSub().find('#label vl-icon').should('have.attr', 'icon', 'paperplane');
    });

    it('should label the list of nav links with the label', () => {
        mountNavSub();

        getNavSub().find('#label').should('have.attr', 'aria-hidden', 'true');
        getNavSub()
            .find('.vl-nav-sub__items')
            .should('have.attr', 'role', 'list')
            .and('have.attr', 'aria-labelledby', 'label');
        getNavSub().find('.vl-nav-sub__items slot');
        cy.get('[data-cy="link-1"]').should('be.visible');
        cy.get('[data-cy="link-2"]').should('be.visible');
    });

    it('should not render a label without label attribute', () => {
        mountNavSub({ label: null });

        getNavSub().find('#label').should('not.exist');
        getNavSub().find('.vl-nav-sub__items').should('not.have.attr', 'aria-labelledby');
    });

    it('should pass the collapsed state to the nav links', () => {
        mountNavSub({ collapsed: true });

        cy.get('[data-cy="link-1"]').should('have.attr', 'collapsed');
        cy.get('[data-cy="link-2"]').should('have.attr', 'collapsed');

        cy.get('vl-nav-sub').then(([navSub]) => navSub.removeAttribute('collapsed'));

        cy.get('[data-cy="link-1"]').should('not.have.attr', 'collapsed');
        cy.get('[data-cy="link-2"]').should('not.have.attr', 'collapsed');
    });

    it('should pass the collapsed state to nav links that are added later', () => {
        mountNavSub({ collapsed: true });

        cy.get('vl-nav-sub').then(([navSub]) => {
            navSub.insertAdjacentHTML('beforeend', '<vl-nav-link href="#item-3" data-cy="link-3">Item 3</vl-nav-link>');
        });

        cy.get('[data-cy="link-3"]').should('have.attr', 'collapsed');
    });

    [
        { collapsed: false, href: undefined },
        { collapsed: true, href: undefined },
        { collapsed: false, href: '#dossier-x' },
        { collapsed: true, href: '#dossier-x' },
    ].forEach(({ collapsed, href }) => {
        it(`should align the icons and texts with those of a top level nav link${href ? ' with href' : ''}${collapsed ? ' when collapsed' : ''}`, () => {
            cy.viewport(1280, 800);
            cy.mount(html`
                <div role="list" style="width: ${collapsed ? '4.1rem' : '300px'}">
                    <vl-nav-link href="#overzicht" icon="places-home" ?collapsed=${collapsed} data-cy="top-link"
                        >Overzicht</vl-nav-link
                    >
                    <vl-nav-sub label="Dossier X" icon="file" href=${href ?? nothing} ?collapsed=${collapsed}>
                        <vl-nav-link href="#lopend" icon="hourglass" data-cy="sub-link">Lopende taken</vl-nav-link>
                    </vl-nav-sub>
                </div>
            `);
            getNavSub().find('.vl-nav-sub');

            const linkPositions = (link: Element) => {
                const icon = link
                    .shadowRoot!.querySelector('vl-button')!
                    .shadowRoot!.querySelector('[part="icon"]')!
                    .getBoundingClientRect();
                const range = link.ownerDocument.createRange();
                range.selectNodeContents(link);
                return { iconCenter: icon.left + icon.width / 2, textLeft: range.getBoundingClientRect().left };
            };

            cy.get('[data-cy="top-link"]').then(([topLink]) => {
                cy.get('[data-cy="sub-link"]').then(([subLink]) => {
                    cy.get('vl-nav-sub').then(([navSub]) => {
                        const top = linkPositions(topLink);
                        const sub = linkPositions(subLink);
                        const label = navSub.shadowRoot!.querySelector('#label')!;
                        const labelIcon = href
                            ? linkPositions(label).iconCenter
                            : (() => {
                                  const icon = label.querySelector('vl-icon')!.getBoundingClientRect();
                                  return icon.left + icon.width / 2;
                              })();
                        const labelTextLeft = href
                            ? linkPositions(label).textLeft
                            : label.querySelector('.vl-nav-sub__label-text')!.getBoundingClientRect().left;

                        expect(sub.iconCenter, 'icoon van een link in de nav-sub').to.be.closeTo(top.iconCenter, 0.5);
                        expect(labelIcon, 'icoon van het label').to.be.closeTo(top.iconCenter, 0.5);
                        if (!collapsed) {
                            expect(sub.textLeft, 'tekst van een link in de nav-sub').to.be.closeTo(top.textLeft, 0.5);
                            expect(labelTextLeft, 'tekst van het label').to.be.closeTo(top.textLeft, 0.5);
                        }
                    });
                });
            });
        });
    });

    describe('with href', () => {
        const getLabelLink = () => getNavSub().find('vl-nav-link#label');
        const getLabelAnchor = () => getLabelLink().shadow().find('vl-button').shadow().find('a');

        it('should not render a link without href', () => {
            mountNavSub();

            getNavSub().find('#label').should('match', 'span');
            getNavSub().find('vl-nav-link').should('not.exist');
        });

        it('should render the label as a link to the href', () => {
            mountNavSub({ href: '#dossier-x' });

            getLabelLink().should('contain.text', 'Sub navigatie').and('have.attr', 'icon', 'paperplane');
            getLabelAnchor().should('have.attr', 'href', '#dossier-x').and('not.have.attr', 'aria-current');
            getNavSub().find('.vl-nav-sub__label').should('not.exist');
        });

        it('should not render the link as a listitem', () => {
            mountNavSub({ href: '#dossier-x' });

            getLabelLink().should('have.attr', 'role', 'none');
        });

        it('should mark the link as the current page when active', () => {
            mountNavSub({ href: '#dossier-x', active: true });

            getLabelAnchor().should('have.attr', 'aria-current', 'page');

            cy.get('vl-nav-sub').then(([navSub]) => navSub.removeAttribute('active'));

            getLabelAnchor().should('not.have.attr', 'aria-current');
        });

        it('should label the list of nav links with the link', () => {
            mountNavSub({ href: '#dossier-x' });

            getNavSub().find('.vl-nav-sub__items').should('have.attr', 'aria-labelledby', 'label');
            getLabelLink().should('not.have.attr', 'aria-hidden');
        });

        it('should keep the link clickable as an icon when collapsed', () => {
            mountNavSub({ href: '#dossier-x', collapsed: true });

            getLabelLink().should('have.attr', 'collapsed');
            getLabelAnchor().should('be.visible').and('have.attr', 'href', '#dossier-x');
        });

        it('should be accessible', () => {
            mountNavSub({ href: '#dossier-x', active: true });

            cy.injectAxe();
            cy.checkA11y('vl-nav-sub');
        });

        it('should be accessible when collapsed', () => {
            mountNavSub({ href: '#dossier-x', collapsed: true });

            cy.injectAxe();
            cy.checkA11y('vl-nav-sub');
        });
    });

    it('should hide the label text when collapsed', () => {
        mountNavSub({ collapsed: true });

        getNavSub().find('.vl-nav-sub__label-text').should('not.be.visible');
        getNavSub().find('#label vl-icon').should('be.visible');
    });

    it('should show the label text when collapsed at the medium breakpoint', () => {
        cy.viewport(1023, 800);
        mountNavSub({ collapsed: true });

        getNavSub().find('.vl-nav-sub__label-text').should('be.visible');
    });

    it('should use the default background token', () => {
        mountNavSub();

        getNavSub().find('.vl-nav-sub').should('have.css', 'background-color', 'rgb(255, 255, 255)');
    });

    it('should apply custom-css', () => {
        mountNavSub({ customCSS: '.vl-nav-sub { padding-block: 10px; }' });

        getNavSub().find('.vl-nav-sub').should('have.css', 'padding-top', '10px');
    });
});
