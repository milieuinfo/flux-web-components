import { Item, Props } from './vl-properties.model';

const cloneChildNodes = (childNodes: ChildNode[]): Node[] => childNodes.map((node) => node.cloneNode(true));

const buildItems = (elements: Element[]): Item[] => {
    const items: Item[] = [];
    let labels: Node[][] = [],
        data: Node[][] = [];

    elements.forEach((element: Element) => {
        switch (element.localName) {
            case 'label':
            case 'vl-property':
                // een nieuw item begint als er gestart wordt met een nieuw label (in dat geval is er al data)
                if (labels.length && data.length) {
                    items.push({ labels, data });
                    labels = [];
                    data = [];
                }
                labels.push(cloneChildNodes([...element.childNodes]));
                break;
            case 'data':
            case 'vl-property-data':
                data.push(cloneChildNodes([...element.childNodes]));
                break;
        }
    });
    // de items uitbreiden met het laatste item
    if (labels.length) items.push({ labels, data });

    return items;
};

export const buildProperties = (elements: Element[] | null): Props => {
    if (elements == null || elements.length == 0) {
        return [];
    }
    if (elements[0]?.localName === 'div') {
        // er is een 'column' gedefinieerd: verwerk ze
        return elements.map((element: Element) => ({
            class: element.className,
            items: buildItems([...element.children]),
        }));
    } else {
        // er is geen 'column' aanwezig, enkel labels en data
        return [{ items: buildItems(elements) }];
    }
};
