import { FaceExpressions } from "face-api.js";

export interface BeerRaction {
    beer: number;
    recording: FaceExpressions[];
    rating: number;
}
