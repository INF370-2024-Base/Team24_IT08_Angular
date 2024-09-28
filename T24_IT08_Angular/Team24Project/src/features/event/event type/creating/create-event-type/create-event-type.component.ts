import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService, EventType } from '../../../../../services/event.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-event-type',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './create-event-type.component.html',
  styleUrl: './create-event-type.component.scss',
})
export class CreateEventTypeComponent implements OnInit {
  eventType: EventType = {
    name: '',
    description: '',
    dateCreated: new Date(),
    dateModified: new Date(),
    isActive: false,
    isDeleted: false,
    eventTypeId: 0,
    isCatered: false,
    standardRate: 0,
  };

  constructor(private eventService: EventService, private router: Router) {}

  ngOnInit(): void {
    // Any initialization logic can be placed here
  }

  createEventType(): void {
    if (
      !this.eventType.name ||
      !this.eventType.description ||
      this.eventType.isCatered == null ||
      this.eventType.standardRate == null
    ) {
      return;
    }
    this.eventType.dateCreated = new Date();
    this.eventType.dateModified = new Date();
    this.eventType.isActive = false;
    this.eventType.isDeleted = false;
    this.eventType.eventTypeId = 0;

    console.log('Creating Event Type with payload:', this.eventType);

    this.eventService.createEventType(this.eventType as EventType).subscribe(
      (response) => {
        console.log('Event Type created successfully with response:', response);
        alert('Event Type created successfully!');
        this.router.navigate(['/search-event-type']);
      },
      (error) => {
        console.error('Error creating event type', error);
      }
    );
  }
}
