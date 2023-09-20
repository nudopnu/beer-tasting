import { ResourceType } from "../resources/resource-types";

export type WithId<T> = { item: T, id: string };

export abstract class Database {
    abstract reset(type: ResourceType): void;
    abstract getItems<T>(type: ResourceType): Array<WithId<T>>;
    abstract addItems<T>(type: ResourceType, items: Array<T>): Array<WithId<T>>;
    abstract removeItems(type: ResourceType, itemIds: Array<string>): void;
}