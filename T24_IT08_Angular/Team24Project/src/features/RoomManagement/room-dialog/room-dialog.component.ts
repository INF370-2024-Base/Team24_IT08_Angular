import { Component, Inject , OnInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Room, RoomService, RoomTypes } from '../../../services/room.service';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../shared/components/material.module';
import { FormGroup, FormBuilder,FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-room-dialog',
  standalone: true,
  imports: [CommonModule, MaterialModule,FormsModule,ReactiveFormsModule, 
    MatInputModule, MatButtonModule,MatCheckboxModule],
  templateUrl: './room-dialog.component.html',
  styleUrls: ['./room-dialog.component.scss']
})
export class RoomDialogComponent implements OnInit {
  roomForm!: FormGroup;
  roomTypes: RoomTypes[] = []; // Store the array of RoomTypes
  selectedRoomTypeId: number = 0; // Temporary variable to store selected room_Type_ID

  constructor(
    public dialogRef: MatDialogRef<RoomDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private roomService: RoomService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadRoomTypes();
  }

  initializeForm() {
    this.roomForm = this.fb.group({
      roomTypeName: ['', Validators.required], // Ensure Room Type Name is a dropdown or similar
      roomNumber: ['', Validators.required],
      maxCapacity: [0, [Validators.required, Validators.min(1)]],
      price: [0, [Validators.required, Validators.min(0.01)]],
      imageUrl: [''],
      amenities: [''],
      name: ['', Validators.required],
      description: ['', Validators.required],
      isAvailable: [true, Validators.required] // Default to true or set via form control
    });

    // Load initial data if editing
    if (this.data.room) {
      this.roomForm.patchValue(this.data.room);
    }
  }

  loadRoomTypes(): void {
    this.roomService.getRoomTypes().subscribe(
      (types: RoomTypes[]) => {
        this.roomTypes = types;
      },
      error => {
        console.error('Error loading room types', error);
      }
    );
  }

  onSave(): void {
    if (this.roomForm.valid) {
      const room = this.roomForm.value;
      // Map roomTypeName from selected ID
      room.roomTypeName = this.roomTypes.find(type => type.room_Type_ID === room.roomTypeName)?.name || '';
      this.roomService.createRoom(room).subscribe(
        response => {
          console.log('Room added successfully:', response);
          this.dialogRef.close(response);
        },
        error => {
          console.error('Error adding room:', error);
        }
      );
    } else {
      console.error('Form is not valid');
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}