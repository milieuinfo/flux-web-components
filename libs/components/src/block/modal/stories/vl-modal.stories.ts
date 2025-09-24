import { registerWebComponents } from '@domg-wc/common';
import { Meta } from '@storybook/web-components';
import { html } from 'lit-html';
import '../vl-modal.component';
import { VlButtonComponent } from '../../../atom/button';
import { VlLinkComponent } from '../../../atom/link';
import { modalArgs, modalArgTypes } from './vl-modal.stories-arg';
import { VlDatepickerComponent } from '../../../form/datepicker';

registerWebComponents([VlDatepickerComponent, VlButtonComponent, VlLinkComponent]);

export default {
    id: 'components-block-modal',
    title: 'Components - Block/modal',
    tags: ['autodocs'],
    args: modalArgs,
    argTypes: modalArgTypes,
} as Meta<typeof modalArgs>;

export const modalDefault = ({
    title,
    open,
    closable,
    notCancellable,
    notAutoClosable,
    allowOverflow,
    size,
    position,
}: typeof modalArgs) => html`
    <div>
        <vl-button id="button-open-modal-vt" modal-open="modal-vt" data-cy="button-modal-toggle"> Open </vl-button>
        <vl-modal
            id="modal-vt"
            title=${title}
            ?open=${open}
            ?closable=${closable}
            ?not-cancellable=${notCancellable}
            ?not-auto-closable=${notAutoClosable}
            ?allow-overflow=${allowOverflow}
            data-cy="modal"
            size="${size}"
            position="${position}"
        >
            <span slot="content">
                <vl-datepicker block></vl-datepicker>
                Lorem ipsum dolor sit amet.
            </span>
            <vl-button slot="button">Start aanvraag</vl-button>
        </vl-modal>
    </div>
`;
modalDefault.storyName = 'vl-modal - default';

export const modalWithOtherAction = () => html`
    <div>
        <vl-button id="button-open-modal-vt" modal-open="modal-cl-nc-li" data-cy="button-modal-toggle">
            Open
        </vl-button>
        <vl-modal id="modal-cl-nc-li" title="Modal" closable not-cancellable data-cy="modal">
            <span slot="content">Lorem ipsum dolor sit amet.</span>
            <vl-link slot="button" button-as-link icon="cross" icon-placement="before" modal-close>
                Andere actie
            </vl-link>
        </vl-modal>
    </div>
`;
modalWithOtherAction.storyName = 'vl-modal - with other action';
modalWithOtherAction.parameters = {
    controls: { hideNoControlsWarning: true },
};

export const modalMedium = modalDefault.bind({});
modalMedium.storyName = 'vl-modal - medium';
modalMedium.args = {
    size: 'medium',
    open: true,
    closable: true,
};

export const modalLarge = modalDefault.bind({});
modalLarge.storyName = 'vl-modal - large';
modalLarge.args = {
    size: 'large',
    open: true,
    closable: true,
};

export const modalFullScreen = modalDefault.bind({});
modalFullScreen.storyName = 'vl-modal - full screen';
modalFullScreen.args = {
    size: 'full-screen',
    open: true,
    closable: true,
};

export const modalLeft = modalDefault.bind({});
modalLeft.storyName = 'vl-modal - left';
modalLeft.args = {
    position: 'left',
    open: true,
    closable: true,
};

export const modalRight = modalDefault.bind({});
modalRight.storyName = 'vl-modal - right';
modalRight.args = {
    position: 'right',
    open: true,
    closable: true,
};