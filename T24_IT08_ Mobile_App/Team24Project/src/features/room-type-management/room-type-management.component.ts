import { Component, OnInit } from '@angular/core';
import { RoomService, RoomTypes, Room } from '../../services/room.service'; // Use your existing RoomService
import { MatDialog } from '@angular/material/dialog';
import { RoomTypeDialogComponent } from '../room-type-dialog/room-type-dialog.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../shared/components/material.module';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-room-type-management',
  standalone: true,
  imports: [CommonModule, MaterialModule, ReactiveFormsModule, RouterModule],
  templateUrl: './room-type-management.component.html',
  styleUrl: './room-type-management.component.scss'
})
export class RoomTypeManagementComponent implements OnInit {
  roomTypes: RoomTypes[] = [];

  constructor(private roomService: RoomService, private dialog: MatDialog, private router:Router) {}

  ngOnInit(): void {
    this.loadRoomTypes();
  }

  loadRoomTypes(): void {
    this.roomService.getRoomTypes().subscribe(
      (data: RoomTypes[]) => {
        this.roomTypes = data;
      },
      (error) => {
        console.error('Error loading room types', error);
      }
    );
  }

  // Open dialog to add a room type
  addRoomType(): void {
    const dialogRef = this.dialog.open(RoomTypeDialogComponent, {
      width: '300px',
      data: { roomType: {} }, // Passing empty object for a new room type
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.roomService.createRoomType(result).subscribe(() => this.loadRoomTypes());
      }
    });
  }

  // Open dialog to edit an existing room type
  editRoomType(roomType: RoomTypes): void {
    const dialogRef = this.dialog.open(RoomTypeDialogComponent, {
      width: '300px',
      data: { roomType }, // Passing the selected room type
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.roomService.updateRoomType(result).subscribe(() => this.loadRoomTypes());
      }
    });
  }

  // Delete a room type
  deleteRoomType(room_Type_ID: number): void {
    this.roomService.deleteRoomType(room_Type_ID).subscribe(() => this.loadRoomTypes());
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