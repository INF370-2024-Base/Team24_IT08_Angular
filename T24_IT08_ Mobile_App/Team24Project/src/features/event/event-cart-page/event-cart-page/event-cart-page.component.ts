import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  EventService,
  Event,
  EventBooking,
} from '../../../../services/event.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-event-cart-page',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './event-cart-page.component.html',
  styleUrl: './event-cart-page.component.scss',
})
export class EventCartPageComponent implements OnInit {
  events: Event[] = [];
  emailaddress: string = '';
  guestId: number | null = null;
  eventbookings: EventBooking[] = [];
  exchangeRate: number = 20; // Example exchange rate: 1 USD = 20 ZAR
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    this.checkLoginStatus();
    this.loadEvents();
  }

  loadEvents(): void {
    this.eventService.getEvents().subscribe((events: Event[]) => {
      this.events = events;
    });
  }

  cancelEvent(event_Booking_ID: number): void {
    this.eventService
      .deleteEvent(event_Booking_ID)
      .subscribe(() => {
        this.loadEvents(); // Refresh the event list
      });
  }

  calculateTotalPriceInUSD(): number {
    const totalPriceInRands = this.events.reduce(
      (sum, event) => sum + event.totalPrice,
      0
    );
    return totalPriceInRands / this.exchangeRate;
  }

  MakePayment(event: Event) {
    const totalPriceInUSD = event.totalPrice / this.exchangeRate;
    this.router.navigate([
      `/payment-for-event/${totalPriceInUSD}/${event.event_ID}`,
    ]);
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
