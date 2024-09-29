import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs';

export interface Hall {
  name: string;
  description: string;
  dateCreated: Date;
  dateModified: Date;
  isActive: boolean;
  isDeleted: boolean;
  hallID: number;
  capacity: number;
  availability: boolean;
  [key: string]: any;
}

@Injectable({
  providedIn: 'root',
})
export class HallService {
  private apiUrl = 'https://localhost:7102/api'; // Replace with your actual API URL

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  //Hall
  getHalls(): Observable<Hall[]> {
    return this.http.get<Hall[]>(`${this.apiUrl}/Hall/GetAllHalls`);
  }
  getHallById(hallID: number): Observable<Hall> {
    return this.http.get<Hall>(`${this.apiUrl}/Hall/GetHallById/${hallID}`);
  }

  createHall(hall: Hall): Observable<Hall> {
    return this.http.post<Hall>(
      `${this.apiUrl}/Hall/AddHall`,
      hall,
      this.httpOptions
    );
  }

  updateHall(hall: Hall): Observable<void> {
    return this.http.put<void>(
      `${this.apiUrl}/Hall/UpdateHall/${hall.hallID}`,
      hall,
      this.httpOptions
    );
  }

  updateAvailability(id: number, availability: boolean): Observable<any> {
    const payload = { availability }; // Payload as an object with "availability" key
    console.log(`PUT to ${this.apiUrl}/Hall/${id}/availability`, payload); // Log the endpoint and payload
    return this.http.put(
      `${this.apiUrl}/Hall/${id}/availability`,
      payload,
      this.httpOptions
    );
  }
  deleteHall(hallID: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/Hall/DeleteHall?id=${hallID}`
    );
  }
}
