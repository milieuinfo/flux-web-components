import { VlButtonComponent } from '@domg-wc/components/atom';
import { Layer } from 'ol/layer';
import { VlMap } from '../../../vl-map';
import { VlMapLayer } from '../../layer/vl-map-layer';

export const dynamicLayerSwitcherImplementation = () => {
    const vlMapSelector = 'vl-map#map-dynamic-layers';

    const handleAddLayerForId = (id: string) => {
        const newLayer = document.querySelector<VlMapLayer>(`vl-map-features-layer#${id}`);
        const vlMap = document.querySelector<VlMap>(vlMapSelector);
        vlMap.appendChild(newLayer);

        const addButton = document.querySelector<VlButtonComponent>(`#add-${id}`);
        const toggleButton = document.querySelector<VlButtonComponent>(`#toggle-${id}`);
        const removeButton = document.querySelector<VlButtonComponent>(`#remove-${id}`);

        toggleButton.hidden = false;
        removeButton.hidden = false;
        addButton.hidden = true;
    };

    const handleToggleLayerForId = (id: string) => {
        const layerToToggle = document.querySelector<VlMapLayer>(`vl-map-features-layer#${id}`);
        const layer: Layer = layerToToggle.layer;
        layer.setVisible(!layer.getVisible());
    };

    const handleRemoveLayerForId = (id: string) => {
        const layerToRemove = document.querySelector<VlMapLayer>(`vl-map-features-layer#${id}`);
        const vlMap = document.querySelector<VlMap>(vlMapSelector);
        vlMap.removeChild(layerToRemove);

        const removeButton = document.querySelector<VlButtonComponent>(`#remove-${id}`);
        removeButton.parentElement.remove();
    };

    // exporteren functies die gebruikt worden in template
    return { handleAddLayerForId, handleToggleLayerForId, handleRemoveLayerForId };
};

export default dynamicLayerSwitcherImplementation;
