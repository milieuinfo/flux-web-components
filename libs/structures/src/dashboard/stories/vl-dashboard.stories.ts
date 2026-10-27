import { registerWebComponents } from '@domg-wc/common';
import { VlButtonComponent, VlTitleComponent } from '@domg-wc/components/atom';
import { VlBreadcrumbComponent, VlBreadcrumbItemComponent, VlTableComponent } from '@domg-wc/components/block';
import { VlFooter, VlHeader } from '@domg-wc/components/compliance/next';
import { VlInputFieldComponent } from '@domg-wc/components/form';
import { story } from '@resources/utils-storybook';
import { Meta } from '@storybook/web-components-vite';
import { html, nothing, render } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { ref } from 'lit/directives/ref.js';
import { VlDashboardHeader } from '../vl-dashboard-header.component';
import { VlDashboard, VlToggleNavigationEventDetail } from '../vl-dashboard.component';
import { VlNavLink } from '../vl-nav-link.component';
import { VlNavSub } from '../vl-nav-sub.component';
import { dashboardArgs, dashboardArgTypes } from './vl-dashboard.stories-arg';
import dashboardDoc from './vl-dashboard.stories-doc.mdx';

registerWebComponents([
    VlDashboard,
    VlDashboardHeader,
    VlNavLink,
    VlNavSub,
    VlButtonComponent,
    VlTitleComponent,
    VlTableComponent,
    VlBreadcrumbComponent,
    VlBreadcrumbItemComponent,
    VlInputFieldComponent,
    VlHeader,
    VlFooter,
]);

export default {
    id: 'structures-dashboard',
    title: 'Structures/dashboard/dashboard',
    tags: ['autodocs'],
    args: dashboardArgs,
    argTypes: dashboardArgTypes,
    parameters: {
        docs: {
            page: dashboardDoc,
            story: {
                inline: false,
                iframeHeight: 800,
            },
        },
        layout: 'fullscreen',
    },
} as Meta<typeof dashboardArgs>;

type HeaderActions = 'none' | 'one' | 'multiple';

// een pagina zoals een route ze zou renderen: haar header en haar inhoud
type Page = { href: string; title: string; icon?: string; subtitle?: string; headerActions: HeaderActions };

type DashboardStoryOptions = {
    // zonder page geen vl-dashboard-header, enkel inhoud
    page?: Page;
    icons?: boolean;
    interactive?: boolean;
};

// de acties in de header verschillen per pagina, zoals in een echte applicatie
const headerActionsPerPage: Record<string, HeaderActions> = {
    '#items': 'one',
    '#dossiers': 'multiple',
    '#lopend': 'multiple',
    '#afgesloten': 'multiple',
};

// de stijl van de inhoud van de pagina's, zie het recept "Breedte en padding van de inhoud" in de documentatie
const contentStyles = html`
    <style>
        .dashboard-content {
            box-sizing: border-box;
            max-width: 128rem;
            padding-block: var(--vl-spacing--medium);
            padding-inline: var(--vl-dashboard-content-inline-padding);
        }

        .dashboard-content--full-width {
            max-width: none;
        }

        .dashboard-items-table :is(th, td) {
            white-space: nowrap;
        }
    </style>
`;

// een tabel met veel kolommen en rijen; vl-table scrolt zelf horizontaal als ze breder is dan de pagina
const itemsTable = () => {
    const statuses = ['In behandeling', 'Goedgekeurd', 'Afgewezen', 'Nieuw'];
    const departments = ['Omgeving', 'Mobiliteit', 'Onderwijs', 'Welzijn', 'Cultuur'];
    const rows = Array.from({ length: 30 }, (_, index) => index + 1);
    return html`
        <vl-table hover class="dashboard-items-table">
            <table>
                <caption>
                    Alle items van het bedrijf
                </caption>
                <thead>
                    <tr>
                        ${[
                            'Nummer',
                            'Naam',
                            'Type',
                            'Status',
                            'Eigenaar',
                            'Afdeling',
                            'Locatie',
                            'Aangemaakt op',
                            'Gewijzigd op',
                            'Vervaldatum',
                            'Prioriteit',
                            'Opmerking',
                        ].map((column) => html`<th scope="col">${column}</th>`)}
                    </tr>
                </thead>
                <tbody>
                    ${rows.map(
                        (row) => html`
                            <tr>
                                <td>ITEM-${String(row).padStart(4, '0')}</td>
                                <td>Aanvraag omgevingsvergunning ${row}</td>
                                <td>${row % 2 ? 'Vergunning' : 'Melding'}</td>
                                <td>${statuses[row % statuses.length]}</td>
                                <td>Behandelaar ${(row % 7) + 1}</td>
                                <td>${departments[row % departments.length]}</td>
                                <td>Gent, Koningin Maria Hendrikaplein ${row}</td>
                                <td>${String((row % 28) + 1).padStart(2, '0')}.09.2026</td>
                                <td>${String((row % 28) + 1).padStart(2, '0')}.10.2026</td>
                                <td>${String((row % 28) + 1).padStart(2, '0')}.12.2026</td>
                                <td>${['Hoog', 'Normaal', 'Laag'][row % 3]}</td>
                                <td>Wacht op advies van de gemeente</td>
                            </tr>
                        `,
                    )}
                </tbody>
            </table>
        </vl-table>
    `;
};

