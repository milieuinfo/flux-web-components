import { registerWebComponents } from '@domg-wc/common';
import { story } from '@resources/utils-storybook';
import { Meta } from '@storybook/web-components-vite';
import { html } from 'lit';
import { VlCheckboxComponent } from '../../checkbox/vl-checkbox.component';
import { VlCheckboxGroupComponent } from '../vl-checkbox-group.component';
import { checkboxGroupArgs, checkboxGroupArgTypes } from './vl-checkbox-group.stories-arg';
import checkboxGroupDoc from './vl-checkbox-group.stories-doc.mdx';

registerWebComponents([VlCheckboxComponent, VlCheckboxGroupComponent]);

export default {
    id: 'components-form-checkbox-group',
    title: 'Components - Form/checkbox-group',
    tags: ['autodocs'],
    args: checkboxGroupArgs,
    argTypes: checkboxGroupArgTypes,
    parameters: {
        docs: {
            page: checkboxGroupDoc,
        },
    },
} as Meta<typeof checkboxGroupArgs>;

export const CheckboxGroupDefault = story(
    checkboxGroupArgs,
    ({ id, required, readonly, disabled, error, success, label, name, onVlChange, onVlInput, onVlReset, onVlValid }) =>
        html`
            <vl-checkbox-group
                id=${id}
                name=${name}
                label=${label}
                ?required=${required}
                ?readonly=${readonly}
                ?disabled=${disabled}
                ?error=${error}
                ?success=${success}
                @vl-change=${onVlChange}
                @vl-input=${onVlInput}
                @vl-reset=${onVlReset}
                @vl-valid=${onVlValid}
            >
                <vl-checkbox value="fiets">Fiets</vl-checkbox>
                <vl-checkbox value="auto">Auto</vl-checkbox>
                <vl-checkbox value="bus">Bus</vl-checkbox>
            </vl-checkbox-group>
        `
);
CheckboxGroupDefault.storyName = 'vl-checkbox-group - default';
CheckboxGroupDefault.args = {
    id: 'vervoer',
    name: 'vervoer',
    label: 'Vervoersmiddel',
};
