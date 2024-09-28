import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchGuestProfileComponent } from './search-guest-profile.component';

describe('SearchGuestProfileComponent', () => {
  let component: SearchGuestProfileComponent;
  let fixture: ComponentFixture<SearchGuestProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchGuestProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchGuestProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
