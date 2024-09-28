import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MaterialModule } from '../../../../../shared/components/material.module';

import { ShiftTypeService } from '../../../../../services/shift-type.service';
import { RouterModule } from '@angular/router';
import { ShiftType } from '../../../../../shared/models/shiftType.model';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarRef } from '@angular/material/snack-bar';

import { Router } from '@angular/router';
// import { BrowserModule } from '@angular/platform-browser';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 //import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-view-shift-type',
  standalone: true,
// MaterialModule,
  imports: [CommonModule, MaterialModule, RouterModule,  ],
  templateUrl: './view-shift-type.component.html',
  styleUrl: './view-shift-type.component.scss'
})
export class ViewShiftTypeComponent implements AfterViewInit, OnInit {

  displayedColumns: string[] = [ 'name', 'description', 'Editbutton', 'deletebutton'];
  dataSource = new MatTableDataSource<ShiftType>();

  constructor(private shiftTypeService: ShiftTypeService, private snackBar: MatSnackBar, private router:Router) { }

  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.loadShiftTypes();

  }

  loadShiftTypes() {
        this.shiftTypeService.getAllShiftTypes().subscribe((shiftTypes: ShiftType[]) => {
        console.log(shiftTypes); // Log the fetched shift types
        this.dataSource.data = shiftTypes;
        
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  async deleteShiftTypeId(shift_Type_Id: number) {
    console.log('Deleting Shift Type with ID:', shift_Type_Id); // Debugging the ID
    this.shiftTypeService.deleteShiftType(shift_Type_Id).subscribe(() => {
      this.showSnackBar();
      this.dataSource.data = this.dataSource.data.filter(shiftType => shiftType.shift_Type_Id !== shift_Type_Id);
      window.location.reload();
    });
  }
  
  showSnackBar() {
    const snackBarRef: MatSnackBarRef<any> = this.snackBar.open('Deleted successfully', 'X', { duration: 500 });
    snackBarRef.afterDismissed().subscribe(() => {
      location.reload();
    });
  }
}
