import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchEventCategoriesComponent } from './search-event-categories.component';

describe('SearchEventCategoriesComponent', () => {
  let component: SearchEventCategoriesComponent;
  let fixture: ComponentFixture<SearchEventCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchEventCategoriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchEventCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
