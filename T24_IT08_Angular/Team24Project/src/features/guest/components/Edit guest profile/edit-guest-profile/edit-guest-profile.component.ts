import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { GuestService,User } from '../../../../../services/guest.service';
import { GuestInService } from '../../../../../services/guest.service';
import { CalendarModule } from 'primeng/calendar';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { forkJoin, map } from 'rxjs';

@Component({
  selector: 'app-edit-guest-profile',
  standalone: true,
  imports: [CalendarModule, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './edit-guest-profile.component.html',
  styleUrls: ['./edit-guest-profile.component.scss']
})
export class EditGuestProfileComponent implements OnInit {
  editGuestForm!: FormGroup;
  maxDate: Date;
  users: User[] = [];
  guestId!: number; // You might want to use the ID to fetch the guest details
  guest: GuestInService | null = null;

  constructor(
    private fb: FormBuilder,
    private guestService: GuestService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.maxDate = new Date(); // Set the maxDate to today or any date you want
  }

  ngOnInit(): void {
    this.guestId = this.route.snapshot.params['guestId'];
  
    if (!this.guestId) {
      console.error('Guest ID is not defined');
      return;
    }
  this.loadUsers();
    this.editGuestForm = this.fb.group({
      name: ['', Validators.required],
      guest_Surname: ['', Validators.required],
      guest_Email: ['', [Validators.required, Validators.email]],
      guest_PhoneNo: ['', Validators.required],
      dob: ['', Validators.required],
      userId: ['', Validators.required],
      description: ['', Validators.required]
    });
  
    this.guestService.getGuest(this.guestId).subscribe({
      next: guest => {
        this.editGuestForm.patchValue(guest);
      },
      error: err => console.error('Error loading guest:', err)
    });
  }

    onSubmit(): void {
      if (this.editGuestForm.valid) {
        const updatedGuest = this.editGuestForm.value;
        this.guestService.updateGuest(this.guestId, updatedGuest).subscribe({
          next: () => this.router.navigate(['/view-guest-profile', this.guestId]),
          error: err => {
            console.error('Error updating guest:', err);
            alert('There was an error updating the guest profile. Please try again.');
          }
        });
      } else {
        alert('Please ensure all required fields are filled out correctly.');
      }
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

    noFutureDateValidator(control: AbstractControl): { [key: string]: any } | null {
      const inputDate = new Date(control.value);
      const today = new Date();
      return inputDate > today ? { 'max': true } : null;
    }
  }