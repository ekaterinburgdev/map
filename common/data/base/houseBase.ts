/* eslint-disable */
import {getDataJsonByUrl, getObjectsTotalCount, StrapiBaseUrl} from "../dataHelpers";
import {CanGetById} from "./canGetById";


export class HouseBase extends CanGetById{
    public override async getObject(id: string): Promise<any> {
        return super.getObject(id, "/house");
    }

    public async getObjectsPolygonsByRange(from: string, to: string, filterName: string){
        const totalCount = await getObjectsTotalCount(StrapiBaseUrl + "/house");
        return (await getDataJsonByUrl(StrapiBaseUrl +
            `/house?populate=borders&filters[${filterName}][$gte]=${from}&filters[${filterName}][$lte]=${to}&pagination[pageSize]=${totalCount}`))
            .data.map(x => x.attributes.borders?.coordinates);
    }
}
