import { story } from '@resources/utils-storybook';
import { Meta } from '@storybook/web-components-vite';
import { html } from 'lit-html';
import '../vl-input-slider.component';
import { inputSliderArgs, inputSliderArgTypes } from './vl-input-slider.stories-arg';
import inputSliderDoc from './vl-input-slider.stories-doc.mdx';

export default {
    id: 'components-block-input-slider',
    title: 'Components - Block/input-slider',
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
                max-value=${maxValue}
                min-value=${minValue}
                value=${value}
                @vl-change-value=${(event: CustomEvent) => onChangeValue(event.detail)}
            ></vl-input-slider>
        `
);
InputSliderDefault.storyName = 'vl-input-slider - default';
