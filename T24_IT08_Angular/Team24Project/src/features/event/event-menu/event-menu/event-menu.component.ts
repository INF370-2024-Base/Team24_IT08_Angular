import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService, EventBookingItemDto, SelectedEventItem } from '../../../../services/event.service';
import { EventMenuService, EventMenu } from '../../../../services/event-menu.service';
import { EventMenuItemService, EventMenuItem } from '../../../../services/event-menu-item.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedEventService } from '../../../../shared/shared-event.service';

@Component({
  selector: 'app-event-menu',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './event-menu.component.html',
  styleUrls: ['./event-menu.component.scss']
})
export class EventMenuComponent implements OnInit {
  eventMenu: EventMenu | null = null;
  eventMenuItems: EventMenuItem[] = [];
  eventBookingItems: SelectedEventItem[] = [];
  eventBookingID: number = 0;
  isCatered: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private eventMenuService: EventMenuService,
    private eventMenuItemService: EventMenuItemService,
    private router: Router,
    private sharedEventService: SharedEventService
  ) {}

  ngOnInit(): void {
    this.eventBookingID = Number(this.route.snapshot.paramMap.get('id'));
    console.log('EventBookingID received:', this.eventBookingID);
    // Subscribe to shared selected items
    this.sharedEventService.selectedItems$.subscribe(items => {
      if (items.length > 0) {
        this.eventBookingItems = items;
        console.log('Received Event Booking Items:', this.eventBookingItems);
      } else {
        console.warn('No event booking items received.');
        alert('No event booking items received.');
      }
    });
    this.loadEventBooking(this.eventBookingID);
  }

  loadEventBooking(eventBookingID: number): void {
    this.eventService.getEventBookingById(eventBookingID).subscribe(
      (booking) => {
        console.log('Booking data received:', booking);
        this.loadEventMenuByEventType(booking.eventTypeId);
      },
      (error) => console.error('Error loading event booking:', error)
    );
  }

  loadEventMenuByEventType(eventTypeId: number): void {
    this.eventMenuService.getEventMenus().subscribe(
      (menus) => {
        console.log('Menus:', menus);  // Log the menus to inspect
        this.eventMenu = menus.find(menu => menu.eventTypeId === eventTypeId) || null;
        console.log('Selected Event Menu:', this.eventMenu);  // Log the selected menu to inspect
        if (this.eventMenu) {
          this.loadEventMenuItems(this.eventMenu.eventMenuID);
        }
      },
      (error) => console.error('Error loading event menu:', error)
    );
  }

  loadEventMenuItems(eventMenuID: number): void {
    this.eventMenuItemService.getEventMenuItemsByMenuId(eventMenuID).subscribe(
      (items) => {
        console.log('Menu Items:', items);
        this.eventMenuItems = items;

        // Call this method once to calculate their total price
        if (this.eventMenuItems.length > 0) {
          this.addMenuItemsToTotalPrice();
        }
      },
      (error) => console.error('Error loading event menu items:', error)
    );
  }

  addMenuItemsToTotalPrice(): void {
    const menuItemsTotal = this.eventMenuItems.reduce((sum, item) => sum + item.price, 0);
    const roundedMenuItemsTotal = parseFloat(menuItemsTotal.toFixed(2)); // Ensure rounding

    if (menuItemsTotal > 0) {
      this.sharedEventService.addToTotalPrice(roundedMenuItemsTotal);
      console.log('Menu items total added and rounded:', roundedMenuItemsTotal);
    }
  }

  goBack(): void {
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

  onSubmit(): void {
    const menuItemsTotal = this.eventMenuItems.reduce((sum, item) => sum + item.price, 0);

    // Add the menu items total to the existing total price in SharedEventService
    this.sharedEventService.addToTotalPrice(menuItemsTotal);

    // Log the final total price after adding menu items
    const finalTotalPrice = this.sharedEventService.getTotalPrice();
    console.log('Final total price including menu items:', finalTotalPrice);

    // Update the total price on the backend
    this.eventService.updateEventTotalPrice(this.eventBookingID, finalTotalPrice).subscribe(
      (response) => {
        console.log('Total price updated successfully:', response);

        // Proceed with adding the event booking items
        const payload = {
          eventBookingID: this.eventBookingID,
          eventBookingItems: this.eventBookingItems.map(item => ({
            event_Items_ID: item.event_Items_ID,
            quantity: item.quantity,
            pricePerItem: item.price,
            name: item.name,
            description: '',
            dateCreated: new Date().toISOString(),
            dateModified: new Date().toISOString(),
            isActive: true,
            isDeleted: false,
          })),
          totalPrice: finalTotalPrice,  // Include the final total price in the payload
        };

        this.eventService.addEventBookingItems(payload).subscribe(
          (response) => {
            console.log('Event booking items added:', response);
            this.updateEventTypeCateringStatus(true); // Update the event type to set IsCatered to true

            // Navigate to the event details page
            this.router.navigate(['/search-event-details']);
          },
          (error) => console.error('Error adding event booking items:', error)
        );
      },
      (error) => console.error('Error updating total price:', error)
    );
  }

  updateEventTypeCateringStatus(isCatered: boolean): void {
    if (this.eventMenu) {
      this.eventService.updateEventTypeCateringStatus(this.eventMenu.eventTypeId, isCatered).subscribe(
        () => {
          this.router.navigate(['/search-event-details', this.eventBookingID]);
        },
        (error) => console.error('Error updating event type catering status:', error)
      );
    }
  }
}
