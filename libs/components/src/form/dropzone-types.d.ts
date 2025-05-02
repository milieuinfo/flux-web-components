export interface DropzoneResizeInfo {
    srcX?: number;
    srcY?: number;
    trgX?: number;
    trgY?: number;
    srcWidth?: number;
    srcHeight?: number;
    trgWidth?: number;
    trgHeight?: number;
}

export interface DropzoneFileUpload {
    progress: number;
    total: number;
    bytesSent: number;
    uuid: string;
    totalChunkCount?: number;
}

export interface DropzoneFile extends File {
    dataURL?: string;
    previewElement: HTMLElement;
    previewTemplate: HTMLElement;
    previewsContainer: HTMLElement;
    status: string;
    accepted: boolean;
    xhr?: XMLHttpRequest;
    upload?: DropzoneFileUpload;
}

export interface DropzoneMockFile {
    name: string;
    size: number;
    [index: string]: any;
}

export interface DropzoneDictFileSizeUnits {
    tb?: string;
    gb?: string;
    mb?: string;
    kb?: string;
    b?: string;
}

export interface DropzoneOptions {
    url?: ((files: readonly DropzoneFile[]) => string) | string | undefined;
    method?: ((files: readonly DropzoneFile[]) => string) | string | undefined;
    withCredentials?: boolean | undefined;
    timeout?: number | undefined;
    parallelUploads?: number | undefined;
    uploadMultiple?: boolean | undefined;
    chunking?: boolean | undefined;
    forceChunking?: boolean | undefined;
    chunkSize?: number | undefined;
    parallelChunkUploads?: boolean | undefined;
    retryChunks?: boolean | undefined;
    retryChunksLimit?: number | undefined;
    maxFilesize?: number | undefined;
    paramName?: string | undefined;
    createImageThumbnails?: boolean | undefined;
    maxThumbnailFilesize?: number | undefined;
    thumbnailWidth?: number | undefined;
    thumbnailHeight?: number | undefined;
    thumbnailMethod?: 'contain' | 'crop' | undefined;
    resizeWidth?: number | undefined;
    resizeHeight?: number | undefined;
    resizeMimeType?: string | undefined;
    resizeQuality?: number | undefined;
    resizeMethod?: 'contain' | 'crop' | undefined;
    filesizeBase?: number | undefined;
    maxFiles?: number | undefined;
    params?: {} | undefined;
    headers?: { [key: string]: string } | undefined;
    clickable?: boolean | string | HTMLElement | Array<string | HTMLElement> | undefined;
    ignoreHiddenFiles?: boolean | undefined;
    acceptedFiles?: string | undefined;
    renameFilename?(name: string): string;
    autoProcessQueue?: boolean | undefined;
    autoQueue?: boolean | undefined;
    addRemoveLinks?: boolean | undefined;
    previewsContainer?: boolean | string | HTMLElement | undefined;
    hiddenInputContainer?: HTMLElement | undefined;
    capture?: string | undefined;

    dictDefaultMessage?: string | undefined;
    dictFallbackMessage?: string | undefined;
    dictFallbackText?: string | undefined;
    dictFileTooBig?: string | undefined;
    dictInvalidFileType?: string | undefined;
    dictResponseError?: string | undefined;
    dictCancelUpload?: string | undefined;
    dictCancelUploadConfirmation?: string | undefined;
    dictRemoveFile?: string | undefined;
    dictRemoveFileConfirmation?: string | undefined;
    dictMaxFilesExceeded?: string | undefined;
    dictFileSizeUnits?: DropzoneDictFileSizeUnits | undefined;
    dictUploadCanceled?: string | undefined;

    accept?(file: DropzoneFile, done: (error?: string | Error) => void): void;
    chunksUploaded?(file: DropzoneFile, done: (error?: string | Error) => void): void;
    init?(this: Dropzone): void;
    forceFallback?: boolean | undefined;
    fallback?(): void;
    resize?(file: DropzoneFile, width?: number, height?: number, resizeMethod?: string): DropzoneResizeInfo;

