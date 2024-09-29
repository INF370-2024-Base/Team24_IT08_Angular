import { Component, OnInit } from '@angular/core';
import {
  StaffShiftService,
  ReassignmentRequest,
  StaffShifts
} from '../../../../../../services/staff-shift.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { ShiftDataService } from '../../../../../../shared/ShiftDataService';

@Component({
  selector: 'app-update-shift-assignment',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './update-shift-assignment.component.html',
  styleUrl: './update-shift-assignment.component.scss',
})
export class UpdateShiftAssignmentComponent implements OnInit {
  reassignmentRequests: ReassignmentRequest[] = [];

  constructor(private staffShiftService: StaffShiftService, private router:Router, private shiftDataService:ShiftDataService) {}

  ngOnInit(): void {
    this.loadReassignmentRequests();
  }

  loadReassignmentRequests() {
    this.staffShiftService.getReassignmentRequests().subscribe(
      (requests: ReassignmentRequest[]) => {
        this.reassignmentRequests = requests;
      },
      (error) => {
        console.error('Failed to load reassignment requests.', error);
      }
    );
  }

  approveRequest(request: ReassignmentRequest): void {
    console.log('Approving request for staff_Shift_ID:', request.staff_Shift_ID);
    this.shiftDataService.setStaffShiftId(request.staff_Shift_ID); // Store the ID in the service
    this.router.navigate(['/staff-shift']); // Navigate without passing the ID via state or query params
  }


  denyRequest(request: ReassignmentRequest): void {
    this.staffShiftService.deleteReassignmentRequest(request.id).subscribe(
      () => {
        // Refresh the list of reassignment requests after successful deletion
        this.loadReassignmentRequests();
      },
      (error) => {
        console.error('Failed to delete reassignment request.', error);
      }
    );
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
}
