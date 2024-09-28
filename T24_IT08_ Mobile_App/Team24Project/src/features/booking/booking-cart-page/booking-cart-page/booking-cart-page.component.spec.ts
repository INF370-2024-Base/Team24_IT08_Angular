import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingCartPageComponent } from './booking-cart-page.component';

describe('BookingCartPageComponent', () => {
  let component: BookingCartPageComponent;
  let fixture: ComponentFixture<BookingCartPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingCartPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingCartPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
