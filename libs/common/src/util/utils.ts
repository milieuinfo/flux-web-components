import { ifDefined } from 'lit-html/directives/if-defined.js';
import { FluxConfig } from '../config/flux-config';
import { VL } from '../models';

declare const vl: VL;

/**
 * Als web-componenten geïmporteerd worden met named imports (aanbevolen, oa voor tree shaking), dan wordt de component
 * niet gerefereerd en daardoor niet geregistreerd. Door ze te refereren met deze methode (conventie) vermijd je dat je
 * IDE en Webpack de import als dode code behandelen. Daarnaast zorgt het ervoor dat je steeds een minimale referentie
 * hebt die (door de @webComponent en @customElement decorators) de component als web-component registreert.
 *
 * @param webComponents
 */
export const registerWebComponents = (webComponents: any[]) => {
    if (FluxConfig.getPreferences().logTreeshakeRegistration) {
        console.debug(`treeshake registratie van`, webComponents.map((wc: any) => wc?.name).toString());
    }
};

/**
 * Registreert een web-component.
 *
 * window.customElements.define geeft een fout indien de web-component al geregistreerd werd, deze methode verifieert
 * of er al geregistreerd werd en logged in dat geval enkel een boodschap.
 *
 * @param constructor
 * @param tagName
 * @param options
 */
export const defineWebComponent = (constructor: Function, tagName: string, options?: ElementDefinitionOptions) => {
    if (customElements.get(tagName)) {
        if (FluxConfig.getPreferences().logWebComponentRegistration) {
            console.debug(`${tagName} werd reeds geregistreerd`);
        }
    } else {
        if (FluxConfig.getPreferences().logWebComponentRegistration) {
            console.debug('registratie', tagName);
        }
        window.customElements.define(tagName, constructor as CustomElementConstructor, options);
    }
};

/**
 * Asynchroon een script downloaden maar synchroon in volgorde uitvoeren.
 *
 * @param {String} id - script id
 * @param {String} src - script src path
 * @return {void}
 */
export const awaitScript = (id: string, src: string): Promise<void> => {
    if (document.head.querySelector(`script#${id}`)) {
        console.warn(`script with id '${id}' is already loaded`);
        return Promise.resolve();
    }

    const script: HTMLScriptElement = document.createElement('script');
    script.id = id;
    script.src = src;
    script.async = false;

    const promise: Promise<void> = new Promise((resolve, reject) => {
        script.onload = () => {
            resolve();
        };
        script.onerror = () => {
            reject(new Error(`error when script with src attribute '${script.src}' was loaded`));
        };
    });

    document.head.appendChild(script);
    return promise;
};

/**
 * Wacht.
 *
 * @param {Number} ms - aantal milliseconden dat er gewacht moeten worden
 * @return {Promise}
 */
export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Wacht tot conditie geldig (truthy) is.
 *
 * @param {Function} condition - conditionele functie
 * @return {Promise}
 */
export const awaitUntil = (condition: any): Promise<void> =>
    // TODO kspeltin: raar die async in een promise
    // eslint-disable-line no-async-promise-executor
    new Promise(async (resolve, reject) => {
        while (!condition()) {
            await sleep(50);
        }
        resolve();
    });

/**
 * will remove the parent node from the given element
 * does the opposite of vl.util.wrap
 * @param element
 */
export const unwrap = (element: Element) => {
    if (vl.util.exists(element)) {
        const fragment = document.createDocumentFragment();
        while (element.firstChild) {
            fragment.appendChild(element.firstChild);
        }
        if (element.parentNode) element.parentNode.replaceChild(fragment, element);
    }
};

/**
 * De `debounce` methode beperkt het aantal keren dat een functie aangeroepen wordt.
 * Opmerking: deze methode volgt de closure opzet, daarom is deze bewust niet beter ge-typed!
 *  → zie https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures
 *
 * @param func - de aan te roepen functie
 * @param ms - het aantal milliseconden dat er gewacht wordt alvorens de functie aan te roepen; als er in die
 *             tijdspanne een nieuwe aanroep gebeurt herstart de timer
 */
export const debounce = (func: any, ms: number) => {
    let timer: any = undefined; // type van timer is number in oudere browsers, Timeout in nieuwste (wij kennen dat type niet)
    return (...args: unknown[]): void => {
        clearTimeout(timer);
        timer = setTimeout(() => func(args), ms);
    };
};

