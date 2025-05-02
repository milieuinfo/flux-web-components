const getLastElement = (element: any) => {
    const [lastItem] = [...document.querySelectorAll(element)].slice(-1);
    return lastItem;
};

// get last wizard, because storybook can render Default multiple times
export const getWizard: any = () => getLastElement('vl-wizard');
