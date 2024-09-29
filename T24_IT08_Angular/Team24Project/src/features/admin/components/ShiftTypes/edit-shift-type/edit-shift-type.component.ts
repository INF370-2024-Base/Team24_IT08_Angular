import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShiftTypeService } from '../../../../../services/shift-type.service';
import { ShiftType } from '../../../../../shared/models/shiftType.model';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
// import {MatCard} from '@angular/material/card';
import { MatCardModule } from '@angular/material/card';
import { FormGroup, FormControl, Validators } from '@angular/forms'; // Add FormGroup and FormControl for validation
import { MatSnackBar } from '@angular/material/snack-bar'; // For displaying error messages
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-shift-type',
  standalone: true,
  imports: [ MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
  CommonModule,
  MatCardModule,ReactiveFormsModule],
  templateUrl: './edit-shift-type.component.html',
  styleUrl: './edit-shift-type.component.scss'
})

export class EditShiftTypeComponent implements OnInit {

  shiftTypeAt: ShiftType = {
    shift_Type_Id: 0,
    type_Name: '',
    type_Description: ''
  };

  shiftTypeForm!: FormGroup; // Declare shiftTypeForm as a FormGroup

  constructor(
    private route: ActivatedRoute,
    private shiftTypeService: ShiftTypeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.shiftTypeForm = new FormGroup({
      type_Name: new FormControl('', [Validators.required]), // Add Validators.required for type_Name
      type_Description: new FormControl('', [Validators.required]) // Add Validators.required for type_Description
    });

    this.route.paramMap.subscribe({
      next: (params) => {
        const shift_Type_Id = params.get('shift_Type_Id');
        if (shift_Type_Id !== null) {
          const numericId = parseInt(shift_Type_Id, 10);
          if (!isNaN(numericId)) {
            this.shiftTypeService.getShiftTypeById(numericId).subscribe({
              next: (response) => {
                this.shiftTypeAt = response;
                this.populateForm();
              },
              error: (error) => {
                console.error('Error fetching ShiftType:', error);
              }
            });
          } else {
            console.error('Invalid ID: not a number');
          }
        } else {
          console.error('Invalid ID: null');
        }
      }
    });
  }

  populateForm(): void {
    // Set form values after fetching data
    this.shiftTypeForm.setValue({
      type_Name: this.shiftTypeAt.type_Name,
      type_Description: this.shiftTypeAt.type_Description
    });
  }

  updateShiftType(): void {
    if (this.shiftTypeForm.valid) {
      // Only update if form is valid
      this.shiftTypeAt.type_Name = this.shiftTypeForm.value.type_Name;
      this.shiftTypeAt.type_Description = this.shiftTypeForm.value.type_Description;
      this.shiftTypeService.updateShiftType(this.shiftTypeAt.shift_Type_Id, this.shiftTypeAt).subscribe({
        next: (response) => {
          this.router.navigate(['view-shift-type']);
        },
        error: (error) => {
          console.error('Error updating ShiftType:', error);
        }
      });
    } else {
      console.error('Form is invalid.');
    }
  }

  cancel(): void {
    this.router.navigate(['view-shift-type']);
  }
}

