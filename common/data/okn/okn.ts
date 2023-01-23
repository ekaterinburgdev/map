/* eslint-disable */
import {OknAreaType, OknObjectSignificanceType} from "./oknConstants";
import {getDataJsonByUrl, getObjectsTotalCount, StrapiBaseUrl} from "../dataHelpers";
import {CanGetById} from "../base/canGetById";

export class Okn extends CanGetById{
    public override async getObject(id: string): Promise<any> {
        return super.getObject(id, "/okn-objects");
    }

    public async getObjectBySignificanceType(type: OknObjectSignificanceType){
        const totalCount = await getObjectsTotalCount(StrapiBaseUrl + "/okn-objects");
        return (await getDataJsonByUrl(StrapiBaseUrl +
            `/okn-objects?filter[category][$eq]=${type}&populate=data,geometry&pagination[pageSize]=${totalCount}`)).data
    }

    public async getAreasByType(type: OknAreaType){
        const totalCount = await getObjectsTotalCount(StrapiBaseUrl + "/okn-objects");
        switch (type) {
            case OknAreaType.ObjectZone:
                return (await getDataJsonByUrl(StrapiBaseUrl +
                    `/okn-objects?populate=geometry,data,borders&pagination[pageSize]=${totalCount}`))
                    .data.map(x => x.attributes?.borders?.coordinates);
            case OknAreaType.ProtectZone:
                return (await getDataJsonByUrl(StrapiBaseUrl +
                    `/okn-protect-zones?populate=geometry,data&pagination[pageSize]=${totalCount}`))
                    .data.map(x => x.attributes.geometry.coordinates[0]);
            case OknAreaType.SecurityZone:
                return (await getDataJsonByUrl(StrapiBaseUrl +
                    `/okn-security-zones?populate=geometry,data&pagination[pageSize]=${totalCount}`))
                    .data.map(x => x.attributes.geometry.coordinates[0]);
            default:
                throw new Error(`Unknown okn type: ${type}`);
        }
    }
}

