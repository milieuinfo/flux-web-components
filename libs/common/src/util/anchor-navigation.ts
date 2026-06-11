import { findDeepestElementThroughShadowRoot } from './utils';

/**
 * Naam van het event waarmee eender welke link of component, op eender welke plaats (ook diep in een
 * shadow DOM), naar een same-page anchor kan navigeren. Het event is `composed` zodat het vanuit een
 * shadow root tot bij de centrale document-listener bubbelt.
 */
export const NAVIGATE_TO_ANCHOR_EVENT = 'vl-navigate-to-anchor';

export type NavigateToAnchorDetail = { hash: string; updateHash?: boolean };

declare global {
    interface GlobalEventHandlersEventMap {
        [NAVIGATE_TO_ANCHOR_EVENT]: CustomEvent<NavigateToAnchorDetail>;
    }
}

/**
 * Navigeert naar een same-page anchor en zoekt het doel pagina-breed door alle (open) shadow roots
 * én de light DOM. Bij een treffer wordt er gescrold, de focus mee verplaatst (WCAG 2.4.3) en
 * optioneel de URL-hash bijgewerkt.
 *
 * @param hash - de hash of het id van het doel (met of zonder leidende `#`)
 * @param options.updateHash - of de URL-hash bijgewerkt mag worden via `history.pushState` (default false).
 *   Bewust expliciet: automatisch de hash bijwerken kan botsen met bv. een SPA-router, daarom moet dit
 *   expliciet geactiveerd worden.
 * @return `true` als er een doel gevonden en aangedaan werd, anders `false`
 */
export const navigateToAnchor = (hash: string, { updateHash = false }: { updateHash?: boolean } = {}): boolean => {
    const id = decodeURIComponent((hash ?? '').replace(/^#/, ''));
    if (!id) {
        return false;
    }

    const target = findDeepestElementThroughShadowRoot(document.body, `#${CSS.escape(id)}`) as HTMLElement | null;
    if (!target) {
        return false;
    }

    target.scrollIntoView();

    // Verplaats focus naar het doel zodat toetsenbord-/screenreader-context meeschuift (WCAG 2.4.3).
    if (target.tabIndex < 0) {
        target.tabIndex = -1;
    }
    target.focus({ preventScroll: true });

    if (updateHash && location.hash !== `#${id}`) {
        history.pushState(null, '', `#${id}`);
    }

    return true;
};

let installed = false;

/**
 * Installeert (één keer, voor de paginalevensduur) de centrale anchor-navigatie:
 * - een document-listener op {@link NAVIGATE_TO_ANCHOR_EVENT} die {@link navigateToAnchor} aanroept;
 * - een `hashchange`-listener voor back/forward en deep-links (zonder een extra pushState te triggeren);
 * - een initiële deep-link-poging bij een reeds aanwezige `location.hash`.
 *
 * Idempotent: meerdere aanroepen (bv. door meerdere componenten) installeren slechts één keer.
 */
export const enableAnchorNavigation = (): void => {
    if (installed) {
        return;
    }
    installed = true;

    document.addEventListener(NAVIGATE_TO_ANCHOR_EVENT, (event) => {
        if (navigateToAnchor(event.detail?.hash, { updateHash: event.detail?.updateHash })) {
            // Markeer het event als afgehandeld zodat de bron de native navigatie kan onderdrukken.
            event.preventDefault();
        }
    });

    window.addEventListener('hashchange', () => {
        navigateToAnchor(location.hash, { updateHash: false });
    });

    if (location.hash) {
        navigateToAnchor(location.hash, { updateHash: false });
    }
};

/**
 * Dispatcht het {@link NAVIGATE_TO_ANCHOR_EVENT} vanaf een bron-element zodat de centrale listener
 * de cross-shadow-navigatie afhandelt. Omdat `dispatchEvent` synchroon is, geeft de retourwaarde
 * meteen aan of er een doel gevonden werd (`event.defaultPrevented`), zodat de aanroeper de native
 * navigatie enkel onderdrukt wanneer er effectief genavigeerd is.
 *
 * @param source - het element van waaruit het event gedispatcht wordt (mag in een shadow root zitten)
 * @param hash - de hash of het id van het doel
 * @param options.updateHash - of de URL-hash bijgewerkt mag worden (default false, zie {@link navigateToAnchor})
 * @return `true` als de navigatie afgehandeld werd, anders `false`
 */
export const dispatchNavigateToAnchor = (
    source: EventTarget,
    hash: string,
    { updateHash = false }: { updateHash?: boolean } = {}
): boolean => {
    const event = new CustomEvent<NavigateToAnchorDetail>(NAVIGATE_TO_ANCHOR_EVENT, {
        detail: { hash, updateHash },
        bubbles: true,
        composed: true,
        cancelable: true,
    });
    source.dispatchEvent(event);
    return event.defaultPrevented;
};

/**
 * Herbruikbare click-handler die een echte klik op een same-page anchor (`<a href="#...">`) vertaalt
 * naar {@link dispatchNavigateToAnchor}. Hang hem aan een shadow root (voor een component dat zijn
 * content in shadow DOM rendert) óf aan `document` (om álle anchors op de pagina cross-shadow te laten
 * werken). Modifier-/middenklikken en links naar een ander pad blijven ongemoeid.
 *
 * @param event - het click-event
 * @param options.updateHash - of de URL-hash bijgewerkt mag worden (default false, zie {@link navigateToAnchor})
 * @example shadow.addEventListener('click', handleAnchorClick as EventListener);
 */
export const handleAnchorClick = (event: MouseEvent, { updateHash = false }: { updateHash?: boolean } = {}): void => {
    // Laat modifier-/middenklikken (open in nieuw tabblad/venster) met rust, anders breken we native gedrag.
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
    }

    // composedPath() vindt de <a> ook wanneer die in een shadow root zit, ongeacht of de handler op een
    // shadow root of op document hangt.
    const anchor = event
        .composedPath()
        .find((target): target is HTMLAnchorElement => target instanceof HTMLAnchorElement);
    if (!anchor) {
        return;
    }

    const url = new URL(anchor.href, document.baseURI);
    const isSamePage = url.pathname === location.pathname && url.search === location.search;
    if (!url.hash || !isSamePage) {
        return;
    }

    // Enkel wanneer er effectief genavigeerd is onderdrukken we de native navigatie.
    if (dispatchNavigateToAnchor(anchor, url.hash, { updateHash })) {
        event.preventDefault();
    }
};
