import { Meta } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../vl-share-button.component';
import '../vl-share-buttons.component';
import { shareButtonsArgs, shareButtonsArgTypes } from './vl-share-buttons.stories-arg';

export default {
    id: 'components-block-share-buttons-share-buttons',
    title: 'Components - Block/share-buttons/share-buttons',
    tags: ['autodocs'],
    args: shareButtonsArgs,
    argTypes: shareButtonsArgTypes,
} as Meta<typeof shareButtonsArgs>;

export const shareButtonsDefault = ({ alt }: typeof shareButtonsArgs) => html` <vl-share-buttons
    ?alt=${alt}
    data-cy="share-buttons"
>
    <vl-share-button href="#" medium="facebook" data-cy="share-button-1"></vl-share-button>
    <vl-share-button href="#" medium="twitter" data-cy="share-button-2"></vl-share-button>
    <vl-share-button href="#" medium="linkedin" data-cy="share-button-3"></vl-share-button>
    <vl-share-button href="#" medium="googleplus" data-cy="share-button-4"></vl-share-button>
    <vl-share-button href="#" medium="mail" data-cy="share-button-5"></vl-share-button>
</vl-share-buttons>`;
shareButtonsDefault.storyName = 'vl-share-buttons - default';