// lange tekst om de sticky header en de maximale breedte van tekst te tonen
const helpText = () => {
    const questions = [
        'Hoe vraag ik een nieuw item aan?',
        'Wie behandelt mijn dossier?',
        'Hoe lang duurt de behandeling van een aanvraag?',
        'Kan ik een ingediende aanvraag nog wijzigen?',
        'Hoe word ik op de hoogte gebracht van een beslissing?',
        'Wat doe ik als ik het niet eens ben met een beslissing?',
    ];
    return html`
        <p>Antwoorden op de vragen die gebruikers het vaakst stellen over deze applicatie.</p>
        <div class="vl-stacked vl-stacked-medium">
            ${questions.map(
                (question) => html`
                    <div class="vl-stacked vl-stacked-small">
                        <vl-title type="h3" no-space-bottom>${question}</vl-title>
                        <p>
                            Je vindt het antwoord meestal in het overzicht van je dossiers. Open het dossier en kijk bij
                            de tijdlijn: daar staat elke stap van de behandeling, met de datum en de behandelaar.
                            Ontbreekt er informatie, dan vraagt de behandelaar die via een melding op, en zie je een
                            rode stip bij Notificaties.
                        </p>
                        <p>
                            Lukt het niet, neem dan contact op met de helpdesk via het contactformulier. Vermeld het
                            nummer van je dossier, zodat de helpdesk het meteen terugvindt. De helpdesk antwoordt binnen
                            twee werkdagen.
                        </p>
                    </div>
                `,
            )}
        </div>
    `;
};

// de inhoud van elke pagina begint met een h2; de h1 komt uit de vl-dashboard-header
type PageContent = {
    heading: string;
    text?: string;
    body?: () => unknown;
    // tabellen en kaarten gebruiken de volle breedte, tekst een maximale breedte van 1280px
    fullWidth?: boolean;
    // een pagina dieper in de navigatie toont haar pad
    breadcrumb?: boolean;
};

// het pad naar een taak van Dossier X; het laatste item is de huidige pagina, zonder href (zie vl-breadcrumb)
const breadcrumbTemplate = (currentPage: string) => html`
    <vl-breadcrumb data-cy="dashboard-breadcrumb">
        <vl-breadcrumb-item href="#dossiers">Dossiers</vl-breadcrumb-item>
        <vl-breadcrumb-item href="#dossier-x">Dossier X</vl-breadcrumb-item>
        <vl-breadcrumb-item>${currentPage}</vl-breadcrumb-item>
    </vl-breadcrumb>
`;

const contentPerPage: Record<string, PageContent> = {
    '#overzicht': { heading: 'Recente items', text: 'De items die je de voorbije week bekeek of wijzigde.' },
    '#items': {
        heading: 'Alle items',
        text: 'Alle items van het bedrijf, met hun status en de datum van de laatste wijziging.',
        body: itemsTable,
        fullWidth: true,
    },
    '#notificaties': {
        heading: 'Ongelezen meldingen',
        text: 'Je hebt 1 ongelezen melding: een dossier wacht op je beslissing.',
    },
    '#dossiers': { heading: 'Mijn dossiers', text: 'De dossiers waarvan jij de behandelaar bent.' },
    '#dossier-x': {
        heading: 'Samenvatting',
        text: 'Aanvraag omgevingsvergunning voor de verbouwing van een woning in Gent, in behandeling sinds 12.09.2026. Er lopen nog 2 taken, 5 taken zijn afgerond.',
    },
    '#lopend': {
        heading: 'Taken in behandeling',
        text: 'De taken van Dossier X die nog niet afgerond zijn.',
        breadcrumb: true,
    },
    '#afgesloten': {
        heading: 'Afgeronde taken',
        text: 'De taken van Dossier X die afgerond zijn, de recentste eerst.',
        breadcrumb: true,
    },
    '#instellingen': {
        heading: 'Profiel',
        text: 'Je naam, je e-mailadres en de meldingen die je per e-mail wilt ontvangen.',
    },
    '#help': {
        heading: 'Veelgestelde vragen',
        body: helpText,
    },
};

