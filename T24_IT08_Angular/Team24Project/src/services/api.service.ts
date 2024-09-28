import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginUser } from '../shared/models/login-user';
import { RegisterUser } from '../shared/models/register-user';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiUrl = 'https://localhost:7102/api/';

  constructor(private httpClient: HttpClient) {}

  // Get token from local storage
  public getToken() {
    return localStorage.getItem('currentUserToken');
  }

  // Set Authorization headers with Bearer token if available
  private getAuthHeaders() {
    const token = this.getToken();
    if (token) {
      return {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Add Bearer token to Authorization header
        }),
      };
    }
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }

  // Register Guest
  RegisterGuest(registerUser: RegisterUser): Observable<any> {
    return this.httpClient.post(
      `${this.apiUrl}Auth/RegisterGuest`,
      registerUser,
      this.getAuthHeaders() // Include Authorization headers
    );
  }

  // Register Staff
  RegisterStaff(registerUser: RegisterUser): Observable<any> {
    return this.httpClient.post(
      `${this.apiUrl}Auth/RegisterStaff`,
      registerUser,
      this.getAuthHeaders() // Include Authorization headers
    );
  }

  // Register Admin
  RegisterAdmin(registerUser: RegisterUser): Observable<any> {
    return this.httpClient.post(
      `${this.apiUrl}Auth/RegisterAdmin`,
      registerUser,
      this.getAuthHeaders() // Include Authorization headers
    );
  }

  // Login User (handles both regular login and 2FA)
  LoginUser(loginUser: LoginUser): Observable<any> {
    return this.httpClient
      .post<any>(`${this.apiUrl}Auth/Login`, loginUser, this.getAuthHeaders())
      .pipe(
        map((response) => {
          if (response && response.token) {
            // Store user details and jwt token in local storage
            localStorage.setItem(
              'currentUser',
              JSON.stringify({
                email: loginUser.Email,  // Ensure 'Email' is consistent
                token: response.token,
                role: response.role, // Ensure the response includes the role
              })
            );
            localStorage.setItem('currentUserToken', response.token); // Also store token separately for reuse
          }
          return response;
        })
      );
  }

  // Verify OTP for Two-Factor Authentication
  Verify2FA(email: string, code: string): Observable<any> {
    return this.httpClient.post(
      `${this.apiUrl}Auth/Verify2FA`,
      { Email: email, Code: code },  // Ensure Email and Code are sent
      this.getAuthHeaders() // Include Authorization headers
    );
  }

  // Fetch User Role
  GetUserRole(email: string): Observable<any> {
    return this.httpClient.get<any>(
      `${this.apiUrl}Auth/GetUserRole?email=${email}`,
      this.getAuthHeaders() // Include Authorization headers
    );
  }

  // Two-Factor Authentication Methods
  Enable2FA(email: string): Observable<any> {
    return this.httpClient.post(
      `${this.apiUrl}Auth/Enable2FA`,
      { Email: email },
      this.getAuthHeaders() // Include Authorization headers
    );
  }

  Disable2FA(email: string): Observable<any> {
    return this.httpClient.post(
      `${this.apiUrl}Auth/Disable2FA`,
      { Email: email },
      this.getAuthHeaders() // Include Authorization headers
    );
  }

  // Clear stored token
  clearToken(): void {
    localStorage.removeItem('currentUserToken');
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  // Fetch all users (Admin Only)
  getUsers(): Observable<any[]> {
    return this.httpClient.get<any[]>(
      `${this.apiUrl}Auth/Users`,
      this.getAuthHeaders() // Include Authorization headers
    );
  }

  // Assign Role to a User (Admin Only)
  assignRole(email: string, role: string): Observable<any> {
    return this.httpClient.post(
      `${this.apiUrl}Auth/AssignRole`,
      { Email: email, roleName: role },  // Use capital 'E' for Email
      this.getAuthHeaders() // Include Authorization headers
    );
  }
}
