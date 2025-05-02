import { Meta } from '@storybook/web-components';
import { html } from 'lit-html';
import '../vl-description-data-item.component';
import { descriptionDataItemArgs, descriptionDataItemArgTypes } from './vl-description-data-item.stories-arg';

export default {
    id: 'components-block-description-data-description-data-item',
    title: 'Components - Block/description-data/description-data-item',
    tags: ['autodocs'],
    args: descriptionDataItemArgs,
    argTypes: descriptionDataItemArgTypes,
    parameters: {
        controls: {
            hideNoControlsWarning: true,
        },
    },
} as Meta<typeof descriptionDataItemArgs>;

export const descriptionDataItemDefault = ({ label, value }: typeof descriptionDataItemArgs) =>
    html` <vl-description-data-item label=${label} value=${value}></vl-description-data-item>`;
descriptionDataItemDefault.storyName = 'vl-description-data-item - default';

export const descriptionDataItemWithSlotElements = ({ labelSlotText, valueSlotText }: typeof descriptionDataItemArgs) =>
    html` <vl-description-data-item>
        <span slot="label">${labelSlotText}</span>
        <span slot="value">${valueSlotText}</span>
    </vl-description-data-item>`;
descriptionDataItemWithSlotElements.storyName = 'vl-description-data-item - with slot elements';
descriptionDataItemWithSlotElements.argTypes = {
    label: {
        control: {
            disable: true,
        },
    },
    value: {
        control: {
            disable: true,
        },
    },
    labelSlotText: {
        control: {
            disable: false,
        },
    },
    valueSlotText: {
        control: {
            disable: false,
        },
    },
};
