import { MatomoShadowDomLinkTracking } from './matomo-shadow-dom-link-tracking.util';
import { matomoWindow } from './matomo-window.util';

describe('jest - components - cookie-consent - matomo shadow dom link tracking util', () => {
    const LINK = 'https://www.example.com/document';
    let tracking: MatomoShadowDomLinkTracking;
    let matomoHandler: jest.Mock;

    const paqCommands = (name: string) => (matomoWindow()._paq ?? []).filter(([command]) => command === name);

    // Simuleert Matomo dat de 'addListener' commando's uit _paq uitvoert, net zoals bij het laden van matomo.js.
    const loadMatomo = (handler = matomoHandler) => {
        paqCommands('addListener').forEach(([, element]) =>
            ['click', 'mouseup', 'mousedown', 'contextmenu'].forEach((type) =>
                (element as EventTarget).addEventListener(type, handler, false)
            )
        );
    };

    const createComponent = (shadowHtml: string, parent: Node = document.body): HTMLElement => {
        const host = document.createElement('div');
        host.attachShadow({ mode: 'open' }).innerHTML = shadowHtml;
        parent.appendChild(host);
        return host;
    };

    const shadowLink = (host: HTMLElement): HTMLAnchorElement => host.shadowRoot!.querySelector('a')!;

    // jsdom vult `which` niet zelf in: een browser zet het voor een muisknop op button + 1
    const fire = (target: Element, type: string, button = 0) =>
        target.dispatchEvent(new MouseEvent(type, { bubbles: true, composed: true, button, which: button + 1 }));

    const trackLinkCommands = () => paqCommands('trackLink');

    beforeEach(() => {
        delete matomoWindow()._paq;
        document.body.innerHTML = '';
        matomoHandler = jest.fn();
        tracking = new MatomoShadowDomLinkTracking();
    });

    afterEach(() => {
        tracking.disable();
    });

    describe('enable', () => {
        it('should add a Matomo listener once', () => {
            tracking.enable();
            tracking.enable();

            expect(paqCommands('addListener')).toHaveLength(1);
        });

        it('should preserve existing _paq commands', () => {
            matomoWindow()._paq = [['existing', 'command']];

            tracking.enable();

            expect(matomoWindow()._paq).toContainEqual(['existing', 'command']);
        });

        it('should not fail when Matomo is not loaded', () => {
            tracking.enable();
            const host = createComponent(`<a href="${LINK}">link</a>`);

            expect(() => fire(shadowLink(host), 'click')).not.toThrow();
            expect(matomoHandler).not.toHaveBeenCalled();
        });

        it('should stop forwarding clicks after disable', () => {
            tracking.enable();
            loadMatomo();
            const host = createComponent(`<a href="${LINK}">link</a>`);

            tracking.disable();
            fire(shadowLink(host), 'click');

            expect(matomoHandler).not.toHaveBeenCalled();
        });
    });

    describe('forward to Matomo', () => {
        beforeEach(() => {
            tracking.enable();
            loadMatomo();
        });

        it('should forward a click on a link in the shadow DOM with the link as target', () => {
            const host = createComponent(`<a href="${LINK}"><span>link</span></a>`);

            fire(host.shadowRoot!.querySelector('span')!, 'click');

            expect(matomoHandler).toHaveBeenCalledTimes(1);
            expect(matomoHandler).toHaveBeenCalledWith(
                expect.objectContaining({ type: 'click', target: shadowLink(host), button: 0 })
            );
        });

        it('should forward a click on slotted content of a link in the shadow DOM', () => {
            const host = createComponent(`<a href="${LINK}"><slot></slot></a>`);
            const slotted = document.createElement('span');
            host.appendChild(slotted);

            fire(slotted, 'click');

            expect(matomoHandler).toHaveBeenCalledWith(expect.objectContaining({ target: shadowLink(host) }));
        });

        it('should forward a click on a link in a nested shadow DOM', () => {
            const outerHost = createComponent('<div></div>');
            const innerHost = createComponent(`<a href="${LINK}">link</a>`, outerHost.shadowRoot!);

            fire(shadowLink(innerHost), 'click');

            expect(matomoHandler).toHaveBeenCalledWith(expect.objectContaining({ target: shadowLink(innerHost) }));
        });

        it('should forward a click that the component does not let through to the document', () => {
            const host = createComponent(`<a href="${LINK}">link</a>`);
            host.addEventListener('click', (event) => event.stopPropagation());

            fire(shadowLink(host), 'click');

            expect(matomoHandler).toHaveBeenCalledTimes(1);
        });

        it('should forward a click to the handlers of every Matomo tracker', () => {
            const secondMatomoHandler = jest.fn();
            loadMatomo(secondMatomoHandler);
            const host = createComponent(`<a href="${LINK}">link</a>`);

            fire(shadowLink(host), 'click');

            expect(matomoHandler).toHaveBeenCalledTimes(1);
            expect(secondMatomoHandler).toHaveBeenCalledTimes(1);
        });

        it('should forward the mouse events Matomo needs for middle clicks and the context menu', () => {
            const host = createComponent(`<a href="${LINK}">link</a>`);

            fire(shadowLink(host), 'mousedown', 1);
            fire(shadowLink(host), 'mouseup', 1);
            fire(shadowLink(host), 'contextmenu', 2);

            expect(matomoHandler.mock.calls.map(([event]) => [event.type, event.button])).toEqual([
                ['mousedown', 1],
                ['mouseup', 1],
                ['contextmenu', 2],
            ]);
        });

        it('should forward which, so Matomo does not take the back button of the mouse for the middle button', () => {
            const host = createComponent(`<a href="${LINK}">link</a>`);

            fire(shadowLink(host), 'mousedown', 3);
            fire(shadowLink(host), 'mouseup', 3);

            expect(matomoHandler.mock.calls.map(([event]) => [event.type, event.button, event.which])).toEqual([
                ['mousedown', 3, 4],
                ['mouseup', 3, 4],
            ]);
        });

        it('should not forward a click on a link in the light DOM', () => {
            const link = document.createElement('a');
            link.href = LINK;
            document.body.appendChild(link);

            fire(link, 'click');

            expect(matomoHandler).not.toHaveBeenCalled();
        });

        it('should not forward a click outside a link', () => {
            const host = createComponent('<button>knop</button>');

            fire(host.shadowRoot!.querySelector('button')!, 'click');

            expect(matomoHandler).not.toHaveBeenCalled();
        });

        it('should not forward a click on a link without href', () => {
            const host = createComponent('<a>link</a>');

            fire(shadowLink(host), 'click');

            expect(matomoHandler).not.toHaveBeenCalled();
        });

        it('should not forward a click on a link in a closed shadow DOM', () => {
            const host = document.createElement('div');
            const closedShadowRoot = host.attachShadow({ mode: 'closed' });
            closedShadowRoot.innerHTML = `<a href="${LINK}">link</a>`;
            document.body.appendChild(host);

            fire(closedShadowRoot.querySelector('a')!, 'click');

            expect(matomoHandler).not.toHaveBeenCalled();
        });
    });

    describe.each([
        ['the light DOM of the page', (): Node => document.body],
        ['the shadow DOM of an application', (): Node => createComponent('').shadowRoot!],
    ])('Matomo classes around the component in %s', (_context, getRoot) => {
        beforeEach(() => {
            tracking.enable();
            loadMatomo();
        });

        it.each(['matomo_ignore', 'matomo_download'])(
            'should not look at the %s class on an element around the component',
            (className) => {
                const wrapper = document.createElement('div');
                wrapper.className = className;
                getRoot().appendChild(wrapper);
                const host = createComponent(`<a href="${LINK}">link</a>`, wrapper);

                fire(shadowLink(host), 'click');

                expect(matomoHandler).toHaveBeenCalledTimes(1);
                expect(trackLinkCommands()).toHaveLength(0);
            }
        );

        it('should not look at the Matomo class on a component the component is slotted in', () => {
            const parent = createComponent('<slot></slot>', getRoot());
            parent.className = 'matomo_ignore';
            const host = createComponent(`<a href="${LINK}">link</a>`, parent);

            fire(shadowLink(host), 'click');

            expect(matomoHandler).toHaveBeenCalledTimes(1);
        });
    });

    describe('Matomo classes on the component', () => {
        beforeEach(() => {
            tracking.enable();
            loadMatomo();
        });

        it.each(['matomo_ignore', 'matomo-ignore', 'piwik_ignore', 'piwik-ignore'])(
            'should ignore a link when the component has the %s class',
            (className) => {
                const host = createComponent(`<a href="${LINK}">link</a>`);
                host.className = `vl-spacer ${className}`;

                fire(shadowLink(host), 'click');

                expect(matomoHandler).not.toHaveBeenCalled();
                expect(trackLinkCommands()).toHaveLength(0);
            }
        );

        it.each([
            ['matomo_download', 'download'],
            ['piwik-download', 'download'],
            ['matomo_link', 'link'],
        ])('should track the link type when the component has the %s class', (className, type) => {
            const host = createComponent(`<a href="${LINK}">link</a>`);
            host.className = className;

            fire(shadowLink(host), 'click');

            expect(matomoHandler).not.toHaveBeenCalled();
            expect(trackLinkCommands()).toEqual([['trackLink', LINK, type]]);
        });

        it.each(['my-matomo_ignore', 'matomo_ignored', 'matomo_download_button'])(
            'should not take the %s class for a Matomo class',
            (className) => {
                const host = createComponent(`<a href="${LINK}">link</a>`);
                host.className = className;

                fire(shadowLink(host), 'click');

                expect(matomoHandler).toHaveBeenCalledTimes(1);
                expect(trackLinkCommands()).toHaveLength(0);
            }
        );

        it.each([
            ['matomo_download matomo_link', [['trackLink', LINK, 'link']]],
            ['matomo_download matomo_ignore', []],
            ['matomo_link matomo_ignore', []],
        ])('should give priority to ignore, then link, then download for %s', (className, expectedCommands) => {
            const host = createComponent(`<a href="${LINK}">link</a>`);
            host.className = className;

            fire(shadowLink(host), 'click');

            expect(matomoHandler).not.toHaveBeenCalled();
            expect(trackLinkCommands()).toEqual(expectedCommands);
        });

        it('should use the Matomo class of the outer component for a link in a nested component', () => {
            const outerHost = createComponent('<div></div>');
            outerHost.className = 'matomo_download';
            const innerHost = createComponent(
                `<a href="${LINK}">link</a>`,
                outerHost.shadowRoot!.querySelector('div')!
            );

            fire(shadowLink(innerHost), 'click');

            expect(trackLinkCommands()).toEqual([['trackLink', LINK, 'download']]);
        });

        it('should use the closest Matomo class', () => {
            const outerHost = createComponent('<div></div>');
            outerHost.className = 'matomo_ignore';
            const innerHost = createComponent(`<a href="${LINK}">link</a>`, outerHost.shadowRoot!);
            innerHost.className = 'matomo_download';

            fire(shadowLink(innerHost), 'click');

            expect(trackLinkCommands()).toEqual([['trackLink', LINK, 'download']]);
        });

        it('should use the Matomo class on the link itself before the class on the component', () => {
            const host = createComponent(`<a class="matomo_download" href="${LINK}">link</a>`);
            host.className = 'matomo_ignore';

            fire(shadowLink(host), 'click');

            expect(trackLinkCommands()).toEqual([['trackLink', LINK, 'download']]);
        });

        it('should track a middle click and the context menu like Matomo does', () => {
            const host = createComponent(`<a href="${LINK}">link</a>`);
            host.className = 'matomo_download';

            fire(shadowLink(host), 'mousedown', 1);
            fire(shadowLink(host), 'mouseup', 1);
            fire(shadowLink(host), 'mouseup', 1);
            fire(shadowLink(host), 'mousedown', 0);
            fire(shadowLink(host), 'mouseup', 0);
            fire(shadowLink(host), 'contextmenu', 2);

            expect(trackLinkCommands()).toHaveLength(2);
        });

        it('should not track the click event of a middle click a second time', () => {
            const host = createComponent(`<a href="${LINK}">link</a>`);
            host.className = 'matomo_download';

            fire(shadowLink(host), 'mousedown', 1);
            fire(shadowLink(host), 'mouseup', 1);
            fire(shadowLink(host), 'click', 1);

            expect(trackLinkCommands()).toHaveLength(1);
        });

        it.each(['mailto:info@example.com', 'tel:+3225530000', 'javascript:void(0)'])(
            'should not track a %s link',
            (href) => {
                const host = createComponent(`<a href="${href}">link</a>`);
                host.className = 'matomo_link';

                fire(shadowLink(host), 'click');

                expect(trackLinkCommands()).toHaveLength(0);
            }
        );
    });
});
