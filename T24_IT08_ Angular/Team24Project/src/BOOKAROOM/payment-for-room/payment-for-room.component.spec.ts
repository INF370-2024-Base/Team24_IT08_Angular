import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentForRoomComponent } from './payment-for-room.component';

describe('PaymentForRoomComponent', () => {
  let component: PaymentForRoomComponent;
  let fixture: ComponentFixture<PaymentForRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentForRoomComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentForRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
