import { registerWebComponents } from '@domg-wc/common-utilities';
import { VlButtonComponent } from '@domg-wc/components/next/button';
import { VlLinkComponent } from '@domg-wc/components/next/link';
import { VlDatepickerComponent } from '@domg-wc/form/next/datepicker';
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
        <vl-button-next id="button-open-modal-vt" data-vl-modal-open="modal-vt" data-cy="button-modal-toggle">
            Open
        </vl-button-next>
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
            <vl-button-next slot="button">Start aanvraag</vl-button-next>
        </vl-modal>
    </div>
`;
modalDefault.storyName = 'vl-modal - default';

export const modalWithOtherAction = () => html`
    <div>
        <vl-button-next id="button-open-modal-vt" data-vl-modal-open="modal-cl-nc-li" data-cy="button-modal-toggle">
            Open
        </vl-button-next>
        <vl-modal id="modal-cl-nc-li" data-vl-title="Modal" data-vl-closable data-vl-not-cancellable data-cy="modal">
            <span slot="content">Lorem ipsum dolor sit amet.</span>
            <vl-link-next slot="button" button-as-link icon="cross" icon-placement="before" data-vl-modal-close>
                Andere actie
            </vl-link-next>
        </vl-modal>
    </div>
`;
modalWithOtherAction.storyName = 'vl-modal - with other action';
modalWithOtherAction.parameters = {
    controls: { hideNoControlsWarning: true },
};
