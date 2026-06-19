/**
 * Met `onChildListChange` start je de observatie van een Element, achterliggend via een MutationObserver. Wanneer
 * er aan het element een kind wordt toegevoegd of verwijderd gebeurt er een aanroep naar changeCallback(). Het is
 * belangrijk dat de MutationObserver die teruggeven wordt expliciet opgekuist moet worden door een aanroep naar zijn
 * disconnect() methode!
 *
 * @return {MutationObserver} - de observer waarop een subscriptie gedaan werd, deze moet terug vrijgegeven worden via
 *                              een disconnect()
 * @param {Element} toObserve - het te observeren element
 * @param {(impactedNodes?: NodeList) => void} changeCallback - de methode die aangeroepen wordt bij een mutatie
 * @param {MutationObserverInit} options - de observer-opties; standaard enkel `childList`. Geef bv.
 *                              `{ childList: true, subtree: true, characterData: true, attributes: true }` mee om
 *                              ook in-place tekst- en attribuutwijzigingen diep in de subtree te detecteren.
 */
export const onChildListChange = (
    toObserve: Element,
    changeCallback: (impactedNodes?: NodeList) => void,
    options: MutationObserverInit = { childList: true }
): MutationObserver => {
    const mutationObserver = new MutationObserver((mutations: MutationRecord[]) => {
        mutations.forEach((mutation: MutationRecord) => {
            if (mutation.addedNodes.length) changeCallback(mutation.addedNodes);
            if (mutation.removedNodes.length) changeCallback(mutation.removedNodes);
            // characterData- en attributes-mutaties moeten de callback ook triggeren
            if (mutation.type === 'characterData' || mutation.type === 'attributes') changeCallback();
        });
    });
    mutationObserver.observe(toObserve, options);
    return mutationObserver;
};
