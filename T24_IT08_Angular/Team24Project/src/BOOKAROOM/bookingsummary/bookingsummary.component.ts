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
      console.log('Booking Data:', this.booking); // Add this line to see what data is passed
    } else {
      // If no booking data is found, navigate back to the booking page
      this.router.navigate(['/']);
    }
  }

  calculateVAT(): void {
    if (this.booking) {
      const vatRate = 0.15;
      this.priceExclVAT = this.booking.totalPrice / (1 + vatRate);
      this.vatAmount = this.booking.totalPrice - this.priceExclVAT;
    }
  }

   // Method to navigate to the payment page
   proceedToPayment(): void {
    if (this.booking) {
      // Navigate to the payment page and pass booking ID and total price
      this.router.navigate(['/booking-payment'], {
        queryParams: {
          bookingId: this.booking.bookingID,
          amount: this.booking.totalPrice
        }
      });
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
