import { Event } from "./event";
import { EventOfType, EventType } from "./event-type";

export interface Subscription {
    stop(): void;
    resume(): void;
}

export abstract class EventListener<SpecificEvent extends Event> {
    abstract subscribe(callback: (e: SpecificEvent) => void): Subscription;
}

export type EventListenerOfType<SpecificEventType extends EventType> = EventListener<EventOfType<SpecificEventType>>;