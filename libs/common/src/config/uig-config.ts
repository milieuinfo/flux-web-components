export interface Preferences {
    autoRegisterStyles?: boolean;
    logWebComponentRegistration?: boolean;
    logTreeshakeRegistration?: boolean;
}

const defaultPreferences = (): Preferences => ({
    autoRegisterStyles: true,
    logWebComponentRegistration: false,
    logTreeshakeRegistration: false,
});

export class UigConfig {
    private static preferences: Preferences | null = null;

    static setPreferences(preferences: Preferences) {
        if (!this.preferences) {
            this.preferences = { ...defaultPreferences(), ...preferences };
            console.info('expliciete uig preferences: ', this.preferences);
        } else {
            console.error('er worden expliciete uig preferences gezet, maar te laat');
        }
    }

    static getPreferences(): Preferences {
        this.initialisePreferences();
        return <Preferences>this.preferences;
    }

    private static initialisePreferences() {
        if (this.preferences) return;
        // de preferences werden niet expliciet gezet dus de defaults nemen
        this.preferences = defaultPreferences();
        // indien de fat-js variant gebruikt wordt kunnen de defaults nog gewijzigd worden op de script-tag
        if (typeof document !== 'undefined') {
            for (const script of document?.scripts) {
                if (script.src.indexOf('domg-wc') >= 0) {
                    if (script.getAttribute('auto-register-styles') === 'false') {
                        this.preferences.autoRegisterStyles = false;
                    }
                    if (script.getAttribute('log-web-component-registration') === 'true') {
                        this.preferences.logWebComponentRegistration = true;
                    }
                }
            }
        }
        console.info('geconfigureerde uig preferences: ', this.preferences);
    }
}
