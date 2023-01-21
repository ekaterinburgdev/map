import {HouseBase} from "../houseBase";
import {getDataJsonByUrl, getTotalObjectsCount, StrapiBaseUrl} from "../dataHelpers";


export class HouseFloor extends HouseBase{
    public static HouseFloors = Array.from(Array(52).keys()).map(i => i + 1);

    public async getObjectsPolygonsByRange(from: string, to: string){
        const totalCount = await getTotalObjectsCount(StrapiBaseUrl + "/house");
        return (await getDataJsonByUrl(StrapiBaseUrl +
            `/house?populate=borders&filters[Floors][$gte]=${from}&filters[Floors][$lte]=${to}&pagination[pageSize]=${totalCount}`))
            .data.map(x => x.attributes.borders?.coordinates);
    }
}