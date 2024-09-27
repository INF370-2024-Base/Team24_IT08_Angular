import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookARoomComponent } from './book-a-room.component';

describe('BookARoomComponent', () => {
  let component: BookARoomComponent;
  let fixture: ComponentFixture<BookARoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookARoomComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookARoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
