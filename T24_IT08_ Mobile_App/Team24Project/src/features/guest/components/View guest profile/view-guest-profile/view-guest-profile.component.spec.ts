import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewGuestProfileComponent } from './view-guest-profile.component';

describe('ViewGuestProfileComponent', () => {
  let component: ViewGuestProfileComponent;
  let fixture: ComponentFixture<ViewGuestProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewGuestProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewGuestProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
