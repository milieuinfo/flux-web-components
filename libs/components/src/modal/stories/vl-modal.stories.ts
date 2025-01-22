import { registerWebComponents } from '@domg-wc/common-utilities';
import { VlDatepickerComponent } from '@domg-wc/form/next/datepicker';
import { Meta } from '@storybook/web-components';
import { html } from 'lit-html';
import '../vl-modal.component';
import { modalArgs, modalArgTypes } from './vl-modal.stories-arg';

registerWebComponents([VlDatepickerComponent]);

export default {
    id: 'components-modal',
    title: 'Components/modal',
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
}: typeof modalArgs) => html`
    <div>
        <button id="button-open-modal-vt" is="vl-button" data-vl-modal-open="modal-vt" data-cy="button-modal-toggle">
            Open
        </button>
        <vl-modal
            id="modal-vt"
            data-vl-title=${title}
            ?data-vl-open=${open}
            ?data-vl-closable=${closable}
            ?data-vl-not-cancellable=${notCancellable}
            ?data-vl-not-auto-closable=${notAutoClosable}
            ?data-vl-allow-overflow=${allowOverflow}
            data-cy="modal"
        >
            <span slot="content">
                <vl-datepicker-next block></vl-datepicker-next>
                Lorem ipsum dolor sit amet.
            </span>
            <button is="vl-button" slot="button">Start aanvraag</button>
        </vl-modal>
    </div>
`;
modalDefault.storyName = 'vl-modal - default';

export const modalWithOtherAction = () => html`
    <div>
        <button
            id="button-open-modal-vt"
            is="vl-button"
            data-vl-modal-open="modal-cl-nc-li"
            data-cy="button-modal-toggle"
        >
            Open
        </button>
        <vl-modal id="modal-cl-nc-li" data-vl-title="Modal" data-vl-closable data-vl-not-cancellable data-cy="modal">
            <span slot="content">Lorem ipsum dolor sit amet.</span>
            <button is="vl-button-link" class="custom-action-button" slot="button">
                <span is="vl-icon" data-vl-icon="cross" before="" data-vl-modal-close=""></span>
                Andere actie
            </button>
        </vl-modal>
    </div>
`;
modalWithOtherAction.storyName = 'vl-modal - with other action';
modalWithOtherAction.parameters = {
    controls: { hideNoControlsWarning: true },
};
