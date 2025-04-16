import { webComponent } from '@domg-wc/common';
import { VlCookie } from './vl-cookie.section';

@webComponent('vl-authentication-cookie')
export class VlAuthenticationCookie extends VlCookie {
    constructor() {
        super({
            title: 'Departement Omgeving toegangsbeheer cookies',
            name: ['KEYCLOAK_SESSION', 'KEYCLOAK_SESSION_LEGACY'],
            purpose:
                'Sessiegebaseerde cookies die het mogelijk maken om gebruikers te herkennen op een webpagina van Departement Omgeving.',
            domain: window.location.hostname,
            processor: 'Departement Omgeving',
            validity: '10 uur',
        });
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-authentication-cookie': VlAuthenticationCookie;
    }
}
