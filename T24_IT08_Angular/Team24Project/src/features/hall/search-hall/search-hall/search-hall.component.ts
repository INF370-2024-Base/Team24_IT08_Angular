import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HallService, Hall } from '../../../../services/hall.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-hall',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './search-hall.component.html',
  styleUrl: './search-hall.component.scss',
})
export class SearchHallComponent implements OnInit {
  halls: Hall[] = [];
  filteredHalls: Hall[] = [];
  searchName: string = '';
  searchDate: string = '';
  searchDescription: string = '';
  searchCapacity: string = '';
  sortColumn: string = '';
  sortDirection: string = 'asc';
  currentUserRole: string = '';

  constructor(private hallService: HallService, private router: Router) {}

  ngOnInit() {
    this.setCurrentUserRole();
    this.hallService.getHalls().subscribe(
      (data: Hall[]) => {
        this.halls = data;
        this.filteredHalls = data;
      },
      (error: any) => {
        console.error('Error fetching halls', error);
      }
    );
  }

  setCurrentUserRole(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.currentUserRole = currentUser.role || '';
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
  search() {
    this.filteredHalls = this.halls.filter((hall) => {
      const matchesName = this.searchName
        ? hall.name.toLowerCase().includes(this.searchName.toLowerCase())
        : true;
      const matchesDate = this.searchDate
        ? new Date(hall.dateCreated).toDateString() ===
          new Date(this.searchDate).toDateString()
        : true;
      const matchesDescription = this.searchDescription
        ? hall.description
            .toLowerCase()
            .includes(this.searchDescription.toLowerCase())
        : true;
      const matchesCapacity = this.searchCapacity
        ? hall.capacity.toString().includes(this.searchCapacity)
        : true;
      return (
        matchesName && matchesDate && matchesDescription && matchesCapacity
      );
    });
  }

  sortProducts(column: string): void {
    this.sortColumn = column;
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.filteredHalls.sort((a, b) => {
      let comparison = 0;
      if (a[column] > b[column]) {
        comparison = 1;
      } else if (a[column] < b[column]) {
        comparison = -1;
      }
      return this.sortDirection === 'asc' ? comparison : -comparison;
    });
  }

  editHall(hallID: number) {
    console.log('Edit hall', hallID);
    this.router.navigate(['/update-hall', hallID]);
  }

  deleteHall(hallID: number): void {
    if (confirm('Are you sure you want to delete this hall?')) {
      this.hallService.deleteHall(hallID).subscribe(
        () => {
          this.halls = this.halls.filter((hall) => hall.hallID !== hallID);
          this.filteredHalls = this.filteredHalls.filter(
            (hall) => hall.hallID !== hallID
          );
          console.log('Hall deleted successfully');
        },
        (error: any) => {
          console.error('Error deleting hall', error);
          console.log(error); // Log the complete error object for debugging
          if (error.status === 409 || error.error.message.includes('foreign key')) {
            alert('Deletion unsuccessful because Hall is ACTIVELY being used somewhere in the system');
          } else {
            alert('Error occurred while deleting the hall.');
          }
        }
      );
    }
  }

  GoToCreateHallPage() {
    console.log('Navigating to create event page'); // Debugging line
    this.router.navigate(['/create-hall']);
  }
}
