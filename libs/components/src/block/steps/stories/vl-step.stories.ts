import { story } from '@resources/utils-storybook';
import { Meta } from '@storybook/web-components-vite';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import '../vl-steps.component';
import { stepArgs, stepArgTypes } from './vl-step.stories-arg';

export default {
    id: 'components-block-steps-step',
    title: 'Components - Block/steps/step',
    tags: ['autodocs'],
    args: stepArgs,
    argTypes: stepArgTypes,
    parameters: {
        controls: {
            hideNoControlsWarning: true,
        },
    },
} as Meta<typeof stepArgs>;

const Template = story(
    stepArgs,
    ({
        toggleable,
        defaultOpen,
        type,
        headingLevel,
        iconAriaLabel,
        timelineAriaLabel,
        line,
        timeline,
        simpleTimeline,
        lastStepNoLine,
        iconSlot,
        subIconSlot,
        titleSlot,
        titleAnnotationSlot,
        subtitleSlot,
        contentSlot,
    }) => html`
        <vl-steps
            ?line=${line}
            ?timeline=${timeline}
            ?simple-timeline=${simpleTimeline}
            ?last-step-no-line=${lastStepNoLine}
        >
            <vl-step
                ?toggleable=${toggleable}
                ?default-open=${defaultOpen}
                type=${type}
                heading-level=${headingLevel}
                icon-aria-label=${iconAriaLabel}
                timeline-aria-label=${timelineAriaLabel}
                ?line=${line}
                ?timeline=${timeline}
                ?simple-timeline=${simpleTimeline}
                ?last-step-no-line=${lastStepNoLine}
            >
                ${unsafeHTML(iconSlot)} ${unsafeHTML(subIconSlot)} ${unsafeHTML(titleSlot)}
                ${unsafeHTML(titleAnnotationSlot)} ${unsafeHTML(subtitleSlot)} ${unsafeHTML(contentSlot)}
            </vl-step>
        </vl-steps>
    `,
);

export const StepDefault = Template.bind({});
StepDefault.storyName = 'vl-step - default';
StepDefault.args = {
    iconSlot: '<span slot="icon">1</span>',
    subIconSlot: '',
    titleSlot: '<span slot="title">Stap 1: eerste actie</span>',
    titleAnnotationSlot: '<span slot="title-annotation">annotation</span>',
    subtitleSlot: '<span slot="subtitle">Dit is de eerste subtitel.</span>',
    contentSlot: '<span slot="content">Dit is de eerste stap content.</span>',
};