    drop?(e: DragEvent): void;
    dragstart?(e: DragEvent): void;
    dragend?(e: DragEvent): void;
    dragenter?(e: DragEvent): void;
    dragover?(e: DragEvent): void;
    dragleave?(e: DragEvent): void;
    paste?(e: DragEvent): void;

    reset?(): void;

    addedfile?(file: DropzoneFile): void;
    addedfiles?(files: DropzoneFile[]): void;
    removedfile?(file: DropzoneFile): void;
    thumbnail?(file: DropzoneFile, dataUrl: string): void;

    error?(file: DropzoneFile, message: string | Error, xhr: XMLHttpRequest): void;
    errormultiple?(files: DropzoneFile[], message: string | Error, xhr: XMLHttpRequest): void;

    processing?(file: DropzoneFile): void;
    processingmultiple?(files: DropzoneFile[]): void;

    uploadprogress?(file: DropzoneFile, progress: number, bytesSent: number): void;
    totaluploadprogress?(totalProgress: number, totalBytes: number, totalBytesSent: number): void;

    sending?(file: DropzoneFile, xhr: XMLHttpRequest, formData: FormData): void;
    sendingmultiple?(files: DropzoneFile[], xhr: XMLHttpRequest, formData: FormData): void;

    success?(file: DropzoneFile): void;
    successmultiple?(files: DropzoneFile[], responseText: string): void;

    canceled?(file: DropzoneFile): void;
    canceledmultiple?(file: DropzoneFile[]): void;

    complete?(file: DropzoneFile): void;
    completemultiple?(file: DropzoneFile[]): void;

    maxfilesexceeded?(file: DropzoneFile): void;
    maxfilesreached?(files: DropzoneFile[]): void;
    queuecomplete?(): void;

    transformFile?(file: DropzoneFile, done: (file: string | Blob) => void): void;

    previewTemplate?: string | undefined;
}

export interface DropzoneListener {
    element: HTMLElement;
    events: {
        [key: string]: (e: Event) => any;
    };
}

export class Dropzone {
    constructor(container: string | HTMLElement, options?: DropzoneOptions);

    static autoDiscover: boolean;
    static blacklistedBrowsers: RegExp[];
    static confirm: (question: string, accepted: () => void, rejected?: () => void) => void;
    static createElement(string: string): HTMLElement;
    static dataURItoBlob(dataURI: string): Blob;
    static discover(): Dropzone[];
    static elementInside(element: HTMLElement, container: HTMLElement): boolean;
    static forElement(element: string | HTMLElement): Dropzone;
    static getElement(element: string | HTMLElement, name?: string): HTMLElement;
    static getElements(elements: string | HTMLElement | Array<string | HTMLElement>): HTMLElement[];
    static instances: Dropzone[];
    static isBrowserSupported(): boolean;
    static isValidFile(file: File, acceptedFiles: string): boolean;
    static options: { [key: string]: DropzoneOptions | false };
    static optionsForElement(element: HTMLElement): DropzoneOptions | undefined;
    static version: string;

    static ADDED: string;
    static QUEUED: string;
    static ACCEPTED: string;
    static UPLOADING: string;
    static PROCESSING: string;
    static CANCELED: string;
    static ERROR: string;
    static SUCCESS: string;

    element: HTMLElement;
    files: DropzoneFile[];
    hiddenFileInput?: HTMLInputElement | undefined;
    listeners: DropzoneListener[];
    defaultOptions: DropzoneOptions;
    options: DropzoneOptions;
    previewsContainer: HTMLElement;
    version: string;

    enable(): void;

    disable(): void;

    destroy(): Dropzone;

    addFile(file: DropzoneFile): void;

    removeFile(file: DropzoneFile): void;

    removeAllFiles(cancelIfNecessary?: boolean): void;

