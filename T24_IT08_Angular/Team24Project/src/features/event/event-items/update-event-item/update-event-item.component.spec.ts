import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEventItemComponent } from './update-event-item.component';

describe('UpdateEventItemComponent', () => {
  let component: UpdateEventItemComponent;
  let fixture: ComponentFixture<UpdateEventItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateEventItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateEventItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
