import { CATEGORIES, defaultArgs, defaultArgTypes, TYPES } from '@resources/utils-storybook';
import { ArgTypes } from '@storybook/web-components';

export const stepsArgs = {
    ...defaultArgs,
    line: false,
    timeline: false,
    simpleTimeline: false,
    lastStepNoLine: false,
};

export const stepsArgTypes: ArgTypes = {
    ...defaultArgTypes,
    line: {
        name: 'line',
        description: 'Beeldt een verticale lijn af tussen de stappen.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: stepsArgs.line },
        },
    },
    timeline: {
        name: 'timeline',
        description: 'Beeldt een verticale tijdlijn af tussen de stappen.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: stepsArgs.timeline },
        },
    },
    simpleTimeline: {
        name: 'simple-timeline',
        description: 'Beeldt een simpele verticale tijdlijn af tussen de stappen.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: stepsArgs.simpleTimeline },
        },
    },
    lastStepNoLine: {
        name: 'last-step-no-line',
        description:
            'Laat de verticale lijn na de laatste stap weg bij gebruik van de line, timeline of simple-timeline attributen.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: stepsArgs.lastStepNoLine },
        },
    },
};
