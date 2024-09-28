// components/staff-shift/staff-shift.component.ts
import { Component, OnInit } from '@angular/core';
import { StaffShiftService } from '../../../../../services/staff-shift.service';
import { StaffService } from '../../../../../services/staff.service';
import { ShiftTypeService } from '../../../../../services/shift-type.service';
import { StaffShifts } from '../../../../../services/staff-shift.service';
import { Staff } from '../../../../../services/staff.service';
import { ShiftType } from '../../../../../shared/models/shiftType.model';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../../../../shared/components/material.module';
import { Router, ActivatedRoute } from '@angular/router';
import { ShiftDataService } from '../../../../../shared/ShiftDataService';
@Component({
  selector: 'app-staff-shift',
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterModule, FormsModule, ReactiveFormsModule ],
  templateUrl: './staff-shift.component.html',
  styleUrls: ['./staff-shift.component.scss']
})
export class StaffShiftComponent implements OnInit {
  shifts: StaffShifts[] = [];
  staffList: Staff[] = [];
  shiftTypes: ShiftType[] = [];
  selectedShift: StaffShifts | null = null;

  constructor(
    private staffShiftsService: StaffShiftService,
    private staffService: StaffService,
    private shiftTypeService: ShiftTypeService,
    private router:Router,
    private route:ActivatedRoute,
    private shiftDataService:ShiftDataService
  ) {}

  ngOnInit(): void {
    console.log('ngOnInit of StaffShiftComponent called');
    this.loadShifts();
    this.loadStaff();
    this.loadShiftTypes();

    const staff_Shift_ID = this.shiftDataService.getStaffShiftId();
    if (staff_Shift_ID) {
      console.log('Retrieved staff_Shift_ID from ShiftDataService:', staff_Shift_ID);
      this.loadShiftForEditing(staff_Shift_ID);
      this.shiftDataService.clearStaffShiftId(); // Clear the ID after use
    } else {
      console.log('No staff_Shift_ID found in ShiftDataService.');
    }
  }

  loadShiftForEditing(staff_Shift_ID: number): void {
    console.log('Attempting to load shift for editing with ID:', staff_Shift_ID);
    
    this.staffShiftsService.getStaffShiftById(staff_Shift_ID).subscribe(
      (shift: StaffShifts) => {
        console.log('Shift loaded successfully:', shift);
        this.selectedShift = shift;
      },
      (error) => {
        console.error('Failed to load shift for editing:', error);
      }
    );
  }

  loadShifts(): void {
    this.staffShiftsService.getStaffShifts().subscribe((data) => {
      this.shifts = data;
    });
  }

  loadStaff(): void {
    this.staffService.getStaff().subscribe((data) => {
      this.staffList = data;
    });
  }

  loadShiftTypes(): void {
    this.shiftTypeService.getAllShiftTypes().subscribe((data) => {
      this.shiftTypes = data;
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

  getStaffName(staffId: number): string {
    const staff = this.staffList.find(s => s.staffId === staffId);
    return staff ? staff.name : 'Unknown';
  }

  getShiftTypeName(shiftTypeId: number): string {
    const shiftType = this.shiftTypes.find(st => st.shift_Type_Id === shiftTypeId);
    return shiftType ? shiftType.type_Name: 'Unknown';
  }

  selectShift(shift: StaffShifts): void {
    this.selectedShift = { ...shift };
  }

  addShift(): void {
    this.selectedShift = {
      staff_Shift_ID: 0,
      staffId: this.staffList.length ? this.staffList[0].staffId : 0,
      shift_Type_Id: this.shiftTypes.length ? this.shiftTypes[0].shift_Type_Id : 0,
      startTime: new Date(), // Initialize with the current date
      endTime: new Date(),   // Initialize with the current date
      notes: ''
    };
  }
  saveShift(): void {
    if (this.selectedShift) {
      const p0: StaffShifts = {
        staff_Shift_ID: this.selectedShift.staff_Shift_ID,
        staffId: this.selectedShift.staffId,
        shift_Type_Id: this.selectedShift.shift_Type_Id,
        startTime: new Date(this.selectedShift.startTime), // Ensure Date object
        endTime: new Date(this.selectedShift.endTime),     // Ensure Date object
        notes: this.selectedShift.notes,
        clockIn: this.selectedShift.clockIn,
        clockOut: this.selectedShift.clockOut,
        actualClockInTime: this.selectedShift.actualClockInTime ,
        actualClockOutTime: this.selectedShift.actualClockOutTime,
      };
  
      if (p0.staff_Shift_ID) {
        this.staffShiftsService.updateStaffShift(p0.staff_Shift_ID, p0)
          .subscribe(() => {
            console.log('Shift updated successfully');
            this.deleteReassignmentRequest(p0.staff_Shift_ID); // Delete the reassignment request after successful update
            this.loadShifts();
            this.selectedShift = null;
          }, (error) => {
            console.error('Failed to update shift:', error);
          });
      } else {
        this.staffShiftsService.createStaffShift(p0)
          .subscribe(() => {
            console.log('Shift created successfully');
            this.loadShifts();
            this.selectedShift = null;
          }, (error) => {
            console.error('Failed to create shift:', error);
          });
      }
    }
  }

  deleteReassignmentRequest(staff_Shift_ID: number): void {
    this.staffShiftsService.getReassignmentRequests().subscribe(requests => {
      const requestToDelete = requests.find(req => req.staff_Shift_ID === staff_Shift_ID);
      if (requestToDelete) {
        this.staffShiftsService.deleteReassignmentRequest(requestToDelete.id).subscribe(() => {
          console.log('Reassignment request deleted successfully');
        }, error => {
          console.error('Failed to delete reassignment request:', error);
        });
      }
    });
  }
  

  deleteShift(shiftId: number): void {
    this.staffShiftsService.deleteStaffShift(shiftId).subscribe(() => {
      this.loadShifts();
    });
  }
}
