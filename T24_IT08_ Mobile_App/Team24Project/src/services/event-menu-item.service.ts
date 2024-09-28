import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface EventMenuItem {
  eventMenuItemID: number;
  name: string;
  description: string;
  price: number;
  eventMenuID: number;
  dateCreated: string;  // Add this
  dateModified: string | null;  // Add this, with null allowed for newly created items
  isActive: boolean;  // Add this
  isDeleted: boolean;  // Add this
}
//do not forget to add the dateCreated, dateModified , isActive, isDeleted in ts of event menu item CRUDs

@Injectable({
  providedIn: 'root',
})
export class EventMenuItemService {
  private apiUrl = 'https://localhost:7102/api/EventMenuItem';

  constructor(private http: HttpClient) {}

  getEventMenuItems(): Observable<EventMenuItem[]> {
    return this.http.get<EventMenuItem[]>(this.apiUrl);
  }
  
  getEventMenuItemsByMenuId(eventMenuID: number): Observable<EventMenuItem[]> {
    return this.http.get<EventMenuItem[]>(`https://localhost:7102/api/EventMenuItem/menu/${eventMenuID}`);
}

  getEventMenuItemById(id: number): Observable<EventMenuItem> {
    return this.http.get<EventMenuItem>(`${this.apiUrl}/${id}`);
  }

  createEventMenuItem(eventMenuItem: EventMenuItem): Observable<EventMenuItem> {
    return this.http.post<EventMenuItem>(this.apiUrl, eventMenuItem);
  }

  updateEventMenuItem(id: number, eventMenuItem: EventMenuItem): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, eventMenuItem);
  }

  deleteEventMenuItem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }


}
