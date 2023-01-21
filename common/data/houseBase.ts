import {getDataJsonByUrl, getTotalObjectsCount, StrapiBaseUrl} from "./dataHelpers";


export class HouseBase{
    public async getObject(id: string){
        return await getDataJsonByUrl(StrapiBaseUrl + `/house/${id}`);
    }

    public async getObjectsPolygonsByRange(from: string, to: string, filterName: string){
        const totalCount = await getTotalObjectsCount(StrapiBaseUrl + "/house");
        return (await getDataJsonByUrl(StrapiBaseUrl +
            `/house?populate=borders&filters[${filterName}][$gte]=${from}&filters[${filterName}][$lte]=${to}&pagination[pageSize]=${totalCount}`))
            .data.map(x => x.attributes.borders?.coordinates);
    }
}