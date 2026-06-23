import { registerWebComponents } from '@domg-wc/common';
import { story } from '@resources/utils-storybook';
import { Meta } from '@storybook/web-components-vite';
import { html, TemplateResult } from 'lit';
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

const relativePositionDecorator = (story: () => unknown) =>
    html` <div style="position: relative;min-height: 150px;">${story()}</div>`;

const Template = (trigger: TemplateResult, tooltipText: string, forTrigger: string) =>
    story(tooltipDefaultArgs, ({ open, placement, hideArrow, distance, strategy, type }) => {
        return html`
            ${trigger}
            <vl-tooltip
                for=${forTrigger}
                ?open=${open}
                placement=${placement}
                hide-arrow=${hideArrow}
                distance=${distance}
                strategy=${strategy}
                type=${type}
            >
                ${tooltipText}
            </vl-tooltip>
        `;
    });

export const TooltipDefault = Template(
    html`<vl-button ghost icon="info-circle" id="btn-context" label="Meer info"></vl-button>`,
    'Een boodschap die context geeft.',
    'btn-context'
).bind({});
TooltipDefault.storyName = 'vl-tooltip - default';
TooltipDefault.decorators = [relativePositionDecorator];
TooltipDefault.parameters = {
    layout: 'centered',
};

export const TooltipAsLabel = Template(
    html`<button
        id="clickable-ui-element"
        style="border: 1px solid var(--vl-color--border); background: white; width: 100px; height: 100px;"
    ></button>`,
    'Een UI element zonder eigen tekst of label',
    'clickable-ui-element'
).bind({});
TooltipAsLabel.storyName = 'vl-tooltip - as label';
TooltipAsLabel.args = {
    type: 'label',
};
TooltipAsLabel.decorators = [relativePositionDecorator];
TooltipAsLabel.parameters = {
    layout: 'centered',
};
