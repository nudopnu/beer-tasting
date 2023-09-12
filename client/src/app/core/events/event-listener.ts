import { Event } from "./event";
import { EventOfType, EventType } from "./event-type";

export abstract class EventListener<SpecificEvent extends Event> {
    abstract subscribe(callback: (e: SpecificEvent) => void): void;
}

export type EventListenerOfType<SpecificEventType extends EventType> = EventListener<EventOfType<SpecificEventType>>;