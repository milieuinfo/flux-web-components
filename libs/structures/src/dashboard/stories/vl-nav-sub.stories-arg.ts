import { CATEGORIES, defaultArgs, defaultArgTypes, TYPES } from '@resources/utils-storybook';
import { ArgTypes } from '@storybook/web-components-vite';
import { navSubDefaults } from '../vl-nav-sub.defaults';

export const navSubArgs = {
    ...defaultArgs,
    ...navSubDefaults,
    defaultSlot: '',
};

export const navSubArgTypes: ArgTypes = {
    ...defaultArgTypes,
    active: {
        name: 'active',
        description:
            'Duidt de pagina van de groep aan als huidige pagina, met `aria-current="page"` op de link. Enkel zinvol met `href`.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(navSubDefaults.active) },
        },
    },
    collapsed: {
        name: 'collapsed',
        description:
            'Verbergt de tekst van het label, voor een ingeklapte navigatie van `vl-dashboard`.<br>Geeft `collapsed` door aan de `vl-nav-link` componenten in het slot.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(navSubDefaults.collapsed) },
        },
    },
    href: {
        name: 'href',
        description:
            'Maakt van het label een link naar een pagina van de groep, bv. een overzicht van het dossier. De link heeft de stijl van een `vl-nav-link`. Zonder `href` is het label gewone tekst.',
        table: {
            type: { summary: TYPES.URL },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: navSubDefaults.href },
        },
    },
    icon: {
        name: 'icon',
        description: 'Het icoon naast het label.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: navSubDefaults.icon },
        },
    },
    label: {
        name: 'label',
        description:
            'Het label van de groep. Is ook de toegankelijke naam van de lijst met links, ook als het label ingeklapt verborgen is.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: navSubDefaults.label },
        },
    },
    defaultSlot: {
        name: '[default]',
        description: 'De `vl-nav-link` componenten van de groep.',
        table: {
            type: { summary: TYPES.HTML },
            category: CATEGORIES.SLOTS,
        },
    },
};
