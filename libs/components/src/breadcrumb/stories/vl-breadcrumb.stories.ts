import { story } from '@resources/utils-storybook';
import { Meta } from '@storybook/web-components';
import { html } from 'lit';
import '../vl-breadcrumb-item.component';
import '../vl-breadcrumb.component';
import { breadcrumbItemArgs, breadcrumbItemArgTypes } from './vl-breadcrumb-item.stories-arg';
import breadcrumbDoc from './vl-breadcrumb.stories-doc.mdx';

export default {
    id: 'components-breadcrumb',
    title: 'Components/breadcrumb',
    tags: ['autodocs'],
    args: breadcrumbItemArgs,
    argTypes: breadcrumbItemArgTypes,
    parameters: {
        docs: {
            page: breadcrumbDoc,
        },
    },
} as Meta<typeof breadcrumbItemArgs>;

export const BreadcrumbDefault = story(
    breadcrumbItemArgs,
    ({ href }) => html`
        <vl-breadcrumb>
            <vl-breadcrumb-item href=${href}>Vlaanderen Intern</vl-breadcrumb-item>
            <vl-breadcrumb-item href=${href}>Regelgeving</vl-breadcrumb-item>
            <vl-breadcrumb-item href=${href}>Webuniversum</vl-breadcrumb-item>
            <vl-breadcrumb-item href=${href}>Componenten</vl-breadcrumb-item>
        </vl-breadcrumb>
    `
);
BreadcrumbDefault.storyName = 'vl-breadcrumb - default';
BreadcrumbDefault.args = {
    href: '#',
};
