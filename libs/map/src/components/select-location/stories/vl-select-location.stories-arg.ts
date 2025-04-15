import { selectRichArgTypes } from '../../../../../form/src/select-rich/stories/vl-select-rich.stories-arg';
import { ArgTypes } from '@storybook/web-components';
import { selectLocationDefaults } from '../vl-select-location.defaults';

type SelectLocationArgs = typeof selectLocationDefaults;

export const selectLocationArgs: SelectLocationArgs = {
    ...selectLocationDefaults,
};

const argTypes = { ...selectRichArgTypes };
delete argTypes.multiple;
delete argTypes.search;

export const selectLocationArgTypes: ArgTypes<SelectLocationArgs> = {
    ...argTypes,
};
