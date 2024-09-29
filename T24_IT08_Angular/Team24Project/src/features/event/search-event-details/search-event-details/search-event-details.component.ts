import { Component, OnInit } from '@angular/core';
import { EventService, Event, EventStatus , EventBooking} from '../../../../services/event.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-event-details',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './search-event-details.component.html',
  styleUrl: './search-event-details.component.scss',
})
export class SearchEventDetailsComponent implements OnInit {
  events: Event[] = [];
  filteredEvents: Event[] = [];
  eventStatuses: EventStatus[] = [];
  eventBooking:EventBooking[]=[];
  searchTerm: string = '';
  exchangeRate: number = 20; // Example exchange rate: 1 USD = 20 ZAR
  currentUserRole: string = '';
  currentUserEmail: string = ''; // To store the current user's email
  lastDeleteDateKey = 'lastDeleteDate'; // LocalStorage key for last delete date

  constructor(private eventService: EventService, private router: Router) {}

  ngOnInit(): void {
    this.showPopupMessage();
    this.loadFilteredEventsForUser(); // Replaced loadEvents with loadFilteredEventsForUser
    this.loadEventStatuses();
    this.setCurrentUserRole();
  }

  setCurrentUserRole(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    console.log('Current User Object:', currentUser); // Log the entire user object
    this.currentUserRole = currentUser.role || '';

    this.currentUserEmail=currentUser.Email || '';
  }

  loadEventStatuses(): void {
    this.eventService.getEventStatuses().subscribe((statuses) => {
      this.eventStatuses = statuses;
      this.mapEventStatuses();
    });
  }

  mapEventStatuses(): void {
    if (this.events.length && this.eventStatuses.length) {
      this.events.forEach((event) => {
        const status = this.eventStatuses.find(
          (status) => status.eventStatusID === event.eventStatusID
        );
        event['status'] = status ? status.name : 'Unknown';
        event['isPaid'] = status ? status.eventStatusID === 2 : false;  // Assume ID 2 is "Paid"
      });
      this.filterEvents();
    }
  }

  filterEvents(): void {
    // Filter events based on the search term
    this.filteredEvents = this.events.filter(
      (event) =>
        event.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(this.searchTerm.toLowerCase())
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
  showPopupMessage(): void {
    const popup = document.getElementById('popup-message');
    if (popup) {
      popup.style.display = 'block';
      setTimeout(() => {
        popup.style.display = 'none';
      }, 5000); // Hide the popup after 5 seconds
    }
  }

  loadFilteredEventsForUser(): void {
    console.log('Current User Email:', this.currentUserEmail); // Log the current user's email
    this.eventService.getEventBookings().subscribe(
      (eventBookings: EventBooking[]) => {
        console.log('All Event Bookings:', eventBookings); // Log all event bookings
        
        // Filter event bookings by current user's email
        const userEventBookings = eventBookings.filter(
          (booking) => booking.guestEmail === this.currentUserEmail
        );

        console.log('Filtered Event Bookings for User:', userEventBookings); // Log filtered bookings

        // Now, fetch the corresponding events for the filtered bookings
        const eventIds = userEventBookings.map((booking) => booking.event_Booking_ID);
        console.log('Event IDs for User Bookings:', eventIds);
        if (eventIds.length > 0) {
          this.loadEventsByIds(eventIds);
        } else {
          console.log('No matching events found for user');
        }
      },
      (error) => {
        console.error('Error fetching event bookings:', error);
      }
    );
  }

  loadEventsByIds(eventIds: number[]): void {
    this.eventService.getEvents().subscribe(
      (events: Event[]) => {
        // Filter the events based on event_Booking_IDs found in the bookings
        this.events = events.filter((event) => eventIds.includes(event.event_ID));
        this.filteredEvents = [...this.events]; // Initialize filteredEvents
        this.mapEventStatuses(); // Apply status mapping to the filtered events
      },
      (error) => console.error(error)
    );
  }


  // loadEvents(): void {
  //   this.eventService.getEvents().subscribe(
  //     (events) => {
  //       this.events = events;
  //       // Filter events based on the logged-in user's email after loading
  //       this.filteredEvents = events.filter(event => event['guestEmail'] === this.currentUserEmail);
  //     },
  //     (error) => console.error(error)
  //   );
  // }

  updateEvent(event_Booking_ID: number): void {
    const route = `/update-event-details/${event_Booking_ID}`;
    console.log('Navigating to:', route);
    this.router.navigate([route]).then((success) => {
      if (success) {
        console.log('Navigation successful');
      } else {
        console.error('Navigation has failed');
      }
    });
  }

  confirmDeleteEvent(event: Event): void {
    if (confirm('Are you sure you wish to delete this event?')) {
      this.deleteEvent(event);
    }
  }

  deleteEvent(event: Event): void {
    this.eventService
      .deleteEvent(event.event_ID)
      .subscribe(
        () => {
          this.filteredEvents = this.filteredEvents.filter(
            (e) =>
              e.event_ID !== event.event_ID
             // e.event_Items_ID !== event.event_Items_ID
          );
          alert('Event deleted successfully');
        },
        (error) => {
          console.error('Error deleting event', error);
          alert(
            'There was an error deleting the event. Please try again later.'
          );
        }
      );
  }

  MakePayment(event: Event) {
    const totalPriceInUSD = event.totalPrice / this.exchangeRate;
    this.router.navigate([
      `/payment-for-event/${totalPriceInUSD}/${event.event_ID}`,
    ]);
    console.log('Captured event_Id:',event.event_ID );
  }

  getDaysLeft(startTime: string): number {
    const eventDate = new Date(startTime);
    const today = new Date();
    const diffTime = eventDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  createNewEvent(): void {
    // Navigate to the create new event page or trigger creation logic
    this.router.navigate(['/book-event']);
  }

  confirmDeleteEventHistory(): void {
    if (confirm('Are you sure you wish to delete all event history?')) {
      this.deleteEventHistory();
    }
  }

  deleteEventHistory(): void {
    const lastDeleteDateStr = localStorage.getItem(this.lastDeleteDateKey);
    const lastDeleteDate = lastDeleteDateStr
      ? new Date(lastDeleteDateStr)
      : null;
    const oneYearInMs = 365 * 24 * 60 * 60 * 1000;
    const now = new Date();
    const referenceDate = new Date('2024-07-19');

    // Check if it has been a year since the last deletion or the reference date
    if (
      (lastDeleteDate &&
        now.getTime() - lastDeleteDate.getTime() < oneYearInMs) ||
      (!lastDeleteDate && now.getTime() < referenceDate.getTime() + oneYearInMs)
    ) {
      alert('Event History can only be deleted once a year.');
      return;
    }

    // Proceed with deletion
    this.eventService.deleteAllEvents().subscribe(
      () => {
        this.filteredEvents = [];
        alert('All event history deleted successfully.');
        localStorage.setItem(this.lastDeleteDateKey, now.toISOString());
      },
      (error) => {
        console.error('Error deleting event history', error);
        alert(
          'There was an error deleting the event history. Please try again later.'
        );
      }
    );
  }
}
