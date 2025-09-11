export interface HeadingItem {
    element: HTMLElement;
    level: number;
    text: string;
    id: string;
}

export interface HeadingResult {
    elements: HTMLElement[];
    headings: HeadingItem[];
}
export interface HeadingTreeNode {
    item: HeadingItem;
    children: HeadingTreeNode[];
}
