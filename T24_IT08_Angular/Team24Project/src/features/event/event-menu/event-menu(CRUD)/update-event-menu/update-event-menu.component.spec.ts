import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEventMenuComponent } from './update-event-menu.component';

describe('UpdateEventMenuComponent', () => {
  let component: UpdateEventMenuComponent;
  let fixture: ComponentFixture<UpdateEventMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateEventMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateEventMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
