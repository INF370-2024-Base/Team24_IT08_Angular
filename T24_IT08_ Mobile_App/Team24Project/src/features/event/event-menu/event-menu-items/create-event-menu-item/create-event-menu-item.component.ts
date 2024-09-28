import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventMenuItemService, EventMenuItem } from '../../../../../services/event-menu-item.service';
import { EventMenuService, EventMenu } from '../../../../../services/event-menu.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-create-event-menu-item',
  standalone: true,
  imports: [CommonModule,FormsModule,HttpClientModule],
  templateUrl: './create-event-menu-item.component.html',
  styleUrl: './create-event-menu-item.component.scss'
})
export class CreateEventMenuItemComponent implements OnInit{
  eventMenuItem: EventMenuItem = {} as EventMenuItem;
  eventMenus: EventMenu[] = [];

  constructor(
    private eventMenuItemService: EventMenuItemService,
    private eventMenuService: EventMenuService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadEventMenus();
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

    // Create new event menu item
    createEventMenuItem(): void {
      // Set dateCreated to current date, and other fields
      this.eventMenuItem.dateCreated = new Date().toISOString();
      this.eventMenuItem.dateModified = null;
      this.eventMenuItem.isActive = true;
      this.eventMenuItem.isDeleted = false;
  
      this.eventMenuItemService.createEventMenuItem(this.eventMenuItem).subscribe(
        () => {
          alert('Event menu item created successfully.');
          this.router.navigate(['/view-event-menu-items']);
        },
        (error) => {
          console.error('Error creating event menu item:', error);
        }
      );
    }
}
