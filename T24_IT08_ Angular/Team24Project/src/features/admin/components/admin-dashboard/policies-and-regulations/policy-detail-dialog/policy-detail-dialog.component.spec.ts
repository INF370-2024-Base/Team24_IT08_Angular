import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyDetailDialogComponent } from './policy-detail-dialog.component';

describe('PolicyDetailDialogComponent', () => {
  let component: PolicyDetailDialogComponent;
  let fixture: ComponentFixture<PolicyDetailDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PolicyDetailDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PolicyDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
