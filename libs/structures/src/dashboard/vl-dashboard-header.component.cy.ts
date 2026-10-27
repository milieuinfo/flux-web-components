import { registerWebComponents } from '@domg-wc/common';
import { VlButtonComponent } from '@domg-wc/components/atom';
import { html, nothing } from 'lit';
import { VlDashboardHeader } from './vl-dashboard-header.component';

registerWebComponents([VlDashboardHeader, VlButtonComponent]);

type MountOptions = {
    pageTitle?: string | null;
    pageSubtitle?: string;
    pageIcon?: string;
    actions?: boolean;
    style?: string;
    customCSS?: string;
};

const mountHeader = ({
    pageTitle = 'Overzicht',
    pageSubtitle,
    pageIcon,
    actions = false,
    style,
    customCSS,
}: MountOptions = {}) => {
    cy.mount(html`
        <vl-dashboard-header
            page-title=${pageTitle ?? nothing}
            page-subtitle=${pageSubtitle ?? nothing}
            page-icon=${pageIcon ?? nothing}
            style=${style ?? nothing}
            custom-css=${customCSS ?? nothing}
        >
            ${actions
                ? html`<vl-button slot="header-actions" icon="add" data-cy="header-action">Nieuw item</vl-button>`
                : nothing}
        </vl-dashboard-header>
    `);
    getHeader().find('.vl-dashboard-header');
};

const getHeader = () => cy.get('vl-dashboard-header').shadow();

describe('cypress-component - structures - vl-dashboard-header', () => {
    it('should mount', () => {
        mountHeader();
    });

    it('should be accessible', () => {
        mountHeader({ pageIcon: 'places-home', pageSubtitle: 'Subtitel', actions: true });

        cy.injectAxe();
        cy.checkA11y('vl-dashboard-header');
    });

    it('should render exactly one h1 with the page title', () => {
        mountHeader({ pageTitle: 'Overzicht' });

        getHeader().find('vl-title[type="h1"]').should('have.length', 1).and('have.text', 'Overzicht');
        getHeader().find('vl-title').shadow().find('h1').should('have.length', 1);
    });

    it('should hyphenate and break long words in the page title', () => {
        mountHeader({ pageTitle: 'Omgevingsvergunningsaanvraagdossier' });

        getHeader()
            .find('vl-title')
            .shadow()
            .find('h1')
            .should('have.css', 'hyphens', 'auto')
            .and('have.css', 'word-break', 'break-word');
    });

    it('should give the h1 the fixed id vl-dashboard-page-title and make it focusable', () => {
        mountHeader();

        getHeader()
            .find('vl-title#vl-dashboard-page-title')
            .should('have.attr', 'tabindex', '-1')
            .then(([title]) => {
                (title as HTMLElement).focus();
                expect((title.getRootNode() as ShadowRoot).activeElement).to.equal(title);
            });
    });

    it('should render the page icon and the page subtitle', () => {
        mountHeader({ pageIcon: 'places-home', pageSubtitle: 'Subtitel' });

        getHeader().find('.vl-dashboard-header__title vl-icon[large]').should('have.attr', 'icon', 'places-home');
        getHeader().find('.vl-dashboard-header__title vl-text[annotation]').should('have.text', 'Subtitel');
    });

    it('should not render title, icon and subtitle when they are not set', () => {
        mountHeader({ pageTitle: null });

        getHeader().find('vl-title').should('not.exist');
        getHeader().find('vl-icon').should('not.exist');
        getHeader().find('vl-text').should('not.exist');
    });

    it('should render the header-actions slot and mark the header as having actions', () => {
        mountHeader({ actions: true });

        getHeader().find('.vl-dashboard-header__actions slot[name="header-actions"]');
        cy.get('[data-cy="header-action"]').should('be.visible');
        getHeader().find('.vl-dashboard-header').should('have.class', 'vl-dashboard-header--has-actions');
    });

    it('should not mark the header as having actions without header-actions', () => {
        mountHeader();

        getHeader().find('.vl-dashboard-header').should('not.have.class', 'vl-dashboard-header--has-actions');
    });

    it('should use --vl-dashboard-title-min-width as the minimum width of the title', () => {
        mountHeader({ style: '--vl-dashboard-title-min-width: 20rem' });

        getHeader().find('.vl-dashboard-header__title').should('have.css', 'flex-basis', '200px');
    });

    it('should keep a title min width that is set on the host when the page title changes', () => {
        mountHeader({ pageTitle: null, style: '--vl-dashboard-title-min-width: 20rem' });
        getHeader().find('.vl-dashboard-header__title').should('have.css', 'flex-basis', '0px');

        cy.get('vl-dashboard-header').invoke('attr', 'page-title', 'Overzicht');

        getHeader().find('.vl-dashboard-header__title').should('have.css', 'flex-basis', '200px');
        cy.get('vl-dashboard-header')
            .invoke('attr', 'style')
            .should('contain', '--vl-dashboard-title-min-width: 20rem');
    });

    it('should stick to the top of its scroll container', () => {
        mountHeader();

        cy.get('vl-dashboard-header').should('have.css', 'position', 'sticky').and('have.css', 'top', '0px');
    });

    it('should apply custom-css', () => {
        mountHeader({ customCSS: '.vl-dashboard-header { padding-top: 10px; }' });

        getHeader().find('.vl-dashboard-header').should('have.css', 'padding-top', '10px');
    });
});
