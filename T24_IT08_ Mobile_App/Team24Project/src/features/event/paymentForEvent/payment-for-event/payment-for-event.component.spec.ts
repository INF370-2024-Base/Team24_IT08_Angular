import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentForEventComponent } from './payment-for-event.component';

describe('PaymentForEventComponent', () => {
  let component: PaymentForEventComponent;
  let fixture: ComponentFixture<PaymentForEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentForEventComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentForEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
