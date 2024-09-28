import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffPerformanceReviewComponent } from './staff-performance-review.component';

describe('StaffPerformanceReviewComponent', () => {
  let component: StaffPerformanceReviewComponent;
  let fixture: ComponentFixture<StaffPerformanceReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StaffPerformanceReviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaffPerformanceReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
