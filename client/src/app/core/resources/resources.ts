import { Settings } from "../models/settings.model";
import { State } from "../models/state.model";
import { User } from "../models/user.model";
import { AbstractMultiResource, AbstractSingleResource } from "./resource";

export class SettingsResource extends AbstractSingleResource<Settings> {
    readonly type = "SettingsResource";
}

export class UserResource extends AbstractMultiResource<User> {
    readonly type = "UserResource";
}

export class StateResource extends AbstractSingleResource<State>{
    readonly type = "StateResource";
}

export type Resource =
    | UserResource
    | SettingsResource
    | StateResource
    ;