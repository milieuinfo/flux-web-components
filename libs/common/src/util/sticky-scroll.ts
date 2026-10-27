/**
 * Maximum aantal sticky/fixed lagen dat bovenaan de viewport op elkaar gestapeld gemeten wordt
 * (bv. de globale header met daaronder een sticky functional header).
 */
const MAX_STICKY_LAYERS = 4;

/**
 * Bovengrens voor de gemeten sticky hoogte, als fractie van de viewporthoogte. Beschermt tegen
 * schermvullende overlays (modals, cookiebanners) die het doel anders volledig uit beeld zouden duwen.
 */
const MAX_STICKY_OFFSET_RATIO = 0.5;

/**
 * Aantal opeenvolgende frames dat het doel stil moet staan voor een smooth scroll als afgelopen geldt.
 */
const SCROLL_SETTLED_FRAMES = 5;

/**
 * Bovengrens voor het wachten op het einde van een smooth scroll, zodat de correctie niet eindeloos uitgesteld wordt.
 */
const MAX_SCROLL_SETTLE_MS = 3000;

/**
 * Elke scroll-aanvraag krijgt een volgnummer, zodat de correctie van een eerdere smooth scroll niet meer
 * uitgevoerd wordt nadat er intussen naar een ander doel gescrold werd.
 */
let latestScrollRequest = 0;

/**
 * Zoekt de elementen op een punt in de viewport, ook diep in (open) shadow roots. `elementsFromPoint`
 * op het document stopt namelijk bij de host van een shadow root, terwijl de sticky balk zelf vaak
 * net binnen die shadow root zit.
 */
const elementsFromPointThroughShadowRoot = (x: number, y: number): Element[] => {
    const elements: Element[] = [];

    const visit = (root: Document | ShadowRoot) => {
        // Niet elke browser implementeert elementsFromPoint op een shadow root; dan meten we gewoon
        // verder met wat de light DOM oplevert.
        if (typeof root.elementsFromPoint !== 'function') {
            return;
        }

        root.elementsFromPoint(x, y).forEach((element) => {
            // Vanuit een shadow root worden ook de elementen erbuiten teruggegeven (geretarget naar de
            // host); die zijn hier al gezien, dus de check voorkomt meteen ook eindeloze recursie.
            if (elements.includes(element)) {
                return;
            }
            elements.push(element);
            if (element.shadowRoot) {
                visit(element.shadowRoot);
            }
        });
    };

    visit(document);

    return elements;
};

/**
 * De onderkant (in viewportcoordinaten) waar een element bovenaan blijft plakken, of 0 wanneer het
 * element niet meeschuift.
 */
const getStuckBottom = (element: Element): number => {
    const style = getComputedStyle(element);
    if (style.position !== 'fixed' && style.position !== 'sticky') {
        return 0;
    }

    const { top, height } = element.getBoundingClientRect();
    if (height <= 0) {
        return 0;
    }

    // Een sticky element klikt vast op zijn eigen `top`-offset: zolang er niet ver genoeg gescrold is
    // staat het lager dan die positie, dus rekenen we met de vastgeklikte positie i.p.v. de huidige.
    const stickyTop = style.position === 'sticky' ? parseFloat(style.top) : NaN;

    return (Number.isNaN(stickyTop) ? top : stickyTop) + height;
};

/**
 * Meet hoeveel pixels bovenaan de viewport afgedekt worden door sticky of fixed page chrome (de
 * globale header, een sticky functional header, ...) ter hoogte van `target`.
 *
 * Er wordt gemeten in de kolom van het doel zelf, zodat een sticky zijkolom naast de inhoud (bv. een
 * side-navigation) niet meegeteld wordt. Vanaf de bovenrand wordt laag per laag naar beneden gekeken
 * zolang er chrome op elkaar gestapeld staat.
 *
 * @param target - het element dat straks in beeld gescrold wordt
 * @return de hoogte in pixels van de chrome bovenaan de viewport (0 als er geen is)
 */
export const getStickyOffsetTop = (target: HTMLElement): number => {
    const viewportWidth = document.documentElement.clientWidth;
    const viewportHeight = document.documentElement.clientHeight;

    const { left, width } = target.getBoundingClientRect();
    const centerX = width > 0 ? left + width / 2 : viewportWidth / 2;
    const x = Math.min(Math.max(centerX, 1), viewportWidth - 1);
    const maxOffset = viewportHeight * MAX_STICKY_OFFSET_RATIO;

    let offset = 0;
    for (let layer = 0; layer < MAX_STICKY_LAYERS && offset < maxOffset; layer++) {
        const nextOffset = Math.max(0, ...elementsFromPointThroughShadowRoot(x, offset + 1).map(getStuckBottom));
        if (nextOffset <= offset) {
            break;
        }
        offset = nextOffset;
    }

    return Math.min(offset, maxOffset);
};

