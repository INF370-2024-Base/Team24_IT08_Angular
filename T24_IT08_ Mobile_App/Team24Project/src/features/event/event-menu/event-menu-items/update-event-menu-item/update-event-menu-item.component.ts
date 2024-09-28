import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventMenuItemService, EventMenuItem } from '../../../../../services/event-menu-item.service';
import { EventMenuService, EventMenu } from '../../../../../services/event-menu.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-update-event-menu-item',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './update-event-menu-item.component.html',
  styleUrl: './update-event-menu-item.component.scss'
})
export class UpdateEventMenuItemComponent implements OnInit{
  eventMenuItem: EventMenuItem = {} as EventMenuItem;
  eventMenus: EventMenu[] = [];

  constructor(
    private eventMenuItemService: EventMenuItemService,
    private eventMenuService: EventMenuService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadEventMenuItem(+id);
    }
    this.loadEventMenus();
  }

   // Load event menu item by ID
   loadEventMenuItem(id: number): void {
    this.eventMenuItemService.getEventMenuItemById(id).subscribe(
      (item) => {
        this.eventMenuItem = item;
      },
      (error) => {
        console.error('Error loading event menu item:', error);
      }
    );
  }

   // Load all event menus to populate the event menu dropdown
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

   // Save changes
   updateEventMenuItem(): void {
     // Ensure dateModified is set to the current date, and other fields are set accordingly
     this.eventMenuItem.dateModified = new Date().toISOString();
     this.eventMenuItem.isActive = true;
     this.eventMenuItem.isDeleted = false;
    this.eventMenuItemService.updateEventMenuItem(this.eventMenuItem.eventMenuItemID, this.eventMenuItem).subscribe(
      () => {
        alert('Event menu item updated successfully.');
        this.router.navigate(['/view-event-menu-items']);
      },
      (error) => {
        console.error('Error updating event menu item:', error);
      }
    );
  }
}
