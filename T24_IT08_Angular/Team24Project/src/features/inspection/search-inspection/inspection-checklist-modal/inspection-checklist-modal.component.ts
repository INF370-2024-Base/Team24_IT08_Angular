import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

export interface ChecklistItem {
  name: string;
  checked: boolean;
}

@Component({
  selector: 'app-inspection-checklist-modal',
  standalone: true,
  imports: [MatCheckbox, MatDialogModule, FormsModule, CommonModule],
  templateUrl: './inspection-checklist-modal.component.html',
  styleUrl: './inspection-checklist-modal.component.scss',
})
export class InspectionChecklistModalComponent {
  inspectionName: string;
  checklist: ChecklistItem[];

  constructor(
    public dialogRef: MatDialogRef<InspectionChecklistModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.inspectionName = data.inspectionName;
    this.checklist = data.checklist;
  }

  onClose(): void {
    this.dialogRef.close(this.checklist);
  }
}
