import {Image} from "../base/objectsBase";

export interface DesigCodeObject{
    id: string;
    name: string;
    type: string;
    description: string;
    coords: [lat: number, lng: number];
    street: string;
    images: Image[];
    preview: Image;
}