import { defaultArgs, defaultArgTypes, story } from '@resources/utils-storybook';
import { Meta } from '@storybook/web-components';
import { html } from 'lit-html';
import '../vl-search.component';

export default {
    id: 'components-search',
    title: 'Components/search',
    tags: ['autodocs'],
    args: defaultArgs,
    argTypes: defaultArgTypes(),
} as Meta<typeof defaultArgs>;

// TODO Add options to the story.
export const searchDefault = story(
    {},
    () => html` <vl-search id="search-inline" data-vl-inline="" data-cy="search"></vl-search> `
);
searchDefault.storyName = 'vl-search - default';
