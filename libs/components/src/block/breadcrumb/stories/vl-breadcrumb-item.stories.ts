import { story } from '@resources/utils-storybook';
import { Meta } from '@storybook/web-components-vite';
import { html } from 'lit';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import '../vl-breadcrumb-item.component';
import '../vl-breadcrumb.component';
import { breadcrumbItemArgs, breadcrumbItemArgTypes } from './vl-breadcrumb-item.stories-arg';
import breadcrumbItemDoc from './vl-breadcrumb-item.stories-doc.mdx';

export default {
    id: 'components-block-breadcrumb-breadcrumb-item',
    title: 'Components - Block/breadcrumb/breadcrumb-item',
    tags: ['autodocs'],
    args: breadcrumbItemArgs,
    argTypes: breadcrumbItemArgTypes,
    parameters: {
        docs: {
            page: breadcrumbItemDoc,
        },
    },
} as Meta<typeof breadcrumbItemArgs>;

const Template = story(
    breadcrumbItemArgs,
    ({ href, type }) => html`
        <vl-breadcrumb>
            <vl-breadcrumb-item href=${ifDefined(href)} type=${ifDefined(type)} @click=${type === 'button' ? () => console.log('click breadcrumb item') : null}>Breadcrumb item</vl-breadcrumb-item>
        </vl-breadcrumb>
    `
);

export const BreadcrumbDefault = Template.bind({});
BreadcrumbDefault.storyName = 'vl-breadcrumb - default';
BreadcrumbDefault.args = {
    href: '#',
};

export const BreadcrumbButton = Template.bind({});
BreadcrumbButton.storyName = 'vl-breadcrumb - button';
BreadcrumbButton.args = {
    type: 'button',
};

export const BreadcrumbText = Template.bind({});
BreadcrumbText.storyName = 'vl-breadcrumb - text';
BreadcrumbText.args = {
    type: 'text',
};
