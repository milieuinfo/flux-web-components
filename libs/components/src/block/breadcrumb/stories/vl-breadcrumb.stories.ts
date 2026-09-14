import { registerWebComponents } from '@domg-wc/common';
import { story } from '@resources/utils-storybook';
import { Meta } from '@storybook/web-components-vite';
import { html } from 'lit';
import { breadcrumbArgs, breadcrumbArgTypes } from './vl-breadcrumb.stories-arg';
import breadcrumbDoc from './vl-breadcrumb.stories-doc.mdx';

registerWebComponents([
    'vl-breadcrumb',
    'vl-breadcrumb-item',
    'vl-icon',
    'vl-popover',
    'vl-popover-action-list',
    'vl-popover-action',
]);

export default {
    id: 'components-block-breadcrumb',
    title: 'Components - Block/breadcrumb/breadcrumb',
    tags: ['autodocs'],
    args: breadcrumbArgs,
    argTypes: breadcrumbArgTypes,
    parameters: {
        docs: {
            page: breadcrumbDoc,
        },
    },
} as Meta<typeof breadcrumbArgs>;

export const BreadcrumbDefault = story(
    breadcrumbArgs,
    ({ ellipsis }) => html`
        <vl-breadcrumb ?ellipsis=${ellipsis}>
            <vl-breadcrumb-item href="#">Vlaanderen Intern</vl-breadcrumb-item>
            <vl-breadcrumb-item href="#">Regelgeving</vl-breadcrumb-item>
            <vl-breadcrumb-item href="#">Webuniversum</vl-breadcrumb-item>
            <vl-breadcrumb-item>Componenten</vl-breadcrumb-item>
        </vl-breadcrumb>
    `
);
BreadcrumbDefault.storyName = 'vl-breadcrumb - default';

export const BreadcrumbButtons = story(
    breadcrumbArgs,
    ({ ellipsis }) => html`
        <vl-breadcrumb ?ellipsis=${ellipsis}>
            <vl-breadcrumb-item type="button" @click=${() => console.log('click 1')}>Natuur</vl-breadcrumb-item>
            <div>
                <vl-breadcrumb-item id="submenu-fauna-flora" type="button" @click=${(e: Event) => e.preventDefault()}>
                    Flora
                </vl-breadcrumb-item>
                <vl-popover
                    distance="6"
                    for="submenu-fauna-flora"
                    hide-arrow
                    placement="bottom-start"
                    trigger="click hover"
                >
                    <vl-popover-action-list>
                        <vl-popover-action icon="nature-leaf" @click=${() => console.log('click flora')}>
                            Flora
                        </vl-popover-action>
                        <vl-popover-action icon="programming-bug" @click=${() => console.log('click fauna')}>
                            Fauna
                        </vl-popover-action>
                    </vl-popover-action-list>
                </vl-popover>
            </div>
            <vl-breadcrumb-item>Bomen</vl-breadcrumb-item>
        </vl-breadcrumb>
    `
);
BreadcrumbButtons.storyName = 'vl-breadcrumb - buttons';
BreadcrumbButtons.decorators = [(story) => html` <div style="height: 100px;">${story()}</div> `];

export const BreadcrumbEllipsis = story(
    breadcrumbArgs,
    () => html`
        <vl-breadcrumb ellipsis>
            <vl-breadcrumb-item href="#">Vlaanderen Intern</vl-breadcrumb-item>
            <vl-breadcrumb-item href="#">Regelgeving</vl-breadcrumb-item>
            <vl-breadcrumb-item>
                Besluit van de Vlaamse Regering tot vaststelling van een gewestelijke stedenbouwkundige verordening voor
                publiciteitsinrichtingen
            </vl-breadcrumb-item>
        </vl-breadcrumb>
    `
);
BreadcrumbEllipsis.storyName = 'vl-breadcrumb - ellipsis';
// Een smal paneel met rand maakt zichtbaar dat het laatste breadcrumb item op de beschikbare breedte wordt afgekapt
BreadcrumbEllipsis.decorators = [
    (story) => html` <div style="width: 400px; border: 1px solid #cbd2da; padding: 1rem;">${story()}</div> `,
];
