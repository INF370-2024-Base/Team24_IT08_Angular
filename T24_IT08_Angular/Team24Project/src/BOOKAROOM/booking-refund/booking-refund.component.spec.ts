import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingRefundComponent } from './booking-refund.component';

describe('BookingRefundComponent', () => {
  let component: BookingRefundComponent;
  let fixture: ComponentFixture<BookingRefundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingRefundComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingRefundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
