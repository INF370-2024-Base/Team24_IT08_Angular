import { Component, OnInit } from '@angular/core';
import {
  StaffShiftService,
  StaffShifts,
  ReassignmentRequest,
} from '../../../../../services/staff-shift.service';
import {
  Staff,
  User,
  StaffRole,
  StaffService,
} from '../../../../../services/staff.service';
import { ShiftTypeService } from '../../../../../services/shift-type.service';
import { ShiftType } from '../../../../../shared/models/shiftType.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FilterPipe } from './filter.pipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-my-shift',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, FilterPipe],
  templateUrl: './view-my-shift.component.html',
  styleUrl: './view-my-shift.component.scss',
})
export class ViewMyShiftComponent implements OnInit {
  emailaddress: string = '';
  staffId: number | null = null;
  staffShifts: StaffShifts[] = [];
  staffNameMap: { [key: number]: string } = {};
  shiftTypeNameMap: { [key: number]: string } = {};
  searchQuery: string = '';
  showReassignmentModal: boolean = false;
  selectedShift: StaffShifts | null = null;
  reassignmentDescription: string = '';

  constructor(
    private staffShiftService: StaffShiftService,
    private staffService: StaffService,
    private shiftTypeService: ShiftTypeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    console.log('Current User:', currentUser);
    this.emailaddress = currentUser.Email;

    this.loadStaffIdByEmail(this.emailaddress);
  }

  loadStaffIdByEmail(email: string): void {
    this.staffService.getStaff().subscribe((staff: Staff[]) => {
      const currentUserStaff = staff.find(
        (member) => member['email'].toLowerCase() === email.toLowerCase() // Case-insensitive comparison
      );
      if (currentUserStaff) {
        this.staffId = currentUserStaff.staffId;
        this.loadStaffShifts();
      } else {
        console.error('Staff not found for email:', email);
      }
    });
  }
  loadStaffShifts(): void {
    if (this.staffId === null) {
      console.error('Staff ID is not available.');
      return;
    }

    this.staffShiftService
      .getStaffShifts()
      .subscribe((shifts: StaffShifts[]) => {
        this.staffShifts = shifts.filter(
          (shift) => shift.staffId === this.staffId
        );
        console.log('Filtered Shifts:', this.staffShifts);
        this.loadStaffNames();
        this.loadShiftTypeNames();
      });
  }

  getCurrentUserId(): number {
    // Assuming you have a method to get the current user's ID
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return currentUser.id;
  }

  loadStaffNames(): void {
    this.staffService.getStaff().subscribe((staff: Staff[]) => {
      staff.forEach((member) => {
        this.staffNameMap[member.staffId] = `${member.name} ${member.surname}`;
      });
    });
  }

  loadShiftTypeNames(): void {
    this.shiftTypeService
      .getAllShiftTypes()
      .subscribe((shiftTypes: ShiftType[]) => {
        shiftTypes.forEach((type) => {
          this.shiftTypeNameMap[type.shift_Type_Id] = type.type_Name;
        });
      });
  }

  navigateToClockIn(staffShiftId: number): void {
    if (
      staffShiftId !== null &&
      staffShiftId != undefined &&
      this.emailaddress
    ) {
      this.router.navigate([
        '/clock-in-clock-out',
        staffShiftId,
        this.emailaddress, // Update this line
      ]);
    } else {
      console.error(
        'Navigation parameters are missing or invalid',
        staffShiftId,
        this.emailaddress
      );
    }
  }
  openReassignmentModal(shift: StaffShifts): void {
    this.selectedShift = shift;
    this.showReassignmentModal = true;
  }

  closeReassignmentModal(): void {
    this.showReassignmentModal = false;
    this.reassignmentDescription = '';
    this.selectedShift = null;
  }

  submitReassignmentRequest(): void {
    if (this.selectedShift && this.reassignmentDescription) {
      const reassignmentRequest: ReassignmentRequest = {
        id: 0, // Assuming 0 or an appropriate value for a new record
        staff_Shift_ID: this.selectedShift.staff_Shift_ID,
        description: this.reassignmentDescription,
      };

      this.staffShiftService
        .requestShiftReassignment(reassignmentRequest)
        .subscribe(
          () => {
            alert('Your request has been sent!');
            this.closeReassignmentModal();
          },
          (error) => {
            console.error('Failed to send reassignment request', error);
            alert(`Error: ${error.message}`);
          }
        );
    } else {
      alert('Please provide a description for the reassignment request.');
    }
  }
}
