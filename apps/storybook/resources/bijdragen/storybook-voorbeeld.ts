import { html } from 'lit-html';
import { VlProzaMessage } from '../vl-proza-message.component';
import { prozaMessageMockDomainData, prozaMessageMockDomainEditableData } from './vl-proza-message.stories-data';
import { prozaMessageArgTypes, prozaMessageArgs } from './vl-proza-message.stories-arg';
import { Meta } from '@storybook/web-components';
import prozaMessageDoc from './vl-proza-message.stories-doc.mdx';
import { story, storyArgTypes, storyArgs } from '@resources/utils-storybook';

export default {
    title: 'components/proza-message',
    args: storyArgs(prozaMessageArgs),
    argTypes: storyArgTypes(prozaMessageArgTypes),
    parameters: {
        docs: {
            page: prozaMessageDoc,
        },
        controls: {
            hideNoControlsWarning: true,
        },
        mockData: [...prozaMessageMockDomainData, ...prozaMessageMockDomainEditableData],
    },
} as Meta<typeof prozaMessageArgs>;

export const ProzaMessageDefault = story(prozaMessageArgs, () => {
    delete VlProzaMessage.__cache;

    return html`
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
                </vl-link>
            </div>
        </div>
    `;
});
ProzaMessageDefault.storyName = 'vl-proza-message - default';

export const ProzaMessageEditable = story(prozaMessageArgs, () => {
    delete VlProzaMessage.__cache;

    return html`
        <div class="vl-grid vl-stacked-small">
            <div class="vl-column vl-column--12">
                <vl-title type="h6">Als een inline element:</vl-title>
                <vl-proza-message data-vl-domain="mockdomaineditable" data-vl-code="inline"></vl-proza-message>
            </div>
            <div class="vl-column vl-column--12">
                <vl-title type="h6">Als een block element:</vl-title>
                <vl-proza-message data-vl-domain="mockdomaineditable" data-vl-code="block"></vl-proza-message>
            </div>
            <div class="vl-column vl-column--12">
                <vl-title type="h6">In een knop:</vl-title>
                <vl-button>
                    <vl-proza-message data-vl-domain="mockdomaineditable" data-vl-code="action"></vl-proza-message>
                </vl-button>
                <vl-button secondary>
                    <vl-proza-message data-vl-domain="mockdomaineditable" data-vl-code="action"></vl-proza-message>
                </vl-button>
                <vl-button tertiary>
                    <vl-proza-message data-vl-domain="mockdomaineditable" data-vl-code="action"></vl-proza-message>
                </vl-button>
            </div>
            <div class="vl-column vl-column--12">
                <vl-title type="h6">In een link:</vl-title>
                <vl-link href="#" external>
                    <vl-proza-message data-vl-domain="mockdomaineditable" data-vl-code="action"></vl-proza-message>
                <vl-link>
            </div>
        </div>
    `;
});
ProzaMessageEditable.storyName = 'vl-proza-message - editable';
