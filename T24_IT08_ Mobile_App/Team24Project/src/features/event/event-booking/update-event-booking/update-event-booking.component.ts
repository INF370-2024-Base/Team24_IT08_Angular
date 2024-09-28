import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  EventService,
  EventBooking,
  EventType,PerformanceReview
} from '../../../../services/event.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StaffService, Staff } from '../../../../services/staff.service';
import {
  GuestService,
  GuestInService,
} from '../../../../services/guest.service';
import { HallService, Hall } from '../../../../services/hall.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-update-event-booking',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './update-event-booking.component.html',
  styleUrl: './update-event-booking.component.scss',
})
export class UpdateEventBookingComponent implements OnInit {
  eventBooking: EventBooking = {
    name: '',
    description: '',
    dateCreated: new Date().toISOString(),
    dateModified: new Date().toISOString(),
    isActive: true,
    isDeleted: false,
    event_Booking_ID: 0,
    staffId: undefined,  // Optional fields initialized to undefined
    eventTypeId: 0,
    hallId: 0,
    guestId: undefined,  // Optional fields initialized to undefined
    noOfAttendees: 0,
    guestEmail: '',
    guestPhone: 0,
    performanceReviewID: undefined,  // Optional fields initialized to undefined
  };

  staffMembers: Staff[] = [];
  eventTypes: EventType[] = [];
  halls: Hall[] = [];
  guests: GuestInService[] = [];
  performanceReviews:PerformanceReview[]=[];
  currentUserRole:string|null=null;

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute,
    private router: Router,
    private staffService: StaffService,
    private hallService: HallService,
    private guestService: GuestService
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.loadEventBooking(id);
    this.fetchData();
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.currentUserRole = currentUser.role || null;

     // Fetch staff performance reviews
     this.eventService.getStaffPerformanceReviews().subscribe(
      (data: PerformanceReview[]) => {  // Ensure correct typing
        this.performanceReviews = data;
      },
      (error) => {
        console.error('Error fetching performance reviews', error);
      }
    );
  }

  loadEventBooking(id: number): void {
    this.eventService.getEventBookingById(id).subscribe(
      (data: EventBooking) => {
        this.eventBooking = data;
      },
      (error) => {
        console.error('Error fetching event booking', error);
      }
    );

  

  }

  fetchData(): void {
    this.staffService.getStaff().subscribe(
      (data) => {
        this.staffMembers = data;
      },
      (error) => {
        console.error('Error fetching staff members', error);
      }
    );

    this.eventService.getEventTypes().subscribe(
      (data) => {
        this.eventTypes = data;
      },
      (error) => {
        console.error('Error fetching event types', error);
      }
    );

    this.hallService.getHalls().subscribe(
      (data) => {
        this.halls = data;
      },
      (error) => {
        console.error('Error fetching halls', error);
      }
    );

    this.guestService.getAllGuests().subscribe(
      (data) => {
        this.guests = data;
      },
      (error) => {
        console.error('Error fetching guests', error);
      }
    );
  }
  onSubmit(): void {
    this.eventService.updateEventBooking(this.eventBooking).subscribe(
      () => {
        alert('Event Booking updated successfully');
        console.log('Event Booking updated successfully');
        this.router.navigate(['/search-event-booking']);
      },
      (error) => {
        alert('Error in creating event booking successfully');
        console.error('Error updating event booking', error);
      }
    );
  }
}
