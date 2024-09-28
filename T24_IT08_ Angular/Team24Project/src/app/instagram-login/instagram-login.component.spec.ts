import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstagramLoginComponent } from './instagram-login.component';

describe('InstagramLoginComponent', () => {
  let component: InstagramLoginComponent;
  let fixture: ComponentFixture<InstagramLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstagramLoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstagramLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
