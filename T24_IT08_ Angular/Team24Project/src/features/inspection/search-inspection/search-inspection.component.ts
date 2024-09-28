import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
  InspectionService,
  Inspection,
  InspectionType,
} from '../../../services/inspection.services';
import { Router } from '@angular/router';
import { RoomService, Room } from '../../../services/room.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
  InspectionChecklistModalComponent,
  ChecklistItem,
} from './inspection-checklist-modal/inspection-checklist-modal.component';

@Component({
  selector: 'app-search-inspection',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    HttpClientModule,
    MatDialogModule,
    MatCheckboxModule,
  ],
  templateUrl: './search-inspection.component.html',
  styleUrl: './search-inspection.component.scss',
})
export class SearchInspectionComponent implements OnInit {
  inspections: Inspection[] = [];
  filteredInspections: Inspection[] = [];
  inspectionTypes: InspectionType[] = [];
  rooms: Room[] = [];
  searchName: string = '';
  searchDate: string = '';
  sortColumn: string = '';
  sortDirection: string = 'asc';
  checklistItems = [
    'TV',
    'Kettle',
    '4 blankets',
    'Shower',
    '2 couches',
    '20 utensils',
    '5 plates',
  ];

  constructor(
    private inspectionService: InspectionService,
    private router: Router,
    private roomService: RoomService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.inspectionService.getInspections().subscribe(
      (data) => {
        this.inspections = data;
        this.filteredInspections = data;
      },
      (error) => {
        console.error('Error fetching inspections', error);
      }
    );

    this.inspectionService.getInspectionTypes().subscribe(
      (data) => {
        this.inspectionTypes = data;
      },
      (error) => {
        console.error('Error fetching inspection types', error);
      }
    );

    this.roomService.getRooms().subscribe(
      (data) => {
        this.rooms = data;
      },
      (error) => {
        console.error('Error fetching rooms', error);
      }
    );
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

  getInspectionTypeName(id: number): string {
    const type = this.inspectionTypes.find(
      (type) => type.inspection_Type_ID === id
    );
    return type ? type.name : 'Unknown';
  }

  getRoomName(id: number): string {
    const room = this.rooms.find((room) => room.room_ID === id);
    return room ? room.name : 'Unknown';
  }

  search() {
    this.filteredInspections = this.inspections.filter((inspection) => {
      const matchesName = this.searchName
        ? inspection.name.toLowerCase().includes(this.searchName.toLowerCase())
        : true;
      const matchesDate = this.searchDate
        ? new Date(inspection.dateCreated).toDateString() ===
          new Date(this.searchDate).toDateString()
        : true;
      return matchesName && matchesDate;
    });
  }

  sortProducts(column: string): void {
    this.sortColumn = column;
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.filteredInspections.sort((a, b) => {
      let comparison = 0;
      if (a[column] > b[column]) {
        comparison = 1;
      } else if (a[column] < b[column]) {
        comparison = -1;
      }
      return this.sortDirection === 'asc' ? comparison : -comparison;
    });
  }

  GoToCreateInspectionPage() {
    this.router.navigate(['/create-inspection']);
  }

  updateInspection(inspection_ID: number) {
    console.log('Update Inspection', inspection_ID);
    this.router.navigate(['/update-inspection', inspection_ID]);
  }

  deleteInspection(inspection_ID: number): void {
    if (confirm('Are you sure you want to delete this inspection log?')) {
      this.inspectionService.deleteInspection(inspection_ID).subscribe(
        () => {
          this.inspections = this.inspections.filter(
            (inspection) => inspection.inspection_ID !== inspection_ID
          );
          this.filteredInspections = this.filteredInspections.filter(
            (inspection) => inspection.inspection_ID !== inspection_ID
          );
          console.log('Inspection Log deleted successfully');
        },
        (error: any) => {
          console.error('Error deleting inspection log', error);
        }
      );
    }
  }

  openChecklist(inspection: Inspection): void {
    const checklist: ChecklistItem[] = this.checklistItems.map((item) => ({
      name: item,
      checked: inspection['checklist']
        ? inspection['checklist'].includes(item)
        : false,
    }));

    const dialogRef = this.dialog.open(InspectionChecklistModalComponent, {
      width: '400px',
      data: { inspectionName: inspection.name, checklist },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        inspection['checklist'] = result
          .filter((item: ChecklistItem) => item.checked)
          .map((item: ChecklistItem) => item.name);
      }
    });
  }
  GenerateInspectionReport(): void {
    this.router.navigate([
      '/inspection-report',
    ]);
  }
}
