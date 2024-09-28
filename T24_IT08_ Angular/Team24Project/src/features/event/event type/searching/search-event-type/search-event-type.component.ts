import { Component, OnInit } from '@angular/core';
import { EventService, EventType } from '../../../../../services/event.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClientModule , HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-search-event-type',
  standalone: true,
  imports: [FormsModule, CommonModule,HttpClientModule],
  templateUrl: './search-event-type.component.html',
  styleUrl: './search-event-type.component.scss',
})
export class SearchEventTypeComponent implements OnInit {
  eventTypes: EventType[] = [];
  filteredEventTypes: EventType[] = [];
  searchQuery: string = '';
  currentUserRole: string = '';

  constructor(private eventService: EventService, private router: Router) {}

  ngOnInit(): void {
    this.loadEventTypes();
    this.setCurrentUserRole();
  }

  setCurrentUserRole(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.currentUserRole = currentUser.role || '';
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

  loadEventTypes(): void {
    this.eventService.getEventTypes().subscribe(
      (data: EventType[]) => {
        this.eventTypes = data;
        this.filteredEventTypes = data;
      },
      (error) => {
        console.error('Error fetching event types', error);
      }
    );
  }

  searchEventTypes(): void {
    this.filteredEventTypes = this.eventTypes.filter(
      (eventType) =>
        eventType.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        eventType.standardRate.toString().includes(this.searchQuery)
    );
  }

  createNewEventType(): void {
    // Navigate to the create new event page or trigger creation logic
    this.router.navigate(['/create-event-type']);
  }

  updateEventType(eventTypeId: number) {
    console.log('Update Event Booking', eventTypeId);
    this.router.navigate(['/update-event-type', eventTypeId]);
  }

  deleteEventType(eventTypeId: number): void {
    if (confirm('Are you sure you want to delete this event type?')) {
      this.eventService.deleteEventType(eventTypeId).subscribe(
        () => {
          this.loadEventTypes();  // Refresh the event types list after successful deletion
        },
        (error: HttpErrorResponse) => {
          console.error('Error deleting event type', error);
          if (error.status === 409) {
            alert('Deletion unsuccessful because Event Type is being used elsewhere in the system.');
          } else {
            alert('An error occurred while deleting the event type: ' + error.message);
          }
        }
      );
    }
  }
}
