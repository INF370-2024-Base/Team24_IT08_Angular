import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateBookingsReportComponent } from './generate-bookings-report.component';

describe('GenerateBookingsReportComponent', () => {
  let component: GenerateBookingsReportComponent;
  let fixture: ComponentFixture<GenerateBookingsReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenerateBookingsReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerateBookingsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
