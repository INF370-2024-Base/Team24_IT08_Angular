import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestQrCodeComponent } from './guest-qr-code.component';

describe('GuestQrCodeComponent', () => {
  let component: GuestQrCodeComponent;
  let fixture: ComponentFixture<GuestQrCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuestQrCodeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuestQrCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
