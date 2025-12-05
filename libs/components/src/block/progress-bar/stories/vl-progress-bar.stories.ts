import { registerWebComponents } from '@domg-wc/common';
import { story } from '@resources/utils-storybook';
import { Meta } from '@storybook/web-components-vite';
import { html } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { VlProgressBarComponent } from '../vl-progress-bar.component';
import { progressBarArgTypes, progressBarDefaultArgs } from './vl-progress-bar.stories-arg';
import progressBarDoc from './vl-progress-bar.stories-doc.mdx';

registerWebComponents([VlProgressBarComponent]);

export default {
    id: 'components-block-progress-bar',
    title: 'Components - Block/progress-bar',
    tags: ['autodocs'],
    args: progressBarDefaultArgs,
    argTypes: progressBarArgTypes,
    parameters: {
        docs: {
            page: progressBarDoc,
        },
    },
} as Meta<typeof progressBarDefaultArgs>;

const Template = story(
    progressBarDefaultArgs,
    ({ value, indeterminate, label, labelledby, error }) => html`
        <vl-progress-bar
            value="${value}"
            label=${ifDefined(label)}
            labelledby=${ifDefined(labelledby)}
            ?indeterminate=${indeterminate}
            ?error=${error}
        ></vl-progress-bar>
    `
);

export const ProgressBarDefault = Template.bind({});
ProgressBarDefault.storyName = 'vl-progress-bar - default';
ProgressBarDefault.args = {
    label: 'Voortgang',
    value: 50,
};

export const ProgressBarIndeterminate = Template.bind({});
ProgressBarIndeterminate.storyName = 'vl-progress-bar - indeterminate';
ProgressBarIndeterminate.args = {
    indeterminate: true,
};

export const ProgressBarError = Template.bind({});
ProgressBarError.storyName = 'vl-progress-bar - error';
ProgressBarError.args = {
    error: true,
};
