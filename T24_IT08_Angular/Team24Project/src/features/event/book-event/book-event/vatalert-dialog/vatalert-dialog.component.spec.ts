import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VATAlertDialogComponent } from './vatalert-dialog.component';

describe('VATAlertDialogComponent', () => {
  let component: VATAlertDialogComponent;
  let fixture: ComponentFixture<VATAlertDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VATAlertDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VATAlertDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
