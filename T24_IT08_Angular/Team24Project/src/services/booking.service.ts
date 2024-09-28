import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams  } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs';
import { catchError } from 'rxjs';

export interface Booking {
  checkIn:Date;
  checkOut:Date;
  includeBreakfast:boolean;
  promoCode:string;
  name: string;
  surname:string;
  email:string;
  contactNumber:string;
  room_ID: number;
  bookingID:number;
  bookingReference:string;
  totalPrice:number;
}

export interface RoomBooking {
  name: string;
  description: string;
  dateCreated: string;
  dateModified: string;
  isActive: boolean;
  isDeleted: boolean;
  bookingID: number;
  adminId: number;
  room_Type_ID: number;
  room_ID: number;
  guestId: number;
  maxCapacity: number;
 paymentID:number;
 refundID:number;
}

export interface RoomRefund {
  refundID: number;
  bookingID: number;
  amountRefunded: number;
  refundDate: string; // Use string to store the date in ISO format
  reason: RefundReason;
  status: RefundStatus;
}

export enum RefundReason {
  Cancellation = 'Cancellation',
  ServiceIssue = 'ServiceIssue',
  Overbooking = 'Overbooking',
  // Add other reasons as needed
}

export enum RefundStatus {
  Pending = 'Pending',
  Completed = 'Completed',
  Declined = 'Declined'
}


@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private apiUrl = 'https://localhost:7102/api';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  //Bookings
  getBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.apiUrl}/Booking/get-all-bookings`);
  }

  getBookingById(
    BookingID: number,
    //room_Items_ID: number
  ): Observable<Booking> {
    return this.http.get<Booking>(
      `${this.apiUrl}/Booking/GetBookingsById/${BookingID}`
    );
  }

  createBooking(booking: Booking): Observable<Booking> {
    return this.http
      .post<Booking>(
        `${this.apiUrl}/Booking/create`,
        booking,
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }
  private handleError(error: any): Observable<never> {
    console.error('An error occurred', error);
    return throwError(error);
  }

  updateBooking(bookingID: number): Observable<void> {
    return this.http.put<void>(
      `${this.apiUrl}/Booking/UpdateBooking/${bookingID}`,
      null,
      this.httpOptions
    );
}


deleteBooking(roomBookingId: number): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/Booking/DeleteBooking/${roomBookingId}`);
}

  // Method to update booking status to "Paid"
  updateBookingStatusToPaid(bookingId: number): Observable<void> {
    const url = `${this.apiUrl}/Booking/UpdateBookingStatusToPaid/${bookingId}`;
    return this.http.put<void>(url, {}, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  // Method to update booking status to "Refunded"
  updateToBookingRefundStatus(bookingId: number): Observable<void> {
    const url = `${this.apiUrl}/Booking/UpdateToBookingRefundStatus/${bookingId}`;
    return this.http.put<void>(url, {}, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  // Add a refund for booking
  addRefund(refund: RoomRefund): Observable<RoomRefund> {
    const url = `${this.apiUrl}/Booking/AddRoomRefund`;
    return this.http.post<RoomRefund>(url, refund, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

 // Method to calculate the price based on the simplified payload
 calculatePrice(payload: {
  room_ID: number;
  checkIn: Date;
  checkOut: Date;
  includeBreakfast: boolean;
  promoCode: string;
}): Observable<{ totalPrice: number }> {
  return this.http.post<{ totalPrice: number }>(
    `${this.apiUrl}/Booking/calculate-price`,
    payload,
    this.httpOptions
  ).pipe(
    catchError(this.handleError)
  );
}

  
  //add deleteAllBookings method in backend.
  deleteAllBookings(): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/Booking/DeleteAllBookings`);
  }

  //ROOM BOOKINGS
  getRoomBookings(): Observable<RoomBooking[]> {
    return this.http.get<RoomBooking[]>(
      `${this.apiUrl}/Booking/GetAllRoomBookings`
    );
  }
  getRoomBookingById(BookingID: number): Observable<RoomBooking> {
    return this.http.get<RoomBooking>(
      `${this.apiUrl}/Booking/GetRoomBookingById/${BookingID}`
    );
  }

  createRoomBooking(roomBooking: RoomBooking): Observable<RoomBooking> {
    return this.http
      .post<RoomBooking>(
        `${this.apiUrl}/Booking/AddRoomBooking`,
        roomBooking,
        this.httpOptions
      )
      .pipe(
        map((response: any) => response),
        catchError((error) => {
          console.error('Error creating room booking:', error);
          return throwError(error);
        })
      );
  }

  updateRoomBooking(roomBooking: RoomBooking): Observable<void> {
    return this.http.put<void>(
      `${this.apiUrl}/Booking/UpdateRoomBooking/${roomBooking.bookingID}`,
      roomBooking,
      this.httpOptions
    );
  }

  deleteRoomBooking(bookingID: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/Booking/DeleteRoomBooking?id=${bookingID}`
    );
  }

   // Add this method to get booking counts by guest ID
   getCountForRoomBookingsByGuestId(guestId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/Booking/GetCountForRoomBookingsByGuestId/${guestId}`);
  }

   // Add this method to get booking counts by guest ID
   getCountForRoomBookingsByGuestIdAndRoomId(guestId: number, roomId:number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/Booking/GetCountForRoomBookingsByGuestIdAndRoomId/${guestId}/${roomId}`);
  }

   // Add this method to get booking counts for rooms by guest ID
   getCountForRoomsByGuestId(guestId: number): Observable<{ RoomId: number, Count: number }[]> {
    return this.http.get<{ RoomId: number, Count: number }[]>(
      `${this.apiUrl}/Booking/GetCountForRoomsByGuestId/${guestId}`
    );
  }

  cancelBooking(bookingReference: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/Booking/cancel/${bookingReference}`);
  }

  getBookingTrends(): Observable<any> {
    return this.http.get(`${this.apiUrl}/booking-trends`);
  }

  getBookingTrend(startDate: string, endDate: string, interval: string, compareToPrevious: boolean): Observable<any> {
    let params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate)
      .set('interval', interval)
      .set('compareToPrevious', compareToPrevious.toString());
    
    return this.http.get(`${this.apiUrl}/Booking/booking-trend`, { params });
  }
}
