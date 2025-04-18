import {
    CATEGORIES,
    CONTROLS,
    defaultArgs,
    defaultArgTypes,
    getSelectControlOptions,
    TYPES,
} from '@resources/utils-storybook';
// de import is bewust op deze manier om voor de web-types.generator 'binnen' de monorepo geen side-effect te geven
import { ICON_PLACEMENT } from '@resources/utils-storybook';
import { ArgTypes } from '@storybook/web-components';
import { linkDefaults } from '../vl-link.defaults';

type LinkArgs = typeof defaultArgs & typeof linkDefaults & { defaultSlot: string };

export const linkArgs: LinkArgs = {
    ...defaultArgs,
    ...linkDefaults,
    defaultSlot: '',
};

export const linkArgTypes: ArgTypes<LinkArgs> = {
    ...defaultArgTypes(true),
    href: {
        name: 'href',
        description: 'De url waar de link naar verwijst.<br/>Werkt niet in combinatie met `button-as-link`-attribuut.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: linkArgs.href },
        },
    },
    bold: {
        name: 'bold',
        description: 'Beeldt de tekst van de link vet af.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: linkArgs.bold },
        },
    },
    small: {
        name: 'small',
        description: 'Beeldt de tekst van de link klein af.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: linkArgs.small },
        },
    },
    large: {
        name: 'large',
        description: 'Beeldt de tekst van de link groot af.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: linkArgs.large },
        },
    },
    error: {
        name: 'error',
        description: 'Beeldt de link af in een error state.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: linkArgs.error },
        },
    },
    external: {
        name: 'external',
        description: 'Opent de link in een nieuw tabblad.<br/>Werkt niet in combinatie met `button-as-link`-attribuut.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: linkArgs.external },
        },
    },
    icon: {
        name: 'icon',
        description: 'Beeldt een icoon af in de link.<br/>Standaard wordt dit icoon voor de tekst afgebeeld.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: linkArgs.icon },
        },
    },
    iconPlacement: {
        name: 'icon-placement',
        description:
            'De positie van het icoon ten opzichte van de tekst.<br>Voegt margin toe tussen het icoon en de tekst.',
        control: { type: CONTROLS.SELECT },
        options: ['', ...Object.values(ICON_PLACEMENT)],
        table: {
            type: { summary: getSelectControlOptions(Object.values(ICON_PLACEMENT)) },
            category: CATEGORIES.ATTRIBUTES,
            defaultArgs: { summary: linkArgs.iconPlacement },
        },
    },
    buttonAsLink: {
        name: 'button-as-link',
        description: 'Maakt van de link een button maar behoudt de link-stijl.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: linkArgs.buttonAsLink },
        },
    },
    defaultSlot: {
        name: '[default]',
        description: 'De content van de link.',
        table: {
            type: { summary: TYPES.HTML },
            category: CATEGORIES.SLOTS,
            defaultValue: { summary: linkArgs.defaultSlot },
        },
    },
};
