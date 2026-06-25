export const sideNavigationDefaults: SideNavigationDefaults = {
    closed: false,
    compact: false,
    headingRootSelector: '',
    maxDepth: undefined,
    navigationTitle: 'Op deze pagina',
    childSpacing: 'small',
    multiActive: false,
} as const;

export type SideNavigationDefaults = {
    closed: boolean;
    compact: boolean;
    headingRootSelector: string;
    maxDepth: number | undefined;
    navigationTitle: string;
    childSpacing: string;
    multiActive: boolean;
};
