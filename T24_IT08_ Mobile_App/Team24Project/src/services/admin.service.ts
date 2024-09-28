import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Admin {
  name: string;
  description: string;
  dateCreated: string;
  dateModified: string;
  isActive: boolean;
  isDeleted: boolean;
  adminId: number;
  surname: string;
  dateOfBirth: Date;
  phoneNumber?: string; // Optional
  email: string;
  userId?: string; // Optional
  imageUrl?: string; // Optional
}

@Injectable({
  providedIn: 'root',
})
//THERE ARE NO ENDPOINTS FOR ADMIN ON BACKEND!!!
export class AdminService {
  apiUrl = 'https://localhost:7102/api';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private http: HttpClient) {}
  getAdmins(): Observable<Admin[]> {
    return this.http.get<Admin[]>(`${this.apiUrl}/Booking/GetAllAdmins`);
  }

  getAdminById(adminId: number): Observable<Admin> {
    return this.http.get<Admin>(
      `${this.apiUrl}/Booking/GetAdminById/${adminId}`
    );
  }

  createAdmin(admin: Admin): Observable<Admin> {
    return this.http.post<Admin>(
      `${this.apiUrl}/Booking/AddAdmin`,
      admin,
      this.httpOptions
    );
  }

  updateAdmin(admin: Admin): Observable<void> {
    return this.http.put<void>(
      `${this.apiUrl}/Booking/UpdateAdmin/${admin.adminId}`,
      admin,
      this.httpOptions
    );
  }

  deleteAdmin(adminId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/Booking/DeleteAdmin?id=${adminId}`
    );
  }

  approveAdmin(adminId: number): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/Booking/ApproveAdmin/${adminId}`,
      null,
      this.httpOptions
    );
  }
}
