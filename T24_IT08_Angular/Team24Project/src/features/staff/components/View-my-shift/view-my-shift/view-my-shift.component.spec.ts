import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMyShiftComponent } from './view-my-shift.component';

describe('ViewMyShiftComponent', () => {
  let component: ViewMyShiftComponent;
  let fixture: ComponentFixture<ViewMyShiftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewMyShiftComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewMyShiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
