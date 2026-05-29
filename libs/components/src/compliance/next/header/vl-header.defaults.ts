import { ApplicationMenuLink, IDPData } from '@govflanders/vl-widget-global-header-types';

export const headerDefaults = {
    authenticatedUserUrl: '/sso/ingelogde_gebruiker' as string,
    development: false as boolean,
    identifier: '' as string,
    loginUrl: '/sso/aanmelden' as string,
    logoutUrl: '/sso/afgemeld' as string,
    switchCapacityUrl: '/sso/wissel_organisatie' as string,
    simple: false as boolean,
    skeleton: false as boolean,
    applicationLinks: [] as ApplicationMenuLink[],
    profileTokenUrl: '/sso/papi_token' as string,
    idpDataUrl: '' as string,
    idpProfileToken: undefined as string | undefined,
    idpData: undefined as IDPData | undefined,
} as const;
