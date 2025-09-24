import { VlCheckboxComponent } from '../next/checkbox';
import { VlSelectComponent } from '../next/select';
import { VlSelectRichComponent } from '../next/select-rich';
import { VlUploadComponent } from '../next/upload';
import { FormControl } from '../next/form-control';

/**
 * Vult de form controls van de gegeven form in met de meegegeven data.
 * @param formElement
 * @param data
 */
export const setFormData = (
    formElement: HTMLFormElement,
    data: { [p: string]: FormDataEntryValue[] | File | string | boolean }
) => {
    if (!formElement) {
        return;
    }
    // voor elk key-value paar in de data map, wordt de value van de form control met die key gelijkgesteld aan de value
    Object.entries(data).forEach(([key, value]) => {
        const formControl = formElement.elements.namedItem(key);
        if (!formControl) {
            return;
        }
        if (formControl instanceof HTMLInputElement && formControl.type === 'checkbox') {
            handleVlCheckbox(formControl, value);
        } else if (formControl instanceof HTMLInputElement && formControl.type === 'file') {
            handleFileInput(formControl, value as File | File[]);
        } else if (formControl instanceof HTMLTextAreaElement) {
            formControl.value = value as string;
        } else if (formControl instanceof HTMLSelectElement) {
            formControl.value = value as string;
        } else if (formControl instanceof RadioNodeList) {
            handleRadioNodeList(formControl, value as string | string[]);
        } else if (formControl instanceof HTMLInputElement) {
            formControl.value = value as string;
        } else if (formControl instanceof FormControl) {
            handleFormControl(formControl, value);
        }
    });
};

const handleFormControl = (formControl: FormControl, value: FormDataEntryValue[] | File | string | boolean) => {
    if (formControl.validationTarget instanceof HTMLSelectElement) {
        const select = <VlSelectComponent | VlSelectRichComponent>formControl;
        handleVlSelect(select, value);
    } else if (
        formControl.validationTarget instanceof HTMLInputElement &&
        formControl.validationTarget.type === 'checkbox'
    ) {
        const checkbox = <VlCheckboxComponent>formControl;
        handleVlCheckbox(checkbox, value);
    } else if (
        formControl.validationTarget instanceof HTMLInputElement &&
        formControl.validationTarget.type === 'file'
    ) {
        const upload = <VlUploadComponent>formControl;
        upload.removeAllFiles();
        if (Array.isArray(value)) {
            value.forEach((file) => file instanceof File && upload.addFile(file));
        } else if (value instanceof File) {
            upload.addFile(value);
        }
    } else {
        formControl.setAttribute('value', <string>value);
    }
};

/**
 * Zet de value van een file input gelijk aan de meegegeven value.
 * @param upload
 * @param value
 */
const handleFileInput = (upload: HTMLInputElement, value: File | File[]) => {
    const list = new DataTransfer();
    if (Array.isArray(value)) {
        value.forEach((file) => {
            list.items.add(file as File);
        });
        upload.files = list.files;
    } else if (value instanceof File) {
        list.items.add(value as File);
        upload.files = list.files;
    }
};

/**
 * Zet de value van een RadioNodeList gelijk aan de meegegeven value.
 * @param radioNodeList
 * @param value
 */
const handleRadioNodeList = (radioNodeList: RadioNodeList, value: string | string[]) => {
    Array.from(radioNodeList).forEach((radioNode) => {
        if (radioNode instanceof HTMLInputElement) {
            const doesMatchValue = Array.isArray(value)
                ? value.includes((<any>radioNode).value)
                : (<any>radioNode).value === value;
            if (radioNode.type === 'radio' && doesMatchValue) {
                radioNode.checked = true;
            } else if (radioNode.type === 'checkbox') {
                const doesMatchValue = Array.isArray(value)
                    ? value.includes(radioNode.value)
                    : radioNode.value === value;
                if (doesMatchValue) {
                    radioNode.setAttribute('checked', '');
                } else {
                    radioNode.removeAttribute('checked');
                }
            }
        } else if (radioNode instanceof FormControl && radioNode.validationTarget instanceof HTMLInputElement) {
            if (radioNode.validationTarget.type === 'radio') {
                if (radioNode.getAttribute('value') === value) {
                    radioNode.setAttribute('checked', '');
                }
            } else if (radioNode.validationTarget.type === 'checkbox') {
                const checkbox = radioNode as unknown as VlCheckboxComponent;
                if (Array.isArray(value) && radioNode.validationTarget) {
                    if (value.some((val) => matchesStringValue(checkbox, val))) {
                        checkbox.setAttribute('checked', '');
                    } else {
                        checkbox.removeAttribute('checked');
                    }
                }
            }
        }
    });
};

/**
 * Zet de value van een select component gelijk aan de meegegeven value.
 * @param select
 * @param value
 */
const handleVlSelect = (
    select: VlSelectComponent | VlSelectRichComponent,
    value: FormDataEntryValue[] | File | string | boolean
) => {
    if (select instanceof VlSelectRichComponent) {
        select.setSelectedValues(<string | string[]>value);
    } else {
        select.setAttribute('value', <string>value);
    }
};

/**
 * controleer of de value van de checkbox overeenkomt met de value van de form data
 * @param checkbox
 * @param val
 */
const matchesStringValue = (
    checkbox: VlCheckboxComponent | HTMLInputElement,
    val: FormDataEntryValue[] | File | string | boolean
) => typeof val === 'string' && val && val === (checkbox.getAttribute('value') || 'on');

/**
 * Stelt het `checked`-attribuut van de checkbox in als de meegegeven value matcht met de value van de checkbox.
 * Daarnaast wordt de checkbox gecheckt als de value een boolean is en true is en
 * wordt de checkbox unchecked als de value een boolean is en false is.
 * @param checkbox
 * @param value
 */
const handleVlCheckbox = (
    checkbox: VlCheckboxComponent | HTMLInputElement,
    value: FormDataEntryValue[] | File | string | boolean
) => {
    if (Array.isArray(value)) {
        // in geval van een array van waarden, wordt de checkbox gecheckt als een van de waarden overeenkomt met de value van de checkbox
        if (
            value.some((v) => {
                return matchesStringValue(checkbox, v);
            })
        ) {
            checkbox.setAttribute('checked', '');
        } else {
            checkbox.removeAttribute('checked');
        }
    } else {
        // in geval van een enkele waarde, wordt de checkbox gecheckt als de value overeenkomt met de value van de checkbox
        // of als de value een boolean is en true is
        if (matchesStringValue(checkbox, value) || (typeof value === 'boolean' && value)) {
            checkbox.setAttribute('checked', '');
        } else if (typeof value === 'boolean' && !value) {
            checkbox.removeAttribute('checked');
        }
    }
};

/**
 * Splits een array op in twee arrays op basis van de meegegeven conditie.
 * @param array
 * @param predicate
 */
const partition = <T>(array: T[], predicate: (item: T) => boolean): [T[], T[]] => {
    return array.reduce(
        (acc, item) => {
            if (predicate(item)) {
                acc[0].push(item);
            } else {
                acc[1].push(item);
            }
            return acc;
        },
        [[] as T[], [] as T[]]
    );
};
