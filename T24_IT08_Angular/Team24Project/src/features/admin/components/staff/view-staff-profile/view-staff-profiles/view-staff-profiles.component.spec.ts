import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStaffProfilesComponent } from './view-staff-profiles.component';

describe('ViewStaffProfilesComponent', () => {
  let component: ViewStaffProfilesComponent;
  let fixture: ComponentFixture<ViewStaffProfilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewStaffProfilesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewStaffProfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
