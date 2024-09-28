import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EventService, EventType } from '../../../../../services/event.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-event-type',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './update-event-type.component.html',
  styleUrl: './update-event-type.component.scss',
})
export class UpdateEventTypeComponent implements OnInit {
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
  eventTypeId: number = 0;

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.eventTypeId = +this.route.snapshot.paramMap.get('eventTypeId')!;
    this.loadEventType();
  }

  loadEventType(): void {
    this.eventService.getEventTypesById(this.eventTypeId).subscribe(
      (data: EventType) => {
        this.eventType = data;
      },
      (error) => {
        alert('Error fecthing the event type'),
          console.error('Error fetching event type', error);
      }
    );
  }

  goBack() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const role = currentUser.role;
    const emailaddress = currentUser.emailaddress;
  
    if (role === 'Admin') {
      this.router.navigate([`/admin-dashboard/${emailaddress}`]);
    } else if (role === 'Staff') {
      this.router.navigate([`/staff-dashboard/${emailaddress}`]);
    } else if (role === 'Guest') {
      this.router.navigate([`/guest-dashboard/${emailaddress}`]);
    } else {
      console.error('Unknown role:', role);
      this.router.navigate(['/']); // Default route or error page
    }
  }

  updateEventType(): void {
    // Update properties
    this.eventType.isActive = true;
    this.eventType.isDeleted = false;
    this.eventType.dateModified = new Date();

    this.eventService.updateEventType(this.eventType).subscribe(
      () => {
        alert('Successful update of the Event Type'),
          this.router.navigate(['/search-event-type']);
      },
      (error) => {
        alert('Could not process this request :(');
        console.error('Error updating event type', error);
      }
    );
  }
}
