import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaceExpressionComponent } from './face-expression.component';

describe('FaceExpressionComponent', () => {
  let component: FaceExpressionComponent;
  let fixture: ComponentFixture<FaceExpressionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FaceExpressionComponent]
    });
    fixture = TestBed.createComponent(FaceExpressionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
