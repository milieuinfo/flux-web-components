import { webComponent } from '@domg-wc/common';
import { VlCookie } from './vl-cookie.section';

@webComponent('vl-header-authentication-cookie')
export class VlHeaderAuthenticationCookie extends VlCookie {
    constructor() {
        super({
            title: 'Vlaams toegangsbeheer cookies',
            name: [
                'AMWEBJCT!%2Fsps!JSESSIONID',
                'https%3A%2F%2Fauthenticatie.vlaanderen.be%2Fsps%2Fvidp%2Fsaml20FIMSAML20',
                'PD_STATEFUL_5bb64e42-0d53-11e2-a712-52540052f0ed',
                'PD-H-SESSION-ID',
                'tbsession',
            ],
            purpose:
                'Sessiegebaseerde cookies die het mogelijk maken om gebruikers te herkennen op een webpagina van het Vlaams toegangsbeheer.',
            domain: 'authenticatie.vlaanderen.be',
            processor: 'Vlaamse overheid',
            validity: 'Sessie',
        });
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-header-authentication-cookie': VlHeaderAuthenticationCookie;
    }
}
