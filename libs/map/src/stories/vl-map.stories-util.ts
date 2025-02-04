export const getActionElement = (name: string): any => getLastElementByClassName(`${name}-action`);
export const getToggleButton = (name: string): any => getLastElementByClassName(`${name}-toggle-button`);
export const actionIdentifiers = ['draw-point', 'draw-line', 'draw-polygon', 'modify', 'delete'];

// Make sure the class that is given is unique and is not being used in other stories of the component.
export const getLastElementByClassName = (className: string) => {
    const items = document.getElementsByClassName(className);
    return items[items.length - 1];
};

export const handleActiveActionChange = ({ detail: { previous, current } }: CustomEvent) => {
    // Activate/deactivate external controls when an action changes its state
    actionIdentifiers.forEach((actionIdentifier) => {
        if (previous === getActionElement(actionIdentifier)) {
            getToggleButton(actionIdentifier).on = false;
        } else if (current === getActionElement(actionIdentifier)) {
            getToggleButton(actionIdentifier).on = true;
        }
    });
};

export const handleLayerVisibleChange = ({ detail: { layer, visible } }: CustomEvent) => {
    // Enable/disable external controls when an action changes its state
    const layerActions = layer.getElementsByClassName('action');

    for (const layerAction of layerActions) {
        actionIdentifiers.forEach((actionIdentifier) => {
            if (layerAction === getActionElement(actionIdentifier)) {
                getToggleButton(actionIdentifier).disabled = !visible;
            }
        });
    }
};

export const handleOpacitySliderChange = ({ detail: { value } }: CustomEvent) => {
    // Set the opacity of all feature layers based on the value of the input slider
    const featureLayers = document.querySelectorAll('vl-map-features-layer');

    featureLayers?.forEach((layer) => {
        layer.setAttribute('data-vl-opacity', value / 100);
    });
};