const overviewPage: Page = {
    href: '#overzicht',
    title: 'Overzicht',
    icon: 'places-home',
    subtitle: 'Subtitel',
    headerActions: 'none',
};

const headerActionsTemplate = (headerActions: HeaderActions) => {
    switch (headerActions) {
        case 'one':
            return html`<vl-button slot="header-actions" icon="add">Nieuw item</vl-button>`;
        case 'multiple':
            return html`
                <div slot="header-actions" class="vl-group vl-group--input-group">
                    <vl-input-field
                        name="search"
                        id="search"
                        label="Zoek op deze pagina"
                        input-group
                        autocomplete="off"
                    ></vl-input-field>
                    <vl-button tertiary label="Zoeken" icon="search" input-group></vl-button>
                </div>
                <vl-button slot="header-actions" icon="add" secondary>Nieuw item</vl-button>
                <vl-button slot="header-actions" icon="file-download" label="Exporteren" tertiary></vl-button>
            `;
        default:
            return nothing;
    }
};

const pageTemplate = (page?: Page) => {
    const content = contentPerPage[page?.href ?? '#overzicht'];
    return html`
        ${page
            ? html`<vl-dashboard-header
                  page-title=${page.title}
                  page-icon=${ifDefined(page.icon)}
                  page-subtitle=${ifDefined(page.subtitle)}
                  >${headerActionsTemplate(page.headerActions)}</vl-dashboard-header
              >`
            : nothing}
        <div
            class=${classMap({
                'dashboard-content': true,
                'dashboard-content--full-width': !!content.fullWidth,
                'vl-stacked': true,
                'vl-stacked-small': true,
            })}
            data-cy="dashboard-content"
        >
            ${content.breadcrumb && page ? breadcrumbTemplate(page.title) : nothing}
            <vl-title type="h2" no-space-bottom>${content.heading}</vl-title>
            ${content.text ? html`<p data-cy="dashboard-content-text">${content.text}</p>` : nothing}
            ${content.body ? content.body() : nothing}
        </div>
    `;
};

// geeft de collapsed-staat van het dashboard door aan de nav-links en nav-subs in de navigatie
const passCollapsedToNavigation = (event: CustomEvent<VlToggleNavigationEventDetail>) => {
    (event.currentTarget as VlDashboard)
        .querySelectorAll(':scope > vl-nav-link, :scope > vl-nav-sub')
        .forEach((element) => element.toggleAttribute('collapsed', event.detail.collapsed));
};

// tekst van de link zelf, zonder die van een badge of actie in de slots
const linkText = (link: VlNavLink) =>
    [...link.childNodes]
        .filter((node) => node.nodeType === Node.TEXT_NODE)
        .map((node) => node.textContent)
        .join('')
        .trim();

// de nav-link met die href, ook die van een vl-nav-sub met href (in zijn shadow root)
const navLinkWithHref = (dashboard: VlDashboard, href: string) =>
    dashboard.querySelector<VlNavLink>(`vl-nav-link[href="${href}"]`) ??
    dashboard
        .querySelector<VlNavSub>(`vl-nav-sub[href="${href}"]`)
        ?.shadowRoot?.querySelector<VlNavLink>('vl-nav-link') ??
    null;

// doet wat een router zou doen: de actieve link verplaatsen en de pagina van de link in de outlet renderen;
// een link in de breadcrumb gaat naar de pagina van de nav-link met dezelfde href
const navigate = (event: MouseEvent) => {
    const path = event.composedPath();
    if (path.some((target) => target instanceof Element && target.slot === 'link-action')) return;
    const dashboard = event.currentTarget as VlDashboard;
    const breadcrumbHref = path
        .find((target): target is Element => target instanceof Element && target.localName === 'vl-breadcrumb-item')
        ?.getAttribute('href');
    const link =
        path.find((target): target is VlNavLink => target instanceof VlNavLink) ??
        (breadcrumbHref ? navLinkWithHref(dashboard, breadcrumbHref) : null);
    if (!link) return;
    event.preventDefault();

    const href = link.href ?? '';
    dashboard.querySelectorAll('vl-nav-link').forEach((navLink) => {
        navLink.active = navLink === link;
    });
    dashboard.querySelectorAll('vl-nav-sub').forEach((navSub) => {
        navSub.active = !!navSub.href && navSub.href === href;
    });
    const page: Page =
        href === '#overzicht'
            ? overviewPage
            : { href, title: linkText(link), icon: link.icon, headerActions: headerActionsPerPage[href] ?? 'none' };
    render(pageTemplate(page), dashboard.querySelector<HTMLElement>(':scope > [slot="content"]')!);
};

