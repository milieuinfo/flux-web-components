import { story } from '@domg-wc/common-storybook';
import { registerWebComponents } from '@domg-wc/common-utilities';
import { VlLinkComponent } from '@domg-wc/components/next/link';
import { VlTitleComponent } from '@domg-wc/components/next/title';
import { VlFormLabelComponent } from '@domg-wc/form/next/form-label';
import { VlInputFieldComponent } from '@domg-wc/form/next/input-field';
import { Meta } from '@storybook/web-components';
import { html } from 'lit-html';
import '../vl-wizard-pane.component';
import '../vl-wizard.component';
import { wizardArgs, wizardArgTypes } from './vl-wizard.stories-arg';
import wizardDoc from './vl-wizard.stories-doc.mdx';
import { getWizard } from './vl-wizard.stories-util';

registerWebComponents([VlTitleComponent, VlFormLabelComponent, VlInputFieldComponent, VlLinkComponent]);

interface VlClickStepDetail {
    number: number;
    step: string;
}
interface VlClickStepEvent extends CustomEvent {
    detail: VlClickStepDetail;
}

export default {
    id: 'components-wizard-wizard',
    title: 'Components/wizard/wizard',
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
            data-vl-active-step=${activeStep}
            ?data-vl-hide-labels=${hideLabels}
            ?data-vl-numeric=${numeric}
            @vl-click-step=${(event: VlClickStepEvent) => {
                onClickStep(event.detail);
                getWizard().activeStep = event.detail.number;
            }}
        >
            <vl-title-next slot="title" type="h2">${title}</vl-title-next>
            <p slot="header">${header}</p>
            <vl-wizard-pane data-vl-name="Stap 1">
                <vl-title-next type="h3">Stap 1</vl-title-next>
                <div class="vl-grid-next vl-stacked-next-small">
                    <div class="vl-column-next vl-column-next--12">
                        <div class="vl-grid-next vl-stacked-next-small">
                            <div class="vl-column-next vl-column-next--12">
                                <vl-form-label-next for="naam" block> Naam </vl-form-label-next>
                                <vl-input-field-next id="naam" block></vl-input-field-next>
                            </div>
                        </div>
                    </div>
                    <div class="vl-column-next">
                        <vl-button-next @click=${() => (getWizard().activeStep += 1)} type="button">
                            Volgende
                        </vl-button-next>
                    </div>
                </div>
            </vl-wizard-pane>
            <vl-wizard-pane data-vl-name="Stap 2">
                <vl-title-next type="h3">Stap 2</vl-title-next>
                <div class="vl-grid-next vl-stacked-next-small">
                    <div class="vl-column-next vl-column-next--12">
                        <div class="vl-grid-next vl-stacked-next-small">
                            <div class="vl-column-next vl-column-next--12">
                                <vl-form-label-next for="years" block> Aantal jaren dienst </vl-form-label-next>
                                <vl-input-field-next id="years" block></vl-input-field-next>
                            </div>
                        </div>
                    </div>
                    <div class="vl-column-next vl-column-next--12">
                        <vl-link-next
                            @click=${() => (getWizard().activeStep -= 1)}
                            button-as-link
                            label="vorige"
                            type="button"
                            icon="arrow-left-fat"
                            icon-placement="before"
                        >
                            Vorige
                        </vl-link-next>
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
