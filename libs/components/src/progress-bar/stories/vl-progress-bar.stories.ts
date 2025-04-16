import { story } from '@resources/utils-storybook';
import { Meta } from '@storybook/web-components';
import { html } from 'lit-html';
import '../vl-progress-bar.component';
import { progressBarArgs, progressBarArgTypes } from './vl-progress-bar.stories-arg';
import progressBarDoc from './vl-progress-bar.stories-doc.mdx';

export default {
    id: 'components-progress-bar',
    title: 'Components/progress-bar',
    tags: ['autodocs'],
    args: progressBarArgs,
    argTypes: progressBarArgTypes,
    parameters: {
        docs: {
            page: progressBarDoc,
        },
    },
} as Meta<typeof progressBarArgs>;

const Template = story(
    progressBarArgs,
    ({ activeStep, showLabels, focusOnChange, numeric, steps, onClickStep }) => html`
        <vl-progress-bar
            data-vl-active-step=${activeStep}
            ?data-vl-show-labels=${showLabels}
            ?data-vl-focus-on-change=${focusOnChange}
            ?data-vl-numeric=${numeric}
            .steps=${steps}
            @vl-click-step=${(event: CustomEvent) => onClickStep(event.detail)}
        >
        </vl-progress-bar>
    `
);

export const ProgressBarDefault = Template.bind({});
ProgressBarDefault.storyName = 'vl-progress-bar - default';
ProgressBarDefault.args = {
    steps: ['Stap 1/3: Aanvraag', 'Stap 2/3: Gegevens', 'Stap 3/3: Bevestigen'],
    activeStep: 1,
};

export const ProgressBarNumeric = Template.bind({});
ProgressBarNumeric.storyName = 'vl-progress-bar - numeric';
ProgressBarNumeric.args = {
    steps: ['Stap 1/3: Aanvraag', 'Stap 2/3: Gegevens', 'Stap 3/3: Bevestigen'],
    activeStep: 1,
    numeric: true,
};

export const ProgressBarFocused = Template.bind({});
ProgressBarFocused.storyName = 'vl-progress-bar - focused';
ProgressBarFocused.args = {
    steps: ['Stap 1/3: Aanvraag', 'Stap 2/3: Gegevens', 'Stap 3/3: Bevestigen'],
    activeStep: 1,
    focusOnChange: true,
};
