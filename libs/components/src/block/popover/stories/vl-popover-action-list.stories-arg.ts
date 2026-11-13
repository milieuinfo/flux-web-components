import { defaultArgs, defaultArgTypes } from '@resources/utils-storybook';
import { ArgTypes } from '@storybook/web-components-vite';

export const popoverActionListArgs = {
    ...defaultArgs,
};

export const popoverActionListArgTypes: ArgTypes<typeof popoverActionListArgs> = {
    ...defaultArgTypes,
};
