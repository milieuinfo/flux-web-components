import { scrollIntoViewBelowSticky } from './sticky-scroll';
import { findDeepestElementThroughShadowRoot } from './utils';

/**
 * Navigeert naar een same-page anchor en zoekt het doel pagina-breed door alle (open) shadow roots
 * én de light DOM. Bij een treffer wordt er gescrold - onder eventuele sticky of fixed page chrome,
 * zie {@link scrollIntoViewBelowSticky} - en de focus mee verplaatst (WCAG 2.4.3). De URL-hash blijft
 * ongemoeid.
 *
 * @param hash - de hash of het id van het doel (met of zonder leidende `#`)
 * @return `true` als er een doel gevonden en aangedaan werd, anders `false`
 */
export const navigateToAnchor = (hash: string): boolean => {
    const id = decodeURIComponent((hash ?? '').replace(/^#/, ''));
    if (!id) {
        return false;
    }

    const target = findDeepestElementThroughShadowRoot(document.body, `#${CSS.escape(id)}`) as HTMLElement | null;
    if (!target) {
        return false;
    }

    scrollIntoViewBelowSticky(target);

    // Verplaats focus naar het doel zodat toetsenbord-/screenreader-context meeschuift (WCAG 2.4.3).
    if (target.tabIndex < 0) {
        target.tabIndex = -1;
    }
    target.focus({ preventScroll: true });

    return true;
};
