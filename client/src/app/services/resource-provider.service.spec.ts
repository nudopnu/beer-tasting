import { TestBed } from '@angular/core/testing';

import { ResourceProviderService } from './resource-provider.service';

describe('ResourceProviderService', () => {
  let service: ResourceProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResourceProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
