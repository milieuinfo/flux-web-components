/**
 * De attributen per tag uit de argTypes van de stories, via dezelfde koppeling tag → argTypes als de web-types
 * generator (resources/generate-web-types/wt-config-build). De gegenereerde web-types komen daar later in de
 * pipeline uit en kunnen achterlopen; de argTypes zijn de bron.
 *
 * Importeert de stories-arg bestanden, dus vraagt de paden uit tsconfig.base.json (`tsx --tsconfig ...`).
 */
import { CATEGORIES } from '@resources/utils-storybook';
import { WTConfigArray } from '../generate-web-types/web-types.model';
import { buildWTConfigComponentsAtom } from '../generate-web-types/wt-config-build/components-atom.wt-config';
import { buildWTConfigComponentsBlock } from '../generate-web-types/wt-config-build/components-block.wt-config';
import { buildWTConfigComponentsCompliance } from '../generate-web-types/wt-config-build/components-compliance.wt-config';
import { buildWTConfigComponentsForm } from '../generate-web-types/wt-config-build/components-form.wt-config';
import { buildWTConfigMap } from '../generate-web-types/wt-config-build/map.wt-config';
import { buildWTConfigStructures } from '../generate-web-types/wt-config-build/structures.wt-config';

const CONFIGS: WTConfigArray = [
    ...buildWTConfigComponentsAtom,
    ...buildWTConfigComponentsBlock,
    ...buildWTConfigComponentsCompliance,
    ...buildWTConfigComponentsForm,
    ...buildWTConfigMap,
    ...buildWTConfigStructures,
];

/**
 * Per tag de namen van de argTypes in de categorie attributen, zoals de generator ze in de web-types zet. Een naam
 * met een toelichting erin, zoals `content (for demo purposes)`, is geen attribuut en telt niet mee.
 */
export function readArgTypeAttributes(): Map<string, Set<string>> {
    const perTag = new Map<string, Set<string>>();
    for (const { componentName, argTypes } of CONFIGS) {
        const attributes = perTag.get(componentName) ?? new Set<string>();
        for (const argType of Object.values(argTypes ?? {})) {
            if (argType?.table?.category !== CATEGORIES.ATTRIBUTES) continue;
            if (/^[a-zA-Z][a-zA-Z0-9-]*$/.test(argType.name ?? '')) attributes.add(argType.name);
        }
        perTag.set(componentName, attributes);
    }
    return perTag;
}
