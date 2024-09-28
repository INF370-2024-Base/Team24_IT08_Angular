import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  Booking,
  BookingService,
  RoomBooking,
} from '../../../../services/booking.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RoomService, RoomItem } from '../../../../services/room.service';

@Component({
  selector: 'app-booking-cart-page',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './booking-cart-page.component.html',
  styleUrl: './booking-cart-page.component.scss',
})
export class BookingCartPageComponent implements OnInit {
  bookings: Booking[] = [];
  emailaddress: string = '';
  guestId: number | null = null;
  roombookings: RoomBooking[] = [];
  exchangeRate: number = 20; // Example exchange rate: 1 USD = 20 ZAR
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private bookingService: BookingService,
    private roomService: RoomService
  ) {}

  ngOnInit(): void {
    this.checkLoginStatus();
    this.loadBookings();
  }

  loadBookings(): void {
    this.bookingService.getBookings().subscribe((bookings: Booking[]) => {
      this.bookings = bookings;
    });
  }

  cancelBooking(bookingID: number): void {
    this.bookingService.deleteBooking(bookingID).subscribe(() => {
      this.loadBookings(); // Refresh the booking list
    });
  }

  calculateTotalPriceInUSD(): number {
    const totalPriceInRands = this.bookings.reduce(
      (sum, booking) => sum + booking.totalPrice,
      0
    );
    return totalPriceInRands / this.exchangeRate;
  }

  MakePayment(booking: Booking) {
    this.roomService
      // .getRoomItemsById(booking.room_Items_ID)
      // .subscribe((roomItem) => {
      //   console.log('Fetched Room Item:', roomItem);
      //   if (roomItem.name === 'Discount') {
      //     console.log('Discount applied before:', booking.roomTotalPrice);
      //     booking.roomTotalPrice -= 100;
      //     console.log('Discount applied after:', booking.roomTotalPrice);
      //   }
        const totalPriceInUSD = booking.totalPrice / this.exchangeRate;
        console.log('Total Price in USD:', totalPriceInUSD);
        this.router.navigate([
          `/payment-for-booking/${totalPriceInUSD}/${booking.bookingID}`,
        ]);
      ;
  }


  checkLoginStatus(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (currentUser && currentUser.emailaddress) {
      this.emailaddress = currentUser.emailaddress;
      // Check if the user has the guest role
      if (currentUser.role !== 'Guest') {
        this.router.navigate(['/login']);
      }
    } else {
      this.router.navigate(['/login']);
    }
  }
}
