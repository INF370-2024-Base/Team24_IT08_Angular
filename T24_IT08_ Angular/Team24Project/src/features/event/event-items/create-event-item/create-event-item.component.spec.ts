import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEventItemComponent } from './create-event-item.component';

describe('CreateEventItemComponent', () => {
  let component: CreateEventItemComponent;
  let fixture: ComponentFixture<CreateEventItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateEventItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEventItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
