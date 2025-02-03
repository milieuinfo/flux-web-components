import { HTMLTemplateResult, html } from 'lit';

interface ErrorCode {
    [key: string]: {
        title: string;
        image: string;
        imageAlt: string;
        errorText: HTMLTemplateResult;
        errorActions: HTMLTemplateResult;
    };
}

const errorCodes: ErrorCode = {
    '400': {
        title: 'Oeps, dat ging fout',
        image: 'https://cdn.milieuinfo.be/http-error-message-assets/LATEST/img/unexpected-error.svg',
        imageAlt: 'Verkeerd verzoek',
        errorText: html` <p>
            <a href="mailto:help@omgevingvlaanderen.be?subject=HTTP-code 400">Mail de helpdesk</a> en vermeld daarbij de
            URL hierboven en de foutcode 400.
        </p>`,
        errorActions: html` <div>
            <vl-link-next href="/">Terug naar de startpagina</vl-link-next>
        </div>`,
    },
    '401': {
        title: 'Meld u eerst aan',
        image: 'https://cdn.milieuinfo.be/http-error-message-assets/LATEST/img/unexpected-error.svg',
        imageAlt: 'Niet aangemeld',
        errorText: html` <p>
            Om toegang te krijgen tot deze pagina, moet u eerst aangemeld zijn.
            <a href="mailto:help@omgevingvlaanderen.be?subject=HTTP-code 401">Mail de helpdesk</a> en vermeld daarbij de
            URL hierboven en de foutcode 401.
        </p>`,
        errorActions: html` <div>
            <vl-link-next href="/">Terug naar de startpagina</vl-link-next>
        </div>`,
    },
    '403': {
        title: 'Geen toegang tot deze pagina',
        image: 'https://cdn.milieuinfo.be/http-error-message-assets/LATEST/img/unexpected-error.svg',
        imageAlt: 'Onvoldoende rechten',
        errorText: html` <p>
            U heeft daarvoor onvoldoende rechten.
            <a href="mailto:help@omgevingvlaanderen.be?subject=HTTP-code 403">Mail de helpdesk</a> en vermeld daarbij de
            URL hierboven en de foutcode 403.
        </p>`,
        errorActions: html` <div>
            <vl-link-next href="/">Terug naar de startpagina</vl-link-next>
        </div>`,
    },
    '404': {
        title: 'Pagina niet gevonden',
        image: 'https://cdn.milieuinfo.be/http-error-message-assets/LATEST/img/page-not-found.svg',
        imageAlt: 'Pagina niet gevonden',
        errorText: html` <p>
            We vonden de pagina niet terug. Controleer even of u een tikfout heeft gemaakt. Bent u via een link of
            website op deze pagina gekomen.
            <a href="mailto:help@omgevingvlaanderen.be?subject=HTTP-code 404">Mail dan de helpdesk</a> en vermeld
            daarbij de URL hierboven en de foutcode 404.
        </p>`,
        errorActions: html` <div>
            <vl-link-next href="/">Terug naar de startpagina</vl-link-next>
        </div>`,
    },
    '405': {
        title: 'Niet toegelaten',
        image: 'https://cdn.milieuinfo.be/http-error-message-assets/LATEST/img/unexpected-error.svg',
        imageAlt: 'Niet toegelaten',
        errorText: html` <p>
            Er ging iets fout.
            <a href="mailto:help@omgevingvlaanderen.be?subject=HTTP-code 405">Mail de helpdesk</a> en vermeld daarbij de
            URL hierboven en de foutcode 405.
        </p>`,
        errorActions: html` <div>
            <vl-link-next href="/">Terug naar de startpagina</vl-link-next>
        </div>`,
    },
    '408': {
        title: 'Oeps, dat duurde te lang',
        image: 'https://cdn.milieuinfo.be/http-error-message-assets/LATEST/img/unexpected-error.svg',
        imageAlt: 'Verzoek duurt te lang',
        errorText: html` <p>
            Het laden van de pagina duurde te lang. Probeer het opnieuw en als het nog niet lukt:
            <a href="mailto:help@omgevingvlaanderen.be?subject=HTTP-code 408">mail dan de helpdesk</a> en vermeld
            daarbij de URL hierboven en de foutcode 408.
        </p>`,
        errorActions: html` <div>
            <vl-link-next href="/">Terug naar de startpagina</vl-link-next>
        </div>`,
    },
    '410': {
        title: 'Pagina bestaat niet meer',
        image: 'https://cdn.milieuinfo.be/http-error-message-assets/LATEST/img/page-not-found.svg',
        imageAlt: 'Verzoek bestaat niet meer',
        errorText: html` <p>
            Deze pagina bestaat niet meer.
            <a href="mailto:help@omgevingvlaanderen.be?subject=HTTP-code 410">Mail de helpdesk</a> en vermeld daarbij de
            URL hierboven en de foutcode 410.
        </p>`,
        errorActions: html` <div>
            <vl-link-next href="/">Terug naar de startpagina</vl-link-next>
        </div>`,
    },
    '411': {
        title: 'Onvolledig verzoek',
        image: 'https://cdn.milieuinfo.be/http-error-message-assets/LATEST/img/unexpected-error.svg',
        imageAlt: 'Verzoek onvolledig',
        errorText: html` <p>
            Er ontbreekt blijkbaar iets.
            <a href="mailto:help@omgevingvlaanderen.be?subject=HTTP-code 411">Mail de helpdesk</a> en vermeld daarbij de
            URL hierboven en de foutcode 411.
        </p>`,
        errorActions: html` <div>
            <vl-link-next href="/">Terug naar de startpagina</vl-link-next>
        </div>`,
    },
    '412': {
        title: 'Voorwaarden voldoen niet',
        image: 'https://cdn.milieuinfo.be/http-error-message-assets/LATEST/img/unexpected-error.svg',
        imageAlt: 'Voorwaarden niet voldaan',
        errorText: html` <p>
            Er ging iets fout.
            <a href="mailto:help@omgevingvlaanderen.be?subject=HTTP-code 412">Mail de helpdesk</a> en vermeld daarbij de
            URL hierboven en de foutcode 412.
        </p>`,
        errorActions: html` <div>
            <vl-link-next href="/">Terug naar de startpagina</vl-link-next>
        </div>`,
    },
    '413': {
        title: 'Limiet overschreden',
        image: 'https://cdn.milieuinfo.be/http-error-message-assets/LATEST/img/unexpected-error.svg',
        imageAlt: 'Verzoek te groot',
        errorText: html` <p>
            Er ging iets fout.
            <a href="mailto:help@omgevingvlaanderen.be?subject=HTTP-code 413">Mail de helpdesk</a> en vermeld daarbij de
            URL hierboven en de foutcode 413.
        </p>`,
        errorActions: html` <div>
            <vl-link-next href="/">Terug naar de startpagina</vl-link-next>
        </div>`,
    },
    '414': {
        title: 'URL te groot',
        image: 'https://cdn.milieuinfo.be/http-error-message-assets/LATEST/img/unexpected-error.svg',
        imageAlt: 'URI te groot',
        errorText: html` <p>
            Er ging iets fout.
            <a href="mailto:help@omgevingvlaanderen.be?subject=HTTP-code 414">Mail de helpdesk</a> en vermeld daarbij de
            URL hierboven en de foutcode 414.
        </p>`,
        errorActions: html` <div>
            <vl-link-next href="/">Terug naar de startpagina</vl-link-next>
        </div>`,
    },
    '415': {
        title: 'Mediatype niet ondersteund',
        image: 'https://cdn.milieuinfo.be/http-error-message-assets/LATEST/img/unexpected-error.svg',
        imageAlt: 'Media type niet ondersteund',
        errorText: html` <p>
            Het mediatype van de gevraagde gegevens wordt niet ondersteund door de server.
            <a href="mailto:help@omgevingvlaanderen.be?subject=HTTP-code 415">Mail de helpdesk</a> en vermeld daarbij de
            URL hierboven en de foutcode 415.
        </p>`,
        errorActions: html` <div>
            <vl-link-next href="/">Terug naar de startpagina</vl-link-next>
        </div>`,
    },
    '500': {
        title: 'Interne fout',
        image: 'https://cdn.milieuinfo.be/http-error-message-assets/LATEST/img/unexpected-error.svg',
        imageAlt: 'Onverwachte fout',
        errorText: html` <p>
            Er ging iets fout. Probeer het nog eens. Lukt het nog niet,
            <a href="mailto:help@omgevingvlaanderen.be?subject=HTTP-code 500">mail dan de helpdesk</a> en vermeld
            daarbij de URL hierboven en de foutcode 500.
        </p>`,
        errorActions: html` <div>
            <vl-link-next href="/">Terug naar de startpagina</vl-link-next>
        </div>`,
    },
    '501': {
        title: 'Verzoek niet ondersteund',
        image: 'https://cdn.milieuinfo.be/http-error-message-assets/LATEST/img/unexpected-error.svg',
        imageAlt: 'Niet ondersteund',
        errorText: html` <p>
            Er ging iets fout.
            <a href="mailto:help@omgevingvlaanderen.be?subject=HTTP-code 501">Mail de helpdesk</a> en vermeld daarbij de
            URL hierboven en de foutcode 501.
        </p>`,
        errorActions: html` <div>
            <vl-link-next href="/">Terug naar de startpagina</vl-link-next>
        </div>`,
    },
    '502': {
        title: 'Tijdelijk niet bereikbaar',
        image: 'https://cdn.milieuinfo.be/http-error-message-assets/LATEST/img/unexpected-error.svg',
        imageAlt: 'Tijdelijk niet bereikbaar',
        errorText: html` <p>
            De website is tijdelijk niet bereikbaar. Probeer later opnieuw. Heb je vragen:
            <a href="mailto:help@omgevingvlaanderen.be?subject=HTTP-code 502">mail dan de helpdesk</a> en vermeld
            daarbij de URL hierboven en de foutcode 502.
        </p>`,
        errorActions: html` <div>
            <vl-link-next href="/">Terug naar de startpagina</vl-link-next>
        </div>`,
    },
    '503': {
        title: 'De website is tijdelijk niet beschikbaar',
        image: 'https://cdn.milieuinfo.be/http-error-message-assets/LATEST/img/unexpected-error.svg',
        imageAlt: 'Tijdelijk niet bereikbaar',
        errorText: html` <p>
            Probeer later opnieuw. Heb je vragen:
            <a href="mailto:help@omgevingvlaanderen.be?subject=HTTP-code 503">mail dan de helpdesk</a> en vermeld
            daarbij de URL hierboven en de foutcode 503.
        </p>`,
        errorActions: html` <div>
            <vl-link-next href="/">Terug naar de startpagina</vl-link-next>
        </div>`,
    },
    '504': {
        title: 'Tijdelijk niet bereikbaar',
        image: 'https://cdn.milieuinfo.be/http-error-message-assets/LATEST/img/unexpected-error.svg',
        imageAlt: 'Tijdelijk niet bereikbaar',
        errorText: html` <p>
            De website is tijdelijk niet bereikbaar. Probeer later opnieuw. Heb je vragen:
            <a href="mailto:help@omgevingvlaanderen.be?subject=HTTP-code 504">mail dan de helpdesk</a> en vermeld
            daarbij de URL hierboven en de foutcode 504.
        </p>`,
        errorActions: html` <div>
            <vl-link-next href="/">Terug naar de startpagina</vl-link-next>
        </div>`,
    },
    '505': {
        title: 'HTTP-versie niet ondersteund',
        image: 'https://cdn.milieuinfo.be/http-error-message-assets/LATEST/img/unexpected-error.svg',
        imageAlt: 'Niet ondersteunde HTTP versie',
        errorText: html` <p>
            De HTTP-versie van uw verzoek wordt niet ondersteund door onze server.
            <a href="mailto:help@omgevingvlaanderen.be?subject=HTTP-code 505">Mail de helpdesk</a> en vermeld daarbij de
            URL hierboven en de foutcode 505.
        </p>`,
        errorActions: html` <div>
            <vl-link-next href="/">Terug naar de startpagina</vl-link-next>
        </div>`,
    },
    '506': {
        title: 'Interne configuratiefout',
        image: 'https://cdn.milieuinfo.be/http-error-message-assets/LATEST/img/unexpected-error.svg',
        imageAlt: 'Interne configuratiefout',
        errorText: html` <p>
            Er ging iets fout.
            <a href="mailto:help@omgevingvlaanderen.be?subject=HTTP-code 506">Mail de helpdesk</a> en vermeld daarbij de
            URL hierboven en de foutcode 506.
        </p>`,
        errorActions: html` <div>
            <vl-link-next href="/">Terug naar de startpagina</vl-link-next>
        </div>`,
    },
};

export default errorCodes;
