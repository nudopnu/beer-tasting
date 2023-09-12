import { Injectable } from '@angular/core';
import { EventDispatcherService } from './event-dispatcher.service';
import { EventOfType, EventTypes } from '../core/events/event-type';
import { Event } from '../core/events/event';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor(
    eventDispatcher: EventDispatcherService,
  ) {
    EventTypes.forEach(eventType => {
      eventDispatcher
        .listen(eventType)
        .subscribe(this.log);
    })
  }

  private log(event: Event): void {
    console.groupCollapsed(`[${event.type}]`);
    console.log(event.payload);
    console.groupEnd();
  }

}
