import { Component, OnInit } from '@angular/core';
import {
  BookingService,
  Booking,
} from '../../../../../services/booking.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-booking-details',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './search-booking-details.component.html',
  styleUrl: './search-booking-details.component.scss',
})
export class SearchBookingDetailsComponent implements OnInit {
  bookings: Booking[] = [];
  filteredBookings: Booking[] = [];
  searchTerm: string = '';
  exchangeRate: number = 20; // Example exchange rate: 1 USD = 20 ZAR
  currentUserRole: string = '';
  lastDeleteDateKey = 'lastDeleteDate'; // LocalStorage key for last delete date

  constructor(private bookingService: BookingService, private router: Router) {}

  ngOnInit(): void {
    this.showPopupMessage();
    this.loadBookings();
    this.setCurrentUserRole();
  }

  setCurrentUserRole(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.currentUserRole = currentUser.role || '';
    console.log('Current User Role:', this.currentUserRole);
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

  loadBookings(): void {
    this.bookingService.getBookings().subscribe(
      (bookings) => {
        this.bookings = bookings;
        this.filteredBookings = bookings;
      },
      (error) => console.error(error)
    );
  }

  updateBooking(bookingID: number, room_Items_ID: number): void {
    const route = `/update-booking-details/${bookingID}/${room_Items_ID}`;
    console.log('Navigating to:', route);
    this.router.navigate([route]).then((success) => {
      if (success) {
        console.log('Navigation successful');
      } else {
        console.error('Navigation has failed');
      }
    });
  }

  confirmDeleteBooking(booking: Booking): void {
    if (confirm('Are you sure you wish to delete this booking?')) {
      this.deleteBooking(booking);
    }
  }

  deleteBooking(booking: Booking): void {
    this.bookingService
      .deleteBooking(booking.bookingID)
      .subscribe(
        () => {
          // Filter out the deleted booking from the list
          this.filteredBookings = this.filteredBookings.filter(
            (b) => b.bookingID !== booking.bookingID
          );
          alert('Booking deleted successfully');
        },
        (error) => {
          console.error('Error deleting booking:', error);
          alert('There was an error deleting the booking. Please try again later.');
        }
      );
  }

  MakePayment(booking: Booking) {
    const totalPriceInUSD = booking.totalPrice / this.exchangeRate;
    this.router.navigate([
      `/payment-for-booking/${totalPriceInUSD}/${booking.bookingID}`,
    ]);
  }

  getDaysLeft(startTime: Date): number {
    const eventDate = new Date(startTime);
    const today = new Date();
    const diffTime = eventDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  filterBookings(): void {
    this.filteredBookings = this.bookings.filter(
      (booking) =>
        booking.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        booking.name
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase())
    );
  }

  createNewBooking(): void {
    // Navigate to the create new event page or trigger creation logic
    this.router.navigate(['/book-room']);
  }

  GenerateBookingsReport(): void {
    // Navigate to the create new event page or trigger creation logic
    this.router.navigate(['/generate-bookings-report/:emailaddress']);
  }

  confirmDeleteBookingHistory(): void {
    if (confirm('Are you sure you wish to delete all booking history?')) {
      this.deleteBookingHistory();
    }
  }

  deleteBookingHistory(): void {
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
    this.bookingService.deleteAllBookings().subscribe(
      () => {
        this.filteredBookings = [];
        alert('All booking history deleted successfully.');
        localStorage.setItem(this.lastDeleteDateKey, now.toISOString());
      },
      (error) => {
        console.error('Error deleting booking history', error);
        alert(
          'There was an error deleting the booking history. Please try again later.'
        );
      }
    );
  }
}
