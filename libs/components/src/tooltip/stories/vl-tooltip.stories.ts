import { Meta } from '@storybook/web-components';
import { html } from 'lit-html';
import { styleMap } from 'lit-html/directives/style-map.js';
import '../vl-tooltip.component';
import { tooltipArgs, tooltipArgTypes } from './vl-tooltip.stories-arg';
import tooltipDoc from './vl-tooltip.stories-doc.mdx';

export default {
    id: 'components-tooltip',
    title: 'Components/tooltip',
    tags: ['autodocs'],
    args: tooltipArgs,
    argTypes: tooltipArgTypes,
    parameters: {
        docs: {
            page: tooltipDoc,
        },
    },
} as Meta<typeof tooltipArgs>;

export const TooltipDefault = ({ placement, tooltipContent, vlStatic }: typeof tooltipArgs) => {
    return html` <div
        style=${styleMap({
            display: 'flex',
            justifyContent: 'center',
            margin: '64px 124px',
        })}
    >
        <vl-button-next>
            <vl-tooltip ?data-vl-static=${vlStatic} data-vl-placement=${placement}>${tooltipContent}</vl-tooltip>
            Tooltip
        </vl-button-next>
    </div>`;
};
TooltipDefault.storyName = 'vl-tooltip - default';
TooltipDefault.argTypes = {
    vlStatic: {
        control: {
            disable: true,
        },
    },
};

export const TooltipStatic = ({ placement, tooltipContent, vlStatic }: typeof tooltipArgs) => {
    return html` <div
        style=${styleMap({
            border: '1px solid #e8ebee',
            padding: '1rem',
            margin: '64px 124px',
        })}
    >
        <vl-tooltip ?data-vl-static=${vlStatic} data-vl-placement=${placement}>${tooltipContent}</vl-tooltip>
    </div>`;
};
TooltipStatic.storyName = 'vl-tooltip - static';
TooltipStatic.args = { vlStatic: true };
