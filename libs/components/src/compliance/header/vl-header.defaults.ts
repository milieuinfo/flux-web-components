import { ApplicationMenuLink } from '@govflanders/vl-widget-global-header-types';

export const headerDefaults = {
    authenticatedUserUrl: '/sso/ingelogde_gebruiker' as string,
    development: false as boolean,
    identifier: '' as string,
    loginRedirectUrl: '/' as string,
    loginUrl: '/sso/aanmelden' as string,
    logoutUrl: '/sso/afgemeld' as string,
    switchCapacityUrl: '/sso/wissel_organisatie' as string,
    simple: false as boolean,
    skeleton: false as boolean,
    rejectLogout: false as boolean,
    logoutCallback: null as ((reason: string) => Promise<boolean>) | null,
    applicationLinks: [] as ApplicationMenuLink[],
} as const;
