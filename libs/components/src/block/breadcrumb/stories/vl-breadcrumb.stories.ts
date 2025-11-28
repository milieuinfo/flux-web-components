import { registerWebComponents } from '@domg-wc/common';
import { story } from '@resources/utils-storybook';
import { Meta } from '@storybook/web-components-vite';
import { html } from 'lit';
import { breadcrumbItemArgs } from './vl-breadcrumb-item.stories-arg';
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
    parameters: {
        docs: {
            page: breadcrumbDoc,
        },
    },
} as Meta<typeof breadcrumbItemArgs>;

export const BreadcrumbDefault = story(
    {},
    () => html`
        <vl-breadcrumb>
            <vl-breadcrumb-item href="#">Vlaanderen Intern</vl-breadcrumb-item>
            <vl-breadcrumb-item href="#">Regelgeving</vl-breadcrumb-item>
            <vl-breadcrumb-item href="#">Webuniversum</vl-breadcrumb-item>
            <vl-breadcrumb-item>Componenten</vl-breadcrumb-item>
        </vl-breadcrumb>
    `
);
BreadcrumbDefault.storyName = 'vl-breadcrumb - default';

export const BreadcrumbButtons = story(
    {},
    () => html`
        <vl-breadcrumb>
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
            <vl-breadcrumb-item type="button" @click=${() => console.log('click 3')}>Bomen</vl-breadcrumb-item>
        </vl-breadcrumb>
    `
);
BreadcrumbButtons.storyName = 'vl-breadcrumb - buttons';
BreadcrumbButtons.decorators = [(story) => html` <div style="height: 100px;">${story()}</div> `];
