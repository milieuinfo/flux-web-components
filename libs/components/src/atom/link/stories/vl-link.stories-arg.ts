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
import { ArgTypes } from '@storybook/web-components-vite';
import { linkDefaults } from '../vl-link.defaults';
import { action } from 'storybook/actions';

type LinkArgs = typeof defaultArgs & typeof linkDefaults & { defaultSlot: string; onVlClick: () => void; };

export const linkArgs: LinkArgs = {
    ...defaultArgs,
    ...linkDefaults,
    defaultSlot: '',
    onVlClick: action('vl-click'),
};

export const linkArgTypes: ArgTypes<LinkArgs> = {
    ...defaultArgTypes,
    href: {
        name: 'href',
        description: 'De url waar de link naar verwijst.<br/>Werkt niet in combinatie met `button-as-link`-attribuut.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: linkArgs.href },
        },
    },
    label: {
        name: 'label',
        description:
            'Vult het aria-label attribuut van de link in. Geef een duidelijke omschrijving mee van waar de link naartoe leidt. bv "Ga naar Vlaanderen.be (opent in een nieuw venster)',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: linkArgs.label },
        },
    },
    bold: {
        name: 'bold',
        description: 'Beeldt de tekst van de link vet af.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(linkArgs.bold) },
        },
    },
    small: {
        name: 'small',
        description: 'Beeldt de tekst van de link klein af.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(linkArgs.small) },
        },
    },
    large: {
        name: 'large',
        description: 'Beeldt de tekst van de link groot af.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(linkArgs.large) },
        },
    },
    error: {
        name: 'error',
        description: 'Beeldt de link af in een error state.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(linkArgs.error) },
        },
    },
    download: {
        name: 'download',
        description:
            'Duidt aan dat de link een download is in plaats van een navigatie.<br>Optioneel kan een bestandsnaam als waarde meegegeven worden, zonder waarde kiest de browser de bestandsnaam.<br>Werkt enkel voor same-origin URLs (browser-beperking).<br>Werkt niet in combinatie met `button-as-link`-attribuut.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(linkArgs.download) },
        },
    },
    external: {
        name: 'external',
        description: 'Opent de link in een nieuw tabblad.<br/>Werkt niet in combinatie met `button-as-link`-attribuut.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(linkArgs.external) },
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
            defaultValue: { summary: String(linkArgs.buttonAsLink) },
        },
    },
    type: {
        name: 'type',
        description: 'Het type van de button.<br/>Werkt enkel in combinatie met het `button-as-link`-attribuut.',
        control: { type: CONTROLS.SELECT },
        options: ['button', 'submit', 'reset'],
        table: {
            type: { summary: `${TYPES.STRING}: 'button' | 'submit' | 'reset'` },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: linkArgs.type },
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
    onVlClick: {
        name: 'vl-click',
        description: 'Event dat afgevuurd wordt bij het klikken op de link.',
        table: {
            category: CATEGORIES.EVENTS,
        },
    },
};
