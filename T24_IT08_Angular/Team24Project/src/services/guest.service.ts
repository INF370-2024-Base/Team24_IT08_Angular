import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, Subject } from 'rxjs';
import { Guest } from '../shared/models/guest.model';
import { environment } from '../environments/environments';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export interface GuestInService {
  //Guest model in backend
  name?: string;
  description?: string;
  dateCreated?: Date;
  dateModified?: Date;
  isActive?: boolean;
  isDeleted?: boolean;
  guestId: number;
  guest_Surname: string;
  guest_Email: string;
  guest_PhoneNo: number;
  dob: string;
  //so that this foreign key can be effective
  userId?: string;
  
}

  export interface Feedback {
    feedbackId?: number;
    guestId: number;
    rating: number;
    comments: string;
    submittedAt?: Date;
  }

  export interface FeedbackResponse {
    isSuccess: boolean;
    message: string;
  }

  export interface User {
    id: string;
    userName: string;
    normalizedUserName: string;
    email: string;
    normalizedEmail: string;
    emailConfirmed: boolean;
    passwordHash: string;
    securityStamp: string;
    concurrencyStamp: string;
    phoneNumber: string;
    phoneNumberConfirmed: boolean;
    twoFactorEnabled: boolean;
    lockoutEnd: Date | null;
    lockoutEnabled: boolean;
    accessFailedCount: number;
  }

@Injectable({
  providedIn: 'root',
})
export class GuestService {
  private apiUrl = `${environment.apiUrl}Guest`;
  private piUrl = `${environment.apiUrl}Feedback`;
  private apiUrl3 = 'https://localhost:7102/api';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  guestId: any;

  constructor(private http: HttpClient) {}

  getGuest(id: number): Observable<Guest> {
    return this.http.get<Guest>(`${this.apiUrl}/GetGuestById/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getAllGuests(): Observable<GuestInService[]> {
    return this.http.get<GuestInService[]>(`${this.apiUrl}/GetAllGuests`)
      .pipe(
        catchError(this.handleError)
      );
  }

  createGuest(guest: GuestInService): Observable<any> {
    return this.http.post(`${this.apiUrl}/AddGuest`, guest);
  }
  
  updateGuest(id: number, guest: GuestInService): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/UpdateGuest/${id}`, guest, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteGuest(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/DeleteGuest/${id}`, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  

  // submitFeedback(feedback: Feedback): Observable<Feedback> {
  //   return this.http.post<Feedback>(`${this.piUrl}/SubmitFeedback`, feedback, this.httpOptions);
  // }
submitFeedback(feedback: Feedback): Observable<FeedbackResponse> {
    return this.http.post<FeedbackResponse>(`${this.piUrl}/SubmitFeedback`, feedback);
  }

  getFeedbackByGuestId(guestId: number): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(`${this.piUrl}/GetFeedbackByGuestId/${guestId}`);
  }

  getFeedbackById(feedbackId: number): Observable<Feedback> {
    return this.http.get<Feedback>(`${this.piUrl}/GetFeedbackById/${feedbackId}`);
  }

  deleteFeedback(feedbackId: number): Observable<void> {
    return this.http.delete<void>(`${this.piUrl}/DeleteFeedback/${feedbackId}`);
  }

  updateFeedback(feedbackId: number, feedback: Feedback): Observable<Feedback> {
    return this.http.put<Feedback>(`${this.piUrl}/UpdateFeedback/${feedbackId}`, feedback);
  }
  // getQrCode(guestId: number): Observable<Blob> {
  //   return this.http.get(`${this.piUrl}/GenerateGuestQrCode/${guestId}`, { responseType: 'blob' });
  // }
  getQrCode(guestId: number, frontendBaseUrl: string): Observable<Blob> {
    return this.http.get(`${this.piUrl}/GenerateGuestQrCode/${guestId}?frontendBaseUrl=${encodeURIComponent(frontendBaseUrl)}`, { responseType: 'blob' });
  }
  getUserRoles(email: string): Observable<string> {
    return this.http
      .get<{ role: string }>(`${this.apiUrl3}/Auth/GetUserRole?email=${email}`)
      .pipe(map((response) => response.role));
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl3}/Auth/Users`);
  }

  getGuestByEmail(email: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/GetGuestByEmail/${email}`);
  }

  deleteGuestByEmail(email: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/DeleteGuestByEmail/${email}`);
  }

  private handleError(error: HttpErrorResponse) {
    // Handle error accordingly
    console.error('An error occurred:', error.message);
    return throwError('Something went wrong; please try again later.');
  }

  // getAllGuests(): Observable<GuestInService[]> {
  //   return this.http.get<GuestInService[]>(`${this.apiUrl}/Guest/GetAllGuests`);
  // }
}
