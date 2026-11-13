import { defaultArgs, defaultArgTypes } from '@resources/utils-storybook';
import { ArgTypes } from '@storybook/web-components-vite';
import { propertiesArgs, propertiesArgTypes } from '../../properties/stories/vl-properties.stories-arg';

export const searchResultPropertiesArgs = {
    ...defaultArgs,
    props: propertiesArgs.props,
};

export const searchResultPropertiesArgTypes: ArgTypes<typeof searchResultPropertiesArgs> = {
    ...defaultArgTypes,
    props: propertiesArgTypes.props,
};
