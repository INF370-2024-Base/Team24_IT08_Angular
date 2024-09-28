import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { map } from 'rxjs';

export interface EventBooking {
  name: string;
  description: string;
  dateCreated: string;
  dateModified: string;
  isActive: boolean;
  isDeleted: boolean;
  event_Booking_ID: number;
  staffId?: number;
  eventTypeId: number;
  hallId: number;
  guestId?: number;
  noOfAttendees: number;
  guestEmail:string;
  guestPhone:number;
  performanceReviewID?:number;
}

export interface EventBookingItemDto {
  Event_Items_ID: number;
  Quantity: number;
  PricePerItem: number;
}

export interface EventBookingDto {
  name: string;
  description: string;
  dateCreated: string;
  dateModified: string;
  isActive: boolean;
  isDeleted: boolean;
  event_Booking_ID: number;
  staffId?: number;
  eventTypeId: number;
  hallId: number;
  guestId?: number;
  noOfAttendees: number;
  guestEmail: string;
  guestPhone: string;
  totalPrice: number;
  startTime: string;
  endTime: string;
  eventStatusID: number;
  performanceReviewID?: number;
  eventBookingItems: EventBookingItemDto[];
}

export interface EventItem {
  name: string;
  description: string;
  dateCreated: Date;
  dateModified: Date;
  isActive: boolean;
  isDeleted: boolean;
  event_Items_ID: number;
  price: number;
  eventTypeId:number;
}

export interface EventType {
  name: string;
  description: string;
  dateCreated: Date;
  dateModified: Date;
  isActive: boolean;
  isDeleted: boolean;
  eventTypeId: number;
  isCatered: boolean;
  standardRate: number;
}
export interface EventCategory{
  eventCategoryID:number;
  name:string;
  description: string;
  dateCreated: Date;
  dateModified: Date;
  isActive: boolean;
  isDeleted: boolean;
}

export interface EventBookingItem{
  name: string;
  description: string;
  dateCreated: Date;
  dateModified: Date;
  isActive: boolean;
  isDeleted: boolean;
  eventBookingItemID:number;
  event_Booking_ID:number;
  event_Items_ID:number;
  quantity: number;
  pricePerItem:number;
  totalPrice:number;
}
export interface SelectableEventItem extends EventItem {
  selected: boolean;
  quantity: number;
}

export interface SelectedEventItem {
  event_Items_ID: number;
  name: string;
  price: number;
  quantity: number; // This will be managed separately
  selected: boolean; // This will be managed separately
}


export interface Event {
  name: string;
  description: string;
  dateCreated: string;
  dateModified: string;
  isActive: boolean;
  isDeleted: boolean;
  event_ID: number;
  totalPrice: number;
  startTime: string;
  endTime: string;
  hallId: number;
  eventStatusID:number;
  [key: string]: any;
}

export interface EventStatus{
  name: string;
  description: string;
  dateCreated: string;
  dateModified: string;
  isActive: boolean;
  isDeleted: boolean;
  eventStatusID:number;
}

export interface PerformanceReview {
  performanceReviewID: number;
  name: string;
  description: string;
  dateCreated: Date;
  dateModified: Date;
  isActive: boolean;
  isDeleted: boolean;
}

export interface Refund {
  refundID: number;
  refundAmount: number;
  refundDate: string; // ISO 8601 date string
  reason: string;
  event_Booking_ID?: number; // Nullable
  bookingID?: number; // Nullable
  isApproved: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private apiUrl = 'https://localhost:7102/api'; // Replace with your actual API URL

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  //EVENT ITEMS
  getEventItems(): Observable<EventItem[]> {
    return this.http.get<EventItem[]>(`${this.apiUrl}/Event/GetAllEventItems`);
  }
  getEventItemsById(event_Items_ID: number): Observable<EventItem> {
    return this.http.get<EventItem>(
      `${this.apiUrl}/Event/GetEventItemById/${event_Items_ID}`
    );
  }

  createEventItem(eventItem: EventItem): Observable<EventItem> {
    return this.http.post<EventItem>(
      `${this.apiUrl}/Event/AddEventItem`,
      eventItem,
      this.httpOptions
    );
  }

