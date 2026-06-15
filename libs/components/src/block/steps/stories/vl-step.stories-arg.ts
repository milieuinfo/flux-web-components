import { CATEGORIES, CONTROLS, defaultArgs, defaultArgTypes, TYPES } from '@resources/utils-storybook';
import { ArgTypes } from '@storybook/web-components-vite';
import { action } from 'storybook/actions';

export const stepArgs = {
    ...defaultArgs,
    defaultOpen: false,
    toggleable: false,
    type: '',
    headingLevel: '3',
    iconAriaLabel: '',
    timelineAriaLabel: '',
    onToggle: action('vl-on-toggle'),
    contentRenderer: undefined,
    line: false,
    timeline: false,
    simpleTimeline: false,
    lastStepNoLine: false,
    iconSlot: '',
    subIconSlot: '',
    titleSlot: '',
    titleAnnotationSlot: '',
    subtitleSlot: '',
    contentSlot: '',
};

export const stepArgTypes: ArgTypes<typeof stepArgs> = {
    ...defaultArgTypes,
    toggleable: {
        name: 'toggleable',
        description: 'Beeldt een stap af als een accordion.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(stepArgs.toggleable) },
        },
    },
    type: {
        name: 'type',
        description: 'Beeldt een stap af in een bepaalde staat.',
        control: { type: CONTROLS.SELECT },
        options: ['(default)', 'highlighted', 'disabled', 'success', 'warning', 'error'],
        mapping: { '(default)': '' },
        table: {
            type: { summary: 'highlighted | disabled | success | warning | error' },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(stepArgs.type) },
        },
    },
    headingLevel: {
        name: 'heading-level',
        description: 'Het heading niveau voor de step titel.',
        control: { type: CONTROLS.SELECT },
        options: ['1', '2', '3', '4', '5', '6'],
        table: {
            type: { summary: '1 | 2 | 3 | 4 | 5 | 6' },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(stepArgs.headingLevel) },
        },
    },
    iconAriaLabel: {
        name: 'icon-aria-label',
        description: 'Aria label voor de icon container.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(stepArgs.iconAriaLabel) },
        },
    },
    timelineAriaLabel: {
        name: 'timeline-aria-label',
        description: 'Aria label voor de timeline datum container, bijvoorbeeld voor volledige datum.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(stepArgs.timelineAriaLabel) },
        },
    },
    defaultOpen: {
        name: 'default-open',
        description:
            'Indien gezet zal de step standaard geopend zijn. Werkt enkel in combinatie met ' +
            'het `toggleable` attribuut. <br>Dit attribuut is niet reactief.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(stepArgs.defaultOpen) },
        },
    },
    onToggle: {
        name: 'vl-on-toggle',
        description:
            'Afgevuurd bij het openen of sluiten van de toggleable step.<br>Het event bevat of de step geopend of gesloten is.<br>Werkt enkel in combinatie met het `toggleable` attribuut.',
        table: {
            type: { summary: '{ open: boolean }' },
            category: CATEGORIES.EVENTS,
        },
    },
    contentRenderer: {
        name: 'contentRenderer',
        description:
            'Functie die aangeroepen wordt om dynamische content te renderen op basis van de open/closed state.<br>' +
            'Signatuur: `(open: boolean) => TemplateResult`<br>' +
            'Werkt enkel in combinatie met het `toggleable` attribuut.<br>' +
            'Wanneer deze property is ingesteld, wordt het `content` slot genegeerd.',
        control: false,
        table: {
            type: { summary: '(open: boolean) => TemplateResult' },
            category: CATEGORIES.PROPERTIES,
            defaultValue: { summary: 'undefined' },
        },
    },
    iconSlot: {
        name: 'icon',
        description: 'Element voor het hoofd-icoon van de step.',
        table: {
            type: { summary: TYPES.HTML },
            category: CATEGORIES.SLOTS,
            defaultValue: { summary: stepArgs.iconSlot },
        },
    },
    subIconSlot: {
        name: 'sub-icon',
        description: 'Element voor het sub-icoon van de step.',
        table: {
            type: { summary: TYPES.HTML },
            category: CATEGORIES.SLOTS,
            defaultValue: { summary: stepArgs.subIconSlot },
        },
    },
    titleSlot: {
        name: 'title',
        description: 'Element voor de titel van de step.',
        table: {
            type: { summary: TYPES.HTML },
            category: CATEGORIES.SLOTS,
            defaultValue: { summary: stepArgs.titleSlot },
        },
    },
    titleAnnotationSlot: {
        name: 'title-annotation',
        description: 'Element voor een annotatie bij de titel van de step.',
        table: {
            type: { summary: TYPES.HTML },
            category: CATEGORIES.SLOTS,
            defaultValue: { summary: stepArgs.titleAnnotationSlot },
        },
    },
    subtitleSlot: {
        name: 'subtitle',
        description: 'Element voor de subtitel van de step.',
        table: {
            type: { summary: TYPES.HTML },
            category: CATEGORIES.SLOTS,
            defaultValue: { summary: stepArgs.subtitleSlot },
        },
    },
    contentSlot: {
        name: 'content',
        description:
            'Element voor de hoofdcontent van de step.<br>' +
            'Wordt genegeerd wanneer de `contentRenderer` property is ingesteld.',
        table: {
            type: { summary: TYPES.HTML },
            category: CATEGORIES.SLOTS,
            defaultValue: { summary: stepArgs.contentSlot },
        },
    },
    line: {
        name: 'line',
        description: 'Toont een lijn naast de step.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(stepArgs.line) },
        },
    },
    timeline: {
        name: 'timeline',
        description: 'Toont de step als een timeline item.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(stepArgs.timeline) },
        },
    },
    simpleTimeline: {
        name: 'simple-timeline',
        description: 'Toont een vereenvoudigde timeline versie.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(stepArgs.simpleTimeline) },
        },
    },
    lastStepNoLine: {
        name: 'last-step-no-line',
        description: 'Verbergt de lijn bij het laatste step item.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(stepArgs.lastStepNoLine) },
        },
    },
};
