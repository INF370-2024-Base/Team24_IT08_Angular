import { Component, OnInit } from '@angular/core';
import {
  EventService,
  Event,
  EventBooking,
  EventItem,
  EventType,
  SelectedEventItem,
} from '../../../../services/event.service';
import { HallService, Hall } from '../../../../services/hall.service';
import { StaffService, Staff } from '../../../../services/staff.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from '../calendar/calendar.component';
import { GuestService,GuestInService } from '../../../../services/guest.service';
import { SharedEventService } from '../../../../shared/shared-event.service';
import { MatDialog } from '@angular/material/dialog';
import { DiscountAlertDialogComponent } from './discount-alert-dialog/discount-alert-dialog.component';
import { VATAlertDialogComponent } from './vatalert-dialog/vatalert-dialog.component';


// Define the extended interface
interface SelectableEventItem extends EventItem {
  selected: boolean;
  quantity: number;
}

interface UnavailableDateRange {
  start: Date;
  end: Date;
}

@Component({
  selector: 'app-book-event',
  standalone: true,
  imports: [FormsModule, CommonModule, CalendarComponent],
  templateUrl: './book-event.component.html',
  styleUrl: './book-event.component.scss',
})
export class BookEventComponent implements OnInit {
  event: Event = {} as Event;
  eventBookings: EventBooking[] = [];
 // eventItems: EventItem[] = [];
 eventItems: SelectableEventItem[] = [];
  halls: Hall[] = []; // Replace with actual Hall type if available
  eventTypes: EventType[] = [];
  staffMembers:Staff[]=[];
  unavailableDates: UnavailableDateRange[] = [];
  flattenedUnavailableDates: Date[] = []; // Flattened dates for the calendar
  guests: GuestInService[] = [];
  showCalendar: boolean = false;
  totalPrice: number = 0;
  selectedeventItems: SelectedEventItem[] = []; // Use SelectedEventItem here
  currentUserRole: string | null = null;
  //navailableDates: UnavailableDateRange[] = [];
  guestEmail: string = '';
  guestId: number | null = null;
  priceExcludingVAT: number = 0;
  //vatAmount: number = 0;
  discountPercentage: number = 0;
  vatRate: number = 0.15; // Default VAT, will be updated by backend config


   // Define the minDateTime property
   minDateTime: string = '';


  constructor(
    private eventService: EventService,
    private router: Router,
    private hallService: HallService,
    private guestService:GuestService,
    private staffService:StaffService,
    private sharedEventService:SharedEventService,
    private dialog:MatDialog
  ) {}

  ngOnInit(): void {
    this.loadConfiguration(); 
    this.loadEventBookings();
    this.loadEventItems();
    this.loadHalls();
    this.loadEventTypes();
    this.loadGuests();
    this.loadStaffMembers();
    this.getCurrentUserRole();

  //    // Fetch the discount
  // this.eventService.getCurrentDiscount().subscribe(
  //   (discount) => {
  //     this.discountPercentage = discount; // Store the discount percentage
  //   },
  //   (error) => console.error('Error fetching discount:', error)
  // );
   // Assuming event.startTime and event.endTime are in UTC format
   this.event.startTime = this.formatToLocalDatetime(this.event.startTime);
   this.event.endTime = this.formatToLocalDatetime(this.event.endTime);



    // Set the minimum date and time to the current date and time
    this.setMinDateTime();

    this.sharedEventService.totalPrice$.subscribe((price) => {
      this.totalPrice = price;
    });
  }

  loadConfiguration(): void {
    // Fetch discount and VAT from the backend
    this.eventService.getConfiguration().subscribe((config) => {
      this.discountPercentage = config.eventDiscount; // Event discount from backend
      this.vatRate = config.vatRate; // VAT rate from backend
    });
  }

  public onAttendeesChange(attendees: number): void {
    console.log('Number of attendees:', attendees);
    this.sharedEventService.setNoOfAttendees(attendees);
  }

