import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEventMenuComponent } from './create-event-menu.component';

describe('CreateEventMenuComponent', () => {
  let component: CreateEventMenuComponent;
  let fixture: ComponentFixture<CreateEventMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateEventMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEventMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
