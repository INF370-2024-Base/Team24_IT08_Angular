import { Component, OnInit } from '@angular/core';
import { EventMenuItemService, EventMenuItem } from '../../../../../services/event-menu-item.service';
import { EventMenuService, EventMenu } from '../../../../../services/event-menu.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-view-event-menu-items',
  standalone: true,
  imports: [FormsModule,CommonModule, HttpClientModule],
  templateUrl: './view-event-menu-items.component.html',
  styleUrl: './view-event-menu-items.component.scss'
})
export class ViewEventMenuItemsComponent implements OnInit{
eventMenuItems:EventMenuItem[]=[];
eventMenus:EventMenu[]=[];
searchText:string='';

constructor(private eventMenuItemService: EventMenuItemService, private eventMenuService: EventMenuService, private router:Router) {}

ngOnInit(): void {
  this.loadEventMenuItems();
  this.loadEventMenus();
}

 // Load event menu items
 loadEventMenuItems(): void {
  this.eventMenuItemService.getEventMenuItems().subscribe(
    (items) => {
      this.eventMenuItems = items;
    },
    (error) => {
      console.error('Error loading event menu items:', error);
    }
  );
}

// Load event menus
loadEventMenus(): void {
  this.eventMenuService.getEventMenus().subscribe(
    (menus) => {
      this.eventMenus = menus;
    },
    (error) => {
      console.error('Error loading event menus:', error);
    }
  );
}

 // Filter event menu items based on search input
 filteredEventMenuItems(): EventMenuItem[] {
  if (!this.searchText) {
    return this.eventMenuItems;
  }
  const lowerSearchText = this.searchText.toLowerCase();
  return this.eventMenuItems.filter(item =>
    item.name.toLowerCase().includes(lowerSearchText) || item.description.toLowerCase().includes(lowerSearchText)
  );
}

// Get event menu name by eventMenuID
getEventMenuName(eventMenuID: number): string {
  const menu = this.eventMenus.find(menu => menu.eventMenuID === eventMenuID);
  return menu ? menu.name : 'Unknown';
}

 // Navigate to the update component with prepopulated details
 navigateToUpdate(eventMenuItemID: number): void {
  this.router.navigate(['/update-event-menu', eventMenuItemID]);
}

// Confirm deletion of the event menu item
confirmDelete(eventMenuItemID: number): void {
  if (confirm('Are you sure you want to delete this event menu item?')) {
    this.deleteEventMenuItem(eventMenuItemID);
  }
}

// Delete event menu item
deleteEventMenuItem(eventMenuItemID: number): void {
  if (confirm('Are you sure you want to delete this event menu item?')) {
    this.eventMenuItemService.deleteEventMenuItem(eventMenuItemID).subscribe(
      () => {
        alert('Event menu item deleted successfully.');
        this.loadEventMenuItems(); // Reload the list after deletion
      },
      (error: HttpErrorResponse) => {
        console.error('Error deleting event menu item:', error);
        if (error.status === 409) {
          alert('Deletion unsuccessful because the Event Menu Item is being used elsewhere in the system.');
        } else {
          alert('An error occurred while deleting the event menu item: ' + error.message);
        }
      }
    );
  }
}

// Add the navigateToCreate method
navigateToCreate(): void {
  this.router.navigate(['/create-event-menu-item']);
}
}
