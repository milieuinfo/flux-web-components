// De categorieën waarop het Jenkins testrapport groepeert, en de regel die een classname erop splitst.
//
// Jenkins knipt het classname-attribuut uit de JUnit XML op de LAATSTE punt: alles ervóór wordt het pakket, alles
// erna de klasse. Zonder punt belandt een test in het pakket '(root)'. Onze describe-titels bevatten geen punten,
// dus zou alles in één (root)-bak van ~3000 tests terechtkomen.
//
// Onze titels hebben de vorm '<runner> - <categorie> - <rest>'. splitClassname() zet een punt na de categorie,
// zodat de categorie het pakket wordt en de rest de klasse:
//
//   cypress-component - block components - vl-button - cta-link
//   -> cypress-component - block components.vl-button - cta-link
//
// Deze lijst is de enige bron van waarheid. Een nieuwe categorie moet hier bij, anders valt hij terug in (root) -
// wat meteen het signaal is dat er iets hernoemd of toegevoegd moet worden.

export const TEST_CATEGORIES = [
    'cypress-component - atom components',
    'cypress-component - base styles',
    'cypress-component - block components',
    'cypress-component - common',
    'cypress-component - compliance components',
    'cypress-component - form components',
    'cypress-component - integrations',
    'cypress-component - layout styles',
    'cypress-component - map',
    'cypress-e2e - atom components',
    'cypress-e2e - block components',
    'cypress-e2e - compliance components',
    'cypress-e2e - consumer app',
    'cypress-e2e - form components',
    'cypress-e2e - integrator app',
    'cypress-e2e - layout',
    'cypress-e2e - map',
    'cypress-e2e - patronen',
    'cypress-e2e - styles',
    'jest - common',
    'jest - components',
    'jest - map',
];

// Langste match wint: zo blijft de lijst uitbreidbaar met een categorie die met een bestaande begint.
const findCategory = (value) =>
    TEST_CATEGORIES.filter((category) => value === category || value.startsWith(`${category} - `)).sort(
        (a, b) => b.length - a.length
    )[0];

// Een classname die al gesplitst is, mag een tweede run niet nog eens splitsen: de punt die wij zetten zou dan als
// variant-scheiding gelezen worden ('cypress-component - map' + '.' + rest).
const isAlreadySplit = (value) =>
    TEST_CATEGORIES.some((category) => {
        if (!value.startsWith(category)) return false;

        const rest = value.slice(category.length);
        return rest.startsWith('.') || /^ \([^)]*\)\./.test(rest);
    });

/**
 * Splitst een classname in '<categorie>.<rest>'.
 *
 * Een variant-prefix (de jenkinsClassnamePrefix uit cypress.config.ts, bv. 'firefox.') wordt verplaatst naar een
 * achtervoegsel op het pakket: 'firefox.cypress-component - form components - vl-datepicker' wordt
 * 'cypress-component - form components (firefox).vl-datepicker'. De variant blijft zo herkenbaar zonder een extra
 * laag boven de categorieën te maken. De regel is generiek, dus een toekomstige 'webkit'-variant werkt vanzelf.
 *
 * @returns {{ classname: string, status: string, category?: string }} status is 'gesplitst', 'ongewijzigd'
 *          (was al gesplitst), 'onbekende-categorie' of 'geen-rest'. Bij alles behalve 'gesplitst' blijft de
 *          classname onaangeroerd.
 */
export const splitClassname = (classname) => {
    if (isAlreadySplit(classname)) return { classname, status: 'ongewijzigd' };

    let variant;
    let value = classname;

    // enkel als wat ná de punt komt met een bekende categorie begint, is dit echt een variant-prefix
    const variantMatch = classname.match(/^([^.]+)\.(.+)$/);
    if (variantMatch && findCategory(variantMatch[2])) {
        variant = variantMatch[1];
        value = variantMatch[2];
    }

    const category = findCategory(value);
    if (!category) return { classname, status: 'onbekende-categorie' };

    const rest = value.slice(category.length).replace(/^ - /, '');
    // een titel die exact de categorie is, houdt geen klasse-deel over
    if (!rest) return { classname, status: 'geen-rest', category };

    const pakket = variant ? `${category} (${variant})` : category;
    return { classname: `${pakket}.${rest}`, status: 'gesplitst', category: pakket };
};
