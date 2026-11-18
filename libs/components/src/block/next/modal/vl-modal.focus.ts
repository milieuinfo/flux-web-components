/**
 * Initiële focus van een modal, gedeeld door `vl-modal-next` en de legacy `vl-modal`.
 *
 * Gebruik: na `dialog.showModal()` `focusFirstFocusable(dialog) || dialog.focus()`.
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

/**
 * Focust het eerste focusbare element in de flat tree van `root`, met voorrang voor een element met `autofocus`, zoals
 * de native dialog in Chromium. Geeft `false` als geen enkel element de focus kon krijgen, of als het eerste focusbare
 * element (zonder `autofocus`) pas na scrollen zichtbaar is: het begin van de inhoud blijft dan in beeld.
 */
export const focusFirstFocusable = (root: Element): boolean => {
    const elements = getFlatTreeElements(root);
    // autofocus ongeacht tabIndex: een kop met tabindex="-1" en autofocus is het APG-patroon voor statische inhoud.
    if (elements.filter((element) => element.hasAttribute('autofocus')).some((element) => focusCandidate(element))) {
        return true;
    }
    const first = elements
        .filter((element) => element.tabIndex >= 0)
        .find((element) => focusCandidate(element, { preventScroll: true }));
    return !!first && first.getBoundingClientRect().bottom <= root.getBoundingClientRect().bottom;
};
