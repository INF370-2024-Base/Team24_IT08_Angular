import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Inspection {
  inspection_ID: number;
  inspection_Status_ID: number;
  inspection_Type_ID: number;
  staffId: number;
  room_ID: number;
  name: string;
  description: string;
  dateCreated: string;
  dateModified: string;
  isActive: boolean;
  isDeleted: boolean;
  [key: string]: any;
}

export interface InspectionType {
  inspection_Type_ID: number;
  name: string;
  description: string;
  dateCreated: Date;
  dateModified: Date;
  isActive: boolean;
  isDeleted: boolean;
  [key: string]: any;
}

export interface InspectionStatus {
  inspection_Status_ID: number;
  name: string;
  description: string;
  dateCreated: Date;
  dateModified: Date;
  isActive: boolean;
  isDeleted: boolean;
  [key: string]: any;
}

//Includes Inspection type and Inspection
@Injectable({
  providedIn: 'root',
})
export class InspectionService {
  private apiUrl = 'https://localhost:7102/api'; // Replace with your actual API URL

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  getInspections(): Observable<Inspection[]> {
    return this.http.get<Inspection[]>(
      `${this.apiUrl}/Inspection/GetAllInspections`
    );
  }

  deleteInspection(inspection_ID: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/Inspection/DeleteInspection?id=${inspection_ID}`
    );
  }

  updateInspection(inspection: Inspection): Observable<void> {
    return this.http.put<void>(
      `${this.apiUrl}/Inspection/UpdateInspection/${inspection.inspection_ID}`,
      inspection,
      this.httpOptions
    );
  }

  createInspection(inspection: Inspection): Observable<Inspection> {
    return this.http.post<Inspection>(
      `${this.apiUrl}/Inspection/AddInspection`,
      inspection,
      this.httpOptions
    );
  }

  getInspectionById(inspection_ID: number): Observable<Inspection> {
    return this.http.get<Inspection>(
      `${this.apiUrl}/Inspection/GetInspectionById/${inspection_ID}`
    );
  }
  //inspection types
  getInspectionTypes(): Observable<InspectionType[]> {
    return this.http.get<InspectionType[]>(
      `${this.apiUrl}/Inspection/GetAllInspectionTypes`
    );
  }
  //inspection statuses
  getInspectionStatuses(): Observable<InspectionStatus[]> {
    return this.http.get<InspectionStatus[]>(`${this.apiUrl}/Inspection/GetAllInspectionStatuses`);
  }
}
