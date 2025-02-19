import { registerWebComponents } from '@domg-wc/common-utilities';
import { html } from 'lit-html';
import { Meta } from '@storybook/web-components';
import PopoverMenuDoc from './popover-menu.stories-doc.mdx';
import { VlPopoverMenuComponent } from '@domg-wc/integration/popover/menu/vl-popover-menu.component';

registerWebComponents([VlPopoverMenuComponent]);

export default {
    title: 'Ontwerp/Popover/Menu',
    tags: ['autodocs'],
    parameters: {
        docs: {
            page: PopoverMenuDoc,
            story: {
                inline: false,
                iframeHeight: 250,
            },
        },
    },
} as Meta;

export const Menu = () => html`<vl-popover-menu></vl-popover-menu>`;
