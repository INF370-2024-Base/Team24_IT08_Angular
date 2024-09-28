import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { formatDate } from '@angular/common';
import {
  StaffService,
  StaffRole,
  Staff,
  User,
} from '../../../../../services/staff.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-staff-profile',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule, ReactiveFormsModule],
  templateUrl: './update-staff-profile.component.html',
  styleUrls: ['./update-staff-profile.component.scss'], // Corrected property name
})
export class UpdateStaffProfileComponent implements OnInit {
  updateStaffForm!: FormGroup;
  staff: Staff | null = null;
  users: User[] = [];
  staffRoles: StaffRole[] = [];
  selectedImage: string | ArrayBuffer | null = null;
  staffId: number | null = null;
  constructor(
    private fb: FormBuilder,
    private staffService: StaffService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const staffId = Number(params.get('id'));
      const emailAddress = params.get('emailaddress'); // You can use this if needed
      console.log('Fetching staff member with ID:', staffId);

      this.updateStaffForm = this.fb.group({
        name: ['', Validators.required],
        surname: ['', Validators.required],
        dateOfBirth: ['', Validators.required],
        phoneNumber: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        userName: ['', Validators.required],
        description: ['', Validators.required],
        image: [''],
      });

      this.staffId = staffId; // Ensure staffId is stored as number
      this.loadStaffProfile(staffId);
    });
  }

  loadStaffProfile(staffId: number) {
    this.staffService.getStaffById(staffId).subscribe(
      (staff) => {
        this.staff = staff;
        this.updateStaffForm.patchValue(staff);
      },
      (error) => {
        alert('Error loading staff profile');
        console.error('Error loading staff profile', error);
      }
    );
  }

  // onImageChange(event: Event): void {
  //   const file = (event.target as HTMLInputElement).files?.[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       this.selectedImage = reader.result;
  //       this.updateStaffForm.patchValue({ image: this.selectedImage }); // Correct field name
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // }

  onImageChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      // Process the file or store it in a form control
    }
  }

  onSubmit() {
    if (this.updateStaffForm.valid && this.staffId !== null) {
      const updatedStaff = { ...this.staff, ...this.updateStaffForm.value };
      this.staffService.updateStaffMember(this.staffId, updatedStaff).subscribe(
        (response) => {
          alert('Profile updated successfully');
          console.log('Profile updated successfully', response);
        },
        (error) => {
          alert('Error updating staff profile');
          console.error('Error updating staff profile', error);
        }
      );
    }
  }
}
