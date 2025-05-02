import { textareaDefaults } from '../textarea/vl-textarea.defaults';

export const textareaRichDefaults = {
    ...textareaDefaults,
    toolbar: 'undo redo | bold italic underline strikethrough' as string,
    plugins: '' as string,
    preview: false as boolean,
    customConfig: null as Record<string, unknown> | null,
} as const;
