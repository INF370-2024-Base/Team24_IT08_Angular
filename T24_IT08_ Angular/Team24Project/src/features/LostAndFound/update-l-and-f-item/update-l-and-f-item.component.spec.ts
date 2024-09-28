import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateLAndFItemComponent } from './update-l-and-f-item.component';

describe('UpdateLAndFItemComponent', () => {
  let component: UpdateLAndFItemComponent;
  let fixture: ComponentFixture<UpdateLAndFItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateLAndFItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateLAndFItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
