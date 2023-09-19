import { Gender } from "./gender.model";
import { Generation } from "./generation";

export interface User {
    id: string;
    generation: Generation;
    gender: Gender;
}