import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../../services/api.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../../../../shared/components/material.module';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { LoginUser } from '../../../../shared/models/login-user';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginFormGroup: FormGroup = this.fb.group({
    Email: ['', [Validators.required, Validators.email]],  // Email field
    Password: ['', Validators.required],                   // Password field
    otpCode: [''],                                         // OTP field (initially empty)
  });

  isLoading: boolean = false;
  twoFactorRequired: boolean = false;   // To track if 2FA is required
  emailFor2FA: string = '';             // To store email for the 2FA process

  constructor(
    private router: Router,
    private apiService: ApiService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  // Main login method
  async LoginUser() {
    if (this.loginFormGroup.valid) {
      this.isLoading = true;

      const loginUser: LoginUser = {
        Email: this.loginFormGroup.value.Email,
        Password: this.loginFormGroup.value.Password,
      };

      console.log('Attempting to log in with:', loginUser);

      this.apiService
        .LoginUser(loginUser)
        .pipe(
          switchMap((response) => {
            if (response.Status === '2FA') {
              // If 2FA is required
              this.twoFactorRequired = true;
              this.emailFor2FA = loginUser.Email;   // Store email for 2FA validation
              this.snackBar.open('2FA required. Check your email for the OTP.', 'Close', { duration: 5000 });
              this.isLoading = false;
              return [];  // Early return as 2FA is required
            }

            console.log('Login successful, server response:', response);
            localStorage.setItem('currentUserToken', response.token);
            return this.apiService.GetUserRole(loginUser.Email);
          })
        )
        .subscribe(
          (result: any) => {
            console.log('Role fetched:', result);
            const currentUser = {
              Email: loginUser.Email,
              token: localStorage.getItem('currentUserToken'),
              role: result.role,
            };
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            this.loginFormGroup.reset();
            this.isLoading = false;

            // Navigate based on role
            if (result.role === 'Admin') {
              this.router.navigate(['/admin-dashboard', loginUser.Email]);
            } else if (result.role === 'Staff') {
              this.router.navigate(['/staff-dashboard', loginUser.Email]);
            } else if (result.role === 'Guest') {
              this.router.navigate(['/guest-dashboard', loginUser.Email]);
            } else {
              this.router.navigate(['/login']);  // Redirect to login if no valid role is found
            }
          },
          (error) => {
            console.error('Login error:', error);
            this.isLoading = false;

            if (error.status === 400) {
              this.snackBar.open('Invalid credentials', 'Close', { duration: 3000 });
            } else {
              this.snackBar.open('Login failed', 'Close', { duration: 3000 });
            }
          }
        );
    }
  }
   // 2FA Verification Method
   verify2FA() {
    const otpCode = this.loginFormGroup.value.otpCode;  // Get OTP from the form

    if (otpCode) {
      this.isLoading = true;

      this.apiService.Verify2FA(this.emailFor2FA, otpCode).subscribe(
        (response) => {
          console.log('2FA Verification successful, server response:', response);
          localStorage.setItem('currentUserToken', response.token);
          this.router.navigate(['/dashboard']);  // Navigate after successful 2FA login
          this.isLoading = false;
        },
        (error) => {
          console.error('2FA Verification error:', error);
          this.snackBar.open('Invalid OTP code', 'Close', { duration: 3000 });
          this.isLoading = false;
        }
      );
    } else {
      this.snackBar.open('Please enter the OTP code', 'Close', { duration: 3000 });
    }
  }

  clientId: string = '1634905603745385';
  redirectUri: string = 'https://localhost:4200/auth/callback'; // Use your correct frontend URL

  redirectToInstagram() {
    const authUrl = `https://api.instagram.com/oauth/authorize?client_id=${this.clientId}&redirect_uri=${this.redirectUri}&scope=user_profile,user_media&response_type=code`;
    window.location.href = authUrl;
 
}
}
