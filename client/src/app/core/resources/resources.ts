import { DrinkingState } from "../models/drinking-state.model";
import { DEFAULT_SETTINGS, Settings } from "../models/settings.model";
import { State } from "../models/state.model";
import { User } from "../models/user.model";
import { AbstractMultiResource, AbstractSingleResource } from "./resource";

export class SettingsResource extends AbstractSingleResource<Settings> {
    readonly type = "SettingsResource";
    override default = DEFAULT_SETTINGS;
}

export class UserResource extends AbstractMultiResource<User> {
    readonly type = "UserResource";
}

export class StateResource extends AbstractSingleResource<State>{
    readonly type = "StateResource";
    override readonly default = "Default";
}

export class DrinkingStateResource extends AbstractSingleResource<DrinkingState> {
    readonly type = "DrinkingStateResource";
    override readonly default = "Choosing";
}

export type Resource =
    | UserResource
    | SettingsResource
    | StateResource
    | DrinkingStateResource
    ;