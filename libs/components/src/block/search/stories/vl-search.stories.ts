import { defaultArgs, defaultArgTypes, story } from '@resources/utils-storybook';
import { Meta } from '@storybook/web-components-vite';
import { html } from 'lit-html';
import '../vl-search.component';

export default {
    id: 'components-block-search',
    title: 'Components - Block/search',
    tags: ['autodocs'],
    args: defaultArgs,
    argTypes: defaultArgTypes,
} as Meta<typeof defaultArgs>;

// TODO Add options to the story.
export const searchDefault = story(
    {},
    () => html` <vl-search id="search-inline" inline="" data-cy="search"></vl-search> `
);
searchDefault.storyName = 'vl-search - default';