  updateEventItem(eventItem: EventItem): Observable<void> {
    return this.http.put<void>(
      `${this.apiUrl}/Event/UpdateEventItem/${eventItem.event_Items_ID}`,
      eventItem,
      this.httpOptions
    );
  }

  deleteEventItem(event_Items_ID: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/Event/DeleteEventItem?id=${event_Items_ID}`
    );
  }


  //EVENT TYPES
  getEventTypes(): Observable<EventType[]> {
    return this.http.get<EventType[]>(`${this.apiUrl}/Event/GetAllEventTypes`);
  }
  getEventTypesById(eventTypeId: number): Observable<EventType> {
    return this.http.get<EventType>(
      `${this.apiUrl}/Event/GetEventTypeById/${eventTypeId}`
    );
  }

  createEventType(eventType: EventType): Observable<EventType> {
    return this.http.post<EventType>(
      `${this.apiUrl}/Event/AddEventType`,
      eventType,
      this.httpOptions
    );
  }

  updateEventType(eventType: EventType): Observable<void> {
    return this.http.put<void>(
      `${this.apiUrl}/Event/UpdateEventType/${eventType.eventTypeId}`,
      eventType,
      this.httpOptions
    );
  }

  deleteEventType(eventTypeId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/Event/DeleteEventType?id=${eventTypeId}`
    );
  }

  //EVENT CATEGORIES
  getEventCategories(): Observable<EventCategory[]> {
    return this.http.get<EventCategory[]>(`${this.apiUrl}/Event/GetAllEventCategories`);
  }
  getEventCategoryById(eventCategoryID: number): Observable<EventCategory> {
    return this.http.get<EventCategory>(
      `${this.apiUrl}/Event/GetEventCategoryById/${eventCategoryID}`
    );
  }

  createEventCategory(eventCategory: EventCategory): Observable<EventCategory> {
    return this.http.post<EventCategory>(
      `${this.apiUrl}/Event/AddEventCategory`,
      eventCategory,
      this.httpOptions
    );
  }

  updateEventCategory(eventCategory: EventCategory): Observable<void> {
    return this.http.put<void>(
      `${this.apiUrl}/Event/UpdateEventCategory/${eventCategory.eventCategoryID}`,
      eventCategory,
      this.httpOptions
    );
  }

  deleteEventCategory(eventCategoryID: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/Event/DeleteEventCategory?id=${eventCategoryID}`
    );
  }

  //EVENT BOOKINGS
  getEventBookings(): Observable<EventBooking[]> {
    return this.http.get<EventBooking[]>(
      `${this.apiUrl}/Event/GetAllEventBookings`
    );
  }
  getEventBookingById(event_Booking_ID: number): Observable<EventBooking> {
    return this.http.get<EventBooking>(
      `${this.apiUrl}/Event/GetEventBookingById/${event_Booking_ID}`
    );
  }

  createEventBooking(eventbooking: EventBooking): Observable<EventBooking> {
    return this.http.post<EventBooking>(
      `${this.apiUrl}/Event/AddEventBooking`,
      eventbooking,
      this.httpOptions
    );
  }

  updateEventBooking(eventBooking: EventBooking): Observable<void> {
    return this.http.put<void>(
      `${this.apiUrl}/Event/UpdateEventBooking/${eventBooking.event_Booking_ID}`,
      eventBooking,
      this.httpOptions
    );
  }

  deleteEventBooking(event_Booking_ID: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/Event/DeleteEventBooking?id=${event_Booking_ID}`
    );
  }

  //EVENTS
  
  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.apiUrl}/Event/GetAllEvents`);
  }
  getEventById(
    event_ID: number,
   // event_Items_ID: number
  ): Observable<Event> {
    return this.http.get<Event>(
      `${this.apiUrl}/Event/GetEventById/${event_ID}`
    );
  }

  createEvent(event: Event): Observable<Event> {
    return this.http.post<Event>(
      `${this.apiUrl}/Event/AddEvent`,
      event,
      this.httpOptions
    );
  }

  updateEvent(event: Event): Observable<void> {
    return this.http.put<void>(
      `${this.apiUrl}/Event/UpdateEvent/${event.event_ID}`,
      event,
      this.httpOptions
    );
  }

  deleteEvent(
    event_ID: number,
    //event_Items_ID: number
  ): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/Event/DeleteEvent/${event_ID}`
    );
  }

  updateEventTotalPrice(eventId: number, updatedTotalPrice: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/Event/UpdateEventTotalPrice/${eventId}`, updatedTotalPrice);
  }
  

updateEventStatusToPaid(eventBookingId: number): Observable<void> {
  const url = `${this.apiUrl}/Event/UpdateEventStatusToPaid/${eventBookingId}`;
  return this.http.put<void>(url, {});
}

  deleteAllEvents(): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/Event/DeleteAllEvents`);
  }

  createEventBookingAndEvent(eventBookingData: any): Observable<any> {
    return this.http.post<any>(
        `${this.apiUrl}/Event/create-event-booking`,
        eventBookingData,
        this.httpOptions
    );
}

