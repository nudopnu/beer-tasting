import { Event } from "./event";

export const EventTypes = [
    "ERROR",
    "INFO",
] as const;

export type EventType = typeof EventTypes[number];
export type EventOfType<T extends EventType> = Extract<Event, { type: T }>;