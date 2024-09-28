import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchLAndFItemComponent } from './search-l-and-f-item.component';

describe('SearchLAndFItemComponent', () => {
  let component: SearchLAndFItemComponent;
  let fixture: ComponentFixture<SearchLAndFItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchLAndFItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchLAndFItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
