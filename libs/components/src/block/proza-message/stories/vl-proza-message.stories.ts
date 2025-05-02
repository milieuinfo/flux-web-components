import { story } from '@resources/utils-storybook';
import { Meta } from '@storybook/web-components';
import { html } from 'lit-html';
import { VlProzaMessage } from '../vl-proza-message.component';
import { prozaMessageArgs, prozaMessageArgTypes } from './vl-proza-message.stories-arg';
import { prozaMessageMockDomainData, prozaMessageMockDomainEditableData } from './vl-proza-message.stories-data';
import prozaMessageDoc from './vl-proza-message.stories-doc.mdx';

export default {
    id: 'components-block-proza-message',
    title: 'Components - Block/proza-message',
    tags: ['autodocs'],
    args: prozaMessageArgs,
    argTypes: prozaMessageArgTypes,
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
                <vl-proza-message domain="mockdomain" code="inline"></vl-proza-message>
            </div>
            <div class="vl-column vl-column--12">
                <vl-title type="h6">Als een block element:</vl-title>
                <vl-proza-message domain="mockdomain" code="block"></vl-proza-message>
            </div>
            <div class="vl-column vl-column--12">
                <vl-title type="h6">In een knop:</vl-title>
                <vl-button>
                    <vl-proza-message domain="mockdomain" code="action"></vl-proza-message>
                </vl-button>
            </div>
            <div class="vl-column vl-column--12">
                <vl-title type="h6">In een link:</vl-title>
                <vl-link href="#" external>
                    <vl-proza-message domain="mockdomain" code="action"></vl-proza-message>
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
                <vl-proza-message domain="mockdomaineditable" code="inline"></vl-proza-message>
            </div>
            <div class="vl-column vl-column--12">
                <vl-title type="h6">Als een block element:</vl-title>
                <vl-proza-message domain="mockdomaineditable" code="block"></vl-proza-message>
            </div>
            <div class="vl-column vl-column--12">
                <vl-title type="h6">In een knop:</vl-title>
                <vl-button>
                    <vl-proza-message domain="mockdomaineditable" code="action"></vl-proza-message>
                </vl-button>
                <vl-button secondary>
                    <vl-proza-message domain="mockdomaineditable" code="action"></vl-proza-message>
                </vl-button>
                <vl-button tertiary>
                    <vl-proza-message domain="mockdomaineditable" code="action"></vl-proza-message>
                </vl-button>
            </div>
            <div class="vl-column vl-column--12">
                <vl-title type="h6">In een link:</vl-title>
                <vl-link href="#" external>
                    <vl-proza-message domain="mockdomaineditable" code="action"></vl-proza-message>
                </a>
            </div>
        </div>
    `;
});
ProzaMessageEditable.storyName = 'vl-proza-message - editable';
