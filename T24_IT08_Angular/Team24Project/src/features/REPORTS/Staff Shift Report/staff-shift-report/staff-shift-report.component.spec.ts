import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffShiftReportComponent } from './staff-shift-report.component';

describe('StaffShiftReportComponent', () => {
  let component: StaffShiftReportComponent;
  let fixture: ComponentFixture<StaffShiftReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StaffShiftReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaffShiftReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
