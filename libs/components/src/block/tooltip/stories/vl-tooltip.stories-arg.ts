// de import is bewust op deze manier om voor de web-types.generator 'binnen' de monorepo geen side-effect te geven
import { CATEGORIES, defaultArgs, defaultArgTypes, TYPES } from '@resources/utils-storybook';
import { ArgTypes } from '@storybook/web-components-vite';
import { tooltipDefaults, TooltipDefaults } from '../vl-tooltip.defaults';

export type TooltipArgs = typeof defaultArgs & TooltipDefaults;

export const tooltipDefaultArgs: TooltipArgs = {
    ...defaultArgs,
    ...tooltipDefaults,
};

export const tooltipArgTypes: ArgTypes<typeof tooltipDefaultArgs> = {
    ...defaultArgTypes,
    for: {
        name: 'for',
        description:
            'HTML id van het element die de tooltip zal triggeren en waar tegenover de tooltip zich zal oriënteren.',
        type: { name: TYPES.STRING, required: true },
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.PROPERTIES,
            defaultValue: { summary: tooltipDefaultArgs.for },
        },
    },
    placement: {
        name: 'placement',
        description:
            'Voorkeursoriëntatie van de tooltip als de ruimte het toelaat. Je kan ook `-start` of `-end` suffix toevoegen zodat oriëntatie start of eindigt aan respectievelijk begin of einde van het trigger element.<br />[Raadpleeg de placement documentatie van floating-ui](https://floating-ui.com/docs/tutorial#placements).',
        table: {
            type: { summary: 'top | right | bottom | left' },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: tooltipDefaultArgs.placement },
        },
    },
    hideArrow: {
        name: 'hide-arrow',
        description: 'Verbergt de pijl die wijst naar het element die de tooltip triggert.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(tooltipDefaultArgs.hideArrow) },
        },
    },
    open: {
        name: 'open',
        description: 'Bepaalt of de tooltip open is.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.PROPERTIES,
            defaultValue: { summary: String(tooltipDefaultArgs.open) },
        },
    },
    distance: {
        name: 'distance',
        description: 'Afstand van de tooltip tegenover het trigger element.',
        table: {
            type: { summary: TYPES.NUMBER },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(tooltipDefaultArgs.distance) },
        },
    },
    strategy: {
        name: 'strategy',
        description:
            'Positioneringsstrategie van de tooltip.<br />[Raadpleeg de strategy documentatie van floating-ui](https://floating-ui.com/docs/computePosition#strategy).',
        table: {
            type: { summary: 'absolute | fixed' },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: tooltipDefaultArgs.strategy },
        },
    },
};
