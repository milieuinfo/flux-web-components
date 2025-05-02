import {
    CATEGORIES,
    CONTROLS,
    defaultArgs,
    defaultArgTypes,
    getSelectControlOptions,
} from '@resources/utils-storybook';

export const buttonPillArgs = {
    ...defaultArgs,
    type: '',
};

export const buttonPillArgTypes = {
    ...defaultArgTypes,
    type: {
        name: 'type',
        description: 'The attribute that determines the type. ',
        control: { type: CONTROLS.SELECT },
        options: ['success', 'warning', 'error'],
        table: {
            type: {
                summary: getSelectControlOptions(['success', 'warning', 'error']),
            },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: '' },
        },
    },
};
