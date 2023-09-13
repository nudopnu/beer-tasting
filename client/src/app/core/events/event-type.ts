import { Event } from "./event";

export const EventTypes = [
    "ErrorEvent",
    "InfoEvent",
    "FaceExpressionEvent",
    "OpenDialogEvent",
] as const;

export type EventType = typeof EventTypes[number];
export type EventOfType<T extends EventType> = Extract<Event, { type: T }>;