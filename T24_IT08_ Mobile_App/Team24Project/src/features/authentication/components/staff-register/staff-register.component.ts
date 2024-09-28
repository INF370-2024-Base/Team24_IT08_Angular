import { Component } from '@angular/core';
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

@Component({
  selector: 'app-staff-register',
  standalone: true,
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  templateUrl: './staff-register.component.html',
  styleUrl: './staff-register.component.scss'
})
export class StaffRegisterComponent {
  registerFormGroup: FormGroup;
  isLoading = false;  

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.registerFormGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  registerStaff() {
    this.isLoading = true;  // Start loading
    if (this.registerFormGroup.valid) {
      if (this.registerFormGroup.value.password !== this.registerFormGroup.value.confirmPassword) {
        this.snackBar.open('Passwords do not match', 'Close', { duration: 3000 });
        return;
      }

      const registerUser = {
        Email: this.registerFormGroup.value.email,
        Password: this.registerFormGroup.value.password,
      };

      this.apiService.RegisterStaff(registerUser).subscribe(
        (response) => {
          this.snackBar.open('Staff registered successfully', 'Close', { duration: 3000 });
          this.router.navigate(['/admin-dashboard']);
        },
        (error) => {
          this.snackBar.open('Registration failed', 'Close', { duration: 3000 });
          this.isLoading = false;  // Stop loading
        }
      );
    }
  }
}