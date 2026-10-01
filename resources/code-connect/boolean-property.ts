import type { InstanceHandle } from 'figma';

/**
 * De waarde van een boolean property, of `fallback` wanneer de property ontbreekt.
 *
 * Een bestand met een oudere versie van de library mist de properties die later toegevoegd zijn. `getBoolean` gooit
 * dan niet, maar geeft een foutobject terug, en dat is truthy.
 *
 * De terugval is wat het component toonde vóór de property bestond. Dat is niet altijd de default in code: een
 * oudere vl-modal had nog geen annuleerlink, dus daar is de terugval "uit", ook al is `cancellable` in code de
 * default. Geef de terugval daarom per property op, met de reden erbij.
 */
export function booleanProperty(instance: InstanceHandle, name: string, fallback: boolean): boolean {
    const value: unknown = instance.getBoolean(name);
    return typeof value === 'boolean' ? value : fallback;
}
