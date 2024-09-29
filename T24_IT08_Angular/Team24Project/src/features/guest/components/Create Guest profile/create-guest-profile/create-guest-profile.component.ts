import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GuestService,User } from '../../../../../services/guest.service';
import { Router } from '@angular/router';
import { CalendarModule } from 'primeng/calendar';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { formatDate } from '@angular/common';
import { GuestInService } from '../../../../../services/guest.service'; // Import the correct type
import { forkJoin, map } from 'rxjs';


@Component({
  selector: 'app-create-guest-profile',
  standalone: true,
  imports: [CalendarModule, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './create-guest-profile.component.html',
  styleUrls: ['./create-guest-profile.component.scss']
})
export class CreateGuestProfileComponent implements OnInit {


    addGuestForm!: FormGroup;
    maxDate: Date;
    users: User[] = [];
    name: any;
    guest_Surname: any;
  
    constructor(
      private fb: FormBuilder,
      private guestService: GuestService,
      private router: Router
    ) {
      this.maxDate = new Date(); // Set the maxDate to today or any date you want
    }
  
    ngOnInit(): void {
      this.loadUsers();
      this.addGuestForm = this.fb.group({
        name: ['', Validators.required],
        guest_Surname: ['', Validators.required],
        guest_Email: ['', [Validators.required, Validators.email]],
        guest_PhoneNo: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
        dob: ['', Validators.required],
        description: ['', Validators.required],
        userId: [''], // Assuming userId is a required field in your backend
      });
    }
  
    onSubmit(): void {
      if (this.addGuestForm.valid) {
        const guestData: GuestInService = this.addGuestForm.value;
        
        this.guestService.createGuest(guestData).subscribe({
          next: response => {
            alert('Guest added successfully');
            console.log('Guest added successfully', response);
            this.router.navigate(['/view-guest-profile']); // Navigate to the view guest profile page
          },
          error: err => {
            alert('Error adding guest');
            console.error('Error adding guest:', err);
          }
        });
      } else {
        alert('Form is invalid');
        console.log('Form is invalid');
      }
    }

    isFieldInvalid(fieldName: string): boolean {
      const field = this.addGuestForm.get(fieldName);
      return !!field?.invalid && (field.dirty || field.touched);
    }
    
  
    loadUsers(): void {
      this.guestService.getUsers().subscribe((users) => {
        const userRoleObservables = users.map((user) =>
          this.guestService.getUserRoles(user.email).pipe(
            map((role) => {
              console.log('Role for user', user.email, ':', role); // Log the response for debugging
              return { user, role };
            })
          )
        );
  
        forkJoin(userRoleObservables).subscribe((userRoles) => {
          console.log('User roles:', userRoles);
          this.users = userRoles
            .filter((userRole) => {
              console.log(
                'Checking role for user',
                userRole.user.email,
                ':',
                userRole.role
              );
              
              return userRole.role.includes('Guest');
            })
            .map((userRole) => userRole.user);
          console.log('Filtered users:', this.users);
        });
      });
    }
  }
  