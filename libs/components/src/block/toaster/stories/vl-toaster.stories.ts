import { story } from '@resources/utils-storybook';
import { registerWebComponents } from '@domg-wc/common';
import { Meta } from '@storybook/web-components-vite';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { VlLoaderComponent } from '../../loader';
import { VlModalComponent } from '../../next/modal';
import { VlButtonComponent } from '../../..//atom/button';
import { VlToasterComponent } from '../vl-toaster.component';
import { ToasterArgs, toasterArgs, toasterArgTypes } from './vl-toaster.stories-arg';
import toasterDoc from './vl-toaster.stories-doc.mdx';

registerWebComponents([VlButtonComponent, VlToasterComponent, VlLoaderComponent, VlModalComponent]);

export default {
    id: 'components-block-toaster',
    title: 'Components - Block/toaster',
    tags: ['autodocs'],
    args: toasterArgs,
    argTypes: toasterArgTypes,
    parameters: {
        contentPadding: 'large',
        docs: {
            page: toasterDoc,
            story: {
                inline: true,
            },
        },
        controls: {
            hideNoControlsWarning: true,
        },
    },
    decorators: [(story: () => unknown) => html` <div style="height: 400px;">${story()}</div>`],
} as Meta<ToasterArgs>;

export const ToasterDefault = story<ToasterArgs>(toasterArgs, ({ placement, fadeOut, defaultSlot }) => {
    return html`
        <script>
            document.querySelector('#default-toaster-button')?.addEventListener('click', () => {
                const toaster = document.querySelector('vl-toaster');
                const template = document.querySelector('template#alert-success-template');

                if (template && toaster) {
                    // gerelateerde element ophalen uit de relevante template
                    const documentFragment = template.content.cloneNode(true);
                    const alert = documentFragment.querySelector('#alert-success');
                    // het element toevogen aan de toaster
                    toaster.appendChild(alert);
                }
            });
        </script>
        <template id="alert-success-template">
            <vl-alert id="alert-success" type="success" icon="check" title-label="Gelukt" closable>
                <p>Wij hebben uw melding goed ontvangen en nemen deze spoedig in behandeling.</p>
            </vl-alert>
        </template>
        <vl-toaster id="default-toaster" placement=${placement} ?fade-out=${fadeOut}>
            ${unsafeHTML(defaultSlot)}
        </vl-toaster>
        <vl-button id="default-toaster-button"> Toon succesmelding</vl-button>
    `;
});
ToasterDefault.storyName = 'vl-toaster - default';

export const ToasterDefaultSlot = story<ToasterArgs>(toasterArgs, ({ placement, fadeOut, defaultSlot }) => {
    return html`
        <vl-toaster id="default-toaster" placement=${placement} ?fade-out=${fadeOut}>
            ${unsafeHTML(defaultSlot)}
        </vl-toaster>
    `;
});
ToasterDefaultSlot.storyName = 'vl-toaster - default slot';
ToasterDefaultSlot.args = {
    placement: 'bottom-right',
    defaultSlot: `<vl-alert
                    id="alert-default"
                    type="error"
                    icon="warning"
                    title-label="Foutmelding"
                    small
                >
                    <p>Voorwaarden niet voldaan.</p>
                </vl-alert>`,
};

export const ToasterShowAlert = story<ToasterArgs>(toasterArgs, ({ placement, fadeOut }) => {
    return html`
        <script>
            document.querySelector('#button-technical-error')?.addEventListener('vl-click', () => {
                const toaster = document.querySelector('#toaster-show-alert');
                toaster.showAlert({
                    titleLabel: 'Technische storing',
                    icon: 'warning',
                    type: 'warning',
                    message: 'Uw aanvraag is niet verwerkt.\\nFout code: 36981',
                    closable: true,
                    multiline: true,
                });
            });
        </script>
        <vl-toaster id="toaster-show-alert" ?fade-out=${fadeOut} placement=${placement}></vl-toaster>
        <vl-button id="button-technical-error"> Toon waarschuwing</vl-button>
    `;
});
ToasterShowAlert.storyName = 'vl-toaster - show alert';
ToasterShowAlert.parameters = {
    controls: {
        exclude: ['defaultSlot'],
    },
};

export const ToasterFadeOut = story<ToasterArgs>(toasterArgs, ({ placement, fadeOut, defaultSlot }) => {
    return html`
        <script>
            document.querySelector('#button-error')?.addEventListener('vl-click', () => {
                const toaster = document.querySelector('vl-toaster#toaster-fade-out');
                // toon inhoud van de gerelateerde template
                toaster?.show('#alert-error-template');
            });
            document.querySelector('#button-loader')?.addEventListener('vl-click', () => {
                const toaster = document.querySelector('vl-toaster#toaster-fade-out');
                toaster?.show('#alert-loader-template');
            });
        </script>
        <template id="alert-error-template">
            <vl-alert type="error" icon="warning" title-label="Error">
                <p>Er is een fout opgetreden.</p>
            </vl-alert>
        </template>
        <template id="alert-loader-template">
            <vl-alert title-label="Melding">
                <vl-loader></vl-loader>
            </vl-alert>
        </template>
        <vl-toaster id="toaster-fade-out" placement=${placement} ?fade-out=${fadeOut}>
            ${unsafeHTML(defaultSlot)}
        </vl-toaster>
        <vl-button id="button-error"> Toon foutmelding</vl-button>
        <vl-button id="button-loader"> Toon melding met lader</vl-button>
    `;
});
ToasterFadeOut.storyName = 'vl-toaster - fade out';
ToasterFadeOut.args = {
    fadeOut: true,
};