  setMinDateTime(): void {
    const now = new Date();
    const year = now.getFullYear();
    const month = ('0' + (now.getMonth() + 1)).slice(-2);
    const day = ('0' + now.getDate()).slice(-2);
    const hours = ('0' + now.getHours()).slice(-2);
    const minutes = ('0' + now.getMinutes()).slice(-2);
    this.minDateTime = `${year}-${month}-${day}T${hours}:${minutes}`;
  }
  // Utility function to convert UTC string to "yyyy-MM-ddThh:mm"
  formatToLocalDatetime(datetimeStr: string): string {
    const date = new Date(datetimeStr);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    
    // Return the local date in "yyyy-MM-ddThh:mm" format
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  getCurrentUserRole(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (currentUser && currentUser.role) {
      this.currentUserRole = currentUser.role;

      if (this.currentUserRole === 'Guest') {
        this.guestEmail = currentUser.Email;
        this.setGuestId(this.guestEmail);
      }
    }
  }

  setGuestId(email: string): void {
    this.guestService.getAllGuests().subscribe(
      (guests) => {
        const guest = guests.find(g => g.guest_Email === email);
        if (guest) {
          this.guestId = guest.guestId;
          this.event['guestId'] = this.guestId;
          this.loadGuestRewards(this.guestId);
        } else {
          this.guestEmail = '';
          this.guestId = null;
        }
      },
      (error) => console.error(error)
    );
  }
  loadEventBookings(): void {
    this.eventService.getEventBookings().subscribe(
      (eventBookings) => (this.eventBookings = eventBookings),
      (error) => console.error(error)
    );
  }

  loadEventItems(): void {
    this.eventService.getEventItems().subscribe(
      (eventItems) => {
        this.eventItems = eventItems.map(item => ({
          ...item,
          quantity: 1,
          selected: false
        }));
        console.log(eventItems)
      },
      (error) => console.error(error)
    );
  }

  updateTotalPrice(): void {
    // Calculate the total price for selected event items and event type
  const selectedEventType = this.eventTypes.find(
    (type) => type.eventTypeId === Number(this.event['eventTypeId'])
  );

  const itemsTotal = this.eventItems
    .filter((item) => item.selected)
    .reduce((sum, item) => sum + item.quantity * item.price, 0);

    let calculatedPrice = itemsTotal;
    if (selectedEventType) {
      calculatedPrice += selectedEventType.standardRate;
    }

 // Apply noOfAttendees multiplier
   const noOfAttendees = Number(this.event['noOfAttendees']);
   if (!isNaN(noOfAttendees) && noOfAttendees > 0) {
     calculatedPrice *= noOfAttendees;
   }
 // let discountApplied = false;

  // // Apply a discount of 10% if the total price exceeds 10000
  // if (calculatedPrice > 10000) {
  //   this.dialog.open(DiscountAlertDialogComponent);
  //   //calculatedPrice = calculatedPrice * (1 - 0.1);
  //   //discountApplied = true;
  // }

  // Ensure totalPrice is never negative
  if (calculatedPrice < 0) {
    calculatedPrice = 0;
  }

  // Check if calculated price exceeds R10,000 before applying the discount
  if (calculatedPrice > 10000) {
    const discountAmount = calculatedPrice * this.discountPercentage;
    calculatedPrice -= discountAmount; // Apply the discount
  }


    // Calculate VAT based on total price excluding VAT
    const priceExcludingVAT = calculatedPrice;
    const vatAmount = priceExcludingVAT * this.vatRate;
    this.totalPrice = priceExcludingVAT + vatAmount;
   // Set the total price with VAT to the shared service
   this.sharedEventService.setTotalPrice(this.totalPrice);
 
   console.log('Updated total price with VAT:', this.totalPrice);
  }
  loadHalls(): void {
    // Load halls using the appropriate service
    this.hallService.getHalls().subscribe(
      (halls) => (this.halls = halls),
      (error) => console.error(error)
    );
  }

  loadEventTypes(): void {
    this.eventService.getEventTypes().subscribe(
      (eventTypes) => (this.eventTypes = eventTypes),
      (error) => console.error(error)
    );
  }

  loadGuests(): void {
    this.guestService. getAllGuests().subscribe(
      (guests) => (this.guests = guests),
      (error) => console.error(error)
    );
  }

  // Load available staff members
  loadStaffMembers(): void {
    this.staffService.getStaff().subscribe(
      (staffMembers) => {
        this.staffMembers = staffMembers;
      },
      (error) => console.error('Error fetching staff members:', error)
    );
  }
  searchAvailability(): void {
    this.eventService.getEvents().subscribe(
      (events) => {
        // Map events to UnavailableDateRange[]
        const unavailableRanges: UnavailableDateRange[] = events.map((event) => ({
          start: new Date(event.startTime),
          end: new Date(event.endTime),
        }));
  
        // Store the unavailable ranges
        this.unavailableDates = unavailableRanges;
  
        // Flatten UnavailableDateRange[] into Date[] for calendar display
        this.flattenedUnavailableDates = unavailableRanges.reduce((dates: Date[], range: UnavailableDateRange) => {
          const currentDate = new Date(range.start);
          while (currentDate <= range.end) {
            dates.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
          }
          return dates;
        }, []);
  
        this.showCalendar = true;
  
        // Hide calendar after 5 minutes (300000 ms)
        setTimeout(() => {
          this.showCalendar = false;
        }, 300000);
      },
      (error) => console.error(error)
    );
  }

  isDateUnavailable(startTime: Date, endTime: Date): boolean {
    // Ensure startTime and endTime are valid dates
    if (!startTime || !endTime) return false;
  
    return this.unavailableDates.some((unavailableDateRange) => {
      const existingStartTime = unavailableDateRange.start;
      const existingEndTime = unavailableDateRange.end;
  

        // Check for exact match
    const exactMatch = (startTime.getTime() === existingStartTime.getTime() && endTime.getTime() === existingEndTime.getTime());


      // Check if the new event overlaps with an existing event
    const overlaps =
      (startTime < existingEndTime && endTime > existingStartTime) || // Overlaps within the range
      exactMatch; // Exact match

    return overlaps;
    });
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

  loadGuestRewards(guestId: number): void {
    this.eventService.getGuestRewards(guestId).subscribe(
      (rewards) => {
        this.applyRewards(rewards);
      },
      (error) => console.error(error)
    );
  }

  applyRewards(rewards: any[]): void {
    rewards.forEach((reward) => {
      if (reward.rewardType === 'Discount') {
        this.totalPrice -= this.totalPrice * reward.discountAmount;
      }
      // Handle other reward types if necessary
    });
  
    // Ensure totalPrice is never negative
    if (this.totalPrice < 0) {
      this.totalPrice = 0;
    }
  }


  onSubmit(): void {
    // Ensure the eventTypeId and hallId are numbers
    this.event['eventTypeId'] = Number(this.event['eventTypeId']);
    this.event.hallId = Number(this.event.hallId);
    this.event.totalPrice = parseFloat(this.sharedEventService.getTotalPrice().toFixed(2)); // Round to 2 decimal places
 
    // Get the latest total price from SharedEventService
    this.event.totalPrice = this.sharedEventService.getTotalPrice();
 
    // Convert startTime and endTime to the correct format
    this.event.startTime = new Date(this.event.startTime).toISOString();
    this.event.endTime = new Date(this.event.endTime).toISOString();
 
    // Ensure all nullable fields are set to null if they are not provided
    this.event['staffId'] = this.event['staffId'] || null;
    this.event['guestId'] = this.event['guestId'] || null;
    this.event['performanceReviewID'] = this.event['performanceReviewID'] || null;
 
    // Collect selected items
    const selectedItems: SelectedEventItem[] = this.eventItems
      .filter(item => item.selected)
      .map(item => ({
        event_Items_ID: item.event_Items_ID,
        quantity: item.quantity,
        price: item.price,
        name: item.name,
        selected: item.selected
      }));
 
    // Ensure that at least one item is selected
    if (selectedItems.length === 0) {
      alert('Please select at least one item for the event.');
      return;
    }
 
    // Check for overlapping events
    console.log('Checking if date is available for the event...');
    if (this.isDateUnavailable(new Date(this.event.startTime), new Date(this.event.endTime))) {
      alert(
        'The selected date and time overlap with another event. Please choose a different date or time.'
      );
      return;
    }
 
    // Set the creation date if not already set
    if (!this.event.dateCreated) {
      this.event.dateCreated = new Date().toISOString();
    }
 
    // Set event status and flags
    this.event.isActive = true;
    this.event.isDeleted = false;
    this.event['eventStatusID'] = 1; // Set the eventStatusID to 1
 
    // Check the guest email and associate guestId if found
    const guest = this.guests.find(g => g.guest_Email === this.event['guestEmail']);
    if (guest) {
      this.event['guestId'] = guest.guestId;
    }
 
    // Update the hall's availability and book the event
    if (this.event.hallId) {
     this.hallService.updateAvailability(this.event.hallId, false).subscribe(
       (response) => {
         console.log('Hall marked as unavailable:', response);
 
         // Prepare the payload for the API request
         const payload = {
           name: this.event.name,
           description: this.event.description,
           dateCreated: this.event.dateCreated,
           isActive: this.event.isActive,
           isDeleted: this.event.isDeleted,
           eventTypeId: this.event['eventTypeId'],
           hallId: this.event.hallId,
           noOfAttendees: this.event['noOfAttendees'],
           guestEmail: this.event['guestEmail'],
           guestPhone: this.event['guestPhone'],
           totalPrice: this.event.totalPrice, // Rounded total price
           startTime: this.event.startTime,
           endTime: this.event.endTime,
           eventStatusID: this.event.eventStatusID,
           staffId: this.event['staffId'] || null,  // Include staffId in the payload if applicable
           guestId: this.event['guestId'] || null,  // Include guestId if available
         };
 
         // Log the payload before sending
         console.log('Payload to be sent:', payload);
 
         // Create event booking and handle the response
         this.eventService.createEventBookingAndEvent(payload).subscribe(
           (response: any) => {
             alert('Event booked successfully :)');
 
             console.log('Event booked successfully:', response);
             console.log('Selected Items to be Set:', selectedItems); // Log selected items before setting
             this.sharedEventService.setSelectedItems(selectedItems);
             this.sharedEventService.setSelectedMenuItems([]);
             console.log('Navigating to event menu...');
             console.log('Final total price before submission:', this.sharedEventService.getTotalPrice());
 
             setTimeout(() => {
               console.log('Event booked successfully:', response);
               console.log('Navigating to event menu with eventID:', response.eventBookingID);
               this.router.navigate(['/event-menu', response.eventBookingID]); // Pass the eventBookingID
             }, 100); // small delay to ensure data is set
           },
           (error) => {
             alert('Event booking failed. Please try again.');
             console.error('Error booking event:', error);
 
             // Handle error and fallback logic as needed
           }
         );
       },
       (error) => {
         alert('Failed to update hall availability. Please try again.');
         console.error('Error updating hall availability:', error);
       }
     );
   }
  }
}