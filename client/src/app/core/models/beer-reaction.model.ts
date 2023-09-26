import { FaceExpressions } from "face-api.js";
import { Beer } from "./beer.model";

export interface BeerRaction {
    beer: Beer;
    recording: FaceExpressions[];
    rating: number;
    recordedTime: Date;
}
