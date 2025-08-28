import { registerWebComponents } from '@domg-wc/common';
import { story } from '@resources/utils-storybook';
import { Meta } from '@storybook/web-components-vite';
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

export const modalDefault = story(
    { ...modalArgs, id: '' },
    ({ title, open, closable, notCancellable, notAutoClosable, allowOverflow, size, position, id }) => html`
        <div>
            <vl-button id="button-open-modal-vt" modal-open="${id}" data-cy="button-modal-toggle"> Open </vl-button>
            <vl-modal
                id="${id}"
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
    `
);
modalDefault.storyName = 'vl-modal - default';
modalDefault.args = {
    allowOverflow: true,
};

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
    id: 'modal-medium',
    size: 'medium',
    closable: true,
    allowOverflow: true,
};

export const modalLarge = modalDefault.bind({});
modalLarge.storyName = 'vl-modal - large';
modalLarge.args = {
    id: 'modal-large',
    size: 'large',
    closable: true,
    allowOverflow: true,
};

export const modalFullScreen = modalDefault.bind({});
modalFullScreen.storyName = 'vl-modal - full screen';
modalFullScreen.args = {
    id: 'modal-full-screen',
    size: 'full-screen',
    closable: true,
};

export const modalLeft = modalDefault.bind({});
modalLeft.storyName = 'vl-modal - left';
modalLeft.args = {
    id: 'modal-left',
    position: 'left',
    closable: true,
    allowOverflow: true,
};

export const modalRight = modalDefault.bind({});
modalRight.storyName = 'vl-modal - right';
modalRight.args = {
    id: 'modal-right',
    position: 'right',
    closable: true,
    allowOverflow: true,
};
