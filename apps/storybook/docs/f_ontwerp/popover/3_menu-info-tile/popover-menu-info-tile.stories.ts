import { registerWebComponents } from '@domg-wc/common';
import { VlPopoverMenuInfoTileComponent } from '@domg-wc/integrations/popover';
import { Meta } from '@storybook/web-components-vite';
import { html } from 'lit';

registerWebComponents([VlPopoverMenuInfoTileComponent]);

export default {
    title: 'Ontwerp/Popover/Menu Info Tile',
    parameters: {
        docs: {
            story: {
                inline: false,
                iframeHeight: 250,
            },
        },
    },
} as Meta;

export const MenuInfoTile = () => html`<vl-popover-menu-info-tile></vl-popover-menu-info-tile>`;
