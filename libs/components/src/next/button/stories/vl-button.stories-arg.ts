import {
    CATEGORIES,
    CONTROLS,
    defaultArgs,
    defaultArgTypes,
    getSelectControlOptions,
    TYPES,
} from '@domg-wc/common-storybook';
// de import is bewust op deze manier om voor de web-types.generator 'binnen' de monorepo geen side-effect te geven
import { ICON_PLACEMENT } from '@domg-wc/common-utilities/constants';
import { action } from '@storybook/addon-actions';
import { ArgTypes } from '@storybook/web-components';
import { buttonDefaults } from '../vl-button.defaults';

type ButtonArgs = typeof defaultArgs &
    typeof buttonDefaults & { defaultSlot: string; onVlClick: () => void; onVlToggle: () => void };

export const buttonArgs: ButtonArgs = {
    ...defaultArgs,
    ...buttonDefaults,
    defaultSlot: '',
    onVlClick: action('vl-click'),
    onVlToggle: action('vl-toggle'),
};

export const buttonArgTypes: ArgTypes<ButtonArgs> = {
    ...defaultArgTypes(true),
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
            defaultValue: { summary: buttonArgs.disabled },
        },
    },
    error: {
        name: 'error',
        description: 'Beeldt de button af als een error button.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: buttonArgs.error },
        },
    },
    block: {
        name: 'block',
        description: 'Duidt aan dat de button de volledige breedte van zijn parent mag innemen.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: buttonArgs.block },
        },
    },
    large: {
        name: 'large',
        description: 'Beeldt de button groot af.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: buttonArgs.large },
        },
    },
    wide: {
        name: 'wide',
        description: 'Beeldt de button breed af.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: buttonArgs.wide },
        },
    },
    narrow: {
        name: 'narrow',
        description: 'Beeldt de button smal af.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: buttonArgs.narrow },
        },
    },
    secondary: {
        name: 'secondary',
        description: 'Beeldt de button af als een secondary button.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: buttonArgs.secondary },
        },
    },
    tertiary: {
        name: 'tertiary',
        description: 'Beeldt de button af als een tertiary button.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: buttonArgs.tertiary },
        },
    },
    ghost: {
        name: 'ghost',
        description: 'Beeldt de button af als een ghost button.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: buttonArgs.ghost },
        },
    },
    loading: {
        name: 'loading',
        description:
            'Beeldt de button af als een loading button.<br/>We raden aan dit enkel te gebruiken voor primary buttons.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: buttonArgs.loading },
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
            defaultValue: { summary: buttonArgs.toggle },
        },
    },
    on: {
        name: 'on',
        description:
            'Duidt aan dat de toggle button aan staat.<br>Te gebruiken in combinatie met het `toggle` attribuut.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: buttonArgs.on },
        },
    },
    controlled: {
        name: 'controlled',
        description:
            'Duidt aan dat de state van de toggle button gecontroleerd wordt door een parent component.<br>De button zal zijn eigen `on` attribuut niet veranderen.<br>Te gebruiken in combinatie met het `toggle` attribuut.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: buttonArgs.controlled },
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
    external: {
        name: 'external',
        description:
            'Opent de link in een nieuw tabblad. Dit attribuut wordt enkel gebruikt als de `cta-link` is ingesteld.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: buttonArgs.external },
        },
    },
    inputGroup: {
        name: 'input-group',
        description: 'Duidt aan dat de component deel is van een input-group.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: buttonArgs.inputGroup },
        },
    },
    label: {
        name: 'label',
        description: 'Stelt het aria-label attribuut van de button in.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: buttonArgs.label },
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
