import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {
  LostAndFoundService,
  LostAndFoundItems,
  LostAndFoundStatuses,
} from '../../../services/LostAndFound.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-search-l-and-f-item',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule],
  templateUrl: './search-l-and-f-item.component.html',
  styleUrl: './search-l-and-f-item.component.scss',
})
export class SearchLAndFItemComponent implements OnInit {
  lostAndFoundItems: LostAndFoundItems[] = [];
  filteredItems: LostAndFoundItems[] = [];
  searchTerm: string = '';
  statuses: LostAndFoundStatuses[] = [];
  currentUserRole: string | null = null;

  constructor(
    private lostAndFoundService: LostAndFoundService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.lostAndFoundService.getLostAndFoundItems().subscribe((items) => {
      this.lostAndFoundItems = items;
      this.filteredItems = items;
    });

    this.lostAndFoundService.getLostAndFoundStatuses().subscribe((statuses) => {
      this.statuses = statuses;
    });
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.currentUserRole = this.currentUserRole;
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

  filterItems(): void {
    this.filteredItems = this.lostAndFoundItems.filter(
      (item) =>
        item.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  logLostAndFoundItem(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const emailaddress = currentUser.emailaddress;

    if (emailaddress) {
      this.router.navigate(['/create-l-and-f-item', emailaddress]);
    } else {
      console.error('Email address is not available in local storage');
    }
  }

  generateReport():void{
    this.router.navigate(['lost-and-found-report']);
  }

  getStatusName(statusId?: number): string {
    //Return a default value if statusId is undefined
    const status = this.statuses.find((s) => s.l_And_F_Status_ID === statusId);
    return status ? status.name : 'Unknown';
  }

  updateItem(lostAndFoundId: number): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const emailaddress = currentUser.emailaddress;

    if (emailaddress) {
      this.router.navigate([
        `/update-l-and-f-item/${lostAndFoundId}/${emailaddress}`,
      ]);
    } else {
      console.error('Email address is not available in local storage');
    }
  }

  deleteItem(lostAndFoundId: number): void {
    if (confirm('Are you sure you want to delete this item?')) {
      this.lostAndFoundService.deleteLostAndFoundItem(lostAndFoundId).subscribe(
        () => {
          this.lostAndFoundItems = this.lostAndFoundItems.filter(
            (item) => item.lost_And_Found_ID !== lostAndFoundId
          );
          this.filterItems();
        },
        (error) => {
          console.error('Error deleting item:', error);
        }
      );
    }
  }

  isAdmin(): boolean {
    return this.currentUserRole === 'Admin';
  }
}
