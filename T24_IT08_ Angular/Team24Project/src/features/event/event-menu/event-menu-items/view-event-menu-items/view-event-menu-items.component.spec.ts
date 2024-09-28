import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEventMenuItemsComponent } from './view-event-menu-items.component';

describe('ViewEventMenuItemsComponent', () => {
  let component: ViewEventMenuItemsComponent;
  let fixture: ComponentFixture<ViewEventMenuItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewEventMenuItemsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewEventMenuItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
