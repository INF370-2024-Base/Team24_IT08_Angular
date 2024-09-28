import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateShiftAssignmentComponent } from './update-shift-assignment.component';

describe('UpdateShiftAssignmentComponent', () => {
  let component: UpdateShiftAssignmentComponent;
  let fixture: ComponentFixture<UpdateShiftAssignmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateShiftAssignmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateShiftAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
