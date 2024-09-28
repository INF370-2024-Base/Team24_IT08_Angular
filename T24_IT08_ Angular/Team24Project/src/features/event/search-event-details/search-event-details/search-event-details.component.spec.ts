import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchEventDetailsComponent } from './search-event-details.component';

describe('SearchEventDetailsComponent', () => {
  let component: SearchEventDetailsComponent;
  let fixture: ComponentFixture<SearchEventDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchEventDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchEventDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
