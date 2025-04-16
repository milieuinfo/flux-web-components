import { story } from '@resources/utils-storybook';
import { Meta } from '@storybook/web-components';
import { html } from 'lit-html';
import { VlProzaMessagePreloader } from '../vl-proza-message-preloader.component';
import { VlProzaMessage } from '../vl-proza-message.component';
import { prozaMessagePreloaderArgs, prozaMessagePreloaderArgTypes } from './vl-proza-message-preloader.stories-arg';
import prozaMessagePreloaderDoc from './vl-proza-message-preloader.stories-doc.mdx';
import { prozaMessageMockDomainData } from './vl-proza-message.stories-data';

export default {
    id: 'components-proza-message-preloader',
    title: 'components/proza-message-preloader',
    tags: ['autodocs'],
    args: prozaMessagePreloaderArgs,
    argTypes: prozaMessagePreloaderArgTypes,
    parameters: {
        docs: {
            page: prozaMessagePreloaderDoc,
        },
        controls: {
            hideNoControlsWarning: true,
        },
        mockData: prozaMessageMockDomainData,
    },
} as Meta<typeof prozaMessagePreloaderArgs>;

export const ProzaMessagePreloaderDefault = story(prozaMessagePreloaderArgs, () => {
    delete VlProzaMessage.__cache;
    delete VlProzaMessagePreloader.__cache;

    return html`
        <div>
            <vl-proza-message-preloader data-vl-domain="mockdomain"></vl-proza-message-preloader>
            <div class="vl-grid vl-stacked-small">
                <div class="vl-column vl-column--12">
                    <vl-title type="h6">Als een inline element:</vl-title>
                    <vl-proza-message data-vl-domain="mockdomain" data-vl-code="inline"></vl-proza-message>
                </div>
                <div class="vl-column vl-column--12">
                    <vl-title type="h6">Als een block element:</vl-title>
                    <vl-proza-message data-vl-domain="mockdomain" data-vl-code="block"></vl-proza-message>
                </div>
                <div class="vl-column vl-column--12">
                    <vl-title type="h6">In een knop:</vl-title>
                    <vl-button>
                        <vl-proza-message data-vl-domain="mockdomain" data-vl-code="action"></vl-proza-message>
                    </vl-button>
                </div>
                <div class="vl-column vl-column--12">
                    <vl-title type="h6">In een link:</vl-title>
                    <vl-link href="#" external>
                        <vl-proza-message data-vl-domain="mockdomain" data-vl-code="action"></vl-proza-message>
                    </a>
                </div>
            </div>
        </div>
    `;
});
ProzaMessagePreloaderDefault.storyName = 'vl-proza-message-preloader - default';
