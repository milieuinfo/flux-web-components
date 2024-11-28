import { ifDefined } from 'lit-html/directives/if-defined.js';
import { UigConfig } from '../config/uig-config';
import { VL } from '../models';
import { Class } from '../type/types';

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
    if (UigConfig.getPreferences().logTreeshakeRegistration) {
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
        if (UigConfig.getPreferences().logWebComponentRegistration) {
            console.debug(`${tagName} werd reeds geregistreerd`);
        }
    } else {
        if (UigConfig.getPreferences().logWebComponentRegistration) {
            console.debug('registratie', tagName);
        }
        window.customElements.define(tagName, constructor as CustomElementConstructor, options);
    }
};

/**
 * Definieert een class als custom element enkel wanneer deze nog niet gedefinieerd werd.
 * ! Voor backwards compatibiliteit, niet voor intern gebruik.
 *
 * @deprecated
 *
 * @param {String} name - custom HTML element naam
 * @param {Object} constructor - constructor voor de class
 * @param {Object} options - opties
 * @return {void}
 */
export const define = (name: string, constructor: Class, options?: ElementDefinitionOptions) =>
    defineWebComponent(constructor, name, options);

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
    // eslint-disable-next-line no-async-promise-executor
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
 *             tijdspanne een nieuwe aanroep gebeurd herstart de timer
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

export const findNodesForSlot = (element: HTMLElement, slotName: string) => {
    return element?.querySelectorAll<Element>(`:scope > [slot=${slotName}]`);
};

/**
 * Zet een hex-string in het formaat '0x22 0xF12D 0x22' om naar een echte string
 */
export const hexToString = (hex: string): string => {
    return hex.split(' ').map(s => String.fromCharCode(parseInt(s,16))).join('');
}

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
