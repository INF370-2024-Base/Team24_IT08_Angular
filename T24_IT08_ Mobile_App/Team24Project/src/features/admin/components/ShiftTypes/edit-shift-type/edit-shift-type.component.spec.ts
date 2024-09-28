import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditShiftTypeComponent } from './edit-shift-type.component';

describe('EditShiftTypeComponent', () => {
  let component: EditShiftTypeComponent;
  let fixture: ComponentFixture<EditShiftTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditShiftTypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditShiftTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
