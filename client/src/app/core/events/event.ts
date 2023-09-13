import { EventType } from "./event-type";
import { ChangeVideoSourceEvent, ErrorEvent, FaceExpressionEvent, InfoEvent, OpenDialogEvent } from "./events";

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
    | OpenDialogEvent
    | ChangeVideoSourceEvent
    ;