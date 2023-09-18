import { Settings } from "../models/settings.model";
import { User } from "../models/user.model";
import { AbstractMultiResource, AbstractSingleResource } from "./resource";

export abstract class SettingsResource extends AbstractSingleResource<Settings> {
    readonly type = "SettingsResource";
}

export abstract class UserResource extends AbstractMultiResource<User> {
    readonly type = "UserResource";
}

export type Resource =
    | UserResource
    | SettingsResource
    ;