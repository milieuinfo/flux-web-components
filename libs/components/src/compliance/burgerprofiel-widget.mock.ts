/**
 * Test-only mock voor de burgerprofiel-widgetinfrastructuur van vl-header en vl-footer.
 *
 * Die componenten laden bij het importeren van hun module - via `@webComponentCustom` - het widget-polyfill- en
 * widget-client-script van prod.widgets.burgerprofiel.vlaanderen.be. De client bootstrapt daarna at runtime de widget
 * zelf (tni.widgets.burgerprofiel.dev-vlaanderen.be bij `development`), en die widget injecteert op zijn beurt opnieuw
 * scripts en HTML. In component-testen zijn dat calls naar externe omgevingen die we niet controleren: traag, en
 * regelmatig falend.
 *
 * De scriptcalls vertrekken al terwijl de spec-bundle geladen wordt - dus voor de eerste hook draait - waardoor
 * `cy.intercept` er per definitie te laat voor komt. Daarom blokkeert dit bestand ze bij import, met placeholder-
 * scripts onder de ids die `awaitScript` gebruikt. `stubBurgerprofielWidgetClient` vervangt vervolgens de client zelf,
 * zodat ook de bootstrap van de widget geen netwerk meer raakt.
 *
 * Importeer dit bestand in een spec *voor* de header- of footer-component, anders is `awaitScript` al vertrokken.
 */

const WIDGET_SCRIPT_IDS = ['vl-header-polyfill', 'vl-header-client', 'vl-footer-polyfill', 'vl-footer-client'];

WIDGET_SCRIPT_IDS.forEach((id) => {
    if (document.head.querySelector(`script#${id}`)) {
        return;
    }

    const placeholder = document.createElement('script');
    placeholder.id = id;
    placeholder.type = 'text/plain'; // zonder src en zonder uitvoerbaar type wordt er niets opgehaald of uitgevoerd

    document.head.appendChild(placeholder);
});

export type ApplicationMenuLink = { type?: string; label: string; href: string };

export type BurgerprofielWidgetMock = {
    /** De urls waarmee de widget-client gebootstrapt werd. */
    bootstrapUrls: string[];
    /** De configuraties die naar de sessie-extensie gestuurd werden. */
    sessionConfigs: unknown[];
    /** De handlers die op de widget geregistreerd werden, per event. */
    eventHandlers: Record<string, ((payload: any) => void)[]>;
};

const createWidgetLink = (label = 'Vlaanderen', href = 'https://www.vlaanderen.be'): HTMLAnchorElement => {
    const link = document.createElement('a');
    link.href = href;
    link.textContent = label;

    return link;
};

/**
 * De echte widget vervangt het mount-element door zijn eigen markup. De componenten pikken dat op met een
 * MutationObserver op de container, die in de toegevoegde nodes naar een <header>/<footer> zoekt.
 */
const createWidgetRoot = (variant: 'header' | 'footer'): HTMLElement => {
    if (variant === 'footer') {
        const root = document.createElement('footer');
        root.className = 'vlw__footer';
        root.appendChild(createWidgetLink());

        return root;
    }

    const root = document.createElement('div');
    root.className = 'vlw__header';

    // De <header> staat er enkel opdat de detectie van de component zou aanslaan. Zonder role="presentation" wordt
    // het een tweede banner-landmark binnen #header__container, en dat is een a11y-fout die de mock zelf introduceert.
    const banner = document.createElement('header');
    banner.setAttribute('role', 'presentation');
    banner.appendChild(createWidgetLink());
    root.appendChild(banner);

    return root;
};

const createWidget = (mock: BurgerprofielWidgetMock) => {
    let mountElement: HTMLElement | null = null;
    let root: HTMLElement | null = null;

    const applicationGroup = {
        addMultiple: (links: ApplicationMenuLink[]) => {
            links.forEach((link) => root?.appendChild(createWidgetLink(link.label, link.href)));
        },
    };

    return {
        setMountElement: (element: HTMLElement | null) => {
            mountElement = element;
        },
        mount: () => {
            const container = mountElement?.parentElement;

            if (mountElement && container) {
                root = createWidgetRoot(mountElement.id === 'footer' ? 'footer' : 'header');
                container.replaceChild(root, mountElement);
            }

            return Promise.resolve();
        },
        getExtension: (name: string) => {
            if (name === 'citizen_profile') {
                return Promise.resolve({ getMenu: () => ({ getGroup: () => applicationGroup }) });
            }

            if (name === 'citizen_profile.session') {
                return Promise.resolve({ configure: (config: unknown) => mock.sessionConfigs.push(config) });
            }

            return Promise.reject(new Error(`burgerprofiel-widget mock - onbekende extensie: ${name}`));
        },
        on: (event: string, handler: (payload: any) => void) => {
            mock.eventHandlers[event] = [...(mock.eventHandlers[event] ?? []), handler];
        },
    };
};

/**
 * Zet een fake widget-client op `window.vl.widget.client`. Roep dit aan voor de component gemount wordt: de client
 * wordt uitgelezen in `connectedCallback`.
 */
export const stubBurgerprofielWidgetClient = (): BurgerprofielWidgetMock => {
    const mock: BurgerprofielWidgetMock = { bootstrapUrls: [], sessionConfigs: [], eventHandlers: {} };
    const win = window as unknown as { vl: any };

    win.vl = win.vl ?? {};
    win.vl.widget = {
        client: {
            bootstrap: (url: string) => {
                mock.bootstrapUrls.push(url);

                return Promise.resolve(createWidget(mock));
            },
        },
    };

    return mock;
};
