import { registerWebComponents } from '@domg-wc/common';
import { Meta } from '@storybook/web-components';
import { html } from 'lit';
import { VlInputFieldComponent } from '../../input-field';
import vlInputGroupStoriesDoc from './vl-input-group.stories-doc.mdx';
import { VlButtonComponent } from '../../../atom/button';

registerWebComponents([VlButtonComponent, VlInputFieldComponent]);

export default {
    id: 'components-form-input-group',
    title: 'Components - Form/input-group',
    tags: ['autodocs'],
    parameters: {
        docs: {
            page: vlInputGroupStoriesDoc,
        },
    },
} as Meta;

export const InputGroupButtonLeft = () => html`
    <div class="vl-group vl-group--input-group">
        <vl-button input-group label="locatie kiezen">Locatie kiezen</vl-button>
        <vl-input-field input-group label="locatie ingave"></vl-input-field>
    </div>
`;
InputGroupButtonLeft.storyName = 'input-group - button left';

export const InputGroupButtonRight = () => html`
    <div class="vl-group vl-group--input-group">
        <vl-input-field input-group block label="locatie ingave"></vl-input-field>
        <vl-button input-group label="locatie kiezen">Locatie kiezen</vl-button>
    </div>
`;
InputGroupButtonRight.storyName = 'input-group - button right';

export const InputGroupIconLeft = () => html`
    <div class="vl-group vl-group--input-group">
        <vl-button input-group icon="location" label="locatie kiezen"></vl-button>
        <vl-input-field input-group block label="locatie ingave"></vl-input-field>
    </div>
`;
InputGroupIconLeft.storyName = 'input-group - icon left';

export const InputGroupIconRight = () => html`
    <div class="vl-group vl-group--input-group">
        <vl-input-field input-group label="locatie ingave"></vl-input-field>
        <vl-button input-group icon="location" tertiary label="locatie kiezen"></vl-button>
    </div>
`;
InputGroupIconRight.storyName = 'input-group - icon right';
