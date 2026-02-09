import { Meta } from '@storybook/web-components-vite';
import { html } from 'lit-html';
import { story } from '@resources/utils-storybook';
import '../vl-cookie-consent.component';
import { cookieConsentArgs, cookieConsentArgTypes } from './vl-cookie-consent.stories-arg';
import cookieConsentDoc from './vl-cookie-consent.stories-doc.mdx';

export default {
    id: 'components-compliance-cookie-consent',
    title: 'Components - Compliance/cookie-consent',
    tags: ['autodocs'],
    args: cookieConsentArgs,
    argTypes: cookieConsentArgTypes,
    parameters: {
        layout: 'fullscreen',
        docs: {
            page: cookieConsentDoc,
        },
    },
} as Meta<typeof cookieConsentArgs>;

export const CookieConsentDefault = story(
    cookieConsentArgs,
    ({ analytics, autoOptInFunctionalDisabled, owner, link, matomoId, matomoUrl, onClose }) => {
        const handleOpenClick = () => {
            document.querySelector<any>('#cookie-consent')?.open();
        };

        return html`
            <div>
                <vl-cookie-consent
                    id="cookie-consent"
                    analytics=${analytics}
                    matomo-id=${matomoId}
                    matomo-url=${matomoUrl}
                    auto-open-disabled=""
                    ?auto-opt-in-functional-disabled=${autoOptInFunctionalDisabled}
                    owner=${owner}
                    link=${link}
                    @vl-close=${onClose}
                ></vl-cookie-consent>
                <vl-button id="button-open-cookie-consent" @click=${handleOpenClick}>
                    Open cookie-consent
                </vl-button>
            </div>
        `;
    }
);
CookieConsentDefault.storyName = 'vl-cookie-consent - default';
