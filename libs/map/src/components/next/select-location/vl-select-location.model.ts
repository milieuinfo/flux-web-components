import { Item } from 'choices.js';

export type Coords = {
    x: number;
    y: number;
};

export type SuggestionData = {
    SuggestionResult: string[];
};

export type LocationData = {
    LocationResult: Location[];
};

export type GeoCoords = {
    Lat_WGS84: number;
    Lon_WGS84: number;
    X_Lambert72?: number;
    Y_Lambert72?: number;
    X_Lambert2008?: number;
    Y_Lambert2008?: number;
};

export type BoundingBox = {
    LowerLeft: GeoCoords;
    UpperRight: GeoCoords;
};

export type Location = {
    Municipality: string;
    Zipcode: string;
    Thoroughfarename: string;
    Housenumber: string;
    ID: number;
    FormattedAddress: string;
    Location: GeoCoords;
    LocationType: string;
    BoundingBox: BoundingBox;
};

export const isLocation = (value: string | string[] | Item | Item[] | Location): value is Location =>
    typeof value === 'object' && !Array.isArray(value) && !!(value as unknown as Location).BoundingBox;

export const isCoord = (value: string | string[] | Item | Item[] | Coords): value is Coords =>
    typeof value === 'object' && !Array.isArray(value) && !!(value as Coords).x && !!(value as Coords).y;
