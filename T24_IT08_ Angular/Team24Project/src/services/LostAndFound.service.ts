import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs';
import { catchError } from 'rxjs';

export interface LostAndFoundItems {
  lost_And_Found_ID: number;
  l_And_F_Status_ID?: number;
  staffId?: number;
  bookingID: number;
  name: string;
  description: string;
  dateCreated: string;
  dateModified: string;
  isActive: boolean;
  isDeleted: boolean;
}

export interface LostAndFoundStatuses {
  l_And_F_Status_ID: number;
  name: string;
  description: string;
  dateCreated: string;
  dateModified: string;
  isActive: boolean;
  isDeleted: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class LostAndFoundService {
  private apiUrl = 'https://localhost:7102/api';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  //Lost And Found
  getLostAndFoundItems(): Observable<LostAndFoundItems[]> {
    return this.http.get<LostAndFoundItems[]>(
      `${this.apiUrl}/LostAndFound/GetAllLostAndFoundItems`
    );
  }

  getLostAndFoundById(
    lost_And_Found_ID: number
  ): Observable<LostAndFoundItems> {
    return this.http.get<LostAndFoundItems>(
      `${this.apiUrl}/LostAndFound/GetLostANdFoundItemById/${lost_And_Found_ID}`
    );
  }

  createLostAndFoundItem(
    lostAndFound: LostAndFoundItems
  ): Observable<LostAndFoundItems> {
    return this.http.post<LostAndFoundItems>(
      `${this.apiUrl}/LostAndFound/AddLostAndFoundItem`,
      lostAndFound,
      this.httpOptions
    );
  }

  deleteLostAndFoundItem(lost_And_Found_ID: number): Observable<void> {
    return this.http
      .delete<void>(
        `${this.apiUrl}/LostAndFound/DeleteLostAndFoundItem/${lost_And_Found_ID}`
      )
      .pipe(
        catchError((error) => {
          console.error('Error deleting Lost And Found Item:', error);
          return throwError(error);
        })
      );
  }

  updateLostAndFoundItem(
    lost_And_Found_ID: number,
    lostAndFound: LostAndFoundItems
  ): Observable<LostAndFoundItems> {
    return this.http.put<LostAndFoundItems>(
      `${this.apiUrl}/LostAndFound/UpdateLostAndFoundItem/${lost_And_Found_ID}`,
      lostAndFound,
      this.httpOptions
    );
  }

  //Lost And Found Statuses

  getLostAndFoundStatuses(): Observable<LostAndFoundStatuses[]> {
    return this.http.get<LostAndFoundStatuses[]>(
      `${this.apiUrl}/LostAndFound/GetAllLostAndFoundStatuses`
    );
  }

  getLostAndFoundStatusById(
    l_And_F_Status_ID: number
  ): Observable<LostAndFoundStatuses> {
    return this.http.get<LostAndFoundStatuses>(
      `${this.apiUrl}/LostAndFound/GetLostANdFoundStatusById/${l_And_F_Status_ID}`
    );
  }

  createLostAndFoundStatus(
    lostAndFoundStatus: LostAndFoundStatuses
  ): Observable<LostAndFoundStatuses> {
    return this.http.post<LostAndFoundStatuses>(
      `${this.apiUrl}/LostAndFound/AddLostAndFoundStatus`,
      lostAndFoundStatus,
      this.httpOptions
    );
  }

  deleteLostAndFoundStatus(l_And_F_Status_ID: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/LostAndFound/DeleteLostAndFoundStatus?id=${l_And_F_Status_ID}`
    );
  }


  // Filter Lost And Found Items by criteria
getLostAndFoundByCriteria(
  statusId?: number,
  staffId?: number,
  bookingId?: number
): Observable<LostAndFoundItems[]> {
  let params = new HttpParams();
  
  if (statusId) {
    params = params.set('statusId', statusId.toString());
  }
  if (staffId) {
    params = params.set('staffId', staffId.toString());
  }
  if (bookingId) {
    params = params.set('bookingId', bookingId.toString());
  }

  return this.http.get<LostAndFoundItems[]>(
    `${this.apiUrl}/LostAndFound/GetLostAndFoundByCriteria`,
    { params }
  );
}

}
