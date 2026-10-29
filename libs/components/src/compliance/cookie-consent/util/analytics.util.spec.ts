import { analytics } from './analytics.util';
import { matomoShadowDomLinkTracking } from './matomo-shadow-dom-link-tracking.util';
import { matomoWindow } from './matomo-window.util';

describe('jest - components - cookie-consent - analytics util', () => {
    let mockScript: HTMLScriptElement;
    let mockFirstScript: HTMLScriptElement;
    let mockParentNode: { insertBefore: jest.Mock };

    const setupAnalytics = () => {
        analytics.setMatomoConfig(789, '//matomo.test.com/');
    };

    const getHashchangeHandler = (): Function | undefined => {
        return (window.addEventListener as jest.Mock).mock.calls.find((call) => call[0] === 'hashchange')?.[1];
    };

    beforeEach(() => {
        // Reset analytics instance
        (analytics as any).matomoParameters = undefined;

        // Mock window._paq
        delete (window as any)._paq;

        // Mock DOM methods
        mockScript = document.createElement('script');
        mockFirstScript = document.createElement('script');

        // Create mock parent node with insertBefore method
        mockParentNode = {
            insertBefore: jest.fn().mockReturnValue(mockScript),
        };
        Object.defineProperty(mockFirstScript, 'parentNode', {
            value: mockParentNode,
            writable: true,
            configurable: true,
        });

        jest.spyOn(document, 'createElement').mockReturnValue(mockScript);
        jest.spyOn(document, 'getElementById').mockReturnValue(null);
        jest.spyOn(document, 'getElementsByTagName').mockReturnValue([mockFirstScript] as any);

        // Mock window.addEventListener
        jest.spyOn(window, 'addEventListener').mockImplementation(() => {});

        // Console logging afzetten
        jest.spyOn(console, 'warn').mockImplementation(() => {});
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('setMatomoConfig & id getter', () => {
        it('should return undefined when no configuration is set', () => {
            expect(analytics.id).toBeUndefined();
        });

        it('should set and return matomo configuration', () => {
            analytics.setMatomoConfig(123, '//stats.example.com/');

            expect(analytics.id).toEqual({
                id: 123,
                url: '//stats.example.com/',
            });
        });

        it('should return undefined when matomoId is missing', () => {
            (analytics as any).matomoParameters = { matomoId: null, matomoUrl: '//test.com/' };

            expect(analytics.id).toBeUndefined();
        });

        it('should return undefined when matomoUrl is missing', () => {
            (analytics as any).matomoParameters = { matomoId: 123, matomoUrl: null };

            expect(analytics.id).toBeUndefined();
        });
    });

    describe('initializeTracking', () => {
        it('should not initialize when no configuration is set', () => {
            analytics.initializeTracking();

            expect(matomoWindow()._paq).toBeUndefined();
        });

        it('should initialize and configure Matomo tracking', () => {
            setupAnalytics();

            analytics.initializeTracking();

            expect(matomoWindow()._paq).toBeDefined();
            expect(Array.isArray(matomoWindow()._paq)).toBe(true);
            expect(matomoWindow()._paq).toContainEqual(['setTrackerUrl', '//matomo.test.com/piwik.php']);
            expect(matomoWindow()._paq).toContainEqual(['setSiteId', 789]);
            expect(matomoWindow()._paq).toContainEqual(['trackPageView']);
            expect(matomoWindow()._paq).toContainEqual(['enableLinkTracking']);
        });

        it('should preserve existing _paq commands', () => {
            matomoWindow()._paq = [['existing', 'command']];
            setupAnalytics();

            analytics.initializeTracking();

            expect(matomoWindow()._paq).toContainEqual(['existing', 'command']);
            expect(matomoWindow()._paq).toContainEqual(['setTrackerUrl', '//matomo.test.com/piwik.php']);
        });

        it('should load Matomo script with correct attributes', () => {
            setupAnalytics();

            analytics.initializeTracking();

            expect(document.createElement).toHaveBeenCalledWith('script');
            expect(mockScript.id).toBe('vl-cookie-consent-matomo-piwik-script');
            expect(mockScript.src).toContain('matomo.test.com/piwik.js');
            expect(mockScript.async).toBe(true);
            expect(mockScript.defer).toBe(true);
        });

        it('should not enable shadow DOM link tracking by default', () => {
            const enableSpy = jest.spyOn(matomoShadowDomLinkTracking, 'enable').mockImplementation(() => {});
            setupAnalytics();

            analytics.initializeTracking();

            expect(enableSpy).not.toHaveBeenCalled();
        });

        it('should enable shadow DOM link tracking when configured', () => {
            const enableSpy = jest.spyOn(matomoShadowDomLinkTracking, 'enable').mockImplementation(() => {});
            analytics.setMatomoConfig(789, '//matomo.test.com/', true);

            analytics.initializeTracking();

            expect(enableSpy).toHaveBeenCalledTimes(1);
        });

        it('should setup hashchange tracking', () => {
            setupAnalytics();

            analytics.initializeTracking();

            expect(window.addEventListener).toHaveBeenCalledWith('hashchange', expect.any(Function));
        });
    });

    describe('loadMatomoScript', () => {
        it('should not load script if already loaded', () => {
            jest.spyOn(document, 'getElementById').mockReturnValue(mockScript);
            setupAnalytics();

            analytics.initializeTracking();

            expect(mockFirstScript.parentNode?.insertBefore).not.toHaveBeenCalled();
        });

        it('should insert script before first script tag', () => {
            setupAnalytics();

            analytics.initializeTracking();

            expect(mockFirstScript.parentNode?.insertBefore).toHaveBeenCalledWith(mockScript, mockFirstScript);
        });
    });

    describe('setupHashChangeTracking', () => {
        it('should track page view on hashchange', () => {
            setupAnalytics();
            matomoWindow()._paq = [];

            analytics.initializeTracking();

            const hashchangeHandler = getHashchangeHandler();
            expect(hashchangeHandler).toBeDefined();

            window.location.hash = '#test-page';
            hashchangeHandler!();

            expect(matomoWindow()._paq).toContainEqual(['trackPageView']);
            expect(matomoWindow()._paq).toContainEqual(['setCustomUrl', 'test-page']);
        });

        it('should not track if _paq is not initialized', () => {
            setupAnalytics();
            analytics.initializeTracking();

            delete (window as any)._paq;

            const hashchangeHandler = getHashchangeHandler();
            expect(() => hashchangeHandler!()).not.toThrow();
        });

        it('should track media and forms if content element exists', () => {
            const mockContent = document.createElement('div');
            mockContent.id = 'content';
            jest.spyOn(document, 'getElementById').mockImplementation((id) => {
                if (id === 'content') return mockContent;
                return null;
            });

            setupAnalytics();
            matomoWindow()._paq = [];
            analytics.initializeTracking();

            const hashchangeHandler = getHashchangeHandler();
            hashchangeHandler!();

            expect(matomoWindow()._paq).toContainEqual(['MediaAnalytics::scanForMedia', mockContent]);
            expect(matomoWindow()._paq).toContainEqual(['FormAnalytics::scanForForms', mockContent]);
            expect(matomoWindow()._paq).toContainEqual(['trackContentImpressionsWithinNode', mockContent]);
        });
    });
});
