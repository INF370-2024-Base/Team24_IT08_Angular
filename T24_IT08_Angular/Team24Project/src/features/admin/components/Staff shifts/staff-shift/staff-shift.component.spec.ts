import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffShiftComponent } from './staff-shift.component';

describe('StaffShiftComponent', () => {
  let component: StaffShiftComponent;
  let fixture: ComponentFixture<StaffShiftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StaffShiftComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaffShiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
