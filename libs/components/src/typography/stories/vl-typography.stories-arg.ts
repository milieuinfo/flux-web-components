import { defaultArgs, defaultArgTypes } from '@resources/utils-storybook';
import { ArgTypes } from '@storybook/web-components';

export const typographyArgs = {
    ...defaultArgs,
    parameters: '{"key1": "tempus" , "key2": "ipsum" }',
};

export const typographyArgTypes: ArgTypes<typeof typographyArgs> = {
    ...defaultArgTypes,
    parameters: {
        name: 'parameters',
        description: 'De key/value parameters die verwerkt en getoond zullen worden in het content element.',
        control: {
            disable: true,
        },
        table: {
            type: { summary: 'string' },
        },
    },
};
