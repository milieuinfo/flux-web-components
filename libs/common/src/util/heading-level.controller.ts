import { PropertyDeclaration, ReactiveController, ReactiveControllerHost } from 'lit';
import { StaticValue } from 'lit/static-html.js';
import { HeadingLevel, headingTag, invalidHeadingLevelWarning, isValidHeadingLevel } from './heading-level';

export type HeadingLevelHost = ReactiveControllerHost & HTMLElement & { headingLevel: unknown };

/**
 * Property-declaratie voor `headingLevel`, gekoppeld aan het attribuut `heading-level`.
 * Gebruik ze met `@property(headingLevelProperty)` of in `static properties`, zodat elke component het attribuut op dezelfde manier declareert.
 */
export const headingLevelProperty: PropertyDeclaration = { type: String, reflect: true, attribute: 'heading-level' };

/**
 * Bepaalt de heading-tag (h1 tot h6) op basis van `headingLevel` van de host, met een optionele fallback bij een lege of ongeldige waarde.
 * Zonder fallback is `tag` dan `undefined` en rendert de component geen heading.
 * Waarschuwt in de console bij een ongeldige waarde, één keer per nieuwe waarde.
 * Gebruik `tag` met `html` uit `lit/static-html.js`, niet met de gewone `html` van `lit`.
 */
export class HeadingLevelController implements ReactiveController {
    private host: HeadingLevelHost;
    private fallback?: HeadingLevel;
    private checkedLevel: unknown;

    constructor(host: HeadingLevelHost, fallback?: HeadingLevel) {
        this.host = host;
        this.fallback = fallback;
        this.host.addController(this);
    }

    get tag(): StaticValue | undefined {
        return headingTag(this.host.headingLevel, this.fallback);
    }

    hostUpdate(): void {
        const level = this.host.headingLevel;
        if (level === this.checkedLevel) {
            return;
        }
        this.checkedLevel = level;
        if (level !== '' && level != null && !isValidHeadingLevel(level)) {
            console.warn(invalidHeadingLevelWarning(this.host, level));
        }
    }
}
