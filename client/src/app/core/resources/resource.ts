import { BehaviorSubject, Observable, OperatorFunction, Subject, map } from "rxjs";
import { ResourceType } from "./resource-types";
import { Resource } from "./resources";
import { Database } from "../database/database";

export abstract class AbstractResource<T> {

    abstract readonly type: ResourceType;
    abstract toItem: ((_: string) => T);
    abstract set(value: T): void;
    abstract get(): void;

    protected static notifier = new BehaviorSubject<string>("");

    constructor(
        protected database: Database,
    ) { }

    protected triggerUpdate(): void {
        AbstractResource.notifier.next("");
    }

    toObservable(): Observable<T> {
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
        return items[0];
    }

    override toItem: (_: string) => T = _ => this.get();
}

export abstract class AbstractMultiResource<T> extends AbstractResource<Array<T>> {

    override set(items: Array<T>): void {
        this.database.reset(this.type);
        this.database.addItems(this.type, items);
        this.triggerUpdate();
    }

    override get(): Array<T> {
        return this.database.getItems<T>(this.type);
    }

    addItems(items: Array<T>): void {
        this.database.addItems(this.type, items);
        this.triggerUpdate();
    }

    removeItems(itemIds: Array<string>): void {
        this.database.removeItems(this.type, itemIds);
        this.triggerUpdate();
    }

    toItem: (_: string) => Array<T> = _ => this.get();
}

export type ResourceOfType<T> = Extract<Resource, { type: T }>;
export type RawTypeOfResource<T> = T extends AbstractResource<infer U> ? U : never;
