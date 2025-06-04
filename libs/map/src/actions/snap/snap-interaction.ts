import Snap from 'ol/interaction/Snap';
import { Source } from 'ol/source';

export class VlSnapInteraction extends Snap {
    constructor(source: Source, options: any = {}) {
        const snapOptions = { ...options };
        snapOptions.source = source;
        snapOptions.pixelTolerance = options.pixelTolerance || 7;
        super(snapOptions);
    }
}
