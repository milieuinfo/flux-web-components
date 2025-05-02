import { registerWebComponents } from '@domg-wc/common';
import { VlPopoverMenuInfoTileComponent } from '@domg-wc/integrations/popover';
import { Meta } from '@storybook/web-components';
import { html } from 'lit-html';
import PopoverMenuInfoTileDoc from './popover-menu-info-tile.stories-doc.mdx';

registerWebComponents([VlPopoverMenuInfoTileComponent]);

export default {
    title: 'Ontwerp/Popover/Menu Info Tile',
    tags: ['autodocs'],
    parameters: {
        docs: {
            page: PopoverMenuInfoTileDoc,
            story: {
                inline: false,
                iframeHeight: 250,
            },
        },
    },
} as Meta;

export const MenuInfoTile = () => html`<vl-popover-menu-info-tile></vl-popover-menu-info-tile>`;
