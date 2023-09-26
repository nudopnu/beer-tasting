import { Gender } from "./gender.model";
import { Generation } from "./generation";

export interface UserDataFlat {
    userId: string;
    userGender: Gender;
    userGeneration: Generation;
    beerId: number;
    beerName: string;
    rating: number;
    avgNormAngry: number;
    avgNormDisgusted: number;
    avgNormHappy: number;
    avgNormSad: number;
    avgNormSurprised: number;
    recordedTime: string;
}