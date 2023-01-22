import {DtpSeverityType} from "./dtpSeverityType";
import {CanGetById} from "../canGetById";
import {getDataJsonByUrl, getObjectsTotalCount, StrapiBaseUrl} from "../dataHelpers";


export class Dtp extends CanGetById{
    public override async getObject(id: string): Promise<any> {
        return super.getObject(id, "/dtps");
    }

    public async getObjectsBySeverity(type: DtpSeverityType){
        const totalCount = await getObjectsTotalCount("/dtps");
        return (await getDataJsonByUrl(StrapiBaseUrl +
            `/dtps?filters[severity][$eq]=${type}&populate=data,geometry&pagination[pageSize]=${totalCount}`)).data;
    }
}