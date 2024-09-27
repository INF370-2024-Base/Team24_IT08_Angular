import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Booking, BookingService } from '../../services/booking.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BackButtonComponentComponent } from '../../shared/components/back-button-component/back-button-component.component';

@Component({
  selector: 'app-bookingsummary',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, BackButtonComponentComponent],
  templateUrl: './bookingsummary.component.html',
  styleUrl: './bookingsummary.component.scss'
})
export class BookingsummaryComponent implements OnInit {
  booking!: Booking;
  bookingReference: string = '';
  priceExclVAT: number = 0;
  vatAmount: number = 0;

  constructor(private route: ActivatedRoute, private router: Router, 
    private bookingService: BookingService
  ) {}

  ngOnInit(): void {
    const bookingData = this.route.snapshot.queryParamMap.get('booking');
    if (bookingData) {
      this.booking = JSON.parse(bookingData);
      this.bookingReference = this.booking.bookingReference;
      this.calculateVAT();
    } else {
      // If no booking data is found, navigate back to the booking page
      this.router.navigate(['/']);
    }
  }

  calculateVAT(): void {
    if (this.booking) {
      const vatRate = 0.15; // Assuming VAT rate is 15%
      this.priceExclVAT = this.booking.totalPrice / (1 + vatRate);
      this.vatAmount = this.booking.totalPrice - this.priceExclVAT;
    }
  }

  cancelBooking(): void {
    if (this.booking) {
      this.bookingService.cancelBooking(this.booking.bookingReference).subscribe(
        () => {
          alert('Booking canceled successfully!');
          this.router.navigate(['/home']);
        },
        (error) => {
          console.error('Error canceling booking:', error);
          alert('Failed to cancel booking. Please try again.');
        }
      );
    }
  }
  

  goHome(): void {
    this.router.navigate(['/']);
  }
}
