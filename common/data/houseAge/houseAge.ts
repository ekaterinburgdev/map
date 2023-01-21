import {getDataJsonByUrl, getTotalObjectsCount, StrapiBaseUrl} from "../dataHelpers";
import {polygon} from "leaflet";
import {HouseBase} from "../houseBase";


export class HouseAge extends HouseBase{
    public static HouseAges = ["1723", "1807", "1905", "1920", "1940", "1960", "1980", "1990", "2000", "2022"];
    
    public async getObjectsPolygonsByRange(from: string, to: string){
        const totalCount = await getTotalObjectsCount(StrapiBaseUrl + "/house");
        return (await getDataJsonByUrl(StrapiBaseUrl +
            `/house?populate=borders&filters[Year][$gte]=${from}&filters[Year][$lte]=${to}&pagination[pageSize]=${totalCount}`))
            .data.map(x => x.attributes.borders?.coordinates);
    }
}