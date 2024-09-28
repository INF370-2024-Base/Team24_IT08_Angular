import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchEventBookingComponent } from './search-event-booking.component';

describe('SearchEventBookingComponent', () => {
  let component: SearchEventBookingComponent;
  let fixture: ComponentFixture<SearchEventBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchEventBookingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchEventBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
