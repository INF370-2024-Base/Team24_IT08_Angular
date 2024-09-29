import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder,FormGroup,Validators } from '@angular/forms';
import { EventService,EventCategory } from '../../../../services/event.service';

@Component({
  selector: 'app-create-event-category',
  standalone: true,
  imports: [CommonModule,FormsModule,HttpClientModule,ReactiveFormsModule],
  templateUrl: './create-event-category.component.html',
  styleUrl: './create-event-category.component.scss'
})
export class CreateEventCategoryComponent implements OnInit{
  eventCategoryForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private eventService: EventService
  ) {
    this.eventCategoryForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  
  onSubmit(): void {
    if (this.eventCategoryForm.valid) {
      const newEventCategory: EventCategory = {
        ...this.eventCategoryForm.value,
        dateCreated: new Date(),
        isActive: true,
        isDeleted: false
      };

      this.eventService.createEventCategory(newEventCategory).subscribe(
        (response) => {
          alert('Event Category created successfully');
          console.log('Event Category created successfully', response);
          // Handle success (e.g., show a notification, clear the form, etc.)
        },
        (error) => {
          alert('Error creating Event Category');
          console.error('Error creating Event Category', error);
          // Handle error
        }
      );
    }
  }


}
