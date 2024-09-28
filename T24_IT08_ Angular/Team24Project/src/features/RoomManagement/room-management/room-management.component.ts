import { Component, OnInit } from '@angular/core';
import { RoomService,Room } from '../../../services/room.service';
import { Observable } from 'rxjs';
import { FormsModule, NgForm, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { RoomDialogComponent } from '../room-dialog/room-dialog.component';
import { MaterialModule } from '../../../shared/components/material.module';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-room-management',
  standalone: true,
  imports: [CommonModule, FormsModule, MaterialModule, RouterModule],
  templateUrl: './room-management.component.html',
  styleUrl: './room-management.component.scss'
})
export class RoomManagementComponent implements OnInit {
  rooms$: Observable<Room[]>;

  constructor(private roomService: RoomService, private dialog: MatDialog, private router:Router) {
    this.rooms$ = this.roomService.getRooms();
  }

  ngOnInit(): void {
    this.loadRooms();
  }

  loadRooms(): void {
    this.rooms$ = this.roomService.getRooms();
  }

  
  addRoom(): void {
    const dialogRef = this.dialog.open(RoomDialogComponent, {
      width: '300px',
      data: { room: {} }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.roomService.createRoom(result).subscribe(() => this.loadRooms());
      }
    });
  }

  updateRoom(room: Room): void {
    const dialogRef = this.dialog.open(RoomDialogComponent, {
      width: '300px',
      data: { room }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.roomService.updateRoom(result).subscribe(() => this.loadRooms());
      }
    });
  }

  deleteRoom(room_ID: number): void {
    this.roomService.deleteRoom(room_ID).subscribe(() => this.loadRooms());
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


  bookRoom(roomId: number): void {
    this.logRoomId(roomId);
    this.router.navigate(['/book-room', roomId]);
  }

  
  logRoomId(roomId: number) {
    console.log('Room ID:', roomId);
  }
}