    resizeImage(
        file: DropzoneFile,
        width?: number,
        height?: number,
        resizeMethod?: string,
        callback?: (...args: any[]) => void
    ): void;

    processQueue(): void;

    cancelUpload(file: DropzoneFile): void;

    createThumbnail(
        file: DropzoneFile,
        width?: number,
        height?: number,
        resizeMethod?: string,
        fixOrientation?: boolean,
        callback?: (...args: any[]) => void
    ): any;

    displayExistingFile(
        mockFile: DropzoneMockFile,
        imageUrl: string,
        callback?: () => void,
        crossOrigin?: 'anonymous' | 'use-credentials',
        resizeThumbnail?: boolean
    ): any;

    createThumbnailFromUrl(
        file: DropzoneFile,
        width?: number,
        height?: number,
        resizeMethod?: string,
        fixOrientation?: boolean,
        callback?: (...args: any[]) => void,
        crossOrigin?: string
    ): any;

    processFiles(files: DropzoneFile[]): void;

    processFile(file: DropzoneFile): void;

    uploadFile(file: DropzoneFile): void;

    uploadFiles(files: DropzoneFile[]): void;

    getAcceptedFiles(): DropzoneFile[];

    getActiveFiles(): DropzoneFile[];

    getAddedFiles(): DropzoneFile[];

    getRejectedFiles(): DropzoneFile[];

    getQueuedFiles(): DropzoneFile[];

    getUploadingFiles(): DropzoneFile[];

    accept(file: DropzoneFile, done: (error?: string | Error) => void): void;

    getFilesWithStatus(status: string): DropzoneFile[];

    enqueueFile(file: DropzoneFile): void;

    enqueueFiles(file: DropzoneFile[]): void;

    createThumbnail(file: DropzoneFile, callback?: (...args: any[]) => void): any;

    createThumbnailFromUrl(file: DropzoneFile, url: string, callback?: (...args: any[]) => void): any;

    on(eventName: string, callback: (...args: any[]) => void): Dropzone;

    off(): Dropzone;
    off(eventName: string, callback?: (...args: any[]) => void): Dropzone;

    emit(eventName: string, ...args: any[]): Dropzone;

    on(eventName: 'drop', callback: (e: DragEvent) => any): Dropzone;
    on(eventName: 'dragstart', callback: (e: DragEvent) => any): Dropzone;
    on(eventName: 'dragend', callback: (e: DragEvent) => any): Dropzone;
    on(eventName: 'dragenter', callback: (e: DragEvent) => any): Dropzone;
    on(eventName: 'dragover', callback: (e: DragEvent) => any): Dropzone;
    on(eventName: 'dragleave', callback: (e: DragEvent) => any): Dropzone;
    on(eventName: 'paste', callback: (e: DragEvent) => any): Dropzone;

    on(eventName: 'reset'): Dropzone;

    on(eventName: 'addedfile', callback: (file: DropzoneFile) => any): Dropzone;
    on(eventName: 'addedfiles', callback: (files: DropzoneFile[]) => any): Dropzone;
    on(eventName: 'removedfile', callback: (file: DropzoneFile) => any): Dropzone;
    on(eventName: 'thumbnail', callback: (file: DropzoneFile, dataUrl: string) => any): Dropzone;

    on(eventName: 'error', callback: (file: DropzoneFile, message: string | Error) => any): Dropzone;
    on(eventName: 'errormultiple', callback: (files: DropzoneFile[], message: string | Error) => any): Dropzone;

    on(eventName: 'processing', callback: (file: DropzoneFile) => any): Dropzone;
    on(eventName: 'processingmultiple', callback: (files: DropzoneFile[]) => any): Dropzone;

    on(
        eventName: 'uploadprogress',
        callback: (file: DropzoneFile, progress: number, bytesSent: number) => any
    ): Dropzone;
    on(
        eventName: 'totaluploadprogress',
        callback: (totalProgress: number, totalBytes: number, totalBytesSent: number) => any
    ): Dropzone;

