import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs';
import { catchError } from 'rxjs';
import { MbscCalendarEvent } from '@mobiscroll/angular';


export interface StaffShifts {
  staff_Shift_ID: number;
  staffId: number;
  shift_Type_Id: number;
  notes?: string;
  startTime: Date;
  endTime: Date;
  clockIn?: boolean;
  clockOut?: boolean;
  actualClockInTime?: Date;
  actualClockOutTime?: Date;
}

export interface ReassignmentRequest {
  id: number;
  staff_Shift_ID: number;
  description: string;
}

export interface Staff {
  staffId: number;
  name: string;
  roleId: number;
}

// models/shift-type.model.ts
export interface ShiftType {
  shiftTypeId: number;
  typeName: string;
}


@Injectable({
  providedIn: 'root',
})
export class StaffShiftService {
  private apiUrl = 'https://localhost:7102/api';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  getStaffShifts(): Observable<StaffShifts[]> {
    return this.http.get<StaffShifts[]>(
      `${this.apiUrl}/StaffShift/GetAllStaffShifts`
    );
  }
  getStaffShiftById(staff_Shift_ID: number): Observable<StaffShifts> {
    return this.http.get<StaffShifts>(
      `${this.apiUrl}/StaffShift/GetStaffShiftById/${staff_Shift_ID}`
    );
  }

  createStaffShift(staffShift: StaffShifts): Observable<StaffShifts> {
    return this.http.post<StaffShifts>(
      `${this.apiUrl}/StaffShift/AddStaffShift`,
      staffShift,
      this.httpOptions
    );
  }

  updateStaffShift(id: number, staffShift: StaffShifts): Observable<void> {
    return this.http.put<void>(
      `${this.apiUrl}/StaffShift/UpdateStaffShift/${id}`,
      staffShift,
      this.httpOptions
    ).pipe(
      catchError(this.handleError)
    );
  }
  deleteStaffShift(staff_Shift_ID: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/StaffShift/DeleteStaffShift?id=${staff_Shift_ID}`
    );
  }

  clockIn(staffShiftId: number): Observable<void> {
    return this.http.put<void>(
      `${this.apiUrl}/StaffShift/ClockIn/${staffShiftId}`,
      {}
      // this.httpOptions
    );
  }

  clockOut(staffShiftId: number): Observable<void> {
    return this.http.put<void>(
      `${this.apiUrl}/StaffShift/ClockOut/${staffShiftId}`,
      {}
      // this.httpOptions
    );
  }
  requestShiftReassignment(
    reassignmentRequest: ReassignmentRequest
  ): Observable<ReassignmentRequest> {
    return this.http.post<ReassignmentRequest>(
      `${this.apiUrl}/StaffShift/RequestReassignment`,
      reassignmentRequest,
      this.httpOptions
    );
  }

  getReassignmentRequests(): Observable<ReassignmentRequest[]> {
    return this.http.get<ReassignmentRequest[]>(
      `${this.apiUrl}/StaffShift/GetReassignmentRequests`
    );
  }

  deleteReassignmentRequest(id: number): Observable<void> {
    return this.http
      .delete<void>(
        `${this.apiUrl}/StaffShift/DeleteReassignmentRequest/${id}`,
        this.httpOptions
      )
      .pipe(
        catchError((error) => {
          console.error('Error deleting reassignment request:', error);
          return throwError(error);
        })
      );
  }

 
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }


}




