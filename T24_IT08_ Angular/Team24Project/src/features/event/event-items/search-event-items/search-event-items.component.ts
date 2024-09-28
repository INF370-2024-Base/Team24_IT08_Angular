import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
//import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { EventService,EventType,EventItem } from '../../../../services/event.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-event-items',
  standalone: true,
  imports: [FormsModule,CommonModule,HttpClientModule],
  templateUrl: './search-event-items.component.html',
  styleUrl: './search-event-items.component.scss'
})
export class SearchEventItemsComponent implements OnInit {
  eventItems: EventItem[] = [];
  filteredEventItems: EventItem[] = [];
  eventTypes: EventType[] = [];
  searchTerm: string = '';

  constructor(private eventService: EventService, private router:Router) {}

  ngOnInit(): void {
    this.getEventItems();
    this.getEventTypes();
  }

  getEventItems(): void {
    this.eventService.getEventItems().subscribe((items) => {
      this.eventItems = items;
      this.filteredEventItems = items;
    });
  }

  getEventTypes(): void {
    this.eventService.getEventTypes().subscribe((types) => {
      this.eventTypes = types;
    });
  }

  getEventTypeName(eventTypeId: number): string {
    const type = this.eventTypes.find(t => t.eventTypeId === eventTypeId);
    return type ? type.name : 'Unknown';
  }
  filterEventItems(): void {
    this.filteredEventItems = this.eventItems.filter(item =>
      item.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(this.searchTerm.toLowerCase())
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

 // Inside navigateToCreate()
navigateToCreate(): void {
  this.router.navigate(['/create-event-item']); // Adjust the route based on your configuration
}

onUpdate(item: EventItem): void {
  this.router.navigate(['/update-event-item', item.event_Items_ID]);
}

  onDelete(event_Items_ID: number): void {
    if (confirm('Are you sure you want to delete this event item?')) {
      this.eventService.deleteEventItem(event_Items_ID).subscribe(() => {
        this.getEventItems(); // Refresh the list after deletion
      });
    }
  }
}
