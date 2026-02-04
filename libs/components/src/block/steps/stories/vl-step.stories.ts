import { story } from '@resources/utils-storybook';
import { Meta } from '@storybook/web-components-vite';
import { html } from 'lit-html';
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

export const StepsToggleable = story(
    stepArgs,
    ({defaultOpen}) => html`
        <vl-steps>
            <vl-step toggleable ?default-open=${defaultOpen}>
                <span slot="icon">1</span>
                <span slot="title">Stap 1: eerste actie</span>
                <span slot="subtitle">Dit is de eerste subtitel.</span>
                <span slot="content">Dit is de eerste stap content.</span>
            </vl-step>
            <vl-step toggleable ?default-open=${defaultOpen}>
                <span slot="icon">2</span>
                <span slot="title">Stap 2: tweede actie</span>
                <span slot="subtitle">Dit is de tweede subtitel.</span>
                <span slot="content">Dit is de tweede stap content.</span>
            </vl-step>
            <vl-step toggleable ?default-open=${defaultOpen}>
                <span slot="icon">3</span>
                <span slot="title">Stap 3: derde actie</span>
                <span slot="subtitle">Dit is de derde subtitel.</span>
                <span slot="content">Dit is de derde stap content.</span>
            </vl-step>
        </vl-steps>
    `
);
StepsToggleable.storyName = 'vl-step - toggleable';

export const StepsToggleableWithContentRenderer = story(
    stepArgs,
    ({defaultOpen}) => html`
        <vl-steps>
            <vl-step
                toggleable
                ?default-open=${defaultOpen}
                .contentRenderer=${(open: boolean) => open
                    ? html`<p><strong>Open:</strong> Dit is de uitgebreide content die alleen zichtbaar is wanneer de step geopend is.</p>`
                    : html`<p><em>Gesloten:</em> Klik om meer te zien...</p>`
                }
            >
                <span slot="icon">1</span>
                <span slot="title">Stap 1: dynamische content</span>
                <span slot="subtitle">Content wijzigt op basis van open/closed state.</span>
            </vl-step>
            <vl-step
                toggleable
                ?default-open=${defaultOpen}
                .contentRenderer=${(open: boolean) => open
                    ? html`
                        <div>
                            <p>De step is nu open!</p>
                            <ul>
                                <li>Item 1</li>
                                <li>Item 2</li>
                                <li>Item 3</li>
                            </ul>
                        </div>
                    `
                    : html`<p>Samenvatting...</p>`
                }
            >
                <span slot="icon">2</span>
                <span slot="title">Stap 2: complexe content</span>
                <span slot="subtitle">Verschillende structuren per state.</span>
            </vl-step>
        </vl-steps>
    `
);
StepsToggleableWithContentRenderer.storyName = 'vl-step - toggleable with content renderer';

export const StepsStates = story(
    stepArgs,
    () => html`
        <vl-steps>
            <vl-step>
                <span slot="icon">1</span>
                <span slot="title">Stap 1: eerste actie</span>
                <span slot="subtitle">Dit is de eerste subtitel.</span>
                <span slot="content">Dit is de eerste stap content.</span>
            </vl-step>
            <vl-step type="highlighted">
                <span slot="icon">2</span>
                <span slot="title">Stap 2: tweede actie</span>
                <span slot="subtitle">Dit is de tweede subtitel.</span>
                <span slot="content">Dit is de tweede stap content.</span>
            </vl-step>
            <vl-step type="disabled">
                <span slot="icon">3</span>
                <span slot="title">Stap 3: derde actie</span>
                <span slot="subtitle">Dit is de derde subtitel.</span>
                <span slot="content">Deze stap is geannuleerd.</span>
            </vl-step>
            <vl-step type="success">
                <span slot="icon">4</span>
                <span slot="title">Stap 4: vierde actie</span>
                <span slot="subtitle">Dit is de vierde subtitel.</span>
                <span slot="content">Dit is de vierde stap content.</span>
            </vl-step>
            <vl-step type="warning">
                <span slot="icon">5</span>
                <span slot="title">Stap 5: vijfde actie</span>
                <span slot="subtitle">Dit is de vijfde subtitel.</span>
                <span slot="content">Dit is de vijfde stap content.</span>
            </vl-step>
            <vl-step type="error">
                <span slot="icon">6</span>
                <span slot="title">Stap 6: zesde actie</span>
                <span slot="subtitle">Dit is de zesde subtitel.</span>
                <span slot="content">Dit is de zesde stap content.</span>
            </vl-step>
        </vl-steps>
    `
);
StepsStates.storyName = 'vl-step - states';
StepsStates.parameters = {
    controls: {
        exclude: ['default-open'],
    },
};
