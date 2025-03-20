import { Meta } from '@storybook/web-components';
import { html } from 'lit-html';
import { story } from '@domg-wc/common-storybook';
import '../vl-cookie-consent.section';
import { cookieConsentArgs, cookieConsentArgTypes } from './vl-cookie-consent.stories-arg';
import cookieConsentDoc from './vl-cookie-consent.stories-doc.mdx';

export default {
    id: 'sections-cookie-consent',
    title: 'sections/cookie-consent',
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
    ({ analytics, autoOptInFunctionalDisabled, owner, link, matomoId, matomoUrl, onClose }) =>
        html`
            <div>
                <vl-cookie-consent
                    id="cookie-consent"
                    data-vl-analytics=${analytics}
                    data-vl-matomo-id=${matomoId}
                    data-vl-matomo-url=${matomoUrl}
                    data-vl-auto-open-disabled=""
                    ?data-vl-auto-opt-in-functional-disabled=${autoOptInFunctionalDisabled}
                    data-vl-owner=${owner}
                    data-vl-link=${link}
                    @vl-close=${onClose}
                ></vl-cookie-consent>
                <vl-button-next
                    id="button-open-cookie-consent"
                    onClick="document.querySelector('#cookie-consent').open();"
                >
                    Open cookie-consent
                </vl-button-next>
            </div>
        `
);
CookieConsentDefault.storyName = 'vl-cookie-consent - default';
