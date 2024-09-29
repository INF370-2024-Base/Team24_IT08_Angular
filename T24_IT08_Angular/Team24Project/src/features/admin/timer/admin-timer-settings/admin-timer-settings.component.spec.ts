import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTimerSettingsComponent } from './admin-timer-settings.component';

describe('AdminTimerSettingsComponent', () => {
  let component: AdminTimerSettingsComponent;
  let fixture: ComponentFixture<AdminTimerSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminTimerSettingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminTimerSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
