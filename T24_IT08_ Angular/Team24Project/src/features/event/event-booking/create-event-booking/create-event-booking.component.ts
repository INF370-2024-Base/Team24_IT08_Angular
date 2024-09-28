import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  EventService,
  EventBooking,
  EventType, PerformanceReview
} from '../../../../services/event.service';
import { StaffService, Staff } from '../../../../services/staff.service';
import { HallService, Hall } from '../../../../services/hall.service';
import {
  GuestService,
  GuestInService,
} from '../../../../services/guest.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-event-booking',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './create-event-booking.component.html',
  styleUrl: './create-event-booking.component.scss',
})
export class CreateEventBookingComponent implements OnInit {
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
  currentUserRole: string | null = null;
  //performanceReviews: PerformanceReview[] = [];

  constructor(
    private eventService: EventService,
    private staffService: StaffService,
    private hallService: HallService,
    private guestService: GuestService,
    private router: Router
  ) {}

  ngOnInit() {
    this.fetchData();
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.currentUserRole = currentUser.role || null;

    // Fetch staff performance reviews
    this.eventService.getStaffPerformanceReviews().subscribe(
      (data) => {
        this.performanceReviews = data;
      },
      (error) => {
        console.error('Error fetching performance reviews', error);
      }
    );
  }

  fetchData() {
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

  onSubmit() {
    this.eventService.createEventBooking(this.eventBooking).subscribe(
      (response) => {
        alert('Event booking created successfully');
        console.log('Event booking created successfully', response);
        this.router.navigate(['/search-event-booking']);
        // Navigate to the appropriate page or show a success message
      },
      (error) => {
        alert('Error creating event booking');
        console.error('Error creating event booking', error);
        // Handle the error, show an error message
      }
    );
  }
}
