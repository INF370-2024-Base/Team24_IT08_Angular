import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  InspectionService,
  Inspection,
  InspectionType,InspectionStatus
} from '../../../services/inspection.services';
import { RoomService, Room } from '../../../services/room.service';
import { StaffService, Staff, User } from '../../../services/staff.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-create-inspection',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './create-inspection.component.html',
  styleUrl: './create-inspection.component.scss',
})
export class CreateInspectionComponent implements OnInit {
  inspection: Inspection = {
    inspection_ID: 0,
    inspection_Status_ID: 0,
    inspection_Type_ID: 0,
    staffId: 0,
    room_ID: 0,
    name: '',
    description: '',
    dateCreated: new Date().toISOString(),
    dateModified: new Date().toISOString(),
    isActive: true,
    isDeleted: false,
  };
  inspectionTypes: InspectionType[] = [];
  rooms: Room[] = [];
  staffMembers: Staff[] = [];
  users: User[] = [];
  selectedUserId: string = '';
  inspectionStatuses:InspectionStatus[]=[];

  constructor(
    private inspectionService: InspectionService,
    private roomService: RoomService,
    private staffService: StaffService,
    private router: Router,
    
  ) {}

  ngOnInit() {
    this.fetchData();
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
    this.inspectionService.getInspectionStatuses().subscribe(
      (data) => {
        this.inspectionStatuses = data;
      },
      (error) => {
        console.error('Error fetching inspection statuses', error);
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

  createInspection() {

    if (!this.inspection.inspection_Type_ID || !this.inspection.room_ID || !this.inspection.staffId || !this.selectedUserId) {
      alert('Please fill in all required fields.');
      return;
    }
    this.inspection.dateCreated = new Date().toISOString();
    this.inspection.dateModified = new Date().toISOString();

    this.inspection.inspection_Type_ID = parseInt(
      this.inspection.inspection_Type_ID.toString(),
    );
    this.inspection.room_ID = parseInt(this.inspection.room_ID.toString(), 10);
    this.inspection.staffId = parseInt(this.inspection.staffId.toString(), 10);
    this.inspection['userId'] = this.selectedUserId;

    const payload = {
      ...this.inspection,
      inspectionType: this.inspectionTypes.find(
        (type) => type.inspection_Type_ID === this.inspection.inspection_Type_ID
      ),
      staff: this.staffMembers.find(
        (staff) => staff.staffId === this.inspection.staffId
      ),
      room: this.rooms.find((room) => room.room_ID === this.inspection.room_ID),
      user: this.users.find((user) => user.id === this.selectedUserId),
    };

    console.log('Creating inspection:', payload);

    this.inspectionService.createInspection(payload).subscribe(
      () => {
        alert('Inspection is successfully created.');
        this.router.navigate(['/search-inspection']);
      },
      (error) => {
        alert('Inspection is unsuccessful.');
        console.error('Error creating inspection', error);
      }
    );
  }
}
