import { extractStoriesArgTypes, extractWTConfigArgTypes } from './extract-argtypes';

// argTypes die bewust niet rechtstreeks aan een web-type gekoppeld zijn
const argTypesIgnore = [
    'components/src/form/form-control/stories/form-control.stories-arg.ts#formControlArgTypes', // basis voor de form componenten
    'map/src/components/layer/stories/vl-map-layer.stories-arg.ts#mapLayerArgTypes', // basis voor de map layers
];

const storiesArgTypes = extractStoriesArgTypes();
const wtConfigArgTypes = extractWTConfigArgTypes();

describe('jest - generate-web-types - web-types-argtypes', () => {
    it('valideer dat elke argTypes uit een stories-arg aan een web-type gekoppeld is', () => {
        const argTypesWithoutWT = storiesArgTypes.filter(
            (argTypes) => !argTypesIgnore.includes(argTypes) && !wtConfigArgTypes.includes(argTypes),
        );
        expect(argTypesWithoutWT).toStrictEqual([]);
    });
    it('valideer dat de ignore-lijst enkel bestaande argTypes bevat', () => {
        const argTypesIgnoreNotFound = argTypesIgnore.filter((argTypes) => !storiesArgTypes.includes(argTypes));
        expect(argTypesIgnoreNotFound).toStrictEqual([]);
    });
});
