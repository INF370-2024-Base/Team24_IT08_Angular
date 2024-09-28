import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../environments/environments';

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

// models/staff-shift.model.ts
export interface StaffShift {
  staffShiftId: number;
  staffId: number;
  shiftTypeId: number;
  startTime: Date;
  endTime: Date;
  notes?: string;
}

@Injectable({
  providedIn: 'root'
})

export class StaffShiftsService {
  
  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  getAllStaffShifts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}Staff_Shift`).pipe(
      tap((data: any) => console.log('GET all staff shifts:', data))
    );
  }

  addStaffShift(shift: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}Staff_Shift`, shift).pipe(
      tap((response) => console.log('POST new staff shift:', response))
    );
  }

  updateStaffShift(id: number, shift: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}Staff_Shift/${id}`, shift).pipe(
      tap((response) => console.log('PUT update staff shift:', response))
    );
  }

  deleteStaffShift(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}Staff_Shift/${id}`).pipe(
      tap((response) => console.log('DELETE staff shift:', response))
    );
  }
}
