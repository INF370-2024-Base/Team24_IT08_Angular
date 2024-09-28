import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEventCategoryComponent } from './update-event-category.component';

describe('UpdateEventCategoryComponent', () => {
  let component: UpdateEventCategoryComponent;
  let fixture: ComponentFixture<UpdateEventCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateEventCategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateEventCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
