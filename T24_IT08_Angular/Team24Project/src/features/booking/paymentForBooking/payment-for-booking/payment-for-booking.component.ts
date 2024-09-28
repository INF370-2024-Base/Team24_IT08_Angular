/* import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EventPaymentService } from '../../../../services/event.payment.service';
import {
  BookingService,
  Booking,
  RoomBooking,
} from '../../../../services/booking.service';
import {
  RoomService,
  Room,
  RoomTypes,
} from '../../../../services/room.service';

@Component({
  selector: 'app-payment-for-booking',
  standalone: true,
  imports: [],
  templateUrl: './payment-for-booking.component.html',
  styleUrl: './payment-for-booking.component.scss',
})
export class PaymentForBookingComponent {
  amount: number = 0;
  roomBookingId: number = 0; // Add this to store the room booking ID
  roomItemsId: number = 0; // Add this to store the room items ID
  @ViewChild('paymentRef', { static: true }) paymentRef!: ElementRef;

  constructor(
    private router: Router,
    private payment: EventPaymentService,
    private route: ActivatedRoute,
    private bookingService: BookingService,
    private roomService: RoomService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.amount = +params['amount'];
      this.roomBookingId = +params['roomBookingId']; // Get room booking ID from route params
      this.roomItemsId = +params['roomItemsId']; // Get room items ID from route params
    });
    window.paypal
      .Buttons({
        style: {
          layout: 'horizontal',
          color: 'blue',
          shape: 'rect',
          label: 'paypal',
        },
        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: this.amount.toString(),
                  currency_code: 'USD',
                },
              },
            ],
          });
        },
        onApprove: (data: any, actions: any) => {
          return actions.order.capture().then((details: any) => {
            if (details.status === 'COMPLETED') {
              this.payment.transactionID = details.id;
              // this.router.navigate(['/confirm']);
              this.updateBookingStatusToPaid();
            }
          });
        },
        onError: (error: any) => {
          console.log(error);
        },
      })
      .render(this.paymentRef.nativeElement);
  }

  cancel() {
    this.router.navigate(['/booking-cart-page']);
  }

  updateBookingStatusToPaid() {
    this.bookingService
      .updateBookingStatusToPaid(this.roomBookingId, this.roomItemsId)
      .subscribe(
        () => {
          this.router.navigate(['/confirm']);
        },
        (error) => {
          console.error('Error updating booking status to paid', error);
        }
      );
  }
}
 */