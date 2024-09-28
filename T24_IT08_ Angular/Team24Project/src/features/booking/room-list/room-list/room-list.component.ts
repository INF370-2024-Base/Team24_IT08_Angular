import { Component, OnInit } from '@angular/core';
import { RoomService, Room } from '../../../../services/room.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-room-list',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './room-list.component.html',
  styleUrl: './room-list.component.scss',
})
export class RoomListComponent implements OnInit {
  rooms: any[] = [];

  constructor(private roomService: RoomService, private router:Router) {}

  ngOnInit(): void {
    this.loadRooms();
  }

  loadRooms(): void {
    this.roomService.getRooms().subscribe((data) => {
      this.rooms = data;
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

  toggleAvailability(room: any) {
    const updatedAvailability = !room.availability;
    console.log('Sending payload:', { availability: updatedAvailability }); // Log the payload
    this.roomService
      .updateAvailability(room.room_ID, updatedAvailability)
      .subscribe(
        () => {
          console.log('Availability updated successfully');
          room.availability = updatedAvailability;
        },
        (error) => {
          console.error('Error updating availability', error);
        }
      );
  }
}
