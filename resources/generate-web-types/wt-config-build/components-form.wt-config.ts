import { checkboxArgTypes } from '../../../libs/components/src/form/checkbox/stories/vl-checkbox.stories-arg';
import { datepickerArgTypes } from '../../../libs/components/src/form/datepicker/stories/vl-datepicker.stories-arg';
import { fieldsetArgTypes } from '../../../libs/components/src/form/fieldset/stories/vl-fieldset.stories-arg';
import { formLabelArgTypes } from '../../../libs/components/src/form/form-label/stories/vl-form-label.stories-arg';
import { formMessageArgTypes } from '../../../libs/components/src/form/form-message/stories/vl-form-message.stories-arg';
import { inputFieldMaskedArgTypes } from '../../../libs/components/src/form/input-field-masked/stories/vl-input-field-masked.stories-arg';
import { inputFieldArgTypes } from '../../../libs/components/src/form/input-field/stories/vl-input-field.stories-arg';
import { radioGroupArgTypes } from '../../../libs/components/src/form/radio-group/stories/vl-radio-group.stories-arg';
import { radioArgTypes } from '../../../libs/components/src/form/radio-group/stories/vl-radio.stories-arg';
import { selectRichArgTypes } from '../../../libs/components/src/form/select-rich/stories/vl-select-rich.stories-arg';
import { selectArgTypes } from '../../../libs/components/src/form/select/stories/vl-select.stories-arg';
import { textareaRichArgTypes } from '../../../libs/components/src/form/textarea-rich/stories/vl-textarea-rich.stories-arg';
import { textareaArgTypes } from '../../../libs/components/src/form/textarea/stories/vl-textarea.stories-arg';
import { uploadArgTypes } from '../../../libs/components/src/form/upload/stories/vl-upload.stories-arg';
import { WTConfigArray } from '../web-types.model';
import { buildWTConfig } from './utils.wt-config';

export const buildWTConfigComponentsForm: WTConfigArray = [
    buildWTConfig(
        'vl-checkbox',
        checkboxArgTypes,
        '../../libs/components/src/form/checkbox/stories/vl-checkbox.stories-doc.mdx',
        '/docs/components-form-checkbox--documentatie'
    ),
    buildWTConfig(
        'vl-datepicker',
        datepickerArgTypes,
        '../../libs/components/src/form/datepicker/stories/vl-datepicker.stories-doc.mdx',
        '/docs/components-form-datepicker--documentatie'
    ),
    buildWTConfig(
        'vl-fieldset',
        fieldsetArgTypes,
        '../../libs/components/src/form/fieldset/stories/vl-fieldset.stories-doc.mdx',
        '/docs/components-form-fieldset--documentatie'
    ),
    buildWTConfig(
        'vl-form-message',
        formMessageArgTypes,
        '../../libs/components/src/form/form-message/stories/vl-form-message.stories-doc.mdx',
        '/docs/components-form-form-message--documentatie'
    ),
    buildWTConfig(
        'vl-form-label',
        formLabelArgTypes,
        '../../libs/components/src/form/form-label/stories/vl-form-label.stories-doc.mdx',
        '/docs/components-form-form-label--documentatie'
    ),
    buildWTConfig(
        'vl-input-field',
        inputFieldArgTypes,
        '../../libs/components/src/form/input-field/stories/vl-input-field.stories-doc.mdx',
        '/docs/components-form-input-field--documentatie'
    ),
    buildWTConfig(
        'vl-input-field-masked',
        inputFieldMaskedArgTypes,
        '../../libs/components/src/form/input-field-masked/stories/vl-input-field-masked.stories-doc.mdx',
        '/docs/components-form-input-field-masked--documentatie'
    ),
    buildWTConfig('vl-radio', radioArgTypes, null, '/docs/components-form-radio-group--documentatie'),
    buildWTConfig(
        'vl-radio-group',
        radioGroupArgTypes,
        '../../libs/components/src/form/radio-group/stories/vl-radio-group.stories-doc.mdx',
        '/docs/components-form-radio-group--documentatie'
    ),
    buildWTConfig(
        'vl-select',
        selectArgTypes,
        '../../libs/components/src/form/select/stories/vl-select.stories-doc.mdx',
        '/docs/components-form-select--documentatie'
    ),
    buildWTConfig(
        'vl-select-rich',
        selectRichArgTypes,
        '../../libs/components/src/form/select-rich/stories/vl-select-rich.stories-doc.mdx',
        '/docs/components-form-select-rich--documentatie'
    ),
    buildWTConfig(
        'vl-textarea',
        textareaArgTypes,
        '../../libs/components/src/form/textarea/stories/vl-textarea.stories-doc.mdx',
        '/docs/components-form-textarea--documentatie'
    ),
    buildWTConfig(
        'vl-textarea-rich',
        textareaRichArgTypes,
        '../../libs/components/src/form/textarea-rich/stories/vl-textarea-rich.stories-doc.mdx',
        '/docs/components-form-textarea-rich--documentatie'
    ),
    buildWTConfig(
        'vl-upload',
        uploadArgTypes,
        '../../libs/components/src/form/upload/stories/vl-upload.stories-doc.mdx',
        '/docs/components-form-upload--documentatie'
    ),
];
