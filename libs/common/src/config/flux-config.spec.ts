import { FluxConfig } from './flux-config';

describe('jest - common - flux-config', () => {
    beforeEach(() => {
        // foefel om te zorgen dat elke test met niet geïnitialiseerde preferences start
        FluxConfig['preferences'] = null;
        // console logging afzetten
        jest.spyOn(console, 'info').mockImplementation(() => {});
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    it('should use the default preferences', () => {
        const fluxPreferences = FluxConfig.getPreferences();
        expect(fluxPreferences.autoRegisterStyles).toEqual(true);
        expect(fluxPreferences.logWebComponentRegistration).toEqual(false);
        expect(fluxPreferences.logTreeshakeRegistration).toEqual(false);
        expect(fluxPreferences.prozaDomain).toBeUndefined();
    });

    it('should use the custom specified preferences', () => {
        FluxConfig.setPreferences({
            autoRegisterStyles: false,
            logWebComponentRegistration: true,
            logTreeshakeRegistration: true,
        });
        const fluxPreferences = FluxConfig.getPreferences();
        expect(fluxPreferences.autoRegisterStyles).toEqual(false);
        expect(fluxPreferences.logWebComponentRegistration).toEqual(true);
        expect(fluxPreferences.logTreeshakeRegistration).toEqual(true);
    });

    it('should use the custom specified preference, otherwise the default', () => {
        FluxConfig.setPreferences({ logWebComponentRegistration: true });
        const fluxPreferences = FluxConfig.getPreferences();
        expect(fluxPreferences.autoRegisterStyles).toEqual(true);
        expect(fluxPreferences.logWebComponentRegistration).toEqual(true);
        expect(fluxPreferences.logTreeshakeRegistration).toEqual(false);
    });

    it('should use the custom specified prozaDomain preference', () => {
        FluxConfig.setPreferences({ prozaDomain: 'mijn-domein' });
        const fluxPreferences = FluxConfig.getPreferences();
        expect(fluxPreferences.prozaDomain).toEqual('mijn-domein');
        expect(fluxPreferences.autoRegisterStyles).toEqual(true);
    });

    it('should use the default preferences when the custom ones are set too late', () => {
        const fluxPreferences = FluxConfig.getPreferences();
        FluxConfig.setPreferences({
            autoRegisterStyles: false,
            logWebComponentRegistration: true,
            logTreeshakeRegistration: true,
        });
        expect(fluxPreferences.autoRegisterStyles).toEqual(true);
        expect(fluxPreferences.logWebComponentRegistration).toEqual(false);
        expect(fluxPreferences.logTreeshakeRegistration).toEqual(false);
    });
});
