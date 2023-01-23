/* eslint-disable */
import {OknAreaType, OknObjectSignificanceType} from "./oknConstants";
import {getDataJsonByUrl, getObjectsTotalCount, StrapiBaseUrl} from "../dataHelpers";
import {CanGetById} from "../base/canGetById";
import {OknObject, OknObjectWithGeometry} from "./oknObject";
import {Area} from "../base/objectsBase";

export class Okn extends CanGetById{
    public override async getObject(id: string): Promise<OknObject> {
        return super.getObject(id, "/okn-objects")
            .then(x => {
                x.attributes.img = x.attributes?.img.split("','")[0].slice(8);
                return x;
            });
    }

    public async getObjectsBySignificanceType(type: OknObjectSignificanceType): Promise<OknObjectWithGeometry[]>{
        const totalCount = await getObjectsTotalCount(StrapiBaseUrl + "/okn-objects");
        return (await getDataJsonByUrl(StrapiBaseUrl +
            `/okn-objects?filter[category][$eq]=${type}&populate=data,geometry&pagination[pageSize]=${totalCount}`)).data
    }

    public async getAreaByType(type: OknAreaType): Promise<Area | undefined>{
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

