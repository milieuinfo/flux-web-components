export const COMPLIANCE_STATUS = {
    FULLY_COMPLIANT: 'FULLY_COMPLIANT',
    PARTIALLY_COMPLIANT: 'PARTIALLY_COMPLIANT',
    NOT_COMPLIANT: 'NOT_COMPLIANT',
} as const;

export type COMPLIANCE_STATUS = (typeof COMPLIANCE_STATUS)[keyof typeof COMPLIANCE_STATUS];

export const EVALUATION_STATUS = {
    EXPERT_EVALUATED: 'EXPERT_EVALUATED',
    SELF_EVALUATED: 'SELF_EVALUATED',
    NOT_EVALUATED: 'NOT_EVALUATED',
} as const;

export type EVALUATION_STATUS = (typeof EVALUATION_STATUS)[keyof typeof EVALUATION_STATUS];

export interface Limitations {
    withTiming?: string[];
    withoutTiming?: string[];
    outsideApplicableLaw?: string[];
}
export interface AccessibilityProperties {
    application: string;
    compliance: COMPLIANCE_STATUS;
    date: string;
    dateModified: string;
    disableBackLink: boolean;
    hideBackLink: boolean;
    evaluation: EVALUATION_STATUS;
    limitations?: Limitations;
    version: string;
}
