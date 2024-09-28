import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RoomService, Room, RoomTypes} from '../../services/room.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../shared/components/material.module';
import { RouterLink } from '@angular/router';
import { RouterModule } from '@angular/router';
import { BackButtonComponentComponent } from '../../shared/components/back-button-component/back-button-component.component';

@Component({
  selector: 'app-room-availability',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule, RouterModule, 
    BackButtonComponentComponent
  ],
  templateUrl: './room-availability.component.html',
  styleUrl: './room-availability.component.scss'
})
export class RoomAvailabilityComponent implements OnInit {
  availabilityForm: FormGroup;
  availableRooms: Room[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private roomService: RoomService) {
    this.availabilityForm = this.fb.group({
      checkIn: ['', Validators.required],
      checkOut: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  checkAvailability(): void {
    if (this.availabilityForm.invalid) {
      return;
    }

    const checkIn = this.availabilityForm.get('checkIn')?.value;
    const checkOut = this.availabilityForm.get('checkOut')?.value;

    this.isLoading = true;
    this.errorMessage = '';

    // Adjusted payload to include room_ID
    const payload = {
      room_ID: 0, // Assuming 0 is acceptable when searching for any available rooms
      checkIn: checkIn,
      checkOut: checkOut
    };

    console.log('Payload sent:', payload);

    this.roomService.searchRooms(payload).subscribe(
      (rooms: Room[]) => {
        console.log('Rooms received:', rooms);
        this.availableRooms = rooms;
        this.isLoading = false;
        if (rooms.length === 0) {
          this.errorMessage = 'No rooms available for the selected dates.';
        }
      },
      (error) => {
        console.error('Error received:', error);
        this.isLoading = false;
        this.errorMessage = 'An error occurred while checking availability. Please try again later.';
      }
    );
  }


}