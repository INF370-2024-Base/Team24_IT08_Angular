import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventCartPageComponent } from './event-cart-page.component';

describe('EventCartPageComponent', () => {
  let component: EventCartPageComponent;
  let fixture: ComponentFixture<EventCartPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventCartPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventCartPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
