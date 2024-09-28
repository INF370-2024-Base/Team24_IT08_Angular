import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEventBookingComponent } from './create-event-booking.component';

describe('CreateEventBookingComponent', () => {
  let component: CreateEventBookingComponent;
  let fixture: ComponentFixture<CreateEventBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateEventBookingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEventBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
