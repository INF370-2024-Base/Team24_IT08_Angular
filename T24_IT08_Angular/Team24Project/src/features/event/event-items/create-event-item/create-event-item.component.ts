import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { EventService,EventType,EventItem } from '../../../../services/event.service';

@Component({
  selector: 'app-create-event-item',
  standalone: true,
  imports: [CommonModule, FormsModule,HttpClientModule, ReactiveFormsModule],
  templateUrl: './create-event-item.component.html',
  styleUrl: './create-event-item.component.scss'
})
export class CreateEventItemComponent implements OnInit{
  eventItemForm: FormGroup;
  eventTypes: EventType[] = [];

  constructor(
    private fb: FormBuilder,
    private eventService: EventService
  ) {
    this.eventItemForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      eventTypeId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.fetchEventTypes();
  }

  fetchEventTypes(): void {
    this.eventService.getEventTypes().subscribe((types) => {
      this.eventTypes = types;
    });
  }

  onSubmit(): void {
    if (this.eventItemForm.valid) {
      const newEventItem: EventItem = {
        ...this.eventItemForm.value,
        dateCreated: new Date(),
        isActive: true,
        isDeleted: false
      };

      this.eventService.createEventItem(newEventItem).subscribe(
        (response) => {
          alert('Event Item created successfully');
          console.log('Event Item created successfully', response);
          // Handle success (e.g., show a notification, clear the form, etc.)
        },
        (error) => {
          alert('Error creating Event Item');
          console.error('Error creating Event Item', error);
          // Handle error
        }
      );
    }
  }
}