const getScrollMarginTop = (target: HTMLElement): number => parseFloat(getComputedStyle(target).scrollMarginTop) || 0;

/**
 * Roept `callback` aan zodra het doel een aantal frames niet meer beweegt. Bewust geen `scrollend`: dat event
 * vuurt niet als er niets te scrollen valt, verlaat geen shadow root en is niet in elke browser beschikbaar.
 */
const whenScrollSettled = (target: HTMLElement, callback: () => void): void => {
    const start = performance.now();
    let lastTop = target.getBoundingClientRect().top;
    let stableFrames = 0;

    const check = (now: number) => {
        const { top } = target.getBoundingClientRect();
        stableFrames = top === lastTop ? stableFrames + 1 : 0;
        lastTop = top;

        if (stableFrames >= SCROLL_SETTLED_FRAMES || now - start >= MAX_SCROLL_SETTLE_MS) {
            callback();
        } else {
            requestAnimationFrame(check);
        }
    };

    requestAnimationFrame(check);
};

const scrollIntoViewThenCorrect = (target: HTMLElement, behavior: ScrollBehavior): void => {
    target.scrollIntoView({ behavior });

    const offset = getStickyOffsetTop(target);
    // Zit het doel al onder de chrome (bv. omdat de consumer zelf al een scroll-margin-top zette),
    // dan is er niets te corrigeren.
    if (offset <= 0 || target.getBoundingClientRect().top >= offset) {
        return;
    }

    target.style.scrollMarginTop = `${offset}px`;
    target.scrollIntoView({ behavior });
};

const scrollSmoothlyBelowSticky = (target: HTMLElement, request: number): void => {
    // Tijdens een smooth scroll valt er niets betrouwbaar te meten, dus de scroll-margin-top wordt vooraf
    // gezet op basis van de chrome die nu al bovenaan staat.
    const offset = getStickyOffsetTop(target);
    if (getScrollMarginTop(target) < offset) {
        target.style.scrollMarginTop = `${offset}px`;
    }
    target.scrollIntoView({ behavior: 'smooth' });

    // Chrome die pas onderweg vastklikt (bv. een sticky balk lager op de pagina) is pas na de scroll meetbaar.
    whenScrollSettled(target, () => {
        if (request !== latestScrollRequest) {
            return;
        }

        const { top } = target.getBoundingClientRect();
        // Ligt het doel hoger dan waar het naartoe gestuurd werd, dan heeft de gebruiker intussen zelf verder gescrold.
        const landed = top >= getScrollMarginTop(target) - 1;
        const settledOffset = getStickyOffsetTop(target);
        if (!landed || top >= settledOffset - 1) {
            return;
        }

        target.style.scrollMarginTop = `${settledOffset}px`;
        target.scrollIntoView({ behavior: 'smooth' });
    });
};

/**
 * Scrolt een element in beeld en houdt daarbij rekening met sticky of fixed page chrome bovenaan de
 * viewport: een gewone `scrollIntoView()` legt het doel tegen de bovenrand en dus achter die chrome.
 *
 * Zonder smooth wordt er eerst gescrold en pas daarna gemeten - zo staat de chrome in zijn definitieve
 * (vastgeklikte) positie. Dekt ze het doel af, dan krijgt het doel een `scroll-margin-top` en wordt er opnieuw
 * gescrold. Die `scroll-margin-top` blijft staan zodat ook latere (native) scrolls naar het element,
 * bv. via de URL-hash, eronder uitkomen.
 *
 * Bij `behavior: 'smooth'` is het omgekeerd: de `scroll-margin-top` wordt vooraf gemeten en gezet. Klikt er
 * onderweg nog chrome vast die het doel afdekt, dan volgt na de scroll een korte correctie.
 *
 * @param target - het element dat in beeld gescrold wordt
 * @param options - optionele scroll-opties
 * @param options.behavior - het scrollgedrag, zoals bij `scrollIntoView` (default `'auto'`)
 */
export const scrollIntoViewBelowSticky = (
    target: HTMLElement,
    { behavior = 'auto' }: { behavior?: ScrollBehavior } = {},
): void => {
    const request = ++latestScrollRequest;

    if (behavior === 'smooth') {
        scrollSmoothlyBelowSticky(target, request);
    } else {
        scrollIntoViewThenCorrect(target, behavior);
    }
};
