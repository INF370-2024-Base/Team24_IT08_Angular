import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDiscountComponent } from './event-discount.component';

describe('EventDiscountComponent', () => {
  let component: EventDiscountComponent;
  let fixture: ComponentFixture<EventDiscountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventDiscountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventDiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
