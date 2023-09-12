import { TestBed } from '@angular/core/testing';

import { EventDispatcherService } from './event-dispatcher.service';

describe('EventDispatcherService', () => {
  let service: EventDispatcherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventDispatcherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