    on(eventName: 'sending', callback: (file: DropzoneFile, xhr: XMLHttpRequest, formData: FormData) => any): Dropzone;
    on(
        eventName: 'sendingmultiple',
        callback: (files: DropzoneFile[], xhr: XMLHttpRequest, formData: FormData) => any
    ): Dropzone;

    on(eventName: 'success', callback: (file: DropzoneFile, response: Object | string) => any): Dropzone;
    on(eventName: 'successmultiple', callback: (files: DropzoneFile[]) => any): Dropzone;

    on(eventName: 'canceled', callback: (file: DropzoneFile) => any): Dropzone;
    on(eventName: 'canceledmultiple', callback: (file: DropzoneFile[]) => any): Dropzone;

    on(eventName: 'complete', callback: (file: DropzoneFile) => any): Dropzone;
    on(eventName: 'completemultiple', callback: (file: DropzoneFile[]) => any): Dropzone;

    on(eventName: 'maxfilesexceeded', callback: (file: DropzoneFile) => any): Dropzone;
    on(eventName: 'maxfilesreached', callback: (files: DropzoneFile[]) => any): Dropzone;
    on(eventName: 'queuecomplete'): Dropzone;

    emit(eventName: 'drop', e: DragEvent): Dropzone;
    emit(eventName: 'dragstart', e: DragEvent): Dropzone;
    emit(eventName: 'dragend', e: DragEvent): Dropzone;
    emit(eventName: 'dragenter', e: DragEvent): Dropzone;
    emit(eventName: 'dragover', e: DragEvent): Dropzone;
    emit(eventName: 'dragleave', e: DragEvent): Dropzone;
    emit(eventName: 'paste', e: DragEvent): Dropzone;

    emit(eventName: 'reset'): Dropzone;

    emit(eventName: 'addedfile', file: DropzoneFile): Dropzone;
    emit(eventName: 'addedfiles', files: DropzoneFile[]): Dropzone;
    emit(eventName: 'removedfile', file: DropzoneFile): Dropzone;
    emit(eventName: 'thumbnail', file: DropzoneFile, dataUrl: string): Dropzone;

    emit(eventName: 'error', file: DropzoneFile, message: string | Error): Dropzone;
    emit(eventName: 'errormultiple', files: DropzoneFile[], message: string | Error): Dropzone;

    emit(eventName: 'processing', file: DropzoneFile): Dropzone;
    emit(eventName: 'processingmultiple', files: DropzoneFile[]): Dropzone;

    emit(eventName: 'uploadprogress', file: DropzoneFile, progress: number, bytesSent: number): Dropzone;
    emit(eventName: 'totaluploadprogress', totalProgress: number, totalBytes: number, totalBytesSent: number): Dropzone;

    emit(eventName: 'sending', file: DropzoneFile, xhr: XMLHttpRequest, formData: FormData): Dropzone;
    emit(eventName: 'sendingmultiple', files: DropzoneFile[], xhr: XMLHttpRequest, formData: FormData): Dropzone;

    emit(eventName: 'success', file: DropzoneFile, response: object | string): Dropzone;
    emit(eventName: 'successmultiple', files: DropzoneFile[]): Dropzone;

    emit(eventName: 'canceled', file: DropzoneFile): Dropzone;
    emit(eventName: 'canceledmultiple', file: DropzoneFile[]): Dropzone;

    emit(eventName: 'complete', file: DropzoneFile): Dropzone;
    emit(eventName: 'completemultiple', file: DropzoneFile[]): Dropzone;

    emit(eventName: 'maxfilesexceeded', file: DropzoneFile): Dropzone;
    emit(eventName: 'maxfilesreached', files: DropzoneFile[]): Dropzone;
    emit(eventName: 'queuecomplete'): Dropzone;
}
