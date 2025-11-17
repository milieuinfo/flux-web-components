import { VlButtonComponent } from '@domg-wc/components/next/button';
import { Layer } from 'ol/layer';
import { VlMap } from '../../../vl-map';
import { VlMapLayer } from '../../layer/vl-map-layer';

export const dynamicLayerSwitcherImplementation = () => {
    const vlMapSelector = 'vl-map#map-dynamic-layers';

    const handleAddLayerForId = (id: string) => {
        const newLayer = document.querySelector(`vl-map-features-layer#${id}`) as unknown as VlMapLayer;
        const vlMap = document.querySelector(vlMapSelector) as unknown as VlMap;
        vlMap.appendChild(newLayer);

        const addButton = document.querySelector<VlButtonComponent>(`#add-${id}`);
        const toggleButton = document.querySelector<VlButtonComponent>(`#toggle-${id}`);
        const removeButton = document.querySelector<VlButtonComponent>(`#remove-${id}`);

        toggleButton.hidden = false;
        removeButton.hidden = false;
        addButton.hidden = true;
    };

    const handleToggleLayerForId = (id: string) => {
        const layerToToggle = document.querySelector(`vl-map-features-layer#${id}`) as unknown as VlMapLayer;
        const layer: Layer = layerToToggle.layer;
        layer.setVisible(!layer.getVisible());
    };

    const handleRemoveLayerForId = (id: string) => {
        const layerToRemove = document.querySelector(`vl-map-features-layer#${id}`) as unknown as VlMapLayer;
        const vlMap = document.querySelector(vlMapSelector) as unknown as VlMap;
        vlMap.removeChild(layerToRemove);

        const removeButton = document.querySelector<VlButtonComponent>(`#remove-${id}`);
        removeButton.parentElement.remove();
    };

    // exporteren functies die gebruikt worden in template
    return { handleAddLayerForId, handleToggleLayerForId, handleRemoveLayerForId };
};

export default dynamicLayerSwitcherImplementation;
