import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  LostAndFoundService,
  LostAndFoundItems,
  LostAndFoundStatuses,
} from '../../../services/LostAndFound.service';
import {
  StaffService,
  Staff,
  StaffRole,
} from '../../../services/staff.service';
import { BookingService, Booking } from '../../../services/booking.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-update-l-and-f-item',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './update-l-and-f-item.component.html',
  styleUrl: './update-l-and-f-item.component.scss',
})
export class UpdateLAndFItemComponent implements OnInit {
  lostAndFoundItem: LostAndFoundItems = {
    lost_And_Found_ID: 0,
    l_And_F_Status_ID: 0,
    staffId: 0,
    bookingID: 0,
    name: '',
    description: '',
    dateCreated: '',
    dateModified: '',
    isActive: true,
    isDeleted: false,
  };
  statuses: LostAndFoundStatuses[] = [];
  staffMembers: Staff[] = [];
  bookings: Booking[] = [];
  lostAndFoundId: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private lostAndFoundService: LostAndFoundService,
    private staffService: StaffService,
    private bookingService: BookingService
  ) {
    this.lostAndFoundId = +this.route.snapshot.params['lost_And_Found_ID']; //Convert to number
  }

  ngOnInit(): void {
    this.getLostAndFoundItem();
    this.getStatuses();
    this.getStaffMembers();
    this.getBookings();
  }

  getLostAndFoundItem(): void {
    this.lostAndFoundService
      .getLostAndFoundById(this.lostAndFoundId)
      .subscribe((data: LostAndFoundItems) => (this.lostAndFoundItem = data));
  }

  getStatuses(): void {
    this.lostAndFoundService
      .getLostAndFoundStatuses()
      .subscribe((data: LostAndFoundStatuses[]) => (this.statuses = data));
  }

  getStaffMembers(): void {
    this.staffService
      .getStaff()
      .subscribe((data: any[]) => (this.staffMembers = data));
  }

  getBookings(): void {
    this.bookingService
      .getBookings()
      .subscribe((data: any[]) => (this.bookings = data));
  }

  onSubmit(): void {
    if (this.lostAndFoundItem.lost_And_Found_ID === 0) {
      console.error('Lost And Found ID is required');
      return;
    }
    const updatedItem: LostAndFoundItems = {
      ...this.lostAndFoundItem,
      dateModified: new Date().toISOString(),
    };

    this.lostAndFoundService
      .updateLostAndFoundItem(
        this.lostAndFoundItem.lost_And_Found_ID,
        updatedItem
      )
      .subscribe(
        () => {
          window.alert('Lost And Found item updated successfully!');
          this.router.navigate([
            '/search-l-and-f-item',
            this.route.snapshot.params['emailaddress'],
          ]);
        },
        (error) => {
          window.alert('Error with update');
          console.error('Error response:', error);
          if (error.error && error.error.errors) {
            console.error('Validation errors:', error.error.errors);
          }
        }
      );
  }
}
