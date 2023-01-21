import {getDataJsonByUrl, StrapiBaseUrl} from "./dataHelpers";


export class HouseBase{
    public async getObject(id: string){
        return await getDataJsonByUrl(StrapiBaseUrl + `/house/${id}`);
    }
}