import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';

export interface AuditLog {
  id: number;
  action: string;
  userName: string;
  timestamp: Date;
  details: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuditlogService {

  private apiiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) { }

  getAuditLogs(): Observable<AuditLog[]> {
    return this.http.get<AuditLog[]>(`${this.apiiUrl}AuditLog`);
  }

  deleteOldLogs(): Observable<void> {
    return this.http.delete<void>(`${this.apiiUrl}AuditLog/DeleteOldLogs`);
  }
}
