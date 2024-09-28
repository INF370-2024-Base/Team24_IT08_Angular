import { Component, OnInit } from '@angular/core';
import {
  StaffService,
  Staff,
  User,
  StaffRole,
} from '../../../../../../services/staff.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-view-staff-profiles',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './view-staff-profiles.component.html',
  styleUrl: './view-staff-profiles.component.scss',
})
export class ViewStaffProfilesComponent implements OnInit {
  staffMembers: Staff[] = [];
  users: User[] = [];
  staffRoles: StaffRole[] = [];

  constructor(private staffService: StaffService, private router:Router) {}

  ngOnInit(): void {
    this.loadStaffMembers();
    this.loadUsers();
    this.loadStaffRoles();
  }

  loadStaffRoles(): void {
    this.staffService.getStaffRoles().subscribe((staffRoles) => {
      this.staffRoles = staffRoles;
    });
  }

  loadStaffMembers(): void {
    this.staffService.getStaff().subscribe((staff) => {
      this.staffMembers = staff;
    });
  }

  goBack() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const role = currentUser.role;
    const emailaddress = currentUser.emailaddress;
  
    if (role === 'Admin') {
      this.router.navigate([`/admin-dashboard/${emailaddress}`]);
    } else if (role === 'Staff') {
      this.router.navigate([`/staff-dashboard/${emailaddress}`]);
    } else if (role === 'Guest') {
      this.router.navigate([`/guest-dashboard/${emailaddress}`]);
    } else {
      console.error('Unknown role:', role);
      this.router.navigate(['/']); // Default route or error page
    }
  }

  loadUsers(): void {
    this.staffService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }

  getUserName(userId: string): string {
    const user = this.users.find((u) => u.id === userId);
    return user ? user.userName : 'Unknown User';
  }

  getRoleName(staffRoleId: number): string {
    const staffRole = this.staffRoles.find((sr) => sr.staffRoleId);
    return staffRole ? staffRole.name : 'Unknown Staff Role';
  }

  getImageUrl(imageUrl: string): string {
    return `data:image/jpeg;base64,${imageUrl}`;
  }

  approveStaff(staff: Staff): void {
    staff.isActive = true;
    console.log('Payload being sent:', staff);

    this.staffService.updateStaffMember(staff.staffId, staff).subscribe(
      () => {
        this.loadStaffMembers();
        alert('Staff approved successfully');
        console.log('Staff approved successfully');
      },
      (error: any) => {
        if (error.status === 400 && error.error && error.error.errors) {
          console.error('Validation errors:', error.error.errors);
        } else {
          console.error('Error approving staff', error);
        }
      }
    );
  }

  deleteStaff(staff: Staff): void {
    if (confirm('Are you sure you want to delete this staff profile?')) {
      this.staffService.deleteStaffMember(staff.staffId).subscribe(
        () => {
          this.loadStaffMembers();  // Reload the list after deletion
          console.log('Staff profile deleted successfully');
        },
        (error: HttpErrorResponse) => {
          console.error('Error deleting staff profile:', error);
          if (error.status === 409) {
            alert('Deletion unsuccessful because the staff profile is being used elsewhere in the system.');
          } else {
            alert('An error occurred while deleting the staff profile: ' + error.message);
          }
        }
      );
    }
  }
}
