import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {
  LostAndFoundService,
  LostAndFoundItems,
  LostAndFoundStatuses,
} from '../../../../services/LostAndFound.service';
import {
  StaffService,
  Staff,
  StaffRole,
} from '../../../../services/staff.service';
import {
  RoomService,
  Room,
  RoomTypes,
} from '../../../../services/room.service';
import { BookingService, Booking } from '../../../../services/booking.service';
import { SuccessDialogComponent } from '../../components/success-dialog/success-dialog/success-dialog.component';
import { response } from 'express';

@Component({
  selector: 'app-create-l-and-f-item',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './create-l-and-f-item.component.html',
  styleUrl: './create-l-and-f-item.component.scss',
})
export class CreateLAndFItemComponent implements OnInit {
  lostAndFound: LostAndFoundItems = {
    name: '',
    description: '',
    bookingID: 0,
    staffId: 0,
    l_And_F_Status_ID: 0,
    dateModified: new Date().toISOString(),
    isActive: true,
    isDeleted: false,
    lost_And_Found_ID: 0,
    dateCreated: new Date().toISOString(),
  };
  bookings: Booking[] = [];
  staffMembers: Staff[] = [];
  statuses: LostAndFoundStatuses[] = [];

  constructor(
    private fb: FormBuilder,
    private lostAndFoundService: LostAndFoundService,
    private staffService: StaffService,
    private bookingService: BookingService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadBookings();
    this.loadStaffMembers();
    this.loadStatuses();
  }

  loadBookings(): void {
    this.bookingService.getBookings().subscribe(
      (data: Booking[]) => (this.bookings = data),
      (error) => console.error(error)
    );
  }

  loadStaffMembers(): void {
    this.staffService.getStaff().subscribe(
      (data: Staff[]) => (this.staffMembers = data),
      (error) => console.error(error)
    );
  }

  loadStatuses(): void {
    this.lostAndFoundService.getLostAndFoundStatuses().subscribe(
      (data: LostAndFoundStatuses[]) => (this.statuses = data),
      (error) => console.error(error)
    );
  }

  onSubmit(): void {
    this.lostAndFound.dateModified = new Date().toISOString();
    this.lostAndFound.dateCreated = new Date().toISOString();
    this.lostAndFoundService
      .createLostAndFoundItem(this.lostAndFound)
      .subscribe(
        (response) => {
          this.dialog
            .open(SuccessDialogComponent, {
              data: {
                message:
                  'The Lost And Found item has been added successfully! :)',
              },
            })
            .afterClosed()
            .subscribe(() => {
              this.router.navigate([
                '/search-and-f-item',
                'your-email-address',
              ]);
            });
        },
        (error) => {
          console.error('Error creating item', error);
        }
      );
  }
}
