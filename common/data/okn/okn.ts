import {OknAreaType, OknObjectSignificanceType} from "./oknConstants";
import {getDataJsonByUrl, getTotalObjectsCount, StrapiBasePath} from "../dataHelpers";

export class Okn{
    private oknObjectInputData?: any;
    private oknProtectZoneInputData?: any;
    private oknSecurityZoneInputData?: any;
    
    public async getObjecById(id: string){
        return await getDataJsonByUrl(StrapiBasePath + `/okn-objects/${id}`);
    }

    public async getObjectBySignificanceType(type: OknObjectSignificanceType){
        if (!this.oknObjectInputData)
            await this.getAndSaveOknObject();
        
        const result = [];
        for (const e of this.oknObjectInputData.data){
            if (e.attributes.category === type){
                result.push(e);
            }
        }
        return result;
    }

    public async getAreasByType(type: OknAreaType){
        switch (type) {
            case OknAreaType.ObjectZone:
                if (!this.oknObjectInputData)
                    await this.getAndSaveOknObject();
                const result = [];
                for (const e of this.oknObjectInputData.data){
                    if (e.attributes.borders)
                        result.push(e.attributes.borders.coordinates);
                }
                return result;
            case OknAreaType.ProtectZone:
                if (!this.oknProtectZoneInputData)
                    await this.getAndSaveOknProtectZone();
                return this.oknProtectZoneInputData.data.map(x => x.attributes.geometry.coordinates[0]);
            case OknAreaType.SecurityZone:
                if (!this.oknSecurityZoneInputData)
                    await this.getAndSaveOknSecurityZone();
                return this.oknSecurityZoneInputData.data.map(x => x.attributes.geometry.coordinates[0]);
            default:
                throw new Error(`Unknown okn type: ${type}`);
        }
    }
    
    private async getAndSaveOknObject(){
        const totalCount = getTotalObjectsCount(StrapiBasePath + "/okn-objects");
        this.oknObjectInputData =
            await getDataJsonByUrl(StrapiBasePath +
                `/okn-objects?populate=geometry,data,borders&pagination[pageSize]=${totalCount}`);
    }
    
    private async getAndSaveOknProtectZone(){
        const totalCount = getTotalObjectsCount(StrapiBasePath + "/okn-protect-zones");
        this.oknProtectZoneInputData = 
            await getDataJsonByUrl(StrapiBasePath +
                `/okn-protect-zones?populate=geometry,data&pagination[pageSize]=${totalCount}`);
    }
    
    private async getAndSaveOknSecurityZone(){
        const totalCount = getTotalObjectsCount(StrapiBasePath + "/okn-security-zones");
        this.oknSecurityZoneInputData =
            await getDataJsonByUrl(StrapiBasePath +
                `/okn-security-zones?populate=geometry,data&pagination[pageSize]=${totalCount}`);
    }
}

