import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectionChecklistModalComponent } from './inspection-checklist-modal.component';

describe('InspectionChecklistModalComponent', () => {
  let component: InspectionChecklistModalComponent;
  let fixture: ComponentFixture<InspectionChecklistModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InspectionChecklistModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InspectionChecklistModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
