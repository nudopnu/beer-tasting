import { Injectable } from '@angular/core';
import { Event } from '../core/events/event';
import { EventTypes } from '../core/events/event-type';
import { EventDispatcherService } from './event-dispatcher.service';

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
    if (event.silent) return;
    console.groupCollapsed(`[Log: ${event.type}]`);
    console.log(event.payload);
    console.groupEnd();
  }

}
