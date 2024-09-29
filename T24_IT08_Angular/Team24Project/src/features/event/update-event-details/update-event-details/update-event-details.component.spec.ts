import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEventDetailsComponent } from './update-event-details.component';

describe('UpdateEventDetailsComponent', () => {
  let component: UpdateEventDetailsComponent;
  let fixture: ComponentFixture<UpdateEventDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateEventDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateEventDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
