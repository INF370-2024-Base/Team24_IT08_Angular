import { Component, OnInit } from '@angular/core';
import { EventService, EventBooking ,EventType} from '../../../../services/event.service';
import { HallService, Hall } from '../../../../services/hall.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { StaffService,Staff } from '../../../../services/staff.service';
import { GuestService,GuestInService } from '../../../../services/guest.service';

@Component({
  selector: 'app-search-event-booking',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './search-event-booking.component.html',
  styleUrl: './search-event-booking.component.scss',
})
export class SearchEventBookingComponent implements OnInit {
  eventBookings: EventBooking[] = [];
  filteredEventBookings: EventBooking[] = [];
  searchTerm: string = '';
  halls: Hall[] = [];
  staffMembers: Staff[] = [];
  eventTypes: EventType[] = [];
  guests: GuestInService[] = [];

  constructor(private eventService: EventService, private router: Router,private hallService:HallService, private staffService:StaffService, private guestService:GuestService) {}

  ngOnInit(): void {
    this.loadEventBookings();
    this.loadHalls();
    this.loadStaff();
    this.loadEventTypes();
    this.loadGuests();
  }

  loadHalls(): void {
    this.hallService.getHalls().subscribe(
      (data: Hall[]) => {
        this.halls = data;
      },
      (error) => {
        console.error('Error fetching halls', error);
      }
    );
  }

  loadStaff(): void {
    this.staffService.getStaff().subscribe(
      (data: Staff[]) => {
        this.staffMembers = data;
      },
      (error) => {
        console.error('Error fetching staff members', error);
      }
    );
  }

  loadEventTypes(): void {
    this.eventService.getEventTypes().subscribe(
      (data: EventType[]) => {
        this.eventTypes = data;
      },
      (error) => {
        console.error('Error fetching event types', error);
      }
    );
  }

  loadGuests(): void {
    this.guestService.getAllGuests().subscribe(
      (data: GuestInService[]) => {
        this.guests = data;
      },
      (error) => {
        console.error('Error fetching guests', error);
      }
    );
  }
  loadEventBookings(): void {
    this.eventService.getEventBookings().subscribe(
      (data: EventBooking[]) => {
        this.eventBookings = data;
        this.filteredEventBookings = data;
      },
      (error) => {
        alert('Error fetching event bookings');
        console.error('Error fetching event bookings', error);
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

  filterEventBookings(): void {
    const searchTermLower = this.searchTerm.toLowerCase();
    this.filteredEventBookings = this.eventBookings.filter(
      (booking) =>
        booking.name.toLowerCase().includes(searchTermLower) ||
        booking.description.toLowerCase().includes(searchTermLower)
    );
  }
  updateEventBooking(event_Booking_ID: number) {
    console.log('Update Event Booking', event_Booking_ID);
    this.router.navigate(['/update-event-booking', event_Booking_ID]);
  }
  GoToCreateEventBookingPage() {
    this.router.navigate(['/create-event-booking']);
  }

  deleteEventBooking(event_Booking_ID: number): void {
    if (confirm('Are you sure you want to delete this event booking?')) {
      this.eventService.deleteEventBooking(event_Booking_ID).subscribe(
        () => {
          this.eventBookings = this.eventBookings.filter(
            (eventBooking) => eventBooking.event_Booking_ID !== event_Booking_ID
          );
          this.filteredEventBookings = this.filteredEventBookings.filter(
            (eventBooking) => eventBooking.event_Booking_ID !== event_Booking_ID
          );
          alert('Event Booking deleted successfully');
          console.log('Event Booking deleted successfully');
        },
        (error: any) => {
          alert('Error deleting event booking');
          console.error('Error deleting event booking', error);
        }
      );
    }
  }
   // Helper methods to get names from IDs
   getStaffName(staffId: number): string {
    const staff = this.staffMembers.find(member => member['id'] === staffId);
    return staff?.name ?? 'Unknown';
  }

  getEventTypeName(eventTypeId: number): string {
    const eventType = this.eventTypes.find(type => type.eventTypeId === eventTypeId);
    return eventType ? eventType.name : 'Unknown';
  }

  getHallName(hallId: number): string {
    const hall = this.halls.find(hall => hall.hallID === hallId);
    return hall ? hall.name : 'Unknown';
  }

  getGuestName(guestId: number): string {
    const guest = this.guests.find(guest => guest.guestId === guestId);
    return guest?.name ?? 'Unknown';
  }
}
