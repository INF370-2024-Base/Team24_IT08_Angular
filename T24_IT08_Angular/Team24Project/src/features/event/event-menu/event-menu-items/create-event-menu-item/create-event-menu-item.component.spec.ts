import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEventMenuItemComponent } from './create-event-menu-item.component';

describe('CreateEventMenuItemComponent', () => {
  let component: CreateEventMenuItemComponent;
  let fixture: ComponentFixture<CreateEventMenuItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateEventMenuItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEventMenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
