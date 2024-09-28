import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import {
  StaffService,
  StaffRole,
  Staff,
  User,
} from '../../../../../services/staff.service';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-staff-profile',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './create-staff-profile.component.html',
  styleUrl: './create-staff-profile.component.scss',
})
export class CreateStaffProfileComponent implements OnInit {
  staff: Staff = {
    staffId: 0,
    surname: '',
    dateOfBirth: '',
    phoneNumber: '',
    email: '',
    staffRoleId: 0,
    userId: '',
    imageUrl: '',
    name: '',
    description: '',
    dateCreated: new Date(),
    dateModified: new Date(),
    isActive: false,
    isDeleted: false,
  } as Staff;
  users: User[] = [];
  staffRoles: StaffRole[] = [];
  selectedImage: File | null = null;
  maxDateOfBirth: string = '';

  constructor(private staffService: StaffService, private router: Router) {}

  ngOnInit(): void {
    this.loadUsers();
    this.loadStaffRoles();
    this.setMaxDateOfBirth();
  }

  loadUsers(): void {
    this.staffService.getUsers().subscribe((users) => {
      const userRoleObservables = users.map((user) =>
        this.staffService.getUserRoles(user.email).pipe(
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
            // Check if the role includes 'Staff'
            return userRole.role.includes('Staff');
          })
          .map((userRole) => userRole.user);
        console.log('Filtered users:', this.users);
      });
    });
  }

  loadStaffRoles(): void {
    this.staffService.getStaffRoles().subscribe((staffRoles) => {
      this.staffRoles = staffRoles;
    });
  }
  
  setMaxDateOfBirth(): void {
    const today = new Date();
    const maxYear = today.getFullYear() - 16;
    const maxMonth = ('0' + (today.getMonth() + 1)).slice(-2); // Add leading zero for months less than 10
    const maxDay = ('0' + today.getDate()).slice(-2); // Add leading zero for days less than 10
    this.maxDateOfBirth = `${maxYear}-${maxMonth}-${maxDay}`;
  }

  onImageChange(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedImage = file;
    }
  }

  onSubmit(form: NgForm): void {
    if (!form.valid) {
      alert('Form is invalid');
      console.log('Form is invalid');
      return;
    }

    // Create a FormData object to send data as multipart/form-data
    const formData = new FormData();
    formData.append('Name', this.staff.name);
    formData.append('Surname', this.staff.surname);
    formData.append('DateOfBirth', this.staff.dateOfBirth);
    formData.append('PhoneNumber', this.staff.phoneNumber);
    formData.append('Email', this.staff.email);
    formData.append('StaffRoleId', this.staff.staffRoleId.toString());
    formData.append('UserId', this.staff.userId);
    formData.append('Description', this.staff.description);

    if (this.selectedImage) {
      formData.append('ImageFile', this.selectedImage, this.selectedImage.name);
    }

    this.staffService.createStaffMember(formData).subscribe(
      (newStaff) => {
        alert(`Staff member created! :)`);
        console.log('Staff member created:', newStaff);
      },
      (error: HttpErrorResponse) => {
        alert(`Error creating staff member `);
        console.error('Error creating staff member:', error);
        console.error('Error details:', error.message, error.error);
      }
    );
  }
}
