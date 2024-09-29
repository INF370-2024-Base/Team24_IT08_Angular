import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLAndFItemComponent } from './create-l-and-f-item.component';

describe('CreateLAndFItemComponent', () => {
  let component: CreateLAndFItemComponent;
  let fixture: ComponentFixture<CreateLAndFItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateLAndFItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateLAndFItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
