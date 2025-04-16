import { registerWebComponents } from '@domg-wc/common';
import { VlButtonComponent } from '@domg-wc/components';
import { Meta } from '@storybook/web-components';
import { html } from 'lit';
import { VlInputFieldComponent } from '../../input-field';
import vlInputGroupStoriesDoc from './vl-input-group.stories-doc.mdx';

registerWebComponents([VlButtonComponent, VlInputFieldComponent]);

export default {
    id: 'form-input-group',
    title: 'Form/input-group',
    tags: ['autodocs'],
    parameters: {
        docs: {
            page: vlInputGroupStoriesDoc,
        },
    },
} as Meta;

export const InputGroupButtonLeft = () => html` <div class="vl-group vl-group--input-group">
    <vl-button input-group>Locatie kiezen</vl-button>
    <vl-input-field input-group></vl-input-field>
</div>`;
InputGroupButtonLeft.storyName = 'input-group - button left';

export const InputGroupButtonRight = () => html` <div class="vl-group vl-group--input-group">
    <vl-input-field input-group block></vl-input-field>
    <vl-button input-group>Locatie kiezen</vl-button>
</div>`;
InputGroupButtonRight.storyName = 'input-group - button right';

export const InputGroupIconLeft = () => html` <div class="vl-group vl-group--input-group">
    <vl-button input-group icon="location"></vl-button>
    <vl-input-field input-group block></vl-input-field>
</div>`;
InputGroupIconLeft.storyName = 'input-group - icon left';

export const InputGroupIconRight = () => html` <div class="vl-group vl-group--input-group">
    <vl-input-field input-group></vl-input-field>
    <vl-button input-group icon="location" tertiary></vl-button>
</div>`;
InputGroupIconRight.storyName = 'input-group - icon right';
