import { story } from '@resources/utils-storybook';
import type { Meta } from '@storybook/web-components';
import { html } from 'lit-html';
import '../vl-wizard-pane.component';
import '../vl-wizard.component';
import { wizardPaneArgs, wizardPaneArgTypes } from './vl-wizard-pane.stories-arg';
import wizardPaneDoc from './vl-wizard-pane.stories-doc.mdx';

export default {
    id: 'components-wizard-wizard-pane',
    title: 'Components/wizard/wizard-pane',
    tags: ['autodocs'],
    args: wizardPaneArgs,
    argTypes: wizardPaneArgTypes,
    parameters: {
        docs: {
            page: wizardPaneDoc,
        },
    },
} as Meta<typeof wizardPaneArgs>;

export const WizardPaneDefault = story(
    wizardPaneArgs,
    ({ name }) => html`
        <div style="max-width: 780px">
            <vl-wizard>
                <vl-wizard-pane name=${name}><p>Pane content</p></vl-wizard-pane>
            </vl-wizard>
        </div>
    `
);
WizardPaneDefault.storyName = 'vl-wizard-pane - default';
WizardPaneDefault.args = {
    name: 'Stap 1',
};
