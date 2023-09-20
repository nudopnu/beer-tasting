import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserScanningComponent } from './user-scanning.component';

describe('UserScanningComponent', () => {
  let component: UserScanningComponent;
  let fixture: ComponentFixture<UserScanningComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserScanningComponent]
    });
    fixture = TestBed.createComponent(UserScanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
