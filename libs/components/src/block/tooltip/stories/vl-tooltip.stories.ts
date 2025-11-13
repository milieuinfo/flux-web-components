import { registerWebComponents } from '@domg-wc/common';
import { story } from '@resources/utils-storybook';
import { Meta } from '@storybook/web-components-vite';
import { html } from 'lit-html';
import { VlButtonComponent } from '../../../atom/button';
import { VlTooltipComponent } from '../vl-tooltip.component';
import { tooltipArgTypes, tooltipDefaultArgs } from './vl-tooltip.stories-arg';
import tooltipDoc from './vl-tooltip.stories-doc.mdx';

registerWebComponents([VlTooltipComponent, VlButtonComponent]);

export default {
    id: 'components-block-tooltip',
    title: 'Components - Block/tooltip',
    tags: ['autodocs'],
    args: tooltipDefaultArgs,
    argTypes: tooltipArgTypes,
    parameters: {
        docs: { page: tooltipDoc },
    },
} as Meta<typeof tooltipDefaultArgs>;

const relativePositionDecorator = (story: () => unknown) => html` <div style="position: relative;min-height: 150px;">${story()}</div>`;

export const TooltipDefault = story(tooltipDefaultArgs, ({ open, placement, hideArrow, distance, strategy }) => {
    return html`
        <vl-button id="btn-close">Hover over me</vl-button>
        <vl-tooltip
            for="btn-close"
            ?open=${open}
            placement=${placement}
            hide-arrow=${hideArrow}
            distance=${distance}
            strategy=${strategy}
        >
            Een boodschap die context geeft.
        </vl-tooltip>
    `;
});
TooltipDefault.storyName = 'vl-tooltip - default';
TooltipDefault.decorators = [relativePositionDecorator];
TooltipDefault.parameters = {
    layout: 'centered',
};
