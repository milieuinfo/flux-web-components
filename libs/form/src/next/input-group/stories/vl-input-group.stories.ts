import { registerWebComponents } from '@domg-wc/common-utilities';
import { VlButtonComponent } from '@domg-wc/components/next/button';
import { Meta } from '@storybook/web-components';
import { html } from 'lit';
import { VlInputFieldComponent } from '../../input-field';
import vlInputGroupStoriesDoc from './vl-input-group.stories-doc.mdx';

registerWebComponents([VlButtonComponent, VlInputFieldComponent]);

export default {
    id: 'form-next-input-group',
    title: 'Form-next/input-group',
    tags: ['autodocs'],
    parameters: {
        docs: {
            page: vlInputGroupStoriesDoc,
        },
    },
} as Meta;

export const InputGroupButtonLeft = () => html` <div class="vl-group-next vl-group-next--input-group">
    <vl-button-next input-group>Locatie kiezen</vl-button-next>
    <vl-input-field-next input-group></vl-input-field-next>
</div>`;
InputGroupButtonLeft.storyName = 'input-group - button left';

export const InputGroupButtonRight = () => html` <div class="vl-group-next vl-group-next--input-group">
    <vl-input-field-next input-group block></vl-input-field-next>
    <vl-button-next input-group>Locatie kiezen</vl-button-next>
</div>`;
InputGroupButtonRight.storyName = 'input-group - button right';

export const InputGroupIconLeft = () => html` <div class="vl-group-next vl-group-next--input-group">
    <vl-button-next input-group icon="location"></vl-button-next>
    <vl-input-field-next input-group block></vl-input-field-next>
</div>`;
InputGroupIconLeft.storyName = 'input-group - icon left';

export const InputGroupIconRight = () => html` <div class="vl-group-next vl-group-next--input-group">
    <vl-input-field-next input-group></vl-input-field-next>
    <vl-button-next input-group icon="location" tertiary></vl-button-next>
</div>`;
InputGroupIconRight.storyName = 'input-group - icon right';
