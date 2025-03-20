import { story } from '@domg-wc/common-storybook';
import { Meta } from '@storybook/web-components';
import { html } from 'lit-html';
import { VlProzaMessage } from '../vl-proza-message.component';
import { prozaMessageArgs, prozaMessageArgTypes } from './vl-proza-message.stories-arg';
import { prozaMessageMockDomainData, prozaMessageMockDomainEditableData } from './vl-proza-message.stories-data';
import prozaMessageDoc from './vl-proza-message.stories-doc.mdx';

export default {
    id: 'components-proza-message',
    title: 'components/proza-message',
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
        <div class="vl-grid-next vl-stacked-next-small">
            <div class="vl-column-next vl-column-next--12">
                <vl-title-next type="h6">Als een inline element:</vl-title-next>
                <vl-proza-message data-vl-domain="mockdomain" data-vl-code="inline"></vl-proza-message>
            </div>
            <div class="vl-column-next vl-column-next--12">
                <vl-title-next type="h6">Als een block element:</vl-title-next>
                <vl-proza-message data-vl-domain="mockdomain" data-vl-code="block"></vl-proza-message>
            </div>
            <div class="vl-column-next vl-column-next--12">
                <vl-title-next type="h6">In een knop:</vl-title-next>
                <vl-button-next>
                    <vl-proza-message data-vl-domain="mockdomain" data-vl-code="action"></vl-proza-message>
                </vl-button-next>
            </div>
            <div class="vl-column-next vl-column-next--12">
                <vl-title-next type="h6">In een link:</vl-title-next>
                <vl-link-next href="#" external>
                    <vl-proza-message data-vl-domain="mockdomain" data-vl-code="action"></vl-proza-message>
                </vl-link-next>
            </div>
        </div>
    `;
});
ProzaMessageDefault.storyName = 'vl-proza-message - default';

export const ProzaMessageEditable = story(prozaMessageArgs, () => {
    delete VlProzaMessage.__cache;

    return html`
        <div class="vl-grid-next vl-stacked-next-small">
            <div class="vl-column-next vl-column-next--12">
                <vl-title-next type="h6">Als een inline element:</vl-title-next>
                <vl-proza-message data-vl-domain="mockdomaineditable" data-vl-code="inline"></vl-proza-message>
            </div>
            <div class="vl-column-next vl-column-next--12">
                <vl-title-next type="h6">Als een block element:</vl-title-next>
                <vl-proza-message data-vl-domain="mockdomaineditable" data-vl-code="block"></vl-proza-message>
            </div>
            <div class="vl-column-next vl-column-next--12">
                <vl-title-next type="h6">In een knop:</vl-title-next>
                <vl-button-next>
                    <vl-proza-message data-vl-domain="mockdomaineditable" data-vl-code="action"></vl-proza-message>
                </vl-button-next>
                <button is="vl-button" data-vl-secondary>
                    <vl-proza-message data-vl-domain="mockdomaineditable" data-vl-code="action"></vl-proza-message>
                </button>
                <button is="vl-button" data-vl-tertiary>
                    <vl-proza-message data-vl-domain="mockdomaineditable" data-vl-code="action"></vl-proza-message>
                </button>
            </div>
            <div class="vl-column-next vl-column-next--12">
                <vl-title-next type="h6">In een link:</vl-title-next>
                <vl-link-next href="#" external>
                    <vl-proza-message data-vl-domain="mockdomaineditable" data-vl-code="action"></vl-proza-message>
                </a>
            </div>
        </div>
    `;
});
ProzaMessageEditable.storyName = 'vl-proza-message - editable';
