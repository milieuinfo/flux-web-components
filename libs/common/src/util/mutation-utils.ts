/**
 * Met `onChildListChange` start je de observatie van een Element, achterliggend via een MutationObserver. Wanneer
 * er aan het element een kind wordt toegevoegd of verwijderd gebeurt er een aanroep naar changeCallback(). Het is
 * belangrijk dat de MutationObserver die teruggeven wordt expliciet opgekuist moet worden door een aanroep naar zijn
 * disconnect() methode!
 *
 * @return {MutationObserver} - de observer waarop een subscriptie gedaan werd, deze moet terug vrijgegeven worden via
 *                              een disconnect()
 * @param {Element} toObserve - het te observeren element
 * @param {(impactedNodes: NodeList) => void} changeCallback - de methode die aangeroepen wordt bij een mutatie
 */
export const onChildListChange = (
    toObserve: Element,
    changeCallback: (impactedNodes: NodeList) => void
): MutationObserver => {
    const mutationObserver = new MutationObserver((mutations: MutationRecord[]) => {
        mutations.forEach((mutation: MutationRecord) => {
            if (mutation.addedNodes.length) changeCallback(mutation.addedNodes);
            if (mutation.removedNodes.length) changeCallback(mutation.removedNodes);
        });
    });
    mutationObserver.observe(toObserve, { childList: true });
    return mutationObserver;
};
