import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface EventMenu {
  eventMenuID: number;
  name: string;
  description: string;
  price: number;
  eventTypeId: number;
  dateCreated: string;
  dateModified: string;
  isActive: boolean;
  isDeleted: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class EventMenuService {
  private apiUrl = 'https://localhost:7102/api/EventMenu';

  constructor(private http: HttpClient) {}

  getEventMenus(): Observable<EventMenu[]> {
    return this.http.get<EventMenu[]>(this.apiUrl);
  }

  getEventMenuById(id: number): Observable<EventMenu> {
    return this.http.get<EventMenu>(`${this.apiUrl}/${id}`);
  }

  createEventMenu(eventMenu: EventMenu): Observable<EventMenu> {
    return this.http.post<EventMenu>(this.apiUrl, eventMenu);
  }

  updateEventMenu(id: number, eventMenu: EventMenu): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, eventMenu);
  }

  deleteEventMenu(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
