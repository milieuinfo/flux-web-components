import { navigateToAnchor } from './anchor-navigation';

export const SKIP_TO_CONTENT_LINK_TEXT = 'Ga meteen naar de inhoud';

export const SKIP_TO_CONTENT_MISSING_ID_WARNING = [
    'Denk eraan om een skip-to-content-id mee te geven zodat er een skip-link kan gerenderd worden.',
    'Gebruik hiervoor de ID van de eerste heading van de content.',
    '(WCAG 2.4.1: https://www.w3.org/WAI/WCAG21/Understanding/bypass-blocks.html)',
] as const;

/**
 * Bouwt een `<a class="vl-skip-link">` waarmee toetsenbordgebruikers het header-blok kunnen overslaan
 * (WCAG 2.4.1). De link is visueel verborgen tot hij focus krijgt (zie `vlAccessibilityStyles`) en
 * verplaatst bij activatie de focus en de scroll naar het doel-element - pagina-breed gezocht, ook
 * diep in shadow roots. Bestaat het doel niet, dan doet de link niets.
 */
export const createSkipToContentLink = (skipToContentId: string): HTMLAnchorElement => {
    const href = `${skipToContentId.startsWith('#') ? '' : '#'}${skipToContentId}`;

    const skipLink = document.createElement('a');
    skipLink.setAttribute('href', href);
    skipLink.classList.add('vl-skip-link');
    skipLink.textContent = SKIP_TO_CONTENT_LINK_TEXT;

    skipLink.addEventListener('click', (event: MouseEvent) => {
        // navigateToAnchor onderdrukt de native sprong niet zelf; doe dat hier zodat focus + scroll de enige actie zijn.
        event.preventDefault();
        navigateToAnchor(href);
    });

    return skipLink;
};
