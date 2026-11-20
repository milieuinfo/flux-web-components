/** Bootst kleurenblindheid na en meet kleurverschil, zodat een test bewaakt dat het palet onderscheidbaar blijft. */

export type Vision = 'normal' | 'protanopia' | 'deuteranopia' | 'tritanopia' | 'achromatopsia';

type Matrix = readonly [number, number, number, number, number, number, number, number, number];

/** Machado e.a. (2009), ernst 1,0, in lineair RGB. Dezelfde matrices als
 *  "Emulate vision deficiencies" in Chrome DevTools. */
export const VISION_MATRICES: Record<Vision, Matrix> = {
    normal: [1, 0, 0, 0, 1, 0, 0, 0, 1],
    protanopia: [0.152286, 1.052583, -0.204868, 0.114503, 0.786281, 0.099216, -0.003882, -0.048116, 1.051998],
    deuteranopia: [0.367322, 0.860646, -0.227968, 0.280085, 0.672501, 0.047413, -0.01182, 0.04294, 0.968881],
    tritanopia: [1.255528, -0.076749, -0.178779, -0.078411, 0.930809, 0.147602, 0.004733, 0.691367, 0.3039],
    achromatopsia: [0.2126, 0.7152, 0.0722, 0.2126, 0.7152, 0.0722, 0.2126, 0.7152, 0.0722],
};

type Lab = [number, number, number];

const toLinear = (value: number) => (value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4);

const clamp = (value: number) => Math.min(1, Math.max(0, value));

/** Zet `hex` om naar CIELAB (D65), zoals een persoon met `vision` hem ziet. */
export function toLab(hex: string, vision: Vision): Lab {
    const [red, green, blue] = [1, 3, 5].map((start) => toLinear(parseInt(hex.slice(start, start + 2), 16) / 255));
    const m = VISION_MATRICES[vision];
    const r = clamp(m[0] * red + m[1] * green + m[2] * blue);
    const g = clamp(m[3] * red + m[4] * green + m[5] * blue);
    const b = clamp(m[6] * red + m[7] * green + m[8] * blue);
    const x = (0.4124564 * r + 0.3575761 * g + 0.1804375 * b) / 0.95047;
    const y = 0.2126729 * r + 0.7151522 * g + 0.072175 * b;
    const z = (0.0193339 * r + 0.119192 * g + 0.9503041 * b) / 1.08883;
    const f = (t: number) => (t > 216 / 24389 ? Math.cbrt(t) : ((24389 / 27) * t) / 116 + 16 / 116);
    return [116 * f(y) - 16, 500 * (f(x) - f(y)), 200 * (f(y) - f(z))];
}

const toRadians = (degrees: number) => (degrees * Math.PI) / 180;
const toDegrees = (radians: number) => (radians * 180) / Math.PI;

/** CIEDE2000-kleurverschil (Sharma e.a., 2005). */
export function deltaE00([l1, a1, b1]: Lab, [l2, a2, b2]: Lab): number {
    const meanC = (Math.hypot(a1, b1) + Math.hypot(a2, b2)) / 2;
    const g = 0.5 * (1 - Math.sqrt(meanC ** 7 / (meanC ** 7 + 25 ** 7)));
    const a1p = (1 + g) * a1;
    const a2p = (1 + g) * a2;
    const c1p = Math.hypot(a1p, b1);
    const c2p = Math.hypot(a2p, b2);
    const hue = (a: number, b: number) => (a === 0 && b === 0 ? 0 : (toDegrees(Math.atan2(b, a)) + 360) % 360);
    const h1p = hue(a1p, b1);
    const h2p = hue(a2p, b2);

    const deltaL = l2 - l1;
    const deltaC = c2p - c1p;
    let deltaH = 0;
    if (c1p * c2p !== 0) {
        deltaH = h2p - h1p;
        if (deltaH > 180) deltaH -= 360;
        else if (deltaH < -180) deltaH += 360;
    }
    const deltaHp = 2 * Math.sqrt(c1p * c2p) * Math.sin(toRadians(deltaH / 2));

    const meanL = (l1 + l2) / 2;
    const meanCp = (c1p + c2p) / 2;
    let meanH = h1p + h2p;
    if (c1p * c2p !== 0) {
        if (Math.abs(h1p - h2p) <= 180) meanH /= 2;
        else meanH = h1p + h2p < 360 ? (meanH + 360) / 2 : (meanH - 360) / 2;
    }
    const t =
        1 -
        0.17 * Math.cos(toRadians(meanH - 30)) +
        0.24 * Math.cos(toRadians(2 * meanH)) +
        0.32 * Math.cos(toRadians(3 * meanH + 6)) -
        0.2 * Math.cos(toRadians(4 * meanH - 63));
    const sL = 1 + (0.015 * (meanL - 50) ** 2) / Math.sqrt(20 + (meanL - 50) ** 2);
    const sC = 1 + 0.045 * meanCp;
    const sH = 1 + 0.015 * meanCp * t;
    const rotation =
        -2 *
        Math.sqrt(meanCp ** 7 / (meanCp ** 7 + 25 ** 7)) *
        Math.sin(toRadians(60 * Math.exp(-(((meanH - 275) / 25) ** 2))));
    return Math.sqrt(
        (deltaL / sL) ** 2 + (deltaC / sC) ** 2 + (deltaHp / sH) ** 2 + rotation * (deltaC / sC) * (deltaHp / sH),
    );
}

export type WeakestPair = { first: number; second: number; deltaE: number };

/** Zoekt de twee kleuren die voor `vision` het minst verschillen. */
export function findWeakestPair(colors: readonly string[], vision: Vision): WeakestPair {
    const labs = colors.map((hex) => toLab(hex, vision));
    let weakest: WeakestPair = { first: 0, second: 1, deltaE: Infinity };
    labs.forEach((lab, first) => {
        for (let second = first + 1; second < labs.length; second++) {
            const deltaE = deltaE00(lab, labs[second]);
            if (deltaE < weakest.deltaE) weakest = { first, second, deltaE };
        }
    });
    return weakest;
}
