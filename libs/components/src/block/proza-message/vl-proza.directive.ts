import { FluxConfig } from '@domg-wc/common';
import { AsyncDirective, directive, DirectiveResult, PartInfo } from 'lit/async-directive.js';
import { VlProzaMessage } from './vl-proza-message.component';

export interface VlProzaOptions {
    domain?: string;
    parameters?: Record<string, string>;
    fallback?: string;
    baseUrl?: string;
}

class VlProzaDirective extends AsyncDirective {
    private previousCode?: string;
    private previousDomain?: string;
    private previousParameters?: Record<string, string>;
    private previousBaseUrl?: string;

    constructor(partInfo: PartInfo) {
        super(partInfo);
    }

    override render(code: string, options?: VlProzaOptions): string {
        const domain = options?.domain || FluxConfig.getPreferences().prozaDomain;

        if (!domain) {
            throw new Error(
                `[vlProza] Geen domein opgegeven voor code "${code}". ` +
                    `Stel een default domein in via FluxConfig.setPreferences({ prozaDomain: '...' }) ` +
                    `of geef een domain mee in de opties.`
            );
        }

        const fallback = options?.fallback ?? code;

        if (
            code === this.previousCode &&
            domain === this.previousDomain &&
            this.parametersEqual(options?.parameters, this.previousParameters) &&
            options?.baseUrl === this.previousBaseUrl
        ) {
            return fallback;
        }

        this.previousCode = code;
        this.previousDomain = domain;
        this.previousParameters = options?.parameters;
        this.previousBaseUrl = options?.baseUrl;

        this.fetchMessage(domain, code, options);

        return fallback;
    }

    private async fetchMessage(domain: string, code: string, options?: VlProzaOptions): Promise<void> {
        try {
            const message = await VlProzaMessage.getMessage(
                domain,
                code,
                options?.parameters ?? null,
                options?.baseUrl
            );
            this.setValue(stripHtml(message));
        } catch (error) {
            console.error(`[vlProza] Fout bij ophalen van bericht voor {domein: ${domain}, code: ${code}}`, error);
        }
    }

    private parametersEqual(
        a: Record<string, string> | undefined,
        b: Record<string, string> | undefined
    ): boolean {
        if (a === b) return true;
        if (!a || !b) return false;
        const keysA = Object.keys(a);
        const keysB = Object.keys(b);
        if (keysA.length !== keysB.length) return false;
        return keysA.every((key) => a[key] === b[key]);
    }
}

function stripHtml(html: string): string {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent ?? '';
}

const vlProzaDirective = directive(VlProzaDirective);

export const vlProza = (code: string, options?: VlProzaOptions): DirectiveResult<typeof VlProzaDirective> => {
    return vlProzaDirective(code, options);
};
