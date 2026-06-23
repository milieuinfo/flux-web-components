import { MaskOptions } from '../models/cleave.model';

export const createDateMask = (format: string): MaskOptions | null => {
    if (!format) return null;
    let maskOptions: MaskOptions | null = null;
    const delimiters = format.split(/[dmyY]/).filter((delimiter) => delimiter);
    const datePattern = format.split(/[.*+-/_:]/);
    // indien pattern niet ondersteund wordt, genereren we geen mask
    if (datePattern.filter((char) => !['d', 'm', 'Y', 'y'].includes(char)).length) return null;
    // 4 cijfers voor volledig jaar, anders 2
    const length = datePattern.reduce((acc, char) => {
        // 4 cijfers voor een volledig jaar
        if (char === 'Y') return acc + 4;
        // 2 cijfers voor een maand, dag of kort jaar
        return acc + 2;
    }, 0);
    maskOptions = {
        date: true,
        datePattern: datePattern,
        delimiters: delimiters,
        regex: new RegExp(`^[0-9]{${length}}$`),
    };
    return maskOptions;
};

export const createTimeMask = (format: string): MaskOptions | null => {
    if (!format) return null;
    const delimiters = format.split(/[HhiS]/).filter((delimiter) => delimiter);
    let isMilitaryFormat = true;
    const timePattern = format.split(/[.*+-/_:]/).map((char) => {
        // conversie van flatpickr naar cleave.js format
        switch (char) {
            case 'H':
                return 'h';
            case 'h':
                isMilitaryFormat = false;
                return 'h';
            case 'i':
                return 'm';
            case 'S':
                return 's';
            default:
                return char;
        }
    });
    // indien pattern niet ondersteund wordt, genereren we geen mask
    if (timePattern.filter((char) => !['h', 'm', 's'].includes(char)).length) return null;
    return {
        time: true,
        timePattern: timePattern,
        timeFormat: isMilitaryFormat ? '24' : '12',
        delimiters: delimiters,
        // timePattern.length * 2
        regex: new RegExp(`^[0-9]{${timePattern.length * 2}}$`),
    };
};
