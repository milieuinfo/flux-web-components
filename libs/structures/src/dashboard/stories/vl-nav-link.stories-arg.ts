import { CATEGORIES, defaultArgs, defaultArgTypes, TYPES } from '@resources/utils-storybook';
import { ArgTypes } from '@storybook/web-components-vite';
import { navLinkDefaults } from '../vl-nav-link.defaults';

export const navLinkArgs = {
    ...defaultArgs,
    ...navLinkDefaults,
    defaultSlot: '',
    linkActionSlot: '',
    linkBadgeSlot: '',
};

export const navLinkArgTypes: ArgTypes = {
    ...defaultArgTypes,
    active: {
        name: 'active',
        description: 'Duidt de link van de huidige pagina aan. Zet `aria-current="page"`.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(navLinkDefaults.active) },
        },
    },
    collapsed: {
        name: 'collapsed',
        description:
            'Toont enkel het icoon, voor een ingeklapte navigatie van `vl-dashboard`.<br>Verbergt ook de `link-action`.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(navLinkDefaults.collapsed) },
        },
    },
    disabled: {
        name: 'disabled',
        description: 'Schakelt de link uit.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(navLinkDefaults.disabled) },
        },
    },
    external: {
        name: 'external',
        description: 'Opent de link in een nieuw tabblad en toont het icoon voor een externe link.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(navLinkDefaults.external) },
        },
    },
    href: {
        name: 'href',
        description: 'De url van de link. Aangeraden voor navigatie; zonder `href` is het een knop.',
        table: {
            type: { summary: TYPES.URL },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: navLinkDefaults.href },
        },
    },
    icon: {
        name: 'icon',
        description:
            'Het icoon van de link. Gebruik in een navigatie ofwel iconen voor alle links, ofwel geen iconen.<br>Zonder icoon heeft een ingeklapte link geen zichtbare inhoud.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: navLinkDefaults.icon },
        },
    },
    defaultSlot: {
        name: '[default]',
        description: 'De tekst van de link.',
        table: {
            type: { summary: TYPES.HTML },
            category: CATEGORIES.SLOTS,
        },
    },
    linkActionSlot: {
        name: 'link-action',
        description:
            'Een icon-only actieknop naast de link, bv. `<vl-button slot="link-action" icon="plus-circle-filled" label="Item toevoegen" ghost></vl-button>`.',
        table: {
            type: { summary: TYPES.HTML },
            category: CATEGORIES.SLOTS,
        },
    },
    linkBadgeSlot: {
        name: 'link-badge',
        description:
            'Een badge bij de link, bv. een aantal meldingen: `<span slot="link-badge">3</span>`. De tekst wordt toegevoegd aan de toegankelijke naam van de link.<br>`vl-dashboard` toont op mobiel een stip op de menuknop zolang een link een badge heeft.',
        table: {
            type: { summary: TYPES.HTML },
            category: CATEGORIES.SLOTS,
        },
    },
};
