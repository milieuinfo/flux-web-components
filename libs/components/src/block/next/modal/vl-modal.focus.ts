/**
 * Initiële focus van een modal, gedeeld door `vl-modal-next` en de legacy `vl-modal`.
 *
 * Gebruik: `showModal(dialog)`, en daarna `focusFirstFocusable(dialog) || dialog.focus()`.
 *
 * Waarom: de inhoud van een modal staat in de light DOM en wordt via slots getoond. Bij `showModal()` zoeken Firefox en
 * Safari het eerste focusbare element enkel in de shadow tree, niet in de inhoud van de slots, en focussen zo de
 * sluitknop of "Annuleer" ná de inhoud. Chromium doorloopt wel de flat tree. Door zelf het doel te kiezen, is de
 * initiële focus in elke browser het eerste focusbare element van de inhoud.
 */

// Doorloopt de flat tree: slots via hun toegewezen elementen, shadow hosts via hun shadow root.
const getFlatTreeElements = (root: Element): HTMLElement[] => {
    const children =
        root instanceof HTMLSlotElement
            ? root.assignedElements({ flatten: true })
            : Array.from((root.shadowRoot ?? root).children);
    return children.flatMap((child) => [
        ...(child instanceof HTMLElement ? [child] : []),
        ...getFlatTreeElements(child),
    ]);
};

// focus() faalt stil op elementen die niet focusbaar zijn (verborgen, disabled, ...), dus we controleren het resultaat.
const focusCandidate = (candidate: HTMLElement, options?: FocusOptions) => {
    candidate.focus(options);
    return candidate.matches(':focus');
};

type MaybeLitElement = HTMLElement & { hasUpdated?: boolean; updateComplete?: Promise<unknown> };

// Een component met delegatesFocus kan de focus pas doorgeven na zijn eerste render, bv. in een modal die al open is
// bij het laden van de pagina. Staat de focus daarna nog waar de modal hem zette, dan krijgt het element met autofocus
// hem alsnog. Bewust geen catch: Lit meldt een mislukte render alleen via updateComplete.
const focusAutofocusWhenRendered = (autofocusElements: MaybeLitElement[], focusHolder: Element) => {
    const awaitingRender = autofocusElements.filter((element) => element.hasUpdated === false);
    if (awaitingRender.length === 0) {
        return;
    }
    Promise.all(awaitingRender.map((element) => element.updateComplete)).then(() => {
        if (focusHolder.matches(':focus')) {
            autofocusElements.some((element) => focusCandidate(element));
        }
    });
};

/**
 * Opent de dialog als modal. Staat er in de inhoud een element met `autofocus`, dan is de inhoud tijdens het openen
 * inert en focust de browser de dialog zelf. Zo krijgt het eerste focusbare element, bv. een destructieve actie, niet
 * eerst kort de focus vóór `focusFirstFocusable()` het element met `autofocus` kiest. Het `autofocus`-attribuut op de
 * dialog doet volgens de HTML-spec hetzelfde, maar Chrome negeert het daar.
 */
export const showModal = (dialog: HTMLDialogElement) => {
    const content = getFlatTreeElements(dialog).some((element) => element.hasAttribute('autofocus'))
        ? Array.from(dialog.children).filter(
              (child): child is HTMLElement => child instanceof HTMLElement && !child.inert,
          )
        : [];
    content.forEach((child) => (child.inert = true));
    try {
        dialog.showModal();
    } finally {
        content.forEach((child) => (child.inert = false));
    }
};

/**
 * Focust het eerste focusbare element in de flat tree van `root`, met voorrang voor een element met `autofocus`, zoals
 * de native dialog in Chromium. Geeft `false` als geen enkel element de focus kon krijgen, of als het eerste focusbare
 * element (zonder `autofocus`) pas na scrollen zichtbaar is: het begin van de inhoud blijft dan in beeld.
 */
export const focusFirstFocusable = (root: Element): boolean => {
    const elements = getFlatTreeElements(root);
    // autofocus ongeacht tabIndex: een kop met tabindex="-1" en autofocus is het APG-patroon voor statische inhoud.
    const autofocusElements = elements.filter((element) => element.hasAttribute('autofocus'));
    const autofocused = autofocusElements.find((element) => focusCandidate(element));
    if (autofocused) {
        // Een eerder element met autofocus dat nog niet gerenderd is, gaat voor zodra het er is.
        focusAutofocusWhenRendered(autofocusElements.slice(0, autofocusElements.indexOf(autofocused)), autofocused);
        return true;
    }
    const first = elements
        .filter((element) => element.tabIndex >= 0)
        .find((element) => focusCandidate(element, { preventScroll: true }));
    const focused = !!first && first.getBoundingClientRect().bottom <= root.getBoundingClientRect().bottom;
    // Bij false focust de aanroeper `root`.
    focusAutofocusWhenRendered(autofocusElements, focused && first ? first : root);
    return focused;
};
