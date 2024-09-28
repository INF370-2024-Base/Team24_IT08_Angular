import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateStaffProfileComponent } from './update-staff-profile.component';

describe('UpdateStaffProfileComponent', () => {
  let component: UpdateStaffProfileComponent;
  let fixture: ComponentFixture<UpdateStaffProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateStaffProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateStaffProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
