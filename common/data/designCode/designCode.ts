/* eslint-disable */

import {DesigCodeObject} from "./desigCodeModels";

export class DesignCode {
    private filtersNames?: string[];
    private readonly objectsIdsByType: Map<string, string[]>
    private readonly objectById: Map<string, DesigCodeObject>;
    private inputData?: any;
    
    constructor() {
        this.objectsIdsByType = new Map<string, string[]>();
        this.objectById = new Map<string, DesigCodeObject>();
    }
    
    public async getFilters(): Promise<string[]> {
        if (this.filtersNames)
            return this.filtersNames;
        
        if (!this.inputData)
            await this.getAndSaveData();
        
        const set = new Set<string>();
        
        for (const e of this.inputData){
            if (!e.type)
                continue;
            set.add(e.type);
        }
        this.filtersNames = Array.from(set);
        return this.filtersNames;
    }
    
    public async getObjectsIds(type: string): Promise<string[]> {
        if (this.objectsIdsByType[type])
            return this.objectsIdsByType[type];
        
        if(!this.inputData)
            await this.getAndSaveData();
            
        const resultIds = [];
        for (const e of this.inputData){
            if (e.type === type)
                resultIds.push(e.id);
        }
        
        this.objectsIdsByType[type] = resultIds;
        return resultIds;
    }
    
    public async getObject(id: string): Promise<DesigCodeObject>{
        if (this.objectById[id])
            return this.objectById[id];

        if(!this.inputData)
            await this.getAndSaveData();
        
        for (const e of this.inputData){
            if (e.id !== id)
                continue;
            this.objectById[id] = e;
            return e;
        }
    }
    
    private async getAndSaveData() {
        await fetch("https://map.ekaterinburg.design/api/map")
            .then(x => x.json())
            .then(x => this.inputData = x);
    }
}