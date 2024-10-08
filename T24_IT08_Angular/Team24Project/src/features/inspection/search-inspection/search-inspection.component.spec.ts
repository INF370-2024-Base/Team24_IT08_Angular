import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchInspectionComponent } from './search-inspection.component';

describe('SearchInspectionComponent', () => {
  let component: SearchInspectionComponent;
  let fixture: ComponentFixture<SearchInspectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchInspectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchInspectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
