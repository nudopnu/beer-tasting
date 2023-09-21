import { BeerRaction } from "./beer-reaction.model";
import { User } from "./user.model";

export interface UserData {
    user: User;
    beerReactions: Array<BeerRaction>;
}