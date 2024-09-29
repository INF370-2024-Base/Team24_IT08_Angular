import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchEventTypeComponent } from './search-event-type.component';

describe('SearchEventTypeComponent', () => {
  let component: SearchEventTypeComponent;
  let fixture: ComponentFixture<SearchEventTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchEventTypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchEventTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
