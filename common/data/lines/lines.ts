import {LineType} from "./lineType";
import {getDataJsonByUrl, StrapiBasePath} from "../dataHelpers";


export class Lines{
     
    
    public async getFilters(){
        return [
            await this.getObjectsCountByLine(LineType.BlueLine),
            await this.getObjectsCountByLine(LineType.RedLine),
            await this.getObjectsCountByLine(LineType.PurpleLine)
        ];
    }
    
    public async getLinePolylines(type: LineType){
        const prefix = this.getLinePrefix(type);
        switch (type) {
            case LineType.RedLine || LineType.BlueLine:
                return [(await getDataJsonByUrl(StrapiBasePath + `/${prefix}-line-lines?populate=geometry`))
                    .data[0].attributes.geometry.coordinates];
            case LineType.PurpleLine:
                return (await getDataJsonByUrl(StrapiBasePath + `/${prefix}-line-lines?populate=geometry`))
                    .data.map(x => x.attributes.geometry[0].coordinates);
            default:
                throw new Error(`Unknown line type: ${type}`);
        }
    }
    
    public async getLineObjects(type: LineType){
        const prefix = this.getLinePrefix(type);
        const totalCount = (await this.getObjectsCountByLine(type)).count;
        return (await getDataJsonByUrl(StrapiBasePath + `/${prefix}-lines?populate=geometry&pagination[pageSize]=${totalCount}`)).data;
    }
    
    private async getObjectsCountByLine(type: LineType){
        const prefix = this.getLinePrefix(type);
        return {line: prefix, count: (await getDataJsonByUrl(StrapiBasePath + `/${prefix}-lines?&pagination[pageSize]=1`)).meta.pagination.total}
    }
    
    private getLinePrefix(type: LineType){
        let prefix;
        switch (type) {
            case LineType.RedLine:
                prefix = "red";
                break
            case LineType.BlueLine:
                prefix = "blue";
                break
            case LineType.PurpleLine:
                prefix = "pink";
                break
            default:
                throw new Error(`Unknown line type: ${type}`);
        }
        return prefix;
    }
}