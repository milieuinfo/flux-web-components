import { ArgTypes } from '@storybook/web-components-vite';

export interface WTConfig {
    componentName: string;
    argTypes: ArgTypes;
    storiesDocFile: string;
    storybookPath: string;
}

export type WTConfigArray = WTConfig[];

export interface WTElementAttribute {
    name: string;
    description: string;
    default?: string;
}

export type WTElementAttributeArray = WTElementAttribute[];

export interface WTElementSlot {
    name: string;
    description: string;
    default?: string;
}

export type WTElementSlotArray = WTElementSlot[];

export interface WTElementProperty {
    name: string;
    type?: string;
    description: string;
    default?: string;
}

export type WTElementPropertyArray = WTElementProperty[];

export interface WTElementEvent {
    name: string;
    type?: string;
    description: string;
}

export type WTElementEventArray = WTElementEvent[];

export interface WTElement {
    name: string;
    description?: string;
    'doc-url'?: string;
    attributes?: WTElementAttributeArray;
    slots?: WTElementSlotArray;
    js?: {
        properties?: WTElementPropertyArray;
        events?: WTElementEventArray;
    };
}

export type WTElementArray = WTElement[];