/**
 * @param func - de aan te roepen functie
 * @param delay - het interval in aantal milliseconden dat er gewacht wordt tussen het aanroepen van de functie
 */
export const throttle = (func: any, delay: number) => {
    let previous = performance.now();
    return (...args: unknown[]): void => {
        const now = performance.now();
        if (now - previous > delay) {
            previous = now;
            func(args);
        }
    };
};

export const returnNotEmptyString = (s: string) => (s && s !== '' ? s : undefined);
export const returnNumber = (n: number) => (!isNaN(n) ? n : undefined);
export const ifDefinedString = (s: string) => ifDefined(returnNotEmptyString(s));
export const ifDefinedNumber = (n: number) => ifDefined(returnNumber(n));

/**
 * Zoekt het element onder een meegegeven root element dat overeenkomt met een meegegeven css selector en dit
 * doorheen de shadow roots van onderliggende elementen. Het matching element in de diepste shadow root wordt
 * teruggegeven.
 * @param {Element|ShadowRoot|null} rootElement - het element waaronder we beginnen met zoeken
 * @param {String} selector - de css selector waarnaar we zoeken
 * @return {Element|null} het element, matching aan de selector, dat in de diepste shadow root ligt
 */
export const findDeepestElementThroughShadowRoot = (
    rootElement: Element | ShadowRoot | null,
    selector: string
): Element | null => {
    if (rootElement) {
        const deepestElement = Array.from(rootElement.querySelectorAll('*'))
            .filter((el) => !!el.shadowRoot)
            .map((el) => findDeepestElementThroughShadowRoot(el.shadowRoot, selector))
            .find((el) => !!el);
        return deepestElement || rootElement.querySelector(selector);
    }
    return null;
};

/**
 * Helper function to check if an element should be excluded based on exclude selectors.
 * @param {Element} element - het element om te checken
 * @param {String} excludeSelectors - comma-separated CSS selectors van elementen om uit te sluiten
 * @return {boolean} true als het element uitgesloten moet worden
 */
const shouldExcludeElement = (element: Element, excludeSelectors?: string): boolean => {
    if (!excludeSelectors) {
        return false;
    }
    try {
        // Check if the element itself matches the exclude selectors
        if (element.matches(excludeSelectors)) {
            return true;
        }
        // Check if any ancestor matches the exclude selectors
        if (element.closest(excludeSelectors)) {
            return true;
        }
    } catch (e) {
        // Invalid selector, log warning and continue
        console.warn(`[findElements] Invalid exclude selector: "${excludeSelectors}"`, e);
    }
    return false;
};

/**
 * Helper function to check if an element or its subtree should be skipped during traversal.
 * @param {Element} element - het element om te checken
 * @param {String} excludeSelectors - comma-separated CSS selectors van elementen om uit te sluiten
 * @return {boolean} true als het element en zijn subtree overgeslagen moeten worden
 */
const shouldSkipSubtree = (element: Element, excludeSelectors?: string): boolean => {
    if (!excludeSelectors) {
        return false;
    }
    try {
        return element.matches(excludeSelectors);
    } catch (e) {
        // Invalid selector, log warning and continue
        console.warn(`[findElements] Invalid exclude selector: "${excludeSelectors}"`, e);
    }
    return false;
};

/**
 * Zoekt alle elementen onder een meegegeven root element dat overeenkomt met een meegegeven css selector en dit
 * doorheen de shadow roots van onderliggende elementen. Alle matching elementen in de diepste shadow root worden
 * teruggegeven.
 * Zoekt ook in de light DOM van de doorzochte elementen.
 * @param {Element|ShadowRoot|null} rootElement - het element waaronder we beginnen met zoeken
 * @param {String} selector - de css selector waarnaar we zoeken
 * @param {Number} maxDepth - optionele maximum diepte voor shadow DOM traversal (undefined = onbeperkt, 0 = enkel light DOM)
 * @param {Number} currentDepth - huidige diepte in de recursie (intern gebruik)
 * @param {String} excludeSelectors - optionele comma-separated CSS selectors van elementen om uit te sluiten (inclusief hun subtrees)
 * @return {Element[]} Array van alle elementen die matchen met de selector, die in de diepste shadow root ligt
 */
