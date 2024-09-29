import { Component , OnInit} from '@angular/core';
//import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { ShiftType } from '../../../../../shared/models/shiftType.model';
import { ShiftTypeService } from '../../../../../services/shift-type.service';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-shift-type',
  standalone: true,
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule, MatCardModule, CommonModule, FormsModule,  ],
  templateUrl: './add-shift-type.component.html',
  styleUrl: './add-shift-type.component.scss'
})
export class AddShiftTypeComponent {

 

  addShiftType: ShiftType = {
   shift_Type_Id: 0,
   type_Name: '',
   type_Description: '',
 }; 

 constructor(private shiftTypeService: ShiftTypeService, private router: Router ) { }

  ngOnInit(): void {
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

 CreateShiftType(){
   this.shiftTypeService.createShiftType(this.addShiftType).subscribe({
      next: (shiftTypeAdd) => {
       this.router.navigate(['view-shift-type'])
         console.log(shiftTypeAdd)

     },
     error: (err) => {
       console.error('Error adding shift type:', err);
     }
   });
   }

   cancel(){
    this.router.navigate(["view-shift-type"]);
   };
}

