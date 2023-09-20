import { ResourceType } from "../resources/resource-types";
import { Database, WithId } from "./database";

export class LocalStorageDatabase implements Database {
    static INTERNAL_ID_COUNTER = "__id";

    static id = parseInt(localStorage.getItem(LocalStorageDatabase.INTERNAL_ID_COUNTER) || "0");

    assignId<T>(item: T): WithId<T> {
        const newId = ++LocalStorageDatabase.id;
        localStorage.setItem("__id", `${newId}`);
        return { ...item, id: newId } as WithId<T>
    }

    reset(type: ResourceType): void {
        localStorage.removeItem(type);
    }

    getItems<T>(type: ResourceType): Array<T> {
        return this.getItemsOrEmpty(type);
    }

    addItems<T>(type: ResourceType, items: T[]): WithId<T>[] {
        const newItems = [
            ...this.getItemsOrEmpty<T>(type),
            ...items.map(this.assignId),
        ];
        this.setItems(type, newItems);
        return newItems;
    }

    removeItems(type: ResourceType, itemIds: Array<string>): void {
        this.setItems(type, this.getItemsOrEmpty(type).filter(item => item.id))
    }

    private getItemsOrEmpty<T>(key: string): Array<WithId<T>> {
        const oldValue = localStorage.getItem(key);
        if (oldValue) return JSON.parse(oldValue);
        return [];
    }

    private setItems<T>(key: string, items: Array<WithId<T>>) {
        localStorage.setItem(key, JSON.stringify(items));
    }
}