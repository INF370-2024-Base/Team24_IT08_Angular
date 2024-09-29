import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateGuestReportComponent } from './generate-guest-report.component';

describe('GenerateGuestReportComponent', () => {
  let component: GenerateGuestReportComponent;
  let fixture: ComponentFixture<GenerateGuestReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenerateGuestReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerateGuestReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
