import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../../../../services/api.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../../../shared/components/material.module';
import { BookingTrendsComponent } from '../../../../BOOKAROOM/booking-trends/booking-trends.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, MaterialModule, BookingTrendsComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent implements OnInit {
  // Role management
  email!:string;
  roleFormGroup!: FormGroup;
  users: any[] = [];
  roles: string[] = ['Admin', 'Staff', 'Guest']; // List of roles to assign
  isLoading = false; // Property to handle loading state

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private apiService: ApiService,
    private snackBar: MatSnackBar
  ) {
    // Form to assign roles
    this.roleFormGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // Fetch current user's email from local storage
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.loadUsers(); // Load all users on dashboard init
  }

  // Load the list of users
  loadUsers(): void {
    this.apiService.getUsers().subscribe(
      (response: any) => {
        this.users = response;
      },
      (error) => {
        console.error('Error loading users:', error);
      }
    );
  }

  // Assign a role to a user
  assignRole(): void {
    if (this.roleFormGroup.valid) {
      const email = this.roleFormGroup.value.email;
      const role = this.roleFormGroup.value.role;
      this.isLoading = true;

      this.apiService.assignRole(email, role).subscribe(
        (response: any) => {
          this.snackBar.open(`Role assigned successfully`, 'Close', { duration: 3000 });
          this.isLoading = false;
          this.roleFormGroup.reset();
          this.loadUsers(); // Reload users after assigning a role
        },
        (error) => {
          console.error('Error assigning role:', error);
          this.snackBar.open(`Failed to assign role`, 'Close', { duration: 3000 });
          this.isLoading = false;
        }
      );
    }
  }

  // Navigate to Admin Registration Page
  registerAdmin(): void {
    this.router.navigate(['/register-admin']);
  }

  // Navigate to Admin Registration Page
  navigateToRegisterAdmin(): void {
    this.router.navigate(['/register-admin']);
  }

  // Navigate to Staff Registration Page
  navigateToRegisterStaff(): void {
    this.router.navigate(['/register-staff']);
  }

  // Logout function
  logout(): void {
    localStorage.removeItem('currentUser'); // Remove current user data
    this.router.navigate(['/login']);
  }

  // Generate Bookings Report
  GenerateBookingsReport(): void {
    this.router.navigate(['/generate-bookings-report']);
  }

  // Navigate to policies
  navigateToPolicies(): void {
    this.router.navigate(['/search-policies-and-regulations']);
  }
}
