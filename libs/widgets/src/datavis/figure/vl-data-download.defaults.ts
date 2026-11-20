import type { DownloadFormat } from './vl-data-download.component';

export const dataDownloadDefaults = {
    format: 'png' as DownloadFormat,
    showLabel: false as boolean,
} as const;