addEventBookingItems(payload: any): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}/Event/add-event-booking-items`, payload, this.httpOptions);
}

updateEventTypeCateringStatus(eventTypeId: number, isCatered: boolean): Observable<void> {
  return this.http.put<void>(`${this.apiUrl}/Event/UpdateEventTypeCateringStatus/${eventTypeId}`, isCatered, this.httpOptions);
}

addReward(reward: any): Observable<any> {
  return this.http.post(`${this.apiUrl}/api/Reward/AddReward`, reward);
}

getGuestRewards(guestId: number): Observable<any[]> {
  return this.http.get<any[]>(`https://localhost:7102/api/Reward/GetRewardsByGuestId/${guestId}`);
}

//EVENT STATUS
getEventStatuses(): Observable<EventStatus[]> {
  return this.http.get<EventStatus[]>(`${this.apiUrl}/Event/GetAllEventStatuses`);
}

// Method to retrieve all payments
getAllPayments(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/Payments/GetAllPayments`);
}

// Method to update refund status in the backend
updateRefundStatus(event_ID: number): Observable<void> {
  return this.http.put<void>(`${this.apiUrl}/Event/UpdateToRefundStatus/${event_ID}`, {});
}
getEventMenuItemSalesReport(): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/Event/GenerateEventMenuItemSalesReport`).pipe(
    // Add logging here
    tap(data => console.log('Event Menu Item Sales Report Response:', data)), // This logs the raw response from the API
    catchError((error: any) => {
      console.error('Error fetching report:', error);  // Log any error from the backend
      return throwError(error);
    })
  );
}
// getEventMenuItemSalesReport(): Observable<any> {
//   return this.http.get<any>(`${this.apiUrl}/Event/GenerateEventMenuItemSalesReport`);
// }

getEventsGroupedByTypeAndHall(): Observable<any> {
  return this.http.get<any[]>(`${this.apiUrl}/Event/grouped`).pipe(
    map((events) => {
      // Group by Event Type
      const groupedByType = events.reduce((acc, event) => {
        const eventType = event.eventType;
        if (!acc[eventType]) {
          acc[eventType] = {};
        }
        // Group by Hall within each Event Type
        const hall = event.hall.name;
        if (!acc[eventType][hall]) {
          acc[eventType][hall] = [];
        }
        acc[eventType][hall].push(event);
        return acc;
      }, {});
      return groupedByType;
    })
  );
 
}
// Method to get all staff performance reviews
getStaffPerformanceReviews(): Observable<PerformanceReview[]> {
  return this.http.get<PerformanceReview[]>(`${this.apiUrl}/StaffPerformanceReview/GetAllStaffPerformanceReviews`);
}

//REFUNDS

// Method to add a refund
addRefund(refund: Refund): Observable<Refund> {
  return this.http.post<Refund>(`${this.apiUrl}/Event/AddRefund`, refund, this.httpOptions);
}

// Method to get refund details (for example, if needed)
getRefundById(refundID: number): Observable<Refund> {
  return this.http.get<Refund>(`${this.apiUrl}/Event/GetRefundById/${refundID}`);
}

// Fetch the current configuration (Discount, VAT)
getConfiguration(): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/Event/GetDiscount`);
}

// // Fetch discount percentage
// getCurrentDiscount(): Observable<number> {
//   return this.http.get<number>(`${this.apiUrl}/Event/GetDiscount`);
// }

// Update discount percentage
updateDiscount(newDiscount: number): Observable<void> {
  return this.http.put<void>(`${this.apiUrl}/Event/UpdateDiscount`, newDiscount);
}
}