import { Component, OnInit } from '@angular/core';
import { BookingService , Booking} from '../../../services/booking.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-generate-bookings-report',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './generate-bookings-report.component.html',
  styleUrl: './generate-bookings-report.component.scss'
})
export class GenerateBookingsReportComponent implements OnInit{
  bookings: Booking[] = [];
  filteredBookings: Booking[] = [];
  searchTerm: string = '';
  showPaidOnly: boolean = false;
  checkIn: string | null = null;
  checkOut: string | null = null;

  constructor(private bookingService: BookingService, private router:Router) { }

  ngOnInit(): void {
    this.fetchBookings();
  }

  fetchBookings(): void {
    this.bookingService.getBookings().subscribe(
      (bookings) => {
        this.bookings = bookings;
        this.filteredBookings = bookings;
      },
      (error) => {
        console.error('Error fetching bookings:', error);
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



  filterBookings(): void {
    this.filteredBookings = this.bookings.filter(booking => {
      const matchesSearchTerm = booking.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        booking.name.toLowerCase().includes(this.searchTerm.toLowerCase());
      //const matchesPaidStatus = !this.showPaidOnly || booking.status.toLowerCase() === 'paid';

      const bookingStartTime = new Date(booking.checkIn).getTime();
      const bookingEndTime = new Date(booking.checkOut).getTime();
      const startTimeFilter = this.checkIn ? new Date(this.checkIn).getTime() : null;
      const endTimeFilter = this.checkOut ? new Date(this.checkOut).getTime() : null;

      const matchesStartTime = !startTimeFilter || bookingStartTime >= startTimeFilter;
      const matchesEndTime = !endTimeFilter || bookingEndTime <= endTimeFilter;

      return matchesSearchTerm && matchesStartTime && matchesEndTime;
      //return matchesSearchTerm && matchesPaidStatus && matchesStartTime && matchesEndTime;
    });
  }

  downloadCSV(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const email = currentUser.emailaddress || 'Unknown User';
    const timestamp = new Date().toLocaleString();
  
    const csvData = this.convertToCSV(this.filteredBookings, email, timestamp);
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'booking-report.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
convertToCSV(bookings: Booking[], email: string, timestamp: string): string {
  // Section 1: Column headers
  const header = ['Name', 'Description', 'Date Created', 'Date Modified', 'Is Active', 'Room Total Price', 'Room Quantity', 'Start Time', 'End Time', 'Status'];

  // Section 1: Rows of booking data
  const rows = bookings.map(booking => [
      booking.name,
      // booking.description,
      // booking.dateCreated,
      // booking.dateModified,
      // booking.isActive.toString(),
      // booking.roomTotalPrice.toString(),
      // booking.roomQuantity.toString(),
      // booking.startTime,
      // booking.endTime,
      // booking.status
  ]);

  // Combine all Section 1 into a CSV format
  const csvContent = [
      header,        // Section 1: Column Headers
      ...rows        // Section 1: Booking Data Rows
  ].map(e => e.join(",")).join("\n");

  // Section 2: Add the header for the guesthouse name and download details at the bottom
  const heading = 'SUNFLOWER GUESTHOUSE';
  const downloadedBy = `Downloaded by: ${email}`;
  const downloadTime = `Downloaded at: ${timestamp}`;

  // Combine everything together with a new line separating the sections
  const footer = `\n${heading}\n${downloadedBy}\n${downloadTime}`;

  // Return the full CSV content
  return csvContent + footer;
}
}
