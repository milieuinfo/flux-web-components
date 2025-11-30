import { story } from '@resources/utils-storybook';
import { Meta } from '@storybook/web-components-vite';
import { html, nothing } from 'lit';
import { inputFieldMaskedArgs, inputFieldMaskedArgTypes } from './vl-input-field-masked.stories-arg';
import inputFieldMaskedDocs from './vl-input-field-masked.stories-doc.mdx';
import { VlInputFieldMaskedComponent } from '../vl-input-field-masked.component';
import { registerWebComponents } from '@domg-wc/common';
import { VlFormLabelComponent } from '../../form-label';

registerWebComponents([VlInputFieldMaskedComponent, VlFormLabelComponent]);

const CUSTOM_MASK = {
    blocks: [8, 4],
    delimiters: ['-'],
    numericOnly: true,
    numeralPositiveOnly: true,
    regex: /^[0-9]{12}$/,
};

VlInputFieldMaskedComponent.setMasks({ 'custom-mask': CUSTOM_MASK });

export default {
    id: 'components-form-input-field-masked',
    title: 'Components - Form/input-field-masked',
    tags: ['autodocs'],
    args: inputFieldMaskedArgs,
    argTypes: inputFieldMaskedArgTypes,
    parameters: {
        controls: { exclude: ['pattern', 'type'] },
        docs: {
            page: inputFieldMaskedDocs,
        },
    },
} as Meta<typeof inputFieldMaskedArgs>;

const InputFieldMaskedTemplate = story(
    inputFieldMaskedArgs,
    ({
        id,
        name,
        label,
        required,
        disabled,
        error,
        success,
        block,
        readonly,
        value,
        placeholder,
        autocomplete,
        minLength,
        maxLength,
        min,
        max,
        minExclusive,
        maxExclusive,
        mask,
        maskPrefix,
        rawValue,
        disableMaskValidation,
        regex,
        onVlChange,
        onVlInput,
        onVlReset,
        onVlValid,
    }) => {
        return html`
            <vl-input-field-masked
                id=${id}
                name=${name}
                label=${label}
                ?required=${required}
                ?disabled=${disabled}
                ?error=${error}
                ?success=${success}
                ?block=${block}
                ?readonly=${readonly}
                value=${value}
                placeholder=${placeholder}
                autocomplete=${autocomplete}
                min-length=${minLength}
                max-length=${maxLength}
                min=${min}
                max=${max}
                min-exclusive=${minExclusive}
                max-exclusive=${maxExclusive}
                mask=${mask}
                mask-prefix=${maskPrefix}
                ?raw-value=${rawValue}
                ?disable-mask-validation=${disableMaskValidation}
                .regex=${regex}
                @vl-change=${onVlChange}
                @vl-input=${onVlInput}
                @vl-reset=${onVlReset}
                @vl-valid=${onVlValid}
            ></vl-input-field-masked>
        `;
    }
);

const labelDecorator = (label: string, annotation?: string) => (story: () => unknown) =>
    html`
        <div>
            <vl-form-label for="story-input" label=${label} block></vl-form-label>
            ${story()} ${annotation ? html`<br /><vl-text annotation small>${annotation}</vl-text>` : nothing}
        </div>
    `;

export const InputFieldMaskedIban = InputFieldMaskedTemplate.bind({});
InputFieldMaskedIban.storyName = 'vl-input-field-masked - iban';
InputFieldMaskedIban.decorators = [labelDecorator('IBAN', 'bv. BE94 7310 5568 1914')];
InputFieldMaskedIban.args = {
    id: 'story-input',
    mask: 'iban',
};

export const InputFieldMaskedRrn = InputFieldMaskedTemplate.bind({});
InputFieldMaskedRrn.storyName = 'vl-input-field-masked - rrn';
InputFieldMaskedRrn.decorators = [labelDecorator('Rijkregisternummer', 'bv. 85.01.05-123.40')];
InputFieldMaskedRrn.args = {
    id: 'story-input',
    mask: 'rrn',
};

export const InputFieldMaskedUuid = InputFieldMaskedTemplate.bind({});
InputFieldMaskedUuid.storyName = 'vl-input-field-masked - uuid';
InputFieldMaskedUuid.decorators = [labelDecorator('UUID', 'bv. 234DFF23-423F-DF23-4D34-53D3296018DC')];
InputFieldMaskedUuid.args = {
    id: 'story-input',
    mask: 'uuid',
};

export const InputFieldMaskedDate = InputFieldMaskedTemplate.bind({});
InputFieldMaskedDate.storyName = 'vl-input-field-masked - date';
InputFieldMaskedDate.decorators = [labelDecorator('Date', 'bv. 21.12.2025')];
InputFieldMaskedDate.args = {
    id: 'story-input',
    mask: 'date',
};

export const InputFieldMaskedNumerical = InputFieldMaskedTemplate.bind({});
InputFieldMaskedNumerical.storyName = 'vl-input-field-masked - numerical';
InputFieldMaskedNumerical.decorators = [labelDecorator('Numerical', 'bv. 123')];
InputFieldMaskedNumerical.args = {
    id: 'story-input',
    mask: 'numerical',
};

export const InputFieldMaskedPrice = InputFieldMaskedTemplate.bind({});
InputFieldMaskedPrice.storyName = 'vl-input-field-masked - price';
InputFieldMaskedPrice.decorators = [labelDecorator('Price', 'bv. € 1.000,59')];
InputFieldMaskedPrice.args = {
    id: 'story-input',
    mask: 'price',
};

export const InputFieldMaskedPhone = InputFieldMaskedTemplate.bind({});
InputFieldMaskedPhone.storyName = 'vl-input-field-masked - phone';
InputFieldMaskedPhone.decorators = [labelDecorator('Phone', 'bv. +32 24 42 26 00')];
InputFieldMaskedPhone.args = {
    id: 'story-input',
    mask: 'phone',
};

export const InputFieldMaskedPhoneInternational = InputFieldMaskedTemplate.bind({});
InputFieldMaskedPhoneInternational.storyName = 'vl-input-field-masked - phoneinternational';
InputFieldMaskedPhoneInternational.decorators = [labelDecorator('Phone international', 'bv. 032422600')];
InputFieldMaskedPhoneInternational.args = {
    id: 'story-input',
    mask: 'phoneinternational',
};

export const InputFieldMaskedMobile = InputFieldMaskedTemplate.bind({});
InputFieldMaskedMobile.storyName = 'vl-input-field-masked - mobile';
InputFieldMaskedMobile.decorators = [labelDecorator('Mobile', 'bv. +32 478 34 23 12')];
InputFieldMaskedMobile.args = {
    id: 'story-input',
    mask: 'mobile',
};

export const InputFieldMaskedCustom = InputFieldMaskedTemplate.bind({});
InputFieldMaskedCustom.storyName = 'vl-input-field-masked - custom';
InputFieldMaskedCustom.decorators = [labelDecorator('Custom', 'bv. 5345-44523431')];
InputFieldMaskedCustom.args = {
    id: 'story-input',
    mask: 'custom-mask',
};
