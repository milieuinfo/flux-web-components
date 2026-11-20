const FALLBACK_FILE_NAME = 'grafiek';

/** Maakt een bestandsnaam zonder extensie uit de kop van de figuur. */
export function buildFileName(headline: string): string {
    const safeHeadline = headline
        .replace(/[\\/:*?"<>|]+/g, '-')
        .replace(/\s+/g, ' ')
        .trim();
    return safeHeadline || FALLBACK_FILE_NAME;
}

/** Bewaart `blob` als bestand: maakt er een tijdelijke URL voor, zet die op
 *  een `<a download>` die niet op de pagina staat, en klikt die link in
 *  code aan. De URL komt pas vrij met `setTimeout`, zodat de download eerst
 *  kan starten.
 *  https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL_static */
export function downloadFile(blob: Blob, fileName: string): void {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url));
}
