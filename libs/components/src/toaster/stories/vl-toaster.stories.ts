import { registerWebComponents } from '@domg-wc/common-utilities';
import { VlButtonElement } from '@domg-wc/elements';
import { Meta } from '@storybook/web-components';
import { html } from 'lit-html';
import { VlAlert } from '../../alert/vl-alert.component';
import { VlToasterElement } from '../vl-toaster.element';
import { toasterArgs, toasterArgTypes } from './vl-toaster.stories-arg';
import toasterDoc from './vl-toaster.stories-doc.mdx';

registerWebComponents([VlAlert, VlButtonElement, VlToasterElement]);

export default {
    id: 'components-toaster',
    title: 'Components/toaster',
    tags: ['autodocs'],
    args: toasterArgs,
    argTypes: toasterArgTypes,
    parameters: {
        docs: {
            page: toasterDoc,
        },
        controls: {
            hideNoControlsWarning: true,
        },
    },
} as Meta<typeof toasterArgs>;

export const ToasterDefault = ({ topLeft, topRight, bottomLeft, bottomRight, fadeOut }: typeof toasterArgTypes) => html`
    <div id="top-left-toaster" is="vl-toaster" data-vl-top-left data-vl-fadeout data-cy="toaster-top-left"></div>
    <div id="top-right-toaster" is="vl-toaster" data-vl-top-right data-cy="toaster-top-right"></div>
    <div id="bottom-left-toaster" is="vl-toaster" data-vl-bottom-left data-cy="toaster-bottom-left"></div>
    <div id="bottom-right-toaster" is="vl-toaster" data-vl-bottom-right data-cy="toaster-bottom-right"></div>

    <button is="vl-button" onclick="dynamicToaster().push(newSuccessAlert());" data-cy="button-success">Success</button>
    <button is="vl-button" onclick="dynamicToaster().push(newWarningAlert());" data-cy="button-warning">
        Warning toaster
    </button>
    <button is="vl-button" onclick="dynamicToaster().push(newSuccessAlert());" data-cy="button-error">
        Error toaster
    </button>
    <button is="vl-button" onclick="dynamicToaster().push(newCtaAlert());" data-cy="button-cta">CTA toaster</button>

    <br />
    <br />

    <button is="vl-button" onclick="topLeftToaster().push(newSuccessAlert());" data-cy="button-top-left">
        Top-left
    </button>
    <button is="vl-button" onclick="topRightToaster().push(newSuccessAlert());" data-cy="button-top-right">
        Top-right
    </button>
    <button is="vl-button" onclick="bottomLeftToaster().push(newSuccessAlert());" data-cy="button-bottom-left">
        Bottom-left
    </button>
    <button is="vl-button" onclick="bottomRightToaster().push(newSuccessAlert());" data-cy="button-bottom-right">
        Bottom-right
    </button>

    <br />
    <br />
    <vl-alert
        id="alert-1"
        data-vl-type="warning"
        data-vl-icon="warning"
        data-vl-title="Technische storing"
        data-vl-closable
    >
        <p>Door een technische storing is dit loket tijdelijk niet beschikbaar.</p>
    </vl-alert>
    <br />
    <vl-alert id="alert-2" data-vl-type="error" data-vl-icon="warning" data-vl-title="Error" data-vl-closable>
        <p>Er is een fout opgetreden.</p>
    </vl-alert>
    <br />
    <vl-alert id="alert-3" data-vl-type="success" data-vl-icon="check" data-vl-title="Gelukt" data-vl-closable>
        <p>Wij hebben uw melding goed ontvangen en nemen deze spoedig in behandeling.</p>
    </vl-alert>
    <br />
    <vl-alert id="alert-4" data-vl-type="cta" data-vl-icon="info" data-vl-title="Opgelet!" data-vl-closable>
        <p>U heeft geen rechten om deze actie uit te voeren. <a href="#">Vraag rechten aan</a>.</p>
        <button slot="actions" is="vl-button" id="b1">Fout melden</button>
    </vl-alert>
    <div
        id="dynamic-toaster"
        is="vl-toaster"
        ?data-vl-top-left=${topLeft}
        ?data-vl-top-right=${topRight}
        ?data-vl-bottom-left=${bottomLeft}
        ?data-vl-bottom-right=${bottomRight}
        ?data-vl-fadeout=${fadeOut}
        data-cy="dynamic-toaster"
    ></div>
    <script>
        const newWarningAlert = () => document.querySelector('#alert-1').cloneNode(true);
        const newErrorAlert = () => document.querySelector('#alert-2').cloneNode(true);
        const newSuccessAlert = () => document.querySelector('#alert-3').cloneNode(true);
        const newCtaAlert = () => document.querySelector('#alert-4').cloneNode(true);

        const topLeftToaster = () => document.querySelector('#top-left-toaster');
        const topRightToaster = () => document.querySelector('#top-right-toaster');
        const bottomLeftToaster = () => document.querySelector('#bottom-left-toaster');
        const bottomRightToaster = () => document.querySelector('#bottom-right-toaster');

        const dynamicToaster = () => document.querySelector('#dynamic-toaster');
    </script>
`;
ToasterDefault.storyName = 'vl-toaster - default';
