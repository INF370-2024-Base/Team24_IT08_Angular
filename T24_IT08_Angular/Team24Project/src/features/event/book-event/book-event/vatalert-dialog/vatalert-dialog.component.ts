import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-vatalert-dialog',
  standalone: true,
  imports: [CommonModule,FormsModule,MatDialogModule,MatButtonModule],
  templateUrl: './vatalert-dialog.component.html',
  styleUrl: './vatalert-dialog.component.scss'
})
export class VATAlertDialogComponent {

}
