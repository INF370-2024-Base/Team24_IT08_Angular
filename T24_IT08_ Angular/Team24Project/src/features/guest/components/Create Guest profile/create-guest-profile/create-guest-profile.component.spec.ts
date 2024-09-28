import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGuestProfileComponent } from './create-guest-profile.component';

describe('CreateGuestProfileComponent', () => {
  let component: CreateGuestProfileComponent;
  let fixture: ComponentFixture<CreateGuestProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateGuestProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateGuestProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
