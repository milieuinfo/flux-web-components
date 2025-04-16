import { story } from '@resources/utils-storybook';
import { Meta } from '@storybook/web-components';
import { html } from 'lit-html';
import '../vl-input-slider.component';
import { inputSliderArgs, inputSliderArgTypes } from './vl-input-slider.stories-arg';
import inputSliderDoc from './vl-input-slider.stories-doc.mdx';

export default {
    id: 'components-input-slider',
    title: 'Components/input-slider',
    tags: ['autodocs'],
    args: inputSliderArgs,
    argTypes: inputSliderArgTypes,
    parameters: {
        docs: {
            page: inputSliderDoc,
        },
    },
} as Meta<typeof inputSliderArgs>;

export const InputSliderDefault = story(
    inputSliderArgs,
    ({ maxValue, minValue, value, onChangeValue }) =>
        html`
            <vl-input-slider
                data-vl-max-value=${maxValue}
                data-vl-min-value=${minValue}
                data-vl-value=${value}
                @vl-change-value=${(event: CustomEvent) => onChangeValue(event.detail)}
            ></vl-input-slider>
        `
);
InputSliderDefault.storyName = 'vl-input-slider - default';
