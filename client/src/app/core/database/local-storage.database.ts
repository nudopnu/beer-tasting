import { ResourceType } from "../resources/resource-types";
import { Database, WithId } from "./database";

export class LocalStorageDatabase implements Database {
    
    static INTERNAL_ID_COUNTER = "__id";

    assignId<T>(type: ResourceType, item: T): WithId<T> {
        const storageKey = type + LocalStorageDatabase.INTERNAL_ID_COUNTER;
        const oldId = parseInt(localStorage.getItem(storageKey) || "0")
        const newId = `${oldId + 1}`;
        localStorage.setItem(storageKey, newId);
        return { item, id: newId } as WithId<T>
    }

    reset(type: ResourceType): void {
        localStorage.removeItem(type);
    }

    getItems<T>(type: ResourceType): Array<WithId<T>> {
        return this.getItemsOrEmpty<T>(type);
    }

    addItems<T>(type: ResourceType, items: T[]): WithId<T>[] {
        const newItems = items.map(item => this.assignId(type, item));
        const allItemsUpdated = [
            ...this.getItemsOrEmpty<T>(type),
            ...newItems,
        ];
        this.setItems(type, allItemsUpdated);
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