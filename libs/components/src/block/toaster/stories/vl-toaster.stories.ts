import { story } from '@resources/utils-storybook';
import { registerWebComponents } from '@domg-wc/common';
import { Meta } from '@storybook/web-components';
import { html } from 'lit-html';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { VlLoaderComponent } from '../../loader';
import { VlButtonComponent } from '../../..//atom/button';
import { VlToasterComponent } from '../vl-toaster.component';
import { ToasterArgs, toasterArgs, toasterArgTypes } from './vl-toaster.stories-arg';
import toasterDoc from './vl-toaster.stories-doc.mdx';

registerWebComponents([VlButtonComponent, VlToasterComponent, VlLoaderComponent]);

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
                const template = document.querySelector('template');

                if (template && toaster) {
                    const clone = template.content.cloneNode(true);
                    const alert = clone.querySelector('#alert-success');
                    toaster.appendChild(alert);
                }
            });
        </script>
        <template>
            <vl-alert id="alert-success" type="success" icon="check" title="Gelukt" closable>
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
                    title="Foutmelding"
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
                    title: 'Technische storing',
                    icon: 'warning',
                    type: 'warning',
                    message: 'Door een technische storing is dit loket tijdelijk niet beschikbaar.',
                    closable: true,
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
                const toaster = document.querySelector('#toaster-fade-out');
                toaster.show('#alert-error');
            });
            document.querySelector('#button-loader')?.addEventListener('vl-click', () => {
                const toaster = document.querySelector('#toaster-fade-out');
                toaster.show('#alert-loader');
            });
        </script>
        <template>
            <vl-alert id="alert-error" type="error" icon="warning" title="Error">
                <p>Er is een fout opgetreden.</p>
            </vl-alert>
            <vl-alert id="alert-loader" title="Melding">
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
