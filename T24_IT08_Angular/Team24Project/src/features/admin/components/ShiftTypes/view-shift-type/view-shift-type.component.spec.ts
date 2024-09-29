import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewShiftTypeComponent } from './view-shift-type.component';

describe('ViewShiftTypeComponent', () => {
  let component: ViewShiftTypeComponent;
  let fixture: ComponentFixture<ViewShiftTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewShiftTypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewShiftTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
