import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../../../services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../../shared/components/material.module';


@Component({
  selector: 'app-guest-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MaterialModule],
  templateUrl: './guest-register.component.html',
  styleUrl: './guest-register.component.scss'
})
export class GuestRegisterComponent {
  registerFormGroup: FormGroup;

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

  registerGuest() {
    if (this.registerFormGroup.valid) {
      if (this.registerFormGroup.value.password !== this.registerFormGroup.value.confirmPassword) {
        this.snackBar.open('Passwords do not match', 'Close', { duration: 3000 });
        return;
      }

      const registerUser = {
        Email: this.registerFormGroup.value.email,
        Password: this.registerFormGroup.value.password,
      };

      this.apiService.RegisterGuest(registerUser).subscribe(
        (response) => {
          this.snackBar.open('Guest registered successfully', 'Close', { duration: 3000 });
          this.router.navigate(['/login']);
        },
        (error) => {
          this.snackBar.open('Registration failed', 'Close', { duration: 3000 });
        }
      );
    }
  }
}
