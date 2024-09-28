import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RoomTypes } from '../../services/room.service';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../shared/components/material.module';

@Component({
  selector: 'app-room-type-dialog',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MaterialModule],
  templateUrl: './room-type-dialog.component.html',
  styleUrl: './room-type-dialog.component.scss'
})
export class RoomTypeDialogComponent {
  roomTypeForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<RoomTypeDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { roomType: RoomTypes }
  ) {
    this.roomTypeForm = this.fb.group({
      room_Type_ID: [this.data.roomType.room_Type_ID || 0], // Default 0 for new room types
      name: [this.data.roomType.name || '', Validators.required], // Required name
      description: [this.data.roomType.description || '', Validators.required], // Required description
      isCatered: [this.data.roomType.isCatered || false], // Boolean
      standardRate: [this.data.roomType.standardRate || 0, Validators.required], // Required rate
    });
  }

  onSave(): void {
    if (this.roomTypeForm.valid) {
      this.dialogRef.close(this.roomTypeForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}