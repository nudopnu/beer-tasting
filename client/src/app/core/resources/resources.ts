import { Settings } from "../models/settings.model";
import { AbstractResource } from "./resource";

export abstract class SettingsResource extends AbstractResource<Settings> {
    readonly type = "SettingsResource";
}

export abstract class StringResource extends AbstractResource<string> {
    readonly type = "StringResource";
}

export type Resource =
    | StringResource
    | SettingsResource
    ;