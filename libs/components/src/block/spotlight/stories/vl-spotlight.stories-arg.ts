import {
    CATEGORIES,
    CONTROLS,
    defaultArgs,
    defaultArgTypes,
    getSelectControlOptions,
    TYPES,
} from '@resources/utils-storybook';
import { ArgTypes } from '@storybook/web-components-vite';
import { SIZE } from '../vl-spotlight.model';

export const spotlightArgs = {
    ...defaultArgs,
    link: '',
    linkLabel: '',
    external: false,
    alt: false,
    noBorder: false,
    size: SIZE.S,
    imgSrc: '',
    imgAlt: '',
    title: '',
    subtitle: '',
    text: '',
    content: '',
};

export const spotlightArgTypes: ArgTypes<typeof spotlightArgs> = {
    ...defaultArgTypes,
    link: {
        name: 'link',
        description:
            'De component wordt een link. Door te klikken op de component wordt de gebruiker doorgestuurd naar de link die gezet is in dit attribuut.',
        table: {
            type: { summary: TYPES.STRING },
            defaultValue: { summary: spotlightArgs.link },
            category: CATEGORIES.ATTRIBUTES,
        },
    },
    linkLabel: {
        name: 'link-label',
        description:
            'Aria-label voor de link. Aanbevolen voor toegankelijkheid. Let op: `aria-label` vervangt de volledige linktekst, bv. "Premies voor renovatie - opent in nieuw venster" bij external links.',
        table: {
            type: { summary: TYPES.STRING },
            defaultValue: { summary: spotlightArgs.linkLabel },
            category: CATEGORIES.ATTRIBUTES,
        },
    },
    external: {
        name: 'external',
        description:
            'Opent de link in een nieuw tabblad. Dit attribuut wordt enkel gebruikt als het attribuut `link` gezet is.',
        table: {
            type: { summary: TYPES.STRING },
            defaultValue: { summary: String(spotlightArgs.external) },
            category: CATEGORIES.ATTRIBUTES,
        },
    },
    alt: {
        name: 'alt',
        description: 'Geeft de component een alternatieve stijl. De achtergrond wordt grijs.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            defaultValue: { summary: String(spotlightArgs.alt) },
            category: CATEGORIES.ATTRIBUTES,
        },
    },
    noBorder: {
        name: 'no-border',
        description: 'Geeft de component weer zonder border.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            defaultValue: { summary: String(spotlightArgs.noBorder) },
            category: CATEGORIES.ATTRIBUTES,
        },
    },
    size: {
        name: 'size',
        description: 'Dit attribuut bepaalt de grootte van de component.',
        type: { name: TYPES.STRING, required: false },
        control: { type: CONTROLS.SELECT },
        options: Object.values(SIZE),
        table: {
            type: { summary: getSelectControlOptions(Object.values(SIZE)) },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(spotlightArgs.size) },
        },
    },
    imgSrc: {
        name: 'img-src',
        description: 'Het path van de image dat getoond moet worden in de spotlight.',
        table: {
            type: { summary: TYPES.STRING },
            defaultValue: { summary: String(spotlightArgs.imgSrc) },
            category: CATEGORIES.ATTRIBUTES,
        },
    },
    imgAlt: {
        name: 'img-alt',
        description: 'De alternatieve tekst van de image dat getoond moet worden in de spotlight.',
        table: {
            type: { summary: TYPES.STRING },
            defaultValue: { summary: String(spotlightArgs.imgAlt) },
            category: CATEGORIES.ATTRIBUTES,
        },
    },
    title: {
        name: 'title',
        description: 'Titel van de spotlight.',
        table: {
            type: { summary: TYPES.STRING },
            defaultValue: { summary: String(spotlightArgs.title) },
            category: CATEGORIES.SLOTS,
        },
    },
    subtitle: {
        name: 'subtitle',
        description: 'Subtitle van de spotlight.',
        table: {
            type: { summary: TYPES.STRING },
            defaultValue: { summary: String(spotlightArgs.subtitle) },
            category: CATEGORIES.SLOTS,
        },
    },
    text: {
        name: 'text',
        description: 'Text van de spotlight.',
        table: {
            type: { summary: TYPES.STRING },
            defaultValue: { summary: String(spotlightArgs.text) },
            category: CATEGORIES.SLOTS,
        },
    },
    content: {
        name: 'content',
        description: 'Content van de spotlight.',
        table: {
            type: { summary: TYPES.STRING },
            defaultValue: { summary: String(spotlightArgs.content) },
            category: CATEGORIES.SLOTS,
        },
    },
};
