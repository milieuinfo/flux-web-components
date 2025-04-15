import { checkboxArgTypes } from '../../../libs/form/src/checkbox/stories/vl-checkbox.stories-arg';
import { datepickerArgTypes } from '../../../libs/form/src/datepicker/stories/vl-datepicker.stories-arg';
import { errorMessageArgTypes } from '../../../libs/form/src/error-message/stories/vl-error-message.stories-arg';
import { formLabelArgTypes } from '../../../libs/form/src/form-label/stories/vl-form-label.stories-arg';
import { inputFieldMaskedArgTypes } from '../../../libs/form/src/input-field-masked/stories/vl-input-field-masked.stories-arg';
import { inputFieldArgTypes } from '../../../libs/form/src/input-field/stories/vl-input-field.stories-arg';
import { radioGroupArgTypes } from '../../../libs/form/src/radio-group/stories/vl-radio-group.stories-arg';
import { radioArgTypes } from '../../../libs/form/src/radio-group/stories/vl-radio.stories-arg';
import { selectRichArgTypes } from '../../../libs/form/src/select-rich/stories/vl-select-rich.stories-arg';
import { selectArgTypes } from '../../../libs/form/src/select/stories/vl-select.stories-arg';
import { textareaRichArgTypes } from '../../../libs/form/src/textarea-rich/stories/vl-textarea-rich.stories-arg';
import { textareaArgTypes } from '../../../libs/form/src/textarea/stories/vl-textarea.stories-arg';
import { uploadArgTypes } from '../../../libs/form/src/upload/stories/vl-upload.stories-arg';
import { WTConfigArray } from '../web-types.model';
import { buildWTConfig } from './utils.wt-config';

export const buildWTConfigForm: WTConfigArray = [
    buildWTConfig(
        'vl-checkbox',
        checkboxArgTypes,
        '../../libs/form/src/checkbox/stories/vl-checkbox.stories-doc.mdx',
        '/docs/form-checkbox--documentatie'
    ),
    buildWTConfig(
        'vl-datepicker',
        datepickerArgTypes,
        '../../libs/form/src/datepicker/stories/vl-datepicker.stories-doc.mdx',
        '/docs/form-datepicker--documentatie'
    ),
    buildWTConfig(
        'vl-error-message',
        errorMessageArgTypes,
        '../../libs/form/src/error-message/stories/vl-error-message.stories-doc.mdx',
        '/docs/form-error-message--documentatie'
    ),
    buildWTConfig(
        'vl-form-label',
        formLabelArgTypes,
        '../../libs/form/src/form-label/stories/vl-form-label.stories-doc.mdx',
        '/docs/form-form-label--documentatie'
    ),
    buildWTConfig(
        'vl-input-field',
        inputFieldArgTypes,
        '../../libs/form/src/input-field/stories/vl-input-field.stories-doc.mdx',
        '/docs/form-input-field--documentatie'
    ),
    buildWTConfig(
        'vl-input-field-masked',
        inputFieldMaskedArgTypes,
        '../../libs/form/src/input-field-masked/stories/vl-input-field-masked.stories-doc.mdx',
        '/docs/form-input-field-masked--documentatie'
    ),
    buildWTConfig('vl-radio', radioArgTypes, null, '/docs/form-radio-group--documentatie'),
    buildWTConfig(
        'vl-radio-group',
        radioGroupArgTypes,
        '../../libs/form/src/radio-group/stories/vl-radio-group.stories-doc.mdx',
        '/docs/form-radio-group--documentatie'
    ),
    buildWTConfig(
        'vl-select',
        selectArgTypes,
        '../../libs/form/src/select/stories/vl-select.stories-doc.mdx',
        '/docs/form-select--documentatie'
    ),
    buildWTConfig(
        'vl-select-rich',
        selectRichArgTypes,
        '../../libs/form/src/select-rich/stories/vl-select-rich.stories-doc.mdx',
        '/docs/form-select-rich--documentatie'
    ),
    buildWTConfig(
        'vl-textarea',
        textareaArgTypes,
        '../../libs/form/src/textarea/stories/vl-textarea.stories-doc.mdx',
        '/docs/form-textarea--documentatie'
    ),
    buildWTConfig(
        'vl-textarea-rich',
        textareaRichArgTypes,
        '../../libs/form/src/textarea-rich/stories/vl-textarea-rich.stories-doc.mdx',
        '/docs/form-textarea-rich--documentatie'
    ),
    buildWTConfig(
        'vl-upload',
        uploadArgTypes,
        '../../libs/form/src/upload/stories/vl-upload.stories-doc.mdx',
        '/docs/form-upload--documentatie'
    ),
];
