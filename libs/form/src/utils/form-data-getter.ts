/**
 * Haalt de form data op van een form element en zet deze om naar een object.
 * Als een form control meerdere waarden kan hebben, dan wordt deze omgezet naar een array van waarden.
 * @param formElement
 * multiFormControlNames: een array van form control names waarvoor een array van waarden moet worden aangemaakt
 * optioneel, als deze parameter niet wordt meegegeven, dan wordt er gezocht naar alle form controls die meerdere waarden kunnen hebben
 * meer specifiek, form controls waarvan:
 *  - het name attribuut meerdere keren voorkomt
 *  - het multiple attribuut aanwezig is
 * @param multiFormControlNames
 */
export const parseFormData = <T = { [key: string]: FormDataEntryValue[] | File | string }>(
    formElement: HTMLFormElement,
    multiFormControlNames?: string[]
): T | null => {
    if (!formElement) {
        return null;
    }
    const data = new FormData(formElement);
    // alle form controls die een array van waarden moeten geven
    // Form controls met dezelfde name attribuut worden samengevoegd in een array
    const duplicateNames = Array.from(formElement.elements)
        .filter((el) => !(el instanceof HTMLInputElement && el.type === 'radio') && el.hasAttribute('name'))
        .map((el) => el.getAttribute('name'))
        .filter((name, index, names) => names.indexOf(name) !== index);
    const multipleFormControlKeys = Array.from(formElement.elements)
        .filter((element) => element.hasAttribute('multiple'))
        .map((el) => el.getAttribute('name'));
    const multipleValueFormControls = multiFormControlNames
        ? multiFormControlNames
        : Array.from(new Set([...duplicateNames, ...multipleFormControlKeys]));
    // als de form data voor een bepaalde key meerdere waarden bevat, dan wordt deze key in de data map vervangen door een array van waarden
    return Array.from(data.keys()).reduce(
        (result, key) => ({
            ...result,
            [key]: multipleValueFormControls.includes(key) ? data.getAll(key) : data.get(key),
        }),
        <T>{}
    );
};
