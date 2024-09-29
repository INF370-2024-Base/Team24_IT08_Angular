import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountAlertDialogComponent } from './discount-alert-dialog.component';

describe('DiscountAlertDialogComponent', () => {
  let component: DiscountAlertDialogComponent;
  let fixture: ComponentFixture<DiscountAlertDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiscountAlertDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscountAlertDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
