// de import is bewust op deze manier om voor de web-types.generator 'binnen' de monorepo geen side-effect te geven
import {
    CATEGORIES,
    CONTROLS,
    defaultArgs,
    defaultArgTypes,
    getSelectControlOptions,
    ICON_PLACEMENT,
    TYPES,
} from '@resources/utils-storybook';
import { ArgTypes } from '@storybook/web-components-vite';
import { action } from 'storybook/actions';
import { buttonDefaults } from '../vl-button.defaults';

type ButtonArgs = typeof defaultArgs &
    typeof buttonDefaults & {
        ariaCurrent: string;
        ariaExpanded: string;
        ariaHaspopup: string;
        defaultSlot: string;
        onVlClick: () => void;
        onVlToggle: () => void;
    };

export const buttonArgs: ButtonArgs = {
    ...defaultArgs,
    ...buttonDefaults,
    ariaCurrent: '',
    ariaExpanded: '',
    ariaHaspopup: '',
    defaultSlot: '',
    onVlClick: action('vl-click'),
    onVlToggle: action('vl-toggle'),
};

export const buttonArgTypes: ArgTypes<ButtonArgs> = {
    ...defaultArgTypes,
    type: {
        name: 'type',
        description: 'Het type van de button.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: buttonArgs.type },
        },
    },
    disabled: {
        name: 'disabled',
        description: 'Duidt aan dat de button uitgeschakeld is.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(buttonArgs.disabled) },
        },
    },
    error: {
        name: 'error',
        description: 'Beeldt de button af als een error button.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(buttonArgs.error) },
        },
    },
    block: {
        name: 'block',
        description: 'Duidt aan dat de button de volledige breedte van zijn parent mag innemen.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(buttonArgs.block) },
        },
    },
    large: {
        name: 'large',
        description: 'Beeldt de button groot af.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(buttonArgs.large) },
        },
    },
    wide: {
        name: 'wide',
        description: 'Beeldt de button breed af.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(buttonArgs.wide) },
        },
    },
    narrow: {
        name: 'narrow',
        description: 'Beeldt de button smal af.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(buttonArgs.narrow) },
        },
    },
    secondary: {
        name: 'secondary',
        description: 'Beeldt de button af als een secondary button.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(buttonArgs.secondary) },
        },
    },
    tertiary: {
        name: 'tertiary',
        description: 'Beeldt de button af als een tertiary button.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(buttonArgs.tertiary) },
        },
    },
    ghost: {
        name: 'ghost',
        description: 'Beeldt de button af als een ghost button.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(buttonArgs.ghost) },
        },
    },
    loading: {
        name: 'loading',
        description:
            'Beeldt de button af als een loading button.<br/>We raden aan dit enkel te gebruiken voor primary buttons.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(buttonArgs.loading) },
        },
    },
    icon: {
        name: 'icon',
        description: 'Beeldt een icoon af in de button.<br/>Standaard wordt dit icoon voor de tekst afgebeeld.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: buttonArgs.icon },
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
            defaultArgs: { summary: buttonArgs.iconPlacement },
            defaultValue: { summary: ICON_PLACEMENT.BEFORE },
        },
    },
    toggle: {
        name: 'toggle',
        description: 'Beeldt de button af als een toggle button.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(buttonArgs.toggle) },
        },
    },
    on: {
        name: 'on',
        description:
            'Duidt aan dat de toggle button aan staat.<br>Te gebruiken in combinatie met het `toggle` attribuut.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(buttonArgs.on) },
        },
    },
    controlled: {
        name: 'controlled',
        description:
            'Duidt aan dat de state van de toggle button gecontroleerd wordt door een parent component.<br>De button zal zijn eigen `on` attribuut niet veranderen.<br>Te gebruiken in combinatie met het `toggle` attribuut.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(buttonArgs.controlled) },
        },
    },
    ctaLink: {
        name: 'cta-link',
        description:
            'Specifieert de cta-link (call to action link), zorgt ervoor dat de component een link (`<a>`) wordt met button-styling.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: buttonArgs.ctaLink },
        },
    },
    download: {
        name: 'download',
        description:
            'Duidt aan dat de cta-link een download is in plaats van een navigatie.<br>Optioneel kan een bestandsnaam als waarde meegegeven worden, zonder waarde kiest de browser de bestandsnaam.<br>Werkt enkel voor same-origin URLs (browser-beperking).<br>Dit attribuut wordt enkel gebruikt als de `cta-link` is ingesteld.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(buttonArgs.download) },
        },
    },
    external: {
        name: 'external',
        description:
            'Opent de link in een nieuw tabblad. Dit attribuut wordt enkel gebruikt als de `cta-link` is ingesteld.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(buttonArgs.external) },
        },
    },
    inputGroup: {
        name: 'input-group',
        description: 'Duidt aan dat de component deel is van een input-group.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(buttonArgs.inputGroup) },
        },
    },
    label: {
        name: 'label',
        description:
            'Stelt het aria-label attribuut van de button in en vervangt zo de volledige voorgelezen tekst. Gebruik het enkel als de zichtbare tekst niet volstaat of als er geen zichtbare tekst is, bv. bij een button met enkel een icoon.<br/>Het label moet de zichtbare tekst bevatten, bij voorkeur vooraan (WCAG 2.5.3 Label in Name). Gebruik je een `cta-link` met `external`, voeg dan de vermelding toe na de zichtbare tekst, bv. "Vlaanderen.be (opent in een nieuw venster)" bij de zichtbare tekst "Vlaanderen.be".',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: buttonArgs.label },
        },
    },
    ariaCurrent: {
        name: 'aria-current',
        description:
            'Wordt doorgegeven aan het onderliggende element en duidt het huidige element binnen een reeks aan, bv. de huidige pagina.',
        control: { type: CONTROLS.SELECT },
        options: ['', 'page', 'step', 'location', 'date', 'time', 'true', 'false'],
        table: {
            type: { summary: getSelectControlOptions(['page', 'step', 'location', 'date', 'time', 'true', 'false']) },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: buttonArgs.ariaCurrent },
        },
    },
    ariaExpanded: {
        name: 'aria-expanded',
        description:
            'Wordt doorgegeven aan de onderliggende button en duidt aan of het element dat de button bedient, open of gesloten is.',
        control: { type: CONTROLS.SELECT },
        options: ['', 'true', 'false'],
        table: {
            type: { summary: getSelectControlOptions(['true', 'false']) },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: buttonArgs.ariaExpanded },
        },
    },
    ariaHaspopup: {
        name: 'aria-haspopup',
        description:
            'Wordt doorgegeven aan het onderliggende element en duidt aan dat de button een popup opent, bv. een menu of dialog.<br>Dit attribuut is niet reactief.',
        control: { type: CONTROLS.SELECT },
        options: ['', 'false', 'true', 'menu', 'listbox', 'tree', 'grid', 'dialog'],
        table: {
            type: { summary: getSelectControlOptions(['false', 'true', 'menu', 'listbox', 'tree', 'grid', 'dialog']) },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: buttonArgs.ariaHaspopup },
        },
    },
    defaultSlot: {
        name: '[default]',
        description: 'De content van de button.',
        table: {
            type: { summary: TYPES.HTML },
            category: CATEGORIES.SLOTS,
            defaultValue: { summary: buttonArgs.defaultSlot },
        },
    },
    onVlClick: {
        name: 'vl-click',
        description: 'Event dat afgevuurd wordt bij het klikken op de button.',
        table: {
            category: CATEGORIES.EVENTS,
        },
    },
    onVlToggle: {
        name: 'vl-toggle',
        description: 'Event dat afgevuurd wordt als het `on` attribuut van de button verandert.',
        table: {
            type: { summary: '{ on: boolean }' },
            category: CATEGORIES.EVENTS,
        },
    },
};
