import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestBookingListComponent } from './guest-booking-list.component';

describe('GuestBookingListComponent', () => {
  let component: GuestBookingListComponent;
  let fixture: ComponentFixture<GuestBookingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuestBookingListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuestBookingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
