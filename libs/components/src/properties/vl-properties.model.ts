export type Props = Column[];

export interface Column {
    class?: string; // column / column--full-width / collapsed
    items: Item[];
}

export interface Item {
    labels: string[] | Node[][];
    data: string[] | Node[][];
}
