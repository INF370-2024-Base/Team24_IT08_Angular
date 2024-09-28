import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EventService, EventCategory } from '../../../../services/event.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-event-categories',
  standalone: true,
  imports: [CommonModule,FormsModule,HttpClientModule],
  templateUrl: './search-event-categories.component.html',
  styleUrl: './search-event-categories.component.scss'
})
export class SearchEventCategoriesComponent implements OnInit{
  eventCategories: EventCategory[] = [];
  filteredEventCategories: EventCategory[] = [];
  searchTerm: string = '';

  constructor(private eventService: EventService, private router:Router) {}

  ngOnInit(): void {
    this.getEventCategories();
  }

  getEventCategories(): void {
    this.eventService.getEventCategories().subscribe((categories) => {
      this.eventCategories = categories;
      this.filteredEventCategories = categories;
    });
  }

  filterEventCategories(): void {
    this.filteredEventCategories = this.eventCategories.filter(category =>
      category.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
 // Inside navigateToCreate()
 navigateToCreate(): void {
  this.router.navigate(['/create-event-category']); // Adjust the route based on your configuration
}

onUpdate(category: EventCategory): void {
  this.router.navigate(['/update-event-category', category.eventCategoryID]);
}

  onDelete(eventCategoryID: number): void {
    if (confirm('Are you sure you want to delete this event item?')) {
      this.eventService.deleteEventCategory(eventCategoryID).subscribe(() => {
        this.getEventCategories(); // Refresh the list after deletion
      });
    }
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

}
