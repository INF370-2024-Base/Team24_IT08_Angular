import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-policy-detail-dialog',
  standalone: true,
  imports: [MatDialogModule, CommonModule],
  templateUrl: './policy-detail-dialog.component.html',
  styleUrl: './policy-detail-dialog.component.scss',
})
export class PolicyDetailDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
