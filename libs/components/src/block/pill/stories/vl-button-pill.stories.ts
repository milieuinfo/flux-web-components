import { Meta } from '@storybook/web-components';
import { html } from 'lit-html';
import '../vl-button-pill.component';
import { buttonPillArgs, buttonPillArgTypes } from './vl-button-pill.stories-arg';
import buttonPillDoc from './vl-button-pill.stories-doc.mdx';

export default {
    id: 'components-block-pill-button-pill',
    title: 'Components - Block/pill/button-pill',
    tags: ['autodocs'],
    args: buttonPillArgs,
    argTypes: buttonPillArgTypes,
    parameters: {
        docs: {
            page: buttonPillDoc,
        },
    },
} as Meta<typeof buttonPillArgs>;

export const ButtonPillDefault = ({ type }: typeof buttonPillArgs) =>
    html` <button is="vl-button-pill" type="button" type=${type}>Optie 1</button> `;
ButtonPillDefault.storyName = 'vl-button-pill - default';
