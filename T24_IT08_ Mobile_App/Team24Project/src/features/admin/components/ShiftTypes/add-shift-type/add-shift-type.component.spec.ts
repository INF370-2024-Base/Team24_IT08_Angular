import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddShiftTypeComponent } from './add-shift-type.component';

describe('AddShiftTypeComponent', () => {
  let component: AddShiftTypeComponent;
  let fixture: ComponentFixture<AddShiftTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddShiftTypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddShiftTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
