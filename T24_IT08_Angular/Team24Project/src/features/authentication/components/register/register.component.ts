import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../../services/api.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../../shared/components/material.module';

@Component({
  selector: 'app-register',
  imports:[ ReactiveFormsModule, CommonModule, MaterialModule],
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerFormGroup: FormGroup;
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private apiService: ApiService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.registerFormGroup = this.fb.group({
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(16)]],
    });
  }

  ngOnInit(): void {}

  RegisterUser(role: string) {
    if (this.registerFormGroup.valid) {
      this.isLoading = true;
      let registerCall;

      switch (role) {
        case 'Guest':
          registerCall = this.apiService.RegisterGuest(this.registerFormGroup.value);
          break;
        case 'Staff':
          registerCall = this.apiService.RegisterStaff(this.registerFormGroup.value);
          break;
        case 'Admin':
          registerCall = this.apiService.RegisterAdmin(this.registerFormGroup.value);
          break;
        default:
          this.snackBar.open('Invalid role', 'X', { duration: 5000 });
          this.isLoading = false;
          return;
      }

      registerCall.subscribe({
        next: () => {
          this.registerFormGroup.reset();
          this.router.navigate(['']).then((navigated: boolean) => {
            if (navigated) {
              this.snackBar.open('Registered successfully', 'X', { duration: 5000 });
            }
          });
        },
        error: (err) => {
          console.error('Registration error:', err);
          this.snackBar.open('Registration failed', 'X', { duration: 5000 });
          this.isLoading = false;
        }
      });
    } else {
      this.snackBar.open('Please fill out all required fields', 'X', { duration: 5000 });
    }
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
