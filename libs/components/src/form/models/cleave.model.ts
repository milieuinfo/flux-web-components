export interface CleaveInstance {
    getRawValue(): string;
}

export interface MaskOptions {
    blocks?: number[];
    delimiter?: string;
    delimiters?: string[];
    prefix?: string;
    signBeforePrefix?: boolean;
    tailPrefix?: boolean;
    noImmediatePrefix?: boolean;
    numericOnly?: boolean;
    numeral?: boolean;
    numeralPositiveOnly?: boolean;
    rawValueTrimPrefix?: boolean;
    numeralDecimalMark?: string;
    numeralDecimalScale?: number;
    numeralIntegerScale?: number;
    numeralThousandsGroupStyle?: 'thousand' | 'lakh' | 'wan' | 'none';
    date?: boolean;
    datePattern?: string[];
    dateMin?: string;
    dateMax?: string;
    time?: boolean;
    timePattern?: string[];
    timeFormat?: string;
    onValueChanged?: (event: { target: { value: string; rawValue: string } }) => void;
    regex?: RegExp;
    customTransformFn?: (value: string) => string;
}