export const ToasterFadeOutPerToast = story<ToasterArgs>(toasterArgs, ({ placement, fadeOut, defaultSlot }) => {
    return html`
        <script>
            document.querySelector('#button-saved')?.addEventListener('vl-click', () => {
                const toaster = document.querySelector('vl-toaster#toaster-fade-out-per-toast');
                // de melding in de template heeft het fade-out attribuut
                toaster?.show('#alert-saved-template');
            });
            document.querySelector('#button-not-saved')?.addEventListener('vl-click', () => {
                const toaster = document.querySelector('vl-toaster#toaster-fade-out-per-toast');
                toaster?.showAlert(
                    {
                        titleLabel: 'Niet bewaard',
                        icon: 'warning',
                        type: 'error',
                        message: 'Uw wijzigingen zijn niet bewaard. Probeer het later opnieuw.',
                        closable: true,
                    },
                    { fadeOut: false },
                );
            });
        </script>
        <template id="alert-saved-template">
            <vl-alert fade-out type="success" icon="check" title-label="Bewaard">
                <p>Uw wijzigingen zijn bewaard.</p>
            </vl-alert>
        </template>
        <vl-toaster id="toaster-fade-out-per-toast" placement=${placement} ?fade-out=${fadeOut}>
            ${unsafeHTML(defaultSlot)}
        </vl-toaster>
        <vl-button id="button-saved"> Toon succesmelding</vl-button>
        <vl-button id="button-not-saved"> Toon foutmelding</vl-button>
    `;
});
ToasterFadeOutPerToast.storyName = 'vl-toaster - fade out per toast';

const modalStoryParameters = {
    controls: {
        exclude: ['defaultSlot'],
    },
    // eigen iframe: een open modal haalt anders ook de andere toasters van de docs-pagina naar de top layer
    docs: { story: { inline: false, height: '400px' } },
};

export const ToasterModal = story<ToasterArgs>(toasterArgs, ({ placement, fadeOut }) => {
    const showSavedAlert = () => {
        document.querySelector<VlToasterComponent>('#toaster-modal')?.showAlert({
            title: 'Bewaard',
            icon: 'check',
            type: 'success',
            message: 'Uw wijzigingen zijn bewaard.',
        });
    };

    return html`
        <vl-toaster id="toaster-modal" ?fade-out=${fadeOut} placement=${placement}></vl-toaster>
        <vl-button
            id="button-modal-open"
            modal-open="modal-toaster"
            aria-controls="modal-toaster"
            aria-haspopup="dialog"
        >
            Open modal
        </vl-button>
        <vl-modal-next id="modal-toaster" title-label="Gegevens wijzigen" not-auto-closable>
            <p slot="content">De melding van de toaster op de pagina verschijnt boven deze modal.</p>
            <vl-button id="button-modal-save" slot="button" @vl-click=${showSavedAlert}>Bewaar</vl-button>
        </vl-modal-next>
    `;
});
ToasterModal.storyName = 'vl-toaster - modal';
ToasterModal.parameters = modalStoryParameters;

export const ToasterInModal = story<ToasterArgs>(toasterArgs, ({ placement, fadeOut }) => {
    const showSavedAlert = () => {
        document.querySelector<VlToasterComponent>('#toaster-in-modal')?.showAlert({
            title: 'Bewaard',
            icon: 'check',
            type: 'success',
            message: 'Uw wijzigingen zijn bewaard.',
            closable: true,
        });
    };

    return html`
        <vl-button
            id="button-in-modal-open"
            modal-open="modal-with-toaster"
            aria-controls="modal-with-toaster"
            aria-haspopup="dialog"
        >
            Open modal
        </vl-button>
        <vl-modal-next id="modal-with-toaster" title-label="Gegevens wijzigen" not-auto-closable>
            <div slot="content">
                <p>De toaster staat in deze modal: je kan de melding sluiten.</p>
                <vl-toaster id="toaster-in-modal" ?fade-out=${fadeOut} placement=${placement}></vl-toaster>
            </div>
            <vl-button id="button-in-modal-save" slot="button" @vl-click=${showSavedAlert}>Bewaar</vl-button>
        </vl-modal-next>
    `;
});
ToasterInModal.storyName = 'vl-toaster - in modal';
ToasterInModal.parameters = modalStoryParameters;
