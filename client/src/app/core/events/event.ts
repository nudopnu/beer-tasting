import { EventType } from "./event-type";
import { ErrorEvent, InfoEvent } from "./events";

export abstract class AbstractEvent<T> {
    abstract readonly type: EventType;
    constructor(
        public payload: T,
    ) { }
}

export type Event =
    | ErrorEvent
    | InfoEvent
    ;