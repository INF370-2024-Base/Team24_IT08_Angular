import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePAndRComponent } from './update-p-and-r.component';

describe('UpdatePAndRComponent', () => {
  let component: UpdatePAndRComponent;
  let fixture: ComponentFixture<UpdatePAndRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdatePAndRComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatePAndRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
