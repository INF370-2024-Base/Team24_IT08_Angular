import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchEventItemsComponent } from './search-event-items.component';

describe('SearchEventItemsComponent', () => {
  let component: SearchEventItemsComponent;
  let fixture: ComponentFixture<SearchEventItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchEventItemsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchEventItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
