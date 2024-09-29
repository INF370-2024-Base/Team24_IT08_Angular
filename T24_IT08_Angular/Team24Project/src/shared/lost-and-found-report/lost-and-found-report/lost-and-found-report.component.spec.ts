import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LostAndFoundReportComponent } from './lost-and-found-report.component';

describe('LostAndFoundReportComponent', () => {
  let component: LostAndFoundReportComponent;
  let fixture: ComponentFixture<LostAndFoundReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LostAndFoundReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LostAndFoundReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
