import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { map, Observable, of, Subject } from 'rxjs';
import { FAQ } from '../shared/models/faq.model';
import { environment } from '../environments/environments';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FaqService {

  httpOptions ={
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) {}

  getFAQs() :Observable<FAQ[]>{
    return this.http.get<FAQ[]>(`${environment.apiUrl}FAQ/GetAllFAQs`, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
    getFAQById(id: number) : Observable<FAQ>{
      return this.http.get<FAQ>(`${environment.apiUrl}FAQ/GetFAQById/${id}`, this.httpOptions)
        .pipe(catchError(this.handleError));
    }
    
    createFAQ(faq: FAQ): Observable<FAQ> {
      return this.http.post<FAQ>(`${environment.apiUrl}FAQ/AddFAQ`, faq, this.httpOptions)
        .pipe(catchError(this.handleError));
    }
    
    // updateShiftType(shift_Type_Id: number, shiftType: ShiftType) : Observable<ShiftType>{
    //   return this.http.put<ShiftType>(`${environment.apiUrl}/api/ShiftType/${shift_Type_Id}`, shiftType, this.httpOptions)
    //     .pipe(catchError(this.handleError));
    // }
    updateFAQ(id: number, faq: FAQ): Observable<FAQ> {
      return this.http.put<FAQ>(`${environment.apiUrl}FAQ/UpdateFAQ/${id}`, faq)
                 .pipe(
                     catchError((error: HttpErrorResponse) => {
                         console.error('Error response:', error.error);
                         return throwError('Something bad happened; please try again later.');
                     })
                 );
  }
  
    
    deleteFAQ(id: number): Observable<void> {
      return this.http.delete<void>(`${environment.apiUrl}FAQ/DeleteFAQ/${id}`, this.httpOptions)
        .pipe(catchError(this.handleError));
    }

  

    private handleError(error: HttpErrorResponse) {
      console.error('An error occurred:', error);
      let errorMessage: string;
  
      if (error.error instanceof ErrorEvent) {
        // A client-side or network error occurred.
        errorMessage = `An error occurred: ${error.error.message}`;
      } else {
        // The backend returned an unsuccessful response code and response body as a string
        errorMessage = `Server returned code: ${error.status}, error message is: ${error.message}`;
        // If the response body is not JSON, log it
        try {
          const errorJson = JSON.parse(error.error);
          console.error('Error response JSON:', errorJson);
        } catch (e) {
          console.error('Error response text:', error.error);
        }
      }
      // Return an observable with a user-facing error message
      return throwError('Something bad happened; please try again later.');
    }
}




  
 







