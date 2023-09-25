import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceProviderComponent } from './resource-provider.component';

describe('ResourceProviderComponent', () => {
  let component: ResourceProviderComponent;
  let fixture: ComponentFixture<ResourceProviderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResourceProviderComponent]
    });
    fixture = TestBed.createComponent(ResourceProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
