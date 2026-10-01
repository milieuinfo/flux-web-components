import type { InstanceHandle } from 'figma';

/**
 * De modifier-klassen van een `.vl-group (base)`-instance, afgeleid uit haar variant (met leidende spatie).
 *
 * De base wordt nooit los gebruikt: ze zit altijd in een wrapper (.vl-group, .vl-group--column, ...) en haar
 * variant bepaalt de modifier van die groep. De templates van de base en van alle wrappers lezen de modifier
 * hieruit, zodat er maar één mapping bestaat. Ze importeren hem via `../group/vl-group-modifier.figma-util`: de
 * catalogus-sync in flux-mcp neemt enkel relatieve imports mee die met `../` beginnen.
 *
 * De "(deprecated)"-varianten zijn legacy-kopieën en leveren dezelfde klassen als hun niet-deprecated
 * tegenhanger. Modifiers die wél in vl-group.css.ts bestaan maar geen Figma-variant hebben, worden niet
 * gegenereerd: `--stretch-children` los, `--separator-row-before/-after`, `--separator-column(-before/-after)`
 * en `--collapse-l/-m/-s/-xs`.
 */
export function vlGroupModifier(base: InstanceHandle): string {
    // Een bestand met een oudere versie van de library kan de as missen; `getEnum` geeft dan een foutobject terug in
    // plaats van `undefined`.
    const modifier = base.getEnum('variant', {
        'deprecated (use default)': '',
        default: '',
        '--column (deprecated)': ' vl-group--column',
        '--column': ' vl-group--column',
        '--column + --stretch-children (deprecated)': ' vl-group--column vl-group--stretch-children',
        '--column + --stretch-children': ' vl-group--column vl-group--stretch-children',
        '--input-group (deprecated)': ' vl-group--input-group',
        '--input-group': ' vl-group--input-group',
        '--no-gap': ' vl-group--no-gap',
        '--no-row-gap': ' vl-group--no-row-gap',
        '--no-column-gap': ' vl-group--no-column-gap',
        '--wrap': ' vl-group--wrap',
        '--space-between': ' vl-group--space-between',
        '--justify-start': ' vl-group--justify-start',
        '--justify-center': ' vl-group--justify-center',
        '--justify-end': ' vl-group--justify-end',
        '--align-start': ' vl-group--align-start',
        '--align-center': ' vl-group--align-center',
        '--align-end': ' vl-group--align-end',
        '--baseline': ' vl-group--baseline',
        '--separator-row': ' vl-group--separator-row',
    });
    return typeof modifier === 'string' ? modifier : '';
}
