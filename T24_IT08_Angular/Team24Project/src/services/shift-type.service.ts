
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, Subject } from 'rxjs';
import { ShiftType } from '../shared/models/shiftType.model';
import { environment } from '../environments/environments';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShiftTypeService {

  // addShiftTypeAt: ShiftType = {
  //   id: 0,
  //   name: '',
  //   description: '',
  // };

  

  httpOptions ={
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) {}
  
  getAllShiftTypes() :Observable<ShiftType[]>{
    return this.http.get<ShiftType[]>(`${environment.apiUrl}ShiftType`, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
    getShiftTypeById(shift_Type_Id: number) : Observable<ShiftType>{
      return this.http.get<ShiftType>(`${environment.apiUrl}ShiftType/${shift_Type_Id}`, this.httpOptions)
        .pipe(catchError(this.handleError));
    }
    
    createShiftType(shiftType: ShiftType): Observable<ShiftType> {
      return this.http.post<ShiftType>(`${environment.apiUrl}ShiftType`, shiftType, this.httpOptions)
        .pipe(catchError(this.handleError));
    }
    
    // updateShiftType(shift_Type_Id: number, shiftType: ShiftType) : Observable<ShiftType>{
    //   return this.http.put<ShiftType>(`${environment.apiUrl}/api/ShiftType/${shift_Type_Id}`, shiftType, this.httpOptions)
    //     .pipe(catchError(this.handleError));
    // }
    updateShiftType(id: number, shiftType: ShiftType): Observable<ShiftType> {
      return this.http.put<ShiftType>(`${environment.apiUrl}ShiftType/${id}`, shiftType)
                 .pipe(
                     catchError((error: HttpErrorResponse) => {
                         console.error('Error response:', error.error);
                         return throwError('Something bad happened; please try again later.');
                     })
                 );
  }
  
    
    deleteShiftType(shift_Type_Id: number): Observable<void> {
      return this.http.delete<void>(`${environment.apiUrl}ShiftType/${shift_Type_Id}`, this.httpOptions)
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






