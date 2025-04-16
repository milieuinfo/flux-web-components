import { UigConfig } from './uig-config';

describe('uig-config preferences', () => {
    beforeEach(() => {
        // foefel om te zorgen dat elke test met niet geïnitialiseerde preferences start
        UigConfig['preferences'] = null;
        // console logging afzetten
        jest.spyOn(console, 'info').mockImplementation(() => {});
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    it('should use the default preferences', () => {
        const uigPreferences = UigConfig.getPreferences();
        expect(uigPreferences.autoRegisterStyles).toEqual(true);
        expect(uigPreferences.logWebComponentRegistration).toEqual(false);
    });

    it('should use the custom specified preferences', () => {
        UigConfig.setPreferences({ autoRegisterStyles: false, logWebComponentRegistration: true });
        const uigPreferences = UigConfig.getPreferences();
        expect(uigPreferences.autoRegisterStyles).toEqual(false);
        expect(uigPreferences.logWebComponentRegistration).toEqual(true);
    });

    it('should use the custom specified preference, otherwise the default', () => {
        UigConfig.setPreferences({ logWebComponentRegistration: true });
        const uigPreferences = UigConfig.getPreferences();
        expect(uigPreferences.autoRegisterStyles).toEqual(true);
        expect(uigPreferences.logWebComponentRegistration).toEqual(true);
    });

    it('should use the default preferences when the custom ones are set too late', () => {
        const uigPreferences = UigConfig.getPreferences();
        UigConfig.setPreferences({ autoRegisterStyles: false, logWebComponentRegistration: true });
        expect(uigPreferences.autoRegisterStyles).toEqual(true);
        expect(uigPreferences.logWebComponentRegistration).toEqual(false);
    });
});
