import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchHallComponent } from './search-hall.component';

describe('SearchHallComponent', () => {
  let component: SearchHallComponent;
  let fixture: ComponentFixture<SearchHallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchHallComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchHallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
