import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  InspectionService,
  Inspection,
  InspectionType,
} from '../../../services/inspection.services';
import { StaffService, Staff, User } from '../../../services/staff.service';
import { RoomService, Room } from '../../../services/room.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-update-inspection',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './update-inspection.component.html',
  styleUrl: './update-inspection.component.scss',
})
export class UpdateInspectionComponent implements OnInit {
  inspection: Inspection | null = null;
  inspectionTypes: InspectionType[] = [];
  rooms: Room[] = [];
  staffMembers: Staff[] = [];
  users: User[] = [];
  selectedUserId: string = '';

  constructor(
    private inspectionService: InspectionService,
    private roomService: RoomService,
    private staffService: StaffService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const inspection_ID = Number(params.get('id'));
      console.log('Fetching inspection with ID:', inspection_ID); // Add logging
      this.inspectionService.getInspectionById(inspection_ID).subscribe(
        (inspection: Inspection) => {
          this.inspection = inspection;
          console.log('Inspection data loaded:', this.inspection); // Add logging
          this.fetchData();
          this.cdr.detectChanges(); // Force change detection
        },
        (error: any) => {
          console.error('Error fetching inspection', error);
        }
      );
    });
  }

  fetchData() {
    this.inspectionService.getInspectionTypes().subscribe(
      (data) => {
        this.inspectionTypes = data;
      },
      (error) => {
        console.error('Error fetching inspection types', error);
      }
    );

    this.roomService.getRooms().subscribe(
      (data) => {
        this.rooms = data;
      },
      (error) => {
        console.error('Error fetching rooms', error);
      }
    );

    this.staffService.getStaff().subscribe(
      (data) => {
        this.staffMembers = data;
      },
      (error) => {
        console.error('Error fetching staff', error);
      }
    );

    this.staffService.getUsers().subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        console.error('Error fetching users', error);
      }
    );
  }

  getSelectedInspectionType(): InspectionType | null {
    if (this.inspection) {
      return (
        this.inspectionTypes.find(
          (type) =>
            type.inspection_Type_ID === this.inspection!.inspection_Type_ID
        ) || null
      );
    }
    return null;
  }

  getSelectedRoom(): Room | null {
    if (this.inspection) {
      return (
        this.rooms.find((room) => room.room_ID === this.inspection!.room_ID) ||
        null
      );
    }
    return null;
  }

  getSelectedStaff(): Staff | null {
    if (this.inspection) {
      return (
        this.staffMembers.find(
          (staff) => staff.staffId === this.inspection!.staffId
        ) || null
      );
    }
    return null;
  }

  updateInspection() {
    if (this.inspection) {
      this.inspection.isActive = true;
      this.inspection.isDeleted = false;
      this.inspection.dateModified = new Date().toISOString();
      this.inspection['userId'] = this.selectedUserId;

      this.inspection['inspectionType'] = this.getSelectedInspectionType();
      this.inspection['room'] = this.getSelectedRoom();
      this.inspection['staff'] = this.getSelectedStaff();

      // Log the payload to ensure it is correct
      console.log('Payload:', this.inspection);

      this.inspectionService.updateInspection(this.inspection).subscribe(
        () => {
          console.log('Inspection updated successfully');
          this.router.navigate(['/search-inspection']);
        },
        (error: any) => {
          console.error('Error updating inspection', error);
        }
      );
    }
  }
}
