import { CATEGORIES, defaultArgs, defaultArgTypes, TYPES } from '@resources/utils-storybook';
import { ArgTypes } from '@storybook/web-components-vite';
import { iconDefaults } from '../vl-icon.defaults';

type IconArgs = typeof defaultArgs & typeof iconDefaults;

export const iconArgs: IconArgs = {
    ...defaultArgs,
    ...iconDefaults,
};

export const iconArgTypes: ArgTypes<IconArgs> = {
    ...defaultArgTypes,
    icon: {
        name: 'icon',
        description: 'Het icoon dat moet afgebeeld worden.',
        type: { name: TYPES.STRING, required: true },
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: iconArgs.icon },
        },
    },
    label: {
        name: 'label',
        description: "Een beschrijvende tekst voor het icoon, wordt gebruikt door screenreaders." +
            " <br><br><strong>Opgelet</strong>: indien \`label\` niet meegegeven wordt, wordt het icoon als" +
            " 'decoratief' beschouwd en zal het genegeerd worden door screenreaders, door middel van \`aria-hidden\`.",
        type: { name: TYPES.STRING, required: false },
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: iconArgs.label },
        },
    },
    small: {
        name: 'small',
        description: 'Beeldt het icoon klein af.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(iconArgs.small) },
        },
    },
    large: {
        name: 'large',
        description: 'Beeldt het icoon groot af.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(iconArgs.large) },
        },
    },
    light: {
        name: 'light',
        description: 'Beeldt het icoon licht af.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(iconArgs.light) },
        },
    },
    rightMargin: {
        name: 'right-margin',
        description: 'Voegt een right-margin toe aan het icoon.<br/>Te gebruiken als het icoon voor een tekst staat.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(iconArgs.rightMargin) },
        },
    },
    leftMargin: {
        name: 'left-margin',
        description: 'Voegt een left-margin toe aan het icoon.<br/>Te gebruiken als het icoon na een tekst staat.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(iconArgs.leftMargin) },
        },
    },
    clickable: {
        name: 'clickable',
        description: "**Deprecated**: De \`clickable\` property is deprecated wegens niet WCAG-compliant. Gebruik" +
            " in de plaats een \`vl-button\` of \`vl-link\` met een icon.",
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(iconArgs.clickable) },
        },
    },
};
