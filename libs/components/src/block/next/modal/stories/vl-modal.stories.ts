import { registerWebComponents } from '@domg-wc/common';
import { story } from '@resources/utils-storybook';
import { Meta } from '@storybook/web-components-vite';
import { html } from 'lit';
import { VlButtonComponent } from '../../../../atom/button';
import { VlLinkComponent } from '../../../../atom/link';
import { VlDatepickerComponent } from '../../../../form/datepicker';
import '../vl-modal.component';
import { modalArgs, modalArgTypes } from './vl-modal.stories-arg';
import modalDoc from './vl-modal.stories-doc.mdx';

registerWebComponents([VlDatepickerComponent, VlButtonComponent, VlLinkComponent]);

export default {
    id: 'components-block-next-modal',
    title: 'Components - Block/next/modal',
    tags: ['autodocs'],
    args: modalArgs,
    argTypes: modalArgTypes,
    parameters: {
        docs: {
            page: modalDoc,
        },
    },
} as Meta<typeof modalArgs>;

export const modalDefault = story(
    { ...modalArgs, id: '' },
    ({
        titleLabel,
        label,
        open,
        closable,
        notCancellable,
        notAutoClosable,
        allowOverflow,
        size,
        position,
        id,
        focusOnModal,
        onVlOpen,
        onVlClose,
    }) => html`
        <div>
            <vl-button
                id="button-open-${id}"
                modal-open="${id}"
                data-cy="button-modal-toggle"
                aria-controls="${id}"
                aria-haspopup="dialog"
            >
                Open
            </vl-button>
            <vl-modal-next
                id="${id}"
                title-label=${titleLabel}
                label=${label}
                ?open=${open}
                ?closable=${closable}
                ?not-cancellable=${notCancellable}
                ?not-auto-closable=${notAutoClosable}
                ?allow-overflow=${allowOverflow}
                data-cy="modal"
                size="${size}"
                position="${position}"
                ?focus-on-modal=${focusOnModal}
                @vl-open=${onVlOpen}
                @vl-close=${onVlClose}
            >
                <span slot="content">
                    <vl-datepicker block label="Kies een datum"></vl-datepicker>
                    Lorem ipsum dolor sit amet.
                </span>
                <vl-button slot="button">Start aanvraag</vl-button>
            </vl-modal-next>
        </div>
    `
);
modalDefault.storyName = 'vl-modal-next - default';
modalDefault.args = {
    allowOverflow: true,
    id: 'modal-default',
    titleLabel: 'Modal default',
};

export const modalWithOtherAction = ({ onVlOpen, onVlClose }: typeof modalArgs) => html`
    <div>
        <vl-button
            id="button-open-modal-cl-nc-li"
            modal-open="modal-cl-nc-li"
            data-cy="button-modal-toggle"
            aria-controls="modal-cl-nc-li"
            aria-haspopup="dialog"
        >
            Open
        </vl-button>
        <vl-modal-next
            id="modal-cl-nc-li"
            title-label="Modal met andere actie"
            closable
            not-cancellable
            data-cy="modal"
            @vl-open=${onVlOpen}
            @vl-close=${onVlClose}
        >
            <span slot="content">Lorem ipsum dolor sit amet.</span>
            <vl-link slot="button" button-as-link icon="cross" icon-placement="before" modal-close>
                Andere actie
            </vl-link>
        </vl-modal-next>
    </div>
`;
modalWithOtherAction.storyName = 'vl-modal-next - with other action';
modalWithOtherAction.parameters = {
    controls: { disable: true },
};

export const modalMedium = modalDefault.bind({});
modalMedium.storyName = 'vl-modal-next - medium';
modalMedium.args = {
    id: 'modal-medium',
    label: 'Modal medium',
    size: 'medium',
    closable: true,
    allowOverflow: true,
};

export const modalLarge = modalDefault.bind({});
modalLarge.storyName = 'vl-modal-next - large';
modalLarge.args = {
    id: 'modal-large',
    label: 'Modal large',
    size: 'large',
    closable: true,
    allowOverflow: true,
};

export const modalFullScreen = modalDefault.bind({});
modalFullScreen.storyName = 'vl-modal-next - full screen';
modalFullScreen.args = {
    id: 'modal-full-screen',
    label: 'Modal full screen',
    size: 'full-screen',
    closable: true,
};

export const modalLeft = modalDefault.bind({});
modalLeft.storyName = 'vl-modal-next - left';
modalLeft.args = {
    id: 'modal-left',
    label: 'Modal left',
    position: 'left',
    closable: true,
    allowOverflow: true,
};

export const modalRight = modalDefault.bind({});
modalRight.storyName = 'vl-modal-next - right';
modalRight.args = {
    id: 'modal-right',
    label: 'Modal right',
    position: 'right',
    closable: true,
    allowOverflow: true,
};

export const modalWithFocusOnModal = modalDefault.bind({});
modalWithFocusOnModal.storyName = 'vl-modal-next - with focus on modal';
modalWithFocusOnModal.args = {
    id: 'modal-focus-on-modal',
    focusOnModal: true,
    closable: true,
    label: 'Modal met focus op modal',
    allowOverflow: true,
};
