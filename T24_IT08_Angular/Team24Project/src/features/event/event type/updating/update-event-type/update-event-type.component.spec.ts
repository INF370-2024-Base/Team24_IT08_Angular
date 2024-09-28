import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEventTypeComponent } from './update-event-type.component';

describe('UpdateEventTypeComponent', () => {
  let component: UpdateEventTypeComponent;
  let fixture: ComponentFixture<UpdateEventTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateEventTypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateEventTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
