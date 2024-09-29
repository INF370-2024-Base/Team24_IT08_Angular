import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBookingDetailsComponent } from './search-booking-details.component';

describe('SearchBookingDetailsComponent', () => {
  let component: SearchBookingDetailsComponent;
  let fixture: ComponentFixture<SearchBookingDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchBookingDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchBookingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
