import { html } from 'lit-html';
import { Meta } from '@storybook/web-components-vite';
import { registerWebComponents } from '@domg-wc/common';
import { VlPopoverMenuAccordionComponent } from '@domg-wc/integrations/popover';

registerWebComponents([VlPopoverMenuAccordionComponent]);

export default {
    title: 'Ontwerp/Popover/Menu Accordion',
    parameters: {
        docs: {
            story: {
                inline: false,
                iframeHeight: 500,
            },
        },
    },
} as Meta;

export const MenuAccordion = () => html`<vl-popover-menu-accordion></vl-popover-menu-accordion>`;
