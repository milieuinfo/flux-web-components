import { CATEGORIES, defaultArgs, defaultArgTypes, TYPES } from '@resources/utils-storybook';
import { ArgTypes } from '@storybook/web-components-vite';
import { action } from 'storybook/actions';
import { dashboardDefaults } from '../vl-dashboard.defaults';

export const dashboardArgs = {
    ...defaultArgs,
    userName: dashboardDefaults.userName,
    userImg: dashboardDefaults.userImg,
    userIcon: dashboardDefaults.userIcon,
    collapsed: dashboardDefaults.collapsed,
    notCollapsible: dashboardDefaults.notCollapsible,
    onVlToggleNavigation: action('vl-toggle-navigation'),
};

export const dashboardArgTypes: ArgTypes = {
    ...defaultArgTypes,
    userName: {
        name: 'user-name',
        description:
            'De naam van de gebruiker, het bedrijf of de entiteit in de header van de navigatie.<br>Staat naast `user-img`; die afbeelding is daarom decoratief en heeft een lege alt-tekst.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: dashboardDefaults.userName },
        },
    },
    userImg: {
        name: 'user-img',
        description:
            'Een afbeelding in de header van de navigatie, bv. een avatar van de gebruiker of een logo van het bedrijf of de entiteit.<br>Heeft voorrang op `user-icon`.',
        table: {
            type: { summary: TYPES.URL },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: dashboardDefaults.userImg },
        },
    },
    userIcon: {
        name: 'user-icon',
        description: 'Een icoon in de header van de navigatie. Wordt enkel getoond als er geen `user-img` is.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: dashboardDefaults.userIcon },
        },
    },
    collapsed: {
        name: 'collapsed',
        description:
            'Of de navigatie ingeklapt is. Wordt gereflecteerd: lees het uit, of zet het om de navigatie zelf in of uit te klappen.<br>Staat het attribuut er bij de start, dan wint het van de toestand in `localStorage`. Een wijziging van buitenaf wordt niet bewaard in `localStorage` en vuurt geen `vl-toggle-navigation` af.<br>Geef `collapsed` zelf door aan de `vl-nav-link` en `vl-nav-sub` componenten. Met `not-collapsible` is `collapsed` altijd `false`.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(dashboardDefaults.collapsed) },
        },
    },
    notCollapsible: {
        name: 'not-collapsible',
        description:
            'Verbergt de knop om de navigatie in te klappen, bv. als de links geen iconen hebben.<br>Een ingeklapte toestand uit `localStorage` wordt dan niet overgenomen.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(dashboardDefaults.notCollapsible) },
        },
    },
    headerSlot: {
        name: 'header',
        description: 'De header van de pagina, gewoonlijk een `vl-header-next`.',
        control: false,
        table: {
            type: { summary: TYPES.HTML },
            category: CATEGORIES.SLOTS,
        },
    },
    navMainSlot: {
        name: 'nav-main',
        description:
            'De hoofdnavigatie, met `vl-nav-link` en `vl-nav-sub` componenten.<br>Gebruik ofwel iconen voor alle links, ofwel geen iconen.',
        control: false,
        table: {
            type: { summary: TYPES.HTML },
            category: CATEGORIES.SLOTS,
        },
    },
    navUtilsSlot: {
        name: 'nav-utils',
        description:
            'De hulpnavigatie, met `vl-nav-link` componenten, bv. voor instellingen of hulp.<br>Wordt enkel getoond als er inhoud is.',
        control: false,
        table: {
            type: { summary: TYPES.HTML },
            category: CATEGORIES.SLOTS,
        },
    },
    contentSlot: {
        name: 'content',
        description:
            'De inhoud van de pagina, met bovenaan één `vl-dashboard-header`. Neemt de volledige ruimte naast de navigatie in, zonder padding of maximale breedte.<br>De `vl-dashboard-header` mag ook dieper staan, bv. in de shadow root van een route-component.',
        control: false,
        table: {
            type: { summary: TYPES.HTML },
            category: CATEGORIES.SLOTS,
        },
    },
    footerSlot: {
        name: 'footer',
        description: 'De footer van de pagina, gewoonlijk een `vl-footer-next`.',
        control: false,
        table: {
            type: { summary: TYPES.HTML },
            category: CATEGORIES.SLOTS,
        },
    },
    onVlToggleNavigation: {
        name: 'vl-toggle-navigation',
        description:
            'Event dat afgevuurd wordt bij het in- of uitklappen van de navigatie, ook bij het herstellen van een ingeklapte navigatie bij het laden.',
        table: {
            type: { summary: '{ collapsed: boolean }' },
            category: CATEGORIES.EVENTS,
        },
    },
};
