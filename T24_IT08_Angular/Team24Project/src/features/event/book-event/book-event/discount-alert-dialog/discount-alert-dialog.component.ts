import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-discount-alert-dialog',
  standalone: true,
  imports: [CommonModule,FormsModule,MatDialogModule,MatButtonModule],
  templateUrl: './discount-alert-dialog.component.html',
  styleUrl: './discount-alert-dialog.component.scss'
})
export class DiscountAlertDialogComponent {

}