const icon = (name: string, icons: boolean) => (icons ? name : nothing);

const renderDashboard = (
    { userName, userImg, userIcon, collapsed, notCollapsible, customCSS, onVlToggleNavigation }: typeof dashboardArgs,
    { page, icons = true, interactive = false }: DashboardStoryOptions = {},
) => html`
    ${contentStyles}
    <vl-dashboard
        user-name=${userName}
        user-img=${userImg}
        user-icon=${userIcon}
        ?collapsed=${collapsed}
        ?not-collapsible=${notCollapsible}
        custom-css=${customCSS}
        @vl-toggle-navigation=${(event: CustomEvent<VlToggleNavigationEventDetail>) => {
            passCollapsedToNavigation(event);
            onVlToggleNavigation(event);
        }}
        @click=${interactive ? navigate : nothing}
    >
        <vl-header-next
            slot="header"
            identifier="59188ff6-662b-45b9-b23a-964ad48c2bfb"
            skip-to-content-id="vl-dashboard-page-title"
            development
            simple
        ></vl-header-next>

        <vl-nav-link slot="nav-main" href="#overzicht" icon=${icon('places-home', icons)} ?collapsed=${collapsed} active
            >Overzicht</vl-nav-link
        >
        <vl-nav-link slot="nav-main" href="#items" icon=${icon('list', icons)} ?collapsed=${collapsed}>
            Beheer items
            <vl-button slot="link-action" icon="plus-circle-filled" label="Item toevoegen" ghost></vl-button>
        </vl-nav-link>
        <vl-nav-link slot="nav-main" href="#notificaties" icon=${icon('bell', icons)} ?collapsed=${collapsed}>
            Notificaties
            <span slot="link-badge">1</span>
        </vl-nav-link>
        <vl-nav-link slot="nav-main" href="#dossiers" icon=${icon('folder', icons)} ?collapsed=${collapsed}
            >Dossiers</vl-nav-link
        >
        <vl-nav-sub
            slot="nav-main"
            label="Dossier X"
            href="#dossier-x"
            icon=${icon('file', icons)}
            ?collapsed=${collapsed}
        >
            <vl-nav-link href="#lopend" icon=${icon('hourglass', icons)}>Lopende taken</vl-nav-link>
            <vl-nav-link href="#afgesloten" icon=${icon('file-tasks-check', icons)}>Afgesloten taken</vl-nav-link>
        </vl-nav-sub>

        <vl-nav-link slot="nav-utils" href="#instellingen" icon=${icon('cog', icons)} ?collapsed=${collapsed}
            >Instellingen</vl-nav-link
        >
        <vl-nav-link slot="nav-utils" href="#help" icon=${icon('question-mark-filled', icons)} ?collapsed=${collapsed}
            >Help</vl-nav-link
        >

        <!-- de outlet van de router: één pagina met haar vl-dashboard-header -->
        <div slot="content" ${ref((outlet) => outlet && render(pageTemplate(page), outlet as HTMLElement))}></div>

        <vl-footer-next slot="footer" identifier="0337f8dc-3266-4e7a-8f4a-95fd65189e5b" development></vl-footer-next>
    </vl-dashboard>
`;

const defaultStoryArgs = {
    userName: 'Bedrijfsnaam',
    userIcon: 'building-big',
};

// een klik op een link verplaatst active en toont de pagina van die link, met haar eigen vl-dashboard-header
export const DashboardDefault = story(dashboardArgs, (args) =>
    renderDashboard(args, { page: overviewPage, interactive: true }),
);
DashboardDefault.storyName = 'vl-dashboard - default';
DashboardDefault.args = defaultStoryArgs;

export const DashboardWithoutUserAndTitle = story(dashboardArgs, (args) => renderDashboard(args));
DashboardWithoutUserAndTitle.storyName = 'vl-dashboard - zonder gebruiker en titel';

export const DashboardCollapsed = story(dashboardArgs, (args) => renderDashboard(args, { page: overviewPage }));
DashboardCollapsed.storyName = 'vl-dashboard - collapsed';
DashboardCollapsed.args = {
    ...defaultStoryArgs,
    collapsed: true,
};

export const DashboardNotCollapsible = story(dashboardArgs, (args) =>
    renderDashboard(args, { page: overviewPage, icons: false }),
);
DashboardNotCollapsible.storyName = 'vl-dashboard - not-collapsible';
DashboardNotCollapsible.args = {
    userName: 'Bedrijfsnaam',
    notCollapsible: true,
};
