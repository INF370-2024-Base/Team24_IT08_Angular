import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs';

export interface Staff {
  staffId: number;
  surname: string;
  dateOfBirth: string;
  phoneNumber: string;
  email: string;
  staffRoleId: number;
  userId: string;
  imageUrl: string;
  name: string;
  description: string;
  dateCreated: Date;
  dateModified: Date;
  isActive: boolean;
  isDeleted: boolean;
  [key: string]: any;
}
export interface User {
  id: string;
  userName: string;
  normalizedUserName: string;
  email: string;
  normalizedEmail: string;
  emailConfirmed: boolean;
  passwordHash: string;
  securityStamp: string;
  concurrencyStamp: string;
  phoneNumber: string;
  phoneNumberConfirmed: boolean;
  twoFactorEnabled: boolean;
  lockoutEnd: Date | null;
  lockoutEnabled: boolean;
  accessFailedCount: number;
}

export interface StaffRole {
  getAllStaffRoles(): unknown;
  name: string;
  description: string;
  dateCreated: Date;
  dateModified: Date;
  isActive: boolean;
  isDeleted: boolean;
  staffRoleId: number;
  roleType: string;
}

@Injectable({
  providedIn: 'root',
})
export class StaffService {
  private apiUrl = 'https://localhost:7102/api'; // Replace with your actual API URL

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  getStaff(): Observable<Staff[]> {
    return this.http.get<Staff[]>(`${this.apiUrl}/Staff/GetAllStaffMembers`);
  }
  getStaffById(staffId: number): Observable<Staff> {
    return this.http.get<Staff>(`${this.apiUrl}/Staff/GetStaffById/${staffId}`);
  }

  // createStaffMember(staff: Staff): Observable<Staff> {
  //   return this.http.post<Staff>(
  //     `${this.apiUrl}/Staff/AddStaffMembers`,
  //     staff,
  //     this.httpOptions
  //   );
  // }
  createStaffMember(staff: FormData): Observable<Staff> {
    return this.http.post<Staff>(`${this.apiUrl}/Staff/AddStaffMembers`, staff);
  }

  updateStaffMember(staffId: number, staff: Staff): Observable<any> {
    return this.http.put(
      `https://localhost:7102/api/Staff/UpdateStaff/${staffId}`,
      staff
    );
  }

  deleteStaffMember(staffId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/Staff/DeleteStaff?id=${staffId}`
    );
  }

  approveStaffMember(staffId: number): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/Staff/ApproveStaffMember/${staffId}`,
      null,
      this.httpOptions
    );
  }

  getUserRoles(email: string): Observable<string> {
    return this.http
      .get<{ role: string }>(`${this.apiUrl}/Auth/GetUserRole?email=${email}`)
      .pipe(map((response) => response.role));
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/Auth/Users`);
  }

  getStaffByUserEmail(email: string): Observable<Staff> {
    return this.http.get<Staff>(
      `${this.apiUrl}/Staff/GetStaffByUserEmail/${email}`
    );
  }
  getStaffRoles(): Observable<StaffRole[]> {
    return this.http.get<StaffRole[]>(
      `${this.apiUrl}/StaffRole/GetAllStaffRoles`
    );
  }
}
