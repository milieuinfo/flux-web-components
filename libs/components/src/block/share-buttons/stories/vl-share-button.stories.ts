import { Meta } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../vl-share-button.component';
import '../vl-share-buttons.component';
import { shareButtonArgs, shareButtonArgTypes } from './vl-share-button.stories-arg';

export default {
    id: 'components-block-share-buttons-share-button',
    title: 'Components - Block/share-buttons/share-button',
    tags: ['autodocs'],
    args: shareButtonArgs,
    argTypes: shareButtonArgTypes,
} as Meta<typeof shareButtonArgs>;

export const shareButtonDefault = ({ href, medium }: typeof shareButtonArgs) =>
    html` <vl-share-buttons>
        <vl-share-button href=${href} medium=${medium}></vl-share-button>
    </vl-share-buttons>`;
shareButtonDefault.storyName = 'vl-share-button - default';
