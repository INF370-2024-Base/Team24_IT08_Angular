import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  EventService,
  Event,
  EventBooking,
  EventItem, EventStatus
} from '../../../../services/event.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HallService, Hall } from '../../../../services/hall.service';
import { NgForm } from '@angular/forms';

interface UnavailableDateRange {
  start: Date;
  end: Date;
}
@Component({
  selector: 'app-update-event-details',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './update-event-details.component.html',
  styleUrl: './update-event-details.component.scss',
})
export class UpdateEventDetailsComponent implements OnInit {
 
  event: Event = {} as Event;
  halls: Hall[] = [];
  eventBookings: EventBooking[] = [];
  //eventItems: EventItem[] = [];
  eventStatuses:EventStatus[]=[];
  unavailableDates: UnavailableDateRange[] = [];

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute,
    private router: Router,
    private hallService: HallService
  ) {}

  ngOnInit(): void {
    const eventId = +this.route.snapshot.paramMap.get('event_Id')!;
    this.loadEventDetails(eventId);
    this.loadEventBookings();
    //this.loadEventItems();
    this.loadEventStatuses();
    this.loadHalls(); // Implement this function to load halls data
  }

   loadEventDetails(eventId: number): void {
    this.eventService.getEventById(eventId).subscribe((eventData) => {
      this.event = eventData;
    });
  }

  loadHalls(): void {
    this.hallService.getHalls().subscribe((halldata) => {
      this.halls = halldata;
    });
  }

  loadEventBookings(): void {
    this.eventService.getEventBookings().subscribe((bookings) => {
      this.eventBookings = bookings;
    });
  }

  // loadEventItems(): void {
  //   this.eventService.getEventItems().subscribe((items) => {
  //     this.eventItems = items;
  //   });
  // }
  loadEventStatuses(): void {
    this.eventService.getEventStatuses().subscribe((statuses) => {
      this.eventStatuses = statuses;
    });
  }

  isDateUnavailable(startTime: Date, endTime: Date): boolean {
    // Ensure startTime and endTime are valid dates
    if (!startTime || !endTime) return false;

    return this.unavailableDates.some((unavailableDateRange) => {
      const existingStartTime = unavailableDateRange.start;
      const existingEndTime = unavailableDateRange.end;

      // Check if the new event overlaps with an existing event
      const overlaps =
        (startTime >= existingStartTime && startTime <= existingEndTime) ||
        (endTime >= existingStartTime && endTime <= existingEndTime) ||
        (startTime <= existingStartTime && endTime >= existingEndTime);

      return overlaps;
    });
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
  
  onSubmit(): void {
    console.log('Update button clicked');

    // Check if required fields are filled
  if (!this.event.name || !this.event.description || !this.event.hallId) {
    alert('Please fill out all required fields.');
    return;
  }
  
    // Format startTime and endTime for datetime-local input
  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  console.log('Before formatting dates:', this.event.startTime, this.event.endTime);
    // Convert startTime and endTime to the correct format
  this.event.startTime = formatDate(new Date(this.event.startTime));
  this.event.endTime = formatDate(new Date(this.event.endTime));

  console.log('After formatting dates:', this.event.startTime, this.event.endTime);
   // Check for overlapping events
   if (this.isDateUnavailable(new Date(this.event.startTime), new Date(this.event.endTime))) {
    alert('The selected date and time overlap with another event. Please choose a different date or time.');
    return;
  }

  if (!this.event.dateCreated) {
    // Set dateCreated to the current date if it's not already set
    this.event.dateCreated = new Date().toISOString();
  }
    this.event.dateModified = this.event.dateModified;
    this.event.isActive = true;
    this.event.isDeleted = false;
    this.event.eventStatusID=this.event.eventStatusID;

    console.log('Payload to be sent:', this.event);
     // Proceed with the update logic if no overlaps are found
  this.eventService.updateEvent(this.event).subscribe(
    (response) => {
      // Show a success alert
      alert('Event updated successfully!');
      this.router.navigate(['/search-event-details'])
      // Add any other logic to handle after a successful update, like redirecting to another page
    },
    (error) => {
      console.error(error);
      // Optionally, show an alert for failure
      alert('Failed to update the event. Please try again.');
    }
  );
  }
}