export const findElementsThroughShadowRoot = (
    rootElement: Element | ShadowRoot | Document | null,
    selector: string,
    maxDepth?: number,
    currentDepth = 0,
    excludeSelectors?: string
): Element[] => {
    if (!rootElement || (maxDepth !== undefined && currentDepth > maxDepth)) {
        return [];
    }

    const currentRootElements = Array.from(rootElement.querySelectorAll(selector));

    // gebruik een Set om duplicaten te vermijden
    const foundElements = new Set<Element>();

    // Filter out excluded elements from current root results
    currentRootElements.forEach((el) => {
        if (!shouldExcludeElement(el, excludeSelectors)) {
            foundElements.add(el);
        }
    });

    const slots = Array.from(rootElement.querySelectorAll('slot'));
    slots.forEach((slot) => {
        if (slot instanceof HTMLSlotElement) {
            const assignedElements = slot.assignedElements({ flatten: true });
            assignedElements.forEach((element) => {
                // Skip entire subtree if element matches exclude selectors
                if (shouldSkipSubtree(element, excludeSelectors)) {
                    return;
                }
                if (element.matches(selector) && !shouldExcludeElement(element, excludeSelectors)) {
                    foundElements.add(element);
                }
                const results = findElementsThroughShadowRoot(
                    element,
                    selector,
                    maxDepth,
                    currentDepth,
                    excludeSelectors
                );
                results.forEach((foundEl) => foundElements.add(foundEl));
            });
        }
    });

    // performance optimization: skip shadow root traversal when maxDepth is 0
    // this makes maxDepth=0 equivalent to light DOM only search
    if (maxDepth === 0 && currentDepth === 0) {
        return Array.from(foundElements);
    }

    // haalt enkel elementen uit shadow roots gezien de elementen in light DOM van custom elements,
    // al worden gevonden door querySelectorAll op Element roots
    const allElements = Array.from(rootElement.querySelectorAll('*'));
    
    allElements
        .filter((el) => !!el.shadowRoot)
        .filter((el) => !shouldSkipSubtree(el, excludeSelectors)) // Skip excluded subtrees
        .forEach((el) => {
            const shadowResults = findElementsThroughShadowRoot(
                el.shadowRoot,
                selector,
                maxDepth,
                currentDepth + 1,
                excludeSelectors
            );
            shadowResults.forEach((foundEl) => foundElements.add(foundEl));
        });

    // voor custom elements zonder shadow roots moeten we hun light DOM doorzoeken,
    // maar enkel als rootElement een ShadowRoot is
    if (rootElement instanceof ShadowRoot || rootElement instanceof Document) {
        // enkel directe kinderen doorzoeken om dubbele zoekopdrachten te vermijden
        const directChildren = Array.from(rootElement.childNodes).filter(
            (node): node is Element => node.nodeType === Node.ELEMENT_NODE
        ) as Element[];

        directChildren
            .filter((el) => !el.shadowRoot && el instanceof HTMLElement && el.tagName.includes('-'))
            .filter((el) => !shouldSkipSubtree(el, excludeSelectors)) // Skip excluded subtrees
            .forEach((el) => {
                const lightResults = findElementsThroughShadowRoot(
                    el,
                    selector,
                    maxDepth,
                    currentDepth + 1,
                    excludeSelectors
                );
                lightResults.forEach((foundEl) => foundElements.add(foundEl));
            });
    }

    return Array.from(foundElements);
};

export const findNodesForSlot = (element: HTMLElement, slotName: string) => {
    return element?.querySelectorAll<Element>(`:scope > [slot=${slotName}]`);
};

/**
 * Zet een hex-string in het formaat '0x22 0xF12D 0x22' om naar een echte string
 */
export const hexToString = (hex: string): string => {
    return hex
        .split(' ')
        .map((s) => String.fromCharCode(parseInt(s, 16)))
        .join('');
};

/**
 * Checkt of een slot leeg is (en geen nodes of text bevat)
 * @param slot
 */
export const isSlotEmpty = (slot: HTMLSlotElement): boolean =>
    slot
        .assignedNodes({ flatten: true })
        .every(
            (node) =>
                (node.nodeType === Node.TEXT_NODE && !node.textContent?.trim()) || node.nodeType === Node.COMMENT_NODE
        );

export const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
