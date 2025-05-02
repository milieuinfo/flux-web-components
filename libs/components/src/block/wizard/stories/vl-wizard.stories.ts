import { registerWebComponents } from '@domg-wc/common';
import { story } from '@resources/utils-storybook';
import { Meta } from '@storybook/web-components';
import { html } from 'lit-html';
import '../vl-wizard-pane.component';
import '../vl-wizard.component';
import { VlLinkComponent } from '../../../atom/link';
import { VlTitleComponent } from '../../../atom/title';
import { wizardArgs, wizardArgTypes } from './vl-wizard.stories-arg';
import wizardDoc from './vl-wizard.stories-doc.mdx';
import { getWizard } from './vl-wizard.stories-util';
import { VlFormLabelComponent } from '../../../form/form-label';
import { VlInputFieldComponent } from '../../../form/input-field';

registerWebComponents([VlTitleComponent, VlFormLabelComponent, VlInputFieldComponent, VlLinkComponent]);

interface VlClickStepDetail {
    number: number;
    step: string;
}

interface VlClickStepEvent extends CustomEvent {
    detail: VlClickStepDetail;
}

export default {
    id: 'components-block-wizard-wizard',
    title: 'Components - Block/wizard/wizard',
    tags: ['autodocs'],
    args: wizardArgs,
    argTypes: wizardArgTypes,
    parameters: {
        docs: {
            page: wizardDoc,
        },
    },
} as Meta<typeof wizardArgs>;

export const WizardDefault = story(
    wizardArgs,
    ({ activeStep, hideLabels, title, header, onClickStep, numeric }: typeof wizardArgs) => html` <div
        style="max-width: 780px;"
    >
        <vl-wizard
            active-step=${activeStep}
            ?hide-labels=${hideLabels}
            ?numeric=${numeric}
            @vl-click-step=${(event: VlClickStepEvent) => {
                onClickStep(event.detail);
                getWizard().activeStep = event.detail.number;
            }}
        >
            <vl-title slot="title" type="h2">${title}</vl-title>
            <p slot="header">${header}</p>
            <vl-wizard-pane name="Stap 1">
                <vl-title type="h3">Stap 1</vl-title>
                <div class="vl-grid vl-stacked-small">
                    <div class="vl-column vl-column--12">
                        <div class="vl-grid vl-stacked-small">
                            <div class="vl-column vl-column--12">
                                <vl-form-label for="naam" block> Naam</vl-form-label>
                                <vl-input-field id="naam" block></vl-input-field>
                            </div>
                        </div>
                    </div>
                    <div class="vl-column">
                        <vl-button @click=${() => (getWizard().activeStep += 1)} type="button"> Volgende</vl-button>
                    </div>
                </div>
            </vl-wizard-pane>
            <vl-wizard-pane name="Stap 2">
                <vl-title type="h3">Stap 2</vl-title>
                <div class="vl-grid vl-stacked-small">
                    <div class="vl-column vl-column--12">
                        <div class="vl-grid vl-stacked-small">
                            <div class="vl-column vl-column--12">
                                <vl-form-label for="years" block> Aantal jaren dienst</vl-form-label>
                                <vl-input-field id="years" block></vl-input-field>
                            </div>
                        </div>
                    </div>
                    <div class="vl-column vl-column--12">
                        <vl-link
                            @click=${() => (getWizard().activeStep -= 1)}
                            button-as-link
                            label="vorige"
                            type="button"
                            icon="arrow-left-fat"
                            icon-placement="before"
                        >
                            Vorige
                        </vl-link>
                    </div>
                </div>
            </vl-wizard-pane>
        </vl-wizard>
    </div>`
);
WizardDefault.storyName = 'vl-wizard - default';
WizardDefault.args = {
    activeStep: 1,
    title: 'Wizard title',
    header: "You're a wizard Harry",
};
