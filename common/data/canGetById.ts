/* eslint-disable */
import {getDataJsonByUrl, StrapiBaseUrl} from "./dataHelpers";


export class CanGetById{
    public async getObject(id: string, tableRelativeUrl: string){
        return await getDataJsonByUrl(StrapiBaseUrl + `${tableRelativeUrl}/${id}`);
    }
}