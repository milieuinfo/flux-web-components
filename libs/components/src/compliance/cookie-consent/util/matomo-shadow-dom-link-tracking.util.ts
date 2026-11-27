import { matomoWindow } from './matomo-window.util';

/** Wat de link tracking handlers van Matomo van een `MouseEvent` lezen. */
type MatomoLinkTrackingEvent = {
    type: string;
    target: Element;
    srcElement: Element;
    // zonder which leidt Matomo de knop af uit button, en telt het de terug-knop van de muis als middelste knop
    which: number;
    button: number;
};

type MatomoLinkTrackingHandler = (event: MatomoLinkTrackingEvent) => void;

type MatomoClass = 'ignore' | 'link' | 'download';

type LinkElement = HTMLAnchorElement | HTMLAreaElement;

const MOUSE_EVENT_TYPES = ['click', 'mousedown', 'mouseup', 'contextmenu'] as const;
const MIDDLE_MOUSE_BUTTON = 1;
// dezelfde volgorde als Matomo: ignore gaat voor link, link gaat voor download
const MATOMO_CLASS_PRIORITY: MatomoClass[] = ['ignore', 'link', 'download'];
const MATOMO_CLASS_REGEX = /^(?:matomo|piwik)[_-](ignore|link|download)$/;
const NOT_TRACKED_PROTOCOL_REGEX = /^(?:javascript|vbscript|jscript|mocha|livescript|ecmascript|mailto|tel):/i;

const isLinkElement = (target: EventTarget): target is LinkElement =>
    target instanceof Element && (target.nodeName === 'A' || target.nodeName === 'AREA');

const isInShadowDom = (element: Element): boolean => element.getRootNode() instanceof ShadowRoot;

const getMatomoClass = (element: Element): MatomoClass | undefined => {
    const matomoClasses = Array.from(element.classList).map((className) => MATOMO_CLASS_REGEX.exec(className)?.[1]);
    return MATOMO_CLASS_PRIORITY.find((matomoClass) => matomoClasses.includes(matomoClass));
};

// Matomo leest de class enkel op de link zelf, en die is in de shadow DOM niet bereikbaar. Daarom telt hier ook de
// class op elke host rond de link. Een gewoon ouder-element telt niet mee, net zoals bij Matomo in de light DOM.
const findMatomoClass = (link: Element): MatomoClass | undefined => {
    let element: Element | undefined = link;
    while (element) {
        const matomoClass = getMatomoClass(element);
        if (matomoClass) {
            return matomoClass;
        }
        const root = element.getRootNode();
        element = root instanceof ShadowRoot ? root.host : undefined;
    }
    return undefined;
};

// Matomo zoekt de aangeklikte link via event.target op document.body, en dat is voor een link in de shadow DOM de host.
// De klik gaat hier naar de handlers van Matomo zelf: zo beslist Matomo of het een uitgaande link of een download is.
export class MatomoShadowDomLinkTracking {
    private enabled = false;
    private matomoListenerAdded = false;
    private readonly matomoHandlers = new Map<string, MatomoLinkTrackingHandler[]>();
    private middleMouseDownLink: Element | undefined;

    enable(): void {
        if (this.enabled) {
            return;
        }
        this.enabled = true;
        this.addMatomoListener();
        MOUSE_EVENT_TYPES.forEach((type) => document.addEventListener(type, this.handleMouseEvent, true));
    }

    disable(): void {
        MOUSE_EVENT_TYPES.forEach((type) => document.removeEventListener(type, this.handleMouseEvent, true));
        this.enabled = false;
        this.middleMouseDownLink = undefined;
    }

    private addMatomoListener(): void {
        if (this.matomoListenerAdded) {
            return;
        }
        this.matomoListenerAdded = true;

        const win = matomoWindow();
        if (!win._paq) {
            win._paq = [];
        }

        // Matomo roept addEventListener aan op wat 'addListener' meekrijgt. Met een eigen object krijgen we zo zijn
        // link tracking handlers in handen en roepen we ze zelf aan met de link uit de shadow DOM als target.
        win._paq.push([
            'addListener',
            {
                addEventListener: (type: string, handler: MatomoLinkTrackingHandler) => {
                    this.matomoHandlers.set(type, [...(this.matomoHandlers.get(type) || []), handler]);
                },
            },
        ]);
    }

    private readonly handleMouseEvent = (event: MouseEvent): void => {
        const link = event.composedPath().find(isLinkElement);
        // links in de light DOM vindt Matomo zelf
        if (!link || !isInShadowDom(link) || !link.hasAttribute('href')) {
            return;
        }

        const matomoClass = findMatomoClass(link);
        if (matomoClass === 'ignore') {
            return;
        }

        if (matomoClass) {
            this.trackLink(event, link, matomoClass);
        } else {
            this.forwardToMatomo(event, link);
        }
    };

    private forwardToMatomo(event: MouseEvent, link: LinkElement): void {
        const matomoEvent: MatomoLinkTrackingEvent = {
            type: event.type,
            target: link,
            srcElement: link,
            which: event.which,
            button: event.button,
        };
        this.matomoHandlers.get(event.type)?.forEach((handler) => handler(matomoEvent));
    }

    private trackLink(event: MouseEvent, link: LinkElement, type: 'link' | 'download'): void {
        if (this.isLinkActivation(event, link) && !NOT_TRACKED_PROTOCOL_REGEX.test(link.href)) {
            matomoWindow()._paq?.push(['trackLink', link.href, type]);
        }
    }

    // Zoals Matomo na enableLinkTracking(): ook de middelste muisknop (mousedown en mouseup op dezelfde link) en het
    // contextmenu tellen als klik.
    private isLinkActivation(event: MouseEvent, link: Element): boolean {
        const middleMouseButton = event.button === MIDDLE_MOUSE_BUTTON;
        switch (event.type) {
            case 'click':
                return !middleMouseButton;
            case 'mousedown':
                this.middleMouseDownLink = middleMouseButton ? link : undefined;
                return false;
            case 'mouseup': {
                const activated = middleMouseButton && this.middleMouseDownLink === link;
                this.middleMouseDownLink = undefined;
                return activated;
            }
            case 'contextmenu':
                return true;
            default:
                return false;
        }
    }
}

export const matomoShadowDomLinkTracking = new MatomoShadowDomLinkTracking();

/**
 * Laat Matomo ook klikken loggen op uitgaande links en downloads in de shadow DOM van web-componenten. Enkel nodig als
 * de toepassing Matomo zelf laadt, en werkt enkel als Matomo via `window._paq` geconfigureerd is.
 */
export const enableMatomoShadowDomLinkTracking = (): void => matomoShadowDomLinkTracking.enable();
