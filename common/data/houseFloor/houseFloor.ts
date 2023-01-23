/* eslint-disable */
import {HouseBase} from "../base/houseBase";


export class HouseFloor extends HouseBase{
    public static HouseFloors = ["1", "3", "5", "9", "12", "16", "21", "25", "31", "52"];

    public override async getObjectsPolygonsByRange(from: string, to: string){
        return super.getObjectsPolygonsByRange(from, to, "Floor");
    }
}
