import { EventType } from "./event-type";
import { ErrorEvent, FaceExpressionEvent, InfoEvent } from "./events";

export abstract class AbstractEvent<T> {
    abstract readonly type: EventType;
    constructor(
        public payload: T,
        public silent = false,
    ) { }
}

export type Event =
    | ErrorEvent
    | InfoEvent
    | FaceExpressionEvent
    ;