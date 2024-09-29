import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEventMenuItemComponent } from './update-event-menu-item.component';

describe('UpdateEventMenuItemComponent', () => {
  let component: UpdateEventMenuItemComponent;
  let fixture: ComponentFixture<UpdateEventMenuItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateEventMenuItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateEventMenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
