import WMTSCapabilities from 'ol/format/WMTSCapabilities';
import { geoApiVlaanderenCapabilitiesXML } from './capabilities-response';

type WMTSCapabilitiesResult = ReturnType<WMTSCapabilities['read']>;

const parser = new WMTSCapabilities();

const geoApiVlaanderenCapabilities: WMTSCapabilitiesResult = parser.read(geoApiVlaanderenCapabilitiesXML);

export const Lambert2008Identifier = 'BPL2008VL';
const getLambert2008TileSet = () =>
    geoApiVlaanderenCapabilities.Contents.TileMatrixSet.find(({ Identifier }) => Identifier === Lambert2008Identifier);
export const getLambert2008Extent = (): [number, number, number, number] => getLambert2008TileSet()?.BoundingBox;
export const getLambert2008Code = (): string => getLambert2008TileSet()?.SupportedCRS || 'EPSG:3812';

export const Lambert72Identifier = 'BPL72VL';
const getLambert72TileSet = () =>
    geoApiVlaanderenCapabilities.Contents.TileMatrixSet.find(({ Identifier }) => Identifier === Lambert72Identifier);
export const getLambert72Extent = (): [number, number, number, number] => getLambert72TileSet()?.BoundingBox;
export const getLambert72Code = (): string => getLambert72TileSet()?.SupportedCRS || 'EPSG:31370';

const getGRBLayer = () =>
    geoApiVlaanderenCapabilities.Contents.Layer.find(({ Identifier }) => Identifier === 'grb_bsk');
export const getGRBLayerExtent = () => getGRBLayer().WGS84BoundingBox;
export const getWGS84Code = (): string => 'EPSG:4326';