import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPoliciesAndRegulationsComponent } from './search-policies-and-regulations.component';

describe('SearchPoliciesAndRegulationsComponent', () => {
  let component: SearchPoliciesAndRegulationsComponent;
  let fixture: ComponentFixture<SearchPoliciesAndRegulationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchPoliciesAndRegulationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchPoliciesAndRegulationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
