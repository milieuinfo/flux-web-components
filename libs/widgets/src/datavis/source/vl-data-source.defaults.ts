import type { SourceFormat } from './vl-data-source.component';

export const dataSourceDefaults = {
    src: '' as string,
    period: '24h' as string,
    end: '' as string,
    format: 'sensorthings' as SourceFormat,
} as const;
