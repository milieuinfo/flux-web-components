import { html } from 'lit';
import { Meta } from '@storybook/web-components-vite';
import { registerWebComponents } from '@domg-wc/common';
import { VlPopoverMenuAccordionComponent } from '@domg-wc/integrations/popover';

registerWebComponents([VlPopoverMenuAccordionComponent]);

export default {
    title: 'Patronen/Navigatie/Popover/accordion met menu',
    parameters: {
        docs: {
            story: {
                inline: false,
                iframeHeight: 500,
            },
        },
    },
} as Meta;

export const PopoverAccordionMetMenu = () => html`<vl-popover-menu-accordion></vl-popover-menu-accordion>`;
PopoverAccordionMetMenu.storyName = 'popover - accordion met menu';
