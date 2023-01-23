/* eslint-disable */
import {HouseBase} from "../base/houseBase";


export class HouseAge extends HouseBase{
    public static HouseAges = ["1723", "1807", "1905", "1920", "1940", "1960", "1980", "1990", "2000", "2022"];

    public override async getObjectsPolygonsByRange(from: string, to: string){
        return super.getObjectsPolygonsByRange(from, to, "Year");
    }
}
