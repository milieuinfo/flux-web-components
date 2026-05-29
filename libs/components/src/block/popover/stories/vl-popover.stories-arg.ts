// de import is bewust op deze manier om voor de web-types.generator 'binnen' de monorepo geen side-effect te geven
import {
    CATEGORIES,
    CONTROLS,
    defaultArgs,
    defaultArgTypes,
    getSelectControlOptions,
    PADDINGS,
    TYPES,
} from '@resources/utils-storybook';
import { ArgTypes } from '@storybook/web-components-vite';
import { popoverDefaults, PopoverDefaults } from '../vl-popover.defaults';
import { POPOVER_STRATEGY } from '../vl-popover.model';

export type PopoverArgs = typeof defaultArgs & PopoverDefaults;

export const popoverDefaultArgs: PopoverArgs = {
    ...defaultArgs,
    ...popoverDefaults,
};

export const popoverArgTypes: ArgTypes<typeof popoverDefaultArgs> = {
    ...defaultArgTypes,
    for: {
        name: 'for',
        description:
            'HTML id van het element die de popover zal triggeren en waar tegenover de popover zich zal oriënteren.',
        type: { name: TYPES.STRING, required: true },
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.PROPERTIES,
            defaultValue: { summary: popoverDefaultArgs.for },
        },
    },
    open: {
        name: 'open',
        description: 'Bepaalt of de popover open is.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.PROPERTIES,
            defaultValue: { summary: String(popoverDefaultArgs.open) },
        },
    },
    hideArrow: {
        name: 'hide-arrow',
        description: 'Verbergt de pijl die wijst naar het element die de popover triggert.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(popoverDefaultArgs.hideArrow) },
        },
    },
    hideOnClick: {
        name: 'hide-on-click',
        description: 'Verbergt popover wanneer op de content wordt geklikt. Niet reactief.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(popoverDefaultArgs.hideOnClick) },
        },
    },
    distance: {
        name: 'distance',
        description: 'Afstand van de popover tegenover het trigger element.',
        control: { type: CONTROLS.RANGE, min: 0, max: 100, step: 1 },
        table: {
            type: { summary: TYPES.NUMBER },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(popoverDefaultArgs.distance) },
        },
    },
    contentPadding: {
        name: 'content-padding',
        description:
            'De grootte van de padding van de content.<br>Deze padding wordt toegepast op zowel desktop als mobile.',
        control: { type: CONTROLS.SELECT },
        options: [...Object.keys(PADDINGS)],
        table: {
            type: { summary: getSelectControlOptions(Object.keys(PADDINGS)) },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: popoverDefaultArgs.contentPadding },
        },
    },
    placement: {
        name: 'placement',
        description:
            'Voorkeursoriëntatie van de popover als de ruimte het toelaat. Je kan ook `-start` of `-end` suffix toevoegen zodat oriëntatie start of eindigt aan respectievelijk begin of einde van het trigger element.<br />[Raadpleeg de placement documentatie van floating-ui](https://floating-ui.com/docs/tutorial#placements).',
        table: {
            type: { summary: 'top | right | bottom | left' },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: popoverDefaultArgs.placement },
        },
    },
    trigger: {
        name: 'trigger',
        description:
            'Gebruikersacties die de popover triggeren. Je kan verschillende acties combineren met spaties. Bv. met `focus hover` zal de popover zowel verschijnen bij focus als bij hover.<br />Tip: `hover` en `focus` zijn bij de popover meestal te vermijden. Gebruik hiervoor eerder [vl-tooltip](/?path=/docs/components-block-tooltip--documentatie).',
        table: {
            type: { summary: 'click | focus | hover' },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: popoverDefaultArgs.trigger },
        },
    },
    strategy: {
        name: 'strategy',
        description:
            'Positioneringsstrategie van de popover.<br />[Raadpleeg de strategy documentatie van floating-ui](https://floating-ui.com/docs/computePosition#strategy).',
        control: { type: CONTROLS.SELECT },
        options: Object.values(POPOVER_STRATEGY),
        table: {
            type: { summary: getSelectControlOptions(Object.values(POPOVER_STRATEGY)) },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: popoverDefaultArgs.strategy },
        },
    },
    maxHeight: {
        name: 'max-height',
        description:
            'Optionele harde bovengrens voor de hoogte van de popover-content (CSS-lengte, bv. `300px` of `50vh`). De effectieve hoogte is het minimum van deze waarde en de ruimte tot de viewport-rand; bij overschrijding scrollt de content verticaal.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: popoverDefaultArgs.maxHeight },
        },
    },
};
