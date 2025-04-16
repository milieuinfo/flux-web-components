import { webComponent } from '@domg-wc/common';
import { VlCookie } from './vl-cookie.section';

@webComponent('vl-header-cookie')
export class VlHeaderCookie extends VlCookie {
    constructor() {
        super({
            title: 'Vlaanderen header cookie',
            name: 'VOGANONUSER',
            purpose:
                'De Reverse Proxy van de Vlaamse overheid plaats dit cookie in kader van de Vlaanderen header op Vlaanderen.be om de goede uitvoering van de verzending van communicatie over een elektronisch communicatienetwerk van de Vlaamse overheid te verzekeren.',
            domain: 'vlaanderen.be',
            processor: 'Vlaamse overheid',
            validity: 'Permanente cookies met een geldigheid van maximaal 24 uur',
        });
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-header-cookie': VlHeaderCookie;
    }
}
