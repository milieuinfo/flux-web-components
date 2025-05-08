import { story } from '@resources/utils-storybook';
import { Meta } from '@storybook/web-components';
import { html } from 'lit-html';
import '../vl-progress-indicator.component';
import { progressIndicatorArgs, progressIndicatorArgTypes } from './vl-progress-indicator.stories-arg';
import progressIndicatorDoc from './vl-progress-indicator.stories-doc.mdx';

export default {
    id: 'components-block-progress-indicator',
    title: 'Components - Block/progress-indicator',
    tags: ['autodocs'],
    args: progressIndicatorArgs,
    argTypes: progressIndicatorArgTypes,
    parameters: {
        docs: {
            page: progressIndicatorDoc,
        },
    },
} as Meta<typeof progressIndicatorArgs>;

const Template = story(
    progressIndicatorArgs,
    ({ activeStep, showLabels, focusOnChange, numeric, steps, onClickStep }) => html`
        <vl-progress-indicator
            active-step=${activeStep}
            ?show-labels=${showLabels}
            ?focus-on-change=${focusOnChange}
            ?numeric=${numeric}
            .steps=${steps}
            @vl-click-step=${(event: CustomEvent) => onClickStep(event.detail)}
        >
        </vl-progress-indicator>
    `
);

export const ProgressIndicatorDefault = Template.bind({});
ProgressIndicatorDefault.storyName = 'vl-progress-indicator - default';
ProgressIndicatorDefault.args = {
    steps: ['Stap 1/3: Aanvraag', 'Stap 2/3: Gegevens', 'Stap 3/3: Bevestigen'],
    activeStep: 1,
};

export const ProgressIndicatorNumeric = Template.bind({});
ProgressIndicatorNumeric.storyName = 'vl-progress-indicator - numeric';
ProgressIndicatorNumeric.args = {
    steps: ['Stap 1/3: Aanvraag', 'Stap 2/3: Gegevens', 'Stap 3/3: Bevestigen'],
    activeStep: 1,
    numeric: true,
};

export const ProgressIndicatorFocused = Template.bind({});
ProgressIndicatorFocused.storyName = 'vl-progress-indicator - focused';
ProgressIndicatorFocused.args = {
    steps: ['Stap 1/3: Aanvraag', 'Stap 2/3: Gegevens', 'Stap 3/3: Bevestigen'],
    activeStep: 1,
    focusOnChange: true,
};
