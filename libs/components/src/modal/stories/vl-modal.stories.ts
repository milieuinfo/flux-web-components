import { registerWebComponents } from '@domg-wc/common';
import { VlButtonComponent, VlLinkComponent } from '@domg-wc/components';
import { VlDatepickerComponent } from '@domg-wc/form';
import { Meta } from '@storybook/web-components';
import { html } from 'lit-html';
import '../vl-modal.component';
import { modalArgs, modalArgTypes } from './vl-modal.stories-arg';

registerWebComponents([VlDatepickerComponent, VlButtonComponent, VlLinkComponent]);

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
