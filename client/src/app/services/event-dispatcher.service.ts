import { Injectable } from '@angular/core';
import { EventListener, EventListenerOfType, Subscription } from '../core/events/event-listener';
import { EventOfType, EventType, EventTypes } from '../core/events/event-type';

type EventCallback<SpecificEventType extends EventType> = (event: EventOfType<SpecificEventType>) => void;

@Injectable({
  providedIn: 'root'
})
export class EventDispatcherService {

  callbacks: { [SpecificEventType in EventType]: Array<EventCallback<SpecificEventType>> };

  constructor() {
    this.callbacks = {} as { [SpecificEventType in EventType]: Array<EventCallback<SpecificEventType>> };
    EventTypes.forEach(eventType => {
      this.callbacks[eventType] = [];
    });
  }

  listen<SpecificEventType extends EventType>(eventType: SpecificEventType): EventListenerOfType<SpecificEventType> {
    const dispatcher = this;
    return new class extends EventListener<EventOfType<SpecificEventType>> {
      override subscribe(callback: (e: EventOfType<SpecificEventType>) => void): Subscription {
        dispatcher.addCallback(eventType, callback);
        const subscription = {
          stop: () => dispatcher.removeCallback(eventType, callback),
          resume: () => dispatcher.addCallback(eventType, callback),
        };
        return subscription;
      }
    };
  }

  dispatch<T extends EventType>(event: EventOfType<T>): void {
    const callbacks = this.callbacks[event.type] as Array<EventCallback<T>>;
    callbacks.forEach(
      callback => callback(event)
    );
  }

  private addCallback<SpecificEventType extends EventType>(eventType: SpecificEventType, callback: (e: EventOfType<SpecificEventType>) => void) {
    this.callbacks[eventType].push(callback);
  }

  private removeCallback<SpecificEventType extends EventType>(eventType: SpecificEventType, callback: (e: EventOfType<SpecificEventType>) => void) {
    this.callbacks[eventType] = this.callbacks[eventType].filter(cb => cb !== callback) as any;
  }

}
