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

/**
 * Scrolt een element in beeld en houdt daarbij rekening met sticky of fixed page chrome bovenaan de
 * viewport: een gewone `scrollIntoView()` legt het doel tegen de bovenrand en dus achter die chrome.
 *
 * Er wordt eerst gescrold en pas daarna gemeten - zo staat de chrome in zijn definitieve (vastgeklikte)
 * positie. Dekt ze het doel af, dan krijgt het doel een `scroll-margin-top` en wordt er opnieuw
 * gescrold. Die `scroll-margin-top` blijft staan zodat ook latere (native) scrolls naar het element,
 * bv. via de URL-hash, eronder uitkomen.
 *
 * @param target - het element dat in beeld gescrold wordt
 */
export const scrollIntoViewBelowSticky = (target: HTMLElement): void => {
    target.scrollIntoView();

    const offset = getStickyOffsetTop(target);
    // Zit het doel al onder de chrome (bv. omdat de consumer zelf al een scroll-margin-top zette),
    // dan is er niets te corrigeren.
    if (offset <= 0 || target.getBoundingClientRect().top >= offset) {
        return;
    }

    target.style.scrollMarginTop = `${offset}px`;
    target.scrollIntoView();
};
