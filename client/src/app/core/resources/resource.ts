import { BehaviorSubject, Observable, OperatorFunction, Subject, map } from "rxjs";
import { ResourceType } from "./resource-types";
import { Resource } from "./resources";
import { Database, WithId } from "../database/database";

export abstract class AbstractResource<T> {

    abstract readonly type: ResourceType;
    abstract toItem: ((_: string) => T);
    abstract set(value: T): void;
    abstract get(): T;

    protected static notifier = new BehaviorSubject<string>("");

    constructor(
        protected database: Database,
    ) { }

    protected triggerUpdate(): void {
        AbstractResource.notifier.next("");
    }

    asObservable(): Observable<T> {
        return AbstractResource.notifier.asObservable().pipe(
            map(this.toItem)
        );
    }
}

export abstract class AbstractSingleResource<T> extends AbstractResource<T> {

    override set(item: T): void {
        this.database.reset(this.type);
        this.database.addItems(this.type, [item]);
        this.triggerUpdate();
    }

    override get(): T {
        const items = this.database.getItems<T>(this.type);
        if (items.length === 0) return this.default;
        return items[0].item;
    }

    override toItem: (_: string) => T = _ => this.get();

    abstract default: T;
}

export abstract class AbstractMultiResource<T> extends AbstractResource<Array<T>> {

    override set(items: Array<T>): void {
        this.database.reset(this.type);
        this.database.addItems(this.type, items);
        this.triggerUpdate();
    }

    override get(): Array<T> {
        return this.database.getItems<T>(this.type).map(dbi => dbi.item);
    }

    addItems(items: Array<T>): Array<WithId<T>> {
        const withIds = this.database.addItems(this.type, items);
        this.triggerUpdate();
        return withIds;
    }

    removeItems(itemIds: Array<string>): void {
        this.database.removeItems(this.type, itemIds);
        this.triggerUpdate();
    }

    addItem(item: T): WithId<T> {
        return this.addItems([item])[0];
    }

    removeItem(itemId: string): void {
        this.removeItems([itemId]);
    }

    toItem: (_: string) => Array<T> = _ => this.get();
}

export type ResourceOfType<T> = Extract<Resource, { type: T }>;
export type RawTypeOfResource<T> = T extends AbstractResource<infer U> ? U : never;
