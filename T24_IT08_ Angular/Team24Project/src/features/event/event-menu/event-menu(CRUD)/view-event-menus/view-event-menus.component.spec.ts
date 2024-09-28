import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEventMenusComponent } from './view-event-menus.component';

describe('ViewEventMenusComponent', () => {
  let component: ViewEventMenusComponent;
  let fixture: ComponentFixture<ViewEventMenusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewEventMenusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewEventMenusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
