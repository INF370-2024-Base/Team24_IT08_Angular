import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingTrendsComponent } from './booking-trends.component';

describe('BookingTrendsComponent', () => {
  let component: BookingTrendsComponent;
  let fixture: ComponentFixture<BookingTrendsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingTrendsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingTrendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
