import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePAndRComponent } from './create-p-and-r.component';

describe('CreatePAndRComponent', () => {
  let component: CreatePAndRComponent;
  let fixture: ComponentFixture<CreatePAndRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatePAndRComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePAndRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
